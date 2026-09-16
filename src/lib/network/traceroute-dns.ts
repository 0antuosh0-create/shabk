export interface TraceHop {
  hop: number;
  ip: string;
  hostname?: string;
  latencyMs: number;
}

const DEFAULT_TRACE_PATHS: Record<string, TraceHop[]> = {
  '8.8.8.8': [
    { hop: 1, ip: '192.168.1.1', hostname: 'gateway.local', latencyMs: 2 },
    { hop: 2, ip: '10.20.0.1', hostname: 'isp-gateway.tehran.ir', latencyMs: 8 },
    { hop: 3, ip: '178.22.1.254', hostname: 'tic-gw1.infra.ir', latencyMs: 14 },
    { hop: 4, ip: '72.14.215.12', hostname: 'google-edge.frankfurt.de', latencyMs: 38 },
    { hop: 5, ip: '8.8.8.8', hostname: 'dns.google', latencyMs: 42 },
  ],
  'google.com': [
    { hop: 1, ip: '192.168.1.1', hostname: 'gateway.local', latencyMs: 2 },
    { hop: 2, ip: '10.20.0.1', hostname: 'isp-gateway.tehran.ir', latencyMs: 7 },
    { hop: 3, ip: '178.22.1.254', hostname: 'core1.infra.ir', latencyMs: 15 },
    { hop: 4, ip: '142.250.185.206', hostname: 'fra16s50-in-f14.1e100.net', latencyMs: 45 },
  ],
  'default': [
    { hop: 1, ip: '192.168.1.1', hostname: 'router.home', latencyMs: 1 },
    { hop: 2, ip: '10.50.1.1', hostname: 'isp-bras.net', latencyMs: 9 },
    { hop: 3, ip: '185.143.232.1', hostname: 'core-router.shabk.ir', latencyMs: 19 },
  ]
};

export function resolveTraceRoute(target: string): TraceHop[] {
  const clean = target.trim().toLowerCase();
  if (DEFAULT_TRACE_PATHS[clean]) {
    return DEFAULT_TRACE_PATHS[clean];
  }
  const defaultPath = DEFAULT_TRACE_PATHS['default'];
  return [
    ...defaultPath,
    { hop: defaultPath.length + 1, ip: clean.includes('.') ? clean : '185.143.232.50', hostname: clean, latencyMs: 26 }
  ];
}

export function queryDns(
  domain: string,
  serverIp: string = '8.8.8.8'
): {
  server: string;
  address: string;
  aliases?: string[];
  ttl: number;
} {
  const dnsRecords: Record<string, string> = {
    'google.com': '142.250.185.206',
    'www.google.com': '142.250.185.206',
    'yahoo.com': '98.137.11.163',
    'shabk.ir': '185.143.232.50',
    'dns.google': '8.8.8.8',
    'cloudflare.com': '104.16.132.229',
  };

  const cleanDomain = domain.trim().toLowerCase();
  const resolved = dnsRecords[cleanDomain] || '185.143.232.50';

  return {
    server: serverIp,
    address: resolved,
    ttl: 300,
  };
}
