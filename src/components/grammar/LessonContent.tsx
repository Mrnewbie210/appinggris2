import type { GrammarLesson } from '../../types';
import { Play } from 'lucide-react';

interface LessonContentProps {
  lesson: GrammarLesson;
}

export const LessonContent = ({ lesson }: LessonContentProps) => (
  <div className="flex flex-col gap-6">
    {/* Video Player Placeholder */}
    <div className="relative aspect-video rounded-3xl overflow-hidden bg-gray-900 flex items-center justify-center shadow-xl">
      <img
        src={lesson.thumbnail}
        alt={lesson.title}
        className="w-full h-full object-cover opacity-60"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <button className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
          <Play className="text-mint fill-current ml-1" size={32} />
        </button>
        <span className="text-white text-sm font-bold opacity-80">{lesson.duration}</span>
      </div>
    </div>

    {/* Lesson Info */}
    <div>
      <p className="text-[10px] font-black text-mint uppercase tracking-widest mb-1">
        Lesson {lesson.id}
      </p>
      <h2 className="text-2xl font-bold">{lesson.title}</h2>
    </div>

    {/* Notes placeholder */}
    <div className="card-base">
      <h3 className="font-bold mb-3 text-sm">Catatan Pelajaran</h3>
      <p className="text-gray-500 text-sm leading-relaxed">
        Konten pelajaran akan ditampilkan di sini. Hubungkan dengan Supabase untuk menyimpan
        catatan dan progres belajarmu.
      </p>
    </div>
  </div>
);

export default LessonContent;
