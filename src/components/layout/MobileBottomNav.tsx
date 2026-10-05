import React from 'react';
import { Binary, Terminal, ShieldAlert, BookOpen, ListFilter } from 'lucide-react';
import { soundFx } from '../../lib/utils/audio';

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
  const handleNav = (action: () => void) => {
    soundFx.playPop();
    action();
  };

  const navItems = [
    {
      id: 'catalog',
      label: 'خانه',
      icon: <BookOpen size={19} />,
      isActive: currentView === 'catalog',
      onClick: () => handleNav(() => onSelectView('catalog')),
    },
    {
      id: 'chapters',
      label: 'سرفصل‌ها',
      icon: <ListFilter size={19} />,
      isActive: false,
      onClick: () => handleNav(onOpenSidebar),
    },
    {
      id: 'subnet',
      label: 'ساب‌نت',
      icon: <Binary size={19} />,
      isActive: currentView === 'subnet',
      onClick: () => handleNav(() => onSelectView('subnet')),
    },
    {
      id: 'terminal',
      label: 'ترمینال',
      icon: <Terminal size={19} />,
      isActive: currentView === 'terminal',
      onClick: () => handleNav(() => onSelectView('terminal')),
    },
    {
      id: 'labs',
      label: 'سناریو',
      icon: <ShieldAlert size={19} />,
      isActive: currentView === 'labs',
      onClick: () => handleNav(() => onSelectView('labs')),
    },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-canvas-card-dark/95 border-t border-slate-200/90 dark:border-slate-800/90 backdrop-blur-lg shadow-lg select-none"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
      aria-label="منوی ناوبری موبایل"
      dir="rtl"
    >
      <div className="grid grid-cols-5 h-15 max-w-md mx-auto px-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            className={`min-h-[48px] flex flex-col items-center justify-center gap-1 transition-all cursor-pointer touch-manipulation active:scale-95 ${
              item.isActive
                ? 'text-net-blue dark:text-net-cyan font-bold'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <div
              className={`p-1 rounded-xl transition-all ${
                item.isActive
                  ? 'bg-net-blue/10 dark:bg-net-blue/20 text-net-blue dark:text-net-cyan scale-110 shadow-2xs'
                  : ''
              }`}
            >
              {item.icon}
            </div>
            <span className="text-[10px] tracking-tight font-sans leading-none">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
