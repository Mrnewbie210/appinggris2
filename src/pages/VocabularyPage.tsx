import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Loader, AlertCircle, Play, BookOpen, PenTool, Lock, CheckCircle2, Flame, Sparkles, Target, LogOut, Database, PlusCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { supabase } from '../lib/supabase';
import { advanceProgress } from '../lib/progress';
import { getActiveUser } from '../lib/mockAuth';
import { getEnglishRank } from '../lib/rank';
import confetti from 'canvas-confetti';
import type { VocabWord } from '../types';

import FlashcardSession from '../components/vocabulary/FlashcardSession';
import LearnMode from '../components/vocabulary/LearnMode';
import QuizMode from '../components/vocabulary/QuizMode';
import { getVocabulary, saveVocabularyBatch } from '../lib/offlineStorage';

let globalVocabCache: VocabWord[] | null = null;

const BATCH_SIZE = 50;

type VocabMode = 'dashboard' | 'flashcard' | 'learn' | 'quiz';

interface DayBatch {
  index: number;
  name: string;
  status: 'locked' | 'in-progress' | 'completed';
  words: VocabWord[];
}

export default function VocabularyPage() {
  // No router needed

  const [mode, setMode] = useState<VocabMode>('dashboard');
  const [allWords, setAllWords] = useState<VocabWord[]>([]);
  const [batches, setBatches] = useState<DayBatch[]>([]);
  const [selectedBatchIndex, setSelectedBatchIndex] = useState<number>(0);

  const [stats, setStats] = useState({ xp: 0, streak: 0, mastered: 0 });
  const [chartData, setChartData] = useState<{ day: string; count: number }[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // Trigger celebration unconditionally upon first milestone detection
  useEffect(() => {
    if (stats.xp > 0 || stats.mastered > 0) {
      const rank = getEnglishRank(stats.xp);
      const milestoneGuard = `celebrated_rank_${rank.name}`;
      if (!localStorage.getItem(milestoneGuard)) {
        localStorage.setItem(milestoneGuard, 'true');
        if (rank.name !== 'Beginner') {
          confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#38BDF8', '#818CF8', '#FBBF24', '#F472B6']
          });
        }
      }
    }
  }, [stats.xp, stats.mastered]);

  useEffect(() => {
    async function fetchWords() {
      try {
        setIsLoading(true);
        setError(null);

        let sorted: VocabWord[] = [];

        if (globalVocabCache) {
          sorted = globalVocabCache;
          setAllWords(sorted);
        } else {
          // 1. Try to read from IndexedDB
          let allVocabData = await getVocabulary();
          
          // 2. Fallback to Supabase if IndexedDB is empty
          if (!allVocabData || allVocabData.length === 0) {
            console.log("IndexedDB empty. Fetching from Supabase...");
            let from = 0;
            const pageSize = 1000;
            while (true) {
              const { data: pageData, error: fetchError } = await supabase
                .from('vocabulary')
                .select('*')
                .order('created_at', { ascending: true })
                .range(from, from + pageSize - 1);
              if (fetchError) throw fetchError;
              if (!pageData || pageData.length === 0) break;
              allVocabData = [...allVocabData, ...pageData];
              if (pageData.length < pageSize) break;
              from += pageSize;
            }
            if (allVocabData.length > 0) {
              await saveVocabularyBatch(allVocabData);
            }
          }

          const orderConfig: Record<string, number> = { A1: 1, A2: 2, B1: 3, B2: 4, C1: 5 };
          sorted = allVocabData.sort((a, b) => {
            if (orderConfig[a.level] !== orderConfig[b.level]) {
              return (orderConfig[a.level] || 99) - (orderConfig[b.level] || 99);
            }
            return a.word.localeCompare(b.word);
          });
          
          globalVocabCache = sorted;
          setAllWords(sorted);
        }

        const { data: userData, error: userError } = await getActiveUser();
        if (userError || !userData?.user) {
          console.error("Dashboard auth check failed. Redirecting to landing page.");
          window.location.reload();
          return;
        }

        let srMap = new Map();
        if (userData?.user) {
          // Fetch gamification progress row safely with maybeSingle
          const { data: progData, error: progError } = await supabase
            .from('user_progress')
            .select('xp, streak_days')
            .eq('user_id', userData.user.id)
            .maybeSingle();

          if (progError) {
            console.error("Progress fetch error:", progError);
          }

          const localXP = parseInt(localStorage.getItem(`xp_${userData.user.id}`) || '0', 10);
          const localStreak = parseInt(localStorage.getItem(`streak_${userData.user.id}`) || '0', 10);

          if (progData) {
            setStats(s => ({ ...s, xp: progData?.xp ?? localXP, streak: progData?.streak_days ?? localStreak }));
          } else {
            // Auto-initialize state to localStorage or 0 if record missing in database
            setStats(s => ({ ...s, xp: localXP, streak: localStreak }));
            // Attempt to seed row silently so future updates don't fail
            supabase.from('user_progress').insert({ user_id: userData.user.id, display_name: 'Student', xp: 0, streak_days: 0 }).then();
          }

          const { data: srData } = await supabase.from('spaced_repetition').select('word_id, created_at').eq('user_id', userData.user.id);
          if (srData) {
            srData.forEach(r => srMap.set(r.word_id, true));

            // Setup 7-day activity chart based on spaced_repetition entries
            const last7Days = Array.from({ length: 7 }).map((_, i) => {
              const d = new Date();
              d.setDate(d.getDate() - (6 - i));
              return d;
            });

            const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
            const counts = last7Days.reduce((acc, d) => ({ ...acc, [d.toISOString().split('T')[0]]: 0 }), {} as Record<string, number>);

            srData.forEach(r => {
              const d = r.created_at.split('T')[0];
              if (counts[d] !== undefined) counts[d]++;
            });

            setChartData(last7Days.map(d => ({
              day: dayNames[d.getDay()],
              count: counts[d.toISOString().split('T')[0]]
            })));
          }
        }

        setStats(s => ({ ...s, mastered: srMap.size }));

        const totalBatches = Math.ceil(sorted.length / BATCH_SIZE);
        const newBatches: DayBatch[] = [];

        for (let i = 0; i < totalBatches; i++) {
          const batchWords = sorted.slice(i * BATCH_SIZE, (i + 1) * BATCH_SIZE);
          const studiedCount = batchWords.filter(w => srMap.has(w.id)).length;

          let status: 'locked' | 'in-progress' | 'completed' = 'locked';
          if (studiedCount === batchWords.length && batchWords.length > 0) {
            status = 'completed';
          } else {
            status = 'in-progress';
          }

          newBatches.push({ name: `Hari ${i + 1}`, status, words: batchWords, index: i });
        }

        setBatches(newBatches);
        const lastStudied = [...newBatches].reverse().find(b => b.status === 'completed');
        if (lastStudied && lastStudied.index < newBatches.length - 1) {
          setSelectedBatchIndex(lastStudied.index + 1);
        } else {
          setSelectedBatchIndex(0);
        }

      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Gagal memuat data kosakata.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchWords();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <Loader className="animate-spin text-mint" size={32} />
        <p className="text-gray-500 text-sm font-semibold">Memuat data Dashboard...</p>
      </div>
    );
  }

  if (error || allWords.length === 0 || batches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4 text-center px-6">
        <AlertCircle className="text-peach" size={48} />
        <p className="text-gray-600 font-bold">{error || 'Tidak ada data. Silakan Seed Database di menu Progres.'}</p>
        <button onClick={() => window.location.reload()} className="mt-2 text-sm text-mint underline font-bold">Coba Lagi</button>
      </div>
    );
  }

  const selectedBatch = batches[selectedBatchIndex];


  const handleExitMode = () => setMode('dashboard');

  const handleSessionComplete = async (type: 'flashcard' | 'learn' | 'quiz', score?: number, total?: number) => {
    const isArchive = selectedBatch.status === 'completed';
    let xpAward = 0;

    if (type === 'flashcard') xpAward = 10;
    else if (type === 'learn') xpAward = 20;
    else if (type === 'quiz') {
      // XP is now score-based: 10 XP per correct answer
      xpAward = (score || 0) * 10;
    }

    // 1. Update XP and Streak in Supabase & Local Progress
    if (xpAward > 0) {
      const res = await advanceProgress(xpAward, isArchive);
      if (res) {
        setStats(s => ({ ...s, xp: res.newXp, streak: res.newStreak }));
      }
    }

    // 2. Persist to Study Calendar (localStorage)
    const todayStr = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Tokyo' });
    try {
      const calendar = JSON.parse(localStorage.getItem('study_calendar') || '{}');
      calendar[todayStr] = true;
      localStorage.setItem('study_calendar', JSON.stringify(calendar));

      // 3. Persist to Daily Word Count (localStorage)
      const dailyCount = JSON.parse(localStorage.getItem('daily_word_count') || '{}');
      const sessionCount = type === 'quiz' ? (total || 0) : selectedBatch.words.length;
      dailyCount[todayStr] = (dailyCount[todayStr] || 0) + sessionCount;
      localStorage.setItem('daily_word_count', JSON.stringify(dailyCount));
    } catch (e) {
      console.error("Local storage sync error:", e);
    }

    // For non-quiz modes, we exit immediately. 
    // Quiz mode handles its own 'Back to Dashboard' via the summary screen.
    if (type !== 'quiz') {
      handleExitMode();
    }
  };

  if (mode === 'flashcard') {
    return <FlashcardSession initialWords={selectedBatch.words} onComplete={() => handleSessionComplete('flashcard')} onExit={handleExitMode} />;
  }

  if (mode === 'learn') {
    return <LearnMode words={selectedBatch.words} onComplete={() => handleSessionComplete('learn')} onExit={handleExitMode} />;
  }

  if (mode === 'quiz') {
    return <QuizMode words={selectedBatch.words} onComplete={(score) => handleSessionComplete('quiz', score, selectedBatch.words.length)} onExit={handleExitMode} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-8 pb-10"
    >

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="flex flex-col items-center justify-center py-4 border-2 border-orange-100 bg-orange-50/50">
          <Flame size={28} className="text-orange-500 mb-1" />
          <span className="font-black text-xl text-charcoal">{stats.streak} <span className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-0.5">Hari</span></span>
        </Card>

        <Card className="flex flex-col items-center justify-center py-4 border-2 border-yellow-100 bg-yellow-50/50 relative">
          <div className={`absolute -top-3 px-2 sm:px-3 py-1 rounded-full border text-[9px] sm:text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm transform transition-all ${getEnglishRank(stats.xp).color}`}>
            <span className="text-sm sm:text-base leading-none">{getEnglishRank(stats.xp).icon}</span>
            <span className="hidden sm:inline sm:pt-0.5">{getEnglishRank(stats.xp).name}</span>
          </div>
          <Sparkles size={28} className="text-yellow-500 mb-1" />
          <span className="font-black text-xl text-charcoal">{stats.xp} <span className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-0.5">XP</span></span>
        </Card>

        <Card className="flex flex-col items-center justify-center py-4 border-2 border-blue-100 bg-blue-50/50">
          <Target size={28} className="text-blue-500 mb-1" />
          <span className="font-black text-xl text-charcoal">
            {allWords.length > 0 ? Math.floor((stats.mastered / allWords.length) * 100) : 0}<span className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-0.5">%</span>
          </span>
        </Card>
      </div>

      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Belajar: {selectedBatch.name}</h1>
          <p className="text-gray-500 text-sm font-medium">Lanjutkan progres atau ulangi materi lama dari target ini.</p>
        </div>
      </header>


      <div className="flex flex-col gap-4 relative">
        <div className="absolute -top-3 left-4 bg-mint text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest z-10">
          Target Aktif: {selectedBatch.name}
        </div>
        <Card className="p-6 border-2 border-mint/20 flex flex-col gap-6 pt-8">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={() => setMode('flashcard')}
              className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 border-gray-100 hover:border-mint hover:bg-mint/5 transition-all text-charcoal"
            >
              <div className="w-12 h-12 bg-mint/10 text-mint rounded-full flex items-center justify-center shadow-inner">
                <Play fill="currentColor" size={24} />
              </div>
              <span className="font-bold text-xs uppercase tracking-wider">Flashcard</span>
            </button>
            <button
              onClick={() => setMode('learn')}
              className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 border-gray-100 hover:border-mint hover:bg-mint/5 transition-all text-charcoal"
            >
              <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center shadow-inner">
                <BookOpen fill="currentColor" size={24} />
              </div>
              <span className="font-bold text-xs uppercase tracking-wider">Learn</span>
            </button>
            <button
              onClick={() => setMode('quiz')}
              className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl border-2 border-gray-100 hover:border-mint hover:bg-mint/5 transition-all text-charcoal"
            >
              <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center shadow-inner">
                <PenTool fill="currentColor" size={24} />
              </div>
              <span className="font-bold text-xs uppercase tracking-wider">Quiz</span>
            </button>
          </div>

          {selectedBatch.status === 'completed' && (
            <div className="flex items-center gap-2 text-xs font-bold text-mint bg-mint/10 p-3 rounded-xl justify-center">
              <CheckCircle2 size={16} /> Mode Arsip Aktif (50% XP + Tanpa Streak)
            </div>
          )}
        </Card>
      </div>

      <Card className="p-5 border-2 border-gray-100 shadow-sm">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Aktivitas 7 Hari Terakhir</h2>
        <div className="flex justify-between items-end h-32 gap-2 mt-2">
          {chartData.map((d, i) => {
            const maxCount = Math.max(...chartData.map(c => c.count), 10);
            const heightPercentage = Math.max((d.count / maxCount) * 100, 5);
            const isToday = i === 6;
            return (
              <div key={i} className="flex flex-col items-center flex-1 gap-2">
                <div className="w-full bg-gray-50 rounded-lg flex items-end justify-center h-full overflow-hidden relative">
                  <div
                    className={`w-full rounded-b-lg transition-all duration-1000 ${isToday ? 'bg-mint' : 'bg-mint/40 opacity-70'} ${d.count === 0 ? 'bg-gray-100 opacity-50' : ''}`}
                    style={{ height: `${heightPercentage}%` }}
                  />
                  {d.count > 0 && <span className="absolute bottom-1 text-[9px] font-bold text-white z-10">{d.count}</span>}
                </div>
                <span className={`text-[10px] font-black uppercase ${isToday ? 'text-charcoal' : 'text-gray-400'}`}>{d.day}</span>
              </div>
            );
          })}
        </div>
      </Card>

      <div>
        <h2 className="text-xl font-bold mb-4 flex items-center justify-between">
          <span>Target Harian</span>
          <span className="text-xs text-mint bg-mint/10 px-2 py-1 rounded font-black">{batches.filter(b => b.status === 'completed').length} Selesai</span>
        </h2>
        <div className="flex flex-col gap-2">
          {batches.map((batch) => {
            const isSelected = selectedBatchIndex === batch.index;
            return (
              <div
                key={batch.index}
                onClick={() => {
                  setSelectedBatchIndex(batch.index);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`p-4 flex items-center justify-between transition-all cursor-pointer rounded-xl border-2 active:scale-[0.99] ${isSelected
                    ? 'border-mint shadow-md'
                    : 'border-gray-100 hover:border-gray-200 bg-white'
                  }`}
                style={isSelected ? { backgroundColor: '#A8D5BA' } : {}}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="font-bold text-charcoal flex items-center gap-2 min-w-[80px]">
                    Day {batch.index + 1}
                    {batch.status === 'completed' && <CheckCircle2 size={16} className="text-green-600" />}
                  </div>

                  <div className="text-xs text-gray-500 font-bold border-l border-gray-200 pl-4">
                    {batch.words.length} Kata • {batch.words[0]?.level || 'A1'}
                  </div>
                </div>

                <div className="flex items-center justify-end min-w-[70px]">
                  {batch.status === 'completed' ? (
                    <span className="text-[10px] font-black uppercase text-green-700">Selesai</span>
                  ) : (
                    <span className="text-[10px] font-black uppercase text-gray-400">Progres</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
