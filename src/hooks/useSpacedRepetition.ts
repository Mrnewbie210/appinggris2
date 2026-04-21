import { useState, useCallback } from 'react';
import type { VocabWord, SpacedRepetitionData } from '../types';

// ─── SM-2 Algorithm ───────────────────────────────────────────────────────────

/**
 * Calculates the next SM-2 state after a review.
 *
 * @param current  Current SR state for this word
 * @param quality  Rating 0–5 (see SpacedRepetitionData JSDoc)
 * @returns        Updated SR state ready to be saved to Supabase
 */
export function calculateSM2(
  current: SpacedRepetitionData,
  quality: 0 | 1 | 2 | 3 | 4 | 5
): SpacedRepetitionData {
  let { ease_factor, interval, repetitions } = current;

  if (quality < 3) {
    // Failed review — reset repetitions, keep interval at 1
    repetitions = 0;
    interval = 1;
  } else {
    // Correct review — advance interval
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * ease_factor);
    }
    repetitions += 1;
  }

  // Update ease factor (clamped to min 1.3)
  ease_factor = Math.max(
    1.3,
    ease_factor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)
  );

  // Next review date
  const next_review = new Date();
  next_review.setDate(next_review.getDate() + interval);

  // Derive status
  let status: SpacedRepetitionData['status'];
  if (repetitions === 0) status = 'new';
  else if (repetitions < 3) status = 'learning';
  else if (interval >= 21) status = 'mastered';
  else status = 'review';

  return {
    ...current,
    ease_factor,
    interval,
    repetitions,
    next_review: next_review.toISOString(),
    status,
  };
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

interface UseSpacedRepetitionReturn {
  current: VocabWord | null;
  currentIndex: number;
  total: number;
  srData: SpacedRepetitionData[];
  /**
   * Rate the current word and advance to the next one.
   * Pass the SM-2 quality score (0–5).
   */
  rate: (quality: 0 | 1 | 2 | 3 | 4 | 5) => void;
  reset: () => void;
}

/**
 * Local SM-2 spaced repetition hook.
 * Works fully offline using local state.
 * When Supabase is connected, persist `srData` to the `spaced_repetition` table.
 *
 * @example
 *   const { current, rate } = useSpacedRepetition(vocabWords);
 *   // User reviews the word, taps "Hafal!" → rate(5)
 */
export function useSpacedRepetition(words: VocabWord[]): UseSpacedRepetitionReturn {
  const [queue] = useState<VocabWord[]>([...words]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Initialise SR state for every word
  const [srData, setSrData] = useState<SpacedRepetitionData[]>(() =>
    words.map((w) => ({
      word_id: w.id,
      ease_factor: 2.5,
      interval: 1,
      repetitions: 0,
      next_review: new Date().toISOString(),
      status: 'new' as const,
    }))
  );

  const current = queue[currentIndex] ?? null;

  const rate = useCallback(
    (quality: 0 | 1 | 2 | 3 | 4 | 5) => {
      setSrData((prev) => {
        const next = [...prev];
        const idx = next.findIndex((d) => d.word_id === current?.id);
        if (idx !== -1) {
          next[idx] = calculateSM2(next[idx], quality);
        }
        // TODO: persist next[idx] to Supabase spaced_repetition table
        return next;
      });
      setCurrentIndex((i) => Math.min(i + 1, queue.length - 1));
    },
    [current, queue.length]
  );

  const reset = useCallback(() => {
    setCurrentIndex(0);
  }, []);

  return { current, currentIndex, total: queue.length, srData, rate, reset };
}
