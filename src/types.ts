export type BMICategory = 'underweight' | 'normal' | 'overweight' | 'obese';

export interface BMIEntry {
  id: string;
  user_id: string | null;
  height_cm: number;
  weight_kg: number;
  bmi_value: number;
  category: BMICategory;
  recorded_date: string;
  note: string | null;
  created_at: string;
}

export interface BMIInput {
  height_cm: number;
  weight_kg: number;
  recorded_date: string;
  note?: string;
}

export interface BMIResult {
  value: number;
  category: BMICategory;
  color: string;
  label: string;
  percentage: number;
}

export type Language = 'en' | 'te' | 'hi';

export type Theme = 'light' | 'dark';

export interface User {
  id: string;
  email: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  target: number;
  duration_days: number;
  icon: string;
  created_at: string;
}

export interface UserChallenge {
  id: string;
  user_id: string;
  challenge_id: string;
  status: 'active' | 'completed' | 'abandoned';
  progress: number;
  joined_at: string;
  completed_at: string | null;
  challenge?: Challenge;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface Meal {
  id: string;
  name: string;
  category: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  image: string;
  ingredients: string[];
  prepTime: number;
}

export interface VideoTutorial {
  id: string;
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface WearableData {
  steps: number;
  heartRate: number;
  caloriesBurned: number;
  activeMinutes: number;
  sleepHours: number;
  distance: number;
}
