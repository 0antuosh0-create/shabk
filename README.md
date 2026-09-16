# شَبَک (Shabk) — پلتفرم تعاملی و کاربردی آموزش Network+

> **پلتفرم جامع، تعاملی و پروژه-محور یادگیری مفاهیم شبکه و دوره CompTIA Network+ به زبان فارسی همراه با شبیه‌ساز زنده ترمینال، سندباکس ساب‌نتینگ، انیماتور کپسوله‌سازی بسته و سناریوهای عیب‌یابی در دنیای واقعی.**

[![Deploy to GitHub Pages](https://github.com/0antuosh0-create/shabk/actions/workflows/deploy.yml/badge.svg)](https://github.com/0antuosh0-create/shabk/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Built with React 19](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev)
[![TypeScript 5.7](https://img.shields.io/badge/TypeScript-5.7-3178c6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)

---

## 🌟 ویژگی‌های کلیدی پلتفرم

- 📚 **۸ فصل آموزشی جامع بر پایه استاندارد CompTIA Network+**: برگرفته از جزوه آموزشی مهندس رجایی و گردآوری یاسمن وادوی.
- 💻 **شبیه‌ساز زنده خط فرمان شبکه (CLI Simulator)**: اجرای واقعی دستورات `ping`, `tracert`/`traceroute`, `ipconfig`/`ifconfig`/`ip a`, `arp`, `netstat`, `nslookup`/`dig` با پشتیبانی از آلیاس‌های ویندوز و لینوکس.
- 🧮 **سندباکس و ماتریس باینری ساب‌نتینگ**: تفکیک باینری چهار اکتت، اوزان باینری (۱۲۸ تا ۱)، اسلایدر متغیر CIDR و کپی با یک کلیک.
- 🔥 **چالش سرعتی ساب‌نتینگ (Rapid Drill Game)**: تمرین تعاملی با شمارنده تسلسل (Streak)، ضرایب امتیازی و راه‌حل گام‌به‌گام تشریحی.
- ⚡ **شبیه‌ساز واقعی انتقال فریم و بسته**: بازنویسی مک‌آدرس در لایه ۲ و کاهش TTL در لایه ۳ به صورت انیمیشن گام‌به‌گام بین کلاینت، سوئیچ، روتر و وب‌سرور.
- 🛠️ **کارگاه سوکت‌زنی RJ45 و تستر کابل فلوک (Fluke Analyzer)**: آزمایش اتصال پین‌های T568A و T568B و تست پیوستگی سیگنال با نمایشگرهای LED.
- 🛡️ **سندباکس امنیتی سوئیچ و حمله MAC Flood**: شبیه‌سازی رفتار سوئیچ در اشباع جدول CAM و مقابله با Port Security.
- 🎯 **سناریوهای عیب‌یابی در دنیای واقعی (Troubleshooting Labs)**: ۴ آزمایشگاه عملی حل خطاهای واقعی شبکه با تیکت‌های پشتیبانی.
- 📱 **معماری Mobile-First و ناوبری لمسی**: ناوبری استیکی پایین صفحه، منوی کشویی سرفصل‌ها و سازگاری کامل با موبایل.
- 🔒 **۱۰۰٪ کلاینت‌ساید و حریم خصوصی مطلق**: بدون نیاز به سرور یا پایگاه‌داده؛ همراه با قابلیت خروجی گرفتن و بازیابی سوابق با فرمت JSON یا کد فشرده.

---

## 📖 سرفصل‌های هشت‌گانه دوره

1. **فصل ۱**: مبانی شبکه و مدل‌های مرجع (`OSI 7-Layer` در برابر `DoD 4-Layer`)
2. **فصل ۲**: رسانه‌های انتقال، کابل‌کشی و توپولوژی‌ها (`UTP/STP/FTP`, `Fiber Optic`, `T568A/B`)
3. **فصل ۳**: لایه پیوند داده، مک‌آدرس و سوئیچینگ (`MAC Addressing`, `CAM Table`, `CSMA/CD`, `VLANs`)
4. **فصل ۴**: آدرس‌دهی شبکه IPv4 و زیرشبکه‌سازی (`Subnetting`, `CIDR`, `VLSM`, `RFC 1918`)
5. **فصل ۵**: پروتکل‌های تفکیک آدرس و عیب‌یابی لایه ۳ (`ARP`, `Default Gateway`, `ICMP`, `ping`, `tracert`)
6. **فصل ۶**: لایه انتقال، پورت‌ها و سوکت‌ها (`TCP 3-Way Handshake`, `UDP`, `netstat`, `Sockets`)
7. **فصل ۷**: سرویس‌های بنیادین شبکه و لایه کاربرد (`DHCP DORA`, `DNS Hierarchy`, `nslookup`, `HTTP/3`, `SSH`)
8. **فصل ۸**: امنیت، فایروال و ترجمه آدرس شبکه (`NAT/PAT`, `Port Forwarding`, `DMZ`, `Stateful Firewalls`, `Zero Trust`)

---

## 🚀 راه‌اندازی محلی (Local Development)

پروژه با استفاده از **Bun** یا **Node.js** و ابزار **Vite** توسعه داده شده است:

```bash
# کلون کردن مخزن
git clone https://github.com/0antuosh0-create/shabk.git
cd shabk

# نصب وابستگی‌ها
bun install
# یا: npm install

# اجرای سرور توسعه محلی
bun run dev
# یا: npm run dev
```

مرورگر خود را در آدرس `http://localhost:5173/` باز کنید.

### اجرای تست‌های خودکار

```bash
bun run test
# یا: npm test
```

### بیلد نهایی برای انتشار

```bash
bun run build
# یا: npm run build
```

خروجی بهینه‌سازی‌شده در پوشه `dist/` تولید شده و آماده انتشار روی **GitHub Pages** یا هر هاست استاتیک دیگر است.

---

## 📜 قدردانی و استناد علمی (Attribution)

- **مدرس جزوه**: مهندس رجایی
- **گردآورنده**: یاسمن وادوی
- **استاندارد بین‌المللی**: CompTIA Network+ (N10-008 / N10-009)
- **سازنده و توسعه‌دهنده**: [0antuosh0-create](https://github.com/0antuosh0-create)

---

## 📄 مجوز (License)

این پروژه تحت مجوز **MIT** منتشر شده است. استفاده، به اشتراک‌گذاری و بازنشر آن با ذکر منبع بلامانع است.
