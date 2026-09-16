export type NodeType = 'host' | 'switch' | 'router' | 'server';

export interface VirtualInterface {
  name: string;
  macAddress: string;
  ipAddress: string;
  subnetMask: string;
  cidr: number;
  defaultGateway: string;
  status: 'up' | 'down';
}

export interface ArpEntry {
  ipAddress: string;
  macAddress: string;
  type: 'dynamic' | 'static';
  updatedAt: number;
}

export interface RouteEntry {
  destination: string;
  netmask: string;
  gateway: string;
  interfaceName: string;
}

export interface DnsConfig {
  primaryServer: string;
  secondaryServer?: string;
  records: Record<string, string>; // hostname -> IP
}

export interface VirtualNetworkNode {
  id: string;
  name: string;
  type: NodeType;
  interfaces: VirtualInterface[];
  arpTable: Record<string, ArpEntry>;
  routingTable?: RouteEntry[];
  dnsConfig?: DnsConfig;
}

export interface CamTableEntry {
  macAddress: string;
  port: number | string;
  timestamp: number;
}
