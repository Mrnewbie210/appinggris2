import { useState, useMemo, useEffect } from 'react';
import { Card } from '../ui/Card';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, XCircle, Trophy, Home, RotateCcw, Flame } from 'lucide-react';
import type { VocabWord } from '../../types';
import confetti from 'canvas-confetti';

interface QuizModeProps {
  words: VocabWord[];
  onComplete: (score: number, mistakes: VocabWord[]) => void;
  onExit: () => void;
}

export function QuizMode({ words, onComplete, onExit }: QuizModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mistakes, setMistakes] = useState<VocabWord[]>([]);
  const [score, setScore] = useState(0);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const questions = useMemo(() => {
    return words.map(word => {
      const type = Math.random() < 0.7 ? 'mcq' : 'typing';
      let choices: string[] = [];
      if (type === 'mcq') {
        const falseChoices = words
          .filter(w => w.id !== word.id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map(w => w.meaning_id);
        choices = [...falseChoices, word.meaning_id].sort(() => 0.5 - Math.random());
      }
      return { word, type, choices };
    });
  }, [words]);

  useEffect(() => {
    if (isCompleted) {
      onComplete(score, mistakes);
      if (score / questions.length >= 0.8) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }
  }, [isCompleted, score, mistakes, questions.length, onComplete]);

  const handleRestart = () => {
    setCurrentIndex(0);
    setMistakes([]);
    setScore(0);
    setTypedAnswer('');
    setFeedback(null);
    setIsCompleted(false);
  };

  if (!words.length) return null;

  const currentQ = questions[currentIndex];

  if (isCompleted) {
    const xpEarned = score * 10;
    const accuracy = Math.round((score / questions.length) * 100);

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh] gap-6"
      >
        <div className="relative">
           <div className="w-32 h-32 bg-mint/10 rounded-[40px] flex items-center justify-center">
              <Trophy size={64} className="text-mint" />
           </div>
           <motion.div 
             initial={{ scale: 0 }} 
             animate={{ scale: 1 }} 
             delay={0.5}
             className="absolute -top-2 -right-2 bg-orange-500 text-white p-2 rounded-2xl shadow-lg"
           >
             <Flame size={20} />
           </motion.div>
        </div>

        <div className="text-center">
           <h1 className="text-3xl font-black text-charcoal mb-2">Sesi Selesai! 🎉</h1>
           <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Akurasi: {accuracy}%</p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
           <Card className="flex flex-col items-center justify-center py-6 gap-1 bg-mint/5 border-mint/20">
              <span className="text-3xl font-black text-mint">{score} / {questions.length}</span>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Benar</span>
           </Card>
           <Card className="flex flex-col items-center justify-center py-6 gap-1 bg-yellow-50/50 border-yellow-200/50">
              <span className="text-3xl font-black text-yellow-600">+{xpEarned}</span>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">XP Didapat</span>
           </Card>
        </div>

        {mistakes.length > 0 && (
          <div className="w-full max-w-sm">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1 text-center">Butuh peningkatan pada:</h4>
            <div className="flex flex-wrap justify-center gap-2">
               {mistakes.slice(0, 5).map((m, i) => (
                 <span key={i} className="px-3 py-1 bg-red-50 text-red-500 text-xs font-bold rounded-lg border border-red-100">
                   {m.word}
                 </span>
               ))}
               {mistakes.length > 5 && <span className="text-xs text-gray-400 font-bold">+{mistakes.length - 5} lainnya</span>}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 w-full max-w-sm mt-4">
           <button 
             onClick={onExit}
             className="w-full bg-charcoal text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all"
           >
             <Home size={18} /> Kembali ke Dashboard
           </button>
           <button 
             onClick={handleRestart}
             className="w-full bg-white border-2 border-gray-100 text-gray-600 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
           >
             <RotateCcw size={18} /> Ulangi Quiz
           </button>
        </div>
      </motion.div>
    );
  }

  const handleAnswerSubmit = (answer: string) => {
    if (feedback !== null || isCompleted || !currentQ) return;
    
    const isLastQuestion = currentIndex >= questions.length - 1;

    let isCorrect = false;
    if (currentQ.type === 'mcq') {
      isCorrect = answer === currentQ.word.meaning_id;
    } else {
      isCorrect = answer.toLowerCase().trim() === currentQ.word.word.toLowerCase().trim();
    }

    if (isCorrect) {
      setScore(s => s + 1);
      setFeedback('correct');
    } else {
      setMistakes(prev => [...prev, currentQ.word]);
      setFeedback('incorrect');
    }

    setTimeout(() => {
      setFeedback(null);
      setTypedAnswer('');
      if (isLastQuestion) setIsCompleted(true);
      else setCurrentIndex(prev => prev + 1);
    }, 1200);
  };

  if (!currentQ) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center sticky top-0 py-2 z-10 px-2 rounded-2xl bg-[#FAFDFA]/90 backdrop-blur-md">
        <button
          onClick={onExit}
          className="bg-white px-4 py-2 rounded-[14px] border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors custom-shadow text-[11px] font-bold uppercase tracking-wider"
        >
          Exit
        </button>
        <div className="px-5 py-2 bg-white border border-gray-200 rounded-[14px] text-charcoal font-bold text-sm custom-shadow flex items-center justify-center tracking-widest">
          {currentIndex + 1} <span className="mx-2 text-gray-300">/</span> {questions.length}
        </div>
        <div className="w-16"></div>
      </div>

      <Card className="min-h-[400px] flex flex-col p-8 relative overflow-hidden shadow-xl border-gray-100">
        <AnimatePresence>
          {feedback && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className={`absolute inset-0 z-10 flex flex-col items-center justify-center backdrop-blur-sm ${feedback === 'correct' ? 'bg-mint/10' : 'bg-peach/10'}`}
            >
              {feedback === 'correct' ? <CheckCircle size={80} className="text-mint opacity-80" /> : <XCircle size={80} className="text-peach opacity-80" />}
              {currentQ.type === 'typing' && feedback === 'incorrect' && (
                <p className="mt-4 text-xl font-bold text-peach">Benar: {currentQ.word.word}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <span className="text-mint font-black text-[10px] tracking-widest mb-4 uppercase">
          {currentQ.type === 'mcq' ? 'Pilih Arti yang Tepat' : 'Ketik dalam Bahasa Inggris'}
        </span>
        
        <h2 className="text-3xl font-bold leading-relaxed mb-8 flex-1 text-charcoal">
          {currentQ.type === 'typing' ? currentQ.word.meaning_id : currentQ.word.word}
        </h2>

        {currentQ.type === 'mcq' ? (
          <div className="grid grid-cols-1 gap-3 mt-auto relative z-0">
            {currentQ.choices.map((choice, i) => (
              <button
                key={i}
                onClick={() => handleAnswerSubmit(choice)}
                className="w-full p-4 rounded-2xl border-2 border-gray-100 text-left font-bold text-lg hover:border-mint hover:bg-mint/5 transition-all text-charcoal shadow-sm active:scale-[0.98]"
              >
                {choice}
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-auto relative z-0 flex flex-col gap-4">
            <input
              type="text"
              autoFocus
              value={typedAnswer}
              onChange={e => setTypedAnswer(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && typedAnswer.trim()) {
                  handleAnswerSubmit(typedAnswer);
                }
              }}
              placeholder="Ketikan kata dalam bahasa Inggris..."
              className="w-full p-5 rounded-2xl border-2 border-gray-100 text-xl font-bold focus:outline-none focus:border-mint bg-gray-50/50"
            />
            <button 
              onClick={() => typedAnswer.trim() && handleAnswerSubmit(typedAnswer)}
              className="bg-charcoal text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 active:scale-[0.98] transition-all"
            >
              Cek Jawaban
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}

export default QuizMode;
