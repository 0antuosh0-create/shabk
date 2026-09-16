import React from 'react';
import { CourseModule } from '../../types/course';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Terminal,
  Binary,
  Shield,
  Cpu,
  Layers,
  Server,
  Network,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { renderBidiText, toPersianDigits } from '../../lib/utils/bidi';

export interface ModuleCatalogProps {
  modules: CourseModule[];
  completedLessonIds: string[];
  unlockedLabIds: string[];
  quizScores: Record<string, { bestScore: number; passed: boolean }>;
  onSelectLesson: (moduleId: string, lessonId: string) => void;
  onOpenSubnetSandbox: () => void;
  onOpenTerminal: () => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Layers: <Layers size={22} className="text-purple-500" />,
  Network: <Network size={22} className="text-net-blue" />,
  Cpu: <Cpu size={22} className="text-amber-500" />,
  Binary: <Binary size={22} className="text-emerald-500" />,
  Terminal: <Terminal size={22} className="text-teal-500" />,
  Shield: <Shield size={22} className="text-blue-500" />,
  Server: <Server size={22} className="text-rose-500" />,
  Lock: <Shield size={22} className="text-red-500" />,
};

export const ModuleCatalog: React.FC<ModuleCatalogProps> = ({
  modules,
  completedLessonIds,
  quizScores,
  onSelectLesson,
  onOpenSubnetSandbox,
  onOpenTerminal,
}) => {
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalCompleted = completedLessonIds.length;
  const overallPercent = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  return (
    <div className="space-y-8 w-full pb-20 animate-in fade-in duration-200" dir="rtl">
      {/* Hero Welcome Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-l from-net-blue/15 via-white to-white dark:from-net-blue/20 dark:via-canvas-card-dark dark:to-canvas-card-dark border border-slate-200/80 dark:border-slate-800 shadow-card relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="max-w-3xl space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="blue" size="md">
                <Sparkles size={13} className="text-net-blue" />
                <span>دوره جامع، تعاملی و عملی CompTIA Network+</span>
              </Badge>
              <Badge variant="green" size="sm">
                <span>تکمیل سرفصل‌ها: {toPersianDigits(overallPercent)}٪</span>
              </Badge>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-ink-primary dark:text-ink-light tracking-tight">
              شَبَک؛ پلتفرم یادگیری مفهومی و کاربردی شبکه
            </h1>

            <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              بر پایه سرفصل‌های آموزشی مهندس رجایی و آزمون‌های استاندارد بین‌المللی Network+. مجهز به شبیه‌ساز زنده ترمینال، سندباکس ساب‌نتینگ، انیماتور کپسوله‌سازی بسته و سناریوهای عیب‌یابی در دنیای واقعی.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <Button
                variant="primary"
                size="md"
                onClick={() => onSelectLesson(modules[0].id, modules[0].lessons[0].id)}
                icon={<ArrowLeft size={16} />}
              >
                شروع یادگیری (مدل‌های مرجع)
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={onOpenSubnetSandbox}
                icon={<Binary size={16} />}
              >
                سندباکس ساب‌نتینگ
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={onOpenTerminal}
                icon={<Terminal size={16} />}
              >
                ترمینال شبیه‌ساز CLI
              </Button>
            </div>
          </div>

          {/* Quick Metrics Badge on Hero - Clean Persian Typography without font-mono fallback */}
          <div className="hidden lg:flex flex-col gap-3.5 p-5 rounded-2xl bg-white/90 dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-sm shrink-0 w-72">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 font-sans">وضعیت کل دوره:</span>
              <span className="text-sm font-black text-net-blue font-sans">{toPersianDigits(overallPercent)}٪</span>
            </div>

            <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-l from-net-blue to-cyan-500 rounded-full transition-all duration-500"
                style={{ width: `${overallPercent}%` }}
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-slate-400 text-[10px] font-sans block mb-0.5">درس‌های گذرانده:</span>
                <span className="font-bold text-ink-primary dark:text-ink-light font-sans text-xs">
                  {toPersianDigits(totalCompleted)} از {toPersianDigits(totalLessons)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] font-sans block mb-0.5">سرفصل‌های شبکه:</span>
                <span className="font-bold text-ink-primary dark:text-ink-light font-sans text-xs">
                  {toPersianDigits(8)} فصل کامل
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Grid - 3-Column on wide desktop screens to fill canvas beautifully */}
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-ink-primary dark:text-ink-light flex items-center gap-2">
            <BookOpen size={20} className="text-net-blue" />
            <span>سرفصل‌های آموزشی دوره (۸ فصل استاندارد)</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            برای ورود به هر درس یا آزمون روی فصل متناظر کلیک کنید
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {modules.map((mod) => {
            const completedCount = mod.lessons.filter((l) => completedLessonIds.includes(l.id)).length;
            const progressPercent = Math.round((completedCount / mod.lessons.length) * 100);
            const quizScore = quizScores[mod.id];

            return (
              <Card
                key={mod.id}
                variant="interactive"
                onClick={() => onSelectLesson(mod.id, mod.lessons[0].id)}
                className="flex flex-col justify-between p-6 card-hover-lift"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3.5">
                    <div className="flex items-start gap-3">
                      <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shrink-0">
                        {ICON_MAP[mod.icon] || <BookOpen size={22} />}
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-net-blue block mb-0.5">
                          فصل شماره {toPersianDigits(mod.order)}
                        </span>
                        <h3 className="font-extrabold text-base text-ink-primary dark:text-ink-light leading-snug">
                          {renderBidiText(mod.titleFa)}
                        </h3>
                      </div>
                    </div>

                    {quizScore?.passed && (
                      <Badge variant="green" size="sm" className="shrink-0">
                        <CheckCircle2 size={12} />
                        <span>تأیید مهارت</span>
                      </Badge>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                    {mod.descriptionFa}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1 font-medium">
                      <Clock size={13} />
                      <span>{toPersianDigits(mod.estimatedMinutes)} دقیقه</span>
                    </span>
                    <span className="font-sans text-[11px] font-medium text-slate-600 dark:text-slate-400">
                      {toPersianDigits(completedCount)} از {toPersianDigits(mod.lessons.length)} درس ({toPersianDigits(progressPercent)}٪)
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-l from-net-blue to-cyan-500 transition-all duration-300 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
