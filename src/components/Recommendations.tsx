import { Apple, Dumbbell, Heart, Sparkles } from 'lucide-react';
import type { BMIResult, Language } from '@/types';
import type { Translation } from '@/lib/i18n';
import { getRecommendations } from '@/lib/recommendations';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface RecommendationsProps {
  t: Translation;
  language: Language;
  result: BMIResult | null;
}

export function Recommendations({ t, language, result }: RecommendationsProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  if (!result) {
    return (
      <section id="recommendations" className="section-padding py-20 md:py-28 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 text-accent-600 dark:text-accent-400 mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-600">{t.recommendations.title}</span>
            </div>
            <h2 className="font-display font-700 text-4xl md:text-5xl tracking-tight">{t.recommendations.title}</h2>
            <p className="mt-3 text-neutral-500 dark:text-neutral-400 text-lg">{t.recommendations.subtitle}</p>
          </div>
          <div className="card-surface p-16 text-center">
            <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-ink-700 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-neutral-300 dark:text-neutral-600" />
            </div>
            <p className="text-neutral-400 dark:text-neutral-500 font-500 text-lg">{t.recommendations.calculateFirst}</p>
          </div>
        </div>
      </section>
    );
  }

  const recs = getRecommendations(language, result.category);
  const categoryLabel = t.calculator[result.category];

  const cards = [
    { icon: <Apple className="w-6 h-6" />, title: t.recommendations.nutrition, desc: t.recommendations.nutritionDesc, tips: recs.nutrition, color: '#10b981', bg: 'bg-primary-500/10' },
    { icon: <Dumbbell className="w-6 h-6" />, title: t.recommendations.exercise, desc: t.recommendations.exerciseDesc, tips: recs.exercise, color: '#f59e0b', bg: 'bg-accent-500/10' },
    { icon: <Heart className="w-6 h-6" />, title: t.recommendations.lifestyle, desc: t.recommendations.lifestyleDesc, tips: recs.lifestyle, color: '#14b8a6', bg: 'bg-secondary-500/10' },
  ];

  return (
    <section id="recommendations" className="section-padding py-20 md:py-28 relative">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-accent-500/5 dark:bg-accent-500/3 rounded-full blur-[150px] -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 text-accent-600 dark:text-accent-400 mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-600">{t.recommendations.title}</span>
          </div>
          <h2 className="font-display font-700 text-4xl md:text-5xl tracking-tight">{t.recommendations.title}</h2>
          <p className="mt-3 text-neutral-500 dark:text-neutral-400 text-lg">
            {t.recommendations.tipsFor} <span className="font-700" style={{ color: result.color }}>{categoryLabel}</span>
          </p>
        </div>

        <div
          ref={ref}
          className={`grid md:grid-cols-3 gap-6 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className="card-surface p-8 group hover:shadow-cinematic transition-all duration-500 hover:-translate-y-1"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`w-14 h-14 rounded-2xl ${card.bg} flex items-center justify-center mb-5`} style={{ color: card.color }}>
                {card.icon}
              </div>
              <h3 className="font-display font-700 text-xl mb-1">{card.title}</h3>
              <p className="text-sm text-neutral-400 dark:text-neutral-500 mb-6">{card.desc}</p>
              <ul className="space-y-4">
                {card.tips.map((tip, j) => (
                  <li key={j} className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-2xs font-700 mt-0.5" style={{ backgroundColor: `${card.color}20`, color: card.color }}>
                      {j + 1}
                    </div>
                    <div>
                      <p className="font-600 text-sm text-neutral-800 dark:text-neutral-200">{tip.title}</p>
                      <p className="mt-0.5 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{tip.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
