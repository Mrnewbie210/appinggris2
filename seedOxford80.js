import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fpppaejrlsvdluloutuy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwcHBhZWpybHN2ZGx1bG91dHV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY1OTE2NjEsImV4cCI6MjA5MjE2NzY2MX0.WQJroWMZhPsrBPxv4GNcCJOwHh3LnrXscNi-DMOKw9E';

const supabase = createClient(supabaseUrl, supabaseKey);

const next80Words = [
  { word: "Allow", translation: "Mengizinkan", example_sentence: "Please allow me to help you." },
  { word: "Almost", translation: "Hampir", example_sentence: "I am almost finished with my work." },
  { word: "Alone", translation: "Sendiri", example_sentence: "She likes to stay at home alone." },
  { word: "Along", translation: "Sepanjang", example_sentence: "We walked along the beautiful beach." },
  { word: "Already", translation: "Sudah", example_sentence: "I have already eaten breakfast." },
  { word: "Also", translation: "Juga", example_sentence: "He is smart, and he is also very kind." },
  { word: "Always", translation: "Selalu", example_sentence: "I always wake up early in the morning." },
  { word: "Amazing", translation: "Luar biasa", example_sentence: "That was an amazing performance." },
  { word: "Among", translation: "Di antara", example_sentence: "He sat among his friends." },
  { word: "Amount", translation: "Jumlah", example_sentence: "We have a large amount of work to do." },
  { word: "Angry", translation: "Marah", example_sentence: "Why are you looking so angry?" },
  { word: "Animal", translation: "Hewan", example_sentence: "The lion is a wild animal." },
  { word: "Another", translation: "Yang lain", example_sentence: "Would you like another cup of tea?" },
  { word: "Answer", translation: "Jawaban", example_sentence: "Do you know the answer to this question?" },
  { word: "Any", translation: "Apa saja / Mana saja", example_sentence: "Do you have any questions?" },
  { word: "Anyone", translation: "Siapa saja", example_sentence: "Can anyone help me with this?" },
  { word: "Anything", translation: "Apa saja", example_sentence: "I am so hungry I could eat anything." },
  { word: "Anyway", translation: "Bagaimanapun", example_sentence: "Anyway, let's talk about something else." },
  { word: "Anywhere", translation: "Di mana saja", example_sentence: "I can meet you anywhere." },
  { word: "Appear", translation: "Muncul", example_sentence: "The sun began to appear." },
  { word: "Apple", translation: "Apel", example_sentence: "I eat an apple every day." },
  { word: "Area", translation: "Daerah", example_sentence: "This area is known for its beautiful parks." },
  { word: "Argue", translation: "Berdebat", example_sentence: "Please do not argue with your brother." },
  { word: "Arm", translation: "Lengan", example_sentence: "He broke his left arm playing football." },
  { word: "Around", translation: "Di sekitar", example_sentence: "We walked around the city." },
  { word: "Arrive", translation: "Tiba", example_sentence: "We will arrive at the station soon." },
  { word: "Art", translation: "Seni", example_sentence: "She studies art at the university." },
  { word: "Article", translation: "Artikel", example_sentence: "I read an interesting article today." },
  { word: "Artist", translation: "Seniman", example_sentence: "Picasso is a famous artist." },
  { word: "As", translation: "Sebagai / Seperti", example_sentence: "He works as a teacher." },
  { word: "Ask", translation: "Bertanya", "example_sentence": "If you don't know, just ask." },
  { word: "Asleep", translation: "Tertidur", "example_sentence": "The baby is fast asleep." },
  { word: "At", translation: "Di", "example_sentence": "We will meet at the library." },
  { word: "Attack", translation: "Menyerang", "example_sentence": "The dog tried to attack the stranger." },
  { word: "Attention", translation: "Perhatian", "example_sentence": "Pay attention to the teacher." },
  { word: "August", translation: "Agustus", "example_sentence": "My birthday is in August." },
  { word: "Aunt", translation: "Bibi", "example_sentence": "My aunt is visiting us tomorrow." },
  { word: "Autumn", translation: "Musim gugur", "example_sentence": "The leaves fall in autumn." },
  { word: "Available", translation: "Tersedia", "example_sentence": "Are there any tickets available?" },
  { word: "Avoid", translation: "Menghindari", "example_sentence": "You should avoid eating too much sugar." },
  { word: "Away", translation: "Menjauh", "example_sentence": "The birds flew away." },
  { word: "Awesome", translation: "Mengagumkan", "example_sentence": "That movie was awesome!" },
  { word: "Baby", translation: "Bayi", "example_sentence": "The baby is crying." },
  { word: "Back", translation: "Kembali / Belakang", "example_sentence": "I will come back soon." },
  { word: "Bad", translation: "Buruk", "example_sentence": "Smoking is a bad habit." },
  { word: "Bag", translation: "Tas", "example_sentence": "I bought a new leather bag." },
  { word: "Bake", translation: "Memanggang", "example_sentence": "She likes to bake cookies on weekends." },
  { word: "Ball", translation: "Bola", "example_sentence": "The children are playing with a ball." },
  { word: "Banana", translation: "Pisang", "example_sentence": "Monkeys love to eat bananas." },
  { word: "Band", translation: "Kelompok / Band", "example_sentence": "He plays guitar in a rock band." },
  { word: "Bank", translation: "Bank", "example_sentence": "I need to go to the bank to get some cash." },
  { word: "Bar", translation: "Bar / Batang", "example_sentence": "He bought a bar of chocolate." },
  { word: "Base", translation: "Dasar", "example_sentence": "The base of the mountain is very wide." },
  { word: "Baseball", translation: "Bisbol", "example_sentence": "We went to a baseball game." },
  { word: "Basic", translation: "Dasar / Utama", "example_sentence": "Water is a basic human need." },
  { word: "Basket", translation: "Keranjang", "example_sentence": "Put the fruits in the basket." },
  { word: "Basketball", translation: "Bola basket", "example_sentence": "He plays basketball every evening." },
  { word: "Bath", translation: "Mandi", "example_sentence": "I want to take a warm bath." },
  { word: "Bathroom", translation: "Kamar mandi", "example_sentence": "The bathroom is on the left." },
  { word: "Be", translation: "Menjadi", "example_sentence": "I want to be a doctor." },
  { word: "Beach", translation: "Pantai", "example_sentence": "We walked along the beautiful beach." },
  { word: "Bear", translation: "Beruang", "example_sentence": "I saw a big brown bear in the forest." },
  { word: "Beat", translation: "Mengalahkan", "example_sentence": "Our team beat them 3-0." },
  { word: "Beautiful", translation: "Cantik", "example_sentence": "She was wearing a beautiful dress." },
  { word: "Because", translation: "Karena", "example_sentence": "I stayed at home because it rained." },
  { word: "Become", translation: "Menjadi", "example_sentence": "Caterpillars become butterflies." },
  { word: "Bed", translation: "Tempat tidur", "example_sentence": "It is time to go to bed." },
  { word: "Bedroom", translation: "Kamar tidur", "example_sentence": "His bedroom is always clean." },
  { word: "Beef", translation: "Daging sapi", "example_sentence": "We had roast beef for dinner." },
  { word: "Before", translation: "Sebelum", "example_sentence": "Wash your hands before eating." },
  { word: "Begin", translation: "Memulai", "example_sentence": "Let us begin the lesson." },
  { word: "Behavior", translation: "Tingkah laku", "example_sentence": "His behavior was very strange yesterday." },
  { word: "Behind", translation: "Di belakang", "example_sentence": "The cat is hiding behind the sofa." },
  { word: "Believe", translation: "Percaya", "example_sentence": "I believe that you can do it!" },
  { word: "Bell", translation: "Lonceng", "example_sentence": "The church bell rang at noon." },
  { word: "Below", translation: "Di bawah", "example_sentence": "Please read the instructions below." },
  { word: "Belt", translation: "Sabuk", "example_sentence": "He is wearing a brown leather belt." },
  { word: "Benefit", translation: "Manfaat", "example_sentence": "Exercising has many health benefits." },
  { word: "Best", translation: "Terbaik", "example_sentence": "He is my best friend." },
  { word: "Better", translation: "Lebih baik", "example_sentence": "I feel much better today." }
];

async function seed() {
  console.log('Initiating bulk Oxford 3000 Stage 2 insertion (Next 80 words)...');

  const payload = next80Words.map((w) => ({
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
    console.log('SEEDING SUCCESSFUL! Next 80 Legacy words injected globally.');
  }
}

seed();
