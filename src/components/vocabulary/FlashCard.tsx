import { motion } from 'motion/react';
import type { VocabWord } from '../../types';
import { RotateCcw, Check, ArrowLeft, X } from 'lucide-react';
import { useState } from 'react';

interface FlashCardProps {
  word: VocabWord;
  onMastered: () => void;
  onRepeat: () => void;
  onPrevious: () => void;
  onExit: () => void;
  hasHistory: boolean;
  repeatCount: number;
}

export const FlashCard = ({ word, onMastered, onRepeat, onPrevious, onExit, hasHistory, repeatCount }: FlashCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="perspective-1000">
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full h-80 relative cursor-pointer preserve-3d"
      >
        {/* Front */}
        <div
          className={`absolute inset-0 backface-hidden bg-white rounded-3xl custom-shadow flex flex-col items-center justify-center p-8 border-2 border-mint/20 ${
            isFlipped ? 'hidden' : 'flex'
          }`}
        >
          <h2 className="text-4xl font-bold text-mint mb-2">{word.word}</h2>
          <span className="text-xs font-semibold text-gray-400 mb-4">{word.pronunciation}</span>
          <p className="text-gray-400 text-sm">Ketuk untuk lihat arti</p>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 backface-hidden bg-mint rounded-3xl custom-shadow flex flex-col items-center justify-center p-6 transform rotate-y-180 ${
            !isFlipped ? 'hidden' : 'flex'
          }`}
        >
          <div className="absolute top-4 right-4 bg-white/20 text-white px-2 py-1 rounded text-[10px] font-bold">
            {word.level}
          </div>
          <h2 className="text-2xl font-bold text-white mb-1 text-center">{word.meaning_id}</h2>
          <span className="text-[11px] text-white/70 italic text-center mb-3">({word.category}) {word.meaning_en}</span>
          <div className="h-px w-20 bg-white/30 my-2" />
          <p className="text-white text-sm text-center font-medium">"{word.example_sentence || word.example || 'Example sentence not available'}"</p>
          <p className="text-white/80 text-xs text-center mt-2">"{word.example_translation || word.translation || ''}"</p>
        </div>
      </motion.div>

      <div className="flex gap-2.5 mt-8">
        <button
          onClick={(e) => { 
            e.stopPropagation(); 
            setIsFlipped(false); 
            if (hasHistory) onPrevious(); else onExit(); 
          }}
          className="flex-[0.8] py-4 rounded-2xl flex flex-col items-center justify-center gap-1 font-bold transition-all bg-white border border-gray-200 text-gray-700 custom-shadow hover:bg-gray-50 active:scale-95 cursor-pointer"
        >
          {hasHistory ? <ArrowLeft size={20} /> : <X size={20} />}
          <span className="text-[10px] uppercase tracking-wider">{hasHistory ? 'Prev' : 'Exit'}</span>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); setIsFlipped(false); onRepeat(); }}
          className="flex-1 bg-white border border-peach/30 py-4 rounded-2xl flex flex-col items-center justify-center gap-1 font-bold text-peach custom-shadow hover:bg-peach/5 transition-colors"
        >
          <RotateCcw size={20} />
          <span className="text-[10px] uppercase tracking-wider text-charcoal">
            {repeatCount > 0 ? `Ulangi (${repeatCount + 1})` : 'Ulangi'}
          </span>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); setIsFlipped(false); onMastered(); }}
          className="flex-1 soft-gradient py-4 rounded-2xl flex flex-col items-center justify-center gap-1 font-bold text-white shadow-lg shadow-mint/20 hover:opacity-90 transition-opacity"
        >
          <Check size={20} />
          <span className="text-[10px] uppercase tracking-wider">Hafal</span>
        </button>
      </div>
    </div>
  );
};

export default FlashCard;
