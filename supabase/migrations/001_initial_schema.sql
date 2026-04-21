-- =============================================================================
-- appinggris — Initial Database Schema
-- Migration: 001_initial_schema.sql
-- Supabase PostgreSQL
--
-- HOW TO RUN:
--   1. Go to https://supabase.com/dashboard → Select your project
--   2. Click "SQL Editor" in the left sidebar
--   3. Click "New query"
--   4. Copy-paste the entire contents of this file
--   5. Click "Run" (or press Ctrl+Enter)
--   6. Verify: click "Table Editor" → you should see 3 new tables
-- =============================================================================


-- ─── Extensions ───────────────────────────────────────────────────────────────
-- Enable UUID generation (already enabled on new Supabase projects, safe to run again)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- =============================================================================
-- TABLE 1: vocabulary
-- Stores all Oxford 3000/5000 word entries.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.vocabulary (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Core word data (sourced from Oxford 3000/5000 PDF)
  word                 TEXT        NOT NULL UNIQUE,
  pronunciation        TEXT        NOT NULL DEFAULT '',   -- IPA: /rɪˈzɪl.i.əns/
  level                TEXT        NOT NULL               -- CEFR: A1 A2 B1 B2 C1
                         CHECK (level IN ('A1', 'A2', 'B1', 'B2', 'C1')),
  category             TEXT        NOT NULL DEFAULT 'other'
                         CHECK (category IN (
                           'noun', 'verb', 'adjective', 'adverb',
                           'preposition', 'conjunction', 'pronoun',
                           'idiom', 'phrasal_verb', 'other'
                         )),
  difficulty           TEXT        NOT NULL DEFAULT 'intermediate'
                         CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),

  -- Meanings (sourced from Cambridge Dictionary)
  meaning_id           TEXT        NOT NULL DEFAULT '',   -- Indonesian translation
  meaning_en           TEXT        NOT NULL DEFAULT '',   -- English definition

  -- Example sentences
  example_sentence     TEXT        NOT NULL DEFAULT '',
  example_translation  TEXT        NOT NULL DEFAULT '',

  -- Freeform tags: ['business', 'academic', 'oxford3000', 'oxford5000']
  tags                 TEXT[]      NOT NULL DEFAULT '{}',

  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for common filter queries
CREATE INDEX IF NOT EXISTS idx_vocabulary_level    ON public.vocabulary (level);
CREATE INDEX IF NOT EXISTS idx_vocabulary_category ON public.vocabulary (category);
CREATE INDEX IF NOT EXISTS idx_vocabulary_word     ON public.vocabulary (word);    -- for search

-- Enable Row Level Security
ALTER TABLE public.vocabulary ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read vocabulary
CREATE POLICY "vocabulary_read_all"
  ON public.vocabulary FOR SELECT
  TO authenticated
  USING (true);

-- Allow service role to insert/update (for seeding from Oxford PDF)
CREATE POLICY "vocabulary_write_service"
  ON public.vocabulary FOR ALL
  TO service_role
  USING (true);


-- =============================================================================
-- TABLE 2: spaced_repetition
-- One row per (user, word) pair — tracks SM-2 algorithm state.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.spaced_repetition (
  id            UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Relations
  user_id       UUID    NOT NULL REFERENCES auth.users (id) ON DELETE CASCADE,
  word_id       UUID    NOT NULL REFERENCES public.vocabulary (id) ON DELETE CASCADE,

  -- SM-2 Algorithm fields
  ease_factor   NUMERIC NOT NULL DEFAULT 2.5    CHECK (ease_factor >= 1.3),
  interval      INTEGER NOT NULL DEFAULT 1      CHECK (interval >= 1),     -- days
  repetitions   INTEGER NOT NULL DEFAULT 0      CHECK (repetitions >= 0),
  next_review   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status        TEXT    NOT NULL DEFAULT 'new'
                  CHECK (status IN ('new', 'learning', 'review', 'mastered')),

  -- Ensure unique (user, word) combination
  UNIQUE (user_id, word_id)
);

