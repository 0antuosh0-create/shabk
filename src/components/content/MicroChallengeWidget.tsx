import React, { useState } from 'react';
import { MicroChallenge } from '../../types/course';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Sparkles, CheckCircle2, AlertCircle, RotateCcw, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export interface MicroChallengeWidgetProps {
  challenge: MicroChallenge;
}

export const MicroChallengeWidget: React.FC<MicroChallengeWidgetProps> = ({ challenge }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [assignments, setAssignments] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const handleAssignToGroup = (groupId: string) => {
    if (isSubmitted || !selectedItem) return;
    setAssignments((prev) => ({ ...prev, [selectedItem]: groupId }));
    setSelectedItem(null);
  };

  const handleCheck = () => {
    const allAssigned = challenge.itemsFa.every((it) => assignments[it.id] !== undefined);
    if (!allAssigned) return;

    const allCorrect = challenge.itemsFa.every((it) => assignments[it.id] === it.targetGroup);
    setIsSubmitted(true);
    setIsCorrect(allCorrect);
    if (allCorrect) {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    }
  };

  const handleReset = () => {
    setAssignments({});
    setSelectedItem(null);
    setIsSubmitted(false);
    setIsCorrect(false);
    setShowExplanation(false);
  };

  return (
    <Card className="my-6 border-slate-300 dark:border-slate-800 bg-gradient-to-b from-sky-50/40 via-white to-white dark:from-sky-950/20 dark:via-canvas-card-dark dark:to-canvas-card-dark shadow-card">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-net-blue/10 text-net-blue shrink-0">
            <Sparkles size={18} />
          </div>
          <div>
            <Badge variant="blue" size="sm" className="mb-1">مینی چالش تحلیلی درس</Badge>
            <h4 className="font-extrabold text-sm md:text-base text-ink-primary dark:text-ink-light">
              {challenge.titleFa}
            </h4>
          </div>
        </div>

        <Button variant="ghost" size="sm" onClick={handleReset} icon={<RotateCcw size={14} />}>
          شروع مجدد
        </Button>
      </div>

      <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 my-4 leading-relaxed">
        {challenge.promptFa}
      </p>

      {/* Target Category Groups */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {challenge.groupsFa.map((grp) => {
          const itemsInThisGroup = challenge.itemsFa.filter((it) => assignments[it.id] === grp.id);

          return (
            <div
              key={grp.id}
              onClick={() => handleAssignToGroup(grp.id)}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                selectedItem
                  ? 'border-dashed border-net-blue bg-sky-50/70 dark:bg-sky-950/40 hover:scale-[1.01]'
                  : 'border-slate-200 dark:border-slate-700/80 bg-slate-50/60 dark:bg-slate-900/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-xs text-ink-primary dark:text-ink-light">
                  {grp.nameFa}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {itemsInThisGroup.length} مورد
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 min-h-[36px] items-center">
                {itemsInThisGroup.length === 0 ? (
                  <span className="text-[11px] text-slate-400 font-normal">
                    {selectedItem ? 'برای انتقال، روی این کادر کلیک کنید' : 'هنوز موردی اضافه نشده است'}
                  </span>
                ) : (
                  itemsInThisGroup.map((it) => (
                    <span
                      key={it.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isSubmitted) {
                          const updated = { ...assignments };
                          delete updated[it.id];
                          setAssignments(updated);
                        }
                      }}
                      className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 shadow-2xs cursor-pointer hover:border-rose-400 hover:text-rose-600 transition-colors"
                      title="کلیک برای لغو تخصیص"
                    >
                      {it.labelFa} ✕
                    </span>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Unassigned Items Bank */}
      {!isSubmitted && (
        <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 mb-4">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-2">
            موارد موجود برای انتخاب و دسته‌بندی (روی هر مورد کلیک کرده و سپس کادر گروه متناظر را انتخاب کنید):
          </span>
          <div className="flex flex-wrap gap-2">
            {challenge.itemsFa
              .filter((it) => assignments[it.id] === undefined)
              .map((it) => {
                const isSelected = selectedItem === it.id;
                return (
                  <button
                    key={it.id}
                    onClick={() => setSelectedItem(it.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-net-blue text-white shadow-md scale-105 ring-2 ring-sky-300'
                        : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {it.labelFa}
                  </button>
                );
              })}
          </div>
        </div>
      )}

      {/* Validation Result */}
      {isSubmitted && (
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
            <span className="text-xs md:text-sm font-bold">
              {isCorrect ? 'آفرین! دسته‌بندی و تحلیل کاملاً دقیق و درست است.' : 'برخی موارد به اشتباه دسته‌بندی شده‌اند. دوباره تلاش کنید.'}
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowExplanation(!showExplanation)}
            icon={<HelpCircle size={15} />}
          >
            {showExplanation ? 'پنهان‌سازی تحلیل' : 'مشاهده پاسخ تحلیلی'}
          </Button>
        </div>
      )}

      {showExplanation && (
        <div className="p-3.5 mb-4 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 text-xs text-sky-950 dark:text-sky-200 leading-relaxed">
          <span className="font-bold block mb-1">تحلیل مهندسی:</span>
          {challenge.explanationFa}
        </div>
      )}

      {/* Footer Check Action */}
      {!isSubmitted && (
        <div className="flex justify-end pt-2">
          <Button
            variant="primary"
            size="md"
            onClick={handleCheck}
            disabled={challenge.itemsFa.some((it) => assignments[it.id] === undefined)}
          >
            بررسی و اعتبارسنجی چالش
          </Button>
        </div>
      )}
    </Card>
  );
};
