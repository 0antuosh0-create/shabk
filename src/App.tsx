import React, { useState, useEffect, Suspense, lazy } from 'react';
import { allModules, getModuleById, getLessonById } from './data/modules';
import { CourseModule, Lesson } from './types/course';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { NetworkBackgroundCanvas } from './components/layout/NetworkBackgroundCanvas';
import { Footer } from './components/layout/Footer';
import { ModuleCatalog } from './components/content/ModuleCatalog';
import { LessonViewer } from './components/content/LessonViewer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { TROUBLESHOOTING_SCENARIOS } from './data/labs/troubleshooting-scenarios';
import {
  loadProgress,
  markLessonComplete,
  markLabComplete,
  setThemePreference,
} from './lib/storage/progress-store';

// Dynamic Lazy-Loaded Views for Ultra-Fast Initial Load
const SubnetCalculator = lazy(() =>
  import('./components/subnetting/SubnetCalculator').then((m) => ({ default: m.SubnetCalculator }))
);
const BinaryOctetFlipper = lazy(() =>
  import('./components/visualizers/BinaryOctetFlipper').then((m) => ({ default: m.BinaryOctetFlipper }))
);
const RapidDrillGame = lazy(() =>
  import('./components/subnetting/RapidDrillGame').then((m) => ({ default: m.RapidDrillGame }))
);
const TerminalWindow = lazy(() =>
  import('./components/terminal/TerminalWindow').then((m) => ({ default: m.TerminalWindow }))
);
const CamTableSandbox = lazy(() =>
  import('./components/visualizers/CamTableSandbox').then((m) => ({ default: m.CamTableSandbox }))
);
const LabViewer = lazy(() =>
  import('./components/labs/LabViewer').then((m) => ({ default: m.LabViewer }))
);
const QuizContainer = lazy(() =>
  import('./components/quiz/QuizContainer').then((m) => ({ default: m.QuizContainer }))
);
const CheatsheetDrawer = lazy(() =>
  import('./components/content/CheatsheetDrawer').then((m) => ({ default: m.CheatsheetDrawer }))
);
const BackupModal = lazy(() =>
  import('./components/layout/BackupModal').then((m) => ({ default: m.BackupModal }))
);
const BadgesModal = lazy(() =>
  import('./components/layout/BadgesModal').then((m) => ({ default: m.BadgesModal }))
);
const ResourcesView = lazy(() =>
  import('./components/content/ResourcesView').then((m) => ({ default: m.ResourcesView }))
);

const ViewLoader: React.FC = () => (
  <div className="flex items-center justify-center p-12 w-full min-h-[300px]" dir="rtl">
    <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm animate-pulse">
      <div className="w-4 h-4 rounded-full border-2 border-net-blue border-t-transparent animate-spin" />
      <span className="text-xs font-bold text-slate-600 dark:text-slate-300 font-sans">
        در حال بارگذاری ابزار تعاملی...
      </span>
    </div>
  </div>
);

