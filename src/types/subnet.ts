export type IpClass = 'A' | 'B' | 'C' | 'D' | 'E';

export interface SubnetCalculation {
  inputIp: string;
  cidr: number;
  subnetMask: string;
  networkAddress: string;
  broadcastAddress: string;
  firstUsableIp: string;
  lastUsableIp: string;
  totalHosts: number;
  usableHosts: number;
  binaryIp: string;
  binaryMask: string;
  ipClass: IpClass;
  isPrivate: boolean;
  isRfc3021PointToPoint?: boolean;
}

export type SubnetDrillType = 
  | 'network_id' 
  | 'broadcast' 
  | 'usable_range' 
  | 'host_count' 
  | 'cidr_to_mask';

export interface SubnetDrill {
  id: string;
  type: SubnetDrillType;
  promptFa: string;
  givenIp: string;
  givenCidr: number;
  expectedAnswer: string;
  optionsFa?: string[];
  derivationStepsFa: string[];
}
