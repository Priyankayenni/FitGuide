import { useState, useEffect, useCallback } from 'react';
import { Calculator, Save, Check, Ruler, Weight, Lock } from 'lucide-react';
import type { Translation } from '@/lib/i18n';
import type { BMIResult, User } from '@/types';
import { computeBMIResult, getHealthyWeightRange } from '@/lib/bmi';
import { BMIGauge } from './BMIGauge';

interface BMICalculatorProps {
  t: Translation;
  onSave: (heightCm: number, weightKg: number, date: string, note: string) => Promise<boolean>;
  onResultChange: (result: BMIResult | null) => void;
  user: User | null;
  onSignIn: () => void;
}

export function BMICalculator({ t, onSave, onResultChange, user, onSignIn }: BMICalculatorProps) {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');
  const [result, setResult] = useState<BMIResult | null>(null);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle');

  useEffect(() => {
    onResultChange(result);
  }, [result, onResultChange]);

  const handleCalculate = useCallback(() => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      setResult(computeBMIResult(h, w));
    } else {
      setResult(null);
    }
  }, [height, weight]);

  // Live calculation as user types
  useEffect(() => {
    handleCalculate();
  }, [handleCalculate]);

  const handleSave = async () => {
    if (!result) return;
    setSaveState('saving');
    const success = await onSave(parseFloat(height), parseFloat(weight), date, note);
    if (success) {
      setSaveState('saved');
      setTimeout(() => setSaveState('idle'), 2000);
    } else {
      setSaveState('idle');
    }
  };

  const healthyWeight = height ? getHealthyWeightRange(parseFloat(height)) : null;
  const categoryLabel = result ? t.calculator[result.category] : '';

  return (
    <section id="calculator" className="relative section-padding py-20 md:py-28">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/5 dark:bg-primary-500/3 rounded-full blur-[150px] -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-on-scroll">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 mb-4">
            <Calculator className="w-4 h-4" />
            <span className="text-sm font-600">{t.calculator.title}</span>
          </div>
          <h2 className="font-display font-700 text-4xl md:text-5xl tracking-tight">
            {t.calculator.title}
          </h2>
          <p className="mt-3 text-neutral-500 dark:text-neutral-400 text-lg max-w-2xl mx-auto">
            {t.calculator.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input panel */}
          <div className="card-surface p-8 md:p-10 animate-on-scroll">
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-600 text-neutral-700 dark:text-neutral-300 mb-2">
                  <Ruler className="w-4 h-4 text-primary-500" />
                  {t.calculator.height}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="170"
                    min="50"
                    max="250"
                    className="input-field pr-12 text-lg font-500"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 font-500 text-sm">cm</span>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-600 text-neutral-700 dark:text-neutral-300 mb-2">
                  <Weight className="w-4 h-4 text-primary-500" />
                  {t.calculator.weight}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="70"
                    min="20"
                    max="300"
                    step="0.1"
                    className="input-field pr-12 text-lg font-500"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 font-500 text-sm">kg</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-600 text-neutral-700 dark:text-neutral-300 mb-2 block">
                  {t.calculator.date}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="input-field text-lg font-500"
                />
              </div>

              <div>
                <label className="text-sm font-600 text-neutral-700 dark:text-neutral-300 mb-2 block">
                  {t.calculator.note}
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={t.calculator.notePlaceholder}
                  className="input-field"
                />
              </div>

              {user ? (
                <button
                  onClick={handleSave}
                  disabled={!result || saveState !== 'idle'}
                  className="btn-primary w-full flex items-center justify-center gap-2 text-lg"
                >
                  {saveState === 'saving' && (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t.calculator.saving}
                    </>
                  )}
                  {saveState === 'saved' && (
                    <>
                      <Check className="w-5 h-5" />
                      {t.calculator.saved}
                    </>
                  )}
                  {saveState === 'idle' && (
                    <>
                      <Save className="w-5 h-5" />
                      {t.calculator.save}
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={onSignIn}
                  disabled={!result}
                  className="btn-primary w-full flex items-center justify-center gap-2 text-lg"
                >
                  <Lock className="w-5 h-5" />
                  {t.calculator.signInToSave}
                </button>
              )}
            </div>
          </div>

          {/* Result panel with gauge */}
          <div className="card-surface p-8 md:p-10 flex flex-col items-center justify-center animate-on-scroll">
            {result ? (
              <>
                <BMIGauge result={result} label={categoryLabel} t={t} />
                <div className="mt-8 w-full space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 dark:bg-ink-700/50">
                    <span className="text-sm font-500 text-neutral-500 dark:text-neutral-400">{t.calculator.category}</span>
                    <span
                      className="text-sm font-700 px-3 py-1 rounded-full"
                      style={{ backgroundColor: `${result.color}20`, color: result.color }}
                    >
                      {categoryLabel}
                    </span>
                  </div>
                  {healthyWeight && (
                    <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 dark:bg-ink-700/50">
                      <span className="text-sm font-500 text-neutral-500 dark:text-neutral-400">{t.calculator.healthyWeightRange}</span>
                      <span className="text-sm font-700 text-neutral-800 dark:text-neutral-200">
                        {healthyWeight.min} — {healthyWeight.max} kg
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 dark:bg-ink-700/50">
                    <span className="text-sm font-500 text-neutral-500 dark:text-neutral-400">{t.calculator.healthyRange}</span>
                    <span className="text-sm font-700 text-primary-600 dark:text-primary-400">18.5 — 25.0</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-ink-700 flex items-center justify-center mx-auto mb-4">
                  <Calculator className="w-10 h-10 text-neutral-300 dark:text-neutral-600" />
                </div>
                <p className="text-neutral-400 dark:text-neutral-500 font-500">{t.calculator.enterValues}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
