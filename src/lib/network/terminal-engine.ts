import { TerminalOutput, OutputLine, TerminalCommand } from '../../types/terminal';
import { NetworkSimulator } from './simulator';
import { resolveTraceRoute, queryDns } from './traceroute-dns';

export class TerminalEngine {
  private simulator: NetworkSimulator;
  private currentNodeId: string = 'host-a';

  constructor(simulator?: NetworkSimulator) {
    this.simulator = simulator || new NetworkSimulator();
  }

  public setSimulator(sim: NetworkSimulator): void {
    this.simulator = sim;
  }

  public parseCommand(rawInput: string): TerminalCommand {
    const trimmed = rawInput.trim();
    const tokens = trimmed.split(/\s+/).filter(Boolean);
    if (tokens.length === 0) {
      return { rawInput, command: '', args: [], flags: {} };
    }

    const command = tokens[0].toLowerCase();
    const args: string[] = [];
    const flags: Record<string, string | boolean | number> = {};

    for (let i = 1; i < tokens.length; i++) {
      const token = tokens[i];
      if (token.startsWith('/') || token.startsWith('-')) {
        const flagName = token.replace(/^[\/-]+/, '').toLowerCase();
        // Check if next token is value
        if (i + 1 < tokens.length && !tokens[i + 1].startsWith('/') && !tokens[i + 1].startsWith('-')) {
          flags[flagName] = tokens[i + 1];
          i++;
        } else {
          flags[flagName] = true;
        }
      } else {
        args.push(token);
      }
    }

    return { rawInput, command, args, flags };
  }

  public execute(rawInput: string): TerminalOutput {
    const parsed = this.parseCommand(rawInput);
    if (!parsed.command) {
      return { lines: [], exitCode: 0 };
    }

    switch (parsed.command) {
      case 'help':
        return this.handleHelp();
      case 'clear':
      case 'cls':
        return { lines: [{ id: 'cls', text: '__CLEAR__', type: 'normal' }], exitCode: 0 };
      case 'ipconfig':
        return this.handleIpconfig(parsed);
      case 'ifconfig':
      case 'ip':
        return this.handleIfconfig(parsed);
      case 'ping':
        return this.handlePing(parsed);
      case 'tracert':
      case 'traceroute':
        return this.handleTracert(parsed);
      case 'arp':
        return this.handleArp(parsed);
      case 'netstat':
        return this.handleNetstat(parsed);
      case 'nslookup':
      case 'dig':
        return this.handleNslookup(parsed);
      default:
        return {
          lines: [
            {
              id: String(Date.now()),
              text: `'${parsed.command}' is not recognized as an internal or external command, operable program or batch file.`,
              type: 'error',
              isLtr: true,
            },
            {
              id: String(Date.now() + 1),
              text: 'برای مشاهده لیست دستورات مجاز، دستور help را وارد کنید.',
              type: 'educational-tip',
              isLtr: false,
            },
          ],
          exitCode: 1,
        };
    }
  }

  private handleHelp(): TerminalOutput {
    const lines: OutputLine[] = [
      { id: '1', text: 'Shabk Network Diagnostic CLI Simulator [Version 1.0.0]', type: 'header', isLtr: true },
      { id: '2', text: 'لیست دستورات پشتیبانی شده در این محیط شبیه‌سازی:', type: 'normal', isLtr: false },
      { id: '3', text: '  ipconfig [/all | /release | /renew | /flushdns]  نمایش و تنظیم رابط‌های شبکه', type: 'table-row', isLtr: false },
      { id: '4', text: '  ifconfig / ip a                                  معادل لینوکسی دستور پیکربندی شبکه', type: 'table-row', isLtr: false },
      { id: '5', text: '  ping [-n count] <ip | domain>                    ارزیابی دسترسی‌پذیری با پیام‌های ICMP', type: 'table-row', isLtr: false },
      { id: '6', text: '  tracert / traceroute <ip | domain>               کشف روترهای مسیر و سنجش تأخیر Hops', type: 'table-row', isLtr: false },
      { id: '7', text: '  arp [-a | -d]                                    مشاهده و پاک‌سازی کش جدول ARP', type: 'table-row', isLtr: false },
      { id: '8', text: '  netstat [-a | -n]                                مشاهده وضعیت پورت‌ها و سوکت‌های فعال', type: 'table-row', isLtr: false },
      { id: '9', text: '  nslookup / dig <domain>                          استعلام رکوردهای سرور DNS', type: 'table-row', isLtr: false },
      { id: '10', text: '  clear / cls                                      پاک‌سازی صفحه ترمینال', type: 'table-row', isLtr: false },
    ];
    return { lines, exitCode: 0 };
  }

