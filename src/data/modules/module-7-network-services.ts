import { CourseModule } from '../../types/course';

export const module7NetworkServices: CourseModule = {
  id: 'module-7',
  order: 7,
  titleFa: 'سرویس‌های بنیادین شبکه و لایه کاربرد (DHCP & DNS)',
  titleEn: 'Core Network Services: DHCP, DNS & Application Protocols',
  descriptionFa: 'فرآیند تخصیص خودکار آدرس با DHCP، واسط رله (DHCP Relay)، ساختار سلسله‌مراتبی DNS، انواع رکوردها (A, CNAME, MX, TXT) و ابزار nslookup.',
  estimatedMinutes: 60,
  icon: 'Server',
  lessons: [
    {
      id: 'lesson-7-1',
      order: 1,
      titleFa: 'پروتکل DHCP، چرخه چهارمرحله‌ای DORA و مفهوم DHCP Relay',
      titleEn: 'DHCP DORA Cycle, Scopes & DHCP Relay Agent',
      visualizerType: 'none',
      keyTakeawaysFa: [
        'پروتکل DHCP تخصیص خودکار آدرس‌های IP، ساب‌نت ماسک، گیت‌وی و DNS را بر عهده دارد.',
        'چرخه چهارمرحله‌ای DORA: Discover (برودکست کلاینت) -> Offer (پیشنهاد سرور) -> Request (درخواست رسمی کلاینت) -> Acknowledge (تأیید نهایی سرور).',
        'مفاهیم کلیدی: Scope (محدوده IPهای آزاد)، Lease Time (مدت اجاره)، و Reservation (رزرو یک IP خاص برای مک‌آدرس پرینتر یا سرور).',
        'چالش روترها: چون روتر برودکست را بلاک می‌کند، برای دریافت IP از سرور DHCP در ساب‌نت دیگر، روی روتر قابلیت DHCP Relay (یا IP Helper-Address) فعال می‌شود.'
      ],
      contentMarkdownFa: `
### چرخه حیاتی DORA برای دریافت خودکار IP

وقتی کابل شبکه را به کامپیوتر متصل می‌کنید:
1. **Discover (کلاینت به کل شبکه - Broadcast)**:
   * فرستنده: \`0.0.0.0\` | گیرنده: \`255.255.255.255\` (پورت ۶۷).
   * کلاینت فریاد می‌زند: "آیا در این ساب‌نت سرور DHCP وجود دارد؟"
2. **Offer (سرور به کلاینت - Unicast یا Broadcast)**:
   * سرور DHCP از Scope خود یک آدرس آزاد انتخاب کرده و پیشنهاد می‌دهد: "می‌توانم آدرس \`192.168.1.50\` را با ماسک \`255.255.255.0\` به مدت ۸ روز به تو اختصاص دهم."
3. **Request (کلاینت به سرور)**:
   * کلاینت پیشنهاد را تأیید می‌کند تا سایر سرورهای احتمالی مطلع شده و آدرس‌های پیشنهادی خود را پس بگیرند.
4. **Acknowledge (سرور به کلاینت - ACK)**:
   * سرور تایید نهایی را صادر می‌کند و زمان اجاره (**Lease Time**) رسماً آغاز می‌شود.

### واسط رله (DHCP Relay Agent) چیست؟

اگر در شرکتی ۵ وی‌لن (VLAN) مختلف داشته باشیم، آیا باید ۵ سرور DHCP فیزیکی بخریم؟ خیر!
یک سرور DHCP مرکزی در اتاق سرور قرار می‌دهیم. روتر یا سوئیچ لایه ۳ با قابلیت **DHCP Relay (یا ip helper-address در سیسکو)** بسته برودکست Discover کلاینت را دریافت کرده، آن را به یک بسته یونیکست لایه ۳ تبدیل می‌کند و برای سرور مرکزی می‌فرستد.
      `,
    },
    {
      id: 'lesson-7-2',
      order: 2,
      titleFa: 'سامانه نام دامنه (DNS)؛ دفترچه تلفن اینترنت و انواع رکوردهای کلیدی',
      titleEn: 'DNS Architecture & Essential Record Types',
      visualizerType: 'none',
      keyTakeawaysFa: [
        'وظیفه DNS ترجمه نام‌های متنی خوانا برای انسان (google.com) به آدرس‌های عددی ماشین (142.250.185.206) است.',
        'سلسله‌مراتب درختی: سرورهای ریشه (Root .)، سرورهای دامنه سطح بالا (TLD مانند com. و ir.)، و سرورهای مقتدر (Authoritative).',
        'انواع رکوردهای مهم: رکورد A (آدرس IPv4)، رکورد AAAA (آدرس IPv6)، رکورد CNAME (نام مستعار)، رکورد MX (سرور ایمیل)، رکورد TXT (احراز هویت SPF و DKIM برای جلوگیری از اسپم).',
        'ترتیب تفکیک نام: فایل محلی hosts -> کش موقت DNS سیستم‌عامل -> سرور DNS محلی کارت شبکه.'
      ],
      contentMarkdownFa: `
### جدول رکوردهای حیاتی DNS در بازار کار

| نوع رکورد | نام کامل | کاربرد و مثال |
| :--- | :--- | :--- |
| **A** | Address Record | نگاشت نام دامنه به آدرس ۳۲ بیتی IPv4 (\`example.com -> 93.184.216.34\`) |
| **AAAA** | IPv6 Address | نگاشت نام دامنه به آدرس ۱۲۸ بیتی IPv6 (\`example.com -> 2606:2800:...\`) |
| **CNAME** | Canonical Name | نام مستعار؛ اتصال یک زیردامنه به نام دیگر (\`ftp.site.com -> site.com\`) |
| **MX** | Mail Exchanger | مشخص‌کننده سرور دریافت ایمیل شرکت همراه با اولویت عددی (\`mail.google.com\`) |
| **TXT** | Text Record | متن آزاد؛ پرکاربرد برای اعتبارسنجی مالکیت دامنه و پروتکل‌های امنیتی ایمیل (SPF/DKIM) |
| **PTR** | Pointer Record | عکس رکورد A؛ تبدیل آدرس IP به نام دامنه (Reverse DNS Lookup) |
| **NS** | Name Server | مشخص‌کننده سرورهای مقتدر صاحب دامنه |

### فایل جادویی \`hosts\`

در سیستم‌عامل‌های ویندوز (\`C:\\Windows\\System32\\drivers\\etc\\hosts\`) و لینوکس (\`/etc/hosts\`) فایلی متنی وجود دارد که پیش از مراجعه به اینترنت بررسی می‌شود. مهندسان دووآپس و پشتیبانی از این فایل برای تست سایت‌های در حال انتقال به سرور جدید استفاده می‌کنند.
      `,
    },
    {
      id: 'lesson-7-3',
      order: 3,
      titleFa: 'استعلام حرفه‌ای DNS با nslookup و dig در خط فرمان',
      titleEn: 'Querying DNS Records with nslookup and dig',
      visualizerType: 'none',
      keyTakeawaysFa: [
        'دستور nslookup در ویندوز و لینوکس برای عیب‌یابی سریع و ارسال پرس‌وجوهای مستقیم به سرورهای DNS به کار می‌رود.',
        'ابزار پیشرفته‌تر در دنیای لینوکس: دستور dig (Domain Information Groper) با خروجی فنی غنی‌تر.',
        'استعلام رکوردهای خاص با سوئیچ -type (مانند nslookup -type=mx google.com).',
        'تفاوت پاسخ معتبر (Authoritative) با غیرمعتبر (Non-Authoritative): پاسخ معتبر مستقیماً از سرور مالک دامنه می‌آید.'
      ],
      contentMarkdownFa: `
### مثال‌های کاربردی دستور nslookup

\`\`\`cmd
# ۱. استعلام رکورد A (آدرس IP) با سرور پیش‌فرض
C:\\> nslookup google.com

# ۲. اجبار به استعلام از یک سرور DNS مشخص (مثلاً DNS عمومی کلودفلیر 1.1.1.1)
C:\\> nslookup google.com 1.1.1.1

# ۳. استعلام سرورهای ایمیل یک شرکت (رکوردهای MX)
C:\\> nslookup -type=mx google.com
google.com      MX preference = 10, mail exchanger = smtp.google.com

# ۴. استعلام رکوردهای امنیتی TXT
C:\\> nslookup -type=txt google.com
google.com      text = "v=spf1 include:_spf.google.com ~all"
\`\`\`

در لینوکس با دستور \`dig\`:
\`\`\`bash
$ dig +short google.com A
142.250.185.206
\`\`\`
      `,
    },
    {
      id: 'lesson-7-4',
      order: 4,
      titleFa: 'پروتکل‌های پرکاربرد لایه کاربرد (HTTP/2/3, SSH, FTP, Mail)',
      titleEn: 'Application Protocols Evolution: HTTP/3, SSH Keys & Mail',
      visualizerType: 'none',
      keyTakeawaysFa: [
        'تکامل پروتکل وب: HTTP/1.1 (متنی با خطای مسدودسازی سر خط) -> HTTP/2 (باینری و مالتی‌پلکس روی یک اتصال TCP) -> HTTP/3 (مبتنی بر پروتکل پرسرعت QUIC روی بستر UDP).',
        'پروتکل SSH (پورت ۲۲): ورود امن خط فرمان با زوج کلید رمزنگاری عمومی/خصوصی (Public/Private Key) بدون نیاز به رمز عبور قابل حدس زدن.',
        'پروتکل‌های ایمیل: SMTP (پورت ۲۵ یا ۵۸۷ برای ارسال)، POP3 (پورت ۱۱۰ برای دانلود محلی)، IMAP (پورت ۱۴۳ یا ۹۹۳ برای همگام‌سازی ابری).',
        'پروتکل NTP (پورت ۱۲۳ روی UDP): همگام‌سازی میلی‌ثانیه‌ای ساعت تمام سرورها و روترها برای تطابق لاگ‌های امنیتی.'
      ],
      contentMarkdownFa: `
### جهش بزرگ وب: پروتکل HTTP/3 چیست؟

برای دهه‌ها وب روی شانه پروتکل TCP حرکت می‌کرد. اما تأخیر ناشی از ۳ مرحله Handshake در شبکه‌های گوشی‌های موبایل محسوس بود.
گوگل پروتکل **QUIC** را طراحی کرد که وب را به لایه **UDP** منتقل کرد:
* کاهش چشمگیر تأخیر لود صفحات وب.
* رمزنگاری ذاتی سرتاسری بدون مرحله مقدماتی جداگانه.
* عدم قطعی ارتباط هنگام سوئیچ کاربر از Wi-Fi به اینترنت سیم‌کارت.

### ورود امن به سرورها با کلید SSH

\`\`\`bash
# ساخت زوج کلید مدرن Ed25519
ssh-keygen -t ed25519 -C "admin@company.ir"

# ورود بدون پسورد با حداکثر امنیت
ssh -i ~/.ssh/id_ed25519 root@192.168.1.100
\`\`\`
      `,
    }
  ],
  quiz: {
    id: 'quiz-module-7',
    passingThreshold: 70,
    questions: [
      {
        id: 'q-7-1',
        questionFa: 'چهار مرحله فرآیند تخصیص خودکار آدرس IP توسط پروتکل DHCP به چه نامی شناخته می‌شود؟',
        optionsFa: ['SAID', 'DORA', 'ACID', 'CRUD'],
        correctIndex: 1,
        explanationFa: 'چرخه DORA مخفف Discover (کشف)، Offer (پیشنهاد)، Request (درخواست) و Acknowledge (تأیید نهایی) است.',
        category: 'theory'
      },
      {
        id: 'q-7-2',
        questionFa: 'سیستم‌عامل برای تبدیل نام دامنه به IP، قبل از استعلام از سرور DNS، ابتدا کدام محل را بررسی می‌کند؟',
        optionsFa: ['فایل متنی hosts', 'پوشه System32', 'سایت گوگل', 'جدول ARP سوئیچ'],
        correctIndex: 0,
        explanationFa: 'فایل محلی hosts بالاترین اولویت را در حل نام دارد و سیستم قبل از ارسال درخواست به سرور DNS ابتدا به آن مراجعه می‌کند.',
        category: 'theory'
      },
      {
        id: 'q-7-3',
        questionFa: 'کدام رکورد DNS برای نگاشت یک نام دامنه به یک آدرس IPv4 استفاده می‌شود؟',
        optionsFa: ['رکورد MX', 'رکورد AAAA', 'رکورد A', 'رکورد CNAME'],
        correctIndex: 2,
        explanationFa: 'رکورد A (Address Record) برای متناظر کردن نام دامنه به آدرس ۳۲ بیتی IPv4 استفاده می‌شود (رکورد AAAA برای IPv6 است).',
        category: 'theory'
      },
      {
        id: 'q-7-4',
        questionFa: 'اگر دستور ping 8.8.8.8 پاسخ موفقیت‌آمیز داشته باشد اما ping yahoo.com با خطا مواجه شود، مشکل در کجاست؟',
        optionsFa: ['کارت شبکه سوخته است', 'کابل شبکه قطع است', 'تنظیمات سرور DNS سیستم اشتباه است یا سرور DNS در دسترس نیست', 'آدرس MAC تغییر کرده است'],
        correctIndex: 2,
        explanationFa: 'چون ارتباط با IP کار می‌کند یعنی مسیر فیزیکی، روتر و گیت‌وی سالمند و فقط تبدیل نام به IP توسط سرویس DNS با مشکل روبرو شده است.',
        category: 'troubleshooting'
      },
      {
        id: 'q-7-5',
        questionFa: 'کدام پروتکل امن جانشین پروتکل منسوخ و ناامن Telnet برای مدیریت از راه دور سرورها روی پورت ۲۲ شده است؟',
        optionsFa: ['SSH', 'FTP', 'RDP', 'SNMP'],
        correctIndex: 0,
        explanationFa: 'پروتکل SSH (Secure Shell) روی پورت ۲۲ با استفاده از رمزنگاری سرتاسری جایگزین پروتکل ناامن Telnet شد.',
        category: 'theory'
      }
    ]
  }
};
