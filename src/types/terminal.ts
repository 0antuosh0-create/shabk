export type SupportedCommand = 
  | 'ping' 
  | 'tracert' 
  | 'traceroute' 
  | 'ipconfig' 
  | 'ifconfig' 
  | 'ip' 
  | 'arp' 
  | 'netstat' 
  | 'nslookup' 
  | 'dig' 
  | 'help' 
  | 'clear';

export type OutputLineType = 
  | 'normal' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'header' 
  | 'table-row' 
  | 'educational-tip';

export interface OutputLine {
  id: string;
  text: string;
  type: OutputLineType;
  isLtr?: boolean;
}

export interface TerminalCommand {
  rawInput: string;
  command: string;
  args: string[];
  flags: Record<string, string | boolean | number>;
}

export interface TerminalOutput {
  lines: OutputLine[];
  exitCode: number;
  error?: string;
  stateDelta?: {
    arpTableUpdated?: boolean;
    ipConfigChanged?: boolean;
    dnsCacheCleared?: boolean;
  };
}
