import { Trophy, Users, Footprints, Droplets, Apple, Sunrise, Plus, Check, Flame, X } from 'lucide-react';
import type { Translation } from '@/lib/i18n';
import type { Challenge, UserChallenge, User } from '@/types';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface GroupChallengesProps {
  t: Translation;
  challenges: Challenge[];
  userChallenges: UserChallenge[];
  user: User | null;
  onJoin: (challengeId: string) => Promise<boolean>;
  onProgress: (userChallengeId: string, progress: number, target: number) => Promise<boolean>;
  onLeave: (userChallengeId: string) => Promise<boolean>;
  onSignIn: () => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Trophy: <Trophy className="w-6 h-6" />,
  Footprints: <Footprints className="w-6 h-6" />,
  Droplets: <Droplets className="w-6 h-6" />,
  Apple: <Apple className="w-6 h-6" />,
  Sunrise: <Sunrise className="w-6 h-6" />,
};

const categoryColors: Record<string, string> = {
  core: '#10b981',
  cardio: '#f59e0b',
  wellness: '#14b8a6',
  nutrition: '#f97316',
  fitness: '#ef4444',
};

export function GroupChallenges({ t, challenges, userChallenges, user, onJoin, onProgress, onLeave, onSignIn }: GroupChallengesProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  const joinedIds = new Set(userChallenges.map((uc) => uc.challenge_id));

  return (
    <section id="challenges" className="section-padding py-20 md:py-28 relative">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-accent-500/5 dark:bg-accent-500/3 rounded-full blur-[150px] -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/10 text-accent-600 dark:text-accent-400 mb-4">
            <Users className="w-4 h-4" />
            <span className="text-sm font-600">{t.challenges.title}</span>
          </div>
          <h2 className="font-display font-700 text-4xl md:text-5xl tracking-tight">{t.challenges.title}</h2>
          <p className="mt-3 text-neutral-500 dark:text-neutral-400 text-lg">{t.challenges.subtitle}</p>
        </div>

        {!user && (
          <div className="card-surface p-8 text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary-500" />
            </div>
            <p className="text-neutral-600 dark:text-neutral-300 font-500 mb-4">{t.challenges.signInToJoin}</p>
            <button onClick={onSignIn} className="btn-primary inline-flex items-center gap-2">
              {t.auth.signIn}
            </button>
          </div>
        )}

        <div ref={ref} className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {challenges.map((challenge, i) => {
            const userChallenge = userChallenges.find((uc) => uc.challenge_id === challenge.id);
            const isJoined = joinedIds.has(challenge.id);
            const color = categoryColors[challenge.category] ?? '#10b981';
            const progress = userChallenge?.progress ?? 0;
            const progressPct = Math.min(100, (progress / challenge.target) * 100);

            return (
              <div
                key={challenge.id}
                className="card-surface p-6 flex flex-col group hover:shadow-cinematic transition-all duration-500 hover:-translate-y-1"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${color}15`, color }}>
                    {iconMap[challenge.icon] ?? <Trophy className="w-6 h-6" />}
                  </div>
                  {isJoined && userChallenge?.status === 'completed' && (
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-success-500/15 text-success-600 dark:text-success-400 text-2xs font-700">
                      <Check className="w-3 h-3" /> {t.challenges.completed}
                    </div>
                  )}
                </div>

                <h3 className="font-display font-700 text-lg mb-1">{challenge.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4 flex-1">{challenge.description}</p>

                <div className="flex items-center gap-3 mb-4 text-xs font-500 text-neutral-400">
                  <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5" />{challenge.duration_days} {t.challenges.days}</span>
                  <span className="flex items-center gap-1"><Trophy className="w-3.5 h-3.5" />{challenge.target} {t.challenges.target}</span>
                </div>

                {isJoined && userChallenge ? (
                  <>
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs font-600 mb-1.5">
                        <span className="text-neutral-500 dark:text-neutral-400">{t.challenges.progress}</span>
                        <span style={{ color }}>{progress} / {challenge.target}</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-neutral-100 dark:bg-ink-700 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${progressPct}%`, backgroundColor: color }}
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onProgress(userChallenge.id, Math.min(challenge.target, progress + 1), challenge.target)}
                        disabled={userChallenge.status === 'completed'}
                        className="flex-1 px-4 py-2.5 rounded-xl text-sm font-600 text-white transition-all active:scale-95 disabled:opacity-50"
                        style={{ backgroundColor: color }}
                      >
                        <Plus className="w-4 h-4 inline mr-1" />{t.challenges.logProgress}
                      </button>
                      <button
                        onClick={() => onLeave(userChallenge.id)}
                        className="p-2.5 rounded-xl bg-neutral-100 dark:bg-ink-700 text-neutral-400 hover:text-error-500 transition-all"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => user ? onJoin(challenge.id) : onSignIn()}
                    className="w-full px-4 py-2.5 rounded-xl text-sm font-600 transition-all active:scale-95 border-2 hover:bg-opacity-10"
                    style={{ borderColor: color, color }}
                  >
                    {t.challenges.join}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
