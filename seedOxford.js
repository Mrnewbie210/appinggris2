import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fpppaejrlsvdluloutuy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwcHBhZWpybHN2ZGx1bG91dHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1OTE2NjEsImV4cCI6MjA5MjE2NzY2MX0.WQJroWMZhPsrBPxv4GNcCJOwHh3LnrXscNi-DMOKw9E';

const supabase = createClient(supabaseUrl, supabaseKey);

const wordsToInsert = [
  { "word": "About", "translation": "Tentang", "example_sentence": "What is this book about?" },
  { "word": "Above", "translation": "Di atas", "example_sentence": "The birds are flying above the trees." },
  { "word": "Across", "translation": "Di seberang", "example_sentence": "He walked across the street." },
  { "word": "Action", "translation": "Tindakan", "example_sentence": "We need to take action now." },
  { "word": "Activity", "translation": "Aktivitas", "example_sentence": "Swimming is a fun activity." },
  { "word": "Actor", "translation": "Aktor", "example_sentence": "He is a famous movie actor." },
  { "word": "Actress", "translation": "Aktris", "example_sentence": "She is a talented actress." },
  { "word": "Add", "translation": "Menambah", "example_sentence": "Add some sugar to the coffee." },
  { "word": "Address", "translation": "Alamat", "example_sentence": "What is your home address?" },
  { "word": "Adult", "translation": "Dewasa", "example_sentence": "This movie is for adults only." },
  { "word": "Advice", "translation": "Nasihat", "example_sentence": "Thank you for your good advice." },
  { "word": "Afraid", "translation": "Takut", "example_sentence": "Don't be afraid of the dark." },
  { "word": "After", "translation": "Setelah", "example_sentence": "I will call you after lunch." },
  { "word": "Afternoon", "translation": "Siang/Sore", "example_sentence": "Good afternoon, how are you?" },
  { "word": "Again", "translation": "Lagi", "example_sentence": "Can you say that again?" },
  { "word": "Age", "translation": "Usia", "example_sentence": "What is your age?" },
  { "word": "Agree", "translation": "Setuju", "example_sentence": "I agree with your opinion." },
  { "word": "Air", "translation": "Udara", "example_sentence": "We need fresh air." },
  { "word": "Airport", "translation": "Bandara", "example_sentence": "The plane is at the airport." },
  { "word": "All", "translation": "Semua", "example_sentence": "All students must come." }
];

async function seed() {
  console.log('Initiating bulk Oxford 3000 insertion...');

  const payload = wordsToInsert.map(w => ({
    word: w.word,
    meaning_id: w.translation, 
    example_sentence: w.example_sentence,
    category: 'other',
    level: 'A1',
    difficulty: 'beginner',
    pronunciation: '',
    meaning_en: '',
    example_translation: '',
    tags: ['oxford3000']
  }));

  const { data, error } = await supabase.from('vocabulary').insert(payload);

  if (error) {
    console.error('SEEDING FAILED:', error);
  } else {
    console.log('SEEDING SUCCESSFUL! 20 Legacy words injected globally.');
  }
}

seed();
