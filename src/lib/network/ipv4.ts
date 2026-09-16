import { SubnetCalculation, IpClass } from '../../types/subnet';

/**
 * Pure TypeScript Bitwise IPv4 Calculation Library.
 * Handles bitwise operations, CIDR prefix masks, RFC 1918 private check, RFC 3021 /31 point-to-point.
 */

export function ipToInt(ip: string): number {
  return ip
    .trim()
    .split('.')
    .reduce((acc, octet) => ((acc << 8) + parseInt(octet, 10)) >>> 0, 0);
}

export function intToIp(intVal: number): string {
  return [
    (intVal >>> 24) & 255,
    (intVal >>> 16) & 255,
    (intVal >>> 8) & 255,
    intVal & 255,
  ].join('.');
}

export function cidrToMaskInt(cidr: number): number {
  if (cidr <= 0) return 0;
  if (cidr >= 32) return 0xffffffff >>> 0;
  return ((0xffffffff << (32 - cidr)) >>> 0);
}

export function cidrToSubnetMask(cidr: number): string {
  return intToIp(cidrToMaskInt(cidr));
}

export function toBinaryOctets(intVal: number): string {
  return [
    ((intVal >>> 24) & 255).toString(2).padStart(8, '0'),
    ((intVal >>> 16) & 255).toString(2).padStart(8, '0'),
    ((intVal >>> 8) & 255).toString(2).padStart(8, '0'),
    (intVal & 255).toString(2).padStart(8, '0'),
  ].join('.');
}

export function determineIpClass(firstOctet: number): IpClass {
  if (firstOctet >= 1 && firstOctet <= 126) return 'A';
  if (firstOctet >= 128 && firstOctet <= 191) return 'B';
  if (firstOctet >= 192 && firstOctet <= 223) return 'C';
  if (firstOctet >= 224 && firstOctet <= 239) return 'D';
  return 'E';
}

export function isPrivateIp(ip: string): boolean {
  const intVal = ipToInt(ip);
  // 10.0.0.0/8: 10.0.0.0 to 10.255.255.255
  const isClassA = (intVal >>> 24) === 10;
  // 172.16.0.0/12: 172.16.0.0 to 172.31.255.255
  const isClassB = (intVal >>> 20) === ((172 << 4) | 1);
  // 192.168.0.0/16: 192.168.0.0 to 192.168.255.255
  const isClassC = (intVal >>> 16) === ((192 << 8) | 168);

  return isClassA || isClassB || isClassC;
}

export function calculateSubnet(ip: string, cidr: number): SubnetCalculation {
  const normalizedCidr = Math.max(0, Math.min(32, Math.floor(cidr)));
  const ipIntVal = ipToInt(ip);
  const maskIntVal = cidrToMaskInt(normalizedCidr);

  const netIntVal = (ipIntVal & maskIntVal) >>> 0;
  const invMask = (~maskIntVal) >>> 0;
  const bcastIntVal = (netIntVal | invMask) >>> 0;

  const totalHosts = Math.pow(2, 32 - normalizedCidr);

  let usableHosts = 0;
  let firstUsableInt = 0;
  let lastUsableInt = 0;
  let isRfc3021 = false;

  if (normalizedCidr === 32) {
    usableHosts = 1;
    firstUsableInt = netIntVal;
    lastUsableInt = netIntVal;
  } else if (normalizedCidr === 31) {
    // RFC 3021: Point-to-Point links with 2 usable host addresses
    usableHosts = 2;
    firstUsableInt = netIntVal;
    lastUsableInt = bcastIntVal;
    isRfc3021 = true;
  } else if (normalizedCidr <= 30) {
    usableHosts = Math.max(0, totalHosts - 2);
    firstUsableInt = netIntVal + 1;
    lastUsableInt = bcastIntVal - 1;
  }

  const firstOctet = parseInt(ip.split('.')[0] || '0', 10);

  return {
    inputIp: ip.trim(),
    cidr: normalizedCidr,
    subnetMask: intToIp(maskIntVal),
    networkAddress: intToIp(netIntVal),
    broadcastAddress: intToIp(bcastIntVal),
    firstUsableIp: intToIp(firstUsableInt),
    lastUsableIp: intToIp(lastUsableInt),
    totalHosts,
    usableHosts,
    binaryIp: toBinaryOctets(ipIntVal),
    binaryMask: toBinaryOctets(maskIntVal),
    ipClass: determineIpClass(firstOctet),
    isPrivate: isPrivateIp(ip),
    isRfc3021PointToPoint: isRfc3021,
  };
}

export function isValidIpv4(ip: string): boolean {
  const parts = ip.trim().split('.');
  if (parts.length !== 4) return false;
  return parts.every((p) => {
    if (!/^\d+$/.test(p)) return false;
    const n = parseInt(p, 10);
    return n >= 0 && n <= 255;
  });
}
