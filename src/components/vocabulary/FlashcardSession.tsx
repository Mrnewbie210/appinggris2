import { useState } from 'react';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import type { VocabWord } from '../../types';
import FlashCard from './FlashCard';

interface FlashcardSessionProps {
  initialWords: VocabWord[];
  onExit: () => void;
  onComplete: () => void;
}

export function FlashcardSession({ initialWords, onExit, onComplete }: FlashcardSessionProps) {
  const [words, setWords] = useState<VocabWord[]>(initialWords);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  const [repeatCounts, setRepeatCounts] = useState<Record<string, number>>({});
  const [toReviewLater, setToReviewLater] = useState<VocabWord[]>([]);
  const [isRoundComplete, setIsRoundComplete] = useState(false);
  const [round, setRound] = useState(1);

  if (!words.length) return null;

  const current = words[currentIndex] || words[0];

  const handleRoundCheck = (newIndex: number, currentToReview: VocabWord[]) => {
    if (newIndex >= words.length) {
      if (currentToReview.length > 0) {
        setIsRoundComplete(true);
      } else {
        onComplete();
      }
    } else {
      setCurrentIndex(newIndex);
    }
  };

  const handleMastered = () => {
    setHistory((prev) => [...prev, currentIndex]);
    handleRoundCheck(currentIndex + 1, toReviewLater);
  };
    
  const handleRepeat = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      // Calculate next review interval (fallback to 1 day for now)
      const nextReviewDate = new Date(Date.now() + 86400000).toISOString();
      
      const payload = {
         user_id: user?.id || null,
         word_id: current.id,
         next_review: nextReviewDate,
         interval: 1
      };
      
      // Fallback local memory save to avoid UI lockups if RLS blocks
      localStorage.setItem(`review_${current.id}`, nextReviewDate);
      
      if (user) {
        await supabase
          .from('spaced_repetition')
          .upsert(payload, { onConflict: 'user_id,word_id' });
      }
    } catch (err) {
      console.error('Failed to sync spaced repetition data. Relying on localStorage memory.', err);
    }

    setRepeatCounts((prev) => ({
      ...prev,
      [current.id]: (prev[current.id] || 0) + 1
    }));

    let updatedToReview = toReviewLater;
    setToReviewLater((prev) => {
      if (!prev.find(w => w.id === current.id)) {
        updatedToReview = [...prev, current];
      } else {
        updatedToReview = prev;
      }
      return updatedToReview;
    });

    setHistory((prev) => [...prev, currentIndex]);
    handleRoundCheck(currentIndex + 1, updatedToReview);
  };

  const handlePrevious = () => {
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      const lastIndex = newHistory.pop();
      if (lastIndex !== undefined) {
        setCurrentIndex(lastIndex);
        const prevWord = words[lastIndex];
        setToReviewLater(currentReview => currentReview.filter(w => w.id !== prevWord.id));
      }
      return newHistory;
    });
  };

  const startNextRound = () => {
    setWords(toReviewLater);
    setToReviewLater([]);
    setCurrentIndex(0);
    setHistory([]);
    setRound(r => r + 1);
    setIsRoundComplete(false);
  };

  if (isRoundComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center gap-6">
        <h2 className="text-3xl font-bold text-mint">Ronde {round} Selesai!</h2>
        <p className="text-gray-500 font-medium">Ada {toReviewLater.length} kata yang perlu diulang sebelum lanjut.</p>
        <button onClick={startNextRound} className="bg-mint text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-mint/20 hover:opacity-90 transition-opacity">
          Mulai Ronde {round + 1}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center sticky top-0 py-2 z-10 px-2 rounded-2xl bg-[#FAFDFA]/90 backdrop-blur-md">
        <div className="w-12"></div>
        <div className="px-5 py-2 bg-white border border-gray-200 rounded-[14px] text-charcoal font-bold text-sm custom-shadow flex items-center justify-center tracking-widest">
          {Math.min(currentIndex + 1, words.length)} <span className="mx-2 text-gray-300">/</span> {words.length}
        </div>
        <div className="w-12 flex justify-end">
          {toReviewLater.length > 0 && (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center justify-center bg-peach/10 text-peach px-2 py-1 rounded-lg border border-peach/20 text-xs font-bold shadow-sm">
              {toReviewLater.length}
            </motion.div>
          )}
        </div>
      </div>

      <FlashCard
        word={current}
        onMastered={handleMastered}
        onRepeat={handleRepeat}
        onPrevious={handlePrevious}
        onExit={onExit}
        hasHistory={history.length > 0}
        repeatCount={repeatCounts[current.id] || 0}
      />
    </div>
  );
}

export default FlashcardSession;
