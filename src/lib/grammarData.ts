import { grammarExercises, Exercise } from './grammarExercises';

export interface GrammarLesson {
  id: number;
  bab_number: number | string;
  lesson_number: number;
  title: string;
  video_url: string;
  exercises?: Exercise[];
}

const rawCurriculum: GrammarLesson[] = [
  // BAB 1: Dasar Kalimat (Lesson 1-7)
  {
    id: 1,
    bab_number: 1,
    lesson_number: 1,
    title: 'Noun IS',
    video_url: 'https://www.youtube.com/watch?v=YaWYTo98HQY'
  },
  {
    id: 2,
    bab_number: 1,
    lesson_number: 2,
    title: 'Membedakan A dan An',
    video_url: 'https://www.youtube.com/watch?v=5zidVLnZJao'
  },
  {
    id: 3,
    bab_number: 1,
    lesson_number: 3,
    title: 'Noun Are',
    video_url: 'https://www.youtube.com/watch?v=tPw3bU6MaOI'
  },
  {
    id: 4,
    bab_number: 1,
    lesson_number: 4,
    title: 'Pronoun (Kata Ganti)',
    video_url: 'https://www.youtube.com/watch?v=RDK044jpJXw'
  },
  {
    id: 5,
    bab_number: 1,
    lesson_number: 5,
    title: 'Kalimat Negative Be Not',
    video_url: 'https://www.youtube.com/watch?v=ifhxS9yeNVc'
  },
  {
    id: 6,
    bab_number: 1,
    lesson_number: 6,
    title: 'Adjectives (Kata Sifat)',
    video_url: 'https://www.youtube.com/watch?v=0wxoZl4os4M'
  },
  {
    id: 7,
    bab_number: 1,
    lesson_number: 7,
    title: 'Bertanya Pakai Be',
    video_url: 'https://www.youtube.com/watch?v=53Ez0ZVI0PI'
  },

  // BAB 2: Kepemilikan & Have/Has (Lesson 8-11)
  {
    id: 8,
    bab_number: 2,
    lesson_number: 8,
    title: 'Possessive Adjectives',
    video_url: 'https://www.youtube.com/watch?v=-1PrUYUgrlA'
  },
  {
    id: 9,
    bab_number: 2,
    lesson_number: 9,
    title: 'Have dan Has',
    video_url: 'https://www.youtube.com/watch?v=tgox9MqcVQ4'
  },
  {
    id: 10,
    bab_number: 2,
    lesson_number: 10,
    title: 'Bertanya Pakai What (Apa)',
    video_url: 'https://www.youtube.com/watch?v=M-1rvvU0hts'
  },
  {
    id: 11,
    bab_number: 2,
    lesson_number: 11,
    title: 'Bertanya Pakai Who (Siapa)',
    video_url: 'https://www.youtube.com/watch?v=pVoRNvnJTEY'
  },

  // BAB 3: Simple Present Tense (Lesson 12-18)
  {
    id: 12,
    bab_number: 3,
    lesson_number: 12,
    title: 'Simple Present Tense',
    video_url: 'https://www.youtube.com/watch?v=1Gf2AEOwAJY'
  },
  {
    id: 13,
    bab_number: 3,
    lesson_number: 13,
    title: 'Habits (Kebiasaan)',
    video_url: 'https://www.youtube.com/watch?v=4HVXWw8BMNw'
  },
  {
    id: 14,
    bab_number: 3,
    lesson_number: 14,
    title: 'Adverbs of Frequency',
    video_url: 'https://www.youtube.com/watch?v=PiIKWZKW4X8'
  },
  {
    id: 15,
    bab_number: 3,
    lesson_number: 15,
    title: 'Do Not dan Does Not',
    video_url: 'https://www.youtube.com/watch?v=QfuhZZ7DH0A'
  },
  {
    id: 16,
    bab_number: 3,
    lesson_number: 16,
    title: 'Bertanya Dengan Do dan Does',
    video_url: 'https://www.youtube.com/watch?v=TDsI8QrmVtY'
  },
  {
    id: 17,
    bab_number: 3,
    lesson_number: 17,
    title: 'Where (Di mana)',
    video_url: 'https://www.youtube.com/watch?v=hKPSvGIvT8c'
  },
  {
    id: 18,
    bab_number: 3,
    lesson_number: 18,
    title: 'When dan What Time',
    video_url: 'https://www.youtube.com/watch?v=S-gtq_5sQXc'
  },

  // BAB 4: Present Continuous Tense (Lesson 19-22)
  {
    id: 19,
    bab_number: 4,
    lesson_number: 19,
    title: 'Present Continuous Tense',
    video_url: 'https://www.youtube.com/watch?v=lY_Vd9hgO6E'
  },
  {
    id: 20,
    bab_number: 4,
    lesson_number: 20,
    title: 'Pertanyaan Present Continuous',
    video_url: 'https://www.youtube.com/watch?v=4k6lpXgxboM'
  },
  {
    id: 21,
    bab_number: 4,
    lesson_number: 21,
    title: 'Non Action Verbs',
    video_url: 'https://www.youtube.com/watch?v=wy5r9G_EnXo'
  },
  {
    id: 22,
    bab_number: 4,
    lesson_number: 22,
    title: 'Menanyakan Waktu, Tahun, Bulan, Tanggal',
    video_url: 'https://www.youtube.com/watch?v=0RvxoXFw2_Q'
  },

  // BAB 5: Simple Past Tense (Lesson 23-29)
  {
    id: 23,
    bab_number: 5,
    lesson_number: 23,
    title: 'Simple Past Tense',
    video_url: 'https://www.youtube.com/watch?v=sLBsvcCo7qo'
  },
  {
    id: 24,
    bab_number: 5,
    lesson_number: 24,
    title: 'Verb 2 (Regular & Irregular)',
    video_url: 'https://www.youtube.com/watch?v=5IMchN25SMs'
  },
  {
    id: 25,
    bab_number: 5,
    lesson_number: 25,
    title: 'Bertanya Pakai Did',
    video_url: 'https://www.youtube.com/watch?v=ujcPlkFBE8I'
  },
  {
    id: 26,
    bab_number: 5,
    lesson_number: 26,
    title: 'W + Did Dalam Past Tense',
    video_url: 'https://www.youtube.com/watch?v=P0Dvvha__Nk'
  },
  {
    id: 27,
    bab_number: 5,
    lesson_number: 27,
    title: 'What Did & Who Did',
    video_url: 'https://www.youtube.com/watch?v=JgxWLc8d6Bs'
  },
  {
    id: 28,
    bab_number: 5,
    lesson_number: 28,
    title: 'Before, After, When Dalam Past Tense',
    video_url: 'https://www.youtube.com/watch?v=HBRs4pW8IrA'
  },
  {
    id: 29,
    bab_number: 5,
    lesson_number: 29,
    title: 'Past Continuous Tense',
    video_url: 'https://www.youtube.com/watch?v=ZYRp2PEWqN4'
  },

  // BAB 6: Simple Future Tense (Lesson 30-32)
  {
    id: 30,
    bab_number: 6,
    lesson_number: 30,
    title: 'Simple Future Tense & Be Going To',
    video_url: 'https://www.youtube.com/watch?v=hFiOu1TpMN8'
  },
  {
    id: 31,
    bab_number: 6,
    lesson_number: 31,
    title: 'Will',
    video_url: 'https://www.youtube.com/watch?v=ehdx-9o9Vb0'
  },
  {
    id: 32,
    bab_number: 6,
    lesson_number: 32,
    title: 'Bertanya Dalam Simple Future',
    video_url: 'https://www.youtube.com/watch?v=nVEzTpPjpTI'
  },

  // BAB 7: Present Perfect Tense (Lesson 33-36)
  {
    id: 33,
    bab_number: 7,
    lesson_number: 33,
    title: 'Present Perfect Tense',
    video_url: 'https://www.youtube.com/watch?v=mcfvhkXth40'
  },
  {
    id: 34,
    bab_number: 7,
    lesson_number: 34,
    title: 'Keterangan Waktu dalam Present Perfect',
    video_url: 'https://www.youtube.com/watch?v=t0FRz6i4Flk'
  },
  {
    id: 35,
    bab_number: 7,
    lesson_number: 35,
    title: 'Have Not & Have Not Yet (Belum)',
    video_url: 'https://www.youtube.com/watch?v=DJmN5AqXasA'
  },
  {
    id: 36,
    bab_number: 7,
    lesson_number: 36,
    title: 'Bertanya "Sudahkah Kamu?" dalam Present Perfect',
    video_url: 'https://www.youtube.com/watch?v=2KR2tNcy82w'
  },

  // BONUS: Tambahan (Lesson 37-38)
  {
    id: 37,
    bab_number: 'Bonus',
    lesson_number: 37,
    title: 'Comparatives & Superlatives (Lebih & Paling)',
    video_url: 'https://www.youtube.com/watch?v=8FJCyMEtF44'
  },
  {
    id: 38,
    bab_number: 'Bonus',
    lesson_number: 38,
    title: 'Prepositions: In, On, At (Tempat)',
    video_url: 'https://www.youtube.com/watch?v=mxXm1x8jgoQ'
  },
];

export const grammarCurriculum: GrammarLesson[] = rawCurriculum.map(lesson => ({
  ...lesson,
  exercises: grammarExercises[lesson.id] || []
}));
