import React, { useState, useEffect } from 'react';
import { CourseModule, QuizQuestion } from '../../types/course';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { ModeToggle } from './ModeToggle';
import { ScoreReportModal } from './ScoreReportModal';
import { recordQuizResult } from '../../lib/storage/progress-store';
import {
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  Clock,
  Award,
  Terminal,
  Layers,
  Flag,

} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface QuizContainerProps {
  module: CourseModule;
  onFinish?: () => void;
}

export const QuizContainer: React.FC<QuizContainerProps> = ({ module, onFinish }) => {
  const [mode, setMode] = useState<'study' | 'exam'>('study');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes for Exam mode
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [showReport, setShowReport] = useState<boolean>(false);
  const [finalScore, setFinalScore] = useState<number>(0);
  const [newlyUnlockedLabTitle, setNewlyUnlockedLabTitle] = useState<string | undefined>(undefined);

  // For terminal command question type
  const [typedCommand, setTypedCommand] = useState<string>('');

  // For matching question type
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});

  // For flag inspector type
  const [selectedFlag, setSelectedFlag] = useState<string | null>(null);

  const questions: QuizQuestion[] = module.quiz.questions;
  const currentQuestion = questions[currentIndex];

  // Timer for exam mode
  useEffect(() => {
    if (mode === 'exam' && !isFinished && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    } else if (mode === 'exam' && timeLeft === 0 && !isFinished) {
      handleFinishExam();
    }
  }, [mode, isFinished, timeLeft]);

  // Reset interactive states when changing questions
  useEffect(() => {
    setTypedCommand('');
    setSelectedLeft(null);
    setMatchedPairs({});
    setSelectedFlag(null);
    setShowExplanation(userAnswers[currentIndex] !== undefined);
  }, [currentIndex, userAnswers]);

  const handleSelectOption = (optionIndex: number) => {
    if (isFinished) return;
    setUserAnswers((prev) => ({ ...prev, [currentIndex]: optionIndex }));
    if (mode === 'study') {
      setShowExplanation(true);
    }
  };

  const handleVerifyTerminalCommand = () => {
    if (!typedCommand.trim()) return;
    const clean = typedCommand.trim().toLowerCase();
    const accepted = currentQuestion.acceptedCommands?.map((c) => c.toLowerCase()) || [
      currentQuestion.expectedCommand?.toLowerCase() || '',
    ];

    const isCorrect = accepted.some((acc) => clean === acc || clean.startsWith(acc));
    const assignedIndex = isCorrect ? currentQuestion.correctIndex : (currentQuestion.correctIndex + 1) % 4;
    handleSelectOption(assignedIndex);
  };

  const handlePairMatch = (rightText: string) => {
    if (!selectedLeft) return;
    setMatchedPairs((prev) => ({ ...prev, [selectedLeft]: rightText }));
    setSelectedLeft(null);

    // If all pairs matched
    const pairs = currentQuestion.matchingPairs || [];
    const updated = { ...matchedPairs, [selectedLeft]: rightText };
    if (Object.keys(updated).length === pairs.length) {
      const allCorrect = pairs.every((p) => updated[p.leftFa] === p.rightFa);
      const assignedIndex = allCorrect ? currentQuestion.correctIndex : (currentQuestion.correctIndex + 1) % 4;
      handleSelectOption(assignedIndex);
    }
  };

  const handleSelectFlag = (flagName: string) => {
    setSelectedFlag(flagName);
    const isCorrect = flagName === currentQuestion.missingFlag;
    const assignedIndex = isCorrect ? currentQuestion.correctIndex : (currentQuestion.correctIndex + 1) % 4;
    handleSelectOption(assignedIndex);
  };

  const handleFinishExam = () => {
    setIsFinished(true);
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);
    setFinalScore(score);

    const associatedLab = module.labs && module.labs.length > 0 ? module.labs[0] : undefined;
    const { newlyUnlockedLab } = recordQuizResult(module.id, score, mode, associatedLab?.id);

    if (newlyUnlockedLab && associatedLab) {
      setNewlyUnlockedLabTitle(associatedLab.titleFa);
    }

    if (score >= 70) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }

    setShowReport(true);
  };

  const handleRetake = () => {
    setUserAnswers({});
    setCurrentIndex(0);
    setShowExplanation(false);
    setTimeLeft(300);
    setIsFinished(false);
    setShowReport(false);
    setTypedCommand('');
    setSelectedLeft(null);
    setMatchedPairs({});
    setSelectedFlag(null);
  };

  const selectedOpt = userAnswers[currentIndex];
  const isAnswered = selectedOpt !== undefined;

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-20 md:pb-16 animate-in fade-in duration-200">
      {/* Quiz Card */}
      <Card className="border-slate-300 dark:border-slate-800 shadow-card">
        {/* Header with Mode Toggle & Timer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-net-blue">آزمون جامع پایان فصل</span>
              {currentQuestion.type === 'matching' && <Badge variant="purple" size="sm">تطبیق مفهومی</Badge>}
              {currentQuestion.type === 'terminal-command' && <Badge variant="blue" size="sm">شبیه‌سازی خط فرمان</Badge>}
              {currentQuestion.type === 'flag-inspector' && <Badge variant="amber" size="sm">بازرس پرچم‌های بسته</Badge>}
            </div>
            <h3 className="font-bold text-lg text-ink-primary dark:text-ink-light">
              {module.titleFa}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {mode === 'exam' && (
              <div className="flex items-center gap-1.5 font-mono font-bold text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1.5 rounded-lg border border-amber-200 dark:border-amber-800">
                <Clock size={14} />
                <span>{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
              </div>
            )}
            <ModeToggle
              mode={mode}
              onChange={(m) => { setMode(m); handleRetake(); }}
              disabled={isAnswered && !isFinished}
            />
          </div>
        </div>

        {/* Progress status */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 my-4">
          <span>سوال {currentIndex + 1} از {questions.length}</span>
          <span>پاسخ داده شده: {Object.keys(userAnswers).length} از {questions.length}</span>
        </div>

        {/* Question prompt */}
        <div className="p-4 my-2 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <h4 className="text-base font-bold text-ink-primary dark:text-ink-light leading-relaxed">
            {currentQuestion.questionFa}
          </h4>
        </div>

        {/* --- DYNAMIC MULTI-MODAL RENDERING --- */}

        {/* 1. Terminal Command Question Type */}
        {currentQuestion.type === 'terminal-command' ? (
          <div className="my-5 p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs" dir="ltr">
            <div className="flex items-center justify-between text-slate-400 text-[11px] pb-2 border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <Terminal size={14} className="text-net-blue" />
                <span>Diagnostic CLI Terminal Input</span>
              </div>
              <span>Type exact command</span>
            </div>

            <div className="flex items-center gap-2 pt-1 text-slate-200">
              <span className="text-slate-500 font-bold shrink-0">{currentQuestion.terminalPrompt || 'C:\\>'}</span>
              <input
                type="text"
                value={typedCommand}
                onChange={(e) => setTypedCommand(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleVerifyTerminalCommand(); }}
                disabled={isAnswered}
                placeholder="دستور مناسب را اینجا تایپ کنید (مثلاً ping یا ipconfig)..."
                className="flex-1 bg-transparent border-none text-emerald-400 outline-none p-0 focus:ring-0 text-xs font-mono"
              />
              {!isAnswered && (
                <Button variant="primary" size="sm" onClick={handleVerifyTerminalCommand}>
                  اجرا
                </Button>
              )}
            </div>

            {/* Quick palette buttons */}
            {!isAnswered && currentQuestion.optionsFa && (
              <div className="pt-2 border-t border-slate-900 flex flex-wrap gap-1.5" dir="rtl">
                <span className="text-[11px] text-slate-500 font-sans ml-1">پیشنهاد سریع:</span>
                {currentQuestion.optionsFa.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => { setTypedCommand(opt); }}
                    className="px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] border border-slate-800 cursor-pointer"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : currentQuestion.type === 'matching' ? (
          /* 2. Interactive Matching Drill */
          <div className="my-5 p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300">
              <Layers size={16} className="text-purple-500" />
              <span>روی هر مورد در ستون سمت راست کلیک کرده و سپس جفت متناظر آن در ستون چپ را انتخاب نمایید:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs">
              {/* Left Column */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-500 block mb-1">مفاهیم (گروه اول):</span>
                {currentQuestion.matchingPairs?.map((pair, pIdx) => {
                  const isSelected = selectedLeft === pair.leftFa;
                  const hasMatch = matchedPairs[pair.leftFa] !== undefined;

                  return (
                    <button
                      key={pIdx}
                      onClick={() => setSelectedLeft(pair.leftFa)}
                      className={`w-full p-2.5 rounded-xl border text-right font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'border-net-blue bg-sky-50 dark:bg-sky-950/60 text-net-blue font-bold ring-2 ring-net-blue/30'
                          : hasMatch
                          ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{pair.leftFa}</span>
                        {hasMatch && <span className="text-[10px] font-mono text-emerald-600">✓ متصل شد</span>}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right Column */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-500 block mb-1">متناظرها (گروه دوم):</span>
                {currentQuestion.matchingPairs?.map((pair, pIdx) => {
                  const isUsed = Object.values(matchedPairs).includes(pair.rightFa);

                  return (
                    <button
                      key={pIdx}
                      onClick={() => handlePairMatch(pair.rightFa)}
                      disabled={!selectedLeft || isUsed}
                      className={`w-full p-2.5 rounded-xl border text-right font-medium transition-all cursor-pointer ${
                        isUsed
                          ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 opacity-80'
                          : selectedLeft
                          ? 'border-dashed border-purple-400 bg-purple-50/60 dark:bg-purple-950/30 hover:scale-[1.01]'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span>{pair.rightFa}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : currentQuestion.type === 'flag-inspector' ? (
          /* 3. Packet & Flag Inspector */
          <div className="my-5 p-5 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-ink-primary dark:text-ink-light flex items-center gap-1.5">
                <Flag size={16} className="text-amber-500" />
                <span>پرچم‌های هدر بسته TCP (روی پرچم مورد نظر کلیک کنید):</span>
              </span>
              <span className="text-xs font-mono text-slate-500 ltr-text">TCP Control Bits</span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center" dir="ltr">
              {['URG', 'ACK', 'PSH', 'RST', 'SYN', 'FIN'].map((fl) => {
                const isSelected = selectedFlag === fl;
                const isCorrect = fl === currentQuestion.missingFlag;

                let style = 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300';
                if (isAnswered) {
                  if (isCorrect) {
                    style = 'bg-emerald-500 text-white border-emerald-600 font-bold ring-2 ring-emerald-300';
                  } else if (isSelected && !isCorrect) {
                    style = 'bg-rose-500 text-white border-rose-600 font-bold';
                  } else {
                    style = 'opacity-50';
                  }
                } else if (isSelected) {
                  style = 'bg-net-blue text-white border-net-blue';
                }

                return (
                  <button
                    key={fl}
                    onClick={() => handleSelectFlag(fl)}
                    disabled={isAnswered}
                    className={`py-3 px-2 rounded-xl border-2 font-mono font-bold text-sm transition-all cursor-pointer ${style}`}
                  >
                    {fl}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* 4. Standard Multiple Choice with Deep Pedagogical Feedback */
          <div className="space-y-2.5 my-4">
            {currentQuestion.optionsFa.map((optText, optIdx) => {
              const isSelected = selectedOpt === optIdx;
              const isCorrect = optIdx === currentQuestion.correctIndex;

              let style = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60';

              if (mode === 'study' && isAnswered) {
                if (isCorrect) {
                  style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-bold ring-2 ring-emerald-400';
                } else if (isSelected && !isCorrect) {
                  style = 'border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100 ring-2 ring-rose-300';
                } else {
                  style = 'opacity-50 border-slate-200 dark:border-slate-800';
                }
              } else if (isSelected) {
                style = 'border-net-blue bg-sky-50 dark:bg-sky-950/40 text-net-blue font-bold ring-2 ring-net-blue/50';
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full min-h-[44px] p-3.5 rounded-xl border text-right text-sm transition-all flex items-center justify-between cursor-pointer ${style}`}
                >
                  <span className="leading-snug">{optText}</span>
                  {mode === 'study' && isAnswered && isCorrect && (
                    <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0 mr-2" />
                  )}
                  {mode === 'study' && isAnswered && isSelected && !isCorrect && (
                    <AlertCircle size={18} className="text-rose-600 dark:text-rose-400 shrink-0 mr-2" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Deep Pedagogical Explanation */}
        {mode === 'study' && showExplanation && isAnswered && (
          <div className="p-4 my-4 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 text-xs md:text-sm text-sky-950 dark:text-sky-200 leading-relaxed animate-in fade-in duration-200">
            <span className="font-bold flex items-center gap-1.5 mb-1.5 text-net-blue">
              <HelpCircle size={16} />
              <span>تحلیل و پاسخ تشریحی مهندسی:</span>
            </span>
            {currentQuestion.explanationFa}
          </div>
        )}

        {/* Bottom Nav Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800 mt-6">
          <Button
            variant="outline"
            size="sm"
            disabled={currentIndex === 0}
            onClick={() => {
              setCurrentIndex((i) => Math.max(0, i - 1));
              setShowExplanation(userAnswers[currentIndex - 1] !== undefined);
            }}
            icon={<ArrowRight size={15} />}
          >
            سوال قبلی
          </Button>

          {currentIndex < questions.length - 1 ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setCurrentIndex((i) => Math.min(questions.length - 1, i + 1));
                setShowExplanation(userAnswers[currentIndex + 1] !== undefined);
              }}
              icon={<ArrowLeft size={15} />}
            >
              سوال بعدی
            </Button>
          ) : (
            <Button
              variant="success"
              size="sm"
              onClick={handleFinishExam}
              icon={<Award size={15} />}
            >
              ثبت نهایی و مشاهده کارنامه
            </Button>
          )}
        </div>
      </Card>

      {/* Score Report Modal */}
      <ScoreReportModal
        isOpen={showReport}
        onClose={() => setShowReport(false)}
        score={finalScore}
        totalQuestions={questions.length}
        correctCount={Math.round((finalScore / 100) * questions.length)}
        passed={finalScore >= 70}
        unlockedLabTitleFa={newlyUnlockedLabTitle}
        onRetake={handleRetake}
        onContinue={() => {
          setShowReport(false);
          if (onFinish) onFinish();
        }}
      />
    </div>
  );
};
