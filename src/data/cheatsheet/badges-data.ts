import { AchievementBadge } from '../../types/progress';

export const ALL_BADGES: AchievementBadge[] = [
  {
    id: 'badge-first-step',
    titleFa: 'اولین قدم در شبکه',
    titleEn: 'First Network Packet',
    descriptionFa: 'تکمیل موفقیت‌آمیز اولین درس و ورود رسمی به دنیای مهندسی شبکه.',
    icon: 'Sparkles',
    xpAward: 50,
    category: 'learning',
  },
  {
    id: 'badge-osi-master',
    titleFa: 'استاد مدل‌های مرجع OSI و DoD',
    titleEn: 'Reference Model Master',
    descriptionFa: 'پاسخ درست به چالش تطبیق لایه‌های هفت‌گانه OSI و اتمام فصل اول.',
    icon: 'Layers',
    xpAward: 100,
    category: 'learning',
  },
  {
    id: 'badge-subnet-streak',
    titleFa: 'تک‌تیرانداز ساب‌نتینگ (Subnet Sniper)',
    titleEn: 'Subnetting Streak Master',
    descriptionFa: 'ثبت حداقل ۵ پاسخ صحیح متوالی در چالش سرعتی ساب‌نتینگ.',
    icon: 'Flame',
    xpAward: 120,
    category: 'subnetting',
  },
  {
    id: 'badge-terminal-pro',
    titleFa: 'فرمانده خط فرمان (Terminal Commander)',
    titleEn: 'CLI Power User',
    descriptionFa: 'اجرای موفقیت‌آمیز دستورات ping، ipconfig، arp و tracert در ترمینال.',
    icon: 'Terminal',
    xpAward: 80,
    category: 'terminal',
  },
  {
    id: 'badge-incident-detective',
    titleFa: 'کارآگاه حوادث شبکه (Network Detective)',
    titleEn: 'Incident Response Hero',
    descriptionFa: 'کشف ریشه خطا و حل موفق یک سناریوی عیب‌یابی سازمانی.',
    icon: 'ShieldAlert',
    xpAward: 150,
    category: 'labs',
  },
  {
    id: 'badge-exam-champion',
    titleFa: 'بی‌نقص در آزمون (Flawless Score)',
    titleEn: 'Certification Champion',
    descriptionFa: 'کسب نمره کامل ۱۰۰٪ در آزمون پایان فصل بدون پاسخ اشتباه.',
    icon: 'Trophy',
    xpAward: 200,
    category: 'exam',
  },
  {
    id: 'badge-architect',
    titleFa: 'معمار ارشد شبکه CompTIA',
    titleEn: 'Senior Network Architect',
    descriptionFa: 'رسیدن به سطح ۵ مهارت و تسلط کامل بر سرفصل‌های دوره.',
    icon: 'Award',
    xpAward: 500,
    category: 'learning',
  },
];

export interface LevelInfo {
  level: number;
  titleFa: string;
  titleEn: string;
  minXp: number;
  maxXp: number;
  colorClass: string;
}

export const LEVELS: LevelInfo[] = [
  { level: 1, titleFa: 'کارآموز شبکه', titleEn: 'Network Novice', minXp: 0, maxXp: 200, colorClass: 'from-slate-500 to-slate-700' },
  { level: 2, titleFa: 'تکنسین کابل و سوئیچ', titleEn: 'Cabling & Switching Tech', minXp: 201, maxXp: 600, colorClass: 'from-sky-500 to-blue-600' },
  { level: 3, titleFa: 'متخصص ساب‌نتینگ و IPv4', titleEn: 'Subnetting Specialist', minXp: 601, maxXp: 1200, colorClass: 'from-emerald-500 to-teal-600' },
  { level: 4, titleFa: 'مهندس مسیر‌یابی و انتقال', titleEn: 'Routing & Transport Engineer', minXp: 1201, maxXp: 2000, colorClass: 'from-purple-500 to-indigo-600' },
  { level: 5, titleFa: 'معمار ارشد شبکه CompTIA', titleEn: 'Senior Network Architect', minXp: 2001, maxXp: 99999, colorClass: 'from-amber-500 to-orange-600' },
];

export function getLevelForXp(xp: number): LevelInfo {
  return LEVELS.slice().reverse().find((l) => xp >= l.minXp) || LEVELS[0];
}
