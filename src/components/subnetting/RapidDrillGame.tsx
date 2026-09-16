import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { generateRandomSubnetDrill } from '../../lib/network/drill-generator';
import { SubnetDrill } from '../../types/subnet';
import { recordDrillResult, loadProgress } from '../../lib/storage/progress-store';
import { soundFx } from '../../lib/utils/audio';
import { Flame, CheckCircle2, AlertCircle, ArrowLeft, Trophy, RotateCcw, HelpCircle, Zap } from 'lucide-react';
import { toPersianDigits } from '../../lib/utils/bidi';
import confetti from 'canvas-confetti';

export const RapidDrillGame: React.FC = () => {
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [drill, setDrill] = useState<SubnetDrill | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [showDerivation, setShowDerivation] = useState<boolean>(false);

  const [stats, setStats] = useState(() => loadProgress().drillStats);

  const loadNextQuestion = () => {
    setDrill(generateRandomSubnetDrill(difficulty));
    setSelectedOption(null);
    setHasSubmitted(false);
    setShowDerivation(false);
  };

  useEffect(() => {
    loadNextQuestion();
  }, [difficulty]);

  const handleSelectOption = (opt: string) => {
    if (hasSubmitted) return;
    setSelectedOption(opt);
    soundFx.playPop();
  };

  const handleSubmit = () => {
    if (!drill || !selectedOption || hasSubmitted) return;

    const isCorrect = selectedOption.trim() === drill.expectedAnswer.trim();
    setHasSubmitted(true);

    if (isCorrect) {
      soundFx.playSuccess();
    }

    const next = recordDrillResult(isCorrect);
    setStats(next.drillStats);

    if (isCorrect) {
      if ((next.drillStats.currentStreak % 5 === 0 && next.drillStats.currentStreak > 0) || next.drillStats.currentStreak === 3) {
        confetti({ particleCount: 75, spread: 65, origin: { y: 0.7 } });
      }
    }
  };

  if (!drill) return null;

  const isCorrect = selectedOption === drill.expectedAnswer;
  const comboMultiplier = stats.currentStreak >= 5 ? 3 : stats.currentStreak >= 3 ? 2 : 1;

  return (
    <Card className="my-6 border-slate-300 dark:border-slate-800 shadow-card max-w-3xl mx-auto bg-slate-50/50 dark:bg-canvas-card-dark">
      {/* Header & Streak Score */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="text-amber-500" size={22} />
            <h4 className="font-extrabold text-base text-ink-primary dark:text-ink-light">
              چالش سرعتی ساب‌نتینگ (Subnetting Rapid Drill)
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            تمرین بی‌پایان مسائل کاربردی ساب‌نتینگ برای آمادگی آزمون‌های بین‌المللی Network+
          </p>
        </div>

        {/* Streak & Combo Multiplier Badges */}
        <div className="flex items-center gap-2">
          {comboMultiplier > 1 && (
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-black text-xs shadow-xs animate-bounce">
              <Zap size={13} className="fill-white" />
              <span>ضریب {toPersianDigits(comboMultiplier)}X</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 font-bold text-xs">
            <Flame size={16} className={`text-amber-500 fill-amber-500 ${stats.currentStreak >= 3 ? 'animate-pulse' : ''}`} />
            <span>تسلسل: {toPersianDigits(stats.currentStreak)}</span>
          </div>

          <Badge variant="blue" size="md">
            دقت: {toPersianDigits(stats.totalAttempted > 0 ? Math.round((stats.totalCorrect / stats.totalAttempted) * 100) : 0)}٪
          </Badge>
        </div>
      </div>

      {/* Difficulty Switch */}
      <div className="flex items-center gap-2 my-4">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">سطح دشواری:</span>
        {(['easy', 'medium', 'hard'] as const).map((lvl) => (
          <button
            key={lvl}
            onClick={() => setDifficulty(lvl)}
            className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              difficulty === lvl
                ? 'bg-net-blue text-white border-net-blue shadow-xs scale-[1.02]'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-50'
            }`}
          >
            {lvl === 'easy' ? 'آسان (کلاس C)' : lvl === 'medium' ? 'متوسط (کلاس B و C)' : 'پیشرفته (کلاس A)'}
          </button>
        ))}
      </div>

      {/* Question Box */}
      <div className="p-5 my-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <h3 className="text-base md:text-lg font-bold text-ink-primary dark:text-ink-light leading-relaxed mb-4">
          {drill.promptFa}
        </h3>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {drill.optionsFa?.map((opt, idx) => {
            const isSelected = selectedOption === opt;
            const isAnswer = opt === drill.expectedAnswer;

            let btnStyle = 'border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60';

            if (hasSubmitted) {
              if (isAnswer) {
                btnStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-bold ring-2 ring-emerald-400';
              } else if (isSelected && !isAnswer) {
                btnStyle = 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100 ring-2 ring-rose-300';
              } else {
                btnStyle = 'opacity-40 border-slate-200 dark:border-slate-800';
              }
            } else if (isSelected) {
              btnStyle = 'border-net-blue bg-sky-50 dark:bg-sky-950/40 text-net-blue font-bold ring-2 ring-net-blue/50';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(opt)}
                disabled={hasSubmitted}
                className={`p-3.5 rounded-xl border text-center font-mono text-sm transition-all cursor-pointer ${btnStyle}`}
              >
                <span className="ltr-text font-bold">{opt}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Result feedback */}
      {hasSubmitted && (
        <div className={`p-4 rounded-xl mb-4 flex items-center justify-between border ${
          isCorrect
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-200'
            : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-900 dark:text-rose-200'
        }`}>
          <div className="flex items-center gap-2.5">
            {isCorrect ? (
              <CheckCircle2 size={20} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle size={20} className="text-rose-600 dark:text-rose-400 shrink-0" />
            )}
            <span className="text-sm font-bold">
              {isCorrect ? 'پاسخ کاملاً درست است! احسنت.' : `پاسخ اشتباه است. گزینه صحیح: ${drill.expectedAnswer}`}
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowDerivation(!showDerivation)}
            icon={<HelpCircle size={15} />}
          >
            {showDerivation ? 'پنهان‌سازی فرمول' : 'مشاهده فرمول و راه‌حل'}
          </Button>
        </div>
      )}

      {/* Step-by-step derivation */}
      {showDerivation && (
        <div className="p-4 mb-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs leading-relaxed space-y-1.5 animate-in fade-in duration-200">
          <span className="font-bold text-slate-800 dark:text-slate-200 block mb-1">
            مراحل گام‌به‌گام محاسبه ریاضی ساب‌نت:
          </span>
          {drill.derivationStepsFa.map((step, i) => (
            <div key={i} className="text-slate-600 dark:text-slate-300">
              {step}
            </div>
          ))}
        </div>
      )}

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800">
        <Button
          variant="secondary"
          size="sm"
          onClick={loadNextQuestion}
          icon={<RotateCcw size={14} />}
        >
          سوال بعدی
        </Button>

        {!hasSubmitted ? (
          <Button
            variant="primary"
            size="md"
            disabled={!selectedOption}
            onClick={handleSubmit}
          >
            بررسی پاسخ
          </Button>
        ) : (
          <Button
            variant="primary"
            size="md"
            onClick={loadNextQuestion}
            icon={<ArrowLeft size={16} />}
          >
            ادامه چالش بعدی
          </Button>
        )}
      </div>
    </Card>
  );
};
