/*
# Create bmi_entries table (single-tenant, no auth)

## Overview
Stores BMI tracking entries for the FitGuide fitness app. Each entry captures
a body measurement snapshot (height, weight, computed BMI, category) along
with the date it was recorded. The app is single-tenant with no sign-in screen,
so all data is intentionally shared and accessible to anon + authenticated roles.

## New Tables
- `bmi_entries`
  - `id` (uuid, primary key, auto-generated)
  - `height_cm` (numeric, not null) — height in centimeters
  - `weight_kg` (numeric, not null) — weight in kilograms
  - `bmi_value` (numeric, not null) — computed BMI, one decimal place
  - `category` (text, not null) — BMI category label: underweight / normal / overweight / obese
  - `recorded_date` (date, not null) — the date the measurement was taken
  - `note` (text, nullable) — optional user note
  - `created_at` (timestamptz, default now)

## Security
- RLS enabled on `bmi_entries`.
- Four CRUD policies scoped to `anon, authenticated` since the app has no
  sign-in screen and the data is intentionally public/shared.

## Notes
1. Index on `recorded_date` for efficient trend-chart queries ordered by date.
2. `USING (true)` is acceptable here because the data is intentionally shared
   across all users of this single-tenant app.
*/

CREATE TABLE IF NOT EXISTS bmi_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  height_cm numeric NOT NULL,
  weight_kg numeric NOT NULL,
  bmi_value numeric(4,1) NOT NULL,
  category text NOT NULL,
  recorded_date date NOT NULL,
  note text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_bmi_entries_recorded_date
  ON bmi_entries (recorded_date);

ALTER TABLE bmi_entries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_bmi_entries" ON bmi_entries;
CREATE POLICY "anon_select_bmi_entries" ON bmi_entries FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_bmi_entries" ON bmi_entries;
CREATE POLICY "anon_insert_bmi_entries" ON bmi_entries FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_bmi_entries" ON bmi_entries;
CREATE POLICY "anon_update_bmi_entries" ON bmi_entries FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_bmi_entries" ON bmi_entries;
CREATE POLICY "anon_delete_bmi_entries" ON bmi_entries FOR DELETE
  TO anon, authenticated USING (true);