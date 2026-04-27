import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PenTool, ChevronRight, X, Check, Clock, Trophy, RotateCcw } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { sessions } from '../lib/exerciseData';
import type { Session } from '../lib/exerciseData';

// ─── Types ───────────────────────────────────────────────────────────────────

interface QuizQuestion {
  id: string;
  type: 'mc_single' | 'mc_multiple' | 'vocab';
  question: string;
  options: string[];
  correct: number[];
  explanation: string;
}

type Screen = 'list' | 'quiz' | 'result';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function isCorrectAnswer(submitted: number[], correct: number[]): boolean {
  return JSON.stringify([...submitted].sort()) === JSON.stringify([...correct].sort());
}

function generateVocabQuestions(words: any[], count: number): QuizQuestion[] {
  if (words.length < 4) return [];
  const pool = shuffle(words);
  const questions: QuizQuestion[] = [];

  for (let i = 0; i < Math.min(count, pool.length); i++) {
    const target = pool[i];
    const wrongs = shuffle(pool.filter((w) => w.id !== target.id)).slice(0, 3);
    const allOpts = shuffle([target, ...wrongs]);
    const correctIdx = allOpts.findIndex((o) => o.id === target.id);

    questions.push({
      id: `vocab_${target.id}`,
      type: 'vocab',
      question: `Apa arti kata "${target.word}" dalam bahasa Indonesia?`,
      options: allOpts.map((o: any) => o.meaning_id),
      correct: [correctIdx],
      explanation: `"${target.word}" artinya "${target.meaning_id}".${target.example_sentence ? ` Contoh: ${target.example_sentence}` : ''}`,
    });
  }

  return questions;
}

// ─── SessionCard ─────────────────────────────────────────────────────────────

