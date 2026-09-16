import React from 'react';
import { Binary, Terminal, ShieldAlert, BookMarked, ListFilter } from 'lucide-react';

export interface MobileBottomNavProps {
  currentView: string;
  onSelectView: (view: string) => void;
  onOpenSidebar: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentView,
  onSelectView,
  onOpenSidebar,
}) => {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-canvas-card-dark/95 border-t border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-lg"
      aria-label="منوی ناوبری موبایل"
      dir="rtl"
    >
      <div className="grid grid-cols-5 h-16 max-w-lg mx-auto px-1">
        {/* Chapters Drawer Trigger */}
        <button
          onClick={onOpenSidebar}
          className="min-h-[44px] min-w-[44px] flex flex-col items-center justify-center gap-1 text-slate-500 dark:text-slate-400 hover:text-net-blue cursor-pointer select-none transition-colors"
        >
          <div className="p-1 rounded-xl">
            <ListFilter size={19} />
          </div>
          <span className="text-[10px] font-medium tracking-tight">سرفصل‌ها</span>
        </button>

        {/* Subnet Sandbox */}
        <button
          onClick={() => onSelectView('subnet')}
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer select-none ${
            currentView === 'subnet'
              ? 'text-net-blue font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-xl transition-transform ${currentView === 'subnet' ? 'scale-110' : ''}`}>
            <Binary size={19} />
          </div>
          <span className="text-[10px] tracking-tight">ساب‌نت</span>
        </button>

        {/* Terminal Simulator */}
        <button
          onClick={() => onSelectView('terminal')}
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer select-none ${
            currentView === 'terminal'
              ? 'text-net-blue font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-xl transition-transform ${currentView === 'terminal' ? 'scale-110' : ''}`}>
            <Terminal size={19} />
          </div>
          <span className="text-[10px] tracking-tight">ترمینال</span>
        </button>

        {/* Labs */}
        <button
          onClick={() => onSelectView('labs')}
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer select-none ${
            currentView === 'labs'
              ? 'text-net-blue font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-xl transition-transform ${currentView === 'labs' ? 'scale-110' : ''}`}>
            <ShieldAlert size={19} />
          </div>
          <span className="text-[10px] tracking-tight">آزمایشگاه</span>
        </button>

        {/* Resources */}
        <button
          onClick={() => onSelectView('resources')}
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer select-none ${
            currentView === 'resources'
              ? 'text-net-blue font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <div className={`p-1 rounded-xl transition-transform ${currentView === 'resources' ? 'scale-110' : ''}`}>
            <BookMarked size={19} />
          </div>
          <span className="text-[10px] tracking-tight">منابع و RFC</span>
        </button>
      </div>
    </nav>
  );
};
