/*
# Add authentication, challenges, and user challenge tracking

## Overview
This migration adds user authentication support to the FitGuide app by introducing
a user_id column on bmi_entries with owner-scoped RLS policies. It also creates a
challenges system with predefined health challenges and a user_challenges join table
for tracking each user's progress.

## Changes to Existing Tables
- `bmi_entries`: Added `user_id` column (uuid, defaults to auth.uid(), references auth.users
  with ON DELETE CASCADE). Existing rows get null user_id; new inserts get auth.uid().
- RLS policies on `bmi_entries` updated from anon-accessible to authenticated + owner-scoped.

## New Tables
1. `challenges` — Predefined health challenges (30-day plank, 10K steps, etc.)
   - `id` (uuid PK)
   - `title` (text, unique)
   - `description` (text)
   - `category` (text) — core, cardio, wellness, nutrition, fitness
   - `target` (integer) — number of days or repetitions to complete
   - `duration_days` (integer) — challenge duration
   - `icon` (text) — lucide-react icon name
   - `created_at` (timestamptz)

2. `user_challenges` — Tracks user participation and progress
   - `id` (uuid PK)
   - `user_id` (uuid, defaults to auth.uid(), references auth.users)
   - `challenge_id` (uuid, references challenges)
   - `status` (text, default 'active') — active / completed / abandoned
   - `progress` (integer, default 0)
   - `joined_at` (timestamptz)
   - `completed_at` (timestamptz, nullable)
   - Unique constraint on (user_id, challenge_id)

## Security
- `bmi_entries`: RLS enabled, owner-scoped (authenticated only, auth.uid() = user_id)
- `challenges`: RLS enabled, readable by all authenticated users (shared predefined data)
- `user_challenges`: RLS enabled, owner-scoped (authenticated only)

## Notes
1. Five predefined challenges are inserted with ON CONFLICT to be idempotent.
2. The unique constraint on challenges.title prevents duplicate inserts on re-run.
3. The unique constraint on user_challenges(user_id, challenge_id) prevents joining twice.
*/

-- Add user_id to bmi_entries
ALTER TABLE bmi_entries ADD COLUMN IF NOT EXISTS user_id uuid DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE;

-- Drop old anon policies
DROP POLICY IF EXISTS "anon_select_bmi_entries" ON bmi_entries;
DROP POLICY IF EXISTS "anon_insert_bmi_entries" ON bmi_entries;
DROP POLICY IF EXISTS "anon_update_bmi_entries" ON bmi_entries;
DROP POLICY IF EXISTS "anon_delete_bmi_entries" ON bmi_entries;

-- Add owner-scoped policies
DROP POLICY IF EXISTS "select_own_bmi_entries" ON bmi_entries;
CREATE POLICY "select_own_bmi_entries" ON bmi_entries FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_bmi_entries" ON bmi_entries;
CREATE POLICY "insert_own_bmi_entries" ON bmi_entries FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_bmi_entries" ON bmi_entries;
CREATE POLICY "update_own_bmi_entries" ON bmi_entries FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_bmi_entries" ON bmi_entries;
CREATE POLICY "delete_own_bmi_entries" ON bmi_entries FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Create challenges table
CREATE TABLE IF NOT EXISTS challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  target integer NOT NULL,
  duration_days integer NOT NULL,
  icon text NOT NULL DEFAULT 'Trophy',
  created_at timestamptz DEFAULT now()
);

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'challenges_title_unique') THEN
    ALTER TABLE challenges ADD CONSTRAINT challenges_title_unique UNIQUE (title);
  END IF;
END $$;

ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "auth_select_challenges" ON challenges;
CREATE POLICY "auth_select_challenges" ON challenges FOR SELECT
  TO authenticated USING (true);

-- Create user_challenges table
CREATE TABLE IF NOT EXISTS user_challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  challenge_id uuid NOT NULL REFERENCES challenges(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'active',
  progress integer NOT NULL DEFAULT 0,
  joined_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  UNIQUE(user_id, challenge_id)
);

ALTER TABLE user_challenges ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_user_challenges" ON user_challenges;
CREATE POLICY "select_own_user_challenges" ON user_challenges FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_user_challenges" ON user_challenges;
CREATE POLICY "insert_own_user_challenges" ON user_challenges FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_user_challenges" ON user_challenges;
CREATE POLICY "update_own_user_challenges" ON user_challenges FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_user_challenges" ON user_challenges;
CREATE POLICY "delete_own_user_challenges" ON user_challenges FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Insert predefined challenges
INSERT INTO challenges (title, description, category, target, duration_days, icon) VALUES
('30-Day Plank Challenge', 'Build core strength with daily plank holds. Start at 30 seconds and work your way up to 3 minutes by day 30.', 'core', 30, 30, 'Trophy'),
('10K Steps Daily', 'Walk 10,000 steps every day for 21 days straight. Build a consistent movement habit that lasts.', 'cardio', 21, 21, 'Footprints'),
('Hydration Master', 'Drink 2.5 liters of water daily for 14 days. Stay hydrated and feel the difference in your energy levels.', 'wellness', 14, 14, 'Droplets'),
('No Sugar Challenge', 'Eliminate added sugars from your diet for 7 days. Reset your palate and reduce cravings.', 'nutrition', 7, 7, 'Apple'),
('Early Bird Workout', 'Complete a 20-minute workout before 7 AM for 21 days. Build discipline and start your day with energy.', 'fitness', 21, 21, 'Sunrise')
ON CONFLICT (title) DO NOTHING;