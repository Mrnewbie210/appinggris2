import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Check, Flame, Sparkles, Target, Loader } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { getEnglishRank } from '../lib/rank';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Badge } from '../components/ui/Badge';
import { supabase } from '../lib/supabase';
import { getActiveUser } from '../lib/mockAuth';
import type { Task } from '../types';

// Konstanta target belajar
const TARGET_WORDS = 5000;
const TOTAL_STUDY_DAYS = 180;

const DEFAULT_TASKS: Task[] = [
  { id: 'vocabulary', title: 'Vocabulary', status: 'pending' },
  { id: 'grammar', title: 'Grammar', status: 'pending' },
  { id: 'listening', title: 'Listening', status: 'pending' },
  { id: 'reading', title: 'Reading', status: 'pending' },
];

export default function HomePage({ onNavigate, key }: { onNavigate?: (page: any) => void, key?: React.Key }) {
  const [tasks, setTasks] = useState<Task[]>(DEFAULT_TASKS);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [masteredWords, setMasteredWords] = useState(0);
  const [userName, setUserName] = useState('Hari');
  const [todayDate, setTodayDate] = useState('');
  const [masterPlanProgress, setMasterPlanProgress] = useState(0);
  const [studyStartDateStr, setStudyStartDateStr] = useState('');
  const [studyEndDateStr, setStudyEndDateStr] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Timeout maksimal 3 detik agar tidak stuck loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Format tanggal hari ini pakai timezone Tokyo
    const now = new Date();
    const dateStr = now.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Tokyo'
    });
    setTodayDate(dateStr);

    // Load tasks dari localStorage
    const savedTasks = localStorage.getItem('daily_tasks');
    const todayKey = now.toLocaleDateString('en-CA', { timeZone: 'Asia/Tokyo' });
    const savedTaskDate = localStorage.getItem('daily_tasks_date');

    if (savedTasks && savedTaskDate === todayKey) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Reset tasks setiap hari baru
      localStorage.setItem('daily_tasks', JSON.stringify(DEFAULT_TASKS));
      localStorage.setItem('daily_tasks_date', todayKey);
      setTasks(DEFAULT_TASKS);
    }

    // Fetch data dari Supabase
    async function fetchUserData() {
      try {
        const { data: authData, error: authError } = await supabase.auth.getUser();
        if (authError || !authData?.user) throw new Error('Auth failed or no user');

        const userId = authData.user.id;
        setUserName(authData.user.email?.split('@')[0] || 'Hari');

        // Kalkulasi Progres English Every Day secara Individual
        const createdAt = new Date(authData.user.created_at);
        const endDate = new Date(createdAt);
        endDate.setDate(endDate.getDate() + TOTAL_STUDY_DAYS);
        
        const formatDate = (d: Date) => d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
        setStudyStartDateStr(formatDate(createdAt));
        setStudyEndDateStr(formatDate(endDate));

        const today = new Date();
        const daysPassed = Math.ceil((today.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
        const progress = Math.max(0, Math.min(Math.round((daysPassed / TOTAL_STUDY_DAYS) * 100), 100));
        setMasterPlanProgress(progress);

        // Fetch XP dan streak dari user_progress
        const { data: progressData } = await supabase
          .from('user_progress')
          .select('xp, streak_days, display_name, words_mastered')
          .eq('user_id', userId)
          .maybeSingle();

        if (progressData) {
          setXp(progressData.xp || 0);
          setStreak(progressData.streak_days || 0);
          setMasteredWords(progressData.words_mastered || 0);
          if (progressData.display_name) setUserName(progressData.display_name);
        }

        // Fallback: hitung mastered dari spaced_repetition
        const { count } = await supabase
          .from('spaced_repetition')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId)
          .eq('status', 'mastered');

        if (count && count > 0) setMasteredWords(count);

      } catch (err) {
        console.warn('HomePage data fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserData();
  }, []);

  const toggleTask = (id: string) => {
    setTasks(prev => {
      const updated = prev.map(t =>
        t.id === id
          ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' }
          : t
      ) as Task[];
      localStorage.setItem('daily_tasks', JSON.stringify(updated));
      return updated;
    });
  };

  const taskSubtitle = (title: string) => {
    if (title === 'Vocabulary') return `Target: 50 kata baru (${masteredWords}/5000 Mastered)`;
    if (title === 'Grammar') return 'Tonton 1 video grammar hari ini';
    if (title === 'Listening') return 'Dengarkan podcast Slow English';
    if (title === 'Reading') return 'Baca artikel BBC Learning English';
    return 'Target harian';
  };

  const masteredPercent = Math.min(Math.round((masteredWords / TARGET_WORDS) * 100), 100);
  const rank = getEnglishRank(xp);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
         <Loader className="w-8 h-8 text-mint animate-spin" />
         <p className="text-gray-400 font-bold animate-pulse">Memuat dashboard...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-8 pb-10"
    >
      {/* Header */}
      <header className="mb-4 md:hidden">
        <h1 className="text-2xl font-bold tracking-tight">Halo, {userName}! 👋</h1>
        <p className="text-secondary text-sm">{todayDate} • Semangat belajarnya!</p>
      </header>

      <section className="flex flex-col gap-6">
        {/* English Every Day Progress */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">Progres English Every Day (6 Bulan)</h2>
            <span className="text-secondary font-semibold text-sm opacity-60">
              {masterPlanProgress}% Selesai
            </span>
          </div>
          <ProgressBar progress={masterPlanProgress} />
          <p className="text-xs text-gray-400 mt-2">
            {studyStartDateStr} → {studyEndDateStr} • Target PTE Academic skor 30
          </p>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Streak */}
          <Card className="flex flex-col items-center justify-center py-4 border-2 border-orange-100 bg-orange-50/50">
            <Flame size={28} className="text-orange-500 mb-1" />
            <span className="font-black text-xl text-charcoal">
              {streak}
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-0.5">Hari</span>
            </span>
            <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">Streak</span>
          </Card>

          {/* XP */}
          <Card className="flex flex-col items-center justify-center py-4 border-2 border-yellow-100 bg-yellow-50/50 relative">
            <div className={`absolute -top-3 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-sm ${rank.color}`}>
              <span className="text-sm leading-none">{rank.icon}</span>
              <span>{rank.name}</span>
            </div>
            <Sparkles size={28} className="text-yellow-500 mb-1" />
            <span className="font-black text-xl text-charcoal">
              {xp}
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-0.5">XP</span>
            </span>
            <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">Level</span>
          </Card>

          {/* Kata Mastered */}
          <Card className="flex flex-col items-center justify-center py-4 border-2 border-blue-100 bg-blue-50/50">
            <Target size={28} className="text-blue-500 mb-1" />
            <span className="font-black text-xl text-charcoal">
              {masteredPercent}
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-0.5">%</span>
            </span>
            <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mt-0.5">
              {masteredWords}/5000 Kata
            </span>
          </Card>
        </div>

        {/* Daily Tasks */}
        <div>
          <h2 className="font-bold text-lg mb-4">Tugas Hari Ini</h2>
          <div className="flex flex-col gap-3">
            {tasks.map((task) => (
              <Card
                key={task.id}
                className="flex items-center justify-between p-4 bg-[#FAFAFA] border-none shadow-none"
              >
                <div className="flex items-center gap-4">
                  <div
                    onClick={() => toggleTask(task.id)}
                    className={`w-8 h-8 md:w-6 md:h-6 rounded-md border-2 border-mint cursor-pointer transition-colors flex items-center justify-center shrink-0 ${
                      task.status === 'completed' ? 'bg-mint' : ''
                    }`}
                  >
                    {task.status === 'completed' && (
                      <Check size={14} className="text-white" strokeWidth={4} />
                    )}
                  </div>
                  <div>
                    <h3 className={`font-bold ${task.status === 'completed' ? 'text-gray-400' : 'text-charcoal'}`}>
                      {task.title}
                    </h3>
                    <p className="text-xs text-secondary opacity-60">{taskSubtitle(task.title)}</p>
                  </div>
                </div>

                {task.status === 'completed' ? (
                  <Badge color="mint">SELESAI</Badge>
                ) : (
                  <button
                    onClick={() => {
                      if (task.title === 'Vocabulary') onNavigate?.('vocabulary');
                      else if (task.title === 'Grammar') onNavigate?.('grammar');
                      else if (task.title === 'Listening') window.open('https://www.youtube.com/@slowenglish', '_blank');
                      else if (task.title === 'Reading') window.open('https://www.bbc.co.uk/learningenglish', '_blank');
                      else toggleTask(task.id);
                    }}
                    className="bg-warm-white border border-[#DDD] min-h-[44px] px-5 rounded-full text-xs font-bold hover:bg-gray-50 transition-colors flex items-center justify-center"
                  >
                    Mulai
                  </button>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