  private handleIpconfig(cmd: TerminalCommand): TerminalOutput {
    const iface = this.simulator.getPrimaryInterface(this.currentNodeId);
    if (!iface) {
      return { lines: [{ id: '1', text: 'No network interfaces found.', type: 'error', isLtr: true }], exitCode: 1 };
    }

    if (cmd.flags['flushdns']) {
      return {
        lines: [
          { id: '1', text: 'Windows IP Configuration', type: 'header', isLtr: true },
          { id: '2', text: 'Successfully flushed the DNS Resolver Cache.', type: 'success', isLtr: true },
          { id: '3', text: 'نکته آموزشی: حافظه کش DNS محلی با موفقیت تخلیه شد.', type: 'educational-tip', isLtr: false },
        ],
        exitCode: 0,
        stateDelta: { dnsCacheCleared: true },
      };
    }

    if (cmd.flags['release']) {
      this.simulator.updateInterfaceConfig(this.currentNodeId, { ipAddress: '0.0.0.0', subnetMask: '0.0.0.0', defaultGateway: '0.0.0.0' });
      return {
        lines: [
          { id: '1', text: 'Windows IP Configuration', type: 'header', isLtr: true },
          { id: '2', text: 'Ethernet adapter eth0: IP address released to DHCP server.', type: 'warning', isLtr: true },
        ],
        exitCode: 0,
        stateDelta: { ipConfigChanged: true },
      };
    }

    if (cmd.flags['renew']) {
      this.simulator.updateInterfaceConfig(this.currentNodeId, {
        ipAddress: '192.168.1.10',
        subnetMask: '255.255.255.0',
        defaultGateway: '192.168.1.1',
      });
      return {
        lines: [
          { id: '1', text: 'Windows IP Configuration', type: 'header', isLtr: true },
          { id: '2', text: 'Ethernet adapter eth0 renewed via DHCP DORA cycle:', type: 'success', isLtr: true },
          { id: '3', text: `   IPv4 Address. . . . . . . . . . . : 192.168.1.10`, type: 'table-row', isLtr: true },
          { id: '4', text: `   Subnet Mask . . . . . . . . . . . : 255.255.255.0`, type: 'table-row', isLtr: true },
          { id: '5', text: `   Default Gateway . . . . . . . . . : 192.168.1.1`, type: 'table-row', isLtr: true },
        ],
        exitCode: 0,
        stateDelta: { ipConfigChanged: true },
      };
    }

    const lines: OutputLine[] = [
      { id: '1', text: 'Windows IP Configuration', type: 'header', isLtr: true },
      { id: '2', text: '', type: 'normal' },
      { id: '3', text: `Ethernet adapter ${iface.name}:`, type: 'header', isLtr: true },
    ];

    if (cmd.flags['all']) {
      lines.push(
        { id: '4', text: `   Description . . . . . . . . . . . : Intel(R) Gigabit Network Connection`, type: 'table-row', isLtr: true },
        { id: '5', text: `   Physical Address. . . . . . . . . : ${iface.macAddress}`, type: 'table-row', isLtr: true },
        { id: '6', text: `   DHCP Enabled. . . . . . . . . . . : Yes`, type: 'table-row', isLtr: true }
      );
    }

    lines.push(
      { id: '7', text: `   IPv4 Address. . . . . . . . . . . : ${iface.ipAddress}`, type: 'table-row', isLtr: true },
      { id: '8', text: `   Subnet Mask . . . . . . . . . . . : ${iface.subnetMask}`, type: 'table-row', isLtr: true },
      { id: '9', text: `   Default Gateway . . . . . . . . . : ${iface.defaultGateway || '0.0.0.0'}`, type: 'table-row', isLtr: true }
    );

    if (cmd.flags['all']) {
      lines.push({ id: '10', text: `   DNS Servers . . . . . . . . . . . : 8.8.8.8`, type: 'table-row', isLtr: true });
    }

    return { lines, exitCode: 0 };
  }

