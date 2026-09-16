import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Trophy, AlertTriangle, RotateCcw, ArrowLeft, Unlock } from 'lucide-react';

export interface ScoreReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  totalQuestions: number;
  correctCount: number;
  passed: boolean;
  unlockedLabTitleFa?: string;
  onRetake: () => void;
  onContinue: () => void;
}

export const ScoreReportModal: React.FC<ScoreReportModalProps> = ({
  isOpen,
  onClose,
  score,
  totalQuestions,
  correctCount,
  passed,
  unlockedLabTitleFa,
  onRetake,
  onContinue,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="کارنامه نتایج آزمون پایان فصل">
      <div className="text-center space-y-5">
        {/* Trophy / Icon badge */}
        <div className="flex justify-center">
          <div className={`w-20 h-20 rounded-3xl flex items-center justify-center ${
            passed
              ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 ring-8 ring-emerald-50 dark:ring-emerald-950/30'
              : 'bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400 ring-8 ring-amber-50 dark:ring-amber-950/30'
          }`}>
            {passed ? <Trophy size={40} /> : <AlertTriangle size={40} />}
          </div>
        </div>

        {/* Score & Percent */}
        <div>
          <span className="text-4xl font-black text-ink-primary dark:text-ink-light">
            {score}٪
          </span>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            شما به {correctCount} سوال از {totalQuestions} سوال پاسخ صحیح دادید (حداقل نمره قبولی: ۷۰٪).
          </p>
        </div>

        {/* Status Badge */}
        <div>
          <Badge variant={passed ? 'green' : 'amber'} size="md">
            {passed ? 'نتیجه: قبولی و تأیید مهارت' : 'نتیجه: نیاز به مرور مجدد مباحث'}
          </Badge>
        </div>

        {/* Unlocked Lab Callout Banner */}
        {passed && unlockedLabTitleFa && (
          <div className="p-3.5 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-right flex items-center gap-3">
            <Unlock size={22} className="text-net-blue shrink-0" />
            <div>
              <span className="text-xs font-bold text-net-blue block">آزمایشگاه عیب‌یابی باز شد!</span>
              <span className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                {unlockedLabTitleFa}
              </span>
            </div>
          </div>
        )}

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed text-right">
          {passed
            ? 'تبریک! شما مفاهیم اساسی این فصل را با موفقیت فرا گرفته‌اید و اکنون مجاز به ورود به سناریوهای عملی هستید.'
            : 'نمره شما به حد نصاب ۷۰٪ نرسید. توصیه می‌شود درس‌های این فصل و نکات کلیدی را مجدداً مرور کرده و دوباره در آزمون شرکت کنید.'}
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button variant="outline" size="md" onClick={onRetake} icon={<RotateCcw size={15} />}>
            آزمون مجدد
          </Button>
          <Button variant="primary" size="md" onClick={onContinue} icon={<ArrowLeft size={15} />}>
            ادامه یادگیری
          </Button>
        </div>
      </div>
    </Modal>
  );
};
