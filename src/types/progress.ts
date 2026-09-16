export interface QuizScore {
  bestScore: number;       // Percentage 0 - 100
  passed: boolean;         // >= 70%
  attempts: number;
  lastAttemptDate: string; // ISO string
  mode: 'study' | 'exam';
}

export interface DrillStats {
  totalAttempted: number;
  totalCorrect: number;
  currentStreak: number;
  bestStreak: number;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  terminalFontSize?: 'sm' | 'md' | 'lg';
  soundEnabled?: boolean;
}

export interface AchievementBadge {
  id: string;
  titleFa: string;
  titleEn: string;
  descriptionFa: string;
  icon: string;
  xpAward: number;
  category: 'learning' | 'subnetting' | 'terminal' | 'labs' | 'exam';
}

export interface LearnerProgress {
  schemaVersion: 1;
  appIdentifier: 'shabk-network-learning-platform';
  exportedAt?: string;
  xp: number;
  completedLessonIds: string[];
  unlockedLabIds: string[];
  completedLabIds: string[];
  completedChallengeIds?: string[];
  earnedBadgeIds: string[];
  quizResults: Record<string, QuizScore>;
  drillStats: DrillStats;
  preferences: UserPreferences;
  integrityChecksum?: string;
}
