import { LearnerProgress } from '../../types/progress';
import { soundFx } from '../utils/audio';

const STORAGE_KEY = 'shabk_learner_progress_v1';

export function getInitialProgress(): LearnerProgress {
  return {
    schemaVersion: 1,
    appIdentifier: 'shabk-network-learning-platform',
    xp: 0,
    completedLessonIds: [],
    unlockedLabIds: [],
    completedLabIds: [],
    completedChallengeIds: [],
    earnedBadgeIds: [],
    quizResults: {},
    drillStats: {
      totalAttempted: 0,
      totalCorrect: 0,
      currentStreak: 0,
      bestStreak: 0,
    },
    preferences: {
      theme: 'light',
      terminalFontSize: 'md',
      soundEnabled: true,
    },
  };
}

export function loadProgress(): LearnerProgress {
  if (typeof window === 'undefined' || !window.localStorage) {
    return getInitialProgress();
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return getInitialProgress();
    }
    const parsed = JSON.parse(raw) as unknown;
    if (isValidProgress(parsed)) {
      if (parsed.preferences.soundEnabled !== undefined) {
        soundFx.setEnabled(parsed.preferences.soundEnabled);
      }
      return parsed;
    }
  } catch (e) {
    console.warn('Failed to parse stored progress, using fallback', e);
  }

  return getInitialProgress();
}

export function saveProgress(progress: LearnerProgress): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    const updated = {
      ...progress,
      exportedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
}

function checkBadges(current: LearnerProgress): string[] {
  const earned = new Set(current.earnedBadgeIds);

  if (current.completedLessonIds.length >= 1) {
    earned.add('badge-first-step');
  }
  if (current.completedLessonIds.filter((id) => id.startsWith('lesson-1-')).length >= 4) {
    earned.add('badge-osi-master');
  }
  if (current.drillStats.bestStreak >= 5) {
    earned.add('badge-subnet-streak');
  }
  if (current.completedLabIds.length >= 1) {
    earned.add('badge-incident-detective');
  }
  if (Object.values(current.quizResults).some((q) => q.bestScore === 100)) {
    earned.add('badge-exam-champion');
  }
  if (current.xp >= 2000) {
    earned.add('badge-architect');
  }

  return Array.from(earned);
}

export function markLessonComplete(lessonId: string): LearnerProgress {
  const current = loadProgress();
  if (current.completedLessonIds.includes(lessonId)) {
    return current;
  }
  soundFx.playPop();

  const nextXp = current.xp + 50;
  const next: LearnerProgress = {
    ...current,
    xp: nextXp,
    completedLessonIds: [...current.completedLessonIds, lessonId],
    earnedBadgeIds: checkBadges({ ...current, xp: nextXp, completedLessonIds: [...current.completedLessonIds, lessonId] }),
  };
  saveProgress(next);
  return next;
}

export function markChallengeComplete(challengeId: string): LearnerProgress {
  const current = loadProgress();
  const completed = current.completedChallengeIds || [];
  if (completed.includes(challengeId)) {
    return current;
  }
  soundFx.playSuccess();

  const nextXp = current.xp + 30;
  const next: LearnerProgress = {
    ...current,
    xp: nextXp,
    completedChallengeIds: [...completed, challengeId],
    earnedBadgeIds: checkBadges({ ...current, xp: nextXp }),
  };
  saveProgress(next);
  return next;
}

export function markLabComplete(labId: string): LearnerProgress {
  const current = loadProgress();
  if (current.completedLabIds.includes(labId)) {
    return current;
  }
  soundFx.playSuccess();

  const nextXp = current.xp + 150;
  const nextCompleted = [...current.completedLabIds, labId];
  const next: LearnerProgress = {
    ...current,
    xp: nextXp,
    completedLabIds: nextCompleted,
    earnedBadgeIds: checkBadges({ ...current, xp: nextXp, completedLabIds: nextCompleted }),
  };
  saveProgress(next);
  return next;
}

