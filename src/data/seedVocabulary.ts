import { supabase } from '../lib/supabase';
import type { VocabWord } from '../types';

export const seedWords: Omit<VocabWord, 'id' | 'created_at'>[] = [
  {
    word: "Abandon",
    pronunciation: "/əˈbæn.dən/",
    meaning_id: "Meninggalkan",
    meaning_en: "To leave a place, thing, or person, usually forever",
    level: "B2",
    category: "verb",
    example_sentence: "We had to abandon our old van in the outback when the engine died.",
    example_translation: "Kami harus meninggalkan van tua kami di pedalaman saat mesinnya mati.",
    difficulty: "intermediate",
    tags: ["oxford5000"]
  },
  {
    word: "Able",
    pronunciation: "/ˈeɪ.bəl/",
    meaning_id: "Sanggup",
    meaning_en: "Having the necessary power, skill, or opportunity to do something",
    level: "A2",
    category: "adjective",
    example_sentence: "Will you be able to finish picking these apples by noon?",
    example_translation: "Apakah kamu sanggup selesai memetik apel-apel ini sebelum siang?",
    difficulty: "beginner",
    tags: ["oxford3000"]
  },
  {
    word: "About",
    pronunciation: "/əˈbaʊt/",
    meaning_id: "Tentang",
    meaning_en: "On the subject of, or connected with",
    level: "A1",
    category: "preposition",
    example_sentence: "My boss was talking about the new harvesting schedule.",
    example_translation: "Bos saya sedang berbicara tentang jadwal panen yang baru.",
    difficulty: "beginner",
    tags: ["oxford3000"]
  },
  {
    word: "Above",
    pronunciation: "/əˈbʌv/",
    meaning_id: "Di atas",
    meaning_en: "In or to a higher position than something else",
    level: "A1",
    category: "preposition",
    example_sentence: "Put the spare tools on the shelf above the sink.",
    example_translation: "Letakkan perkakas cadangan di rak di atas wastafel.",
    difficulty: "beginner",
    tags: ["oxford3000"]
  },
  {
    word: "Abroad",
    pronunciation: "/əˈbrɔːd/",
    meaning_id: "Luar negeri",
    meaning_en: "In or to a foreign country or countries",
    level: "A2",
    category: "adverb",
    example_sentence: "Working abroad in Australia is a life-changing experience.",
    example_translation: "Bekerja di luar negeri di Australia adalah pengalaman yang mengubah hidup.",
    difficulty: "beginner",
    tags: ["oxford3000", "travel"]
  },
  {
    word: "Absolute",
    pronunciation: "/ˈæb.sə.luːt/",
    meaning_id: "Mutlak",
    meaning_en: "Very great or to the largest degree possible",
    level: "B2",
    category: "adjective",
    example_sentence: "Wearing sunscreen on the farm is an absolute necessity.",
    example_translation: "Memakai tabir surya di peternakan adalah kebutuhan mutlak.",
    difficulty: "intermediate",
    tags: ["oxford5000"]
  },
  {
    word: "Academic",
    pronunciation: "/ˌæk.əˈdem.ɪk/",
    meaning_id: "Akademik",
    meaning_en: "Relating to schools, colleges, and universities",
    level: "B1",
    category: "adjective",
    example_sentence: "He wants to apply for a student visa for academic studies after his WHV.",
    example_translation: "Dia ingin mengajukan visa pelajar untuk studi akademik setelah masa WHV-nya.",
    difficulty: "intermediate",
    tags: ["oxford3000"]
  },
  {
    word: "Accept",
    pronunciation: "/əkˈsept/",
    meaning_id: "Menerima",
    meaning_en: "To agree to take something",
    level: "A2",
    category: "verb",
    example_sentence: "The supervisor agreed to accept my leave request next week.",
    example_translation: "Supervisor setuju untuk menerima permintaan cuti saya minggu depan.",
    difficulty: "beginner",
    tags: ["oxford3000"]
  },
  {
    word: "Access",
    pronunciation: "/ˈæk.ses/",
    meaning_id: "Akses",
    meaning_en: "The right or opportunity to use or look at something",
    level: "B1",
    category: "noun",
    example_sentence: "Our working hostel provides free access to Wi-Fi.",
    example_translation: "Hostel pekerja kami menyediakan akses internet gratis.",
    difficulty: "intermediate",
    tags: ["oxford3000"]
  },
  {
    word: "Accompany",
    pronunciation: "/əˈkʌm.pə.ni/",
    meaning_id: "Menemani",
    meaning_en: "To go with someone or to be provided or exist at the same time",
    level: "B2",
    category: "verb",
    example_sentence: "Can you accompany me to the bank to open my account?",
    example_translation: "Bisakah kamu menemani saya ke bank untuk membuka rekening?",
    difficulty: "intermediate",
    tags: ["oxford5000"]
  },
  {
    word: "According to",
    pronunciation: "/əˈkɔː.dɪŋ tuː/",
    meaning_id: "Menurut",
    meaning_en: "As stated by",
    level: "A2",
    category: "preposition",
    example_sentence: "According to the weather forecast, it will be extremely hot tomorrow.",
    example_translation: "Menurut prakiraan cuaca, besok akan sangat panas.",
    difficulty: "beginner",
    tags: ["oxford3000"]
  },
  {
    word: "Account",
    pronunciation: "/əˈkaʊnt/",
    meaning_id: "Akun / Rekening",
    meaning_en: "An arrangement with a bank to keep your money there",
    level: "B1",
    category: "noun",
    example_sentence: "I need to set up my Australian bank account for my weekly wage.",
    example_translation: "Saya harus membuka rekening bank Australia untuk gaji mingguan saya.",
    difficulty: "intermediate",
    tags: ["oxford3000", "finance"]
  },
  {
    word: "Accurate",
    pronunciation: "/ˈæk.jə.rət/",
    meaning_id: "Akurat",
    meaning_en: "Correct, exact, and without any mistakes",
    level: "B2",
    category: "adjective",
    example_sentence: "Make sure all the details on your visa application are accurate.",
    example_translation: "Pastikan semua detail di aplikasi visamu akurat.",
    difficulty: "intermediate",
    tags: ["oxford5000"]
  },
  {
    word: "Accuse",
    pronunciation: "/əˈkjuːz/",
    meaning_id: "Menuduh",
    meaning_en: "To say that someone has done something morally wrong, illegal, or unkind",
    level: "B2",
    category: "verb",
    example_sentence: "The manager accused him of leaving work early.",
    example_translation: "Manajer menuduhnya pulang kerja lebih awal.",
    difficulty: "intermediate",
    tags: ["oxford5000"]
  },
  {
    word: "Achieve",
    pronunciation: "/əˈtʃiːv/",
    meaning_id: "Mencapai",
    meaning_en: "To succeed in finishing something or reaching an aim",
    level: "A2",
    category: "verb",
    example_sentence: "I want to achieve my savings goal by the end of my first year.",
    example_translation: "Saya ingin mencapai target tabungan saya di akhir tahun pertama.",
    difficulty: "beginner",
    tags: ["oxford3000", "goals"]
  },
  {
    word: "Acknowledge",
    pronunciation: "/əkˈnɒl.ɪdʒ/",
    meaning_id: "Mengakui",
    meaning_en: "To accept, admit, or recognize something, or the truth of something",
    level: "B2",
    category: "verb",
    example_sentence: "The farmer acknowledged our hard work during the harvest season.",
    example_translation: "Petani tersebut mengakui kerja keras kami selama musim panen.",
    difficulty: "intermediate",
    tags: ["oxford5000"]
  },
  {
    word: "Acquire",
    pronunciation: "/əˈkwaɪər/",
    meaning_id: "Memperoleh",
    meaning_en: "To get or buy something",
    level: "B2",
    category: "verb",
    example_sentence: "You will acquire many new skills while working holiday in Australia.",
    example_translation: "Kamu akan memperoleh banyak keterampilan baru saat liburan kerja di Australia.",
    difficulty: "intermediate",
    tags: ["oxford5000"]
  },
  {
    word: "Across",
    pronunciation: "/əˈkrɒs/",
    meaning_id: "Di seberang",
    meaning_en: "From one side to the other side of something",
    level: "A1",
    category: "preposition",
    example_sentence: "The tram stop is just across the street from the hostel.",
    example_translation: "Pemberhentian trem tepat di seberang jalan dari hostel.",
    difficulty: "beginner",
    tags: ["oxford3000", "direction"]
  },
  {
    word: "Act",
    pronunciation: "/ækt/",
    meaning_id: "Bertindak",
    meaning_en: "To behave in the stated way",
    level: "A2",
    category: "verb",
    example_sentence: "We must act quickly if there is a bushfire warning.",
    example_translation: "Kita harus bertindak cepat jika ada peringatan kebakaran semak.",
    difficulty: "beginner",
    tags: ["oxford3000"]
  },
  {
    word: "Action",
    pronunciation: "/ˈæk.ʃən/",
    meaning_id: "Tindakan",
    meaning_en: "The process of doing something, especially in order to deal with a problem",
    level: "A1",
    category: "noun",
    example_sentence: "Taking action immediately can prevent accidents on the farm.",
    example_translation: "Mengambil tindakan segera bisa mencegah kecelakaan di peternakan.",
    difficulty: "beginner",
    tags: ["oxford3000"]
  },
  {
    word: "Active",
    pronunciation: "/ˈæk.tɪv/",
    meaning_id: "Aktif",
    meaning_en: "Busy with a particular activity",
    level: "A2",
    category: "adjective",
    example_sentence: "Staying active is easy when you pick fruits all day.",
    example_translation: "Tetap aktif itu mudah saat kamu memetik buah seharian.",
    difficulty: "beginner",
    tags: ["oxford3000"]
  },
  {
    word: "Activity",
    pronunciation: "/ækˈtɪv.ə.ti/",
    meaning_id: "Aktivitas",
    meaning_en: "The situation in which a lot of things are happening or people are moving around",
    level: "A1",
    category: "noun",
    example_sentence: "Surfing is a very popular outdoor activity here.",
    example_translation: "Selancar adalah aktivitas luar ruangan yang sangat populer di sini.",
    difficulty: "beginner",
    tags: ["oxford3000"]
  },
  {
    word: "Actor",
    pronunciation: "/ˈæk.tər/",
    meaning_id: "Aktor",
    meaning_en: "Someone who pretends to be someone else while performing in a film, play, or television",
    level: "A1",
    category: "noun",
    example_sentence: "Chris Hemsworth is a very famous Australian actor.",
    example_translation: "Chris Hemsworth adalah aktor Australia yang sangat terkenal.",
    difficulty: "beginner",
    tags: ["oxford3000"]
  },
  {
    word: "Actress",
    pronunciation: "/ˈæk.trəs/",
    meaning_id: "Aktris",
    meaning_en: "A woman who pretends to be someone else while performing",
    level: "A1",
    category: "noun",
    example_sentence: "Margot Robbie is a well-known actress from Queensland.",
    example_translation: "Margot Robbie adalah seorang aktris terkenal dari Queensland.",
    difficulty: "beginner",
    tags: ["oxford3000"]
  },
  {
    word: "Actual",
    pronunciation: "/ˈæk.tʃu.əl/",
    meaning_id: "Sebenarnya",
    meaning_en: "Existing in fact",
    level: "B2",
    category: "adjective",
    example_sentence: "The actual pay rate depends on how fast you pick the fruits.",
    example_translation: "Tingkat bayaran sebenarnya tergantung pada seberapa cepat kamu memetik buah.",
    difficulty: "intermediate",
    tags: ["oxford5000"]
  },
  {
    word: "Actually",
    pronunciation: "/ˈæk.tʃu.ə.li/",
    meaning_id: "Sebenarnya",
    meaning_en: "Used to emphasize what is real or true",
    level: "A2",
    category: "adverb",
    example_sentence: "Actually, finding regional work was easier than I thought.",
    example_translation: "Sebenarnya, mencari kerja pedalaman lebih mudah dari yang saya kira.",
    difficulty: "beginner",
    tags: ["oxford3000"]
  },
  {
    word: "Adapt",
    pronunciation: "/əˈdæpt/",
    meaning_id: "Beradaptasi",
    meaning_en: "To change, or to change something, to suit different conditions or uses",
    level: "B2",
    category: "verb",
    example_sentence: "You have to adapt to the hot weather in Northern Territory.",
    example_translation: "Kamu harus beradaptasi dengan cuaca panas di Northern Territory.",
    difficulty: "intermediate",
    tags: ["oxford5000"]
  },
  {
    word: "Add",
    pronunciation: "/æd/",
    meaning_id: "Menambahkan",
    meaning_en: "To put something with something else to increase the number or amount",
    level: "A1",
    category: "verb",
    example_sentence: "Please add your phone number to the application form.",
    example_translation: "Tolong tambahkan nomor telepon Anda di formulir pendaftaran.",
    difficulty: "beginner",
    tags: ["oxford3000"]
  },
  {
    word: "Addition",
    pronunciation: "/əˈdɪʃ.ən/",
    meaning_id: "Tambahan",
    meaning_en: "The process of adding numbers or amounts together",
    level: "B1",
    category: "noun",
    example_sentence: "In addition to your passport, you need to show your visa grant notice.",
    example_translation: "Sebagai tambahan selain paspormu, kamu perlu menunjukkan surat persetujuan visa.",
    difficulty: "intermediate",
    tags: ["oxford3000"]
  },
  {
    word: "Additional",
    pronunciation: "/əˈdɪʃ.ən.əl/",
    meaning_id: "Tambahan",
    meaning_en: "Extra",
    level: "B2",
    category: "adjective",
    example_sentence: "You can work an additional three months if you complete regional work.",
    example_translation: "Kamu bisa bekerja tiga bulan tambahan jika kamu menyelesaikan kerjapedalaman.",
    difficulty: "intermediate",
    tags: ["oxford5000"]
  },
  {
    word: "Address",
    pronunciation: "/əˈdres/",
    meaning_id: "Alamat",
    meaning_en: "The number of the house, name of the road, and name of the town where a person lives or works",
    level: "A1",
    category: "noun",
    example_sentence: "I updated my mailing address at the post office.",
    example_translation: "Saya memperbarui alamat surat menyurat saya di kantor pos.",
    difficulty: "beginner",
    tags: ["oxford3000"]
  },
  {
    word: "Adequate",
    pronunciation: "/ˈæd.ə.kwət/",
    meaning_id: "Memadai",
    meaning_en: "Enough or satisfactory for a particular purpose",
    level: "B2",
    category: "adjective",
    example_sentence: "Make sure you pack adequate clothing for the cold Melbourne winter.",
    example_translation: "Pastikan kamu mengepak pakaian yang memadai untuk musim dingin Melbourne yang dingin.",
    difficulty: "intermediate",
    tags: ["oxford5000"]
  },
  {
    word: "Adjust",
    pronunciation: "/əˈdʒʌst/",
    meaning_id: "Menyesuaikan",
    meaning_en: "To change something slightly, especially to make it more correct, effective, or suitable",
    level: "B2",
    category: "verb",
    example_sentence: "It took a few weeks to adjust to the Australian accent.",
    example_translation: "Butuh beberapa minggu untuk menyesuaikan diri dengan aksen Australia.",
    difficulty: "intermediate",
    tags: ["oxford5000"]
  },
  {
    word: "Administration",
    pronunciation: "/ədˌmɪn.ɪˈstreɪ.ʃən/",
    meaning_id: "Administrasi",
    meaning_en: "The arrangements and tasks needed to control the operation of a plan or organization",
    level: "B2",
    category: "noun",
    example_sentence: "The farm's administration office handles all our pay slips.",
    example_translation: "Kantor administrasi peternakan menangani semua slip gaji kami.",
    difficulty: "intermediate",
    tags: ["oxford5000"]
  },
  {
    word: "Admire",
    pronunciation: "/ədˈmaɪər/",
    meaning_id: "Mengagumi",
    meaning_en: "To find someone or something attractive and pleasant to look at",
    level: "B1",
    category: "verb",
    example_sentence: "Many tourists admire the beauty of the Great Barrier Reef.",
    example_translation: "Banyak turis mengagumi keindahan Karang Penghalang Besar.",
    difficulty: "intermediate",
    tags: ["oxford3000"]
  },
  {
    word: "Admission",
    pronunciation: "/ədˈmɪʃ.ən/",
    meaning_id: "Penerimaan / Tiket Masuk",
    meaning_en: "The act of agreeing that something is true, or the money you pay to enter",
    level: "B2",
    category: "noun",
    example_sentence: "Admission to the national park is free on public holidays.",
    example_translation: "Tiket masuk ke taman nasional gratis di hari libur nasional.",
    difficulty: "intermediate",
    tags: ["oxford5000"]
  },
  {
    word: "Admit",
    pronunciation: "/ədˈmɪt/",
    meaning_id: "Mengakui",
    meaning_en: "To agree that something is true, especially unwillingly",
    level: "B1",
    category: "verb",
    example_sentence: "I must admit, the work here is harder than I expected.",
    example_translation: "Saya harus mengakui, kerja di sini lebih keras dari perkiraan saya.",
    difficulty: "intermediate",
    tags: ["oxford3000"]
  },
  {
    word: "Adopt",
    pronunciation: "/əˈdɒpt/",
    meaning_id: "Mengadopsi",
    meaning_en: "To legally take another person's child into your own family",
    level: "B2",
    category: "verb",
    example_sentence: "My host family plans to adopt a rescue dog from the shelter.",
    example_translation: "Keluarga angkat saya berencana mengadopsi anjing penyelamat dari tempat penampungan.",
    difficulty: "intermediate",
    tags: ["oxford5000"]
  },
  {
    word: "Adult",
    pronunciation: "/ˈæd.ʌlt/",
    meaning_id: "Dewasa",
    meaning_en: "A person or animal that has grown to full size and strength",
    level: "A1",
    category: "noun",
    example_sentence: "An adult kangaroo can jump very high.",
    example_translation: "Seekor kanguru dewasa bisa melompat sangat tinggi.",
    difficulty: "beginner",
    tags: ["oxford3000"]
  },
  {
    word: "Advance",
    pronunciation: "/ədˈvɑːns/",
    meaning_id: "Kemajuan / Muka",
    meaning_en: "To move forward or make progress",
    level: "B2",
    category: "noun",
    example_sentence: "You should book your train tickets to Sydney in advance.",
    example_translation: "Kamu harus memesan tiket kereta ke Sydney di muka (lebih awal).",
    difficulty: "intermediate",
    tags: ["oxford5000"]
  },
  {
    word: "Advanced",
    pronunciation: "/ədˈvɑːnst/",
    meaning_id: "Lanjutan",
    meaning_en: "Modern and recently developed",
    level: "B1",
    category: "adjective",
    example_sentence: "You need advanced English skills for some hospitality roles.",
    example_translation: "Kamu butuh kemampuan bahasa Inggris tingkat lanjut untuk beberapa peran perhotelan.",
    difficulty: "intermediate",
    tags: ["oxford3000"]
  },
  {
    word: "Advantage",
    pronunciation: "/ədˈvɑːn.tɪdʒ/",
    meaning_id: "Keuntungan",
    meaning_en: "A condition giving a greater chance of success",
    level: "A2",
    category: "noun",
    example_sentence: "One advantage of WHV is that you can explore the whole country.",
    example_translation: "Satu keuntungan dari WHV adalah kamu bisa menjelajahi seluruh negara.",
    difficulty: "beginner",
    tags: ["oxford3000"]
  },
  {
    word: "Adventure",
    pronunciation: "/ədˈven.tʃər/",
    meaning_id: "Petualangan",
    meaning_en: "An unusual, exciting, and possibly dangerous activity",
    level: "A2",
    category: "noun",
    example_sentence: "Driving across the Nullarbor Plain is a big adventure.",
    example_translation: "Berkendara melintasi Dataran Nullarbor adalah petualangan besar.",
    difficulty: "beginner",
    tags: ["oxford3000", "travel"]
  },
  {
    word: "Advertise",
    pronunciation: "/ˈæd.və.taɪz/",
    meaning_id: "Mengiklankan",
    meaning_en: "To make something known generally or in public, especially to sell it",
    level: "B1",
    category: "verb",
    example_sentence: "Farmers advertise fruit-picking jobs online.",
    example_translation: "Para petani mengiklankan pekerjaan memetik buah secara online.",
    difficulty: "intermediate",
    tags: ["oxford3000"]
  },
  {
    word: "Advertisement",
    pronunciation: "/ədˈvɜː.tɪs.mənt/",
    meaning_id: "Iklan",
    meaning_en: "A picture, short film, song, etc. that tries to persuade people to buy a product or service",
    level: "A2",
    category: "noun",
    example_sentence: "I found this room for rent through an advertisement on Gumtree.",
    example_translation: "Saya menemukan kamar disewakan ini melalui iklan di Gumtree.",
    difficulty: "beginner",
    tags: ["oxford3000"]
  },
  {
    word: "Advertising",
    pronunciation: "/ˈæd.və.taɪ.zɪŋ/",
    meaning_id: "Periklanan",
    meaning_en: "The business of trying to persuade people to buy products or services",
    level: "B2",
    category: "noun",
    example_sentence: "Working in advertising pays well in the city.",
    example_translation: "Bekerja di bidang periklanan dibayar dengan baik di kota.",
    difficulty: "intermediate",
    tags: ["oxford5000"]
  },
  {
    word: "Advice",
    pronunciation: "/ədˈvaɪs/",
    meaning_id: "Nasihat",
    meaning_en: "An opinion that someone offers you about what you should do",
    level: "A1",
    category: "noun",
    example_sentence: "Can you give me some advice on buying a used car here?",
    example_translation: "Bisakah kamu memberi saya nasihat tentang membeli mobil bekas di sini?",
    difficulty: "beginner",
    tags: ["oxford3000"]
  },
  {
    word: "Advise",
    pronunciation: "/ədˈvaɪz/",
    meaning_id: "Menasihati",
    meaning_en: "To give someone advice",
    level: "B1",
    category: "verb",
    example_sentence: "They advise backpackers to always carry plenty of water.",
    example_translation: "Mereka menasihati para backpacker untuk selalu membawa banyak air.",
    difficulty: "intermediate",
    tags: ["oxford3000"]
  },
  {
    word: "Affair",
    pronunciation: "/əˈfeər/",
    meaning_id: "Urusan",
    meaning_en: "A situation or subject that is being dealt with or considered",
    level: "B2",
    category: "noun",
    example_sentence: "Sorting out taxes is a complicated affair for temporary residents.",
    example_translation: "Mengurus pajak adalah urusan yang rumit bagi penduduk sementara.",
    difficulty: "intermediate",
    tags: ["oxford5000"]
  },
  {
    word: "Affect",
    pronunciation: "/əˈfekt/",
    meaning_id: "Mempengaruhi",
    meaning_en: "To have an influence on someone or something, or to cause a change in someone or something",
    level: "A2",
    category: "verb",
    example_sentence: "Heavy rain can affect the harvesting schedule.",
    example_translation: "Hujan lebat dapat mempengaruhi jadwal panen.",
    difficulty: "beginner",
    tags: ["oxford3000", "weather"]
  }
];

export async function seedDatabase(): Promise<{ success: boolean; message?: string }> {
  try {
    const dbRows = seedWords.map((word) => ({
      word: word.word,
      pronunciation: word.pronunciation,
      meaning_id: word.meaning_id,
      meaning_en: word.meaning_en,
      example_sentence: word.example_sentence,
      example_translation: word.example_translation,
      level: word.level as string,
      category: word.category as string,
      difficulty: word.difficulty as string,
      tags: word.tags
    }));

    const { data, error } = await (supabase as any)
      .from('vocabulary')
      .upsert(dbRows, { onConflict: 'word', ignoreDuplicates: false })
      .select();

    if (error) {
      console.error('------- SUPABASE ERROR -------');
      console.error(JSON.stringify(error, null, 2));
      console.error('------------------------------');
      return { success: false, message: error.message };
    }

    console.log('Database seeded successfully! Rows inserted:', data?.length);
    return { success: true };
  } catch (err: any) {
    console.error('------- UNEXPECTED EXCEPTION -------');
    console.error(err);
    console.error('------------------------------------');
    return { success: false, message: err?.message || String(err) };
  }
}