  private handleIfconfig(_cmd: TerminalCommand): TerminalOutput {
    const iface = this.simulator.getPrimaryInterface(this.currentNodeId);
    if (!iface) {
      return { lines: [{ id: '1', text: 'Device not found.', type: 'error', isLtr: true }], exitCode: 1 };
    }

    const lines: OutputLine[] = [
      { id: 'tip', text: 'نکته آموزشی: در ویندوز از ipconfig و در لینوکس از ifconfig یا ip a استفاده می‌شود.', type: 'educational-tip', isLtr: false },
      { id: '1', text: `${iface.name}: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500`, type: 'header', isLtr: true },
      { id: '2', text: `        inet ${iface.ipAddress}  netmask ${iface.subnetMask}  broadcast 192.168.1.255`, type: 'table-row', isLtr: true },
      { id: '3', text: `        ether ${iface.macAddress.toLowerCase()}  txqueuelen 1000  (Ethernet)`, type: 'table-row', isLtr: true },
      { id: '4', text: `        RX packets 2048  bytes 1843200 (1.8 MB)`, type: 'table-row', isLtr: true },
      { id: '5', text: `        TX packets 1420  bytes 1290240 (1.2 MB)`, type: 'table-row', isLtr: true },
    ];
    return { lines, exitCode: 0 };
  }

  private handlePing(cmd: TerminalCommand): TerminalOutput {
    if (cmd.args.length === 0) {
      return {
        lines: [
          { id: '1', text: 'Usage: ping [-n count] <target_name | ip_address>', type: 'error', isLtr: true },
        ],
        exitCode: 1,
      };
    }

    const target = cmd.args[0];
    const count = Number(cmd.flags['n'] || cmd.flags['c'] || 4);
    const result = this.simulator.pingTarget(this.currentNodeId, target);

    const lines: OutputLine[] = [
      { id: '1', text: `Pinging ${target} [${result.resolvedIp}] with 32 bytes of data:`, type: 'header', isLtr: true },
    ];

    if (!result.reachable) {
      for (let i = 0; i < count; i++) {
        lines.push({
          id: `reply-${i}`,
          text: result.reason || 'Request timed out.',
          type: 'error',
          isLtr: true,
        });
      }
      lines.push(
        { id: 'stat-header', text: `Ping statistics for ${result.resolvedIp}:`, type: 'header', isLtr: true },
        { id: 'stat-loss', text: `    Packets: Sent = ${count}, Received = 0, Lost = ${count} (100% loss)`, type: 'error', isLtr: true }
      );
      return { lines, exitCode: 1 };
    }

    // Success response
    for (let i = 0; i < count; i++) {
      const ms = Math.max(1, result.latencyMs + Math.floor(Math.random() * 3) - 1);
      lines.push({
        id: `reply-${i}`,
        text: `Reply from ${result.resolvedIp}: bytes=32 time=${ms}ms TTL=${result.ttl}`,
        type: 'success',
        isLtr: true,
      });
    }

    lines.push(
      { id: 'stat-header', text: `Ping statistics for ${result.resolvedIp}:`, type: 'header', isLtr: true },
      { id: 'stat-loss', text: `    Packets: Sent = ${count}, Received = ${count}, Lost = 0 (0% loss)`, type: 'success', isLtr: true },
      { id: 'stat-rtt', text: `Approximate round trip times in milli-seconds: Minimum = ${result.latencyMs - 1}ms, Maximum = ${result.latencyMs + 2}ms, Average = ${result.latencyMs}ms`, type: 'table-row', isLtr: true }
    );

    return { lines, exitCode: 0, stateDelta: { arpTableUpdated: true } };
  }

  private handleTracert(cmd: TerminalCommand): TerminalOutput {
    if (cmd.args.length === 0) {
      return { lines: [{ id: '1', text: 'Usage: tracert <target_name | ip_address>', type: 'error', isLtr: true }], exitCode: 1 };
    }

    const target = cmd.args[0];
    const hops = resolveTraceRoute(target);
    const lines: OutputLine[] = [];

    if (cmd.command === 'traceroute') {
      lines.push({
        id: 'tip',
        text: 'نکته آموزشی: در ویندوز از tracert و در لینوکس از traceroute استفاده می‌شود.',
        type: 'educational-tip',
        isLtr: false,
      });
    }

    lines.push(
      { id: 'h1', text: `Tracing route to ${target} over a maximum of 30 hops:`, type: 'header', isLtr: true },
      { id: 'h2', text: '', type: 'normal' }
    );

    hops.forEach((h) => {
      const nameStr = h.hostname ? `[${h.hostname}] ` : '';
      lines.push({
        id: `hop-${h.hop}`,
        text: `  ${h.hop}     ${h.latencyMs} ms     ${h.latencyMs + 1} ms     ${h.latencyMs} ms  ${h.ip} ${nameStr}`,
        type: 'table-row',
        isLtr: true,
      });
    });

    lines.push(
      { id: 'end', text: 'Trace complete.', type: 'success', isLtr: true }
    );

    return { lines, exitCode: 0 };
  }

