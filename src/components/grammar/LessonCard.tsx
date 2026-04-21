import React from 'react';
import type { GrammarLesson } from '../../types';
import { Badge } from '../ui/Badge';
import { Play, Check, ChevronRight } from 'lucide-react';

interface LessonCardProps {
  lesson: GrammarLesson;
  onClick?: () => void;
  key?: React.Key;
}

export const LessonCard = ({ lesson, onClick }: LessonCardProps) => (
  <div
    onClick={onClick}
    className="card-base p-3 block overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
  >
    <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
      <img
        src={lesson.thumbnail}
        alt={lesson.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
          <Play className="text-mint fill-current ml-1" size={20} />
        </div>
      </div>
      <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded">
        {lesson.duration}
      </div>
      {lesson.status === 'completed' && (
        <div className="absolute top-2 right-2">
          <Badge color="mint">
            <Check size={12} strokeWidth={4} />
            SELESAI
          </Badge>
        </div>
      )}
    </div>

    <div className="px-1 flex justify-between items-start">
      <div>
        <h3 className="font-bold text-sm mb-1">{lesson.title}</h3>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
          Lesson {lesson.id}
        </p>
      </div>
      <ChevronRight size={16} className="text-gray-300 mt-1" />
    </div>
  </div>
);

export default LessonCard;
