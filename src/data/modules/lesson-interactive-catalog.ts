import { MicroChallenge, IncidentScenario } from '../../types/course';

/**
 * Interactive Lesson Catalog:
 * Provides tailored Micro-Challenges and Incident Debugging Scenarios for all 32 lessons
 * across the 8 CompTIA Network+ modules, ensuring Steps 3 & 4 are always rich and hands-on.
 */

export function getLessonMicroChallenge(lessonId: string, _moduleId: string): MicroChallenge {
  const challengeMap: Record<string, MicroChallenge> = {
    // --- MODULE 1: Foundations & Models ---
    'lesson-1-1': {
      id: 'mc-1-1',
      titleFa: 'تطبیق لایه‌های ۴ گانه مدل DoD با پروتکل‌ها',
      type: 'matching',
      promptFa: 'هر یک از پروتکل‌های شبکه را به لایه متناظر خود در مدل تاریخی وزارت دفاع آمریکا (DoD) متصل نمایید:',
      groupsFa: [
        { id: 'dod-app', nameFa: 'لایه کاربرد / فرآیند (Process/App)' },
        { id: 'dod-trans', nameFa: 'لایه میزبان به میزبان (Host-to-Host)' },
        { id: 'dod-net', nameFa: 'لایه اینترنت (Internet)' },
        { id: 'dod-link', nameFa: 'لایه دسترسی به شبکه (Network Access)' },
      ],
      itemsFa: [
        { id: 'it-http', labelFa: 'HTTP و DNS', targetGroup: 'dod-app' },
        { id: 'it-tcp', labelFa: 'TCP و UDP', targetGroup: 'dod-trans' },
        { id: 'it-ip', labelFa: 'IP و ICMP', targetGroup: 'dod-net' },
        { id: 'it-eth', labelFa: 'Ethernet و Wi-Fi', targetGroup: 'dod-link' },
      ],
      explanationFa: 'مدل DoD شامل ۴ لایه است: پروتکل‌های سطح کاربر مانند HTTP در Process، پروتکل‌های پورت‌محور در Host-to-Host، پروتکل‌های آدرس‌دهی جهانی در Internet، و فناوری‌های انتقال کابل و سیگنال در Network Access قرار دارند.',
    },
    'lesson-1-2': {
      id: 'mc-1-2',
      titleFa: 'تطبیق واحدهای داده (PDU) با لایه‌های مدل هفت‌گانه OSI',
      type: 'matching',
      promptFa: 'واحدهای داده بسته (PDU) را به لایه‌های متناظر در مدل مرجع OSI متصل کنید:',
      groupsFa: [
        { id: 'l4', nameFa: 'لایه ۴ (انتقال / Transport)' },
        { id: 'l3', nameFa: 'لایه ۳ (شبکه / Network)' },
        { id: 'l2', nameFa: 'لایه ۲ (پیوند داده / Data Link)' },
        { id: 'l1', nameFa: 'لایه ۱ (فیزیکی / Physical)' },
      ],
      itemsFa: [
        { id: 'pdu-seg', labelFa: 'سگمنت (Segment)', targetGroup: 'l4' },
        { id: 'pdu-pkt', labelFa: 'بسته (Packet)', targetGroup: 'l3' },
        { id: 'pdu-frm', labelFa: 'فریم (Frame)', targetGroup: 'l2' },
        { id: 'pdu-bit', labelFa: 'بیت‌ها و سیگنال (Bits)', targetGroup: 'l1' },
      ],
      explanationFa: 'در لایه ۴ داده‌ها با شماره پورت به سگمنت، در لایه ۳ با افزودن IP به بسته (Packet)، در لایه ۲ با افزودن MAC به فریم (Frame) و در لایه ۱ به پالس‌های بیت تبدیل می‌شوند.',
    },
    'lesson-1-3': {
      id: 'mc-1-3',
      titleFa: 'شناسایی فیلدهای سرآیند در کپسوله‌سازی لایه‌ای',
      type: 'matching',
      promptFa: 'هر یک از شناسه و فیلدهای سرآیند زیر را به لایه اضافه شونده در کپسوله‌سازی متصل کنید:',
      groupsFa: [
        { id: 'hdr-l4', nameFa: 'سرآیند لایه ۴ (Transport Header)' },
        { id: 'hdr-l3', nameFa: 'سرآیند لایه ۳ (IP Header)' },
        { id: 'hdr-l2', nameFa: 'سرآیند لایه ۲ (Ethernet Header)' },
      ],
      itemsFa: [
        { id: 'f-port', labelFa: 'پورت مبدأ و پورت مقصد', targetGroup: 'hdr-l4' },
        { id: 'f-ip', labelFa: 'IPv4 مبدأ و مقصد + فیلد TTL', targetGroup: 'hdr-l3' },
        { id: 'f-mac', labelFa: 'مک‌آدرس مبدأ و مقصد + CRC32', targetGroup: 'hdr-l2' },
      ],
      explanationFa: 'لایه ۲ مک‌آدرس و چک‌سام خطایابی فریم را اضافه می‌کند؛ لایه ۳ آدرس‌های ۳۲ بیتی IP و زمان زنده بودن بسته (TTL) را تنظیم می‌کند؛ و لایه ۴ پورت‌ها و شماره توالی را درج می‌نماید.',
    },
    'lesson-1-4': {
      id: 'mc-1-4',
      titleFa: 'دسته‌بندی شبکه‌ها بر اساس ابعاد جغرافیایی',
      type: 'matching',
      promptFa: 'هر سناریوی ارتباطی را به دسته‌بندی مناسب بر اساس وسعت جغرافیایی متصل کنید:',
      groupsFa: [
        { id: 't-lan', nameFa: 'شبکه محلی (LAN / WLAN)' },
        { id: 't-can', nameFa: 'شبکه پردیس دانشگاهی (CAN)' },
        { id: 't-man', nameFa: 'شبکه شهری (MAN)' },
        { id: 't-wan', nameFa: 'شبکه گسترده جهانی (WAN)' },
      ],
      itemsFa: [
        { id: 'sc-office', labelFa: 'اتصال کامپیوترها در یک طبقه شرکت', targetGroup: 't-lan' },
        { id: 'sc-uni', labelFa: 'اتصال ۵ ساختمان مجاور یک دانشگاه', targetGroup: 't-can' },
        { id: 'sc-city', labelFa: 'شبکه دوربین‌های پایش ترافیک کلان‌شهر', targetGroup: 't-man' },
        { id: 'sc-inter', labelFa: 'ارتباط شعب تهران، استانبول و فرانکفورت', targetGroup: 't-wan' },
      ],
      explanationFa: 'شبکه محلی (LAN) محدود به یک ساختمان است؛ شبکه CAN چند ساختمان در یک پردیس را به هم وصل می‌کند؛ شبکه MAN در سطح کلان‌شهر است؛ و WAN برای فواصل فرامرزی و بین‌المللی استفاده می‌شود.',
    },

    // --- MODULE 2: Physical Media & Cabling ---
    'lesson-2-1': {
      id: 'mc-2-1',
      titleFa: 'تطبیق ویژگی‌های کابل‌های کواکسیال 10Base2 و 10Base5',
      type: 'matching',
      promptFa: 'مشخصات و کانکتورهای زیر را به استاندارد کابل کواکسیال صحیح متصل کنید:',
      groupsFa: [
        { id: 'c-thin', nameFa: 'کابل کواکسیال نازک (10Base2 Thinnet)' },
        { id: 'c-thick', nameFa: 'کابل کواکسیال ضخیم (10Base5 Thicknet)' },
      ],
      itemsFa: [
        { id: 'f-185m', labelFa: 'حداکثر طول ۱۸۵ متر و کابل RG-58', targetGroup: 'c-thin' },
        { id: 'f-bnc', labelFa: 'کانکتورهای سرنیزه‌ای BNC و سه‌راهی T', targetGroup: 'c-thin' },
        { id: 'f-500m', labelFa: 'حداکثر برد ۵۰۰ متر بدون تکرارکننده', targetGroup: 'c-thick' },
        { id: 'f-vamp', labelFa: 'کانکتورهای خون‌آشامی (Vampire Tap)', targetGroup: 'c-thick' },
      ],
      explanationFa: 'استاندارد 10Base2 از کابل نازک RG-58 با برد ۱۸۵ متر و BNC استفاده می‌کرد، در حالی که 10Base5 از کابل قطور ۵۰۰ متری با کانکتور خون‌آشامی بهره می‌برد.',
    },
    'lesson-2-2': {
      id: 'mc-2-2',
      titleFa: 'تحلیل پین‌اوت‌های سوکت RJ45 و رنگ‌بندی T568B',
      type: 'matching',
      promptFa: 'وظیفه سیگنالی هر جفت پین در سوکت شبکه RJ45 استاندارد 100Base-TX را مشخص نمایید:',
      groupsFa: [
        { id: 'p-tx', nameFa: 'زوج ارسال داده (Transmit: Tx+/Tx-)' },
        { id: 'p-rx', nameFa: 'زوج دریافت داده (Receive: Rx+/Rx-)' },
        { id: 'p-poe', nameFa: 'زوج‌های انتقال برق و رزرو (PoE)' },
      ],
      itemsFa: [
        { id: 'pins-12', labelFa: 'پین‌های ۱ و ۲ (سفید نارنجی و نارنجی)', targetGroup: 'p-tx' },
        { id: 'pins-36', labelFa: 'پین‌های ۳ و ۶ (سفید سبز و سبز)', targetGroup: 'p-rx' },
        { id: 'pins-45', labelFa: 'پین‌های ۴ و ۵ (آبی و سفید آبی)', targetGroup: 'p-poe' },
        { id: 'pins-78', labelFa: 'پین‌های ۷ و ۸ (سفید قهوه‌ای و قهوه‌ای)', targetGroup: 'p-poe' },
      ],
      explanationFa: 'در استاندارد T568B پین‌های ۱ و ۲ برای ارسال (Tx)، پین‌های ۳ و ۶ برای دریافت (Rx) و پین‌های ۴-۵ و ۷-۸ برای PoE استفاده می‌شوند.',
    },
    'lesson-2-3': {
      id: 'mc-2-3',
      titleFa: 'مقایسه مشخصات فیبر نوری سینگل‌مود و مالتی‌مود',
      type: 'matching',
      promptFa: 'ویژگی‌های فنی را به نوع فیبر نوری مربوطه متصل نمایید:',
      groupsFa: [
        { id: 'fib-smf', nameFa: 'فیبر سینگل‌مود (Single-Mode Fiber)' },
        { id: 'fib-mmf', nameFa: 'فیبر مالتی‌مود (Multi-Mode Fiber)' },
      ],
      itemsFa: [
        { id: 'smf-core', labelFa: 'قطر هسته بسیار باریک ۹ میکرون با منبع لیزر', targetGroup: 'fib-smf' },
        { id: 'smf-dist', labelFa: 'برد طولانی تا ۴۰ کیلومتر و روکش زرد رنگ', targetGroup: 'fib-smf' },
        { id: 'mmf-core', labelFa: 'قطر هسته ۵۰ یا ۶۲.۵ میکرون با منبع LED/VCSEL', targetGroup: 'fib-mmf' },
        { id: 'mmf-dist', labelFa: 'برد کوتاه چندصد متری و روکش نارنجی/آکوا', targetGroup: 'fib-mmf' },
      ],
      explanationFa: 'فیبر سینگل‌مود به دلیل هسته باریک و منبع لیزر برای مسافت‌های بسیار طولانی کاربرد دارد؛ در حالی که مالتی‌مود برای داخل ساختمان و دیتاسنترها به کار می‌رود.',
    },
    'lesson-2-4': {
      id: 'mc-2-4',
      titleFa: 'تشخیص رفتار و آسیب‌پذیری توپولوژی‌های شبکه',
      type: 'matching',
      promptFa: 'ویژگی هر توپولوژی فیزیکی را متصل نمایید:',
      groupsFa: [
        { id: 'top-star', nameFa: 'توپولوژی ستاره‌ای (Star)' },
        { id: 'top-bus', nameFa: 'توپولوژی خطی (Bus)' },
        { id: 'top-mesh', nameFa: 'توپولوژی توری (Full Mesh)' },
      ],
      itemsFa: [
        { id: 'st-star', labelFa: 'قطع کابل یک کاربر روی بقیه تأثیر ندارد', targetGroup: 'top-star' },
        { id: 'st-bus', labelFa: 'قطع کابل در یک نقطه کل شبکه را از کار می‌اندازد', targetGroup: 'top-bus' },
        { id: 'st-mesh', labelFa: 'بالاترین پایداری با N(N-1)/2 لینک اختصاصی', targetGroup: 'top-mesh' },
      ],
      explanationFa: 'توپولوژی استار استاندارد مدرن است چون عیب‌یابی ساده دارد؛ باس با قطع کابل کل سیستم‌ها را می‌خواباند؛ و توری گران‌ترین و پایدارترین حالت است.',
    },

    // --- MODULE 3: Data Link & Switching ---
    'lesson-3-1': {
      id: 'mc-3-1',
      titleFa: 'کالبدشکافی ساختار مک‌آدرس و شناسه OUI',
      type: 'matching',
      promptFa: 'بخش‌های یک مک‌آدرس ۴۸ بیتی را به مفهوم متناظر وصل کنید:',
      groupsFa: [
        { id: 'mac-oui', nameFa: '۲۴ بیت اول (۳ بایت نخست)' },
        { id: 'mac-nic', nameFa: '۲۴ بیت دوم (۳ بایت پایانی)' },
        { id: 'mac-bcast', nameFa: 'آدرس همگانی (Broadcast)' },
      ],
      itemsFa: [
        { id: 'it-oui', labelFa: 'شناسه شرکت سازنده توسط IEEE (OUI)', targetGroup: 'mac-oui' },
        { id: 'it-ser', labelFa: 'شماره سریال یکتای اختصاص داده شده توسط شرکت', targetGroup: 'mac-nic' },
        { id: 'it-ff', labelFa: 'FF:FF:FF:FF:FF:FF', targetGroup: 'mac-bcast' },
      ],
      explanationFa: '۲۴ بیت نخست مشخص‌کننده کارخانه سازنده (OUI) و ۲۴ بیت دوم سریال کارت شبکه است و آدرس FF:FF:FF:FF:FF:FF برودکست لایه ۲ است.',
    },
    'lesson-3-2': {
      id: 'mc-3-2',
      titleFa: 'مقایسه رفتاری هاب در برابر سوئیچ',
      type: 'matching',
      promptFa: 'ویژگی‌های عملکردی زیر را بین هاب و سوئیچ تفکیک نمایید:',
      groupsFa: [
        { id: 'dev-hub', nameFa: 'هاب (لایه ۱ فیزیکی)' },
        { id: 'dev-sw', nameFa: 'سوئیچ (لایه ۲ پیوند داده)' },
      ],
      itemsFa: [
        { id: 'h-coll', labelFa: 'تک دامنه برخورد (Single Collision Domain) و نیمه‌دوطرفه', targetGroup: 'dev-hub' },
        { id: 'h-flood', labelFa: 'تکرار سیگنال روی تمام پورت‌ها بدون آگاهی از مک', targetGroup: 'dev-hub' },
        { id: 's-iso', labelFa: 'ایزوله‌سازی دامنه برخورد در هر پورت و تمام‌دوطرفه', targetGroup: 'dev-sw' },
        { id: 's-cam', labelFa: 'ارسال هوشمند بسته‌ها بر اساس جدول مک‌آدرس (CAM)', targetGroup: 'dev-sw' },
      ],
      explanationFa: 'هاب سیگنال را به تمام پورت‌ها کپی کرده و تصادم رخ می‌دهد، اما سوئیچ با جدول CAM فریم‌ها را فقط به پورت مقصد هدایت می‌کند.',
    },
    'lesson-3-3': {
      id: 'mc-3-3',
      titleFa: 'سه گام طلایی سوئیچ در پردازش فریم‌ها',
      type: 'matching',
      promptFa: 'عملکرد سوئیچ را با وضعیت فریم ورودی تطبیق دهید:',
      groupsFa: [
        { id: 'sw-learn', nameFa: 'گام یادگیری (Learning)' },
        { id: 'sw-fwd', nameFa: 'گام ارسال مستقیم (Forwarding)' },
        { id: 'sw-fld', nameFa: 'گام طغیان (Flooding)' },
      ],
      itemsFa: [
        { id: 'act-src', labelFa: 'برداشتن Source MAC و ثبت در جدول CAM با پورت ورودی', targetGroup: 'sw-learn' },
        { id: 'act-dst-known', labelFa: 'ارسال فریم صرفاً به همان پورت مقصد ثبت‌شده', targetGroup: 'sw-fwd' },
        { id: 'act-dst-un', labelFa: 'ارسال فریم به تمام پورت‌ها هنگام ناشناخته بودن مقصد', targetGroup: 'sw-fld' },
      ],
      explanationFa: 'سوئیچ با مک مبدأ یاد می‌گیرد، با مک مقصد شناخته شده فریم را مستقیم می‌فرستد و اگر مقصد ناشناس باشد به تمام پورت‌ها طغیان می‌کند.',
    },
    'lesson-3-4': {
      id: 'mc-3-4',
      titleFa: 'مفاهیم پورت‌های Access و Trunk در استانداردهای VLAN',
      type: 'matching',
      promptFa: 'ویژگی‌های پورت‌های شبکه سوئیچ را مشخص نمایید:',
      groupsFa: [
        { id: 'p-acc', nameFa: 'پورت دسترسی (Access Port)' },
        { id: 'p-trk', nameFa: 'پورت ترانک (Trunk Port)' },
      ],
      itemsFa: [
        { id: 'acc-pc', labelFa: 'اتصال به کامپیوتر کاربر و متعلق به یک VLAN تک', targetGroup: 'p-acc' },
        { id: 'acc-untag', labelFa: 'فریم‌ها بدون تگ 802.1Q خارج می‌شوند', targetGroup: 'p-acc' },
        { id: 'trk-sw', labelFa: 'اتصال سوئیچ به سوئیچ دیگر یا روتر', targetGroup: 'p-trk' },
        { id: 'trk-tag', labelFa: 'عبور ترافیک چندین VLAN با تگ ۴ بایتی 802.1Q', targetGroup: 'p-trk' },
      ],
      explanationFa: 'پورت Access مخصوص اتصال به کلاینت در یک وی‌لن است؛ پورت Trunk برای عبور همزمان چند وی‌لن با تگ 802.1Q به کار می‌رود.',
    },

    // --- MODULE 4: IPv4 Addressing & Subnetting ---
    'lesson-4-1': {
      id: 'mc-4-1',
      titleFa: 'تشخیص کلاس‌های IPv4 و ماسک پیش‌فرض',
      type: 'matching',
      promptFa: 'هر آدرس IP را با کلاس متناظر آن تطبیق دهید:',
      groupsFa: [
        { id: 'cls-a', nameFa: 'کلاس A (اکتت اول ۱ تا ۱۲۶)' },
        { id: 'cls-b', nameFa: 'کلاس B (اکتت اول ۱۲۸ تا ۱۹۱)' },
        { id: 'cls-c', nameFa: 'کلاس C (اکتت اول ۱۹۲ تا ۲۲۳)' },
      ],
      itemsFa: [
        { id: 'ip-10', labelFa: '10.50.20.1 با ماسک 255.0.0.0', targetGroup: 'cls-a' },
        { id: 'ip-172', labelFa: '172.20.5.1 با ماسک 255.255.0.0', targetGroup: 'cls-b' },
        { id: 'ip-192', labelFa: '192.168.1.10 با ماسک 255.255.255.0', targetGroup: 'cls-c' },
      ],
      explanationFa: 'بر اساس بایت اول: کلاس A از ۱ تا ۱۲۶، کلاس B از ۱۲۸ تا ۱۹۱ و کلاس C از ۱۹۲ تا ۲۲۳ است.',
    },
    'lesson-4-2': {
      id: 'mc-4-2',
      titleFa: 'تفکیک آدرس‌های عمومی، خصوصی و رزرو شده',
      type: 'matching',
      promptFa: 'نوع هر آدرس IP را تعیین نمایید:',
      groupsFa: [
        { id: 'ip-priv', nameFa: 'آدرس خصوصی (RFC 1918 Private)' },
        { id: 'ip-pub', nameFa: 'آدرس عمومی اینترنت (Public IP)' },
        { id: 'ip-spec', nameFa: 'آدرس رزرو شده خاص (Loopback / APIPA)' },
      ],
      itemsFa: [
        { id: 'ip-192168', labelFa: '192.168.1.50 و 10.0.0.1', targetGroup: 'ip-priv' },
        { id: 'ip-8888', labelFa: '8.8.8.8 و 142.250.185.206', targetGroup: 'ip-pub' },
        { id: 'ip-loop', labelFa: '127.0.0.1 (Loopback تست کارت شبکه)', targetGroup: 'ip-spec' },
        { id: 'ip-api', labelFa: '169.254.10.5 (آدرس خطایاب APIPA)', targetGroup: 'ip-spec' },
      ],
      explanationFa: 'رنج‌های 10، 172.16 و 192.168 خصوصی‌اند؛ 8.8.8.8 عمومی است و 127.0.0.1 لوپ‌بک و 169.254 آپیپا هستند.',
    },
    'lesson-4-3': {
      id: 'mc-4-3',
      titleFa: 'محاسبه گام پرش (Block Size) و ظرفیت هاست ساب‌نت‌ها',
      type: 'matching',
      promptFa: 'پیشوندهای زیر را به گام پرش (Block Size = 256 - Mask) متصل کنید:',
      groupsFa: [
        { id: 'sz-64', nameFa: 'گام پرش ۶۴ (ماسک .192)' },
        { id: 'sz-32', nameFa: 'گام پرش ۳۲ (ماسک .224)' },
        { id: 'sz-16', nameFa: 'گام پرش ۱۶ (ماسک .240)' },
        { id: 'sz-4', nameFa: 'گام پرش ۴ (ماسک .252)' },
      ],
      itemsFa: [
        { id: 'p-26', labelFa: 'پیشوند /26 (۶۲ هاست قابل استفاده)', targetGroup: 'sz-64' },
        { id: 'p-27', labelFa: 'پیشوند /27 (۳۰ هاست قابل استفاده)', targetGroup: 'sz-32' },
        { id: 'p-28', labelFa: 'پیشوند /28 (۱۴ هاست قابل استفاده)', targetGroup: 'sz-16' },
        { id: 'p-30', labelFa: 'پیشوند /30 (۲ هاست برای لینک روترها)', targetGroup: 'sz-4' },
      ],
      explanationFa: 'ارزش گام پرش با تفریق ماسک از ۲۵۶ به دست می‌آید: ۲۵۶ منهای ۱۹۲ برابر ۶۴، منهای ۲۲۴ برابر ۳۲، و منهای ۲۵۲ برابر ۴ است.',
    },
    'lesson-4-4': {
      id: 'mc-4-4',
      titleFa: 'تخصیص بهینه با تکنیک VLSM',
      type: 'matching',
      promptFa: 'برای هر نیاز سازمانی، کوچک‌ترین و بهینه‌ترین پیشوند ساب‌نت را انتخاب کنید:',
      groupsFa: [
        { id: 'vl-26', nameFa: 'پیشوند /26 (تا ۶۲ کاربر)' },
        { id: 'vl-27', nameFa: 'پیشوند /27 (تا ۳۰ کاربر)' },
        { id: 'vl-30', nameFa: 'پیشوند /30 (دقیقاً ۲ هاست)' },
      ],
      itemsFa: [
        { id: 'req-50', labelFa: 'بخش فروش با ۵۰ سیستم کامپیوتر', targetGroup: 'vl-26' },
        { id: 'req-20', labelFa: 'شعبه شهرستان با ۲۰ کارمند', targetGroup: 'vl-27' },
        { id: 'req-p2p', labelFa: 'لینک سریال بین دو روتر مرکزی', targetGroup: 'vl-30' },
      ],
      explanationFa: 'در VLSM همیشه نزدیک‌ترین توان دو بزرگتر از نیاز منهای ۲ انتخاب می‌شود تا کمترین اتلاف آدرس رخ دهد.',
    },

    // --- MODULE 5: ARP & Diagnostics ---
    'lesson-5-1': {
      id: 'mc-5-1',
      titleFa: 'بررسی فیلدهای بسته ARP Request و Reply',
      type: 'matching',
      promptFa: 'مشخصات فریم لایه ۲ در تبادل ARP را متصل نمایید:',
      groupsFa: [
        { id: 'arp-req', nameFa: 'درخواست آرپ (ARP Request)' },
        { id: 'arp-rep', nameFa: 'پاسخ آرپ (ARP Reply)' },
      ],
      itemsFa: [
        { id: 'ar-bcast', labelFa: 'ارسال همگانی برودکست (FF:FF:FF:FF:FF:FF)', targetGroup: 'arp-req' },
        { id: 'ar-who', labelFa: 'پیام "چه کسی این IP را دارد؟ مک خود را بگو"', targetGroup: 'arp-req' },
        { id: 'ar-uni', labelFa: 'ارسال تک‌پخشی مستقیم (Unicast) به فرستنده', targetGroup: 'arp-rep' },
        { id: 'ar-here', labelFa: 'پیام "من این IP را دارم و مک من این است"', targetGroup: 'arp-rep' },
      ],
      explanationFa: 'درخواست ARP همیشه برودکست است تا همه بشنوند، اما پاسخ آن یونیکست مستقیم برای سیستم سوال‌کننده است.',
    },
    'lesson-5-2': {
      id: 'mc-5-2',
      titleFa: 'تصمیم‌گیری روتر و درگاه پیش‌فرض',
      type: 'matching',
      promptFa: 'مقصد فریم و بسته را هنگام ارسال ترافیک به اینترنت مشخص کنید:',
      groupsFa: [
        { id: 'rt-l3', nameFa: 'مقصد بسته لایه ۳ (IP Header)' },
        { id: 'rt-l2', nameFa: 'مقصد فریم لایه ۲ (Ethernet Header)' },
      ],
      itemsFa: [
        { id: 'dst-ip', labelFa: 'آدرس سرور نهایی در اینترنت (مثلاً 8.8.8.8)', targetGroup: 'rt-l3' },
        { id: 'dst-mac', labelFa: 'مک‌آدرس کارت شبکه روتر (Default Gateway)', targetGroup: 'rt-l2' },
      ],
      explanationFa: 'هنگام خروج از ساب‌نت، IP مقصد همان آدرس نهایی سرور است، اما فریم لایه ۲ تحویل مک روتر محلی می‌شود.',
    },
    'lesson-5-3': {
      id: 'mc-5-3',
      titleFa: 'شناسایی کدهای پیام‌های پروتکل ICMP',
      type: 'matching',
      promptFa: 'کد و تیپ پیام ICMP را با مفهوم آن تطبیق دهید:',
      groupsFa: [
        { id: 'ic-08', nameFa: 'پیام‌های دستور پینگ (Echo)' },
        { id: 'ic-error', nameFa: 'پیام‌های خطای مسیر' },
      ],
      itemsFa: [
        { id: 'ic-8', labelFa: 'Type 8: Echo Request (ارسال درخواست پینگ)', targetGroup: 'ic-08' },
        { id: 'ic-0', labelFa: 'Type 0: Echo Reply (پاسخ سالم سیستم مقصد)', targetGroup: 'ic-08' },
        { id: 'ic-3', labelFa: 'Type 3: Destination Unreachable (شبکه غیرقابل دسترس)', targetGroup: 'ic-error' },
        { id: 'ic-11', labelFa: 'Type 11: TTL Exceeded (اتمام زمان زنده بودن در tracert)', targetGroup: 'ic-error' },
      ],
      explanationFa: 'تیپ‌های ۸ و ۰ برای پینگ عادی و تیپ‌های ۳ و ۱۱ برای گزارش خطاهای شبکه و ردیابی روترها در tracert هستند.',
    },
    'lesson-5-4': {
      id: 'mc-5-4',
      titleFa: 'تطبیق دستورات خط فرمان عیب‌یابی با کاربرد آنها',
      type: 'matching',
      promptFa: 'هر ابزار خط فرمان را به وظیفه عیب‌یابی مربوطه وصل کنید:',
      groupsFa: [
        { id: 'cmd-ip', nameFa: 'ابزارهای کارت شبکه و کش' },
        { id: 'cmd-rt', nameFa: 'ابزارهای سلامت ارتباط و مسیر' },
      ],
      itemsFa: [
        { id: 'c-ipc', labelFa: 'ipconfig /all (مشاهده مشخصات کامل کارت شبکه)', targetGroup: 'cmd-ip' },
        { id: 'c-arp', labelFa: 'arp -a و arp -d (مشاهده و پاک‌سازی کش مک‌آدرس‌ها)', targetGroup: 'cmd-ip' },
        { id: 'c-png', labelFa: 'ping 127.0.0.1 (تست سلامت پشته پروتکل در ویندوز)', targetGroup: 'cmd-rt' },
        { id: 'c-trc', labelFa: 'tracert (کشف روترهای سر راه تا رسیدن به مقصد)', targetGroup: 'cmd-rt' },
      ],
      explanationFa: 'دستورات ipconfig و arp وضعیت اینترفیس و جدول مک را نشان می‌دهند و ping و tracert مسیر لایه ۳ را می‌آزمایند.',
    },

    // --- MODULE 6: Transport Layer ---
    'lesson-6-1': {
      id: 'mc-6-1',
      titleFa: 'تفکیک ترافیک پروتکل‌های TCP و UDP',
      type: 'matching',
      promptFa: 'کاربردهای دنیای واقعی را به پروتکل انتقال مناسب متصل کنید:',
      groupsFa: [
        { id: 'p-tcp', nameFa: 'پروتکل TCP (قابل اعتماد و اتصال‌گرا)' },
        { id: 'p-udp', nameFa: 'پروتکل UDP (پرسرعت و بدون اتصال)' },
      ],
      itemsFa: [
        { id: 'u-web', labelFa: 'بارگذاری وب‌سایت (HTTP/HTTPS) و فایل (FTP)', targetGroup: 'p-tcp' },
        { id: 'u-mail', labelFa: 'ارسال ایمیل (SMTP) و ترمینال امن (SSH)', targetGroup: 'p-tcp' },
        { id: 'u-voip', labelFa: 'تماس صوتی اینترنتی (VoIP) و استریم زنده', targetGroup: 'p-udp' },
        { id: 'u-dns', labelFa: 'پرس‌وجوی سریع نام دامنه (DNS) و بازی آنلاین', targetGroup: 'p-udp' },
      ],
      explanationFa: 'برنامه‌هایی که حتی یک بیت خطا را نمی‌پذیرند از TCP استفاده می‌کنند و برنامه‌های بلادرنگ حساس به تأخیر از UDP بهره می‌برند.',
    },
    'lesson-6-2': {
      id: 'mc-6-2',
      titleFa: 'ترتیب پرچم‌ها در دست‌تکانی سه‌مرحله‌ای TCP',
      type: 'matching',
      promptFa: 'پرچم‌های ارسالی در سه مرحله هندشیک TCP را مشخص نمایید:',
      groupsFa: [
        { id: 'step-1', nameFa: 'گام اول (کلاینت به سرور)' },
        { id: 'step-2', nameFa: 'گام دوم (سرور به کلاینت)' },
        { id: 'step-3', nameFa: 'گام سوم (کلاینت به سرور)' },
      ],
      itemsFa: [
        { id: 'fl-syn', labelFa: 'پرچم SYN=1 (درخواست همگام‌سازی)', targetGroup: 'step-1' },
        { id: 'fl-synack', labelFa: 'پرچم‌های SYN=1 و ACK=1 (پاسخ و تأیید متقابل)', targetGroup: 'step-2' },
        { id: 'fl-ack', labelFa: 'پرچم ACK=1 (تأیید نهایی و ورود به ESTABLISHED)', targetGroup: 'step-3' },
      ],
      explanationFa: 'الگوی هندشیک TCP همواره SYN -> SYN-ACK -> ACK است که اتصال سالم را تضمین می‌نماید.',
    },
    'lesson-6-3': {
      id: 'mc-6-3',
      titleFa: 'تطبیق شماره پورت‌های استاندارد با سرویس‌ها',
      type: 'matching',
      promptFa: 'هر شماره پورت استاندارد را به سرویس متناظر وصل کنید:',
      groupsFa: [
        { id: 'grp-web', nameFa: 'پورت‌های وب و فایل' },
        { id: 'grp-adm', nameFa: 'پورت‌های مدیریت و نام‌گذاری' },
      ],
      itemsFa: [
        { id: 'pt-80', labelFa: 'پورت ۸۰ (HTTP) و ۴۴۳ (HTTPS)', targetGroup: 'grp-web' },
        { id: 'pt-21', labelFa: 'پورت ۲۱ (کنترل انتقال فایل FTP)', targetGroup: 'grp-web' },
        { id: 'pt-22', labelFa: 'پورت ۲۲ (ارتباط امن SSH)', targetGroup: 'grp-adm' },
        { id: 'pt-53', labelFa: 'پورت ۵۳ (سرویس نام دامنه DNS)', targetGroup: 'grp-adm' },
      ],
      explanationFa: 'پورت‌های ۰ تا ۱۰۲۳ رزرو شده هستند و هر پروتکل استاندارد یک پورت شناخته شده بین‌المللی دارد.',
    },
    'lesson-6-4': {
      id: 'mc-6-4',
      titleFa: 'تشخیص وضعیت سوکت‌ها در خروجی netstat',
      type: 'matching',
      promptFa: 'وضعیت‌های اتصال TCP را به مفهوم آن‌ها متصل کنید:',
      groupsFa: [
        { id: 'st-lis', nameFa: 'وضعیت LISTENING' },
        { id: 'st-est', nameFa: 'وضعیت ESTABLISHED' },
        { id: 'st-tim', nameFa: 'وضعیت TIME_WAIT' },
      ],
      itemsFa: [
        { id: 'd-lis', labelFa: 'سرور روی این پورت منتظر اتصال جدید کلاینت‌هاست', targetGroup: 'st-lis' },
        { id: 'd-est', labelFa: 'ارتباط فعال و دوطرفه بین کلاینت و سرور برقرار است', targetGroup: 'st-est' },
        { id: 'd-tim', labelFa: 'اتصال خاتمه یافته و منتظر محو بسته‌های دیرهنگام است', targetGroup: 'st-tim' },
      ],
      explanationFa: 'وضعیت LISTEN یعنی پورت گوش به زنگ است؛ ESTABLISHED یعنی چت برقرار است؛ و TIME_WAIT اتمام امن اتصال است.',
    },

    // --- MODULE 7: Core Services ---
    'lesson-7-1': {
      id: 'mc-7-1',
      titleFa: 'ترتیب مراحل چرخه DORA در پروتکل DHCP',
      type: 'matching',
      promptFa: 'چهار مرحله تخصیص خودکار IP را مشخص نمایید:',
      groupsFa: [
        { id: 'dora-1', nameFa: 'مرحله ۱ و ۲ (کشف و پیشنهاد)' },
        { id: 'dora-2', nameFa: 'مرحله ۳ و ۴ (درخواست و تأیید نهایی)' },
      ],
      itemsFa: [
        { id: 'do-disc', labelFa: 'Discover (برودکست کلاینت: سرور کجاست؟)', targetGroup: 'dora-1' },
        { id: 'do-off', labelFa: 'Offer (پیشنهاد IP و زمان اجاره توسط سرور)', targetGroup: 'dora-1' },
        { id: 'do-req', labelFa: 'Request (درخواست ثبت رسمی IP توسط کلاینت)', targetGroup: 'dora-2' },
        { id: 'do-ack', labelFa: 'Acknowledge (تأیید نهایی سرور و صدور اجاره)', targetGroup: 'dora-2' },
      ],
      explanationFa: 'چرخه DORA مخفف Discover, Offer, Request, Acknowledge است که آدرس IP و تنظیمات شبکه را تحویل کلاینت می‌دهد.',
    },
    'lesson-7-2': {
      id: 'mc-7-2',
      titleFa: 'شناسایی انواع رکوردهای سامانه DNS',
      type: 'matching',
      promptFa: 'رکورد DNS را با عملکرد متناظر تطبیق دهید:',
      groupsFa: [
        { id: 'rec-ip', nameFa: 'رکوردهای آدرس (IP Records)' },
        { id: 'rec-srv', nameFa: 'رکوردهای خدمات و متن' },
      ],
      itemsFa: [
        { id: 'r-a', labelFa: 'رکورد A (نگاشت دامنه به آدرس IPv4)', targetGroup: 'rec-ip' },
        { id: 'r-aaaa', labelFa: 'رکورد AAAA (نگاشت دامنه به آدرس IPv6)', targetGroup: 'rec-ip' },
        { id: 'r-mx', labelFa: 'رکورد MX (مشخص‌کننده سرور ایمیل شرکت)', targetGroup: 'rec-srv' },
        { id: 'r-txt', labelFa: 'رکورد TXT (اعتبارسنجی SPF و ضداسپم)', targetGroup: 'rec-srv' },
      ],
      explanationFa: 'رکوردهای A و AAAA برای تبدیل نام به IP هستند و رکوردهای MX و TXT برای خدمات ایمیل و امنیت دامنه به کار می‌روند.',
    },
    'lesson-7-3': {
      id: 'mc-7-3',
      titleFa: 'استعلام‌های ابزار nslookup و dig',
      type: 'matching',
      promptFa: 'دستور استعلام DNS را با نتیجه حاصله تطبیق دهید:',
      groupsFa: [
        { id: 'ns-def', nameFa: 'استعلام ساده و رکورد A' },
        { id: 'ns-spec', nameFa: 'استعلام‌های اختصاصی و سرور خاص' },
      ],
      itemsFa: [
        { id: 'cmd-ns1', labelFa: 'nslookup google.com (استعلام با DNS دیفالت)', targetGroup: 'ns-def' },
        { id: 'cmd-ns2', labelFa: 'nslookup google.com 8.8.8.8 (اجبار به سرور گوگل)', targetGroup: 'ns-spec' },
        { id: 'cmd-ns3', labelFa: 'nslookup -type=mx google.com (استعلام میل‌سرور)', targetGroup: 'ns-spec' },
      ],
      explanationFa: 'ابزار nslookup امکان تعیین نوع رکورد درخواستی و سرور پاسخ‌دهنده را مستقیماً از خط فرمان فراهم می‌سازد.',
    },
    'lesson-7-4': {
      id: 'mc-7-4',
      titleFa: 'تکامل پروتکل‌های وب و ارتباط امن',
      type: 'matching',
      promptFa: 'ویژگی‌های پروتکل‌های لایه ۷ را مشخص کنید:',
      groupsFa: [
        { id: 'app-web', nameFa: 'پروتکل‌های وب' },
        { id: 'app-sec', nameFa: 'پروتکل‌های دسترسی امن' },
      ],
      itemsFa: [
        { id: 'pr-h3', labelFa: 'HTTP/3 مبتنی بر پروتکل پرسرعت QUIC و UDP', targetGroup: 'app-web' },
        { id: 'pr-h2', labelFa: 'HTTP/2 با مالتی‌پلکس همزمان چند فایل روی یک TCP', targetGroup: 'app-web' },
        { id: 'pr-ssh', labelFa: 'SSH با پورت ۲۲ و زوج کلید رمزنگاری Ed25519', targetGroup: 'app-sec' },
      ],
      explanationFa: 'نسل سوم وب با HTTP/3 به لایه UDP مهاجرت کرده تا تأخیر باز شدن صفحات روی موبایل را به حداقل برساند.',
    },

    // --- MODULE 8: Security, Firewalls & NAT ---
    'lesson-8-1': {
      id: 'mc-8-1',
      titleFa: 'تطبیق اصطلاحات چهارگانه NAT سیسکو',
      type: 'matching',
      promptFa: 'تعاریف آدرس‌دهی NAT را با نام استاندارد آن متصل نمایید:',
      groupsFa: [
        { id: 'nat-in', nameFa: 'آدرس‌های شبکه داخلی (Inside)' },
        { id: 'nat-out', nameFa: 'آدرس‌های شبکه بیرونی (Outside)' },
      ],
      itemsFa: [
        { id: 'n-il', labelFa: 'Inside Local: آدرس خصوصی کلاینت در LAN (مانند 192.168.1.10)', targetGroup: 'nat-in' },
        { id: 'n-ig', labelFa: 'Inside Global: آدرس پابلیک روتر ما در اینترنت', targetGroup: 'nat-in' },
        { id: 'n-og', labelFa: 'Outside Global: آدرس عمومی واقعی سرور مقصد در وب', targetGroup: 'nat-out' },
      ],
      explanationFa: 'Inside Local آدرس خصوصی سیستم داخلی و Inside Global آدرس عمومی روتر است که ترافیک با آن در اینترنت دیده می‌شود.',
    },
    'lesson-8-2': {
      id: 'mc-8-2',
      titleFa: 'هدایت پورت (Port Forwarding) و ایزولاسیون DMZ',
      type: 'matching',
      promptFa: 'کاربردهای امنیتی را به مکانیزم متناظر وصل کنید:',
      groupsFa: [
        { id: 'sec-pf', nameFa: 'هدایت پورت (Port Forwarding)' },
        { id: 'sec-dmz', nameFa: 'ناحیه غیرنظامی (DMZ)' },
      ],
      itemsFa: [
        { id: 'fwd-cam', labelFa: 'دسترسی از راه دور به دوربین مداربسته با پورت ۸۰۸۰', targetGroup: 'sec-pf' },
        { id: 'dmz-iso', labelFa: 'جداسازی وب‌سرور عمومی از شبکه حسابداری شرکت', targetGroup: 'sec-dmz' },
      ],
      explanationFa: 'پورت فورواردینگ ترافیک یک پورت خارجی را به سیستم داخلی هدایت می‌کند؛ در حالی که DMZ سرور را در منطقه‌ای ایزوله قرار می‌دهد.',
    },
    'lesson-8-3': {
      id: 'mc-8-3',
      titleFa: 'تفاوت فایروال با سامانه‌های IDS و IPS',
      type: 'matching',
      promptFa: 'نقش هر سامانه امنیتی را مشخص کنید:',
      groupsFa: [
        { id: 'sec-fw', nameFa: 'فایروال (Firewall)' },
        { id: 'sec-ids', nameFa: 'سامانه تشخیص نفوذ (IDS)' },
        { id: 'sec-ips', nameFa: 'سامانه جلوگیری از نفوذ (IPS)' },
      ],
      itemsFa: [
        { id: 'act-fw', labelFa: 'بررسی آدرس و پورت و عبور ترافیک مجاز', targetGroup: 'sec-fw' },
        { id: 'act-ids', labelFa: 'پایش غیرفعال ترافیک و ارسال آلارم هشدار به ادمین', targetGroup: 'sec-ids' },
        { id: 'act-ips', labelFa: 'قرارگیری مستقیم در خط و مسدودسازی فوری بسته مهاجم', targetGroup: 'sec-ips' },
      ],
      explanationFa: 'فایروال فیلترینگ پورت انجام می‌دهد، IDS هشدار می‌دهد و IPS حمله را درجا خنثی می‌کند.',
    },
    'lesson-8-4': {
      id: 'mc-8-4',
      titleFa: 'اصول بنیادین امنیت شبکه و معماری Zero Trust',
      type: 'matching',
      promptFa: 'اصول دفاعی شبکه را به مفهوم متناظر وصل کنید:',
      groupsFa: [
        { id: 'zt-zero', nameFa: 'معماری اعتماد صفر (Zero Trust)' },
        { id: 'zt-least', nameFa: 'اصل کمترین سطح دسترسی (Least Privilege)' },
        { id: 'zt-vpn', nameFa: 'شبکه خصوصی مجازی (VPN)' },
      ],
      itemsFa: [
        { id: 'p-zt', labelFa: 'هیچ کاربری حتی داخل شرکت امن نیست و مدام اعتبارسنجی می‌شود', targetGroup: 'zt-zero' },
        { id: 'p-lp', labelFa: 'کاربر فقط به حداقل پورت و دیتای لازم دسترسی دارد', targetGroup: 'zt-least' },
        { id: 'p-vp', labelFa: 'ایجاد تونل رمزنگاری‌شده روی بستر ناامن اینترنت', targetGroup: 'zt-vpn' },
      ],
      explanationFa: 'اصل زیرو تراست اعتماد پیش‌فرض را منسوخ کرده و با احراز هویت مستمر و کمترین سطح دسترسی از شبکه دفاع می‌کند.',
    },
  };

  return challengeMap[lessonId] || challengeMap['lesson-1-1'];
}

