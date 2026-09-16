import { describe, it, expect } from 'vitest';
import { TROUBLESHOOTING_SCENARIOS } from '../../src/data/labs/troubleshooting-scenarios';

describe('Troubleshooting Labs Integration Tests', () => {
  it('correctly detects fault and validates solution for Scenario 1 (Gateway Outage)', () => {
    const sc = TROUBLESHOOTING_SCENARIOS.find((s) => s.id === 'lab-gateway-outage')!;
    expect(sc).toBeDefined();

    // Initial state is faulty
    const initCheck = sc.verifySolution(sc.initialTopology);
    expect(initCheck.isSolved).toBe(false);

    // Apply simulated fix
    const fixedTopology = JSON.parse(JSON.stringify(sc.initialTopology));
    fixedTopology[0].interfaces[0].defaultGateway = '192.168.1.1';

    const fixedCheck = sc.verifySolution(fixedTopology);
    expect(fixedCheck.isSolved).toBe(true);
  });

  it('correctly detects fault and validates solution for Scenario 2 (DNS Failure)', () => {
    const sc = TROUBLESHOOTING_SCENARIOS.find((s) => s.id === 'lab-dns-failure')!;
    const initCheck = sc.verifySolution(sc.initialTopology);
    expect(initCheck.isSolved).toBe(false);

    const fixedTopology = JSON.parse(JSON.stringify(sc.initialTopology));
    fixedTopology[0].dnsConfig.primaryServer = '8.8.8.8';

    const fixedCheck = sc.verifySolution(fixedTopology);
    expect(fixedCheck.isSolved).toBe(true);
  });

  it('correctly detects fault and validates solution for Scenario 3 (ARP Poison/Stale)', () => {
    const sc = TROUBLESHOOTING_SCENARIOS.find((s) => s.id === 'lab-arp-poison')!;
    const initCheck = sc.verifySolution(sc.initialTopology);
    expect(initCheck.isSolved).toBe(false);

    const fixedTopology = JSON.parse(JSON.stringify(sc.initialTopology));
    delete fixedTopology[0].arpTable['192.168.1.1'];

    const fixedCheck = sc.verifySolution(fixedTopology);
    expect(fixedCheck.isSolved).toBe(true);
  });
});
