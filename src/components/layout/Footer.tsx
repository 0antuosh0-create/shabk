import React, { useState } from 'react';
import {
  Network,
  Binary,
  Terminal,
  BookMarked,
  ArrowUp,
  Zap,
  Bookmark,
  Activity,
  Heart,
  Laptop,
  HardDrive,
  Router,
  Server,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import { soundFx } from '../../lib/utils/audio';

export interface FooterProps {
  onSelectView: (view: string) => void;
  onOpenCheatsheet: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectView, onOpenCheatsheet }) => {
  const [pingCount, setPingCount] = useState<number>(1);
  const [pingLatency, setPingLatency] = useState<number>(1);
  const [isPinging, setIsPinging] = useState<boolean>(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTestPing = () => {
    if (isPinging) return;
    setIsPinging(true);
    soundFx.playPop();

    setTimeout(() => {
      setPingLatency(Math.floor(Math.random() * 3) + 1);
      setPingCount((p) => p + 1);
      setIsPinging(false);
    }, 400);
  };

  return (
    <footer
      className="mt-auto border-t border-slate-200/90 dark:border-slate-800 bg-gradient-to-b from-white/95 via-slate-50/90 to-slate-100/80 dark:from-[#0b1322]/95 dark:via-[#090f1d]/95 dark:to-[#060a14]/95 backdrop-blur-md pt-7 pb-28 md:pb-8 px-4 sm:px-6 lg:px-8 text-xs select-none transition-colors pb-safe"
      dir="rtl"
    >
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Top Fun & Interactive Cyber-Dock Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 shadow-2xs">
          {/* Interactive Live Loopback Ping Simulator */}
          <div className="flex items-center gap-3 w-full lg:w-auto justify-between sm:justify-start">
            <div className="flex items-center gap-2 font-mono text-[11px] bg-white dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs text-left" dir="ltr">
              <span className={`w-2 h-2 rounded-full ${isPinging ? 'bg-amber-400 animate-ping' : 'bg-emerald-500'}`} />
              <span className="text-slate-400 select-none">ping 127.0.0.1:</span>
              <span className="text-emerald-500 dark:text-emerald-400 font-bold">
                time={pingLatency}ms
              </span>
              <span className="text-slate-500 text-[10px]">TTL=128</span>
              <span className="text-slate-400 text-[10px] hidden sm:inline">({pingCount} pkts)</span>
            </div>

            <button
              onClick={handleTestPing}
              disabled={isPinging}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-net-blue hover:bg-net-blue/90 text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer disabled:opacity-50 shrink-0"
              title="ارسال بسته تستی ICMP Echo Request"
            >
              <Activity size={13} className={isPinging ? 'animate-spin' : ''} />
              <span>پینگ تستی</span>
            </button>
          </div>

          {/* Mini Packet Runway: Host A -> Switch -> Router -> Server */}
          <div className="hidden md:flex items-center gap-2 text-slate-500 dark:text-slate-400 text-[11px] font-mono select-none" dir="ltr">
            <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-bold">
              <Laptop size={14} className="text-net-blue" />
              <span>Client</span>
            </span>
            <span className="text-slate-300 dark:text-slate-700">──</span>
            <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-bold">
              <HardDrive size={14} className="text-amber-500" />
              <span>Switch</span>
            </span>
            <span className="text-slate-300 dark:text-slate-700">──</span>
            <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-bold">
              <Router size={14} className="text-emerald-500" />
              <span>Router</span>
            </span>
            <span className="text-slate-300 dark:text-slate-700">──</span>
            <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-bold">
              <Server size={14} className="text-purple-500" />
              <span>Internet</span>
            </span>
          </div>

          {/* Famous Networking Easter Egg Quote */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 text-amber-900 dark:text-amber-200 text-xs font-medium">
            <Sparkles size={14} className="text-amber-500 shrink-0" />
            <span>هیچ جا مثل 127.0.0.1 خانه آدم نمی‌شود! 🏠</span>
          </div>
        </div>

        {/* Middle Row: Quick Tool Shortcuts */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-bold ml-1 hidden sm:inline">دسترسی سریع به ابزارها:</span>
            <button
              onClick={() => { onSelectView('subnet'); scrollToTop(); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-net-blue text-slate-700 dark:text-slate-300 transition-all shadow-2xs cursor-pointer touch-manipulation active:scale-95"
            >
              <Binary size={14} className="text-net-blue" />
              <span className="font-bold">سندباکس ساب‌نت</span>
            </button>

            <button
              onClick={() => { onSelectView('terminal'); scrollToTop(); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 text-slate-700 dark:text-slate-300 transition-all shadow-2xs cursor-pointer touch-manipulation active:scale-95"
            >
              <Terminal size={14} className="text-teal-500" />
              <span className="font-bold">ترمینال خط فرمان</span>
            </button>

            <button
              onClick={() => { onSelectView('labs'); scrollToTop(); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-500 text-slate-700 dark:text-slate-300 transition-all shadow-2xs cursor-pointer touch-manipulation active:scale-95"
            >
              <ShieldAlert size={14} className="text-rose-500" />
              <span className="font-bold">آزمایشگاه‌های عیب‌یابی</span>
            </button>

            <button
              onClick={() => { onSelectView('resources'); scrollToTop(); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 text-slate-700 dark:text-slate-300 transition-all shadow-2xs cursor-pointer touch-manipulation active:scale-95"
            >
              <BookMarked size={14} className="text-indigo-500" />
              <span className="font-bold">کتابخانه RFC</span>
            </button>

            <button
              onClick={onOpenCheatsheet}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 text-slate-700 dark:text-slate-300 transition-all shadow-2xs cursor-pointer touch-manipulation active:scale-95"
            >
              <Bookmark size={14} className="text-amber-500" />
              <span className="font-bold">جعبه‌ابزار مهندس شبکه</span>
            </button>
          </div>

          {/* Scroll to Top Rocket Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200/80 dark:bg-slate-800 hover:bg-net-blue hover:text-white dark:hover:bg-net-blue text-slate-700 dark:text-slate-300 transition-all text-xs font-bold cursor-pointer shrink-0"
            title="بازگشت به ابتدای صفحه"
          >
            <span>بازگشت به بالا</span>
            <ArrowUp size={14} />
          </button>
        </div>

        {/* Bottom Metadata & Status Bar */}
        <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500">
          <div className="flex items-center gap-3">
            {/* Brand Logo */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-net-blue to-indigo-600 flex items-center justify-center text-white shadow-2xs shrink-0">
                <Network size={13} />
              </div>
              <span className="font-extrabold text-sm text-ink-primary dark:text-ink-light">شَبَک</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-net-blue/10 text-net-blue font-bold">Network+</span>
            </div>

            <div className="h-3.5 w-px bg-slate-300 dark:bg-slate-700" />

            {/* Live Operational Status */}
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-bold">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              <span>100% OPERATIONAL</span>
            </div>

            <div className="hidden lg:flex items-center gap-1 text-[10px] font-mono text-slate-400">
              <Zap size={11} className="text-amber-500" />
              <span>0ms LATENCY</span>
            </div>
          </div>

          <div className="text-center sm:text-left text-[11px] text-slate-500 dark:text-slate-400 leading-normal flex items-center gap-1.5">
            <span>آموزش تعاملی CompTIA Network+ بر پایه جزوه </span>
            <span className="font-bold text-slate-700 dark:text-slate-200">مهندس رجایی</span>
            <span>• گردآوری: یاسمن وادوی</span>
            <Heart size={12} className="text-rose-500 fill-rose-500 inline shrink-0" />
          </div>
        </div>
      </div>
    </footer>
  );
};
