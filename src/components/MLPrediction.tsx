import { useMemo } from 'react';
import { TrendingUp, Brain, Target, AlertCircle } from 'lucide-react';
import type { Translation } from '@/lib/i18n';
import type { BMIEntry, Language } from '@/types';
import { predictBmi } from '@/lib/predictions';
import { getBMIColor, getBMICategory } from '@/lib/bmi';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface MLPredictionProps {
  t: Translation;
  language: Language;
  entries: BMIEntry[];
}

export function MLPrediction({ t, language, entries }: MLPredictionProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  const prediction = useMemo(() => predictBmi(entries, language), [entries, language]);

  if (!prediction) {
    return (
      <section id="predictions" className="section-padding py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 mb-4">
              <Brain className="w-4 h-4" />
              <span className="text-sm font-600">{t.predictions.title}</span>
            </div>
            <h2 className="font-display font-700 text-4xl md:text-5xl tracking-tight">{t.predictions.title}</h2>
            <p className="mt-3 text-neutral-500 dark:text-neutral-400 text-lg">{t.predictions.subtitle}</p>
          </div>
          <div className="card-surface p-16 text-center">
            <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-ink-700 flex items-center justify-center mx-auto mb-6">
              <Brain className="w-10 h-10 text-neutral-300 dark:text-neutral-600" />
            </div>
            <p className="text-neutral-400 dark:text-neutral-500 font-500 text-lg">{t.predictions.needData}</p>
            <p className="mt-2 text-sm text-neutral-400 dark:text-neutral-500">{t.predictions.needDataDesc}</p>
          </div>
        </div>
      </section>
    );
  }

  const trendColor = prediction.trend === 'increasing' ? '#f97316' : prediction.trend === 'decreasing' ? '#10b981' : '#94a3b8';
  const predictedColor = getBMIColor(getBMICategory(prediction.predictedBmi));

  return (
    <section id="predictions" className="section-padding py-20 md:py-28 relative">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-secondary-500/5 dark:bg-secondary-500/3 rounded-full blur-[150px] -z-10" />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 mb-4">
            <Brain className="w-4 h-4" />
            <span className="text-sm font-600">{t.predictions.title}</span>
          </div>
          <h2 className="font-display font-700 text-4xl md:text-5xl tracking-tight">{t.predictions.title}</h2>
          <p className="mt-3 text-neutral-500 dark:text-neutral-400 text-lg">{t.predictions.subtitle}</p>
        </div>

        <div ref={ref} className={`card-surface p-8 md:p-10 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Prediction stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <PredictionStat
              icon={<TrendingUp className="w-5 h-5" />}
              label={t.predictions.predictedBmi}
              value={prediction.predictedBmi.toFixed(1)}
              color={predictedColor}
            />
            <PredictionStat
              icon={<Target className="w-5 h-5" />}
              label={t.predictions.trend}
              value={prediction.trend === 'increasing' ? t.predictions.trendUp : prediction.trend === 'decreasing' ? t.predictions.trendDown : t.predictions.trendStable}
              color={trendColor}
            />
            <PredictionStat
              icon={<Brain className="w-5 h-5" />}
              label={t.predictions.confidence}
              value={`${prediction.confidence}%`}
              color="#14b8a6"
            />
            <PredictionStat
              icon={<Target className="w-5 h-5" />}
              label={t.predictions.weeksToGoal}
              value={prediction.weeksToGoal === null ? '—' : prediction.weeksToGoal === 0 ? t.predictions.atGoal : `${prediction.weeksToGoal}w`}
              color="#f59e0b"
            />
          </div>

          {/* Weekly rate visualization */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-600 text-neutral-600 dark:text-neutral-300">{t.predictions.weeklyRate}</span>
              <span className="font-display font-700 text-lg" style={{ color: trendColor }}>
                {prediction.weeklyRate > 0 ? '+' : ''}{prediction.weeklyRate} BMI/wk
              </span>
            </div>
            <div className="relative h-3 rounded-full bg-neutral-100 dark:bg-ink-700 overflow-hidden">
              <div
                className="absolute top-0 left-1/2 h-full transition-all duration-1000"
                style={{
                  width: `${Math.min(50, Math.abs(prediction.weeklyRate) * 25)}%`,
                  transform: prediction.weeklyRate < 0 ? 'translateX(-100%)' : 'none',
                  backgroundColor: trendColor,
                }}
              />
              <div className="absolute top-0 left-1/2 w-0.5 h-full bg-neutral-300 dark:bg-neutral-600" />
            </div>
          </div>

          {/* Insight */}
          <div className="p-5 rounded-2xl bg-secondary-500/5 border border-secondary-500/20">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-secondary-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-600 text-sm text-neutral-700 dark:text-neutral-200 mb-1">{t.predictions.insight}</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{prediction.insight}</p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="mt-6 text-xs text-neutral-400 dark:text-neutral-500 text-center">
            {t.predictions.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}

function PredictionStat({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-ink-700/50 border border-neutral-100 dark:border-neutral-700/30">
      <div className="flex items-center gap-2 mb-2" style={{ color }}>
        {icon}
        <span className="text-2xs font-600 text-neutral-400 uppercase tracking-wider">{label}</span>
      </div>
      <div className="font-display font-700 text-2xl" style={{ color }}>
        {value}
      </div>
    </div>
  );
}