  private handleArp(cmd: TerminalCommand): TerminalOutput {
    const node = this.simulator.getNode(this.currentNodeId);
    if (!node) {
      return { lines: [{ id: '1', text: 'Device not found.', type: 'error', isLtr: true }], exitCode: 1 };
    }

    if (cmd.flags['d']) {
      this.simulator.clearArpTable(this.currentNodeId);
      return {
        lines: [
          { id: '1', text: 'The ARP cache has been cleared.', type: 'success', isLtr: true },
          { id: '2', text: 'نکته آموزشی: جدول کش ARP با موفقیت پاک شد.', type: 'educational-tip', isLtr: false },
        ],
        exitCode: 0,
        stateDelta: { arpTableUpdated: true },
      };
    }

    const iface = node.interfaces[0];
    const entries = Object.values(node.arpTable);

    const lines: OutputLine[] = [
      { id: '1', text: `Interface: ${iface.ipAddress} --- 0x2`, type: 'header', isLtr: true },
      { id: '2', text: '  Internet Address      Physical Address      Type', type: 'header', isLtr: true },
    ];

    if (entries.length === 0) {
      lines.push({ id: 'empty', text: '  No ARP entries found in cache.', type: 'table-row', isLtr: true });
    } else {
      entries.forEach((e, idx) => {
        const paddedIp = e.ipAddress.padEnd(22, ' ');
        const paddedMac = e.macAddress.toLowerCase().padEnd(22, ' ');
        lines.push({
          id: `arp-${idx}`,
          text: `  ${paddedIp}${paddedMac}${e.type}`,
          type: 'table-row',
          isLtr: true,
        });
      });
    }

    return { lines, exitCode: 0 };
  }

  private handleNetstat(_cmd: TerminalCommand): TerminalOutput {
    const lines: OutputLine[] = [
      { id: '1', text: 'Active Connections', type: 'header', isLtr: true },
      { id: '2', text: '  Proto  Local Address          Foreign Address        State', type: 'header', isLtr: true },
      { id: '3', text: '  TCP    0.0.0.0:80             0.0.0.0:0              LISTENING', type: 'table-row', isLtr: true },
      { id: '4', text: '  TCP    0.0.0.0:443            0.0.0.0:0              LISTENING', type: 'table-row', isLtr: true },
      { id: '5', text: '  TCP    192.168.1.10:54321     142.250.185.206:443    ESTABLISHED', type: 'success', isLtr: true },
      { id: '6', text: '  TCP    192.168.1.10:54322     185.143.232.50:80      TIME_WAIT', type: 'table-row', isLtr: true },
      { id: '7', text: '  UDP    0.0.0.0:53             *:*', type: 'table-row', isLtr: true },
      { id: '8', text: '  UDP    0.0.0.0:68             *:*', type: 'table-row', isLtr: true },
    ];
    return { lines, exitCode: 0 };
  }

  private handleNslookup(cmd: TerminalCommand): TerminalOutput {
    if (cmd.args.length === 0) {
      return { lines: [{ id: '1', text: 'Usage: nslookup <domain_name> [dns_server_ip]', type: 'error', isLtr: true }], exitCode: 1 };
    }

    const domain = cmd.args[0];
    const server = cmd.args[1] || '8.8.8.8';
    const result = queryDns(domain, server);

    const lines: OutputLine[] = [];
    if (cmd.command === 'dig') {
      lines.push({
        id: 'tip',
        text: 'نکته آموزشی: در ویندوز از nslookup و در لینوکس معمولاً از dig استفاده می‌شود.',
        type: 'educational-tip',
        isLtr: false,
      });
    }

    lines.push(
      { id: '1', text: `Server:  dns.google`, type: 'header', isLtr: true },
      { id: '2', text: `Address: ${result.server}`, type: 'table-row', isLtr: true },
      { id: '3', text: '', type: 'normal' },
      { id: '4', text: `Non-authoritative answer:`, type: 'header', isLtr: true },
      { id: '5', text: `Name:    ${domain}`, type: 'table-row', isLtr: true },
      { id: '6', text: `Address: ${result.address}`, type: 'success', isLtr: true }
    );

    return { lines, exitCode: 0 };
  }
}
