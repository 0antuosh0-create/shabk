import { describe, it, expect, beforeEach } from 'vitest';
import { NetworkSimulator } from '../../src/lib/network/simulator';
import { TerminalEngine } from '../../src/lib/network/terminal-engine';

describe('NetworkSimulator & State Mutation Tests', () => {
  let sim: NetworkSimulator;
  let engine: TerminalEngine;

  beforeEach(() => {
    sim = new NetworkSimulator();
    engine = new TerminalEngine(sim);
  });

  it('pings self loopback successfully', () => {
    const res = sim.pingTarget('host-a', '127.0.0.1');
    expect(res.reachable).toBe(true);
    expect(res.ttl).toBe(128);
  });

  it('pings local host and dynamically records target in ARP table', () => {
    // Before ping, host-b is not in host-a's ARP
    const nodeBefore = sim.getNode('host-a');
    expect(nodeBefore?.arpTable['192.168.1.20']).toBeUndefined();

    const pingRes = sim.pingTarget('host-a', '192.168.1.20');
    expect(pingRes.reachable).toBe(true);

    // After ping, host-b should be recorded dynamically
    const nodeAfter = sim.getNode('host-a');
    expect(nodeAfter?.arpTable['192.168.1.20']).toBeDefined();
    expect(nodeAfter?.arpTable['192.168.1.20'].macAddress).toBe('00:1A:2B:3C:4D:02');
  });

  it('fails remote ping when default gateway is missing', () => {
    sim.updateInterfaceConfig('host-a', { defaultGateway: '0.0.0.0' });
    const res = sim.pingTarget('host-a', '8.8.8.8');
    expect(res.reachable).toBe(false);
    expect(res.reason).toContain('Default Gateway');
  });

  it('fails remote ping when default gateway is in wrong subnet', () => {
    // Subnet is 192.168.1.0/24, gateway set to 10.0.0.1
    sim.updateInterfaceConfig('host-a', { defaultGateway: '10.0.0.1' });
    const res = sim.pingTarget('host-a', '8.8.8.8');
    expect(res.reachable).toBe(false);
    expect(res.reason).toContain('اشتباه');
  });

  it('arp -d command clears the ARP cache', () => {
    sim.addArpEntry('host-a', '192.168.1.55', 'AA:BB:CC:DD:EE:FF');
    expect(sim.getNode('host-a')?.arpTable['192.168.1.55']).toBeDefined();

    const out = engine.execute('arp -d');
    expect(out.exitCode).toBe(0);
    expect(Object.keys(sim.getNode('host-a')?.arpTable || {})).toHaveLength(0);
  });

  it('ipconfig /flushdns resets resolver cache', () => {
    const out = engine.execute('ipconfig /flushdns');
    expect(out.exitCode).toBe(0);
    expect(out.stateDelta?.dnsCacheCleared).toBe(true);
  });
});
