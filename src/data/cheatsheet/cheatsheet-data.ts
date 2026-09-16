export interface PortEntry {
  port: number;
  proto: 'TCP' | 'UDP' | 'TCP/UDP';
  service: string;
  descriptionFa: string;
}

export interface CidrEntry {
  prefix: string;
  mask: string;
  usableHosts: number;
  blockSize: number;
  useCaseFa: string;
}

export interface CliCommandEntry {
  command: string;
  syntax: string;
  platform: 'Windows' | 'Linux' | 'Cross-platform';
  descriptionFa: string;
}

export const CHEATSHEET_PORTS: PortEntry[] = [
  { port: 20, proto: 'TCP', service: 'FTP Data', descriptionFa: 'انتقال داده‌های فایل در پروتکل FTP' },
  { port: 21, proto: 'TCP', service: 'FTP Control', descriptionFa: 'فرمان‌ها و احراز هویت FTP' },
  { port: 22, proto: 'TCP', service: 'SSH', descriptionFa: 'اتصال امن خط فرمان از راه دور' },
  { port: 23, proto: 'TCP', service: 'Telnet', descriptionFa: 'اتصال متنی ناامن و رمزنگاری‌نشده (منسوخ)' },
  { port: 25, proto: 'TCP', service: 'SMTP', descriptionFa: 'ارسال ایمیل بین میل‌سرورها' },
  { port: 53, proto: 'TCP/UDP', service: 'DNS', descriptionFa: 'تبدیل نام دامنه به آدرس IP' },
  { port: 67, proto: 'UDP', service: 'DHCP Server', descriptionFa: 'گوش دادن سرور به درخواست‌های تخصیص خودکار IP' },
  { port: 68, proto: 'UDP', service: 'DHCP Client', descriptionFa: 'دریافت تنظیمات شبکه توسط کلاینت' },
  { port: 69, proto: 'UDP', service: 'TFTP', descriptionFa: 'انتقال سبک و بدون احراز هویت فایل‌های فریم‌ور' },
  { port: 80, proto: 'TCP', service: 'HTTP', descriptionFa: 'صفحات وب بدون رمزنگاری' },
  { port: 110, proto: 'TCP', service: 'POP3', descriptionFa: 'دانلود ایمیل‌ها از سرور' },
  { port: 123, proto: 'UDP', service: 'NTP', descriptionFa: 'همگام‌سازی زمان و ساعت سیستم‌ها' },
  { port: 143, proto: 'TCP', service: 'IMAP', descriptionFa: 'همگام‌سازی دوطرفه ایمیل‌ها روی سرور' },
  { port: 161, proto: 'UDP', service: 'SNMP', descriptionFa: 'پایش و مانیتورینگ تجهیزات شبکه' },
  { port: 443, proto: 'TCP', service: 'HTTPS', descriptionFa: 'ارتباط امن وب با رمزنگاری TLS/SSL' },
  { port: 445, proto: 'TCP', service: 'SMB', descriptionFa: 'اشتراک‌گذاری فایل و پرینتر در شبکه‌های ویندوزی' },
  { port: 3389, proto: 'TCP', service: 'RDP', descriptionFa: 'ریموت دسکتاپ ویندوز' },
];

export const CHEATSHEET_CIDR: CidrEntry[] = [
  { prefix: '/24', mask: '255.255.255.0', usableHosts: 254, blockSize: 256, useCaseFa: 'شبکه‌های استاندارد اداری کلاس C' },
  { prefix: '/25', mask: '255.255.255.128', usableHosts: 126, blockSize: 128, useCaseFa: 'تفکیک شبکه به ۲ بخش مستقل' },
  { prefix: '/26', mask: '255.255.255.192', usableHosts: 62, blockSize: 64, useCaseFa: 'زیرشبکه شعب یا واحدهای متوسط' },
  { prefix: '/27', mask: '255.255.255.224', usableHosts: 30, blockSize: 32, useCaseFa: 'شبکه سرورها یا تیم‌های کوچک' },
  { prefix: '/28', mask: '255.255.255.240', usableHosts: 14, blockSize: 16, useCaseFa: 'اتاق‌های کنفرانس و دپارتمان‌ها' },
  { prefix: '/29', mask: '255.255.255.248', usableHosts: 6, blockSize: 8, useCaseFa: 'بازه IPهای پابلیک استاتیک مخابرات' },
  { prefix: '/30', mask: '255.255.255.252', usableHosts: 2, blockSize: 4, useCaseFa: 'لینک نقطه به نقطه روتر به روتر' },
  { prefix: '/31', mask: '255.255.255.254', usableHosts: 2, blockSize: 2, useCaseFa: 'لینک‌های P2P طبق استاندارد RFC 3021' },
];

export const CHEATSHEET_CLI: CliCommandEntry[] = [
  { command: 'ipconfig /all', syntax: 'ipconfig /all', platform: 'Windows', descriptionFa: 'مشاهده جزئیات کامل کارت شبکه شامل MAC، IP، Mask، Gateway و DNS' },
  { command: 'ifconfig', syntax: 'ifconfig [interface]', platform: 'Linux', descriptionFa: 'مشاهده مشخصات کارت‌های شبکه در توزیع‌های لینوکس' },
  { command: 'ping', syntax: 'ping [-n count] <target>', platform: 'Cross-platform', descriptionFa: 'ارسال بسته‌های ICMP Echo Request برای بررسی سلامت ارتباط و سنجش تأخیر' },
  { command: 'tracert', syntax: 'tracert <target>', platform: 'Windows', descriptionFa: 'کشف تمام روترها و سوییچ‌های لایه ۳ در طول مسیر بسته' },
  { command: 'traceroute', syntax: 'traceroute <target>', platform: 'Linux', descriptionFa: 'معادل لینوکسی دستور ردیابی گره‌های مسیر با بسته‌های UDP/ICMP' },
  { command: 'arp -a', syntax: 'arp -a', platform: 'Cross-platform', descriptionFa: 'نمایش جدول کش تبدیل آدرس IP به آدرس سخت‌افزاری MAC' },
  { command: 'arp -d', syntax: 'arp -d [ip]', platform: 'Cross-platform', descriptionFa: 'پاک‌سازی رکوردهای قدیمی یا مخدوش جدول ARP' },
  { command: 'netstat -an', syntax: 'netstat -an', platform: 'Cross-platform', descriptionFa: 'مشاهده تمام پورت‌های در حال شنود (Listening) و ارتباطات فعال TCP/UDP' },
  { command: 'nslookup', syntax: 'nslookup <domain> [dns_server]', platform: 'Cross-platform', descriptionFa: 'استعلام مستقیم رکوردهای DNS برای حل نام به IP' },
  { command: 'ipconfig /flushdns', syntax: 'ipconfig /flushdns', platform: 'Windows', descriptionFa: 'تخلیه کامل کش DNS محلی سیستم‌عامل' },
];
