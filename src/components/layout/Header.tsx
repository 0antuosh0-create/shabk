import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import {
  Network,
  Bookmark,
  Binary,
  Terminal,
  ShieldAlert,
  Settings,
  Menu,
  X,
  BookMarked,
  BookOpen,
} from 'lucide-react';
import { toPersianDigits } from '../../lib/utils/bidi';

export interface HeaderProps {
  currentView: string;
  onSelectView: (view: string) => void;
  onOpenCheatsheet: () => void;
  onOpenBackup: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  completedLessonsCount: number;
  totalLessonsCount: number;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onSelectView,
  onOpenCheatsheet,
  onOpenBackup,
  theme,
  onToggleTheme,
  completedLessonsCount,
  totalLessonsCount,
  isSidebarOpen,
  onToggleSidebar,
}) => {
  const percent = totalLessonsCount > 0 
    ? Math.round((completedLessonsCount / totalLessonsCount) * 100) 
    : 0;

  const navItems = [
    { id: 'catalog', label: 'سرفصل‌ها', icon: <BookOpen size={16} /> },
    { id: 'subnet', label: 'سندباکس ساب‌نت', icon: <Binary size={16} /> },
    { id: 'terminal', label: 'ترمینال CLI', icon: <Terminal size={16} /> },
    { id: 'labs', label: 'آزمایشگاه‌ها', icon: <ShieldAlert size={16} /> },
    { id: 'resources', label: 'منابع و RFC', icon: <BookMarked size={16} /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-canvas-card-dark/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors shadow-2xs">
      <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-6 md:px-8 h-15 sm:h-16 flex items-center justify-between gap-2 sm:gap-4" dir="rtl">
        {/* Brand & Mobile Drawer Trigger (Right in RTL) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onToggleSidebar}
            className="min-h-[42px] min-w-[42px] flex items-center justify-center p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors md:hidden cursor-pointer touch-manipulation active:scale-95"
            aria-label="منوی سرفصل‌ها"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <button
            onClick={() => onSelectView('catalog')}
            className="flex items-center gap-2 sm:gap-2.5 cursor-pointer text-right group select-none touch-manipulation"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-net-blue via-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-net-blue/25 group-hover:scale-105 transition-transform shrink-0">
              <Network size={20} className="sm:w-5.5 sm:h-5.5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg sm:text-xl text-ink-primary dark:text-ink-light tracking-tight">
                  شَبَک
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded-md bg-net-blue/10 text-net-blue border border-net-blue/20">
                  Network+
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block -mt-0.5 font-medium">
                آموزش تعاملی و کاربردی شبکه
              </span>
            </div>
          </button>
        </div>

        {/* Center: Segmented Navigation Pills (Hidden on mobile, visible on desktop) */}
        <nav className="hidden lg:flex items-center gap-1.5 p-1 bg-slate-100/90 dark:bg-slate-900/80 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-inner">
          {navItems.map((item) => {
            const isActive =
              currentView === item.id || (item.id === 'catalog' && currentView === 'lesson');
            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap select-none ${
                  isActive
                    ? 'bg-white dark:bg-canvas-card-dark text-net-blue dark:text-net-cyan shadow-sm scale-[1.02]'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-800/60'
                }`}
              >
                <span className={isActive ? 'text-net-blue dark:text-net-cyan' : 'text-slate-400 dark:text-slate-500'}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Left: Progress Pill, Cheatsheet, Backup, Theme (Left in RTL) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Mobile Compact Progress Ring Pill */}
          <div className="flex sm:hidden items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] font-bold text-net-blue font-sans select-none">
            <span>{toPersianDigits(percent)}٪</span>
          </div>

          {/* Desktop Progress Widget */}
          <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs select-none">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 font-bold text-slate-700 dark:text-slate-300 text-[11px]" dir="rtl">
                <span>پیشرفت:</span>
                <span className="text-net-blue font-extrabold">{toPersianDigits(percent)}٪</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium font-sans">
                {toPersianDigits(completedLessonsCount)} از {toPersianDigits(totalLessonsCount)} درس
              </span>
            </div>

            <div className="w-16 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-l from-net-blue to-cyan-500 rounded-full transition-all duration-500"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          {/* Quick Cheatsheet Button */}
          <button
            onClick={onOpenCheatsheet}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-amber-400 dark:hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors shadow-2xs cursor-pointer select-none touch-manipulation active:scale-95"
            title="جعبه‌ابزار مهندس شبکه (Cheatsheet)"
          >
            <Bookmark size={15} className="text-amber-500 shrink-0" />
            <span className="hidden sm:inline">جعبه‌ابزار</span>
          </button>

          {/* Backup & Settings Modal Trigger */}
          <button
            onClick={onOpenBackup}
            className="p-2 sm:p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs cursor-pointer touch-manipulation active:scale-95"
            title="پشتیبان‌گیری و سوابق"
            aria-label="تنظیمات"
          >
            <Settings size={16} className="sm:w-4.5 sm:h-4.5" />
          </button>

          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
};
