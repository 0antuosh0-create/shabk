import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-all cursor-pointer ${
              isActive
                ? 'bg-white dark:bg-canvas-card-dark text-ink-primary dark:text-ink-light shadow-sm'
                : 'text-ink-secondary dark:text-ink-light-muted hover:text-ink-primary dark:hover:text-ink-light hover:bg-white/50 dark:hover:bg-slate-700/50'
            }`}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                isActive
                  ? 'bg-net-blue/10 text-net-blue font-semibold'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
