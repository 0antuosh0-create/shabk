import { VirtualNetworkNode } from '../../types/network';

export interface TroubleshootingLabScenario {
  id: string;
  moduleId: string;
  titleFa: string;
  titleEn: string;
  scenarioBriefFa: string;
  symptomsFa: string[];
  initialTopology: VirtualNetworkNode[];
  hintsFa: string[];
  verifySolution: (nodes: VirtualNetworkNode[]) => { isSolved: boolean; messageFa: string };
  diagnosticTakeawayFa: string;
}

export const TROUBLESHOOTING_SCENARIOS: TroubleshootingLabScenario[] = [
  {
    id: 'lab-gateway-outage',
    moduleId: 'module-4',
    titleFa: 'سناریوی ۱: قطعی اینترنت به دلیل درگاه پیش‌فرض نامعتبر',
    titleEn: 'Default Gateway Subnet Mismatch',
    scenarioBriefFa: 'کاربر کامپیوتر PC-A گزارش داده است که به هیچ وب‌سایتی در اینترنت دسترسی ندارد. ارتباط با کامپیوترهای اتاق همکاران برقرار است اما پینگ به آدرس 8.8.8.8 با خطای Timeout روبرو می‌شود.',
    symptomsFa: [
      'کامپیوتر کلاینت قادر به پینگ کردن 8.8.8.8 یا هیچ آدرس خارجی دیگری نیست.',
      'پینگ به کامپیوتر کناری (192.168.1.20) به درستی پاسخ می‌دهد.',
    ],
    hintsFa: [
      'دستور ipconfig را اجرا کنید و بررسی کنید آیا آدرس IP و Default Gateway در یک ساب‌نت قرار دارند؟',
      'آدرس IP سیستم 192.168.1.10 با ماسک 255.255.255.0 است، اما درگاه پیش‌فرض روی 192.168.2.1 تنظیم شده است!',
      'دستور ipconfig /renew را وارد کنید تا روتر آدرس گیت‌وی صحیح (192.168.1.1) را مجدداً به کارت شبکه اختصاص دهد.',
    ],
    initialTopology: [
      {
        id: 'host-a',
        name: 'PC-A (Client)',
        type: 'host',
        interfaces: [
          {
            name: 'eth0',
            macAddress: '00:1A:2B:3C:4D:01',
            ipAddress: '192.168.1.10',
            subnetMask: '255.255.255.0',
            cidr: 24,
            defaultGateway: '192.168.2.1', // Fault: In wrong subnet 192.168.2.x!
            status: 'up',
          },
        ],
        arpTable: {},
      },
      {
        id: 'host-b',
        name: 'PC-B (Local)',
        type: 'host',
        interfaces: [
          {
            name: 'eth0',
            macAddress: '00:1A:2B:3C:4D:02',
            ipAddress: '192.168.1.20',
            subnetMask: '255.255.255.0',
            cidr: 24,
            defaultGateway: '192.168.1.1',
            status: 'up',
          },
        ],
        arpTable: {},
      },
    ],
    verifySolution: (nodes) => {
      const hostA = nodes.find((n) => n.id === 'host-a');
      const iface = hostA?.interfaces[0];
      if (iface && iface.defaultGateway === '192.168.1.1') {
        return {
          isSolved: true,
          messageFa: 'عالی بود! گیت‌وی روی 192.168.1.1 تنظیم شد و اتصال به اینترنت برقرار گردید.',
        };
      }
      return {
        isSolved: false,
        messageFa: 'گیت‌وی هنوز به درستی تنظیم نشده است. گیت‌وی صحیح 192.168.1.1 است.',
      };
    },
    diagnosticTakeawayFa: 'همواره توجه داشته باشید که آدرس درگاه پیش‌فرض (Default Gateway) الزاماً باید درون همان ساب‌نت محلی کارت شبکه کامپیوتر قرار داشته باشد؛ در غیر این صورت روتر اصلاً بسته‌های خروجی را دریافت نخواهد کرد.',
  },
  {
    id: 'lab-dns-failure',
    moduleId: 'module-5',
    titleFa: 'سناریوی ۲: اختلال نام‌گذاری DNS و عدم دسترسی به دامنه‌ها',
    titleEn: 'DNS Name Resolution Failure',
    scenarioBriefFa: 'کاربر اعلام می‌کند مرورگر ارور Server Not Found می‌دهد. با این حال ابزار پینگ به آدرس‌های عددی مانند 8.8.8.8 کار می‌کند.',
    symptomsFa: [
      'دستور ping 8.8.8.8 موفق است.',
      'دستور ping google.com با خطای عدم شناسایی نام مواجه می‌شود.',
    ],
    hintsFa: [
      'با دستور nslookup google.com بررسی کنید که آیا سرور DNS پاسخگو است؟',
      'حافظه موقت کش سیستم را با ipconfig /flushdns تخلیه کنید.',
      'با دستور nslookup google.com 8.8.8.8 از سرور عمومی مطمئن استفاده نمایید.',
    ],
    initialTopology: [
      {
        id: 'host-a',
        name: 'PC-A (Client)',
        type: 'host',
        interfaces: [
          {
            name: 'eth0',
            macAddress: '00:1A:2B:3C:4D:01',
            ipAddress: '192.168.1.10',
            subnetMask: '255.255.255.0',
            cidr: 24,
            defaultGateway: '192.168.1.1',
            status: 'up',
          },
        ],
        arpTable: {},
        dnsConfig: {
          primaryServer: '192.168.1.250', // Fault: unresponsive local DNS
          records: {},
        },
      },
    ],
    verifySolution: (nodes) => {
      const hostA = nodes.find((n) => n.id === 'host-a');
      const dns = hostA?.dnsConfig;
      if (dns && (dns.primaryServer === '8.8.8.8' || Object.keys(dns.records).length > 0)) {
        return { isSolved: true, messageFa: 'سرویس DNS به‌درستی بازیابی شد و دامنه‌ها حل نام می‌شوند.' };
      }
      return { isSolved: false, messageFa: 'سرویس DNS هنوز امکان حل نام ندارد.' };
    },
    diagnosticTakeawayFa: 'اگر پینگ به آدرس عددی کار می‌کند اما پینگ به نام دامنه خطا می‌دهد، مشکل صد در صد مربوط به لایه کاربرد و پروتکل DNS است و ارتباطات لایه‌های ۱ تا ۳ کاملاً سالم هستند.',
  },
  {
    id: 'lab-arp-poison',
    moduleId: 'module-3',
    titleFa: 'سناریوی ۳: مسمومیت جدول ARP و قطعی ترافیک خروجی',
    titleEn: 'Stale ARP Cache Inconsistency',
    scenarioBriefFa: 'روتر جدیدی در شرکت نصب شده و مک‌آدرس گیت‌وی تغییر کرده است، اما سیستم همچنان ترافیک را به مک‌آدرس روتر قبلی می‌فرستد.',
    symptomsFa: [
      'دستور arp -a مک‌آدرس نامعتبر قدیمی را برای گیت‌وی نشان می‌دهد.',
      'بسته‌های خروجی بی‌پاسخ می‌مانند.',
    ],
    hintsFa: [
      'دستور arp -a را برای بررسی رکوردهای جدول مک کارت شبکه اجرا کنید.',
      'از دستور arp -d برای پاک کردن رکوردهای قدیمی استفاده کنید تا سیستم با ارسال مجدد ARP Request مک‌آدرس جدید را دریافت کند.',
    ],
    initialTopology: [
      {
        id: 'host-a',
        name: 'PC-A (Client)',
        type: 'host',
        interfaces: [
          {
            name: 'eth0',
            macAddress: '00:1A:2B:3C:4D:01',
            ipAddress: '192.168.1.10',
            subnetMask: '255.255.255.0',
            cidr: 24,
            defaultGateway: '192.168.1.1',
            status: 'up',
          },
        ],
        arpTable: {
          '192.168.1.1': {
            ipAddress: '192.168.1.1',
            macAddress: 'DE:AD:BE:EF:00:01', // Fault: Stale wrong MAC
            type: 'dynamic',
            updatedAt: Date.now() - 600000,
          },
        },
      },
    ],
    verifySolution: (nodes) => {
      const hostA = nodes.find((n) => n.id === 'host-a');
      const entry = hostA?.arpTable['192.168.1.1'];
      if (!entry || entry.macAddress === '00:1A:2B:3C:4D:FE') {
        return { isSolved: true, messageFa: 'کش مخدوش ARP پاک شد و مک‌آدرس روتر تازه شناخته شد.' };
      }
      return { isSolved: false, messageFa: 'هنوز رکورد قدیمی در جدول ARP وجود دارد.' };
    },
    diagnosticTakeawayFa: 'هنگام تعویض تجهیزات شبکه یا بروز حملات ARP Spoofing، پاک‌سازی جدول ARP با دستور arp -d سیستم‌عامل را وادار به کشف آدرس‌های سخت‌افزاری تازه می‌کند.',
  },
  {
    id: 'lab-ip-conflict',
    moduleId: 'module-4',
    titleFa: 'سناریوی ۴: تداخل آدرس IP با کامپیوتر دیگر (Duplicate IP)',
    titleEn: 'IP Address Conflict Resolution',
    scenarioBriefFa: 'کامپیوتر کلاینت گزارش خطای Windows IP Conflict دریافت کرده و ارتباط اینترنت به طور متناوب قطع و وصل می‌شود.',
    symptomsFa: [
      'یک دستگاه دیگر در شبکه محلی دقیقاً همان آدرس 192.168.1.10 را به صورت دستی ست کرده است.',
    ],
    hintsFa: [
      'دستور ipconfig /release و سپس ipconfig /renew را اجرا کنید تا از طریق سرور DHCP یک آدرس اختصاصی آزاد دریافت نمایید.',
    ],
    initialTopology: [
      {
        id: 'host-a',
        name: 'PC-A (Client)',
        type: 'host',
        interfaces: [
          {
            name: 'eth0',
            macAddress: '00:1A:2B:3C:4D:01',
            ipAddress: '192.168.1.10',
            subnetMask: '255.255.255.0',
            cidr: 24,
            defaultGateway: '192.168.1.1',
            status: 'up',
          },
        ],
        arpTable: {},
      },
    ],
    verifySolution: (nodes) => {
      const hostA = nodes.find((n) => n.id === 'host-a');
      const ip = hostA?.interfaces[0]?.ipAddress;
      if (ip && ip !== '192.168.1.10' && ip.startsWith('192.168.1.')) {
        return { isSolved: true, messageFa: 'آدرس جدید بدون تداخل اختصاص یافت و ارتباط تثبیت شد.' };
      }
      return { isSolved: false, messageFa: 'آدرس هنوز با دستگاه دیگر تداخل دارد.' };
    },
    diagnosticTakeawayFa: 'هیچ دو کارت شبکه‌ای در یک دامنه انتشار نمی‌توانند آدرس IP یکسان داشته باشند؛ در غیر این صورت سوئیچ فریم‌ها را به صورت متناوب بین دو پورت سرگردان می‌کند.',
  }
];