-- Index for fetching today's review queue efficiently
CREATE INDEX IF NOT EXISTS idx_sr_user_next_review
  ON public.spaced_repetition (user_id, next_review);
CREATE INDEX IF NOT EXISTS idx_sr_status
  ON public.spaced_repetition (user_id, status);

-- Row Level Security — users only see their own SM-2 data
ALTER TABLE public.spaced_repetition ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sr_select_own"
  ON public.spaced_repetition FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "sr_insert_own"
  ON public.spaced_repetition FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "sr_update_own"
  ON public.spaced_repetition FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);


-- =============================================================================
-- TABLE 3: user_progress
-- One row per user — stores XP, app level, streak, and study totals.
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.user_progress (
  user_id               UUID    PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  display_name          TEXT    NOT NULL DEFAULT 'Student',

  -- Gamification
  xp                    INTEGER NOT NULL DEFAULT 0       CHECK (xp >= 0),
  app_level             INTEGER NOT NULL DEFAULT 1       CHECK (app_level >= 1),
  streak_days           INTEGER NOT NULL DEFAULT 0       CHECK (streak_days >= 0),

  -- Dates
  last_study_date       DATE    NOT NULL DEFAULT CURRENT_DATE,

  -- Aggregate stats
  words_mastered        INTEGER NOT NULL DEFAULT 0       CHECK (words_mastered >= 0),
  total_study_minutes   INTEGER NOT NULL DEFAULT 0       CHECK (total_study_minutes >= 0),

  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-update the `updated_at` timestamp on every update
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_user_progress_updated_at
  BEFORE UPDATE ON public.user_progress
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Row Level Security — users only see/modify their own row
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "progress_select_own"
  ON public.user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "progress_insert_own"
  ON public.user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "progress_update_own"
  ON public.user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);


-- =============================================================================
-- Auto-create user_progress row on new user sign-up
-- Triggered by Supabase Auth (insert into auth.users)
-- =============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.user_progress (user_id, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Student')
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- =============================================================================
-- SEED: Sample vocabulary rows (remove after importing Oxford PDF data)
-- =============================================================================

INSERT INTO public.vocabulary
  (word, pronunciation, level, category, difficulty, meaning_id, meaning_en, example_sentence, example_translation, tags)
VALUES
  ('resilience',  '/rɪˈzɪl.i.əns/', 'B2', 'noun',      'intermediate', 'Ketangguhan / Daya Pegas',    'The ability to recover quickly from difficulties.',      'Her resilience helped her overcome many challenges.',       'Ketangguhannya membantunya mengatasi banyak tantangan.',   ARRAY['oxford5000','academic']),
  ('ambiguity',   '/ˌæm.bɪˈɡjuː.ɪ.ti/', 'B1', 'noun',    'intermediate', 'Kekurangjelasan, kebingungan', 'The quality of being open to more than one interpretation.','The document was full of ambiguity.',                       'Dokumen itu penuh dengan ketidakjelasan.',                 ARRAY['oxford5000','academic']),
  ('conscience',  '/ˈkɒn.ʃəns/',    'B1', 'noun',      'intermediate', 'Hati nurani',                 'Your inner sense of what is right or wrong.',            'He followed his conscience and told the truth.',           'Dia mengikuti hati nuraninya dan mengatakan yang sebenarnya.', ARRAY['oxford3000']),
  ('inevitable',  '/ɪnˈev.ɪ.tə.bəl/', 'B2', 'adjective', 'intermediate', 'Tidak bisa dihindari',        'Certain to happen and unable to be avoided.',            'Change is inevitable in life.',                            'Perubahan adalah hal yang tidak bisa dihindari.',         ARRAY['oxford5000']),
  ('persistence', '/pəˈsɪs.təns/',  'B1', 'noun',      'intermediate', 'Ketekunan',                   'Continued effort to do something despite difficulties.',  'Persistence is the key to success.',                       'Ketekunan adalah kunci keberhasilan.',                    ARRAY['oxford3000','oxford5000'])
ON CONFLICT DO NOTHING;


-- =============================================================================
-- End of migration 001_initial_schema.sql
-- =============================================================================
