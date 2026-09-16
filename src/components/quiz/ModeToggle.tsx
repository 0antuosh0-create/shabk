import React from 'react';
import { BookOpen, Timer } from 'lucide-react';

export interface ModeToggleProps {
  mode: 'study' | 'exam';
  onChange: (mode: 'study' | 'exam') => void;
  disabled?: boolean;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({
  mode,
  onChange,
  disabled,
}) => {
  return (
    <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
      <button
        disabled={disabled}
        onClick={() => onChange('study')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
          mode === 'study'
            ? 'bg-white dark:bg-slate-900 text-net-blue shadow-xs'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
        }`}
      >
        <BookOpen size={14} />
        <span>حالت مطالعه (توضیح فوری)</span>
      </button>

      <button
        disabled={disabled}
        onClick={() => onChange('exam')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
          mode === 'exam'
            ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-400 shadow-xs'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
        }`}
      >
        <Timer size={14} />
        <span>شبیه‌ساز آزمون (زمان‌دار)</span>
      </button>
    </div>
  );
};
