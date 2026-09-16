import React from 'react';
import { Sun, Moon } from 'lucide-react';

export interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-800 cursor-pointer"
      title={theme === 'dark' ? 'تغییر به تم روشن' : 'تغییر به تم تاریک'}
      aria-label="تغییر تم"
    >
      {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} />}
    </button>
  );
};
