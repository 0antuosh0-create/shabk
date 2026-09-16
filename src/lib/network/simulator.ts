import { VirtualNetworkNode, VirtualInterface } from '../../types/network';

export class NetworkSimulator {
  private nodes: Map<string, VirtualNetworkNode> = new Map();
  private defaultNodeId: string = 'host-a';

  constructor(initialNodes?: VirtualNetworkNode[]) {
    if (initialNodes && initialNodes.length > 0) {
      initialNodes.forEach((n) => this.nodes.set(n.id, JSON.parse(JSON.stringify(n))));
      this.defaultNodeId = initialNodes[0].id;
    } else {
      this.initDefaultTopology();
    }
  }

  private initDefaultTopology(): void {
    const hostA: VirtualNetworkNode = {
      id: 'host-a',
      name: 'PC-A (Client)',
      type: 'host',
      interfaces: [
        {
          name: 'eth0',
          macAddress: '00:1A:2B:3C:4D:01',
          ipAddress: '192.168.1.10',
          subnetMask: '255.255.255.0',
          cidr: 24,
          defaultGateway: '192.168.1.1',
          status: 'up',
        },
      ],
      arpTable: {
        '192.168.1.1': {
          ipAddress: '192.168.1.1',
          macAddress: '00:1A:2B:3C:4D:FE',
          type: 'dynamic',
          updatedAt: Date.now() - 30000,
        },
      },
      dnsConfig: {
        primaryServer: '8.8.8.8',
        records: {
          'google.com': '142.250.185.206',
          'yahoo.com': '98.137.11.163',
          'shabk.ir': '185.143.232.50',
        },
      },
    };

    const hostB: VirtualNetworkNode = {
      id: 'host-b',
      name: 'PC-B (Local Host)',
      type: 'host',
      interfaces: [
        {
          name: 'eth0',
          macAddress: '00:1A:2B:3C:4D:02',
          ipAddress: '192.168.1.20',
          subnetMask: '255.255.255.0',
          cidr: 24,
          defaultGateway: '192.168.1.1',
          status: 'up',
        },
      ],
      arpTable: {},
    };

    this.nodes.set(hostA.id, hostA);
    this.nodes.set(hostB.id, hostB);
  }

  public getNode(nodeId?: string): VirtualNetworkNode | undefined {
    return this.nodes.get(nodeId || this.defaultNodeId);
  }

  public getPrimaryInterface(nodeId?: string): VirtualInterface | undefined {
    const node = this.getNode(nodeId);
    return node?.interfaces[0];
  }

  public updateInterfaceConfig(
    nodeId: string,
    updates: Partial<VirtualInterface>
  ): boolean {
    const node = this.nodes.get(nodeId);
    if (!node || node.interfaces.length === 0) return false;
    node.interfaces[0] = {
      ...node.interfaces[0],
      ...updates,
    };
    return true;
  }

  public clearArpTable(nodeId?: string): void {
    const node = this.getNode(nodeId);
    if (node) {
      node.arpTable = {};
    }
  }

  public addArpEntry(nodeId: string, ip: string, mac: string, type: 'dynamic' | 'static' = 'dynamic'): void {
    const node = this.getNode(nodeId);
    if (node) {
      node.arpTable[ip] = {
        ipAddress: ip,
        macAddress: mac,
        type,
        updatedAt: Date.now(),
      };
    }
  }

  public isIpInSameSubnet(ipA: string, ipB: string, mask: string): boolean {
    const intA = this.ipToInt(ipA);
    const intB = this.ipToInt(ipB);
    const intMask = this.ipToInt(mask);
    return (intA & intMask) === (intB & intMask);
  }

  public pingTarget(
    sourceNodeId: string,
    targetIpOrHost: string
  ): {
    reachable: boolean;
    latencyMs: number;
    ttl: number;
    resolvedIp: string;
    reason?: string;
  } {
    const node = this.getNode(sourceNodeId);
    if (!node || node.interfaces.length === 0) {
      return { reachable: false, latencyMs: 0, ttl: 0, resolvedIp: targetIpOrHost, reason: 'کارت شبکه فعال یافت نشد.' };
    }

    const iface = node.interfaces[0];
    if (iface.status !== 'up') {
      return { reachable: false, latencyMs: 0, ttl: 0, resolvedIp: targetIpOrHost, reason: 'رابط شبکه خاموش است (Link Down).' };
    }

    // Resolve domain if input is hostname
    let targetIp = targetIpOrHost;
    if (/[a-zA-Z]/.test(targetIpOrHost)) {
      if (node.dnsConfig && node.dnsConfig.records[targetIpOrHost]) {
        targetIp = node.dnsConfig.records[targetIpOrHost];
      } else {
        return { reachable: false, latencyMs: 0, ttl: 0, resolvedIp: targetIpOrHost, reason: 'عدم پاسخ‌گویی سرویس DNS (Name Resolution Failure).' };
      }
    }

    // Loopback ping check
    if (targetIp === '127.0.0.1' || targetIp.startsWith('127.')) {
      return { reachable: true, latencyMs: 1, ttl: 128, resolvedIp: targetIp };
    }

    // Ping self
    if (targetIp === iface.ipAddress) {
      return { reachable: true, latencyMs: 1, ttl: 128, resolvedIp: targetIp };
    }

    const isLocal = this.isIpInSameSubnet(iface.ipAddress, targetIp, iface.subnetMask);

    if (isLocal) {
      // Find local target node
      for (const otherNode of this.nodes.values()) {
        const otherIface = otherNode.interfaces.find((i) => i.ipAddress === targetIp);
        if (otherIface && otherIface.status === 'up') {
          // Dynamic ARP resolution side effect!
          this.addArpEntry(node.id, otherIface.ipAddress, otherIface.macAddress, 'dynamic');
          return { reachable: true, latencyMs: Math.floor(Math.random() * 3) + 1, ttl: 64, resolvedIp: targetIp };
        }
      }
      return { reachable: false, latencyMs: 0, ttl: 0, resolvedIp: targetIp, reason: 'Destination Host Unreachable (بدون پاسخ ARP محلی)' };
    } else {
      // Remote host requires valid Default Gateway
      if (!iface.defaultGateway || iface.defaultGateway === '0.0.0.0') {
        return { reachable: false, latencyMs: 0, ttl: 0, resolvedIp: targetIp, reason: 'Default Gateway پیکربندی نشده است.' };
      }

      const gatewayReachable = this.isIpInSameSubnet(iface.ipAddress, iface.defaultGateway, iface.subnetMask);
      if (!gatewayReachable) {
        return { reachable: false, latencyMs: 0, ttl: 0, resolvedIp: targetIp, reason: 'Default Gateway در ساب‌نت اشتباه قرار دارد.' };
      }

      // Record router in ARP
      this.addArpEntry(node.id, iface.defaultGateway, '00:1A:2B:3C:4D:FE', 'dynamic');

      // Internet destination ping simulation
      return {
        reachable: true,
        latencyMs: Math.floor(Math.random() * 25) + 18,
        ttl: 118,
        resolvedIp: targetIp,
      };
    }
  }

  private ipToInt(ip: string): number {
    return ip
      .split('.')
      .reduce((acc, octet) => ((acc << 8) + parseInt(octet, 10)) >>> 0, 0);
  }
}
