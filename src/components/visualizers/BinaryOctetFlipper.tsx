import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Binary } from 'lucide-react';

const BIT_WEIGHTS = [128, 64, 32, 16, 8, 4, 2, 1];

const PRESETS = [
  { label: '/24 (.0)', bits: [0, 0, 0, 0, 0, 0, 0, 0], decimal: 0 },
  { label: '/25 (.128)', bits: [1, 0, 0, 0, 0, 0, 0, 0], decimal: 128 },
  { label: '/26 (.192)', bits: [1, 1, 0, 0, 0, 0, 0, 0], decimal: 192 },
  { label: '/27 (.224)', bits: [1, 1, 1, 0, 0, 0, 0, 0], decimal: 224 },
  { label: '/28 (.240)', bits: [1, 1, 1, 1, 0, 0, 0, 0], decimal: 240 },
  { label: '/29 (.248)', bits: [1, 1, 1, 1, 1, 0, 0, 0], decimal: 248 },
  { label: '/30 (.252)', bits: [1, 1, 1, 1, 1, 1, 0, 0], decimal: 252 },
  { label: 'Full (.255)', bits: [1, 1, 1, 1, 1, 1, 1, 1], decimal: 255 },
];

export const BinaryOctetFlipper: React.FC = () => {
  const [bits, setBits] = useState<number[]>([1, 1, 1, 0, 0, 0, 0, 0]); // Default 224 (/27)

  const toggleBit = (index: number) => {
    setBits((prev) => {
      const copy = [...prev];
      copy[index] = copy[index] === 1 ? 0 : 1;
      return copy;
    });
  };

  const decimalVal = bits.reduce((acc, bit, idx) => acc + (bit === 1 ? BIT_WEIGHTS[idx] : 0), 0);
  const binaryString = bits.join('');

  return (
    <Card className="my-6 border-slate-300 dark:border-slate-800 shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h4 className="font-bold text-ink-primary dark:text-ink-light flex items-center gap-2">
            <Binary className="text-net-blue" size={20} />
            <span>تبدیل‌گر باینری به ده‌دهی ۸ بیتی (تغییر وضعیت بیت‌های اکتت)</span>
          </h4>
          <p className="text-xs text-ink-muted dark:text-ink-light-muted">
            با کلیک روی هر بیت، وضعیت ۰ یا ۱ را تغییر دهید تا مفهوم وزن باینری و محاسبه ساب‌نت ماسک را درک کنید.
          </p>
        </div>

        <Badge variant="blue" size="sm">ابزار تعاملی</Badge>
      </div>

      {/* Preset Buttons */}
      <div className="my-4 flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1">ماسک‌های رایج:</span>
        {PRESETS.map((preset) => (
          <button
            key={preset.label}
            onClick={() => setBits([...preset.bits])}
            className="px-2.5 py-1 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Interactive 8-Bit Grid */}
      <div className="my-6 p-6 bg-slate-100 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-8 gap-2 max-w-xl mx-auto" dir="ltr">
          {bits.map((bit, idx) => {
            const weight = BIT_WEIGHTS[idx];
            const isOn = bit === 1;

            return (
              <button
                key={idx}
                onClick={() => toggleBit(idx)}
                className={`flex flex-col items-center justify-between py-3 px-1 rounded-xl border-2 transition-all cursor-pointer select-none ${
                  isOn
                    ? 'bg-net-blue text-white border-net-blue shadow-md scale-105 ring-2 ring-sky-200 dark:ring-sky-900'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700 hover:border-slate-400'
                }`}
              >
                <span className="text-[11px] font-mono opacity-75 font-semibold">
                  2<sup>{7 - idx}</sup>
                </span>
                <span className="text-2xl font-extrabold font-mono my-1">
                  {bit}
                </span>
                <span className="text-[11px] font-mono font-bold">
                  {weight}
                </span>
              </button>
            );
          })}
        </div>

        {/* Real-time Math Summary */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-6 text-center border-t border-slate-200 dark:border-slate-800 pt-5">
          <div>
            <span className="text-xs font-medium text-slate-500 block mb-0.5">رشته باینری ۸ بیتی:</span>
            <span className="text-lg font-mono font-extrabold text-net-blue ltr-text tracking-widest">
              {binaryString}
            </span>
          </div>

          <div className="hidden sm:block text-slate-300 dark:text-slate-700 text-2xl font-light">=</div>

          <div>
            <span className="text-xs font-medium text-slate-500 block mb-0.5">مجموع ده‌دهی (Decimal):</span>
            <span className="text-3xl font-mono font-black text-ink-primary dark:text-ink-light ltr-text">
              {decimalVal}
            </span>
          </div>
        </div>

        {/* Calculation formula explanation */}
        <div className="mt-4 p-3 bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-center text-xs font-mono text-slate-600 dark:text-slate-300 ltr-text">
          {bits
            .map((b, i) => (b === 1 ? String(BIT_WEIGHTS[i]) : null))
            .filter(Boolean)
            .join(' + ') || '0'}{' '}
          = {decimalVal}
        </div>
      </div>
    </Card>
  );
};
