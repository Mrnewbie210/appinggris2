export interface Exercise {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const grammarExercises: Record<number, Exercise[]> = {
  1: [ // Noun IS
    { question: 'She ___ a doctor.', options: ['am', 'is', 'are', 'be'], correct: 1, explanation: 'Subjek "She" menggunakan to be "is".' },
    { question: 'The book ___ on the table.', options: ['are', 'am', 'is', 'be'], correct: 2, explanation: '"The book" adalah benda tunggal (it), jadi menggunakan "is".' },
    { question: 'He ___ my best friend.', options: ['is', 'are', 'am', 'being'], correct: 0, explanation: 'Subjek "He" selalu menggunakan "is".' },
    { question: 'It ___ a beautiful day.', options: ['are', 'am', 'be', 'is'], correct: 3, explanation: 'Subjek "It" menggunakan to be "is".' },
    { question: 'My father ___ a teacher.', options: ['are', 'is', 'am', 'be'], correct: 1, explanation: '"My father" sama dengan "He", sehingga menggunakan "is".' }
  ],
  2: [ // A dan An
    { question: 'I have ___ apple.', options: ['a', 'an', 'the', 'some'], correct: 1, explanation: '"Apple" diawali huruf vokal (a), jadi menggunakan "an".' },
    { question: 'She is ___ university student.', options: ['an', 'a', 'the', 'one'], correct: 1, explanation: '"University" dibaca dengan awalan bunyi konsonan (yu), jadi menggunakan "a".' },
    { question: 'He bought ___ new car.', options: ['an', 'a', 'the', 'two'], correct: 1, explanation: '"New" diawali konsonan, jadi menggunakan "a".' },
    { question: 'It takes ___ hour to get there.', options: ['a', 'an', 'the', 'some'], correct: 1, explanation: '"Hour" dibaca awalan vokal (our), sehingga menggunakan "an".' },
    { question: 'That is ___ interesting story.', options: ['a', 'an', 'the', 'many'], correct: 1, explanation: '"Interesting" diawali vokal (i), jadi menggunakan "an".' }
  ],
  3: [ // Noun Are
    { question: 'They ___ students.', options: ['is', 'am', 'are', 'be'], correct: 2, explanation: 'Subjek jamak "They" menggunakan to be "are".' },
    { question: 'The cats ___ sleeping.', options: ['is', 'am', 'are', 'was'], correct: 2, explanation: '"The cats" (jamak) menggunakan "are".' },
    { question: 'You and I ___ friends.', options: ['am', 'is', 'are', 'be'], correct: 2, explanation: '"You and I" berarti "We" (jamak), jadi menggunakan "are".' },
    { question: 'We ___ ready to go.', options: ['are', 'is', 'am', 'be'], correct: 0, explanation: 'Subjek "We" menggunakan "are".' },
    { question: 'The books ___ on the shelf.', options: ['is', 'am', 'are', 'be'], correct: 2, explanation: '"The books" (jamak) menggunakan "are".' }
  ],
  4: [ // Pronoun
    { question: '___ is reading a book. (Andi)', options: ['He', 'She', 'It', 'They'], correct: 0, explanation: 'Andi adalah laki-laki tunggal, jadi kata gantinya adalah "He".' },
    { question: 'Please give the pen to ___.', options: ['I', 'me', 'my', 'mine'], correct: 1, explanation: '"Me" digunakan sebagai objek dalam kalimat.' },
    { question: '___ are going to the park. (Siti and I)', options: ['They', 'We', 'You', 'She'], correct: 1, explanation: '"Siti and I" berarti kita ("We").' },
    { question: 'I saw ___ at the mall. (Sarah)', options: ['she', 'her', 'hers', 'him'], correct: 1, explanation: 'Sarah sebagai objek kalimat diganti dengan "her".' },
    { question: 'Look at ___! (The dog)', options: ['it', 'its', 'he', 'they'], correct: 0, explanation: 'Hewan tunggal yang tidak spesifik diganti dengan "it".' }
  ],
  5: [ // Negative Be Not
    { question: 'He ___ a doctor.', options: ['is not', 'are not', 'am not', 'not is'], correct: 0, explanation: 'Bentuk negatif untuk "He is" adalah "He is not".' },
    { question: 'They ___ happy today.', options: ['is not', 'are not', 'am not', 'not are'], correct: 1, explanation: 'Bentuk negatif untuk "They are" adalah "They are not".' },
    { question: 'I ___ tired.', options: ['is not', 'are not', 'am not', 'not am'], correct: 2, explanation: 'Bentuk negatif untuk "I am" adalah "I am not".' },
    { question: 'The movie ___ interesting.', options: ['are not', 'is not', 'am not', 'not'], correct: 1, explanation: '"The movie" (it) menggunakan "is not".' },
    { question: 'We ___ from London.', options: ['am not', 'is not', 'are not', 'not are'], correct: 2, explanation: 'Subjek "We" dipasangkan dengan "are not".' }
  ],
  6: [ // Adjectives
    { question: 'She is a ___ girl.', options: ['beauty', 'beautiful', 'beautifully', 'beautify'], correct: 1, explanation: '"Beautiful" adalah kata sifat (adjective) yang menerangkan kata benda "girl".' },
    { question: 'The coffee is very ___.', options: ['hot', 'hotly', 'heat', 'heating'], correct: 0, explanation: '"Hot" adalah kata sifat (adjective).' },
    { question: 'He runs fast, but he is a ___ walker.', options: ['slow', 'slowly', 'slowness', 'slowed'], correct: 0, explanation: '"Slow" adalah kata sifat untuk menerangkan "walker".' },
    { question: 'They live in a ___ house.', options: ['big', 'bigness', 'bigly', 'bigger'], correct: 0, explanation: '"Big" adalah kata sifat dasar.' },
    { question: 'This test is completely ___.', options: ['easy', 'easily', 'ease', 'easiness'], correct: 0, explanation: '"Easy" adalah kata sifat yang menjelaskan "test".' }
  ],
  7: [ // Questions with Be
    { question: '___ she a student?', options: ['Am', 'Is', 'Are', 'Be'], correct: 1, explanation: 'Untuk subjek "she", to be di awal pertanyaan adalah "Is".' },
    { question: '___ they coming to the party?', options: ['Is', 'Am', 'Are', 'Do'], correct: 2, explanation: 'Untuk subjek "they", to be di awal pertanyaan adalah "Are".' },
    { question: '___ I late?', options: ['Is', 'Am', 'Are', 'Do'], correct: 1, explanation: 'Untuk subjek "I", to be di awal pertanyaan adalah "Am".' },
    { question: '___ the food good?', options: ['Are', 'Am', 'Is', 'Do'], correct: 2, explanation: '"The food" (it) menggunakan "Is".' },
    { question: '___ we ready?', options: ['Is', 'Am', 'Are', 'Do'], correct: 2, explanation: 'Subjek "we" menggunakan "Are" untuk bertanya.' }
  ],
  8: [ // Possessive Adjectives
    { question: 'I lost ___ keys.', options: ['me', 'mine', 'my', 'I'], correct: 2, explanation: '"My" menunjukkan kepemilikan dari "I".' },
    { question: 'She loves ___ dog.', options: ['she', 'hers', 'her', 'him'], correct: 2, explanation: '"Her" menunjukkan kepemilikan dari "She".' },
    { question: 'They parked ___ car here.', options: ['they', 'them', 'their', 'theirs'], correct: 2, explanation: '"Their" menunjukkan kepemilikan dari "They".' },
    { question: 'We are painting ___ house.', options: ['us', 'our', 'ours', 'we'], correct: 1, explanation: '"Our" menunjukkan kepemilikan dari "We".' },
    { question: 'The cat is drinking ___ milk.', options: ['it', 'its', 'his', 'her'], correct: 1, explanation: '"Its" menunjukkan kepemilikan dari "It" (hewan).' }
  ],
  9: [ // Have dan Has
    { question: 'She ___ a new phone.', options: ['have', 'has', 'having', 'had'], correct: 1, explanation: 'Subjek "She" menggunakan "has".' },
    { question: 'They ___ a big house.', options: ['have', 'has', 'having', 'had'], correct: 0, explanation: 'Subjek "They" menggunakan "have".' },
    { question: 'I ___ two brothers.', options: ['has', 'having', 'have', 'had'], correct: 2, explanation: 'Subjek "I" menggunakan "have".' },
    { question: 'He ___ a lot of work to do.', options: ['have', 'has', 'having', 'had'], correct: 1, explanation: 'Subjek "He" menggunakan "has".' },
    { question: 'We ___ plenty of time.', options: ['has', 'having', 'had', 'have'], correct: 3, explanation: 'Subjek "We" menggunakan "have".' }
  ],
  10: [ // What
    { question: '___ is your name?', options: ['Who', 'Where', 'What', 'When'], correct: 2, explanation: '"What" digunakan untuk menanyakan benda atau informasi (nama).' },
    { question: '___ are you doing?', options: ['When', 'What', 'Where', 'Who'], correct: 1, explanation: '"What" menanyakan aktivitas/apa yang sedang dilakukan.' },
    { question: '___ time is it?', options: ['Where', 'Who', 'What', 'When'], correct: 2, explanation: '"What time" digunakan untuk menanyakan jam.' },
    { question: '___ is in the box?', options: ['Who', 'What', 'Where', 'Why'], correct: 1, explanation: '"What" menanyakan benda apa di dalam kotak.' },
    { question: '___ do you want for dinner?', options: ['Who', 'What', 'Where', 'When'], correct: 1, explanation: '"What" menanyakan menu/apa yang diinginkan.' }
  ],
  11: [ // Who
    { question: '___ is that man?', options: ['What', 'Where', 'Who', 'When'], correct: 2, explanation: '"Who" menanyakan identitas orang.' },
    { question: '___ left the door open?', options: ['What', 'Who', 'Where', 'Why'], correct: 1, explanation: '"Who" menanyakan siapa pelakunya.' },
    { question: '___ are you talking to?', options: ['What', 'Where', 'When', 'Who'], correct: 3, explanation: '"Who" menanyakan orang.' },
    { question: '___ is your favorite singer?', options: ['Who', 'What', 'Which', 'When'], correct: 0, explanation: '"Who" menanyakan siapa penyanyi tersebut.' },
    { question: '___ wants some ice cream?', options: ['What', 'Where', 'Who', 'Why'], correct: 2, explanation: '"Who" menanyakan siapa orang yang mau.' }
  ],
  12: [ // Simple Present
    { question: 'I ___ to school every day.', options: ['goes', 'go', 'going', 'went'], correct: 1, explanation: 'Subjek "I" memakai verb dasar (go) tanpa s/es.' },
    { question: 'She ___ English perfectly.', options: ['speak', 'speaks', 'speaking', 'spoke'], correct: 1, explanation: 'Subjek tunggal "She" menambahkan "s/es" pada kata kerja (speaks).' },
    { question: 'They ___ soccer on weekends.', options: ['play', 'plays', 'playing', 'played'], correct: 0, explanation: 'Subjek jamak "They" memakai verb dasar (play).' },
    { question: 'He ___ in an office.', options: ['work', 'works', 'working', 'worked'], correct: 1, explanation: 'Subjek tunggal "He" menambahkan "s/es" (works).' },
    { question: 'The sun ___ in the east.', options: ['rise', 'rises', 'rising', 'rose'], correct: 1, explanation: 'Fakta umum dengan subjek tunggal "The sun" memakai verb+s/es (rises).' }
  ],
  13: [ // Habits
    { question: 'I always ___ up at 6 AM.', options: ['wakes', 'waking', 'wake', 'woke'], correct: 2, explanation: 'Rutinitas dengan "I" memakai verb 1 dasar (wake).' },
    { question: 'He usually ___ coffee in the morning.', options: ['drink', 'drinks', 'drinking', 'drank'], correct: 1, explanation: 'Kebiasaan dengan subjek "He" memakai verb+s (drinks).' },
    { question: 'They often ___ their grandparents.', options: ['visits', 'visiting', 'visit', 'visited'], correct: 2, explanation: 'Subjek "They" memakai verb 1 dasar (visit).' },
    { question: 'She ___ a diary every night.', options: ['write', 'writes', 'writing', 'wrote'], correct: 1, explanation: 'Subjek "She" memakai verb+s (writes).' },
    { question: 'We normally ___ dinner together.', options: ['eat', 'eats', 'eating', 'ate'], correct: 0, explanation: 'Subjek "We" memakai verb 1 dasar (eat).' }
  ],
  14: [ // Adverbs of Frequency
    { question: 'He ___ arrives late.', options: ['never', 'is never', 'never is', 'not never'], correct: 0, explanation: 'Adverb of frequency diletakkan sebelum verb utama (never arrives).' },
    { question: 'I ___ go to the gym on Mondays.', options: ['always', 'am always', 'always am', 'always is'], correct: 0, explanation: 'Adverb of frequency "always" berada sebelum verb "go".' },
    { question: 'She is ___ happy.', options: ['always', 'always is', 'is always', 'always are'], correct: 0, explanation: 'Untuk kalimat dengan "to be", adverb diletakkan SETELAH to be (is always).' },
    { question: 'They ___ watch TV at night.', options: ['sometimes', 'are sometimes', 'sometimes are', 'some'], correct: 0, explanation: 'Adverb "sometimes" berada sebelum verb "watch".' },
    { question: 'We ___ eat junk food.', options: ['rarely', 'rarely are', 'are rarely', 'rare'], correct: 0, explanation: '"Rarely" berada sebelum verb "eat".' }
  ],
  15: [ // Do Not dan Does Not
    { question: 'I ___ like apples.', options: ['does not', 'do not', 'am not', 'is not'], correct: 1, explanation: 'Subjek "I" menggunakan "do not".' },
    { question: 'She ___ play tennis.', options: ['do not', 'does not', 'is not', 'not'], correct: 1, explanation: 'Subjek "She" menggunakan "does not".' },
    { question: 'They ___ know the answer.', options: ['does not', 'do not', 'are not', 'not'], correct: 1, explanation: 'Subjek "They" menggunakan "do not".' },
    { question: 'He ___ work on Sundays.', options: ['do not', 'does not', 'is not', 'are not'], correct: 1, explanation: 'Subjek "He" menggunakan "does not".' },
    { question: 'We ___ want to go.', options: ['does not', 'is not', 'do not', 'are not'], correct: 2, explanation: 'Subjek "We" menggunakan "do not".' }
  ],
  16: [ // Bertanya dengan Do/Does
    { question: '___ you like pizza?', options: ['Does', 'Do', 'Are', 'Is'], correct: 1, explanation: 'Subjek "you" menggunakan "Do" di awal kalimat tanya.' },
    { question: '___ she live here?', options: ['Do', 'Does', 'Is', 'Are'], correct: 1, explanation: 'Subjek "she" menggunakan "Does".' },
    { question: '___ they speak English?', options: ['Does', 'Are', 'Do', 'Is'], correct: 2, explanation: 'Subjek "they" menggunakan "Do".' },
    { question: '___ he work fast?', options: ['Do', 'Is', 'Are', 'Does'], correct: 3, explanation: 'Subjek "he" menggunakan "Does".' },
    { question: '___ we have enough time?', options: ['Does', 'Do', 'Are', 'Is'], correct: 1, explanation: 'Subjek "we" menggunakan "Do".' }
  ],
  17: [ // Where
    { question: '___ do you live?', options: ['What', 'When', 'Where', 'Who'], correct: 2, explanation: '"Where" menanyakan tempat.' },
    { question: '___ is my book?', options: ['Where', 'Who', 'What', 'When'], correct: 0, explanation: '"Where" menanyakan lokasi.' },
    { question: '___ does she work?', options: ['What', 'When', 'Where', 'Who'], correct: 2, explanation: '"Where" menanyakan tempat kerja.' },
    { question: '___ are we going?', options: ['When', 'What', 'Who', 'Where'], correct: 3, explanation: '"Where" menanyakan tempat tujuan.' },
    { question: '___ do they buy their groceries?', options: ['Who', 'What', 'Where', 'When'], correct: 2, explanation: '"Where" menanyakan tempat membeli.' }
  ],
  18: [ // When dan What Time
    { question: '___ do you wake up?', options: ['Where', 'Who', 'What time', 'Why'], correct: 2, explanation: '"What time" secara spesifik menanyakan jam.' },
    { question: '___ is your birthday?', options: ['Where', 'When', 'What time', 'Who'], correct: 1, explanation: '"When" menanyakan waktu secara umum (tanggal/bulan).' },
    { question: '___ does the train leave?', options: ['Who', 'What time', 'Where', 'Why'], correct: 1, explanation: '"What time" menanyakan jadwal jam kereta berangkat.' },
    { question: '___ did you arrive?', options: ['Where', 'When', 'Who', 'What'], correct: 1, explanation: '"When" menanyakan waktu kedatangan.' },
    { question: '___ does the meeting start?', options: ['What time', 'Who', 'Where', 'Why'], correct: 0, explanation: '"What time" menanyakan jam mulai rapat.' }
  ],
  19: [ // Present Continuous
    { question: 'I ___ reading a book right now.', options: ['am', 'is', 'are', 'be'], correct: 0, explanation: 'Subjek "I" menggunakan to be "am" + Verb-ing.' },
    { question: 'She is ___ dinner.', options: ['cook', 'cooks', 'cooking', 'cooked'], correct: 2, explanation: 'Present continuous memakai Verb-ing (cooking).' },
    { question: 'They ___ playing football.', options: ['is', 'am', 'are', 'do'], correct: 2, explanation: 'Subjek "They" menggunakan "are".' },
    { question: 'We are ___ to music.', options: ['listen', 'listens', 'listening', 'listened'], correct: 2, explanation: 'Present continuous memakai Verb-ing (listening).' },
    { question: 'He ___ sleeping on the sofa.', options: ['are', 'am', 'is', 'be'], correct: 2, explanation: 'Subjek "He" menggunakan "is".' }
  ],
  20: [ // Pertanyaan Present Continuous
    { question: '___ you listening to me?', options: ['Do', 'Are', 'Is', 'Am'], correct: 1, explanation: 'Pertanyaan untuk "you" + V-ing menggunakan "Are".' },
    { question: '___ she crying?', options: ['Does', 'Is', 'Are', 'Do'], correct: 1, explanation: 'Pertanyaan untuk "she" + V-ing menggunakan "Is".' },
    { question: '___ they coming with us?', options: ['Are', 'Do', 'Is', 'Does'], correct: 0, explanation: 'Pertanyaan untuk "they" + V-ing menggunakan "Are".' },
    { question: 'What ___ he doing?', options: ['do', 'is', 'are', 'does'], correct: 1, explanation: 'Pertanyaan WH untuk "he" + V-ing menggunakan "is".' },
    { question: 'Why ___ you running?', options: ['do', 'are', 'is', 'does'], correct: 1, explanation: 'Pertanyaan WH untuk "you" + V-ing menggunakan "are".' }
  ],
  21: [ // Non Action Verbs
    { question: 'I ___ the answer. (know)', options: ['am knowing', 'know', 'knows', 'knowing'], correct: 1, explanation: '"Know" adalah non-action verb, tidak bisa pakai bentuk -ing.' },
    { question: 'She ___ this song. (like)', options: ['likes', 'is liking', 'like', 'liking'], correct: 0, explanation: '"Like" adalah non-action verb, gunakan Simple Present (likes).' },
    { question: 'I ___ you. (believe)', options: ['am believing', 'believe', 'believes', 'believing'], correct: 1, explanation: '"Believe" adalah non-action verb.' },
    { question: 'This soup ___ good. (taste)', options: ['tastes', 'is tasting', 'taste', 'tasting'], correct: 0, explanation: '"Taste" (merasa) umumnya non-action verb (tastes).' },
    { question: 'He ___ to be tired. (seem)', options: ['is seeming', 'seem', 'seems', 'seeming'], correct: 2, explanation: '"Seem" adalah non-action verb, gunakan Simple Present (seems).' }
  ],
  22: [ // Menanyakan Waktu
    { question: '___ is it today? It is Monday.', options: ['What time', 'What day', 'When', 'What month'], correct: 1, explanation: 'Untuk menanyakan hari, gunakan "What day".' },
    { question: '___ is the meeting? On July 5th.', options: ['What day', 'What time', 'When', 'Who'], correct: 2, explanation: 'Untuk menanyakan tanggal kejadian, "When" paling tepat.' },
    { question: '___ year were you born?', options: ['What', 'When', 'Which', 'How'], correct: 0, explanation: 'Untuk menanyakan tahun secara spesifik, "What year" (atau Which year).' },
    { question: '___ month is it now?', options: ['What', 'When', 'Where', 'Who'], correct: 0, explanation: 'Gunakan "What month".' },
    { question: 'What ___ is it? It is 3 PM.', options: ['time', 'day', 'month', 'year'], correct: 0, explanation: '"3 PM" adalah jawaban untuk "What time".' }
  ],
  23: [ // Simple Past
    { question: 'I ___ him yesterday.', options: ['see', 'saw', 'seen', 'seeing'], correct: 1, explanation: 'Verb 2 dari see adalah "saw".' },
    { question: 'She ___ to Paris last year.', options: ['goes', 'go', 'went', 'gone'], correct: 2, explanation: 'Verb 2 dari go adalah "went".' },
    { question: 'We ___ a great time at the party.', options: ['have', 'has', 'had', 'having'], correct: 2, explanation: 'Verb 2 dari have adalah "had".' },
    { question: 'They ___ football yesterday.', options: ['play', 'played', 'playing', 'plays'], correct: 1, explanation: 'Verb regular "play" ditambahkan -ed menjadi "played".' },
    { question: 'He ___ his keys this morning.', options: ['lose', 'loses', 'lost', 'losing'], correct: 2, explanation: 'Verb 2 dari lose adalah "lost".' }
  ],
  24: [ // Verb 2
    { question: 'The verb 2 of "eat" is ___.', options: ['eated', 'ate', 'eaten', 'eating'], correct: 1, explanation: '"Eat" adalah irregular verb, bentuk keduanya "ate".' },
    { question: 'The verb 2 of "work" is ___.', options: ['worken', 'wroke', 'worked', 'work'], correct: 2, explanation: '"Work" adalah regular verb, bentuk keduanya "worked".' },
    { question: 'The verb 2 of "buy" is ___.', options: ['buyed', 'bought', 'boughten', 'buys'], correct: 1, explanation: '"Buy" irregular verb, menjadi "bought".' },
    { question: 'The verb 2 of "drink" is ___.', options: ['drinked', 'drank', 'drunk', 'drinks'], correct: 1, explanation: '"Drink" irregular verb, menjadi "drank".' },
    { question: 'The verb 2 of "study" is ___.', options: ['studys', 'studyed', 'studied', 'studien'], correct: 2, explanation: 'Berakhiran y berubah menjadi i + ed ("studied").' }
  ],
  25: [ // Bertanya Pakai Did
    { question: '___ you sleep well?', options: ['Do', 'Does', 'Did', 'Are'], correct: 2, explanation: 'Tanya kejadian masa lalu (semalam) menggunakan "Did".' },
    { question: '___ she call you yesterday?', options: ['Does', 'Is', 'Did', 'Do'], correct: 2, explanation: 'Terdapat kata "yesterday", gunakan "Did".' },
    { question: 'Did they ___ the movie?', options: ['likes', 'liked', 'liking', 'like'], correct: 3, explanation: 'Setelah "Did", verb kembali ke bentuk dasar (Verb 1).' },
    { question: 'Did he ___ to the store?', options: ['went', 'go', 'goes', 'going'], correct: 1, explanation: 'Setelah "Did", gunakan Verb 1 (go).' },
    { question: '___ we win the game?', options: ['Do', 'Did', 'Are', 'Were'], correct: 1, explanation: 'Pertanyaan masa lalu memakai "Did".' }
  ],
  26: [ // W + Did
    { question: 'Where ___ you go yesterday?', options: ['do', 'does', 'did', 'are'], correct: 2, explanation: 'WH question past tense: WH + did + subject + verb1.' },
    { question: 'When ___ they arrive?', options: ['do', 'did', 'are', 'were'], correct: 1, explanation: 'Menggunakan "did" untuk past tense.' },
    { question: 'Why did she ___ early?', options: ['leave', 'left', 'leaves', 'leaving'], correct: 0, explanation: 'Setelah "did", verb kembali ke Verb 1 (leave).' },
    { question: 'How did you ___ that?', options: ['do', 'did', 'done', 'doing'], correct: 0, explanation: 'Setelah "did", verb utama kembali ke Verb 1 (do).' },
    { question: 'What time did it ___?', options: ['starts', 'started', 'start', 'starting'], correct: 2, explanation: 'Setelah "did", verb utama adalah Verb 1 (start).' }
  ],
  27: [ // What Did & Who Did
    { question: 'What ___ you do last night?', options: ['do', 'does', 'did', 'are'], correct: 2, explanation: 'Menanyakan apa yang dilakukan di masa lalu menggunakan "What did".' },
    { question: 'Who ___ you see at the park?', options: ['do', 'did', 'does', 'are'], correct: 1, explanation: 'Menanyakan objek di masa lalu menggunakan "Who did".' },
    { question: 'What did she ___ for lunch?', options: ['eat', 'ate', 'eats', 'eaten'], correct: 0, explanation: 'Setelah "did", gunakan Verb 1 (eat).' },
    { question: 'Who did he ___ to?', options: ['talks', 'talked', 'talk', 'talking'], correct: 2, explanation: 'Setelah "did", gunakan Verb 1 (talk).' },
    { question: 'What ___ they buy?', options: ['do', 'does', 'did', 'were'], correct: 2, explanation: 'Menanyakan kejadian lalu.' }
  ],
  28: [ // Before, After, When
    { question: 'I brushed my teeth ___ I went to bed.', options: ['before', 'after', 'when', 'while'], correct: 0, explanation: '"Before" (sebelum) tidur.' },
    { question: '___ he arrived, we started dinner.', options: ['Before', 'When', 'After', 'While'], correct: 1, explanation: '"When" (ketika) dia tiba.' },
    { question: 'I felt better ___ I took the medicine.', options: ['before', 'after', 'when', 'while'], correct: 1, explanation: '"After" (setelah) minum obat.' },
    { question: 'She locked the door ___ she left.', options: ['before', 'after', 'when', 'while'], correct: 0, explanation: '"Before" (sebelum) pergi.' },
    { question: '___ did you leave? At 5 PM.', options: ['When', 'Before', 'After', 'Where'], correct: 0, explanation: '"When" digunakan sebagai kata tanya untuk waktu.' }
  ],
  29: [ // Past Continuous
    { question: 'I ___ watching TV when you called.', options: ['am', 'was', 'were', 'is'], correct: 1, explanation: 'Past continuous untuk subjek "I" menggunakan "was".' },
    { question: 'They ___ playing games at 8 PM yesterday.', options: ['was', 'were', 'are', 'is'], correct: 1, explanation: 'Past continuous untuk "They" menggunakan "were".' },
    { question: 'She was ___ when it started to rain.', options: ['sleeps', 'sleep', 'slept', 'sleeping'], correct: 3, explanation: 'Past continuous selalu memakai Verb-ing.' },
    { question: 'We ___ not listening.', options: ['was', 'were', 'are', 'am'], correct: 1, explanation: 'Past continuous negatif untuk "We" memakai "were not".' },
    { question: '___ you studying last night?', options: ['Was', 'Were', 'Did', 'Are'], correct: 1, explanation: 'Pertanyaan past continuous untuk "you" memakai "Were".' }
  ],
  30: [ // Simple Future
    { question: 'I ___ call you tomorrow.', options: ['will', 'am', 'was', 'do'], correct: 0, explanation: 'Future tense menggunakan "will".' },
    { question: 'She is ___ visit her grandmother.', options: ['go to', 'going to', 'goes to', 'went to'], correct: 1, explanation: 'Format Be + going to + verb1.' },
    { question: 'They ___ be here soon.', options: ['will', 'are', 'going to', 'do'], correct: 0, explanation: 'Future dengan "will".' },
    { question: 'We are going to ___ pizza.', options: ['eating', 'ate', 'eat', 'eats'], correct: 2, explanation: 'Setelah "going to", gunakan Verb 1 (eat).' },
    { question: 'He ___ not win the race.', options: ['will', 'is', 'does', 'has'], correct: 0, explanation: 'Bentuk negatif future adalah "will not".' }
  ],
  31: [ // Will
    { question: 'I ___ help you with your homework.', options: ['will', 'am', 'do', 'going'], correct: 0, explanation: '"Will" sering digunakan untuk menawarkan bantuan.' },
    { question: 'It ___ rain later.', options: ['will', 'is', 'does', 'have'], correct: 0, explanation: '"Will" digunakan untuk prediksi.' },
    { question: 'They ___ not come to the party.', options: ['are', 'do', 'will', 'have'], correct: 2, explanation: '"Will not" (won\'t) digunakan untuk masa depan.' },
    { question: 'I think she ___ pass the test.', options: ['will', 'is', 'does', 'has'], correct: 0, explanation: '"Will" digunakan setelah kata "think" untuk prediksi.' },
    { question: 'Will you ___ me?', options: ['married', 'marries', 'marrying', 'marry'], correct: 3, explanation: 'Setelah "will", gunakan Verb 1 dasar.' }
  ],
  32: [ // Bertanya dalam Simple Future
    { question: '___ you go to the concert?', options: ['Do', 'Are', 'Will', 'Did'], correct: 2, explanation: 'Pertanyaan masa depan menggunakan "Will".' },
    { question: 'What will she ___?', options: ['do', 'does', 'doing', 'did'], correct: 0, explanation: 'Setelah "will", gunakan Verb 1 (do).' },
    { question: '___ they be angry?', options: ['Do', 'Are', 'Will', 'Have'], correct: 2, explanation: 'Menggunakan "Will" di awal untuk Yes/No question masa depan.' },
    { question: 'Where will you ___?', options: ['stays', 'staying', 'stayed', 'stay'], correct: 3, explanation: 'Setelah "will", gunakan Verb 1 (stay).' },
    { question: 'When will the train ___?', options: ['arrives', 'arrived', 'arriving', 'arrive'], correct: 3, explanation: 'Setelah "will", gunakan Verb 1 (arrive).' }
  ],
  33: [ // Present Perfect
    { question: 'I ___ finished my homework.', options: ['has', 'have', 'am', 'did'], correct: 1, explanation: 'Present perfect untuk "I" menggunakan "have" + V3.' },
    { question: 'She ___ visited London.', options: ['have', 'has', 'is', 'was'], correct: 1, explanation: 'Present perfect untuk "She" menggunakan "has" + V3.' },
    { question: 'They have ___ a new car.', options: ['buy', 'buys', 'bought', 'buying'], correct: 2, explanation: 'Present perfect memakai Verb 3 ("bought").' },
    { question: 'We ___ seen that movie.', options: ['has', 'have', 'are', 'were'], correct: 1, explanation: 'Present perfect untuk "We" menggunakan "have".' },
    { question: 'He has ___ the letter.', options: ['write', 'wrote', 'written', 'writing'], correct: 2, explanation: 'Present perfect memakai Verb 3 ("written").' }
  ],
  34: [ // Keterangan Waktu Present Perfect
    { question: 'I have lived here ___ 2010.', options: ['for', 'since', 'in', 'at'], correct: 1, explanation: '"Since" menunjukkan titik awal waktu.' },
    { question: 'She has worked there ___ five years.', options: ['since', 'for', 'in', 'during'], correct: 1, explanation: '"For" menunjukkan durasi waktu.' },
    { question: 'Have you ___ been to Japan?', options: ['never', 'ever', 'since', 'for'], correct: 1, explanation: '"Ever" digunakan dalam pertanyaan untuk menanyakan pengalaman.' },
    { question: 'I have ___ eaten breakfast.', options: ['already', 'yet', 'since', 'for'], correct: 0, explanation: '"Already" berarti sudah selesai dilakukan.' },
    { question: 'He hasn\'t arrived ___.', options: ['already', 'just', 'yet', 'ever'], correct: 2, explanation: '"Yet" diletakkan di akhir kalimat negatif/tanya.' }
  ],
  35: [ // Have Not & Have Not Yet
    { question: 'I ___ finished the report.', options: ['have not', 'has not', 'am not', 'do not'], correct: 0, explanation: 'Bentuk negatif untuk "I" adalah "have not" + V3.' },
    { question: 'She ___ called me back.', options: ['have not', 'has not', 'does not', 'is not'], correct: 1, explanation: 'Bentuk negatif untuk "She" adalah "has not" + V3.' },
    { question: 'They haven\'t eaten ___.', options: ['already', 'just', 'yet', 'ever'], correct: 2, explanation: '"Yet" digunakan pada akhir kalimat negatif untuk "belum".' },
    { question: 'We ___ seen the results.', options: ['have not', 'has not', 'are not', 'did not'], correct: 0, explanation: 'Menggunakan "have not" + V3.' },
    { question: 'The mail ___ arrived yet.', options: ['haven\'t', 'hasn\'t', 'isn\'t', 'didn\'t'], correct: 1, explanation: '"The mail" (it) menggunakan "hasn\'t".' }
  ],
  36: [ // Sudahkah Kamu
    { question: '___ you finished your work?', options: ['Has', 'Have', 'Do', 'Did'], correct: 1, explanation: 'Pertanyaan present perfect untuk "you" memakai "Have".' },
    { question: '___ she seen this movie?', options: ['Have', 'Has', 'Does', 'Is'], correct: 1, explanation: 'Pertanyaan present perfect untuk "she" memakai "Has".' },
    { question: 'Have they ___ the keys?', options: ['find', 'finds', 'found', 'finding'], correct: 2, explanation: 'Setelah "Have", gunakan Verb 3 ("found").' },
    { question: 'Has he ___ to you?', options: ['speak', 'spoke', 'spoken', 'speaking'], correct: 2, explanation: 'Setelah "Has", gunakan Verb 3 ("spoken").' },
    { question: '___ we met before?', options: ['Has', 'Have', 'Did', 'Are'], correct: 1, explanation: 'Pertanyaan "Sudahkah kita..." menggunakan "Have we met".' }
  ],
  37: [ // Comparatives & Superlatives
    { question: 'My car is ___ than yours.', options: ['fast', 'faster', 'fastest', 'more fast'], correct: 1, explanation: 'Menambahkan -er ("faster") untuk comparative satu suku kata.' },
    { question: 'This is the ___ book I have ever read.', options: ['good', 'better', 'best', 'most good'], correct: 2, explanation: 'Bentuk superlative dari "good" adalah "best".' },
    { question: 'She is ___ beautiful than her sister.', options: ['most', 'more', 'much', 'many'], correct: 1, explanation: 'Kata sifat panjang menggunakan "more" untuk perbandingan.' },
    { question: 'He is the ___ person in the room.', options: ['tall', 'taller', 'tallest', 'most tall'], correct: 2, explanation: 'Menambahkan -est ("tallest") untuk superlative.' },
    { question: 'Today is ___ than yesterday.', options: ['bad', 'worse', 'worst', 'baddest'], correct: 1, explanation: 'Bentuk comparative irregular dari "bad" adalah "worse".' }
  ],
  38: [ // Prepositions
    { question: 'I live ___ London.', options: ['in', 'on', 'at', 'to'], correct: 0, explanation: '"In" digunakan untuk nama kota/negara.' },
    { question: 'The book is ___ the table.', options: ['in', 'on', 'at', 'by'], correct: 1, explanation: '"On" digunakan untuk permukaan benda.' },
    { question: 'We will meet ___ the bus stop.', options: ['in', 'on', 'at', 'for'], correct: 2, explanation: '"At" digunakan untuk titik lokasi spesifik.' },
    { question: 'My birthday is ___ July.', options: ['in', 'on', 'at', 'with'], correct: 0, explanation: '"In" digunakan untuk nama bulan.' },
    { question: 'The meeting is ___ Monday.', options: ['in', 'on', 'at', 'from'], correct: 1, explanation: '"On" digunakan untuk nama hari.' }
  ]
};
