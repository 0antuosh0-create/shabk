import React, { useState } from 'react';
import { CourseModule } from '../../types/course';
import {
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  BookOpen,
  Award,
  Lock,
  Unlock,
  ShieldAlert,
  X,
  Binary,
  Terminal,
  BookMarked,
  Sparkles,
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { renderBidiText, toPersianDigits } from '../../lib/utils/bidi';

export interface SidebarProps {
  modules: CourseModule[];
  activeModuleId: string;
  activeLessonId?: string;
  completedLessonIds: string[];
  unlockedLabIds: string[];
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (moduleId: string, lessonId: string) => void;
  onSelectQuiz: (module: CourseModule) => void;
  onSelectLab: (labId: string) => void;
  onOpenSubnetSandbox?: () => void;
  onOpenTerminal?: () => void;
  onOpenResources?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  modules,
  activeModuleId,
  activeLessonId,
  completedLessonIds,
  unlockedLabIds,
  isOpen,
  onClose,
  onSelectLesson,
  onSelectQuiz,
  onSelectLab,
  onOpenSubnetSandbox,
  onOpenTerminal,
  onOpenResources,
}) => {
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    [activeModuleId]: true,
  });

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalCompleted = completedLessonIds.length;
  const overallPercent = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  // Shared sidebar inner content
  const renderSidebarContent = (isMobileDrawer = false) => (
    <div className="flex flex-col h-full bg-white dark:bg-canvas-card-dark text-ink-primary dark:text-ink-light">
      {/* Sticky Top Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-canvas-card-dark/95 backdrop-blur-md z-10 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-net-blue/10 text-net-blue flex items-center justify-center shrink-0">
            <BookOpen size={17} />
          </div>
          <div>
            <h3 className="font-black text-sm text-ink-primary dark:text-ink-light leading-tight">
              سرفصل‌های آموزشی دوره
            </h3>
            <span className="text-[10px] text-slate-400 font-sans font-medium">
              {toPersianDigits(totalLessons)} درس تخصصی CompTIA
            </span>
          </div>
        </div>

        {isMobileDrawer && (
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="بستن منو"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Scrollable Middle Container: Chapters List + Quick Tools */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {modules.map((mod) => {
          const isExpanded = !!expandedModules[mod.id];
          const completedCount = mod.lessons.filter((l) => completedLessonIds.includes(l.id)).length;
          const isModuleComplete = completedCount === mod.lessons.length;
          const isCurrentModule = mod.id === activeModuleId;

          return (
            <div
              key={mod.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isCurrentModule
                  ? 'border-net-blue/50 dark:border-net-blue/50 bg-gradient-to-b from-sky-50/50 via-white to-white dark:from-sky-950/20 dark:via-canvas-card-dark dark:to-canvas-card-dark shadow-xs'
                  : 'border-slate-200/80 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/30 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {/* Module Header Row */}
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full min-h-[50px] p-3 flex items-start justify-between text-right transition-colors hover:bg-slate-100/50 dark:hover:bg-slate-800/40 cursor-pointer"
              >
                <div className="flex items-start gap-2.5 flex-1 min-w-0">
                  {/* Chapter index badge (Far Right) */}
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-sans font-black shrink-0 mt-0.5 shadow-2xs ${
                      isModuleComplete
                        ? 'bg-emerald-500 text-white'
                        : isCurrentModule
                        ? 'bg-net-blue text-white shadow-sm shadow-net-blue/30'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {toPersianDigits(mod.order)}
                  </span>

                  {/* Chapter Title (Center) */}
                  <div className="flex-1 text-xs font-bold text-ink-primary dark:text-ink-light leading-relaxed text-right pl-2">
                    {renderBidiText(mod.titleFa)}
                  </div>
                </div>

                {/* Progress pill & chevron (Far Left) - Clean Persian font without font-mono */}
                <div className="flex items-center gap-1.5 shrink-0 text-slate-400 mt-1 mr-1">
                  <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                    {toPersianDigits(completedCount)} از {toPersianDigits(mod.lessons.length)}
                  </span>
                  {isExpanded ? (
                    <ChevronDown size={15} className="text-net-blue" />
                  ) : (
                    <ChevronLeft size={15} />
                  )}
                </div>
              </button>

              {/* Lessons & Quizzes list */}
              {isExpanded && (
                <div className="pr-3 pl-2.5 py-2 space-y-1.5 bg-white dark:bg-canvas-card-dark/80 border-t border-slate-100 dark:border-slate-800">
                  {mod.lessons.map((lesson) => {
                    const isSelected = lesson.id === activeLessonId;
                    const isDone = completedLessonIds.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        onClick={() => {
                          onSelectLesson(mod.id, lesson.id);
                          if (isMobileDrawer) onClose();
                        }}
                        className={`w-full min-h-[46px] p-2.5 rounded-xl text-right text-xs transition-all flex items-start justify-between gap-2.5 cursor-pointer ${
                          isSelected
                            ? 'bg-net-blue text-white font-bold shadow-md shadow-net-blue/25 ring-2 ring-sky-300 dark:ring-sky-700'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="flex items-start gap-2.5 text-right flex-1 min-w-0">
                          {/* High-contrast solid white badge with blue text when active */}
                          <span
                            className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-sans shrink-0 mt-0.5 ${
                              isSelected
                                ? 'bg-white text-net-blue font-black shadow-xs'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold'
                            }`}
                          >
                            {toPersianDigits(lesson.order)}
                          </span>
                          <span className="leading-relaxed break-words font-sans flex-1 min-w-0">
                            {renderBidiText(lesson.titleFa, isSelected ? 'text-white' : 'text-net-blue dark:text-net-cyan')}
                          </span>
                        </div>

                        {isDone && (
                          <div className={`p-0.5 rounded-full shrink-0 mt-0.5 ${isSelected ? 'bg-white text-net-blue shadow-2xs' : 'text-emerald-500'}`}>
                            <CheckCircle2 size={14} />
                          </div>
                        )}
                      </button>
                    );
                  })}

                  {/* Module Quiz Link */}
                  <button
                    onClick={() => {
                      onSelectQuiz(mod);
                      if (isMobileDrawer) onClose();
                    }}
                    className="w-full min-h-[44px] p-2.5 rounded-xl text-right text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-50/70 dark:bg-purple-950/30 hover:bg-purple-100 dark:hover:bg-purple-900/40 border border-purple-200/70 dark:border-purple-800/50 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Award size={15} className="text-purple-600 dark:text-purple-400" />
                      <span>آزمون پایان فصل {toPersianDigits(mod.order)}</span>
                    </span>
                    <Badge variant="purple" size="sm">تستی و عملی</Badge>
                  </button>

                  {/* Associated Labs */}
                  {mod.labs?.map((lab) => {
                    const isUnlocked = unlockedLabIds.includes(lab.id);
                    return (
                      <button
                        key={lab.id}
                        onClick={() => {
                          if (isUnlocked) {
                            onSelectLab(lab.id);
                            if (isMobileDrawer) onClose();
                          }
                        }}
                        disabled={!isUnlocked}
                        className={`w-full min-h-[44px] p-2.5 rounded-xl text-right text-xs font-medium flex items-center justify-between transition-colors border ${
                          isUnlocked
                            ? 'bg-rose-50/70 dark:bg-rose-950/30 text-rose-700 dark:text-rose-300 hover:bg-rose-100 border-rose-200/70 dark:border-rose-800/50 cursor-pointer'
                            : 'bg-slate-50/40 dark:bg-slate-900/20 text-slate-400 dark:text-slate-600 border-transparent cursor-not-allowed opacity-50'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <ShieldAlert size={14} className="shrink-0" />
                          <span className="leading-snug break-words">{lab.titleFa}</span>
                        </span>
                        {isUnlocked ? <Unlock size={13} className="shrink-0" /> : <Lock size={13} className="shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Quick Tools Box - Fills bottom of sidebar so it is never empty */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-sky-50/40 dark:from-slate-900/80 dark:to-sky-950/20 border border-slate-200/80 dark:border-slate-800 space-y-2 mt-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
            <Sparkles size={14} className="text-net-blue" />
            <span>ابزارهای کاربردی شبکه</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {onOpenSubnetSandbox && (
              <button
                onClick={() => {
                  onOpenSubnetSandbox();
                  if (isMobileDrawer) onClose();
                }}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-net-blue text-slate-700 dark:text-slate-200 flex flex-col items-center gap-1 text-center transition-all cursor-pointer"
              >
                <Binary size={16} className="text-net-blue" />
                <span className="text-[11px] font-bold">ماشین‌حساب ساب‌نت</span>
              </button>
            )}

            {onOpenTerminal && (
              <button
                onClick={() => {
                  onOpenTerminal();
                  if (isMobileDrawer) onClose();
                }}
                className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-net-blue text-slate-700 dark:text-slate-200 flex flex-col items-center gap-1 text-center transition-all cursor-pointer"
              >
                <Terminal size={16} className="text-teal-500" />
                <span className="text-[11px] font-bold">ترمینال شبیه‌ساز</span>
              </button>
            )}
          </div>

          {onOpenResources && (
            <button
              onClick={() => {
                onOpenResources();
                if (isMobileDrawer) onClose();
              }}
              className="w-full p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-net-blue text-slate-700 dark:text-slate-200 flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer mt-1.5"
            >
              <BookMarked size={14} className="text-indigo-500" />
              <span>کتابخانه مراجع استاندارد و RFC</span>
            </button>
          )}
        </div>

        {/* Skill Mastery Progress Pill at bottom of Sidebar */}
        <div className="p-3.5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs">
          <div className="flex items-center justify-between mb-1.5 font-sans">
            <span className="text-slate-500 font-bold text-[11px]">تسلط بر دوره:</span>
            <span className="font-black text-net-blue text-xs">{toPersianDigits(overallPercent)}٪</span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-l from-net-blue to-cyan-500 rounded-full transition-all duration-300"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </div>
        <div className="h-12 md:hidden" />
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Off-Canvas Drawer (< 768px) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs md:hidden transition-opacity duration-300"
          onClick={onClose}
          aria-hidden={!isOpen}
        />
      )}

      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] h-full shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        dir="rtl"
      >
        {renderSidebarContent(true)}
      </div>

      {/* Desktop Sticky Sidebar (>= 768px): Permanent, sticky, self-start, internal scrolling */}
      <aside
        className="hidden md:flex flex-col md:sticky top-20 self-start h-[calc(100vh-5.5rem)] w-84 lg:w-96 shrink-0 border border-slate-200/90 dark:border-slate-800 rounded-3xl overflow-hidden shadow-xs select-none"
        aria-label="سرفصل‌های آموزشی دوره"
        dir="rtl"
      >
        {renderSidebarContent(false)}
      </aside>
    </>
  );
};
