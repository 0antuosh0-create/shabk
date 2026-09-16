import React from 'react';
import { CheckCircle2, Award, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';

export interface LabFeedbackBannerProps {
  isSolved: boolean;
  takeawayFa: string;
  onNextLab?: () => void;
}

export const LabFeedbackBanner: React.FC<LabFeedbackBannerProps> = ({
  isSolved,
  takeawayFa,
  onNextLab,
}) => {
  if (!isSolved) return null;

  return (
    <div className="p-5 my-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100 shadow-sm animate-in fade-in duration-300">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-emerald-500 text-white shrink-0 mt-0.5">
          <Award size={24} />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400" />
            <h4 className="font-extrabold text-base">
              آفرین! عیب‌یابی سناریو با موفقیت کامل شد.
            </h4>
          </div>

          <p className="text-xs md:text-sm text-emerald-800 dark:text-emerald-200/90 leading-relaxed mb-4">
            {takeawayFa}
          </p>

          {onNextLab && (
            <Button variant="success" size="sm" onClick={onNextLab} icon={<ArrowLeft size={14} />}>
              ادامه به سناریوی بعدی
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
