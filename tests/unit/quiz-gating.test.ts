import { describe, it, expect, beforeEach } from 'vitest';
import { recordQuizResult, getInitialProgress, saveProgress } from '../../src/lib/storage/progress-store';

describe('Quiz Evaluation & Lab Unlocking Logic Tests', () => {
  beforeEach(() => {
    saveProgress(getInitialProgress());
  });

  it('records failing quiz score without unlocking associated lab', () => {
    const { nextProgress, newlyUnlockedLab } = recordQuizResult('module-4', 60, 'study', 'lab-gateway-outage');
    expect(nextProgress.quizResults['module-4'].passed).toBe(false);
    expect(nextProgress.quizResults['module-4'].bestScore).toBe(60);
    expect(newlyUnlockedLab).toBe(false);
  });

  it('records passing quiz score (>=70%) and unlocks associated lab', () => {
    const { nextProgress, newlyUnlockedLab } = recordQuizResult('module-4', 80, 'study', 'lab-gateway-outage');
    expect(nextProgress.quizResults['module-4'].passed).toBe(true);
    expect(nextProgress.quizResults['module-4'].bestScore).toBe(80);
    expect(nextProgress.unlockedLabIds).toContain('lab-gateway-outage');
    expect(newlyUnlockedLab).toBe(true);
  });

  it('preserves previous higher bestScore on retake', () => {
    recordQuizResult('module-4', 90, 'study', 'lab-gateway-outage');
    const { nextProgress } = recordQuizResult('module-4', 75, 'study', 'lab-gateway-outage');
    expect(nextProgress.quizResults['module-4'].bestScore).toBe(90);
    expect(nextProgress.quizResults['module-4'].attempts).toBe(2);
  });
});
