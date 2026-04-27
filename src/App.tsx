import React, { useState, useEffect, useMemo } from 'react';
import { 
  Home as HomeIcon, 
  BookOpen, 
  Video, 
  PenTool, 
  BarChart2, 
  User, 
  Calendar, 
  CheckCircle2, 
  Flame,
  Trophy,
  Play,
  RotateCcw,
  Search,
  Check,
  CreditCard,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from './lib/supabase';
import { advanceProgress } from './lib/progress';
import { getEnglishRank } from './lib/rank';
import { grammarCurriculum } from './lib/grammarData';
import type { VocabWord } from './types';
import VocabularyPage from './pages/VocabularyPage';
import GrammarPage from './pages/GrammarPage';
import ProgressPage from './pages/ProgressPage';
import HomePage from './pages/HomePage';
import ExercisePage from './pages/ExercisePage';

// --- Types ---
type Page = 'home' | 'vocabulary' | 'grammar' | 'exercise' | 'progress';


// --- Components ---

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full bg-warm-white h-6 rounded-xl overflow-hidden relative border border-[#F0F0F0]">
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      className="h-full soft-gradient rounded-xl"
    />
  </div>
);

const Badge = ({ children, color = "mint" }: { children: React.ReactNode, color?: string }) => {
  const colors: Record<string, string> = {
    mint: "bg-mint text-white",
    peach: "bg-peach text-charcoal",
    sage: "bg-sage text-charcoal",
    white: "bg-white text-charcoal border border-[#DDD]",
    shadow: "bg-black/10 text-charcoal",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[11px] font-bold inline-block ${colors[color] || colors.mint}`}>
      {children}
    </span>
  );
};


const Sidebar = ({ currentPage, setCurrentPage }: { currentPage: Page, setCurrentPage: (p: Page) => void }) => (
  <nav className="hidden lg:flex w-64 bg-white border-r border-[#EDEDED] p-10 flex-col gap-10 h-screen sticky top-0">
    <div className="logo flex items-center gap-3 font-extrabold text-xl">
      <span className="bg-mint text-white w-8 h-8 grid place-items-center rounded-lg">E</span>
      EM Plan
    </div>
    <div className="flex flex-col gap-3">
      {[
        { id: 'home', label: 'Beranda', icon: <HomeIcon size={18} /> },
        { id: 'vocabulary', label: 'Kosakata', icon: <BookOpen size={18} /> },
        { id: 'grammar', label: 'Tata Bahasa', icon: <Video size={18} /> },
        { id: 'exercise', label: 'Latihan', icon: <PenTool size={18} /> },
        { id: 'progress', label: 'Progres', icon: <BarChart2 size={18} /> },
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => setCurrentPage(item.id as Page)}
          className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all ${currentPage === item.id ? 'bg-mint text-white shadow-lg shadow-mint/20' : 'text-secondary hover:bg-gray-50'}`}
        >
          {item.icon}
          {item.label}
        </button>
      ))}
    </div>

  </nav>
);

