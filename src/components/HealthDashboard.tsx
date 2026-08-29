import { useState, useEffect } from 'react';
import {
  Activity, HeartPulse, Footprints, Flame, Moon, Zap, Mail, Watch,
  TrendingUp, Users, Calendar, AlertCircle, RefreshCw
} from 'lucide-react';
import type { Translation } from '@/lib/i18n';
import type { BMIEntry, User, WearableData } from '@/types';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface HealthDashboardProps {
  t: Translation;
  entries: BMIEntry[];
  user: User | null;
  onSignIn: () => void;
}

export function HealthDashboard({ t, entries, user, onSignIn }: HealthDashboardProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();
  const [wearable, setWearable] = useState<WearableData | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [alertSaved, setAlertSaved] = useState(false);

  // Simulate wearable sync
  const syncWearable = () => {
    setSyncing(true);
    setTimeout(() => {
      setWearable({
        steps: Math.floor(6000 + Math.random() * 8000),
        heartRate: Math.floor(60 + Math.random() * 30),
        caloriesBurned: Math.floor(300 + Math.random() * 500),
        activeMinutes: Math.floor(20 + Math.random() * 60),
        sleepHours: Math.round((5 + Math.random() * 4) * 10) / 10,
        distance: Math.round((3 + Math.random() * 7) * 10) / 10,
      });
      setSyncing(false);
    }, 1500);
  };

  useEffect(() => {
    syncWearable();
  }, []);

  const handleToggleAlerts = () => {
    setEmailAlerts(!emailAlerts);
    if (!emailAlerts) {
      setAlertSaved(true);
      setTimeout(() => setAlertSaved(false), 2000);
    }
  };

  // Admin stats
  const totalEntries = entries.length;
  const avgBmi = totalEntries > 0 ? (entries.reduce((s, e) => s + e.bmi_value, 0) / totalEntries).toFixed(1) : '—';
  const latestBmi = totalEntries > 0 ? entries[entries.length - 1].bmi_value.toFixed(1) : '—';
  const categoryCount = entries.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <section id="dashboard" className="section-padding py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-500/10 text-neutral-600 dark:text-neutral-300 mb-4">
            <Activity className="w-4 h-4" />
            <span className="text-sm font-600">{t.dashboard.title}</span>
          </div>
          <h2 className="font-display font-700 text-4xl md:text-5xl tracking-tight">{t.dashboard.title}</h2>
          <p className="mt-3 text-neutral-500 dark:text-neutral-400 text-lg">{t.dashboard.subtitle}</p>
        </div>

        {!user ? (
          <div className="card-surface p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-primary-500" />
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 font-500 mb-4">{t.dashboard.signInRequired}</p>
            <button onClick={onSignIn} className="btn-primary inline-flex items-center gap-2">
              {t.auth.signIn}
            </button>
          </div>
        ) : (
          <div ref={ref} className={`space-y-8 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            {/* Wearable data */}
            <div className="card-surface p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-500">
                    <Watch className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-700 text-lg">{t.dashboard.wearable}</h3>
                    <p className="text-sm text-neutral-400">{t.dashboard.wearableDesc}</p>
                  </div>
                </div>
                <button
                  onClick={syncWearable}
                  disabled={syncing}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 dark:bg-ink-700 text-sm font-600 hover:bg-neutral-200 dark:hover:bg-ink-600 transition-all active:scale-95 disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
                  {t.dashboard.sync}
                </button>
              </div>

              {wearable && !syncing ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <WearableStat icon={<Footprints className="w-5 h-5" />} label={t.dashboard.steps} value={wearable.steps.toLocaleString()} color="#10b981" />
                  <WearableStat icon={<HeartPulse className="w-5 h-5" />} label={t.dashboard.heartRate} value={`${wearable.heartRate} bpm`} color="#ef4444" />
                  <WearableStat icon={<Flame className="w-5 h-5" />} label={t.dashboard.caloriesBurned} value={`${wearable.caloriesBurned} kcal`} color="#f59e0b" />
                  <WearableStat icon={<Zap className="w-5 h-5" />} label={t.dashboard.activeMinutes} value={`${wearable.activeMinutes} min`} color="#14b8a6" />
                  <WearableStat icon={<Moon className="w-5 h-5" />} label={t.dashboard.sleep} value={`${wearable.sleepHours} hrs`} color="#6366f1" />
                  <WearableStat icon={<TrendingUp className="w-5 h-5" />} label={t.dashboard.distance} value={`${wearable.distance} km`} color="#f97316" />
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-24 rounded-2xl bg-neutral-100 dark:bg-ink-700 animate-pulse" />
                  ))}
                </div>
              )}
            </div>

            {/* Email alerts */}
            <div className="card-surface p-6 md:p-8">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-accent-500/10 flex items-center justify-center text-accent-500">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-700 text-lg">{t.dashboard.emailAlerts}</h3>
                    <p className="text-sm text-neutral-400">{t.dashboard.emailAlertsDesc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {alertSaved && (
                    <span className="text-sm font-600 text-success-500 animate-fade-in">{t.dashboard.alertSaved}</span>
                  )}
                  <button
                    onClick={handleToggleAlerts}
                    className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${emailAlerts ? 'bg-primary-500' : 'bg-neutral-300 dark:bg-neutral-700'}`}
                  >
                    <div className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 ${emailAlerts ? 'translate-x-7' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Admin dashboard stats */}
            <div className="card-surface p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-secondary-500/10 flex items-center justify-center text-secondary-500">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-700 text-lg">{t.dashboard.adminPanel}</h3>
                  <p className="text-sm text-neutral-400">{t.dashboard.adminPanelDesc}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <AdminStat icon={<Calendar className="w-5 h-5" />} label={t.dashboard.totalEntries} value={String(totalEntries)} color="#10b981" />
                <AdminStat icon={<TrendingUp className="w-5 h-5" />} label={t.dashboard.latestBmi} value={latestBmi} color="#14b8a6" />
                <AdminStat icon={<Activity className="w-5 h-5" />} label={t.dashboard.averageBmi} value={avgBmi} color="#f59e0b" />
                <AdminStat icon={<Users className="w-5 h-5" />} label={t.dashboard.categories} value={String(Object.keys(categoryCount).length)} color="#f97316" />
              </div>

              {/* Category breakdown */}
              {totalEntries > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-600 text-neutral-600 dark:text-neutral-300 mb-3">{t.dashboard.categoryBreakdown}</p>
                  <div className="space-y-2">
                    {(['underweight', 'normal', 'overweight', 'obese'] as const).map((cat) => {
                      const count = categoryCount[cat] ?? 0;
                      const pct = totalEntries > 0 ? (count / totalEntries) * 100 : 0;
                      const colors: Record<string, string> = { underweight: '#f59e0b', normal: '#10b981', overweight: '#f97316', obese: '#ef4444' };
                      return (
                        <div key={cat} className="flex items-center gap-3">
                          <span className="text-xs font-600 w-24 capitalize text-neutral-500 dark:text-neutral-400">{t.calculator[cat]}</span>
                          <div className="flex-1 h-6 rounded-lg bg-neutral-100 dark:bg-ink-700 overflow-hidden">
                            <div className="h-full rounded-lg transition-all duration-700 flex items-center justify-end pr-2" style={{ width: `${pct}%`, backgroundColor: colors[cat] }}>
                              {pct > 15 && <span className="text-2xs font-700 text-white">{count}</span>}
                            </div>
                          </div>
                          {pct <= 15 && <span className="text-xs font-600 text-neutral-400">{count}</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="mt-6 p-4 rounded-xl bg-neutral-50 dark:bg-ink-700/50 flex gap-3">
                <AlertCircle className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-neutral-400 dark:text-neutral-500 leading-relaxed">{t.dashboard.adminNote}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function WearableStat({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-ink-700/50 border border-neutral-100 dark:border-neutral-700/30">
      <div className="flex items-center gap-2 mb-2" style={{ color }}>
        {icon}
        <span className="text-2xs font-600 text-neutral-400 uppercase tracking-wider">{label}</span>
      </div>
      <div className="font-display font-700 text-xl" style={{ color }}>{value}</div>
    </div>
  );
}

function AdminStat({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-ink-700/50 border border-neutral-100 dark:border-neutral-700/30">
      <div className="flex items-center gap-2 mb-2" style={{ color }}>
        {icon}
        <span className="text-2xs font-600 text-neutral-400 uppercase tracking-wider">{label}</span>
      </div>
      <div className="font-display font-700 text-2xl" style={{ color }}>{value}</div>
    </div>
  );
}
