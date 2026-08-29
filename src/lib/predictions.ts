import type { BMIEntry } from '@/types';

export interface PredictionResult {
  predictedBmi: number;
  predictedCategory: string;
  weeksToGoal: number | null;
  confidence: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  weeklyRate: number;
  insight: string;
}

export function predictBmi(entries: BMIEntry[], language: 'en' | 'te' | 'hi'): PredictionResult | null {
  if (entries.length < 2) return null;

  const sorted = [...entries].sort((a, b) => new Date(a.recorded_date).getTime() - new Date(b.recorded_date).getTime());

  const bmiValues = sorted.map((e) => e.bmi_value);
  const dates = sorted.map((e) => new Date(e.recorded_date).getTime());
  const dayMs = 24 * 60 * 60 * 1000;

  // Linear regression: y = mx + b
  const n = bmiValues.length;
  const sumX = dates.reduce((a, b) => a + b, 0);
  const sumY = bmiValues.reduce((a, b) => a + b, 0);
  const sumXY = dates.reduce((acc, d, i) => acc + d * bmiValues[i], 0);
  const sumX2 = dates.reduce((acc, d) => acc + d * d, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // R-squared for confidence
  const meanY = sumY / n;
  let ssRes = 0;
  let ssTot = 0;
  for (let i = 0; i < n; i++) {
    const predicted = slope * dates[i] + intercept;
    ssRes += Math.pow(bmiValues[i] - predicted, 2);
    ssTot += Math.pow(bmiValues[i] - meanY, 2);
  }
  const rSquared = ssTot === 0 ? 1 : Math.max(0, 1 - ssRes / ssTot);

  // Predict 4 weeks ahead
  const lastDate = dates[dates.length - 1];
  const futureDate = lastDate + 28 * dayMs;
  const predictedBmi = Math.round((slope * futureDate + intercept) * 10) / 10;

  // Weekly rate
  const weeklyRate = Math.round((slope * 7 * dayMs) * 100) / 100;

  // Determine trend
  const trend: 'increasing' | 'decreasing' | 'stable' =
    weeklyRate > 0.05 ? 'increasing' : weeklyRate < -0.05 ? 'decreasing' : 'stable';

  // Predicted category
  let predictedCategory: string;
  if (predictedBmi < 18.5) predictedCategory = 'underweight';
  else if (predictedBmi < 25) predictedCategory = 'normal';
  else if (predictedBmi < 30) predictedCategory = 'overweight';
  else predictedCategory = 'obese';

  // Weeks to healthy range (18.5-25)
  let weeksToGoal: number | null = null;
  const lastBmi = bmiValues[bmiValues.length - 1];
  if (lastBmi < 18.5 && slope > 0) {
    const daysToGoal = (18.5 - intercept) / slope - lastDate;
    weeksToGoal = Math.max(0, Math.round(daysToGoal / 7));
  } else if (lastBmi >= 25 && slope < 0) {
    const daysToGoal = (25 - intercept) / slope - lastDate;
    weeksToGoal = Math.max(0, Math.round(daysToGoal / 7));
  } else if (lastBmi >= 18.5 && lastBmi < 25) {
    weeksToGoal = 0;
  }

  // Insight
  const insights: Record<string, Record<string, string>> = {
    en: {
      increasing: `Your BMI is trending upward at ${Math.abs(weeklyRate)} per week. Consider increasing physical activity and reviewing your caloric intake.`,
      decreasing: `Great progress! Your BMI is decreasing by ${Math.abs(weeklyRate)} per week. Keep up the consistent habits.`,
      stable: `Your BMI is stable. If you're in the healthy range, maintain your current routine. If not, consider adjusting your diet or activity level.`,
    },
    te: {
      increasing: `మీ BMI వారానికి ${Math.abs(weeklyRate)} చొప్పున పెరుగుతోంది. వ్యాయామం పెంచండి మరియు కేలరీలను సమీక్షించండి.`,
      decreasing: `గొప్ప పురోగతి! మీ BMI వారానికి ${Math.abs(weeklyRate)} తగ్గుతోంది. అలవాట్లను కొనసాగించండి.`,
      stable: `మీ BMI స్థిరంగా ఉంది. ఆరోగ్యకరమైన శ్రేణిలో ఉంటే కొనసాగండి, లేకపోతే ఆహారం సర్దుబాటు చేయండి.`,
    },
    hi: {
      increasing: `आपका BMI हफ्ते में ${Math.abs(weeklyRate)} बढ़ रहा है। व्यायाम बढ़ाएं और कैलोरी समीक्षा करें।`,
      decreasing: `बढ़िया प्रगति! आपका BMI हफ्ते में ${Math.abs(weeklyRate)} घट रहा है। आदतें जारी रखें।`,
      stable: `आपका BMI स्थिर है। स्वस्थ श्रेणी में है तो जारी रखें, नहीं तो आहार समायोजन करें।`,
    },
  };

  return {
    predictedBmi,
    predictedCategory,
    weeksToGoal,
    confidence: Math.round(rSquared * 100),
    trend,
    weeklyRate,
    insight: insights[language][trend],
  };
}
