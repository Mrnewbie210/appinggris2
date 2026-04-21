/**
 * Shared TypeScript types for appinggris
 * Synced with Oxford 3000/5000 PDF metadata & SM-2 Spaced Repetition system.
 */

// ─── Navigation ───────────────────────────────────────────────────────────────

export type Page = 'home' | 'vocabulary' | 'grammar' | 'exercise' | 'progress';

// ─── CEFR & Vocabulary Taxonomy ───────────────────────────────────────────────

/** CEFR levels as defined by the Oxford 3000/5000 word list */
export type VocabLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

/** Broad semantic/syntactic categories for filtering and grouping words */
export type VocabCategory =
  | 'noun'
  | 'verb'
  | 'adjective'
  | 'adverb'
  | 'preposition'
  | 'conjunction'
  | 'pronoun'
  | 'idiom'
  | 'phrasal_verb'
  | 'other';

/** Mapped difficulty derived from CEFR level */
export type VocabDifficulty = 'beginner' | 'intermediate' | 'advanced';

// ─── Core Vocabulary Word ─────────────────────────────────────────────────────

/**
 * Represents a single vocabulary entry.
 * Designed to map 1:1 with the `vocabulary` table in Supabase.
 *
 * Fields sourced from Oxford 3000/5000 PDF:
 *   - word, pronunciation (IPA), level, category
 * Fields sourced from Cambridge Dictionary:
 *   - meaning_id (Indonesian translation), meaning_en (English definition)
 */
export interface VocabWord {
  id: string;
  word: string;
  /** IPA phonetic notation, e.g. "/rɪˈzɪl.i.əns/" */
  pronunciation: string;
  /** Indonesian translation (standard Cambridge bilingual entry) */
  meaning_id: string;
  /** English definition (Cambridge Dictionary) */
  meaning_en: string;
  /** Example sentence in English */
  example_sentence: string;
  /** Indonesian translation of the example sentence */
  example_translation: string;
  category: VocabCategory;
  /** CEFR Level from Oxford word list */
  level: VocabLevel;
  difficulty: VocabDifficulty;
  /** Freeform tags, e.g. ['business', 'academic', 'oxford3000'] */
  tags: string[];
  created_at: string;

  // ── Legacy fallback fields (kept for mock data compatibility) ──
  /** @deprecated Use meaning_id instead */
  translation?: string;
  /** @deprecated Use example_sentence instead */
  example?: string;
  /** @deprecated Use spaced_repetition.status instead */
  mastered?: boolean;
}

// ─── Spaced Repetition (SM-2 Algorithm) ──────────────────────────────────────

/**
 * SM-2 algorithm state for a single vocabulary word, per user.
 * Maps to the `spaced_repetition` table in Supabase.
 *
 * SM-2 Quality ratings:
 *   0 – complete blackout
 *   1 – incorrect, correct on hint
 *   2 – incorrect, easy to recall
 *   3 – correct with difficulty
 *   4 – correct with hesitation
 *   5 – perfect recall
 */
export interface SpacedRepetitionData {
  id?: string;
  user_id?: string;
  /** Foreign key → vocabulary.id */
  word_id: string;
  /** Current interval in days */
  interval: number;
  /** ISO 8601 date-time of next scheduled review */
  next_review: string;
  
  // Legacy fields below
  ease_factor?: number;
  repetitions?: number;
  status?: 'new' | 'learning' | 'review' | 'mastered';
}

// ─── User & Progress ──────────────────────────────────────────────────────────

export interface Task {
  id: string;
  title: string;
  status: 'pending' | 'completed';
}

export interface UserData {
  name: string;
  streak: number;
  progress: number;
  dailyTasks: Task[];
  quote: string;
}

/**
 * User XP, level, and streak data.
 * Maps to the `user_progress` table in Supabase (single-row per user).
 */
export interface UserProgress {
  user_id: string;
  display_name: string;
  xp: number;
  app_level: number;
  streak_days: number;
  /** ISO date of last study session */
  last_study_date: string;
  /** Total vocabulary words mastered */
  words_mastered: number;
  /** Total study time in minutes */
  total_study_minutes: number;
  created_at: string;
  updated_at: string;
}

// ─── Grammar ─────────────────────────────────────────────────────────────────

export interface GrammarLesson {
  id: number;
  title: string;
  duration: string;
  status: 'completed' | 'pending';
  thumbnail: string;
}

// ─── Progress & Achievements ──────────────────────────────────────────────────

export interface Achievement {
  id: number;
  name: string;
  icon: string;
  color: string;
}

export interface ProgressChapter {
  title: string;
  progress: number;
}
