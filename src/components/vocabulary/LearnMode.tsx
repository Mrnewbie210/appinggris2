import { useState, useMemo, useEffect } from 'react';
import { Card } from '../ui/Card';
import { motion } from 'motion/react';
import { CheckCircle, XCircle } from 'lucide-react';
import type { VocabWord } from '../../types';

interface LearnModeProps {
    words: VocabWord[];
    onComplete: () => void;
    onExit: () => void;
}

export function LearnMode({ words, onComplete, onExit }: LearnModeProps) {
    const [queue, setQueue] = useState<VocabWord[]>([]);
    const [answeredCount, setAnsweredCount] = useState(0);
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [isCompleted, setIsCompleted] = useState(false);

    const totalQuestions = words.length;

    // Initialize queue once when words is populated
    useEffect(() => {
        if (words.length > 0 && queue.length === 0 && answeredCount === 0) {
            setQueue(words);
        }
    }, [words, queue.length, answeredCount]);

    const currentQ = queue[0];

    const choices = useMemo(() => {
        if (!currentQ) return [];
        const falseChoices = words
            .filter(w => w.id !== currentQ.id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 3)
            .map(w => w.meaning_id);
        return [...falseChoices, currentQ.meaning_id].sort(() => 0.5 - Math.random());
    }, [currentQ, words]);

    // ✅ Summary screen setelah semua kata selesai
    if (isCompleted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center gap-6 px-4">
                <div className="text-6xl">🎉</div>
                <h2 className="text-3xl font-bold text-mint">Sesi Learn Selesai!</h2>
                <p className="text-gray-500 font-medium">
                    Kamu telah mempelajari <span className="font-bold text-charcoal">{totalQuestions} kata</span> dalam sesi ini!
                </p>
                <div className="bg-mint/10 border border-mint/20 rounded-2xl px-8 py-4 w-full max-w-xs">
                    <p className="text-sm text-gray-500 uppercase font-bold tracking-wider mb-1">Kata Dipelajari</p>
                    <p className="text-4xl font-black text-mint">{totalQuestions}</p>
                </div>
                <div className="flex flex-col gap-3 w-full max-w-xs">
                    <button
                        onClick={onComplete}
                        className="bg-mint text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-mint/20 hover:opacity-90 transition-opacity"
                    >
                        Kembali ke Dashboard
                    </button>
                    <button
                        onClick={() => {
                            setQueue(words);
                            setAnsweredCount(0);
                            setFeedback(null);
                            setIsCompleted(false);
                        }}
                        className="bg-white border-2 border-mint text-mint px-8 py-4 rounded-2xl font-bold hover:bg-mint/5 transition-colors"
                    >
                        Ulangi Learn
                    </button>
                </div>
            </div>
        );
    }

    if (!currentQ) return null;

    const handleAnswerSubmit = (choice: string) => {
        if (feedback !== null) return;

        const isCorrect = choice === currentQ.meaning_id;
        setFeedback(isCorrect ? 'correct' : 'incorrect');

        setTimeout(() => {
            setFeedback(null);

            if (isCorrect) {
                const newAnsweredCount = answeredCount + 1;
                setAnsweredCount(newAnsweredCount);
                
                const nextQueue = queue.slice(1);
                        
                // ✅ Cek selesai SEBELUM update queue
                if (newAnsweredCount >= totalQuestions) {
                    setIsCompleted(true);
                    return;
                }
                
                setQueue(nextQueue);
            } else {
                // Jawaban salah — pindahkan kata ke belakang antrian
                setQueue(prev => {
                    const nextQueue = prev.slice(1);
                    return [...nextQueue, currentQ];
                });
            }
        }, 1200);
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center sticky top-0 py-2 z-10 px-2 rounded-2xl bg-[#FAFDFA]/90 backdrop-blur-md">
                <button
                    onClick={onExit}
                    className="bg-white px-4 py-2 rounded-[14px] border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors custom-shadow text-[11px] font-bold uppercase tracking-wider"
                >
                    Exit
                </button>
                <div className="flex items-center flex-1 mx-6 justify-center gap-3">
                    <div className="flex gap-1.5 flex-1 overflow-hidden justify-center items-center">
                        {Array.from({ length: Math.min(totalQuestions, 50) }).map((_, i) => (
                            <div
                                key={i}
                                className={`h-1.5 rounded-full flex-1 max-w-[12px] transition-colors ${
                                    i < answeredCount ? 'bg-mint' : 'bg-gray-200'
                                }`}
                            />
                        ))}
                    </div>
                    <span className="text-[11px] font-black text-gray-400 min-w-[36px] bg-gray-50 px-2 py-1 rounded-md text-center border border-gray-100">
                        {Math.min(answeredCount, totalQuestions)}
                        <span className="text-gray-300 mx-0.5">/</span>
                        {totalQuestions}
                    </span>
                </div>
            </div>

            <Card className="min-h-[400px] flex flex-col p-8 relative overflow-hidden">
                {feedback && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`absolute inset-0 z-10 flex flex-col items-center justify-center backdrop-blur-sm ${
                            feedback === 'correct' ? 'bg-mint/10' : 'bg-peach/10'
                        }`}
                    >
                        {feedback === 'correct' 
                            ? <CheckCircle size={80} className="text-mint opacity-80" /> 
                            : <XCircle size={80} className="text-peach opacity-80" />
                        }
                        {feedback === 'incorrect' && (
                            <div className="mt-4 text-center">
                                <p className="text-sm font-bold text-gray-500 uppercase">Jawaban yang Benar</p>
                                <p className="text-xl font-bold text-peach">{currentQ.meaning_id}</p>
                            </div>
                        )}
                    </motion.div>
                )}

                <span className="text-mint font-black text-[10px] tracking-widest mb-4 uppercase text-center block w-full">
                    Pilih Arti yang Tepat
                </span>

                <h2 className="text-3xl font-bold leading-relaxed mb-8 text-center flex-1 text-charcoal">
                    {currentQ.word}
                </h2>

                <div className="grid grid-cols-1 gap-3 relative z-0">
                    {choices.map((choice, i) => (
                        <button
                            key={i}
                            onClick={() => handleAnswerSubmit(choice)}
                            className="w-full p-4 rounded-2xl border-2 border-gray-100 text-left font-bold text-lg hover:border-mint hover:bg-mint/5 transition-all text-charcoal shadow-sm active:scale-[0.98]"
                        >
                            {choice}
                        </button>
                    ))}
                </div>
            </Card>
        </div>
    );
}

export default LearnMode;
