import type { UserData, VocabWord, GrammarLesson, Achievement, ProgressChapter } from '../types';

/** Merge class names (lightweight alternative to clsx) */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Format a Date to Indonesian locale date string */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

export const userData: UserData = {
  name: 'Budi Santoso',
  streak: 12,
  progress: 45,
  dailyTasks: [
    { id: 'task-1', title: 'Vocabulary', status: 'pending' },
    { id: 'task-2', title: 'Grammar', status: 'completed' },
    { id: 'task-3', title: 'Listening', status: 'pending' },
    { id: 'task-4', title: 'Reading', status: 'pending' },
  ],
  quote: 'Langkah kecil setiap hari membawa perubahan besar.',
};

export const vocabWords: VocabWord[] = [
  {
    id: 'v-1',
    word: 'Resilience',
    pronunciation: '/rɪˈzɪl.i.əns/',
    meaning_id: 'Ketangguhan / Daya Pegas',
    meaning_en: 'The ability to recover quickly from difficulties.',
    example_sentence: 'Her resilience helped her overcome many challenges.',
    example_translation: 'Ketangguhannya membantunya mengatasi banyak tantangan.',
    category: 'noun',
    level: 'B2',
    difficulty: 'intermediate',
    tags: ['oxford5000', 'academic'],
    created_at: '2026-04-19T00:00:00Z',
    // legacy
    translation: 'Ketangguhan / Daya Pegas',
    example: 'Her resilience helped her overcome many challenges.',
    mastered: false,
  },
  {
    id: 'v-2',
    word: 'Ambiguity',
    pronunciation: '/ˌæm.bɪˈɡjuː.ɪ.ti/',
    meaning_id: 'Kekurangjelasan, kebingungan',
    meaning_en: 'The quality of being open to more than one interpretation.',
    example_sentence: 'The document was full of ambiguity.',
    example_translation: 'Dokumen itu penuh dengan ketidakjelasan.',
    category: 'noun',
    level: 'B1',
    difficulty: 'intermediate',
    tags: ['oxford5000', 'academic'],
    created_at: '2026-04-19T00:00:00Z',
    translation: 'Kekurangjelasan, kebingungan.',
    example: 'The document was full of ambiguity.',
    mastered: false,
  },
  {
    id: 'v-3',
    word: 'Conscience',
    pronunciation: '/ˈkɒn.ʃəns/',
    meaning_id: 'Hati nurani',
    meaning_en: 'Your inner sense of what is right or wrong.',
    example_sentence: 'He followed his conscience and told the truth.',
    example_translation: 'Dia mengikuti hati nuraninya dan mengatakan yang sebenarnya.',
    category: 'noun',
    level: 'B1',
    difficulty: 'intermediate',
    tags: ['oxford3000'],
    created_at: '2026-04-19T00:00:00Z',
    translation: 'Hati nurani.',
    example: 'He followed his conscience and told the truth.',
    mastered: false,
  },
  {
    id: 'v-4',
    word: 'Inevitable',
    pronunciation: '/ɪnˈev.ɪ.tə.bəl/',
    meaning_id: 'Tidak bisa dihindari',
    meaning_en: 'Certain to happen and unable to be avoided.',
    example_sentence: 'Change is inevitable in life.',
    example_translation: 'Perubahan adalah hal yang tidak bisa dihindari.',
    category: 'adjective',
    level: 'B2',
    difficulty: 'intermediate',
    tags: ['oxford5000'],
    created_at: '2026-04-19T00:00:00Z',
    translation: 'Pasti terjadi.',
    example: 'Change is inevitable in life.',
    mastered: false,
  },
  {
    id: 'v-5',
    word: 'Persistence',
    pronunciation: '/pəˈsɪs.təns/',
    meaning_id: 'Ketekunan',
    meaning_en: 'The fact of continuing to try to do something despite difficulties.',
    example_sentence: 'Persistence is the key to success.',
    example_translation: 'Ketekunan adalah kunci keberhasilan.',
    category: 'noun',
    level: 'B1',
    difficulty: 'intermediate',
    tags: ['oxford3000', 'oxford5000'],
    created_at: '2026-04-19T00:00:00Z',
    translation: 'Ketekunan.',
    example: 'Persistence is the key to success.',
    mastered: true,
  },
];


export const grammarLessons: GrammarLesson[] = [
  {
    id: 1,
    title: 'Introduction to Tenses',
    duration: '12:45',
    status: 'completed',
    thumbnail: 'https://picsum.photos/seed/learn1/400/225',
  },
  {
    id: 2,
    title: 'Present Continuous',
    duration: '15:20',
    status: 'completed',
    thumbnail: 'https://picsum.photos/seed/learn2/400/225',
  },
  {
    id: 3,
    title: 'Past Simple Mastery',
    duration: '18:10',
    status: 'pending',
    thumbnail: 'https://picsum.photos/seed/learn3/400/225',
  },
  {
    id: 4,
    title: 'Future Tense Basics',
    duration: '10:30',
    status: 'pending',
    thumbnail: 'https://picsum.photos/seed/learn4/400/225',
  },
];

export const achievements: Achievement[] = [
  { id: 1, name: '7 Day Streak', icon: '🔥', color: 'bg-orange-100' },
  { id: 2, name: '500 Words', icon: '📚', color: 'bg-blue-100' },
  { id: 3, name: 'Quiz Master', icon: '🎯', color: 'bg-purple-100' },
  { id: 4, name: 'Grammar Hero', icon: '✨', color: 'bg-yellow-100' },
];

export const progressChapters: ProgressChapter[] = [
  { title: 'Bab 1: The Basics', progress: 100 },
  { title: 'Bab 2: Time Travel (Past)', progress: 45 },
  { title: 'Bab 3: Future Outlook', progress: 0 },
];

export const learnedDays = [2, 3, 5, 8, 9, 10, 11, 12, 14, 15, 17, 18, 19];