function SessionCard({ session, onClick }: { session: Session; onClick: () => void }) {
  const savedScore = localStorage.getItem(`exercise_sesi_${session.id}_score`);
  const isCompleted = localStorage.getItem(`exercise_sesi_${session.id}_completed`) === 'true';
  const score = savedScore ? parseInt(savedScore) : null;

  const levelColors: Record<string, string> = {
    A1: 'bg-green-100 text-green-700',
    A2: 'bg-blue-100 text-blue-700',
    B1: 'bg-yellow-100 text-yellow-700',
    B2: 'bg-orange-100 text-orange-700',
    C1: 'bg-red-100 text-red-700',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-left hover:border-mint/50 transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0 pr-2">
          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${levelColors[session.level]}`}>
            {session.level}
          </span>
          <h3 className="font-bold text-charcoal mt-2 text-sm">{session.title}</h3>
          <p className="text-xs text-gray-400 mt-0.5 truncate">{session.topic}</p>
        </div>
        {isCompleted && score !== null ? (
          <div className={`text-right flex-shrink-0 ${score >= 70 ? 'text-mint' : 'text-orange-400'}`}>
            <div className="text-2xl font-black">{score}%</div>
            <div className="text-[10px] font-bold">{score >= 70 ? 'LULUS' : 'COBA LAGI'}</div>
          </div>
        ) : (
          <div className="w-10 h-10 bg-mint/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <PenTool size={18} className="text-mint" />
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <Clock size={12} />
        <span>15 soal • 10 menit</span>
        {isCompleted && <span className="ml-auto text-mint font-bold text-[10px]">✓ Selesai</span>}
      </div>
    </motion.button>
  );
}

// ─── QuizRunner ───────────────────────────────────────────────────────────────

function QuizRunner({
  questions,
  onFinish,
}: {
  questions: QuizQuestion[];
  onFinish: (score: number, answers: (number[] | null)[]) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [answers, setAnswers] = useState<(number[] | null)[]>(Array(questions.length).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);

  // Refs to avoid stale closures in timer
  const answersRef = useRef(answers);
  const finishedRef = useRef(false);

  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);

  const triggerFinish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    const finalAnswers = answersRef.current;
    let correct = 0;
    questions.forEach((q, i) => {
      const ans = finalAnswers[i];
      if (ans && isCorrectAnswer(ans, q.correct)) correct++;
    });
    onFinish(Math.round((correct / questions.length) * 100), finalAnswers);
  };

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id);
          triggerFinish();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const currentQ = questions[currentIndex];
  const isMultiple = currentQ.type === 'mc_multiple';
  const isAnswered = answers[currentIndex] !== null;

  const toggleOption = (idx: number) => {
    if (isAnswered) return;
    if (isMultiple) {
      setSelected((prev) => prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]);
    } else {
      setSelected([idx]);
    }
  };

  const submitAnswer = () => {
    if (selected.length === 0) return;
    const newAnswers = [...answers];
    newAnswers[currentIndex] = selected;
    setAnswers(newAnswers);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    setSelected([]);
    if (currentIndex + 1 >= questions.length) {
      triggerFinish();
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const getOptionStyle = (idx: number) => {
    if (!isAnswered) {
      return selected.includes(idx)
        ? 'border-mint bg-mint/10 text-charcoal'
        : 'border-gray-100 bg-white text-charcoal hover:border-mint/50 hover:bg-mint/5';
    }
    const isCorrect = currentQ.correct.includes(idx);
    const isSelected = answers[currentIndex]?.includes(idx);
    if (isCorrect) return 'border-green-400 bg-green-50 text-green-700';
    if (isSelected && !isCorrect) return 'border-red-400 bg-red-50 text-red-600';
    return 'border-gray-100 bg-white text-gray-300';
  };

  const timePercent = (timeLeft / 600) * 100;
  const currentCorrect = isAnswered ? isCorrectAnswer(answers[currentIndex]!, currentQ.correct) : false;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between sticky top-0 bg-warm-white/90 backdrop-blur-md py-3 z-10">
        <button
          onClick={triggerFinish}
          className="bg-white p-2 rounded-xl border border-gray-100 text-gray-400 hover:bg-gray-50 transition-colors"
        >
          <X size={20} />
        </button>
        <div className="flex flex-col items-center">
          <span className={`text-lg font-black tabular-nums ${timeLeft < 60 ? 'text-red-500' : 'text-charcoal'}`}>
            {formatTime(timeLeft)}
          </span>
          <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${timePercent > 33 ? 'bg-mint' : 'bg-red-400'}`}
              style={{ width: `${timePercent}%` }}
            />
          </div>
        </div>
        <div className="bg-mint/10 px-3 py-1.5 rounded-xl text-mint font-bold text-sm">
          {currentIndex + 1}/{questions.length}
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1 flex-wrap">
        {questions.map((q, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 min-w-[4px] rounded-full transition-colors ${
              i < currentIndex
                ? answers[i] && isCorrectAnswer(answers[i]!, q.correct)
                  ? 'bg-mint'
                  : 'bg-red-300'
                : i === currentIndex
                ? 'bg-mint/40'
                : 'bg-gray-100'
            }`}
          />
        ))}
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white rounded-2xl p-5 border border-gray-100"
        >
          <span className="text-[10px] font-black text-mint tracking-widest uppercase block mb-3">
            {currentQ.type === 'vocab'
              ? 'Kosakata'
              : currentQ.type === 'mc_multiple'
              ? 'Pilihan Ganda — Lebih dari 1 jawaban'
              : 'Pilihan Ganda'}
          </span>
          <p className="text-base font-semibold text-charcoal leading-relaxed mb-5">
            {currentQ.question}
          </p>
          <div className="flex flex-col gap-3">
            {currentQ.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => toggleOption(idx)}
                className={`w-full p-4 rounded-xl border-2 text-left font-medium text-sm transition-all ${getOptionStyle(idx)}`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-lg border-2 flex-shrink-0 flex items-center justify-center text-xs font-black transition-colors ${
                      isAnswered && currentQ.correct.includes(idx)
                        ? 'border-green-500 bg-green-500 text-white'
                        : selected.includes(idx)
                        ? 'border-mint bg-mint text-white'
                        : 'border-gray-200 text-gray-400'
                    }`}
                  >
                    {isAnswered && currentQ.correct.includes(idx) ? (
                      <Check size={12} />
                    ) : (
                      String.fromCharCode(65 + idx)
                    )}
                  </span>
                  <span>{opt}</span>
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Explanation */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`p-4 rounded-2xl text-sm ${
              currentCorrect
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-orange-50 border border-orange-200 text-orange-800'
            }`}
          >
            <p className="font-bold mb-1">{currentCorrect ? '✓ Benar!' : '✗ Kurang tepat'}</p>
            <p>{currentQ.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Button */}
      {!isAnswered ? (
        <button
          onClick={submitAnswer}
          disabled={selected.length === 0}
          className="w-full py-4 rounded-2xl font-bold text-white soft-gradient shadow-lg shadow-mint/20 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Cek Jawaban
        </button>
      ) : (
        <button
          onClick={nextQuestion}
          className="w-full py-4 rounded-2xl font-bold text-white bg-charcoal flex items-center justify-center gap-2 group hover:opacity-90 transition-opacity"
        >
          {currentIndex + 1 >= questions.length ? 'Lihat Hasil' : 'Soal Berikutnya'}
          <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      )}
    </motion.div>
  );
}

// ─── ResultView ───────────────────────────────────────────────────────────────

