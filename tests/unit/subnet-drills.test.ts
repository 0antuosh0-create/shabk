import { describe, it, expect } from 'vitest';
import { generateRandomSubnetDrill } from '../../src/lib/network/drill-generator';

describe('Procedural Subnet Drill Generator Tests', () => {
  it('generates valid drills with expected answers and derivation steps', () => {
    for (let i = 0; i < 10; i++) {
      const drill = generateRandomSubnetDrill('medium');
      expect(drill.id).toBeDefined();
      expect(drill.promptFa.length).toBeGreaterThan(10);
      expect(drill.expectedAnswer).toBeDefined();
      expect(drill.derivationStepsFa.length).toBeGreaterThanOrEqual(2);
      expect(drill.optionsFa).toContain(drill.expectedAnswer);
    }
  });

  it('supports easy, medium, and hard difficulty variations', () => {
    const easy = generateRandomSubnetDrill('easy');
    expect(easy.givenCidr).toBeGreaterThanOrEqual(24);
    expect(easy.givenCidr).toBeLessThanOrEqual(28);

    const hard = generateRandomSubnetDrill('hard');
    expect(hard.givenIp.startsWith('10.')).toBe(true);
  });
});
