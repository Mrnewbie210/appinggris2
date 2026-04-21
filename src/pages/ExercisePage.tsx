import { useState } from 'react';
import { motion } from 'motion/react';
import { PenTool, X, ChevronRight } from 'lucide-react';
import { Card } from '../components/ui/Card';

export default function ExercisePage() {
  const [isStarted, setIsStarted] = useState(false);

  if (!isStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 text-center">
        <div className="w-32 h-32 bg-mint/10 rounded-[40px] flex items-center justify-center">
          <PenTool size={64} className="text-mint" />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">Siap Latihan?</h1>
          <p className="text-gray-500 max-w-xs mx-auto mb-8">
            Uji pemahamanmu dalam kuis cepat 10 menit.
          </p>
        </div>
        <button
          onClick={() => setIsStarted(true)}
          className="w-full max-w-xs soft-gradient text-white py-4 rounded-2xl font-bold shadow-lg shadow-mint/20 hover:opacity-90 transition-opacity"
        >
          Mulai Sesi Latihan
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-6"
    >
      {/* Sticky quiz header */}
      <div className="flex justify-between items-center sticky top-0 bg-warm-white/90 backdrop-blur-md py-4 z-10 px-2 rounded-2xl">
        <button
          onClick={() => setIsStarted(false)}
          className="bg-white p-2 rounded-xl border border-gray-100 text-gray-400 hover:bg-gray-50 transition-colors"
        >
          <X size={20} />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-gray-400">WAKTU TERSISA</span>
          <span className="text-xl font-bold text-charcoal tabular-nums">08:42</span>
        </div>
        <div className="w-10 h-10 bg-mint/10 rounded-xl flex items-center justify-center text-mint font-bold text-xs border border-mint/20">
          5/15
        </div>
      </div>

      {/* Question card */}
      <Card className="min-h-[400px] flex flex-col">
        <span className="text-mint font-black text-[10px] tracking-widest mb-4 uppercase">
          Fill in the blank
        </span>
        <h2 className="text-2xl font-bold leading-relaxed mb-12">
          "I have been{' '}
          <span className="text-mint underline decoration-2 underline-offset-4 font-black">
            _________
          </span>{' '}
          English since I was seven years old."
        </h2>

        <div className="grid grid-cols-1 gap-4 mt-auto">
          {['Study', 'Studied', 'Studying', 'Studies'].map((choice, i) => (
            <button
              key={i}
              className="w-full p-5 rounded-2xl border-2 border-gray-50 text-left font-bold text-lg hover:border-mint hover:bg-mint/5 transition-all"
            >
              {choice}
            </button>
          ))}
        </div>
      </Card>

      <button className="mt-4 bg-charcoal text-white py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 group hover:opacity-90 transition-opacity">
        Berikutnya
        <ChevronRight className="group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
}