function ResultView({
  score,
  questions,
  answers,
  onBack,
  onRetry,
}: {
  score: number;
  questions: QuizQuestion[];
  answers: (number[] | null)[];
  onBack: () => void;
  onRetry: () => void;
}) {
  const passed = score >= 70;
  const correctCount = questions.filter((q, i) => {
    const ans = answers[i];
    return ans && isCorrectAnswer(ans, q.correct);
  }).length;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
      {/* Score Card */}
      <div className={`rounded-3xl p-8 text-center ${passed ? 'soft-gradient' : 'bg-orange-400'}`}>
        <Trophy size={48} className="text-white mx-auto mb-3" />
        <div className="text-6xl font-black text-white mb-1">{score}%</div>
        <div className="text-white/90 font-bold text-lg">
          {passed ? '🎉 Selamat, kamu lulus!' : 'Hampir! Coba lagi ya.'}
        </div>
        <div className="text-white/70 text-sm mt-1">
          {correctCount} dari {questions.length} soal benar
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Benar', value: correctCount, color: 'text-mint' },
          { label: 'Salah', value: questions.length - correctCount, color: 'text-red-400' },
          { label: 'Skor', value: `${score}%`, color: passed ? 'text-mint' : 'text-orange-400' },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl p-4 text-center border border-gray-100">
            <div className={`text-2xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-xs text-gray-400 font-bold mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Review */}
      <div className="flex flex-col gap-3">
        <h3 className="font-bold text-charcoal">Review Jawaban</h3>
        {questions.map((q, i) => {
          const ans = answers[i];
          const correct = ans && isCorrectAnswer(ans, q.correct);
          return (
            <div
              key={q.id}
              className={`p-4 rounded-2xl border ${correct ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}
            >
              <div className="flex items-start gap-2 mb-1">
                <span className={`text-sm font-black flex-shrink-0 ${correct ? 'text-green-600' : 'text-red-500'}`}>
                  {i + 1}. {correct ? '✓' : '✗'}
                </span>
                <p className="text-sm text-charcoal font-medium leading-snug">{q.question}</p>
              </div>
              {!correct && (
                <p className="text-xs text-gray-500 ml-5 mt-1">{q.explanation}</p>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pb-4">
        <button
          onClick={onRetry}
          className="flex-1 py-4 rounded-2xl font-bold border-2 border-mint text-mint flex items-center justify-center gap-2 hover:bg-mint/5 transition-colors"
        >
          <RotateCcw size={18} />
          Ulangi
        </button>
        <button
          onClick={onBack}
          className="flex-1 py-4 rounded-2xl font-bold text-white soft-gradient hover:opacity-90 transition-opacity"
        >
          Sesi Lain
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main ExercisePage ────────────────────────────────────────────────────────

export default function ExercisePage() {
  const [screen, setScreen] = useState<Screen>('list');
  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [finalScore, setFinalScore] = useState(0);
  const [finalAnswers, setFinalAnswers] = useState<(number[] | null)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [, forceRefresh] = useState(0);

  const loadSession = async (sessionId: number) => {
    setIsLoading(true);
    setSelectedSessionId(sessionId);
    setScreen('quiz');

    const session = sessions.find((s) => s.id === sessionId)!;

    let vocabWords: any[] = [];
    try {
      const { data } = await supabase
        .from('vocabulary')
        .select('id, word, meaning_id, example_sentence')
        .eq('level', session.vocabLevel)
        .limit(80);
      if (data && data.length >= 4) vocabWords = data;
    } catch {
      // proceed with grammar only
    }

    const vocabQs = generateVocabQuestions(vocabWords, 8);
    const grammarQs = session.grammarQuestions.map((q) => ({ ...q }));
    const allQs = shuffle([...grammarQs, ...vocabQs]).slice(0, 15);

    setQuestions(allQs);
    setIsLoading(false);
  };

  const handleFinish = (score: number, answers: (number[] | null)[]) => {
    const id = selectedSessionId!;
    localStorage.setItem(`exercise_sesi_${id}_score`, score.toString());
    localStorage.setItem(`exercise_sesi_${id}_completed`, 'true');
    setFinalScore(score);
    setFinalAnswers(answers);
    setScreen('result');
  };

  const handleBack = () => {
    setScreen('list');
    setSelectedSessionId(null);
    forceRefresh((n) => n + 1);
  };

  const handleRetry = () => {
    if (selectedSessionId !== null) loadSession(selectedSessionId);
  };

  // Loading screen
  if (screen === 'quiz' && isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 bg-mint/20 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <PenTool size={32} className="text-mint" />
          </div>
          <p className="text-gray-400 font-medium">Memuat soal...</p>
        </div>
      </div>
    );
  }

  // Quiz screen
  if (screen === 'quiz' && questions.length > 0) {
    return (
      <QuizRunner
        key={`${selectedSessionId}-${Date.now()}`}
        questions={questions}
        onFinish={handleFinish}
      />
    );
  }

  // Result screen
  if (screen === 'result') {
    return (
      <ResultView
        score={finalScore}
        questions={questions}
        answers={finalAnswers}
        onBack={handleBack}
        onRetry={handleRetry}
      />
    );
  }

  // Session List
  const completedCount = sessions.filter(
    (s) => localStorage.getItem(`exercise_sesi_${s.id}_completed`) === 'true'
  ).length;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-charcoal">Latihan PTE</h1>
        <p className="text-gray-400 text-sm mt-1">10 sesi dari A1 hingga C1 — siapkan dirimu!</p>
      </div>

      {/* Overall progress */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-charcoal">Progress Keseluruhan</span>
          <span className="text-sm font-bold text-mint">{completedCount}/10 Sesi</span>
        </div>
        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full soft-gradient rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / 10) * 100}%` }}
          />
        </div>
      </div>

      {/* Session Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            onClick={() => loadSession(session.id)}
          />
        ))}
      </div>
    </motion.div>
  );
}
