import { describe, it, expect, beforeEach } from 'vitest';
import {
  loadProgress,
  saveProgress,
  getInitialProgress,
  exportProgressToJson,
  exportProgressToBackupCode,
  importProgressFromJson,
  importProgressFromBackupCode,
  markLessonComplete,
} from '../../src/lib/storage/progress-store';

describe('Progress Storage & Cross-Device Backup Tests', () => {
  beforeEach(() => {
    saveProgress(getInitialProgress());
  });

  it('initializes default progress structure with 0 completed lessons', () => {
    const p = loadProgress();
    expect(p.completedLessonIds).toHaveLength(0);
    expect(p.schemaVersion).toBe(1);
    expect(p.appIdentifier).toBe('shabk-network-learning-platform');
  });

  it('marks lessons complete and avoids duplicate IDs', () => {
    markLessonComplete('lesson-1-1');
    markLessonComplete('lesson-1-1');
    const p = loadProgress();
    expect(p.completedLessonIds).toEqual(['lesson-1-1']);
  });

  it('exports progress to valid JSON string and restores it cleanly', () => {
    markLessonComplete('lesson-1-1');
    markLessonComplete('lesson-2-1');

    const jsonStr = exportProgressToJson();
    expect(jsonStr).toContain('lesson-1-1');
    expect(jsonStr).toContain('lesson-2-1');

    // Wipe store
    saveProgress(getInitialProgress());
    expect(loadProgress().completedLessonIds).toHaveLength(0);

    // Import from JSON
    const res = importProgressFromJson(jsonStr);
    expect(res.success).toBe(true);
    expect(loadProgress().completedLessonIds).toContain('lesson-1-1');
  });

  it('exports and restores progress via compact base64 backup code string', () => {
    markLessonComplete('lesson-4-1');
    const code = exportProgressToBackupCode();
    expect(typeof code).toBe('string');
    expect(code.length).toBeGreaterThan(20);

    // Wipe store
    saveProgress(getInitialProgress());

    // Import from code
    const res = importProgressFromBackupCode(code);
    expect(res.success).toBe(true);
    expect(loadProgress().completedLessonIds).toContain('lesson-4-1');
  });

  it('rejects invalid JSON or tampered backup code', () => {
    const badJson = importProgressFromJson('{ "random": 123 }');
    expect(badJson.success).toBe(false);

    const badCode = importProgressFromBackupCode('NOT_BASE64_CODE!!!');
    expect(badCode.success).toBe(false);
  });
});