export function recordQuizResult(
  moduleId: string,
  score: number,
  mode: 'study' | 'exam',
  associatedLabId?: string
): { nextProgress: LearnerProgress; newlyUnlockedLab: boolean } {
  const current = loadProgress();
  const existing = current.quizResults[moduleId];
  const passed = score >= 70;
  
  const bestScore = existing ? Math.max(existing.bestScore, score) : score;
  const attempts = existing ? existing.attempts + 1 : 1;

  let newlyUnlockedLab = false;
  const unlockedLabs = [...current.unlockedLabIds];
  if (passed && associatedLabId && !unlockedLabs.includes(associatedLabId)) {
    unlockedLabs.push(associatedLabId);
    newlyUnlockedLab = true;
  }

  if (passed) {
    soundFx.playSuccess();
  }

  const xpBonus = passed ? (mode === 'exam' ? 150 : 100) : 10;
  const nextXp = current.xp + xpBonus;

  const next: LearnerProgress = {
    ...current,
    xp: nextXp,
    unlockedLabIds: unlockedLabs,
    quizResults: {
      ...current.quizResults,
      [moduleId]: {
        bestScore,
        passed: passed || (existing ? existing.passed : false),
        attempts,
        lastAttemptDate: new Date().toISOString(),
        mode,
      },
    },
    earnedBadgeIds: checkBadges({
      ...current,
      xp: nextXp,
      quizResults: {
        ...current.quizResults,
        [moduleId]: { bestScore, passed: true, attempts, lastAttemptDate: '', mode },
      },
    }),
  };

  saveProgress(next);
  return { nextProgress: next, newlyUnlockedLab };
}

export function recordDrillResult(isCorrect: boolean): LearnerProgress {
  const current = loadProgress();
  const currentStreak = isCorrect ? current.drillStats.currentStreak + 1 : 0;
  const bestStreak = Math.max(current.drillStats.bestStreak, currentStreak);
  const xpEarned = isCorrect ? (currentStreak >= 5 ? 25 : 10) : 0;

  if (isCorrect) {
    soundFx.playPop();
  }

  const nextXp = current.xp + xpEarned;
  const next: LearnerProgress = {
    ...current,
    xp: nextXp,
    drillStats: {
      totalAttempted: current.drillStats.totalAttempted + 1,
      totalCorrect: current.drillStats.totalCorrect + (isCorrect ? 1 : 0),
      currentStreak,
      bestStreak,
    },
    earnedBadgeIds: checkBadges({
      ...current,
      xp: nextXp,
      drillStats: { ...current.drillStats, bestStreak },
    }),
  };
  saveProgress(next);
  return next;
}

export function setThemePreference(theme: 'light' | 'dark'): LearnerProgress {
  const current = loadProgress();
  const next: LearnerProgress = {
    ...current,
    preferences: {
      ...current.preferences,
      theme,
    },
  };
  saveProgress(next);
  return next;
}

export function toggleSoundPreference(): LearnerProgress {
  const current = loadProgress();
  const nextSound = current.preferences.soundEnabled === false;
  soundFx.setEnabled(nextSound);
  const next: LearnerProgress = {
    ...current,
    preferences: {
      ...current.preferences,
      soundEnabled: nextSound,
    },
  };
  saveProgress(next);
  return next;
}

export function exportProgressToJson(): string {
  const current = loadProgress();
  return JSON.stringify(current, null, 2);
}

export function exportProgressToBackupCode(): string {
  const current = loadProgress();
  const jsonStr = JSON.stringify(current);
  if (typeof window !== 'undefined' && window.btoa) {
    return window.btoa(unescape(encodeURIComponent(jsonStr)));
  }
  return Buffer.from(jsonStr, 'utf-8').toString('base64');
}

export function importProgressFromJson(jsonStr: string): { success: boolean; error?: string } {
  try {
    const parsed = JSON.parse(jsonStr) as unknown;
    if (!isValidProgress(parsed)) {
      return { success: false, error: 'فایل پشتیبان نامعتبر است یا ساختار داده مطابقت ندارد.' };
    }
    saveProgress(parsed);
    return { success: true };
  } catch {
    return { success: false, error: 'خطا در خواندن فایل JSON: فرمت فایل صحیح نیست.' };
  }
}

export function importProgressFromBackupCode(code: string): { success: boolean; error?: string } {
  try {
    let decoded = '';
    if (typeof window !== 'undefined' && window.atob) {
      decoded = decodeURIComponent(escape(window.atob(code.trim())));
    } else {
      decoded = Buffer.from(code.trim(), 'base64').toString('utf-8');
    }
    return importProgressFromJson(decoded);
  } catch {
    return { success: false, error: 'کد پشتیبان نامعتبر است یا به اشتباه کپی شده است.' };
  }
}

function isValidProgress(obj: unknown): obj is LearnerProgress {
  if (!obj || typeof obj !== 'object') return false;
  const candidate = obj as Record<string, unknown>;
  return (
    candidate.appIdentifier === 'shabk-network-learning-platform' &&
    Array.isArray(candidate.completedLessonIds) &&
    Array.isArray(candidate.unlockedLabIds) &&
    typeof candidate.quizResults === 'object' &&
    typeof candidate.drillStats === 'object' &&
    typeof candidate.preferences === 'object'
  );
}
