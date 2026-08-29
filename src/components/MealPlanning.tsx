import { useMemo } from 'react';
import { Utensils, Clock, Flame, Beef, Wheat, Droplet } from 'lucide-react';
import type { Translation } from '@/lib/i18n';
import type { BMIResult, Meal } from '@/types';
import { getMealsForCategory, getMealTotals } from '@/lib/meals';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface MealPlanningProps {
  t: Translation;
  result: BMIResult | null;
}

export function MealPlanning({ t, result }: MealPlanningProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  const meals = useMemo(() => (result ? getMealsForCategory(result.category) : []), [result]);
  const totals = useMemo(() => getMealTotals(meals), [meals]);

  if (!result) {
    return (
      <section id="meals" className="section-padding py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 mb-4">
              <Utensils className="w-4 h-4" />
              <span className="text-sm font-600">{t.meals.title}</span>
            </div>
            <h2 className="font-display font-700 text-4xl md:text-5xl tracking-tight">{t.meals.title}</h2>
            <p className="mt-3 text-neutral-500 dark:text-neutral-400 text-lg">{t.meals.subtitle}</p>
          </div>
          <div className="card-surface p-16 text-center">
            <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-ink-700 flex items-center justify-center mx-auto mb-6">
              <Utensils className="w-10 h-10 text-neutral-300 dark:text-neutral-600" />
            </div>
            <p className="text-neutral-400 dark:text-neutral-500 font-500 text-lg">{t.meals.calculateFirst}</p>
          </div>
        </div>
      </section>
    );
  }

  const mealTypeLabels: Record<string, string> = {
    breakfast: t.meals.breakfast,
    lunch: t.meals.lunch,
    dinner: t.meals.dinner,
    snack: t.meals.snack,
  };

  return (
    <section id="meals" className="section-padding py-20 md:py-28 relative">
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary-500/5 dark:bg-primary-500/3 rounded-full blur-[150px] -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 mb-4">
            <Utensils className="w-4 h-4" />
            <span className="text-sm font-600">{t.meals.title}</span>
          </div>
          <h2 className="font-display font-700 text-4xl md:text-5xl tracking-tight">{t.meals.title}</h2>
          <p className="mt-3 text-neutral-500 dark:text-neutral-400 text-lg">
            {t.meals.subtitle} — <span className="font-600" style={{ color: result.color }}>{t.calculator[result.category]}</span>
          </p>
        </div>

        {/* Daily totals */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <NutritionStat icon={<Flame className="w-5 h-5" />} label={t.meals.calories} value={totals.calories} unit="kcal" color="#f59e0b" />
          <NutritionStat icon={<Beef className="w-5 h-5" />} label={t.meals.protein} value={totals.protein} unit="g" color="#10b981" />
          <NutritionStat icon={<Wheat className="w-5 h-5" />} label={t.meals.carbs} value={totals.carbs} unit="g" color="#14b8a6" />
          <NutritionStat icon={<Droplet className="w-5 h-5" />} label={t.meals.fat} value={totals.fat} unit="g" color="#f97316" />
        </div>

        {/* Meal cards */}
        <div ref={ref} className={`grid md:grid-cols-2 gap-6 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {meals.map((meal, i) => (
            <MealCard key={meal.id} meal={meal} label={mealTypeLabels[meal.category]} t={t} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

function NutritionStat({ icon, label, value, unit, color }: { icon: React.ReactNode; label: string; value: number; unit: string; color: string }) {
  return (
    <div className="card-surface p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15`, color }}>
        {icon}
      </div>
      <div>
        <div className="font-display font-700 text-xl" style={{ color }}>
          {value}<span className="text-sm font-500 ml-0.5">{unit}</span>
        </div>
        <div className="text-2xs font-500 text-neutral-400 uppercase tracking-wider">{label}</div>
      </div>
    </div>
  );
}

function MealCard({ meal, label, t, delay }: { meal: Meal; label: string; t: Translation; delay: number }) {
  return (
    <div
      className="card-surface overflow-hidden group hover:shadow-cinematic transition-all duration-500 hover:-translate-y-1"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative h-48 overflow-hidden">
        <img src={meal.image} alt={meal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full glass-strong text-2xs font-700 uppercase tracking-wider">
          {label}
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1 rounded-full glass-strong text-2xs font-600">
          <Clock className="w-3 h-3" />
          {meal.prepTime}m
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display font-700 text-lg mb-2">{meal.name}</h3>
        <div className="flex items-center gap-4 text-sm mb-3">
          <span className="flex items-center gap-1 text-accent-500 font-600">
            <Flame className="w-3.5 h-3.5" />{meal.calories} kcal
          </span>
          <span className="text-neutral-400">P {meal.protein}g · C {meal.carbs}g · F {meal.fat}g</span>
        </div>
        <div className="text-sm text-neutral-500 dark:text-neutral-400">
          <p className="font-600 text-neutral-600 dark:text-neutral-300 mb-1">{t.meals.ingredients}</p>
          <p>{meal.ingredients.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}
