import type { BMICategory, BMIResult } from '@/types';

const BMI_RANGES: { category: BMICategory; min: number; max: number }[] = [
  { category: 'underweight', min: 0, max: 18.5 },
  { category: 'normal', min: 18.5, max: 25 },
  { category: 'overweight', min: 25, max: 30 },
  { category: 'obese', min: 30, max: 100 },
];

export function calculateBMI(heightCm: number, weightKg: number): number {
  if (heightCm <= 0 || weightKg <= 0) return 0;
  const heightM = heightCm / 100;
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
}

export function getBMICategory(bmi: number): BMICategory {
  for (const range of BMI_RANGES) {
    if (bmi >= range.min && bmi < range.max) return range.category;
  }
  return 'obese';
}

export function getBMIColor(category: BMICategory): string {
  switch (category) {
    case 'underweight':
      return '#f59e0b';
    case 'normal':
      return '#10b981';
    case 'overweight':
      return '#f97316';
    case 'obese':
      return '#ef4444';
  }
}

export function getBMIPercentage(bmi: number): number {
  const min = 15;
  const max = 40;
  const clamped = Math.max(min, Math.min(max, bmi));
  return ((clamped - min) / (max - min)) * 100;
}

export function computeBMIResult(heightCm: number, weightKg: number): BMIResult {
  const value = calculateBMI(heightCm, weightKg);
  const category = getBMICategory(value);
  return {
    value,
    category,
    color: getBMIColor(category),
    label: category,
    percentage: getBMIPercentage(value),
  };
}

export function getHealthyWeightRange(heightCm: number): { min: number; max: number } {
  const heightM = heightCm / 100;
  return {
    min: Math.round(18.5 * heightM * heightM * 10) / 10,
    max: Math.round(25 * heightM * heightM * 10) / 10,
  };
}
