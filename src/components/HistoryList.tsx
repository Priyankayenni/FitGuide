import { Trash2, History } from 'lucide-react';
import type { BMIEntry } from '@/types';
import type { Translation } from '@/lib/i18n';
import { getBMIColor } from '@/lib/bmi';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface HistoryListProps {
  t: Translation;
  entries: BMIEntry[];
  onDelete: (id: string) => void;
}

export function HistoryList({ t, entries, onDelete }: HistoryListProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  const sorted = [...entries].sort((a, b) => new Date(b.recorded_date).getTime() - new Date(a.recorded_date).getTime());

  return (
    <section id="history" className="section-padding py-20 md:py-28">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-500/10 text-neutral-600 dark:text-neutral-400 mb-4">
            <History className="w-4 h-4" />
            <span className="text-sm font-600">{t.history.title}</span>
          </div>
          <h2 className="font-display font-700 text-4xl md:text-5xl tracking-tight">{t.history.title}</h2>
          <p className="mt-3 text-neutral-500 dark:text-neutral-400 text-lg">{t.history.subtitle}</p>
        </div>

        {sorted.length === 0 ? (
          <div className="card-surface p-16 text-center">
            <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-ink-700 flex items-center justify-center mx-auto mb-6">
              <History className="w-10 h-10 text-neutral-300 dark:text-neutral-600" />
            </div>
            <p className="text-neutral-400 dark:text-neutral-500 font-500 text-lg">{t.history.noData}</p>
          </div>
        ) : (
          <div ref={ref} className={`space-y-3 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            {sorted.map((entry) => {
              const color = getBMIColor(entry.category);
              const categoryLabel = t.calculator[entry.category];
              return (
                <div
                  key={entry.id}
                  className="card-surface p-5 flex items-center gap-4 group hover:shadow-card transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex flex-col items-center justify-center" style={{ backgroundColor: `${color}15`, color }}>
                    <span className="font-display font-700 text-lg leading-none">{entry.bmi_value.toFixed(1)}</span>
                    <span className="text-2xs font-500 mt-0.5">BMI</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-600 text-neutral-800 dark:text-neutral-200">
                        {new Date(entry.recorded_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                      <span
                        className="text-2xs font-700 px-2.5 py-0.5 rounded-full"
                        style={{ backgroundColor: `${color}20`, color }}
                      >
                        {categoryLabel}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                      {entry.height_cm} cm / {entry.weight_kg} kg
                      {entry.note && <span className="ml-2 italic">— {entry.note}</span>}
                    </div>
                  </div>

                  <button
                    onClick={() => { if (confirm(t.history.confirmDelete)) onDelete(entry.id); }}
                    className="flex-shrink-0 p-2.5 rounded-lg text-neutral-400 hover:text-error-500 hover:bg-error-500/10 transition-all opacity-0 group-hover:opacity-100"
                    aria-label={t.history.delete}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
