import React from 'react';
import { OutputLine } from '../../types/terminal';
import { Info } from 'lucide-react';

export interface TerminalOutputProps {
  lines: OutputLine[];
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ lines }) => {
  return (
    <div className="space-y-1 font-mono text-xs leading-relaxed text-left" dir="ltr">
      {lines.map((line) => {
        if (line.type === 'educational-tip') {
          return (
            <div
              key={line.id}
              className="my-2 p-2.5 rounded-xl bg-sky-950/60 border border-sky-800/80 text-sky-200 flex items-start gap-2.5 text-right"
              dir="rtl"
            >
              <Info size={16} className="text-sky-400 shrink-0 mt-0.5" />
              <span className="text-xs font-sans leading-relaxed">{line.text}</span>
            </div>
          );
        }

        const colorClass = {
          normal: 'text-slate-300',
          success: 'text-emerald-400 font-semibold',
          warning: 'text-amber-300',
          error: 'text-rose-400 font-semibold',
          header: 'text-slate-100 font-bold',
          'table-row': 'text-slate-300',
        }[line.type] || 'text-slate-300';

        return (
          <div
            key={line.id}
            className={`${colorClass} text-left ltr-text font-mono break-all whitespace-pre-wrap`}
            dir="ltr"
          >
            {line.text}
          </div>
        );
      })}
    </div>
  );
};