// --- Utilities: Sounds ---
const playSound = (type: 'correct' | 'wrong') => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'correct') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.1); // E6
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } else {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(110, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(55, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch (e) {
    console.warn("Audio Context not supported");
  }
};

// Internal Vocabulary component removed in favor of src/pages/VocabularyPage.tsx

// Internal Grammar component removed in favor of src/pages/GrammarPage.tsx

// Internal Progress component removed in favor of src/pages/ProgressPage.tsx


// --- Main App Layout ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [xp, setXp] = useState<number>(() => parseInt(localStorage.getItem('user_xp') || '130'));
  const [streak, setStreak] = useState<number>(() => parseInt(localStorage.getItem('user_streak') || '12'));
  const [words, setWords] = useState<VocabWord[]>([]);
  const [masteredCount, setMasteredCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  const todayStr = useMemo(() => {
    return new Date().toLocaleDateString('id-ID', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      timeZone: 'Asia/Tokyo'
    });
  }, []);

  // Sync with Supabase on mount
  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);
      try {
        const { data: vocabData } = await supabase
          .from('vocabulary')
          .select('*')
          .order('word', { ascending: true });
        
        if (vocabData) setWords(vocabData);

        const mastered = JSON.parse(localStorage.getItem('mastered_words') || '[]');
        setMasteredCount(mastered.length);

        // Optional Supabase sync for XP/Streak if auth session exists
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { data: progress } = await supabase
            .from('user_progress')
            .select('xp, streak_days')
            .single();
          
          if (progress) {
            setXp(progress.xp);
            setStreak(progress.streak_days);
          }
        }
      } catch (err) {
        console.warn("Using local fallback for progress.");
      } finally {
        setIsLoading(false);
      }
    };
    initData();
  }, []);

  // Update mastery count whenever words/local changes
  useEffect(() => {
    const mastered = JSON.parse(localStorage.getItem('mastered_words') || '[]');
    setMasteredCount(mastered.length);
  }, [words]);

  // Persist Local Progress
  useEffect(() => {
    localStorage.setItem('user_xp', xp.toString());
    localStorage.setItem('user_streak', streak.toString());
  }, [xp, streak]);

  const handleUpdateProgress = async (xpGain: number) => {
    const result = await advanceProgress(xpGain, false);
    if (result) {
      setXp(result.newXp);
      setStreak(result.newStreak);
    }
  };

  return (
    <div className="min-h-screen bg-warm-white flex">
      {/* Desktop Sidebar */}
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-8 p-4 lg:p-10 max-w-4xl mx-auto w-full">
        <main className="flex-1 w-full no-scrollbar overflow-y-auto h-screen lg:h-auto pb-28 lg:pb-0">
          {/* Desktop Header */}
          <header className="hidden lg:block mb-8">
            <h1 className="text-3xl font-bold text-charcoal">Halo, Hari Santoso! 👋</h1>
            <p className="text-secondary opacity-60">{todayStr} • Semangat belajarnya!</p>
          </header>

          <AnimatePresence mode="wait">
            {currentPage === 'home' && (
              <HomePage key="home" onNavigate={setCurrentPage} />
            )}
            {currentPage === 'vocabulary' && (
              <VocabularyPage key="vocabulary" />
            )}
            {currentPage === 'grammar' && (
              <GrammarPage key="grammar" />
            )}
            {currentPage === 'exercise' && <ExercisePage key="exercise" />}
            {currentPage === 'progress' && <ProgressPage key="progress" />}
          </AnimatePresence>
        </main>

      </div>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white border border-gray-100 px-2 py-2 rounded-[24px] custom-shadow z-50 flex items-center justify-between">
        <NavItem 
          active={currentPage === 'home'} 
          onClick={() => setCurrentPage('home')} 
          icon={<HomeIcon size={20} />} 
          label="Home" 
        />
        <NavItem 
          active={currentPage === 'vocabulary'} 
          onClick={() => setCurrentPage('vocabulary')} 
          icon={<BookOpen size={20} />} 
          label="Vocab" 
        />
        <NavItem 
          active={currentPage === 'grammar'} 
          onClick={() => setCurrentPage('grammar')} 
          icon={<Video size={20} />} 
          label="Grammar" 
        />
        <NavItem 
          active={currentPage === 'exercise'} 
          onClick={() => setCurrentPage('exercise')} 
          icon={<PenTool size={20} />} 
          label="Latihan" 
        />
        <NavItem 
          active={currentPage === 'progress'} 
          onClick={() => setCurrentPage('progress')} 
          icon={<BarChart2 size={20} />} 
          label="Progres" 
        />
      </nav>
      
      {/* Decorative Blur Elements */}
      <div className="fixed top-0 left-0 w-64 h-64 bg-mint/10 blur-[100px] -z-10 rounded-full" />
      <div className="fixed bottom-0 right-0 w-64 h-64 bg-peach/10 blur-[100px] -z-10 rounded-full" />
    </div>
  );
}

// Internal DaySelector component removed


function NavItem({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`relative flex flex-col items-center gap-1 flex-1 py-1 px-1 transition-all duration-300 ${active ? 'text-mint' : 'text-gray-400'}`}
    >
      <div className={`p-2 rounded-2xl transition-all ${active ? 'bg-mint/10' : ''}`}>
        {icon}
      </div>
      <span className="text-[10px] font-bold">{label}</span>
      {active && (
        <motion.div 
          layoutId="active-dot" 
          className="absolute -bottom-1 w-1 h-1 bg-mint rounded-full"
        />
      )}
    </button>
  );
}
