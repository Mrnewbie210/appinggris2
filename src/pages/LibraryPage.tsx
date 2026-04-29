import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Book, Volume2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Card } from '../components/ui/Card';
import type { VocabWord } from '../types';

export default function LibraryPage() {
  const [words, setWords] = useState<VocabWord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initDictionary() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('vocabulary')
          .select('*')
          .order('word', { ascending: true });

        if (error) throw error;
        setWords((data as VocabWord[]) || []);
      } catch (err) {
        console.error('Failed to load global dictionary:', err);
      } finally {
        setIsLoading(false);
      }
    }
    initDictionary();
  }, []);

  const filteredWords = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return words.filter(
      (w) =>
        w.word.toLowerCase().includes(q) ||
        (w.meaning_id && w.meaning_id.toLowerCase().includes(q)) ||
        (w.example_sentence && w.example_sentence.toLowerCase().includes(q)) ||
        (w.translation && w.translation.toLowerCase().includes(q)) ||
        (w.example && w.example.toLowerCase().includes(q))
    );
  }, [words, searchQuery]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6"
    >
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold flex items-center gap-3 text-charcoal">
          <span className="bg-mint/10 text-mint p-2 rounded-xl">
            <Book size={24} />
          </span>
          Kosakata Global
        </h1>
        <p className="text-gray-500 font-medium text-sm">
          Akses seluruh materi kamus English Every Day by Jago Academia.
        </p>
      </header>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Cari kata (Inggris atau terjemahan)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 pl-12 pr-4 text-charcoal font-medium placeholder-gray-400 focus:outline-none focus:border-mint/50 focus:ring-4 focus:ring-mint/10 transition-all custom-shadow"
        />
        {words.length > 0 && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold bg-gray-100 text-gray-500 px-2 py-1 rounded-lg">
            {filteredWords.length} entri
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="py-20 text-center text-gray-400 font-bold animate-pulse">
          Memuat Kamus Data...
        </div>
      ) : filteredWords.length === 0 ? (
        <div className="py-20 text-center flex flex-col items-center gap-2">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-2">
            <Search size={28} />
          </div>
          <h3 className="font-bold text-gray-600">Tidak ada hasil</h3>
          <p className="text-sm text-gray-400">Kata "{searchQuery}" tidak ditemukan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-10">
          {filteredWords.map((w) => (
            <Card key={w.id} className="p-5 flex flex-col gap-3 hover:border-mint/30 transition-colors border-2 border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-charcoal flex items-center gap-2">
                    {w.word}
                    <button className="text-gray-300 hover:text-mint transition-colors">
                      <Volume2 size={16} />
                    </button>
                  </h3>
                  <span className="text-xs font-semibold text-gray-400">{w.pronunciation || '/.../'}</span>
                </div>
                <span className="text-[10px] bg-gray-50 text-gray-500 font-bold px-2 py-1 rounded border border-gray-200 uppercase tracking-widest">
                  {w.level || 'A1'}
                </span>
              </div>
              <div className="h-px bg-gray-100 w-full" />
              <div>
                <p className="font-bold text-mint text-sm mb-1">{w.meaning_id || w.translation}</p>
                <div className="text-xs text-gray-500 italic bg-gray-50 p-2 rounded-lg border border-gray-100 border-dashed">
                  "{w.example_sentence || w.example || 'No example sentence mapped available yet.'}"
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  );
}
