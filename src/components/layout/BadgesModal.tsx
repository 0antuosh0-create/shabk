import React from 'react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { ALL_BADGES, getLevelForXp } from '../../data/cheatsheet/badges-data';
import { toPersianDigits } from '../../lib/utils/bidi';
import {
  Trophy,
  Sparkles,
  Layers,
  Flame,
  Terminal,
  ShieldAlert,
  Award,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  xp: number;
  earnedBadgeIds: string[];
}

const BADGE_ICONS: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles size={24} className="text-amber-500" />,
  Layers: <Layers size={24} className="text-purple-500" />,
  Flame: <Flame size={24} className="text-amber-500 fill-amber-500" />,
  Terminal: <Terminal size={24} className="text-teal-500" />,
  ShieldAlert: <ShieldAlert size={24} className="text-rose-500" />,
  Trophy: <Trophy size={24} className="text-amber-500" />,
  Award: <Award size={24} className="text-indigo-500" />,
};

export const BadgesModal: React.FC<BadgesModalProps> = ({
  isOpen,
  onClose,
  xp,
  earnedBadgeIds,
}) => {
  const currentLevel = getLevelForXp(xp);
  const nextLevelMin = currentLevel.level < 5 ? currentLevel.maxXp + 1 : currentLevel.maxXp;
  const currentLevelMin = currentLevel.minXp;
  const progressInLevel = Math.min(
    100,
    Math.round(((xp - currentLevelMin) / Math.max(1, nextLevelMin - currentLevelMin)) * 100)
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="مدال‌های افتخار و سطح مهارت شبکه">
      <div className="space-y-6 pb-2" dir="rtl">
        {/* Level & XP Hero Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-net-blue/15 via-slate-50 to-indigo-500/10 dark:from-net-blue/20 dark:via-canvas-card-dark dark:to-indigo-950/20 border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-net-blue to-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-md shadow-net-blue/25">
                {toPersianDigits(currentLevel.level)}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-400">سطح مهارت فعال:</span>
                  <Badge variant="blue" size="sm">سطح {toPersianDigits(currentLevel.level)}</Badge>
                </div>
                <h4 className="text-base font-extrabold text-ink-primary dark:text-ink-light">
                  {currentLevel.titleFa}
                </h4>
              </div>
            </div>

            <div className="text-left" dir="ltr">
              <span className="text-xl font-black text-net-blue font-sans">
                {toPersianDigits(xp)}
              </span>
              <span className="text-xs text-slate-400 font-bold block">مجموع XP</span>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="space-y-1.5 pt-2 border-t border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>پیشرفت تا سطح بعدی:</span>
              <span className="font-bold text-net-blue">{toPersianDigits(progressInLevel)}٪</span>
            </div>
            <div className="w-full h-2.5 bg-slate-200/80 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-l from-net-blue to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${progressInLevel}%` }}
              />
            </div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              مدال‌های دستاورد مهندسی ({toPersianDigits(earnedBadgeIds.length)} از {toPersianDigits(ALL_BADGES.length)} کسب شده):
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ALL_BADGES.map((badge) => {
              const isEarned = earnedBadgeIds.includes(badge.id);

              return (
                <div
                  key={badge.id}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                    isEarned
                      ? 'bg-white dark:bg-slate-900/90 border-net-blue/50 dark:border-net-blue/40 shadow-xs'
                      : 'bg-slate-50/40 dark:bg-slate-900/20 border-slate-200/60 dark:border-slate-800/60 opacity-60'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                    isEarned ? 'bg-slate-100 dark:bg-slate-800 shadow-2xs' : 'bg-slate-200/60 dark:bg-slate-800/60'
                  }`}>
                    {isEarned ? BADGE_ICONS[badge.icon] || <Trophy size={24} /> : <Lock size={22} className="text-slate-400" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <h5 className={`font-bold text-xs truncate ${
                        isEarned ? 'text-ink-primary dark:text-ink-light' : 'text-slate-500'
                      }`}>
                        {badge.titleFa}
                      </h5>
                      {isEarned && (
                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      )}
                    </div>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                      {badge.descriptionFa}
                    </p>

                    <div className="mt-2 flex items-center justify-between text-[10px]">
                      <span className="text-amber-600 dark:text-amber-400 font-bold">
                        +{toPersianDigits(badge.xpAward)} XP
                      </span>
                      <span className="text-slate-400 font-mono ltr-text">
                        {badge.titleEn}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
};
