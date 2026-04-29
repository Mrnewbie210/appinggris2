import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Flame, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Target,
  BarChart3,
  Award,
  Lock
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Card } from '../components/ui/Card';

const TARGET_WORDS = 5000;

export default function ProgressPage() {
  const [masteredCount, setMasteredCount] = useState(0);
  const [grammarCount, setGrammarCount] = useState(0);
  const [studyCalendar, setStudyCalendar] = useState<Record<string, boolean>>({});
  const [dailyWordCount, setDailyWordCount] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all necessary data
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // 1. Total Mastered Words (Supabase)
        const { count, error: srError } = await supabase
          .from('spaced_repetition')
          .select('*', { count: 'exact', head: true });
        if (!srError && count !== null) setMasteredCount(count);

        // 2. Grammar Lessons Completed (LocalStorage)
        const rawGrammar = localStorage.getItem('grammar_completed');
        if (rawGrammar) {
          const parsed = JSON.parse(rawGrammar);
          setGrammarCount(Array.isArray(parsed) ? parsed.length : Object.keys(parsed).length);
        }

        // 3. Study Calendar (LocalStorage)
        const rawCalendar = localStorage.getItem('study_calendar');
        if (rawCalendar) setStudyCalendar(JSON.parse(rawCalendar));

        // 4. Daily Word Count (LocalStorage)
        const rawDaily = localStorage.getItem('daily_word_count');
        if (rawDaily) setDailyWordCount(JSON.parse(rawDaily));

      } catch (err) {
        console.error("Progress fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Compute Streak
  const streak = useMemo(() => {
    let currentStreak = 0;
    const today = new Date();
    
    for (let i = 0; i < 365; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      
      if (studyCalendar[dateStr]) {
        currentStreak++;
      } else {
        // If it's today and not yet recorded, don't break yet, check yesterday
        if (i === 0) continue;
        break;
      }
    }
    return currentStreak;
  }, [studyCalendar]);

  // Compute Monthly Stats
  const thisMonthLearningDays = useMemo(() => {
    const now = new Date();
    const monthPrefix = now.toISOString().slice(0, 7); // YYYY-MM
    return Object.keys(studyCalendar).filter(d => d.startsWith(monthPrefix)).length;
  }, [studyCalendar]);

  // Calendar Helpers
  const { calendarDays, monthYearLabel } = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    
    const label = now.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    // Offset for Monday start (0=Mon, 6=Sun)
    let startOffset = firstDay.getDay() - 1;
    if (startOffset < 0) startOffset = 6;
    
    const days = [];
    const totalDays = lastDay.getDate();
    const todayStr = new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Tokyo' });

    // Push preceding offset
    for (let i = 0; i < startOffset; i++) days.push(null);

    // Push actual days
    for (let i = 1; i <= totalDays; i++) {
      const d = new Date(year, month, i);
      const dateStr = d.toLocaleDateString('en-CA', { timeZone: 'Asia/Tokyo' });
      let status: 'future' | 'learned' | 'skipped' = 'future';
      
      if (dateStr <= todayStr) {
        status = studyCalendar[dateStr] ? 'learned' : 'skipped';
      }
      
      days.push({ day: i, status, isToday: dateStr === todayStr });
    }

    return { calendarDays: days, monthYearLabel: label };
  }, [studyCalendar]);

  // Graph Data (Last 7 Days)
  const chartData = useMemo(() => {
    const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
    const result = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      result.push({
        label: days[d.getDay()],
        count: dailyWordCount[dateStr] || 0,
        isToday: i === 0
      });
    }
    return result;
  }, [dailyWordCount]);

  // Badge Logic
  const badges = [
    { id: '1', title: 'Pemula', icon: '🌱', desc: 'Sudah mulai belajar', unlocked: masteredCount > 0 || streak > 0 },
    { id: '2', title: '7 Hari Streak', icon: '🔥', desc: 'Konsisten 1 minggu', unlocked: streak >= 7 },
    { id: '3', title: '100 Kata', icon: '📚', desc: 'Hafal 100 kata awal', unlocked: masteredCount >= 100 },
    { id: '4', title: '500 Kata', icon: '📚', desc: 'Langka besar 500 kata', unlocked: masteredCount >= 500 },
    { id: '5', title: 'Grammar Bab 1', icon: '🎓', desc: 'Selesaikan BAB 1', unlocked: grammarCount >= 7 },
    { id: '6', title: 'Setengah Jalan', icon: '✈️', desc: 'Hafal 2500 kata', unlocked: masteredCount >= 2500 },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 w-full animate-pulse pb-24">
        <div className="h-16 w-64 bg-gray-200 rounded-xl" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="h-32 bg-gray-200 rounded-2xl" />
          <div className="h-32 bg-gray-200 rounded-2xl" />
          <div className="h-32 bg-gray-200 rounded-2xl" />
          <div className="h-32 bg-gray-200 rounded-2xl" />
        </div>
        <div className="h-48 bg-gray-200 rounded-2xl" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6 pb-24"
    >
      <header>
        <h1 className="text-3xl font-black text-charcoal">Laporan Progres</h1>
        <p className="text-gray-500 font-medium">Dashboard pencapaian dan konsistensi belajarmu.</p>
      </header>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Mastered', value: masteredCount, icon: <BookOpen />, color: 'bg-mint/10 text-mint' },
          { label: 'Streak', value: `${streak} Hari`, icon: <Flame />, color: 'bg-orange-50 text-orange-500' },
          { label: 'Grammar', value: `${grammarCount} Modul`, icon: <Trophy />, color: 'bg-yellow-50 text-yellow-600' },
          { label: 'Bulan Ini', value: `${thisMonthLearningDays} Hari`, icon: <Target />, color: 'bg-blue-50 text-blue-500' },
        ].map((stat, i) => (
          <Card key={i} className="flex flex-col items-center justify-center py-6 text-center gap-2">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1 ${stat.color}`}>
              {stat.icon}
            </div>
            <span className="text-2xl font-black text-charcoal">{stat.value}</span>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</span>
          </Card>
        ))}
      </div>

      {/* Main Stats Card with Progress Bar */}
      <Card className="flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="text-lg font-bold">Target 5,000 Kata</h3>
            <p className="text-xs text-gray-500 font-medium">Langkah kakimu menuju kosa kata level dewa.</p>
          </div>
          <span className="text-xl font-black text-mint">{Math.round((masteredCount / TARGET_WORDS) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden border border-gray-100 shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(masteredCount / TARGET_WORDS) * 100}%` }}
            className="h-full bg-mint rounded-full shadow-lg shadow-mint/20"
          />
        </div>
        <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
          <span>{masteredCount} Kata Telah Dihafal</span>
          <span>Goal: 5000</span>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar Section */}
        <Card className="flex flex-col gap-6">
          <div className="flex justify-between items-center px-1">
            <h3 className="font-bold flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-mint/10 text-mint flex items-center justify-center"><BarChart3 size={18} /></span>
              {monthYearLabel}
            </h3>
            <div className="flex gap-2 text-gray-400">
               <ChevronLeft size={20} className="opacity-30 cursor-not-allowed" />
               <ChevronRight size={20} className="opacity-30 cursor-not-allowed" />
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {['S', 'S', 'R', 'K', 'J', 'S', 'M'].map(d => (
              <div key={d} className="text-center text-[10px] font-black text-gray-300 py-1">{d}</div>
            ))}
            {calendarDays.map((d, i) => {
              if (!d) return <div key={`empty-${i}`} />;
              
              const colors = {
                future: 'bg-gray-50 text-gray-300',
                learned: 'bg-mint text-white shadow-lg shadow-mint/20',
                skipped: 'bg-pink-50 text-pink-300 border border-pink-100'
              };

              return (
                <div 
                  key={i} 
                  className={`aspect-square rounded-lg flex items-center justify-center text-[11px] font-black transition-all ${colors[d.status]} ${d.isToday ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}`}
                >
                  {d.day}
                </div>
              );
            })}
          </div>

          <div className="flex gap-4 justify-center pt-2">
            {[
              { label: 'Belajar', color: 'bg-mint' },
              { label: 'Skip', color: 'bg-pink-300' },
              { label: 'Rencana', color: 'bg-gray-100' }
            ].map(l => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-full ${l.color}`} />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{l.label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Weekly Graph Section */}
        <Card className="flex flex-col gap-6">
          <h3 className="font-bold flex items-center gap-2 px-1">
             <span className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center"><BarChart3 size={18} /></span>
             Hafalan Minggu Ini
          </h3>

          <div className="flex items-end justify-between h-48 gap-3 mt-4">
             {chartData.map((d, i) => {
               const max = Math.max(...chartData.map(cd => cd.count), 50);
               const height = (d.count / max) * 100;
               return (
                 <div key={i} className="flex-1 flex flex-col items-center gap-3 h-full justify-end">
                   <div className="w-full relative flex flex-col items-center h-full justify-end">
                      {d.count > 0 && (
                        <span className="absolute -top-6 text-[10px] font-black text-charcoal">{d.count}</span>
                      )}
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        className={`w-full rounded-t-xl transition-colors ${d.isToday ? 'bg-mint' : 'bg-mint/40 opacity-50'} ${d.count === 0 ? 'bg-gray-100 h-1' : ''}`}
                      />
                   </div>
                   <span className={`text-[10px] font-black uppercase tracking-widest ${d.isToday ? 'text-charcoal' : 'text-gray-400'}`}>
                     {d.label}
                   </span>
                 </div>
               );
             })}
          </div>
          <p className="text-[10px] font-bold text-gray-400 text-center uppercase tracking-widest">Jumlah kata dipelajari dalam 7 hari terakhir</p>
        </Card>
      </div>

      {/* Badges / Achievements */}
      <section>
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-xl font-bold flex items-center gap-2 text-charcoal">
            <span className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center"><Award size={18} /></span>
            Koleksi Badge
          </h3>
          <span className="text-xs font-bold text-gray-400">{badges.filter(b => b.unlocked).length} / {badges.length} Dibuka</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {badges.map((badge) => (
            <Card 
              key={badge.id} 
              className={`flex flex-col items-center text-center p-6 transition-all ${badge.unlocked ? 'bg-white border-mint/20' : 'bg-gray-50/50 opacity-60 grayscale'}`}
            >
              <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center text-3xl mb-4 relative ${badge.unlocked ? 'bg-mint/10' : 'bg-gray-200/50'}`}>
                {badge.icon}
                {!badge.unlocked && (
                  <div className="absolute -top-1 -right-1 bg-charcoal text-white w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                    <Lock size={12} />
                  </div>
                )}
                {badge.unlocked && (
                  <div className="absolute -bottom-1 -right-1 bg-mint text-white w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                    <CheckCircle2 size={12} strokeWidth={4} />
                  </div>
                )}
              </div>
              <h4 className="font-bold text-sm text-charcoal">{badge.title}</h4>
              <p className="text-[10px] text-gray-500 font-medium leading-tight mt-1">{badge.desc}</p>
            </Card>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
