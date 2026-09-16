export interface ExternalResource {
  id: string;
  category: 'rfc' | 'cisco' | 'tools' | 'cert';
  titleFa: string;
  titleEn: string;
  badge: string;
  descriptionFa: string;
  url: string;
}

export const FOUNDATIONAL_ATTRIBUTION = {
  instructorFa: 'مهندس رجایی',
  compilerFa: 'یاسمن وادوی',
  courseNameFa: 'جزوه درس Network+',
  standard: 'CompTIA Network+ N10-008 / N10-009',
  descriptionFa: 'محتوای آموزشی، سناریوهای کاربردی و سرفصل‌های این پلتفرم بر پایه جزوه آموزشی درس Network+ مهندس رجایی و منطبق بر سرفصل‌های بین‌المللی استاندارد CompTIA Network+ گردآوری، بازنویسی و پیاده‌سازی شده است.',
};

export const CURATED_RESOURCES: ExternalResource[] = [
  {
    id: 'res-rfc-791',
    category: 'rfc',
    titleFa: 'استاندارد بنیادین پروتکل اینترنت (IPv4)',
    titleEn: 'RFC 791 - Internet Protocol Specification',
    badge: 'RFC 791',
    descriptionFa: 'سند رسمی تعریف ساختار سرآیند ۳۲ بیتی IP، تکه‌تکه‌سازی بسته‌ها (Fragmentation) و آدرس‌دهی جهانی.',
    url: 'https://datatracker.ietf.org/doc/html/rfc791',
  },
  {
    id: 'res-rfc-793',
    category: 'rfc',
    titleFa: 'مشخصات پروتکل کنترل انتقال (TCP)',
    titleEn: 'RFC 793 - Transmission Control Protocol',
    badge: 'RFC 793',
    descriptionFa: 'مرجع رسمی دست‌تکانی سه‌مرحله‌ای (3-Way Handshake)، مکانیزم پنجره لغزان، کنترل جریان و پرچم‌های SYN/ACK.',
    url: 'https://datatracker.ietf.org/doc/html/rfc793',
  },
  {
    id: 'res-rfc-1918',
    category: 'rfc',
    titleFa: 'تخصیص آدرس‌های خصوصی اینترنت (Private IPs)',
    titleEn: 'RFC 1918 - Address Allocation for Private Internets',
    badge: 'RFC 1918',
    descriptionFa: 'سند استاندارد تعیین بازه‌های خصوصی 10.0.0.0/8، 172.16.0.0/12 و 192.168.0.0/16 جهت مقابله با اتمام آدرس‌های IPv4.',
    url: 'https://datatracker.ietf.org/doc/html/rfc1918',
  },
  {
    id: 'res-rfc-826',
    category: 'rfc',
    titleFa: 'پروتکل تفکیک آدرس سخت‌افزاری (ARP)',
    titleEn: 'RFC 826 - Ethernet Address Resolution Protocol',
    badge: 'RFC 826',
    descriptionFa: 'نحوه تبدیل آدرس‌های منطقی شبکه (IP) به آدرس‌های فیزیکی سخت‌افزار (MAC) در شبکه‌های محلی اترنت.',
    url: 'https://datatracker.ietf.org/doc/html/rfc826',
  },
  {
    id: 'res-rfc-2131',
    category: 'rfc',
    titleFa: 'پروتکل پیکربندی خودکار میزبان (DHCP)',
    titleEn: 'RFC 2131 - Dynamic Host Configuration Protocol',
    badge: 'RFC 2131',
    descriptionFa: 'تعریف چرخه چهارگانه DORA (Discover, Offer, Request, Acknowledge) و مکانیزم اجاره آدرس‌های شبکه.',
    url: 'https://datatracker.ietf.org/doc/html/rfc2131',
  },
  {
    id: 'res-rfc-1035',
    category: 'rfc',
    titleFa: 'ساختار سامانه نام‌های دامنه اینترنت (DNS)',
    titleEn: 'RFC 1035 - Domain Names: Implementation & Specification',
    badge: 'RFC 1035',
    descriptionFa: 'معماری سلسله‌مراتبی سرورهای ریشه، TLD و انواع رکوردهای A، CNAME، MX، TXT و SOA.',
    url: 'https://datatracker.ietf.org/doc/html/rfc1035',
  },
  {
    id: 'res-rfc-3021',
    category: 'rfc',
    titleFa: 'زیرشبکه‌سازی ۳۱ بیتی در لینک‌های نقطه به نقطه',
    titleEn: 'RFC 3021 - Using 31-Bit Prefixes on IPv4 Point-to-Point Links',
    badge: 'RFC 3021',
    descriptionFa: 'روش مدرن صرفه‌جویی در آدرس‌های IPv4 بین روترها با استفاده از پیشوند /31 بدون اتلاف آدرس‌های شبکه و برودکست.',
    url: 'https://datatracker.ietf.org/doc/html/rfc3021',
  },
  {
    id: 'res-tool-wireshark',
    category: 'tools',
    titleFa: 'ابزار بازرسی و تحلیل عمیق بسته‌ها (Wireshark)',
    titleEn: 'Wireshark Packet Analyzer',
    badge: 'ابزار تحلیل بسته',
    descriptionFa: 'استاندارد طلایی جهانی برای تحلیل ترافیک شبکه، مشاهده بایت‌به‌بایت سرآیندهای پروتکل‌های TCP، IP، ARP و DNS.',
    url: 'https://www.wireshark.org/',
  },
  {
    id: 'res-tool-packet-tracer',
    category: 'tools',
    titleFa: 'نرم‌افزار شبیه‌ساز توپولوژی‌های شبکه (Cisco Packet Tracer)',
    titleEn: 'Cisco Packet Tracer Simulator',
    badge: 'شبیه‌ساز شبکه',
    descriptionFa: 'محیط رایگان و بصری سیسکو برای شبیه‌سازی پیکربندی روترها، سوئیچ‌ها، وی‌لن‌ها و خطوط ارتباطی شبکه.',
    url: 'https://www.netacad.com/courses/packet-tracer',
  },
  {
    id: 'res-tool-nmap',
    category: 'tools',
    titleFa: 'اسکنر امنیتی پورت‌ها و کاوشگر شبکه (Nmap)',
    titleEn: 'Nmap Network Security Scanner',
    badge: 'ابزار ممیزی پورت',
    descriptionFa: 'ابزار قدرتمند خط فرمان برای اسکن پورت‌های باز، تشخیص سیستم‌عامل و کشف خدمات فعال روی سرورها.',
    url: 'https://nmap.org/',
  },
  {
    id: 'res-cisco-docs',
    category: 'cisco',
    titleFa: 'مستندات مرجع معماری شبکه سیسکو',
    titleEn: 'Cisco Networking Architecture Guides',
    badge: 'معماری سیسکو',
    descriptionFa: 'راهنماهای رسمی طراحی مدل سه‌لایه‌ای شبکه (Core, Distribution, Access) و پیکربندی سوئیچ‌ها.',
    url: 'https://www.cisco.com/c/en/us/support/index.html',
  },
];
