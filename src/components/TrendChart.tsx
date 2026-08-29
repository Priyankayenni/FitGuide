import { useMemo } from 'react';
import { TrendingUp, TrendingDown, Minus, Download, Trash2, BarChart3 } from 'lucide-react';
import type { BMIEntry } from '@/types';
import type { Translation } from '@/lib/i18n';
import { getBMIColor, getBMICategory } from '@/lib/bmi';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface TrendChartProps {
  t: Translation;
  entries: BMIEntry[];
  onClearAll: () => void;
}

export function TrendChart({ t, entries, onClearAll }: TrendChartProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  const stats = useMemo(() => {
    if (entries.length === 0) return null;
    const sorted = [...entries].sort((a, b) => new Date(a.recorded_date).getTime() - new Date(b.recorded_date).getTime());
    const latest = sorted[sorted.length - 1];
    const avg = sorted.reduce((sum, e) => sum + e.bmi_value, 0) / sorted.length;
    const first = sorted[0];
    const trend = latest.bmi_value - first.bmi_value;
    return {
      latest: latest.bmi_value,
      latestCategory: latest.category,
      average: Math.round(avg * 10) / 10,
      trend,
      count: sorted.length,
    };
  }, [entries]);

  const chartData = useMemo(() => {
    if (entries.length < 2) return null;
    const sorted = [...entries].sort((a, b) => new Date(a.recorded_date).getTime() - new Date(b.recorded_date).getTime());
    return sorted;
  }, [entries]);

  const handleExport = () => {
    if (entries.length === 0) return;
    const headers = ['Date', 'Height (cm)', 'Weight (kg)', 'BMI', 'Category', 'Note'];
    const rows = [...entries]
      .sort((a, b) => new Date(b.recorded_date).getTime() - new Date(a.recorded_date).getTime())
      .map((e) => [e.recorded_date, e.height_cm, e.weight_kg, e.bmi_value, e.category, e.note ?? '']);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitguide-bmi-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (entries.length === 0) {
    return (
      <section id="trends" className="section-padding py-20 md:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 mb-4">
              <BarChart3 className="w-4 h-4" />
              <span className="text-sm font-600">{t.trends.title}</span>
            </div>
            <h2 className="font-display font-700 text-4xl md:text-5xl tracking-tight">{t.trends.title}</h2>
            <p className="mt-3 text-neutral-500 dark:text-neutral-400 text-lg">{t.trends.subtitle}</p>
          </div>
          <div className="card-surface p-16 text-center">
            <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-ink-700 flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="w-10 h-10 text-neutral-300 dark:text-neutral-600" />
            </div>
            <h3 className="font-display font-600 text-xl text-neutral-700 dark:text-neutral-300">{t.trends.noData}</h3>
            <p className="mt-2 text-neutral-400 dark:text-neutral-500">{t.trends.noDataDesc}</p>
          </div>
        </div>
      </section>
    );
  }

  const W = 800;
  const H = 320;
  const PAD = { top: 30, right: 30, bottom: 50, left: 50 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const bmiValues = chartData?.map((e) => e.bmi_value) ?? [];
  const minBmi = Math.min(...bmiValues, 18) - 2;
  const maxBmi = Math.max(...bmiValues, 25) + 2;
  const range = maxBmi - minBmi || 1;

  const xStep = chartData && chartData.length > 1 ? chartW / (chartData.length - 1) : 0;

  const points = chartData?.map((e, i) => ({
    x: PAD.left + i * xStep,
    y: PAD.top + chartH - ((e.bmi_value - minBmi) / range) * chartH,
    entry: e,
  })) ?? [];

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1]?.x ?? 0} ${PAD.top + chartH} L ${points[0]?.x ?? 0} ${PAD.top + chartH} Z`;

  const yLabels = [minBmi, minBmi + range * 0.33, minBmi + range * 0.66, maxBmi].map((v) => Math.round(v * 10) / 10);

  return (
    <section id="trends" className="section-padding py-20 md:py-28 relative">
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-secondary-500/5 dark:bg-secondary-500/3 rounded-full blur-[150px] -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 mb-4">
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm font-600">{t.trends.title}</span>
          </div>
          <h2 className="font-display font-700 text-4xl md:text-5xl tracking-tight">{t.trends.title}</h2>
          <p className="mt-3 text-neutral-500 dark:text-neutral-400 text-lg">{t.trends.subtitle}</p>
        </div>

        <div
          ref={ref}
          className={`card-surface p-6 md:p-10 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          {/* Stats row */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard label={t.trends.latestBmi} value={stats.latest.toFixed(1)} color={getBMIColor(stats.latestCategory)} />
              <StatCard label={t.trends.averageBmi} value={stats.average.toFixed(1)} color="#14b8a6" />
              <StatCard
                label={t.trends.trend}
                value={stats.trend > 0.2 ? t.trends.trendUp : stats.trend < -0.2 ? t.trends.trendDown : t.trends.trendStable}
                color={stats.trend > 0.2 ? '#f97316' : stats.trend < -0.2 ? '#10b981' : '#94a3b8'}
                icon={stats.trend > 0.2 ? <TrendingUp className="w-5 h-5" /> : stats.trend < -0.2 ? <TrendingDown className="w-5 h-5" /> : <Minus className="w-5 h-5" />}
              />
              <StatCard label={t.trends.entries} value={String(stats.count)} color="#f59e0b" />
            </div>
          )}

          {/* Chart */}
          {chartData && (
            <div className="overflow-x-auto scrollbar-thin">
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[600px] h-auto">
                <defs>
                  <linearGradient id="area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="50%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>

                {/* Healthy range band */}
                <rect
                  x={PAD.left}
                  y={PAD.top + chartH - ((25 - minBmi) / range) * chartH}
                  width={chartW}
                  height={((25 - 18.5) / range) * chartH}
                  fill="#10b981"
                  opacity="0.06"
                />

                {/* Y grid lines and labels */}
                {yLabels.map((v, i) => {
                  const y = PAD.top + chartH - ((v - minBmi) / range) * chartH;
                  return (
                    <g key={i}>
                      <line x1={PAD.left} y1={y} x2={W - PAD.right} y2={y} stroke="currentColor" strokeWidth="1" className="text-neutral-200 dark:text-neutral-700" strokeDasharray="4 4" />
                      <text x={PAD.left - 10} y={y + 4} textAnchor="end" className="fill-neutral-400 text-2xs font-500">
                        {v.toFixed(1)}
                      </text>
                    </g>
                  );
                })}

                {/* Area fill */}
                <path d={areaPath} fill="url(#area-gradient)" />

                {/* Line */}
                <path d={linePath} fill="none" stroke="url(#line-gradient)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                {/* Points */}
                {points.map((p, i) => {
                  const color = getBMIColor(getBMICategory(p.entry.bmi_value));
                  return (
                    <g key={p.entry.id}>
                      <circle cx={p.x} cy={p.y} r="6" fill={color} stroke="white" strokeWidth="2" className="dark:stroke-ink-800" />
                  <text x={p.x} y={H - PAD.bottom + 20} textAnchor="middle" className="fill-neutral-400 text-2xs font-500">
                    {new Date(p.entry.recorded_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </text>
                </g>
                  );
                })}
              </svg>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
            <button
              onClick={handleExport}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-100 dark:bg-ink-700 text-neutral-700 dark:text-neutral-300 font-500 hover:bg-neutral-200 dark:hover:bg-ink-600 transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              {t.trends.export}
            </button>
            <button
              onClick={() => { if (confirm(t.trends.confirmClear)) onClearAll(); }}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-error-500/10 text-error-600 dark:text-error-400 font-500 hover:bg-error-500/20 transition-all active:scale-95"
            >
              <Trash2 className="w-4 h-4" />
              {t.trends.clearAll}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value, color, icon }: { label: string; value: string; color: string; icon?: React.ReactNode }) {
  return (
    <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-ink-700/50 border border-neutral-100 dark:border-neutral-700/30">
      <div className="flex items-center gap-2">
        {icon && <span style={{ color }}>{icon}</span>}
        <span className="text-2xs font-600 text-neutral-400 uppercase tracking-wider">{label}</span>
      </div>
      <div className="mt-2 font-display font-700 text-2xl" style={{ color }}>
        {value}
      </div>
    </div>
  );
}
