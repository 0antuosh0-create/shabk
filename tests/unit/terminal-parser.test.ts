import { describe, it, expect } from 'vitest';
import { TerminalEngine } from '../../src/lib/network/terminal-engine';

describe('TerminalEngine Command Parser & Alias Tests', () => {
  const engine = new TerminalEngine();

  it('correctly tokenizes command, args, and slash flags', () => {
    const parsed = engine.parseCommand('ipconfig /all /flushdns');
    expect(parsed.command).toBe('ipconfig');
    expect(parsed.flags['all']).toBe(true);
    expect(parsed.flags['flushdns']).toBe(true);
    expect(parsed.args).toHaveLength(0);
  });

  it('correctly tokenizes dash flags and value arguments', () => {
    const parsed = engine.parseCommand('ping -n 5 8.8.8.8');
    expect(parsed.command).toBe('ping');
    expect(parsed.flags['n']).toBe('5');
    expect(parsed.args).toContain('8.8.8.8');
  });

  it('handles empty input gracefully', () => {
    const res = engine.execute('');
    expect(res.lines).toHaveLength(0);
    expect(res.exitCode).toBe(0);
  });

  it('executes ifconfig alias and includes cross-platform educational tip', () => {
    const res = engine.execute('ifconfig');
    expect(res.exitCode).toBe(0);
    const hasTip = res.lines.some((l) => l.type === 'educational-tip' && l.text.includes('ویندوز'));
    expect(hasTip).toBe(true);
    const hasEth0 = res.lines.some((l) => l.text.includes('eth0:'));
    expect(hasEth0).toBe(true);
  });

  it('executes traceroute alias with tip', () => {
    const res = engine.execute('traceroute 8.8.8.8');
    expect(res.exitCode).toBe(0);
    const hasTip = res.lines.some((l) => l.type === 'educational-tip');
    expect(hasTip).toBe(true);
  });

  it('rejects unknown commands with helpful suggestion', () => {
    const res = engine.execute('hack_the_planet');
    expect(res.exitCode).toBe(1);
    expect(res.lines[0].type).toBe('error');
    expect(res.lines[1].text).toContain('help');
  });
});