export const App: React.FC = () => {
  const [progress, setProgress] = useState(() => loadProgress());
  const [currentView, setCurrentView] = useState<string>('catalog');
  const [activeModuleId, setActiveModuleId] = useState<string>('module-1');
  const [activeLessonId, setActiveLessonId] = useState<string>('lesson-1-1');
  const [activeLabId, setActiveLabId] = useState<string>('lab-gateway-outage');
  const [activeQuizModule, setActiveQuizModule] = useState<CourseModule>(allModules[0]);

  const [isCheatsheetOpen, setIsCheatsheetOpen] = useState<boolean>(false);
  const [isBackupOpen, setIsBackupOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [isBadgesOpen, setIsBadgesOpen] = useState<boolean>(false);

  // Sync theme with HTML root class
  useEffect(() => {
    if (progress.preferences.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [progress.preferences.theme]);

  const handleToggleTheme = () => {
    const nextTheme = progress.preferences.theme === 'dark' ? 'light' : 'dark';
    const next = setThemePreference(nextTheme);
    setProgress(next);
  };

  const handleSelectLesson = (moduleId: string, lessonId: string) => {
    setActiveModuleId(moduleId);
    setActiveLessonId(lessonId);
    setCurrentView('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectQuiz = (mod: CourseModule) => {
    setActiveQuizModule(mod);
    setCurrentView('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLab = (labId: string) => {
    setActiveLabId(labId);
    setCurrentView('labs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMarkComplete = (lessonId: string) => {
    const next = markLessonComplete(lessonId);
    setProgress(next);
  };

  const currentModule = getModuleById(activeModuleId) || allModules[0];
  const lessonData = getLessonById(activeModuleId, activeLessonId);
  const currentLesson: Lesson = lessonData?.lesson || currentModule.lessons[0];

  const currentLab = TROUBLESHOOTING_SCENARIOS.find((s) => s.id === activeLabId) || TROUBLESHOOTING_SCENARIOS[0];

  const totalLessons = allModules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div className="min-h-screen bg-canvas-light dark:bg-canvas-dark text-ink-primary dark:text-ink-light flex flex-col font-sans transition-colors relative selection:bg-net-blue/20">
      {/* Dynamic Network Nodes & Packet Particle Background */}
      <NetworkBackgroundCanvas theme={progress.preferences.theme} />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header
          currentView={currentView}
          onSelectView={setCurrentView}
          onOpenCheatsheet={() => setIsCheatsheetOpen(true)}
          onOpenBackup={() => setIsBackupOpen(true)}
          theme={progress.preferences.theme}
          onToggleTheme={handleToggleTheme}
          completedLessonsCount={progress.completedLessonIds.length}
          totalLessonsCount={totalLessons}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <div className="flex-1 flex w-full max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 gap-6 lg:gap-8" dir="rtl">
          <Sidebar
            modules={allModules}
            activeModuleId={activeModuleId}
            activeLessonId={activeLessonId}
            completedLessonIds={progress.completedLessonIds}
            unlockedLabIds={progress.unlockedLabIds}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            onSelectLesson={handleSelectLesson}
            onSelectQuiz={handleSelectQuiz}
            onSelectLab={handleSelectLab}
            onOpenSubnetSandbox={() => { setCurrentView('subnet'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            onOpenTerminal={() => { setCurrentView('terminal'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            onOpenResources={() => { setCurrentView('resources'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          />

          <main className="flex-1 min-w-0 w-full py-6 pb-24 md:pb-6">
            <Suspense fallback={<ViewLoader />}>
              {currentView === 'catalog' && (
                <ModuleCatalog
                  modules={allModules}
                  completedLessonIds={progress.completedLessonIds}
                  unlockedLabIds={progress.unlockedLabIds}
                  quizScores={progress.quizResults}
                  onSelectLesson={handleSelectLesson}
                  onOpenSubnetSandbox={() => setCurrentView('subnet')}
                  onOpenTerminal={() => setCurrentView('terminal')}
                />
              )}

              {currentView === 'lesson' && (
                <LessonViewer
                  module={currentModule}
                  lesson={currentLesson}
                  isCompleted={progress.completedLessonIds.includes(currentLesson.id)}
                  onMarkComplete={handleMarkComplete}
                  onNavigateLesson={handleSelectLesson}
                  onOpenQuiz={handleSelectQuiz}
                  renderCustomVisualizer={(type) => {
                    if (type === 'bit-flipper') return <BinaryOctetFlipper />;
                    if (type === 'cam-table') return <CamTableSandbox />;
                    return null;
                  }}
                />
              )}

              {currentView === 'subnet' && (
                <div className="space-y-6 w-full pb-16 animate-in fade-in duration-200">
                  <SubnetCalculator />
                  <BinaryOctetFlipper />
                  <RapidDrillGame />
                </div>
              )}

              {currentView === 'terminal' && (
                <div className="space-y-6 w-full pb-16 animate-in fade-in duration-200">
                  <div className="mb-2">
                    <h2 className="text-xl font-bold text-ink-primary dark:text-ink-light">
                      محیط خط فرمان زنده شبیه‌ساز شبکه (Terminal Playground)
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      امتحان دستورات ping، tracert، ipconfig، arp، netstat و nslookup در یک توپولوژی شبیه‌سازی‌شده.
                    </p>
                  </div>

                  <TerminalWindow className="h-96" />
                  <CamTableSandbox />
                </div>
              )}

              {currentView === 'labs' && (
                <div className="space-y-6 w-full pb-16 animate-in fade-in duration-200">
                  {/* Lab Scenario Switcher Tabs */}
                  <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white dark:bg-canvas-card-dark rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                    {TROUBLESHOOTING_SCENARIOS.map((sc, sIdx) => {
                      const isSelected = sc.id === activeLabId;
                      const isUnlocked = progress.unlockedLabIds.includes(sc.id) || sIdx === 0;
                      const isCompleted = progress.completedLabIds.includes(sc.id);

                      return (
                        <button
                          key={sc.id}
                          onClick={() => {
                            if (isUnlocked) setActiveLabId(sc.id);
                          }}
                          disabled={!isUnlocked}
                          className={`flex-1 min-w-[180px] p-3 rounded-xl border text-right transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-rose-50 dark:bg-rose-950/40 border-net-rose/60 text-net-rose font-bold shadow-xs'
                              : isUnlocked
                              ? 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                              : 'bg-slate-100 dark:bg-slate-900/20 border-transparent text-slate-400 dark:text-slate-600 opacity-60 cursor-not-allowed'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="text-[11px] font-bold">سناریوی شماره {sIdx + 1}</span>
                            {isCompleted ? (
                              <span className="text-[10px] text-emerald-600 font-bold">✓ حل شد</span>
                            ) : !isUnlocked ? (
                              <span className="text-[10px] text-slate-400">قفل</span>
                            ) : null}
                          </div>
                          <div className="text-xs truncate">{sc.titleFa.replace(/^سناریوی \d+: /, '')}</div>
                        </button>
                      );
                    })}
                  </div>

                  <LabViewer
                    scenario={currentLab}
                    onCompleted={() => {
                      markLabComplete(currentLab.id);
                      setProgress(loadProgress());
                    }}
                    onNextLab={() => {
                      const curIdx = TROUBLESHOOTING_SCENARIOS.findIndex((s) => s.id === currentLab.id);
                      if (curIdx < TROUBLESHOOTING_SCENARIOS.length - 1) {
                        setActiveLabId(TROUBLESHOOTING_SCENARIOS[curIdx + 1].id);
                      }
                    }}
                  />
                </div>
              )}

              {currentView === 'quiz' && (
                <QuizContainer
                  module={activeQuizModule}
                  onFinish={() => {
                    setProgress(loadProgress());
                    setCurrentView('catalog');
                  }}
                />
              )}

              {currentView === 'resources' && (
                <ResourcesView />
              )}
            </Suspense>
          </main>
        </div>

        {/* Modern Compact Tech Dock Footer */}
        <Footer
          onSelectView={setCurrentView}
          onOpenCheatsheet={() => setIsCheatsheetOpen(true)}
        />

        {/* Lazy Modals & Drawers */}
        <Suspense fallback={null}>
          {isCheatsheetOpen && (
            <CheatsheetDrawer
              isOpen={isCheatsheetOpen}
              onClose={() => setIsCheatsheetOpen(false)}
            />
          )}

          {isBackupOpen && (
            <BackupModal
              isOpen={isBackupOpen}
              onClose={() => setIsBackupOpen(false)}
              onRestored={() => setProgress(loadProgress())}
            />
          )}

          {isBadgesOpen && (
            <BadgesModal
              isOpen={isBadgesOpen}
              onClose={() => setIsBadgesOpen(false)}
              xp={progress.xp || 0}
              earnedBadgeIds={progress.earnedBadgeIds || []}
            />
          )}
        </Suspense>

        <MobileBottomNav
          currentView={currentView}
          onSelectView={(v) => {
            setCurrentView(v);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />
      </div>
    </div>
  );
};
