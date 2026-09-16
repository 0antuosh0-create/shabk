import { describe, it, expect } from 'vitest';
import {
  calculateSubnet,
  ipToInt,
  intToIp,
  cidrToSubnetMask,
  isPrivateIp,
  determineIpClass,
} from '../../src/lib/network/ipv4';

describe('IPv4 Subnet Math & Bitwise Calculations', () => {
  it('converts IP string to 32-bit integer and back', () => {
    const ip = '192.168.1.10';
    const intVal = ipToInt(ip);
    expect(intToIp(intVal)).toBe(ip);
  });

  it('correctly maps CIDR prefix to subnet mask', () => {
    expect(cidrToSubnetMask(24)).toBe('255.255.255.0');
    expect(cidrToSubnetMask(26)).toBe('255.255.255.192');
    expect(cidrToSubnetMask(30)).toBe('255.255.255.252');
    expect(cidrToSubnetMask(16)).toBe('255.255.0.0');
    expect(cidrToSubnetMask(8)).toBe('255.0.0.0');
  });

  it('calculates class C subnetting /26 correctly', () => {
    const res = calculateSubnet('192.168.10.45', 26);
    expect(res.subnetMask).toBe('255.255.255.192');
    expect(res.networkAddress).toBe('192.168.10.0');
    expect(res.broadcastAddress).toBe('192.168.10.63');
    expect(res.firstUsableIp).toBe('192.168.10.1');
    expect(res.lastUsableIp).toBe('192.168.10.62');
    expect(res.usableHosts).toBe(62);
    expect(res.totalHosts).toBe(64);
    expect(res.ipClass).toBe('C');
    expect(res.isPrivate).toBe(true);
  });

  it('calculates class B subnetting /22 correctly', () => {
    const res = calculateSubnet('172.16.10.75', 22);
    expect(res.subnetMask).toBe('255.255.252.0');
    expect(res.networkAddress).toBe('172.16.8.0');
    expect(res.broadcastAddress).toBe('172.16.11.255');
    expect(res.firstUsableIp).toBe('172.16.8.1');
    expect(res.lastUsableIp).toBe('172.16.11.254');
    expect(res.usableHosts).toBe(1022);
  });

  it('supports RFC 3021 /31 point-to-point links with 2 usable addresses', () => {
    const res = calculateSubnet('10.0.0.0', 31);
    expect(res.usableHosts).toBe(2);
    expect(res.firstUsableIp).toBe('10.0.0.0');
    expect(res.lastUsableIp).toBe('10.0.0.1');
    expect(res.isRfc3021PointToPoint).toBe(true);
  });

  it('supports single host route /32', () => {
    const res = calculateSubnet('8.8.8.8', 32);
    expect(res.usableHosts).toBe(1);
    expect(res.networkAddress).toBe('8.8.8.8');
    expect(res.broadcastAddress).toBe('8.8.8.8');
  });

  it('correctly identifies RFC 1918 private vs public IP addresses', () => {
    expect(isPrivateIp('10.5.20.1')).toBe(true);
    expect(isPrivateIp('172.20.1.1')).toBe(true);
    expect(isPrivateIp('192.168.1.100')).toBe(true);
    expect(isPrivateIp('8.8.8.8')).toBe(false);
    expect(isPrivateIp('1.1.1.1')).toBe(false);
    expect(isPrivateIp('172.32.0.1')).toBe(false); // 172.32 is outside 172.16-31
  });

  it('determines traditional IPv4 classes A, B, C, D, E', () => {
    expect(determineIpClass(10)).toBe('A');
    expect(determineIpClass(172)).toBe('B');
    expect(determineIpClass(192)).toBe('C');
    expect(determineIpClass(224)).toBe('D');
    expect(determineIpClass(245)).toBe('E');
  });
});
