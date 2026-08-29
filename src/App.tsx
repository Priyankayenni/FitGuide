// Standard React + TypeScript setup — use provided types from @types/react
import { useState, useCallback, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { BMICalculator } from '@/components/BMICalculator';
import { TrendChart } from '@/components/TrendChart';
import { Recommendations } from '@/components/Recommendations';
import { MealPlanning } from '@/components/MealPlanning';
import { VideoTutorials } from '@/components/VideoTutorials';
import { GroupChallenges } from '@/components/GroupChallenges';
import { HealthDashboard } from '@/components/HealthDashboard';
import { MLPrediction } from '@/components/MLPrediction';
import { SocialShare } from '@/components/SocialShare';
import { HistoryList } from '@/components/HistoryList';
import { Footer } from '@/components/Footer';
import { AuthModal } from '@/components/AuthModal';
import { AIChatbot } from '@/components/AIChatbot';
import { useTheme } from '@/hooks/useTheme';
import { useLanguage } from '@/hooks/useLanguage';
import { useAuth } from '@/hooks/useAuth';
import { useBmiEntries } from '@/hooks/useBmiEntries';
import { useChallenges } from '@/hooks/useChallenges';
import type { BMIResult } from '@/types';

function App() {
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useLanguage();
  const { user, signIn, signUp, signOut } = useAuth();
  const { entries, addEntry, deleteEntry, clearAll } = useBmiEntries(user?.id ?? null);
  const { challenges, userChallenges, joinChallenge, updateProgress, leaveChallenge } = useChallenges(user?.id ?? null);
  const [currentResult, setCurrentResult] = useState<BMIResult | null>(null);
  const [authOpen, setAuthOpen] = useState(false);

  // Dev helper: auto-scroll to and briefly highlight the calculator on load
  useEffect(() => {
    try {
      // Only run in dev mode
      // Vite exposes import.meta.env.DEV
      // @ts-ignore
      if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV) {
        setTimeout(() => {
          const el = document.getElementById('calculator');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            const origOutline = el.style.outline;
            el.style.outline = '4px solid rgba(16,185,129,0.18)';
            // leave animation handling to the global reveal observer
            setTimeout(() => { el.style.outline = origOutline; }, 2200);
          }
        }, 250);
      }
    } catch (e) {
      // ignore in prod or unsupported environments
    }
  }, []);

  // Global reveal observer: add `.is-visible` to elements with `.animate-on-scroll`
  useEffect(() => {
    try {
      const els = Array.from(document.querySelectorAll('.animate-on-scroll')) as Element[];
      if (!els.length) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
      );
      els.forEach((el) => obs.observe(el));
      return () => obs.disconnect();
    } catch (e) {
      // ignore
    }
  }, []);

  const handleSave = useCallback(
    async (heightCm: number, weightKg: number, date: string, note: string): Promise<boolean> => {
      if (!user) {
        setAuthOpen(true);
        return false;
      }
      const result = await addEntry({ height_cm: heightCm, weight_kg: weightKg, recorded_date: date, note });
      return result !== null;
    },
    [addEntry, user]
  );

  const scrollToCalculator = () => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToFeatures = () => document.getElementById('meals')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-ink-900 transition-colors duration-500">
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        language={language}
        changeLanguage={changeLanguage}
        t={t}
        user={user}
        onSignIn={() => setAuthOpen(true)}
        onSignOut={signOut}
      />
      <main>
        <Hero t={t} onCtaClick={scrollToCalculator} onSecondaryClick={scrollToFeatures} />
        <BMICalculator t={t} onSave={handleSave} onResultChange={setCurrentResult} user={user} onSignIn={() => setAuthOpen(true)} />
        <TrendChart t={t} entries={entries} onClearAll={clearAll} />
        <Recommendations t={t} language={language} result={currentResult} />
        <MealPlanning t={t} result={currentResult} />
        <VideoTutorials t={t} />
        <MLPrediction t={t} language={language} entries={entries} />
        <GroupChallenges
          t={t}
          challenges={challenges}
          userChallenges={userChallenges}
          user={user}
          onJoin={joinChallenge}
          onProgress={updateProgress}
          onLeave={leaveChallenge}
          onSignIn={() => setAuthOpen(true)}
        />
        <HealthDashboard t={t} entries={entries} user={user} onSignIn={() => setAuthOpen(true)} />
        <SocialShare t={t} result={currentResult} entries={entries} />
        <HistoryList t={t} entries={entries} onDelete={deleteEntry} />
      </main>
      <Footer t={t} />

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onSignIn={signIn}
        onSignUp={signUp}
        t={t}
      />
      <AIChatbot t={t} language={language} bmiResult={currentResult} />
    </div>
  );
}

export default App;
