import { ChevronRight } from 'lucide-react';
import { Card } from '../ui/Card';

interface StreakCalendarProps {
  /** Month label, e.g. "April 2026" */
  monthLabel: string;
  /** Total days in the month */
  totalDays: number;
  /** 1-indexed day numbers that have learning activity */
  learnedDays: number[];
  /** 1-indexed day that the calendar starts on (1=Mon, 7=Sun in Indonesian calendar) */
  startOffset?: number;
}

const DAY_LABELS = ['S', 'S', 'R', 'K', 'J', 'S', 'M'];

export const StreakCalendar = ({
  monthLabel,
  totalDays,
  learnedDays,
  startOffset = 0,
}: StreakCalendarProps) => (
  <Card>
    {/* Header */}
    <div className="flex justify-between items-center mb-6">
      <h3 className="font-bold">{monthLabel}</h3>
      <div className="flex gap-2">
        <button className="p-1 rounded-lg border border-gray-100 text-gray-300">
          <ChevronRight className="rotate-180" size={16} />
        </button>
        <button className="p-1 rounded-lg border border-gray-100 text-gray-300">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>

    {/* Day labels */}
    <div className="grid grid-cols-7 gap-2 mb-2">
      {DAY_LABELS.map((d, i) => (
        <div key={i} className="text-center text-[10px] font-black text-gray-300">
          {d}
        </div>
      ))}
    </div>

    {/* Day cells */}
    <div className="grid grid-cols-7 gap-2">
      {/* Offset empty cells */}
      {Array.from({ length: startOffset }).map((_, i) => (
        <div key={`offset-${i}`} />
      ))}
      {Array.from({ length: totalDays }).map((_, i) => {
        const day = i + 1;
        const learned = learnedDays.includes(day);
        return (
          <div
            key={day}
            className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold transition-colors ${
              learned ? 'bg-mint text-white' : 'text-gray-300 hover:bg-gray-50'
            }`}
          >
            {day}
          </div>
        );
      })}
    </div>
  </Card>
);

export default StreakCalendar;
