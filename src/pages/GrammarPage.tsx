import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, ArrowLeft, CheckCircle2, Video } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { grammarCurriculum, GrammarLesson } from '../lib/grammarData';

const MiniExercise = ({ lesson }: { lesson: GrammarLesson }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isRetaking, setIsRetaking] = useState(false);
  const [showScore, setShowScore] = useState(false);
  
  const storageKey = `grammar_exercise_${lesson.id}_score`;
  const savedScore = localStorage.getItem(storageKey);
  
  const exercises = lesson.exercises || [];
  
  if (exercises.length === 0) return null;

  if (savedScore && !isRetaking && !showScore) {
    return (
      <Card className="mt-2 p-6 border-2 border-mint/30 bg-mint/5 flex flex-col items-center">
        <h3 className="font-bold text-lg text-charcoal mb-2">📝 Mini Exercise</h3>
        <p className="text-sm font-medium text-gray-600 mb-4">Skor Kuis Sebelumnya: {savedScore}/{exercises.length}</p>
        <button 
          onClick={() => {
            setIsRetaking(true);
            setAnswers({});
          }}
          className="px-6 py-2 bg-white border-2 border-mint text-mint rounded-xl font-bold hover:bg-mint hover:text-white transition-colors"
        >
          Ulangi Kuis
        </button>
      </Card>
    );
  }

  const handleSelect = (qIdx: number, oIdx: number) => {
    if (showScore) return;
    if (answers[qIdx] !== undefined) return;
    setAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
  };

  const calculateScore = () => {
    let s = 0;
    exercises.forEach((ex, idx) => {
      if (answers[idx] === ex.correct) s++;
    });
    return s;
  };

  const handleFinish = () => {
    const s = calculateScore();
    localStorage.setItem(storageKey, s.toString());
    setShowScore(true);
    setIsRetaking(false);
  };

  const allAnswered = Object.keys(answers).length === exercises.length;

  return (
    <div className="mt-8 flex flex-col gap-6">
      <h3 className="font-bold text-xl text-charcoal flex items-center gap-2">
        <span>📝</span> Mini Exercise
      </h3>
      
      {exercises.map((ex, qIdx) => {
        const isAnswered = answers[qIdx] !== undefined;
        const isCorrect = answers[qIdx] === ex.correct;
        
        return (
          <Card key={qIdx} className="p-6 border-2 border-gray-100 flex flex-col gap-4">
            <p className="font-bold text-charcoal">{qIdx + 1}. {ex.question}</p>
            <div className="flex flex-col gap-2">
              {ex.options.map((opt, oIdx) => {
                let btnClass = "p-3 rounded-xl border-2 text-left font-medium transition-all ";
                if (!isAnswered) {
                  btnClass += "border-gray-100 hover:border-mint hover:bg-mint/5 text-gray-600";
                } else {
                  if (oIdx === ex.correct) {
                    btnClass += "border-mint bg-mint/10 text-mint";
                  } else if (oIdx === answers[qIdx]) {
                    btnClass += "border-red-400 bg-red-50 text-red-500";
                  } else {
                    btnClass += "border-gray-100 opacity-50";
                  }
                }
                
                return (
                  <button 
                    key={oIdx} 
                    onClick={() => handleSelect(qIdx, oIdx)}
                    disabled={isAnswered}
                    className={btnClass}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
            
            {isAnswered && (
              <div className={`mt-2 p-4 rounded-xl text-sm font-medium ${isCorrect ? 'bg-mint/10 text-mint' : 'bg-red-50 text-red-500'}`}>
                <div className="font-bold mb-1">{isCorrect ? 'Benar!' : 'Kurang Tepat'}</div>
                {ex.explanation}
              </div>
            )}
          </Card>
        );
      })}

      {allAnswered && !showScore && (
         <button 
           onClick={handleFinish}
           className="py-4 bg-mint text-white rounded-2xl font-black text-lg hover:bg-opacity-90 transition-all shadow-lg shadow-mint/20 mt-2"
         >
           Selesai & Simpan Skor
         </button>
      )}

      {showScore && (
         <Card className="p-6 border-2 border-mint bg-mint/5 flex flex-col items-center">
            <h4 className="font-black text-2xl text-charcoal mb-2">Kuis Selesai! 🎉</h4>
            <p className="text-lg font-bold text-mint mb-6">Skor: {calculateScore()} / {exercises.length}</p>
            <button 
              onClick={() => {
                setIsRetaking(true);
                setAnswers({});
                setShowScore(false);
              }}
              className="px-6 py-2 bg-white border-2 border-mint text-mint rounded-xl font-bold hover:bg-mint hover:text-white transition-colors"
            >
              Ulangi Kuis
            </button>
         </Card>
      )}
    </div>
  );
};

export default function GrammarPage() {
  const [selectedLesson, setSelectedLesson] = useState<GrammarLesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const rawCompleted = localStorage.getItem('grammar_completed');
    if (rawCompleted) {
      try {
        const parsed = JSON.parse(rawCompleted);
        // Handle both array and object formats for compatibility
        if (Array.isArray(parsed)) {
          setCompletedLessons(parsed);
        } else {
          setCompletedLessons(Object.keys(parsed).filter(k => parsed[k]).map(Number));
        }
      } catch (e) {
        setCompletedLessons([]);
      }
    }
  }, []);

  const toggleComplete = (id: number) => {
    const isCompleted = completedLessons.includes(id);
    let updated: number[];
    if (isCompleted) {
      updated = completedLessons.filter(lId => lId !== id);
    } else {
      updated = [...completedLessons, id];
    }
    setCompletedLessons(updated);
    localStorage.setItem('grammar_completed', JSON.stringify(updated));
  };

  const getYoutubeEmbed = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match ? match[2] : null;
    return videoId 
      ? `https://www.youtube.com/embed/${videoId}` 
      : null;
  };

  // Group lessons by BAB mapping
  const groupedCurriculum = useMemo(() => {
    const groups: Record<string, GrammarLesson[]> = {};
    grammarCurriculum.forEach(lesson => {
      const groupName = typeof lesson.bab_number === 'number' ? `BAB ${lesson.bab_number}` : lesson.bab_number;
      if (!groups[groupName]) groups[groupName] = [];
      groups[groupName].push(lesson);
    });
    return groups;
  }, []);

  if (selectedLesson) {
    const isCompleted = completedLessons.includes(selectedLesson.id);

    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col gap-6 pb-20"
      >
        <button 
          onClick={() => setSelectedLesson(null)}
          className="flex items-center gap-2 text-gray-400 font-bold hover:text-charcoal transition-colors self-start bg-white px-4 py-2 rounded-xl border border-gray-100 mb-2"
        >
          <ArrowLeft size={18} /> Kembali
        </button>

        <header className="flex flex-col gap-1">
          <span className="text-[10px] font-black text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded tracking-[0.2em] uppercase mb-1 w-fit">
            BAB {selectedLesson.bab_number} • Lesson {selectedLesson.lesson_number}
          </span>
          <h1 className="text-3xl font-bold text-charcoal">{selectedLesson.title}</h1>
        </header>

        <Card className="flex flex-col overflow-hidden border-2 border-gray-100 p-0 shadow-xl shadow-charcoal/5">
          <div className="w-full bg-charcoal">
            {selectedLesson.video_url ? (
              <iframe
                src={`${getYoutubeEmbed(selectedLesson.video_url)}?rel=0&autoplay=1`}
                className="w-full aspect-video rounded-b-none"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            ) : (
              <div className="aspect-video flex items-center justify-center text-gray-500 flex-col gap-4">
                <Play size={48} className="opacity-20" />
                <p className="font-bold text-sm">Video tidak tersedia</p>
              </div>
            )}
          </div>
          
          <div className="p-8 bg-white flex flex-col items-center">
            <button 
              onClick={() => toggleComplete(selectedLesson.id)}
              className={`w-full max-w-md py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-lg ${
                isCompleted 
                ? 'bg-mint text-white shadow-mint/20' 
                : 'bg-white border-2 border-gray-200 text-gray-400 hover:border-mint hover:text-mint'
              }`}
            >
              <CheckCircle2 size={24} />
              {isCompleted ? 'Selesai ✨' : 'Tandai Selesai'}
            </button>
            {isCompleted && (
              <p className="mt-4 text-xs font-bold text-mint animate-pulse">Hebat! Materi ini sudah kamu selesaikan.</p>
            )}
          </div>
        </Card>

        {/* Mini Exercise Section */}
        <MiniExercise lesson={selectedLesson} />
      </motion.div>
    );
  }

  const completedCount = completedLessons.length;
  const totalCount = grammarCurriculum.length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-8 pb-32"
    >
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3 text-charcoal">
            <span className="bg-indigo-500/10 text-indigo-500 p-2 rounded-xl">
              <Video size={24} />
            </span>
            Struktur Tata Bahasa
          </h1>
          <p className="text-gray-500 font-medium text-sm mt-2">
            Pelajari aturan dan pola bahasa Inggris dari dasar hingga mahir.
          </p>
        </div>
        <div className="bg-white border-2 border-gray-100 rounded-2xl px-4 py-2 flex flex-col items-center shadow-sm">
           <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase">Penyelesaian</span>
           <span className="text-xl font-black text-mint">{totalCount > 0 ? Math.floor((completedCount / totalCount) * 100) : 0}%</span>
        </div>
      </header>

      <div className="flex flex-col gap-10">
        {(Object.keys(groupedCurriculum) as string[]).map((groupName) => {
          const lessons = groupedCurriculum[groupName];
          const groupCompleted = lessons.filter(l => completedLessons.includes(l.id)).length;
          const groupTotal = lessons.length;

          return (
            <div key={groupName} className="flex flex-col gap-4">
              <div className="flex items-center gap-4 px-2">
                 <h2 className="text-xs font-black text-secondary/40 uppercase tracking-[0.2em] whitespace-nowrap">{groupName}</h2>
                 <div className="h-px bg-gray-100 flex-1" />
                 <span className="text-[10px] font-bold text-gray-400">{groupCompleted} / {groupTotal} Modul</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 {lessons.map(lesson => {
                   const isDone = completedLessons.includes(lesson.id);
                   return (
                     <Card 
                       key={lesson.id} 
                       onClick={() => setSelectedLesson(lesson)}
                       className={`p-4 flex items-center gap-4 cursor-pointer transition-all hover:scale-[1.01] hover:shadow-md group ${isDone ? 'border-mint/30 bg-mint/5' : 'border-gray-100 hover:border-indigo-200'}`}
                     >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${isDone ? 'bg-mint text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-mint/10 group-hover:text-mint'}`}>
                          {isDone ? <CheckCircle2 size={24} /> : <Play fill="currentColor" size={20} className="ml-1" />}
                        </div>
                        <div className="flex-1 min-w-0">
                           <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-1">
                             Lesson {lesson.lesson_number}
                           </p>
                           <h3 className={`font-bold text-sm sm:text-base leading-tight truncate ${isDone ? 'text-charcoal' : 'text-charcoal'}`}>
                             {lesson.title}
                           </h3>
                        </div>
                     </Card>
                   );
                 })}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