export function getLessonIncidentScenario(lessonId: string, _moduleId: string): IncidentScenario {
  const incidentMap: Record<string, IncidentScenario> = {
    // --- MODULE 1: Foundations & Models ---
    'lesson-1-1': {
      ticketId: 'INC-1011',
      titleFa: 'عدم تبادل بسته‌های لایه شبکه به دلیل ناسازگاری پروتکل شرکت‌های ناهمگن',
      backgroundFa: 'در پروژه اتصال شبکه قدیمی شرکت به مرکز داده جدید، بسته‌های ارسال شده بین سرورهای با سیستم‌عامل‌های مختلف به مقصد نمی‌رسند و خطای پروتکل نامعتبر ثبت می‌شود.',
      cliSnippet: `C:\\> ping 10.20.1.5 -n 2
Pinging 10.20.1.5 with 32 bytes of data:
General failure.

C:\\> netsh interface ipv4 show subinterfaces
   MTU  MediaSenseState   Bytes In  Bytes Out  Interface
------  ---------------  ---------  ---------  -------------
  1500                1          0          0  Ethernet0`,
      diagnosisStepsFa: [
        'بررسی لاگ‌ها نشان داد پروتکل قدیمی انحصاری روی کارت شبکه سرور فعال بوده و فاقد پشته استاندارد TCP/IP است.',
        'با اجرای دستورات ممیزی اینترفیس، فعال‌سازی پروتکل استاندارد IPv4 در مشخصات شبکه انجام شد.',
        'به محض فعال‌سازی پروتکل استاندارد لایه اینترنت DoD، تبادل پکت‌ها فوراً با موفقیت آغاز شد.',
      ],
      takeawayFa: 'دلیل پیدایش مدل‌های مرجع و پروتکل‌های باز، امکان تبادل بسته بین سخت‌افزارهای ناهمگن بدون وابستگی به سازنده است.',
    },
    'lesson-1-2': {
      ticketId: 'INC-1012',
      titleFa: 'عیب‌یابی لایه به لایه قطعی سایت فروشگاه شرکت بر اساس مدل OSI',
      backgroundFa: 'سامانه فروش اینترنتی از کار افتاده و مشتریان با صفحه سفید روبرو می‌شوند. تیم باید در کمتر از ۵ دقیقه عیب‌یابی لایه‌ای را انجام دهد.',
      cliSnippet: `C:\\> ping 127.0.0.1 -n 2
Reply from 127.0.0.1: bytes=32 time<1ms TTL=128

C:\\> ping 192.168.1.1 -n 2
Reply from 192.168.1.1: bytes=32 time=1ms TTL=64

C:\\> curl -I https://shop.company.ir
curl: (35) schannel: failed to receive handshake, SSL/TLS error 0x80090326`,
      diagnosisStepsFa: [
        'لایه ۱ و ۲ و ۳ با پینگ موفق به گیت‌وی سالم تأیید شدند.',
        'لایه ۴ انتقال اتصال TCP روی پورت ۴۴۳ برقرار شد.',
        'خطای سورس در لایه ۶ (Presentation) رخ داد: گواهی‌نامه SSL/TLS منقضی شده بود و مذاکره رمزنگاری رد می‌شد.',
      ],
      takeawayFa: 'مدل OSI روش اصولی عیب‌یابی را از لایه ۱ تا لایه ۷ دیکته می‌کند؛ در این حادثه با تمدید گواهی امنیتی در لایه ارائه، مشکل بدون دست زدن به شبکه حل شد.',
    },
    'lesson-1-3': {
      ticketId: 'INC-1013',
      titleFa: 'افت شدید سرعت و خطای شکستن بسته‌ها به دلیل عدم تطابق MTU',
      backgroundFa: 'کاربران اعلام کرده‌اند فایل‌های حجیم در اتصال به شعبه بیرونی با ارور Timeout لغو می‌شوند اما پیام‌های کوتاه متنی به درستی منتقل می‌گردند.',
      cliSnippet: `C:\\> ping -f -l 1472 192.168.1.1
Reply from 192.168.1.1: bytes=1472 time=1ms TTL=64

C:\\> ping -f -l 1473 192.168.1.1
Packet needs to be fragmented but DF set.`,
      diagnosisStepsFa: [
        'دستور ping با سوئیچ -f (Don\'t Fragment) حداکثر طول بسته بدون تکه‌تکه شدن را دقیقا ۱۴۷۲ بایت نشان می‌دهد.',
        'با اضافه شدن ۲۰ بایت IP و ۸ بایت ICMP، اندازه کل بسته به ۱۵۰۰ بایت استاندارد می‌رسد.',
        'روتر در لایه ۳ بسته‌های بزرگ‌تر از سقف MTU را به دلیل پرچم DF=1 دور می‌ریخت.',
      ],
      takeawayFa: 'همواره توجه داشته باشید که سقف فریم اترنت ۱۵۰۰ بایت است و سرآیندهای کپسوله‌شده لایه‌های مختلف از این حجم مصرف می‌کنند.',
    },
    'lesson-1-4': {
      ticketId: 'INC-1014',
      titleFa: 'قطع ارتباط شعبه شهرستان با مرکز داده در شبکه WAN',
      backgroundFa: 'دسترسی شعبه تبریز به اتوماسیون مرکزی قطع شده است، در حالی که اینترنت محلی شعبه و شبکه داخلی LAN بدون مشکل کار می‌کند.',
      cliSnippet: `C:\\> tracert 10.0.100.5
Tracing route to 10.0.100.5 over a maximum of 30 hops:
  1     1 ms     1 ms     1 ms  192.168.10.1
  2     8 ms     8 ms     7 ms  10.200.1.1
  3     *        *        *     Request timed out.
  4     *        *        *     Request timed out.`,
      diagnosisStepsFa: [
        'شبکه محلی LAN شعبه در هاپ اول (192.168.10.1) پاسخ می‌دهد.',
        'در هاپ دوم لینک دسترسی به ارائه‌دهنده مخابراتی استیجاری متصل است.',
        'در هاپ سوم خط فیبر بین‌استانی مخابرات قطع شده و ترافیک WAN به مرکز داده نمی‌رسد.',
      ],
      takeawayFa: 'در شبکه‌های WAN وابستگی به خطوط استیجاری ایجاب می‌کند که مسیرهای پشتیبان (Redundant Link) از دو اپراتور مجزا تعبیه شود.',
    },

    // --- MODULE 2: Physical Media & Cabling ---
    'lesson-2-1': {
      ticketId: 'INC-2021',
      titleFa: 'بروز طوفان تصادف سیگنال به دلیل شل شدن ترمیناتور ۵۰ اهمی',
      backgroundFa: 'در بخش اتوماسیون صنعتی کارخانه، ارتباط تمام سنسورهای خط تولید روی کابل کواکسیال قطع شد و خطای Collision مداوم ثبت شد.',
      cliSnippet: `[Ethernet Bus Controller Log]
WARNING: Continuous high voltage standing wave detected.
COLLISION_RATE: 94.2% of all transmitted packets muddled.
TERMINATOR_SENSE: Line impedance infinity (Open circuit).`,
      diagnosisStepsFa: [
        'بررسی لاگ کنترلر نشان داد امپدانس مدار به جای ۵۰ اهم بی‌نهایت است (مدار باز).',
        'مقاومت ترمیناتور در انتهای سالن تولید به دلیل لرزش دستگاه‌ها شل شده بود.',
        'با محکم کردن پیچ BNC ترمیناتور ۵۰ اهمی، بازتاب امواج متوقف و شبکه به کار افتاد.',
      ],
      takeawayFa: 'در خطوط انتقال کواکسیال، ترمیناتور انتهای کابل برای جذب انرژی امواج و جلوگیری از بازتاب امواج الزامی است.',
    },
    'lesson-2-2': {
      ticketId: 'INC-2022',
      titleFa: 'سوکت‌زنی نادرست و بروز خطای هم‌شنوی شدید (Crosstalk) در کابل Cat-6',
      backgroundFa: 'کابل جدید اتاق سرور با وجود اتصال فیزیکی، فقط با سرعت ۱۰ مگابیت بالا می‌آید و در سرعت ۱ گیگابیت پکت‌لاست ۹۰ درصدی دارد.',
      cliSnippet: `[Cable Certifier Analyzer Report]
Wiremap: Pass (Pin 1 to 8 straight)
NEXT (Near-End Crosstalk): FAIL (-14.2 dB at 100MHz)
Pairs Untwisted at Boot: 32 mm (Standard max: 13 mm)`,
      diagnosisStepsFa: [
        'تکنسین هنگام سوکت‌زنی بیش از ۳ سانتی‌متر از تابیدگی زوج‌سیم‌ها را باز کرده بود.',
        'باز شدن تابیدگی سیم‌ها سبب تداخل شدید میدان مغناطیسی زوج ۱-۲ با ۳-۶ شد.',
        'با سوکت‌زنی مجدد و حفظ تابیدگی تا ۱ سانتی‌متری پین‌ها، سرعت ۱ گیگابیت با موفقیت برقرار گردید.',
      ],
      takeawayFa: 'تابیدگی زوج‌سیم‌ها عامل اصلی خنثی‌سازی نویز و هم‌شنوی (Crosstalk) است؛ هنگام پانچ هرگز بیش از حد مجاز پیچش سیم را باز نکنید.',
    },
    'lesson-2-3': {
      ticketId: 'INC-2023',
      titleFa: 'شکستگی تار فیبر نوری سینگل‌مود در فاصله ۱۲ کیلومتری مسیر',
      backgroundFa: 'ارتباط فیبر نوری بین دو مرکز داده اصلی ناگهان قطع شد و چراغ Rx ماژول SFP خاموش گردید.',
      cliSnippet: `Cisco-Core# show interfaces TenGigabitEthernet 1/1/1 transceiver
Optical In (Rx) Power: -40.0 dBm (Optical Signal Lost)
Optical Out (Tx) Power: -2.1 dBm (Normal Laser Output)

[OTDR Optical Time Domain Reflectometer]
Event 1: 0.00 km (Patch panel LC connector, loss 0.2 dB)
Event 2: 12.43 km (Fresnel reflection spike, 100% loss - Fiber Break)`,
      diagnosisStepsFa: [
        'دستور show interface افت سیگنال ورودی به منهای ۴۰ دسی‌بل را نشان داد.',
        'دستگاه تستر OTDR دقیقاً فاصله شکستگی تار شیشه‌ای را در کیلومتر ۱۲.۴ مشخص کرد.',
        'تیم فنی متوجه عملیات عمرانی شهرداری و آسیب به کابل فیبر در آن نقطه شد.',
      ],
      takeawayFa: 'برای عیب‌یابی فیبرهای نوری، دستگاه بازتاب‌سنج نوری OTDR ابزار استاندارد شناسایی دقیق محل پارگی است.',
    },
    'lesson-2-4': {
      ticketId: 'INC-2024',
      titleFa: 'ایجاد حلقه فیزیکی توسط کاربر و بروز طوفان برودکست در سوئیچ',
      backgroundFa: 'کل شبکه شرکت ناگهان متوقف شد، چراغ‌های تمام پورت‌های سوئیچ به سرعت دیوانه‌واری چشمک زدند و مصرف پردازنده به ۱۰۰ درصد رسید.',
      cliSnippet: `Switch# show cpu utilization
CPU utilization for one minute: 99%; five minutes: 98%

Switch# show log
%SPANTREE-2-BLOCK_PORT_TYPE: Inconsistent port FastEthernet0/12
%ETH-4-BROADCAST_STORM: Broadcast packet storm detected on Port 12. Rate: 45000 pkts/sec`,
      diagnosisStepsFa: [
        'کارمندی در اتاق کنفرانس هر دو سر یک کابل شبکه را به دو پریز دیواری که به یک سوئیچ می‌رفتند وصل کرده بود!',
        'ایجاد حلقه فیزیکی موجب شد فریم‌های برودکست تا ابد تکثیر شوند.',
        'با فعال بودن پروتکل STP و کشیدن کابل حلقه، ترافیک سوئیچ بلافاصله به حالت عادی بازگشت.',
      ],
      takeawayFa: 'پروتکل درخت پوشا (STP) سنگر امنیتی لایه ۲ در برابر حلقه‌های ناخواسته کابل‌کشی و طوفان‌های برودکست است.',
    },

    // --- MODULE 3: Switching ---
    'lesson-3-1': {
      ticketId: 'INC-3031',
      titleFa: 'کشف کارت شبکه جعلی با مک‌آدرس نامعتبر در شبکه محلی',
      backgroundFa: 'سیستم مانیتورینگ امنیتی ورود دستگاهی با مک‌آدرس مشکوک و تولید ترافیک جعلی را ثبت کرده است.',
      cliSnippet: `C:\\> getmac /v /fo list
Connection Name:  Ethernet
Network Adapter:  Realtek PCIe GbE Family Controller
Physical Address: 00-00-00-00-00-00

C:\\> arp -a
Interface: 192.168.1.10 --- 0x2
  Internet Address      Physical Address      Type
  192.168.1.1           00-1a-2b-fe-00-01     dynamic`,
      diagnosisStepsFa: [
        'مک‌آدرس 00:00:00:00:00:00 یک آدرس سخت‌افزاری غیرمجاز در شبکه است.',
        'درایور کارت شبکه خراب شده یا توسط بدافزار برای دور زدن فیلترینگ دستکاری شده بود.',
        'با نصب مجدد فریم‌ور معتبر، مک‌آدرس فیزیکی BIA سازنده در حافظه کارت شبکه بازیابی شد.',
      ],
      takeawayFa: 'مک‌آدرس هویت فیزیکی لایه ۲ است؛ تغییر یا جعل آن توسط سیستم‌های امنیت پورت (Port Security) بلافاصله کشف می‌شود.',
    },
    'lesson-3-2': {
      ticketId: 'INC-3032',
      titleFa: 'افت شدید پهنای باند به دلیل قفل شدن پورت در حالت Half-Duplex',
      backgroundFa: 'یکی از سیستم‌های اداری با وجود اتصال به سوئیچ گیگابیت، سرعتی کمتر از ۲ مگابیت دارد و خطای Collision فراوان گزارش می‌کند.',
      cliSnippet: `Switch# show interfaces FastEthernet 0/5
FastEthernet0/5 is up, line protocol is up
  Half-duplex, 100Mb/s, media type is 100TX
  14205 collisions, 2012 late collision, 0 pause input`,
      diagnosisStepsFa: [
        'در سوئیچ‌های مدرن نباید هیچ تصادمی رخ دهد؛ اما بررسی پورت نشان داد در وضعیت Half-Duplex کار می‌کند.',
        'مذاکره خودکار (Auto-Negotiation) بین کارت شبکه و سوئیچ دچار اختلال شده بود.',
        'با تنظیم دستی پورت سوئیچ و کارت شبکه روی Full-Duplex، تصادم‌ها صفر شد و سرعت به سقف رسید.',
      ],
      takeawayFa: 'عدم تطابق Duplex (یک‌طرفه در برابر دوطرفه) یکی از شایع‌ترین علل پکت‌لاست و افت سرعت در کابل‌کشی‌های شبکه است.',
    },
    'lesson-3-3': {
      ticketId: 'INC-3033',
      titleFa: 'حمله سرریز جدول مک (MAC Flooding Attack) و تبدیل سوئیچ به هاب',
      backgroundFa: 'سامانه امنیت اطلاعات هشدار داد که ترافیک محرمانه بخش مالی توسط یک لپ‌تاپ دیگر در شبکه در حال شنود و Sniff شدن است.',
      cliSnippet: `Switch# show mac address-table count
Total Mac Address Space Available: 8192
Total Mac Addresses Learned: 8192 (TABLE FULL!)

Switch# show log
%CAM-4-TABLE_OVERFLOW: MAC address table overflow. Flooding unicast traffic to all ports.`,
      diagnosisStepsFa: [
        'مهاجم با ابزار macof ثانیه‌ای ده هزار مک‌آدرس دروغین به سوئیچ ارسال کرده بود.',
        'حافظه CAM سوئیچ پر شده بود و سوئیچ مجبور شده بود تمام ترافیک‌های اختصاصی را روی همه پورت‌ها فلود (Flood) کند.',
        'با فعال کردن قابلیت Port Security و محدود کردن تعداد مک مجاز به ۱ در هر پورت، پورت مهاجم بلافاصله Shutdown شد.',
      ],
      takeawayFa: 'قابلیت Port Security در سوئیچ‌های سیسکو و سازمانی مانع از حملات جعل مک و سرریز جدول CAM می‌شود.',
    },
    'lesson-3-4': {
      ticketId: 'INC-3034',
      titleFa: 'عدم دریافت ترافیک به دلیل اشتباه در شماره Native VLAN در لینک ترانک',
      backgroundFa: 'پس از اتصال سوئیچ طبقه دوم به سوئیچ طبقه سوم، کاربران وی‌لن ۲۰ به سرورهای خود دسترسی ندارند.',
      cliSnippet: `Switch-Core# show interfaces trunk
Port        Mode             Encapsulation  Status        Native vlan
Gi0/1       on               802.1q         trunking      1

Switch-Floor2# show interfaces trunk
Port        Mode             Encapsulation  Status        Native vlan
Gi0/1       on               802.1q         trunking      99
%CDP-4-NATIVE_VLAN_MISMATCH: Native VLAN mismatch discovered on GigabitEthernet0/1 (99), with Switch-Core (1).`,
      diagnosisStepsFa: [
        'پروتکل CDP خطای عدم تطابق Native VLAN را بین دو سر کابل ترانک گزارش کرد.',
        'سوئیچ اول نیتیو وی‌لن ۱ و سوئیچ دوم ۹۹ تنظیم شده بود که باعث نشت بسته‌ها می‌شد.',
        'با یکسان‌سازی Native VLAN روی هر دو سوئیچ، ارتباط تمام وی‌لن‌ها بی‌درنگ برقرار شد.',
      ],
      takeawayFa: 'در لینک‌های ترانک 802.1Q، همواره شماره Native VLAN در هر دو سمت کابل باید دقیقاً یکسان تنظیم شود.',
    },

    // --- MODULE 4: Subnetting ---
    'lesson-4-1': {
      ticketId: 'INC-4041',
      titleFa: 'اشتباه در وارد کردن ساب‌نت ماسک و ناتوانی در برقراری ارتباط محلی',
      backgroundFa: 'کامپیوتر جدید حسابداری نمی‌تواند با پرینتر شبکه در همان اتاق ارتباط برقرار کند، اگرچه آدرس‌های IP شبیه هم هستند.',
      cliSnippet: `PC-A (Client):
IPv4 Address: 192.168.1.50
Subnet Mask:  255.255.255.128 (/25)

Printer:
IPv4 Address: 192.168.1.160
Subnet Mask:  255.255.255.0 (/24)`,
      diagnosisStepsFa: [
        'با ماسک /25، شبکه به دو ساب‌نت تقسیم شده است: ساب‌نت اول از 0 تا 127 و ساب‌نت دوم از 128 تا 255.',
        'کامپیوتر در ساب‌نت اول (192.168.1.0/25) و پرینتر در ساب‌نت دوم (192.168.1.128/25) قرار گرفته‌اند.',
        'چون روتر بین این دو وجود نداشت، بسته‌ها به گیت‌وی فرستاده می‌شدند و دور ریخته می‌شدند.',
      ],
      takeawayFa: 'عملیات بیتی AND مشخص‌کننده مرز دقیق شبکه است؛ دو کامپیوتر برای ارتباط مستقیم بدون روتر حتماً باید ساب‌نت ماسک و Net ID یکسان داشته باشند.',
    },
    'lesson-4-2': {
      ticketId: 'INC-4042',
      titleFa: 'دریافت آدرس ناخواسته APIPA و خاموش بودن سرویس DHCP سرور',
      backgroundFa: 'پس از قطع برق مقطعی در شرکت، هیچ‌یک از کارمندان به اینترنت یا فایل‌سرور دسترسی ندارند.',
      cliSnippet: `C:\\> ipconfig
Windows IP Configuration
Ethernet adapter eth0:
   Connection-specific DNS Suffix  . :
   Autoconfiguration IPv4 Address. . : 169.254.88.14
   Subnet Mask . . . . . . . . . . . : 255.255.0.0
   Default Gateway . . . . . . . . . : `,
      diagnosisStepsFa: [
        'آدرس 169.254.x.x نشان‌دهنده شکست در چرخه دریافت آدرس از پروتکل DHCP است.',
        'بررسی سرورها نشان داد سرویس ویندوز سرور DHCP پس از ریبوت خودکار استارت نشده است.',
        'با روشن کردن سرویس DHCP و اجرای ipconfig /renew در کلاینت‌ها، همگی IPهای معتبر دریافت کردند.',
      ],
      takeawayFa: 'مشاهده آدرس ۱۶۹.۲۵۴ سریع‌ترین علامت برای هدایت مستقیم عیب‌یابی به سمت سرور یا کابل اتصال به DHCP است.',
    },
    'lesson-4-3': {
      ticketId: 'INC-4043',
      titleFa: 'تداخل و کمبود آدرس IP به دلیل ساب‌نتینگ نادرست در توسعه شرکت',
      backgroundFa: 'با استخدام ۲۰ کارمند جدید در بخش فنی، سیستم‌های جدید خطای عدم امکان تخصیص آدرس در پول شبکه می‌گیرند.',
      cliSnippet: `DHCP-Server# show ip dhcp pool Engineering
Pool Name: Eng-Dept
Total Addresses: 30 (/27 Subnet: 192.168.1.32/27)
Leased Addresses: 30 (100% EXHAUSTED)
Pending Requests: 8 clients dropping to APIPA`,
      diagnosisStepsFa: [
        'بخش فنی روی ساب‌نت /27 با حداکثر ۳۰ هاست پیکربندی شده بود که تمام ظرفیت آن پر شد.',
        'با ارتقای پیشوند به /26 (ماسک 255.255.255.192)، ظرفیت ساب‌نت به ۶۲ هاست معتبر دوبرابر شد.',
        'کلاینت‌های جدید بلافاصله آدرس‌های آزاد را دریافت کردند.',
      ],
      takeawayFa: 'در طراحی ساب‌نت‌ها همواره پیش‌بینی رشد ۳۰ تا ۵۰ درصدی تعداد پرسنل را در نظر بگیرید تا شبکه دچار اشباع نشود.',
    },
    'lesson-4-4': {
      ticketId: 'INC-4044',
      titleFa: 'هم‌پوشانی خطرناک رنج‌های IP به دلیل رعایت نکردن ترتیب VLSM',
      backgroundFa: 'روتر خطای Overlap در تعریف ساب‌نت‌های جدید گزارش می‌دهد و اجازه تعریف اینترفیس جدید را صادر نمی‌کند.',
      cliSnippet: `Router(config)# interface GigabitEthernet 0/1.20
Router(config-subif)# ip address 192.168.1.32 255.255.255.224
% 192.168.1.32 255.255.255.224 overlaps with GigabitEthernet0/1.10 (192.168.1.0/26)`,
      diagnosisStepsFa: [
        'زیرشبکه اول با پیشوند /26 بازه ۰ تا ۶۳ را اشغال کرده بود.',
        'ادمین تلاش کرده بود ساب‌نت جدید را از آدرس ۳۲ شروع کند که دقیقاً درون دل ساب‌نت اول قرار داشت.',
        'با شروع ساب‌نت دوم از مرز ۶۴ (192.168.1.64/27)، خطای هم‌پوشانی برطرف گردید.',
      ],
      takeawayFa: 'در VLSM همیشه از ساب‌نت‌های بزرگ شروع کنید و هر ساب‌نت جدید را روی مرز مضرب صحیح گام پرش (Block Size) مستقر کنید.',
    },

    // --- MODULE 5: Resolution & Diagnostics ---
    'lesson-5-1': {
      ticketId: 'INC-5051',
      titleFa: 'حمله جعل مک و شنود ارتباطات توسط ARP Poisoning',
      backgroundFa: 'نرم‌افزار آنتی‌ویروس هشدار داد که مک‌آدرس گیت‌وی به طور مداوم در حال تغییر است و ترافیک رمزنگاری‌نشده به سرقت می‌رود.',
      cliSnippet: `C:\\> arp -a
Interface: 192.168.1.10 --- 0x2
  Internet Address      Physical Address      Type
  192.168.1.1           e8-40-f2-aa-bb-cc     dynamic (ATTACKER MAC!)
  192.168.1.55          e8-40-f2-aa-bb-cc     dynamic (ATTACKER MAC!)`,
      diagnosisStepsFa: [
        'در جدول ARP دیده شد که آدرس گیت‌وی (192.168.1.1) و کامپیوتر ۵۵ دقیقاً یک مک مشترک دارند!',
        'مهاجم با ارسال جعلی ARP Reply خود را به عنوان روتر معرفی کرده بود.',
        'با فعال‌سازی Dynamic ARP Inspection (DAI) و پاک کردن جدول ARP با arp -d، حمله متوقف شد.',
      ],
      takeawayFa: 'پروتکل ARP هیچ احراز هویتی ندارد؛ سوئیچ‌های سازمانی با مکانیزم DAI از صحت بسته‌های پاسخ آرپ اطمینان حاصل می‌کنند.',
    },
    'lesson-5-2': {
      ticketId: 'INC-5052',
      titleFa: 'اختلال اینترنت به دلیل مفقود شدن مسیر پیش‌فرض (0.0.0.0/0)',
      backgroundFa: 'سرور فایل به تمام سیستم‌های داخل شرکت وصل می‌شود اما قادر به ارسال پشتیبان به سرور ابری در اینترنت نیست.',
      cliSnippet: `C:\\> route print
IPv4 Route Table
Active Routes:
Network Destination        Netmask          Gateway       Interface  Metric
        127.0.0.0        255.0.0.0         On-link        127.0.0.1     331
      192.168.1.0    255.255.255.0         On-link     192.168.1.10     281
(Notice: Default route 0.0.0.0 is MISSING!)`,
      diagnosisStepsFa: [
        'جدول روتینگ بررسی شد؛ مسیرهای شبکه‌های محلی وجود دارند اما ردیف 0.0.0.0 0.0.0.0 پاک شده است.',
        'سیستم نمی‌داند ترافیک خارج از شبکه را به کدام روتر تحویل دهد.',
        'با دستور route add 0.0.0.0 mask 0.0.0.0 192.168.1.1 مسیر پیش‌فرض بازیابی شد و ارتباط ابری متصل گردید.',
      ],
      takeawayFa: 'مسیر پیش‌فرض (Default Route) شاهراه خروج تمام بسته‌های اینترنتی به خارج از شبکه محلی است.',
    },
    'lesson-5-3': {
      ticketId: 'INC-5053',
      titleFa: 'بروز حلقه روتینگ بی‌پایان و به صفر رسیدن مقدار TTL در tracert',
      backgroundFa: 'بسته‌های ارسالی بین دو ساختمان شرکت در حلقه افتاده و خطای TTL Expired دریافت می‌شود.',
      cliSnippet: `C:\\> tracert 10.50.1.1
Tracing route to 10.50.1.1 over a maximum of 30 hops:
  1     1 ms     1 ms     1 ms  192.168.1.1 (Router A)
  2     2 ms     2 ms     2 ms  10.0.0.2 (Router B)
  3     3 ms     3 ms     3 ms  192.168.1.1 (Router A)
  4     4 ms     4 ms     4 ms  10.0.0.2 (Router B)
  ...
 30     *        *        *     Request timed out.`,
      diagnosisStepsFa: [
        'روتر A بسته را به روتر B می‌فرستد و روتر B در جدول خود بسته را مجدداً به روتر A برمی‌گرداند!',
        'فیلد TTL در هر هاپ یکی کم می‌شود تا نهایتاً در هاپ ۶۴ صفر شده و بسته نابود شود.',
        'با اصلاح جدول روتینگ روتر B و هدایت بسته به اینترفیس خروجی، حلقه شکسته شد.',
      ],
      takeawayFa: 'فیلد Time To Live در هدر IP برای ممانعت از چرخش ابدی بسته‌ها در حلقه‌های روتینگ طراحی شده است.',
    },
    'lesson-5-4': {
      ticketId: 'INC-5054',
      titleFa: 'اجرای چک‌لیست ۵ مرحله‌ای عیب‌یابی و حل قطعی شبکه در ۲ دقیقه',
      backgroundFa: 'مدیر مالی اعلام کرد اینترنت قطع است و قادر به پرداخت چک‌های آنلاین نیست.',
      cliSnippet: `C:\\> ping 127.0.0.1  --> Pass (TCP/IP stack OK)
C:\\> ping 192.168.1.10  --> Pass (NIC OK)
C:\\> ping 192.168.1.1   --> Pass (Router/Cable OK)
C:\\> ping 8.8.8.8       --> Pass (Internet connection OK!)
C:\\> ping bank.ir       --> Ping request could not find host bank.ir (DNS FAIL!)`,
      diagnosisStepsFa: [
        'چهار گام اول سالم بودن کابل، کارت شبکه، روتر و خط اینترنت را اثبات کردند.',
        'گام پنجم فوراً نشان داد مشکل ۱۰۰٪ ناشی از عدم توانایی حل نام دامنه است.',
        'با اجرای ipconfig /flushdns و تغییر DNS سرور به 8.8.8.8، سایت بانک فوراً باز شد.',
      ],
      takeawayFa: 'متدولوژی عیب‌یابی پله‌پله زمان حل تیکت‌های پشتیبانی شبکه را از ساعت‌ها به ثانیه‌ها کاهش می‌دهد.',
    },

    // --- MODULE 6: Transport Layer ---
    'lesson-6-1': {
      ticketId: 'INC-6061',
      titleFa: 'انتخاب اشتباه پروتکل TCP برای دوربین‌های پخش زنده و افت فریم',
      backgroundFa: 'تصاویر دوربین‌های امنیتی سالن تولید با تأخیر ۱۰ ثانیه‌ای و پرش‌های تصویری ناخوشایند منتقل می‌شوند.',
      cliSnippet: `[RTSP Video Stream Capture]
Protocol: TCP (Port 554)
TCP Retransmissions: 28% of total packets
Buffer Overflow: Video decoder waiting for missing packets from 4 seconds ago!`,
      diagnosisStepsFa: [
        'پروتکل TCP بسته‌های ویدئویی گم شده را دوباره ارسال می‌کرد که باعث فریز شدن تصویر زنده می‌شد.',
        'برای تصاویر زنده، داده‌های قدیمی هیچ ارزشی ندارند و فقط سرعت اهمیت دارد.',
        'با تغییر تنظیمات انتقال دوربین‌ها به پروتکل سبک UDP، تصاویر به صورت روان و با تأخیر صفر میلی‌ثانیه پخش شدند.',
      ],
      takeawayFa: 'پروتکل UDP پادشاه داده‌های بلادرنگ (Real-Time)، بازی آنلاین و ویدئوکنفرانس است.',
    },
    'lesson-6-2': {
      ticketId: 'INC-6062',
      titleFa: 'مهار حمله فلودینگ SYN و نجات وب‌سرور سازمان',
      backgroundFa: 'وب‌سایت خبری شرکت ناگهان بالا نمی‌آید، در حالی که رم و پردازنده سرور خالی است اما اتصالات رد می‌شوند.',
      cliSnippet: `Server# netstat -an | grep SYN_RECEIVED | wc -l
128450 connections in SYN_RECEIVED state!

Server# dmesg | tail -n 2
[TCP] Possible SYN flooding on port 80. Sending cookies. Check SNMP counters.`,
      diagnosisStepsFa: [
        'هکر هزاران بسته SYN با IP جعلی ارسال کرده و صف اتصالات نیمه‌باز سرور پر شده بود.',
        'سرور منتظر دریافت بسته سوم ACK مانده بود و پورت پاسخگوی کاربران جدید نبود.',
        'با فعال کردن ماژول فایروال SYN Cookies در هسته سیستم‌عامل، مشکل درجا برطرف گردید.',
      ],
      takeawayFa: 'دست‌تکانی ۳ مرحله‌ای TCP نقطه آسیب‌پذیری حملات سیل‌آسا است که با SYN Cookies خنثی می‌شود.',
    },
    'lesson-6-3': {
      ticketId: 'INC-6063',
      titleFa: 'بسته بودن پورت فایروال ۲۲ و مسدود شدن دسترسی ادمین به سرور لینوکس',
      backgroundFa: 'مسئول لینوکس نمی‌تواند با پروتکل SSH به سرور متصل شود و ارور Connection Refused یا Timeout می‌گیرد.',
      cliSnippet: `C:\\> ssh root@192.168.1.100
ssh: connect to host 192.168.1.100 port 22: Connection timed out

C:\\> Test-NetConnection -ComputerName 192.168.1.100 -Port 22
TcpTestSucceeded : False`,
      diagnosisStepsFa: [
        'پینگ به آدرس IP سرور بدون مشکل کار می‌کند، یعنی لایه ۳ سالم است.',
        'دستور تست سوکت نشان داد پورت ۲۲ در فایروال سرور مسدود شده است.',
        'با باز کردن پورت ۲۲ در نرم‌افزار ufw فایروال سرور، اتصال SSH فوراً برقرار شد.',
      ],
      takeawayFa: 'سالم بودن پینگ فقط سلامت لایه ۳ را اثبات می‌کند؛ برای تست لایه ۴ باید پورت مربوطه بررسی شود.',
    },
    'lesson-6-4': {
      ticketId: 'INC-6064',
      titleFa: 'کشف باج‌افزار ماینر از طریق پورت‌های مشکوک در دستور netstat',
      backgroundFa: 'فن‌های کامپیوتر سرور پشتیبان با حداکثر سرعت کار می‌کنند و ترافیک خروجی اینترنت بالا رفته است.',
      cliSnippet: `C:\\> netstat -ano | findstr ESTABLISHED
  TCP    192.168.1.50:54120     194.87.12.5:3333      ESTABLISHED     4812

C:\\> tasklist | findstr 4812
svchost_miner.exe             4812 Services                   1,240,500 K`,
      diagnosisStepsFa: [
        'دستور netstat اتصال فعال روی پورت غیرعادی ۳۳۳۳ به یک IP خارجی را با PID شماره ۴۸۱۲ کشف کرد.',
        'دستور tasklist فایل مخرب را شناسایی کرد.',
        'پردازه بلافاصله Kill شد و فایل مخرب از سیستم پاکسازی گردید.',
      ],
      takeawayFa: 'دستور netstat -ano یکی از کلیدی‌ترین ابزارهای ممیزی امنیتی و کشف اتصالات مخفی بدافزارهاست.',
    },

    // --- MODULE 7: Services ---
    'lesson-7-1': {
      ticketId: 'INC-7071',
      titleFa: 'عدم دریافت IP در وی‌لن جدید به دلیل تنظیم نبودن DHCP Relay',
      backgroundFa: 'کارمندان طبقه سوم که در وی‌لن جدید ۳۰ قرار دارند نمی‌توانند از سرور اصلی شرکت آدرس IP بگیرند.',
      cliSnippet: `Client-PC:
Autoconfiguration IPv4: 169.254.1.20 (APIPA)

Router-Core# show running-config interface vlan 30
interface Vlan30
 ip address 192.168.30.1 255.255.255.0
 (Missing: ip helper-address command!)`,
      diagnosisStepsFa: [
        'سرور DHCP در وی‌لن ۱۰ قرار دارد و کلاینت‌ها در وی‌لن ۳۰ هستند.',
        'چون روتر برودکست Discover کلاینت را عبور نمی‌داد، پیام به سرور نمی‌رسید.',
        'با اضافه کردن دستور ip helper-address 192.168.10.5 روی روتر، برودکست‌ها رله شده و کلاینت‌ها فوراً IP گرفتند.',
      ],
      takeawayFa: 'برای دریافت آدرس از سرور DHCP در ساب‌نت‌های دیگر، پیکربندی DHCP Relay روی روتر الزامی است.',
    },
    'lesson-7-2': {
      ticketId: 'INC-7072',
      titleFa: 'اسپم شدن ایمیل‌های ارسالی سازمان به دلیل نبود رکورد SPF در DNS',
      backgroundFa: 'ایمیل‌های پیش‌فاکتور شرکت به پوشه اسپم مشتریان ارسال می‌شود و سرورهای گوگل آن‌ها را مسدود می‌کنند.',
      cliSnippet: `C:\\> nslookup -type=txt company.ir
Non-authoritative answer:
(No TXT or SPF record found!)

[Google Mail Server Reject Log]
550-5.7.26 This message does not pass authentication checks (SPF/DKIM).`,
      diagnosisStepsFa: [
        'استعلام با nslookup نشان داد هیچ رکورد TXT برای اعتبارسنجی فرستنده در DNS ثبت نشده است.',
        'میل‌سرورهای دنیا ایمیل را به عنوان فیشینگ و هویت نامعتبر تلقی می‌کردند.',
        'با افزودن رکورد v=spf1 ip4:185.143.232.10 ~all در پنل دامنه، ایمیل‌ها مستقیم وارد Inbox شدند.',
      ],
      takeawayFa: 'رکوردهای TXT در سامانه DNS نقشی حیاتی در امنیت نام‌گذاری و احراز اصالت ایمیل‌ها دارند.',
    },
    'lesson-7-3': {
      ticketId: 'INC-7073',
      titleFa: 'حل مشکل سایت با بررسی رکوردهای نام سرور (NS) با nslookup',
      backgroundFa: 'دامنه سایت ثبت شده است اما از هیچ اینترنتی باز نمی‌شود و ارور Server Not Found می‌دهد.',
      cliSnippet: `C:\\> nslookup -type=ns mysite.ir
*** Can't find mysite.ir: No answer

C:\\> nslookup mysite.ir 8.8.8.8
Server:  dns.google
Address: 8.8.8.8
*** dns.google can't find mysite.ir: Non-existent domain`,
      diagnosisStepsFa: [
        'دستور nslookup نشان داد رکوردهای NS سرور در رجیسترار به درستی تعریف نشده‌اند.',
        'سرورهای ریشه نمی‌دانستند کدام سرور پاسخگوی استعلام‌های دامنه است.',
        'با اصلاح نیم‌سرورهای کلودفلیر در رجیسترار، پس از چند ساعت دامنه فعال گردید.',
      ],
      takeawayFa: 'دستور nslookup با سوئیچ -type ریشه‌ای‌ترین ابزار خطایابی عملکرد سرورهای نام‌گذاری است.',
    },
    'lesson-7-4': {
      ticketId: 'INC-7074',
      titleFa: 'نفوذ به سرور به دلیل استفاده از پروتکل ناامن متنی Telnet به جای SSH',
      backgroundFa: 'تیم امنیت گزارش داد رمز عبور روتر مرکزی توسط یک کاربر با ابزار اسنیفر از روی سیم شبکه دزدیده شده است.',
      cliSnippet: `[Wireshark Packet Sniffer on Port 23 Telnet]
Frame 145: Telnet Data: "admin"
Frame 146: Telnet Data: "Password123!"
Frame 147: Telnet Data: "Router# enable"
(Clear text password captured completely!)`,
      diagnosisStepsFa: [
        'پروتکل تلنت داده‌ها و گذرواژه‌ها را به صورت متن ساده و بدون رمزنگاری ارسال می‌کرد.',
        'هر کس در مسیر کابل با برنامه رایگان Wireshark می‌توانست رمز عبور را بخواند.',
        'پروتکل Telnet برای همیشه غیرفعال شد و پروتکل امن SSH با پورت ۲۲ جایگزین گردید.',
      ],
      takeawayFa: 'پروتکل‌های متنی قدیمی نظیر Telnet و HTTP هرگز نباید در سازمان‌ها استفاده شوند؛ استانداردهای امنیتی الزام به SSH و HTTPS دارند.',
    },

    // --- MODULE 8: Security & NAT ---
    'lesson-8-1': {
      ticketId: 'INC-8081',
      titleFa: 'تداخل پورت در جدول PAT و لغو اتصال همزمان چند کاربر',
      backgroundFa: 'هنگام برگزاری آزمون آنلاین، فقط ۱۰ کاربر اول توانستند وصل شوند و برای بقیه پیام خطای شبکه نمایش داده شد.',
      cliSnippet: `Router# show ip nat translations | count
Total active translations: 65535 (PORT EXHAUSTION!)
Router# show ip nat statistics
Total active translations: 65535, Expired: 120, Hits: 412051
NAT overload pool exhausted for interface Dialer0`,
      diagnosisStepsFa: [
        'جدول پورت‌های فناوری PAT برای تک آدرس پابلیک به سقف ۶۵۵۳۵ پورت رسیده بود.',
        'مدت زمان نگهداری اتصالات مرده (Timeout) خیلی بالا تنظیم شده بود.',
        'با کاهش زمان نگهداری نشست‌ها به ۶۰ ثانیه و اضافه کردن یک IP پابلیک دیگر به استخر، مشکل حل شد.',
      ],
      takeawayFa: 'فناوری PAT ظرفیت ۶۵ هزار پورت همزمان به ازای هر IP عمومی دارد که در شبکه‌های شلوغ باید مدیریت شود.',
    },
    'lesson-8-2': {
      ticketId: 'INC-8082',
      titleFa: 'مشکل Double NAT و مسدود شدن ارتباط سرور در دو روتر متوالی',
      backgroundFa: 'کاربری یک روتر وای‌فای خانگی را پشت مودم مخابرات وصل کرده و پورت فورواردینگ برای دوربین کار نمی‌کند.',
      cliSnippet: `Modem Internet WAN: 2.180.45.10 (Public IP)
Modem LAN:          192.168.1.1 (NAT Layer 1)
Router WAN:         192.168.1.100
Router LAN:         192.168.0.1 (NAT Layer 2 - Double NAT!)
Camera IP:          192.168.0.50`,
      diagnosisStepsFa: [
        'وجود دو مرحله ترجمه آدرس (Double NAT) مانع از رسیدن ترافیک پورت ۸۰ به دوربین می‌شد.',
        'مودم بسته‌ها را به روتر دوم می‌رساند اما روتر دوم بسته را مسدود می‌کرد.',
        'با تبدیل مودم به حالت Bridge و واگذاری کامل وظیفه مسیریابی به روتر اصلی، مشکل فوراً برطرف شد.',
      ],
      takeawayFa: 'پدیده Double NAT دشمن پورت فورواردینگ و ارتباطات P2P است؛ مودم ورودی را همواره در حالت Bridge تنظیم کنید.',
    },
    'lesson-8-3': {
      ticketId: 'INC-8083',
      titleFa: 'مسدود شدن حمله اسکن پورت توسط سامانه پیشگیری از نفوذ IPS',
      backgroundFa: 'سامانه مانیتورینگ مسدودسازی یک حمله اسکن پورت Nmap علیه سرورهای وب شرکت را گزارش داد.',
      cliSnippet: `IPS-Engine# show alerts
[ALERT] Port Scan detected from IP 45.33.32.156.
Threshold exceeded: 120 ports scanned in 1.2 seconds.
ACTION TAKEN: Dynamic rule added. Blocked IP 45.33.32.156 for 24 hours.`,
      diagnosisStepsFa: [
        'سامانه IPS ترافیک را به صورت بلادرنگ در خط تحلیل کرد.',
        'الگوی رفتاری اسکن سریع پورت‌های باز توسط هکر کشف شد.',
        'برخلاف IDS که فقط هشدار می‌دهد، سامانه IPS در کمتر از ۵۰ میلی‌ثانیه دسترسی مهاجم را مسدود کرد.',
      ],
      takeawayFa: 'سامانه‌های IPS خط دفاعی فعال شبکه در برابر اسکنرهای خودکار و بدافزارهای کاوشگر هستند.',
    },
    'lesson-8-4': {
      ticketId: 'INC-8084',
      titleFa: 'مهار نفوذ باج‌افزار به لطف تفکیک دسترسی Zero Trust',
      backgroundFa: 'لپ‌تاپ یکی از کارمندان به بدافزار آلوده شد اما بدافزار نتوانست به سرورهای دیتابیس مالی شرکت نفوذ کند.',
      cliSnippet: `Firewall-ZeroTrust# show drops
DENIED: Host 192.168.10.45 (Workstation) -> 192.168.50.10:1433 (SQL Server)
Reason: Device failed health posture check. Missing 2FA authorization token.
POLICY: Zero-Trust Microsegmentation default drop.`,
      diagnosisStepsFa: [
        'در معماری سنتی چون سیستم داخل شبکه بود، می‌توانست به پایگاه‌داده دسترسی پیدا کند.',
        'در معماری Zero Trust، ارتباطات به صورت میکرو-سگمنت کنترل شده و توکن سلامت الزامی بود.',
        'آلودگی فقط در یک لپ‌تاپ مهار شد و دیتاسنتر اصلی شرکت ۱۰۰ درصد ایمن ماند.',
      ],
      takeawayFa: 'فلسفه Zero Trust تضمین می‌کند که آلودگی یک سیستم هرگز منجر به سقوط کل زیرساخت شبکه سازمان نشود.',
    },
  };

  return incidentMap[lessonId] || incidentMap['lesson-1-1'];
}
