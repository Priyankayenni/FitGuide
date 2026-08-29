import { ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import type { Translation } from '@/lib/i18n';

interface HeroProps {
  t: Translation;
  onCtaClick: () => void;
  onSecondaryClick: () => void;
}

const HERO_IMAGE = 'https://images.pexels.com/photos/8875077/pexels-photo-8875077.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop';

export function Hero({ t, onCtaClick, onSecondaryClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMAGE}
          alt="Athlete training"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/95 via-ink-900/80 to-ink-900/40 dark:from-ink-900/95 dark:via-ink-900/80 dark:to-ink-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-ink-900/30" />
      </div>

      {/* Animated mesh gradient accents */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-secondary-500/10 rounded-full blur-[100px] animate-float" />

      {/* Content */}
      <div className="relative z-10 section-padding w-full pt-24 pb-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-500/30 mb-8 animate-fade-in-down">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-500 text-neutral-200">{t.hero.badge}</span>
          </div>

          <h1 className="font-display font-800 text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight text-white text-balance animate-fade-in-up">
            {t.hero.title}
            <br />
            <span className="gradient-text-accent">{t.hero.titleHighlight}</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-neutral-300 leading-relaxed max-w-2xl animate-fade-in-up animate-delay-200">
            {t.hero.subtitle}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-300">
            <button
              onClick={onCtaClick}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-600 text-lg shadow-glow-lg hover:shadow-glow-lg hover:scale-105 active:scale-95 transition-all duration-300"
            >
              {t.hero.cta}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onSecondaryClick}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl glass text-white font-600 text-lg hover:bg-white/10 active:scale-95 transition-all duration-300"
            >
              <TrendingUp className="w-5 h-5" />
              {t.hero.secondaryCta}
            </button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-2xl animate-fade-in-up animate-delay-500">
            {[
              { label: t.hero.stat1Label, value: t.hero.stat1Value },
              { label: t.hero.stat2Label, value: t.hero.stat2Value },
              { label: t.hero.stat3Label, value: t.hero.stat3Value },
            ].map((stat, i) => (
              <div key={i} className="text-left">
                <div className="font-display font-700 text-3xl md:text-4xl gradient-text">{stat.value}</div>
                <div className="mt-1 text-sm text-neutral-400 font-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-white/50 animate-bounce-subtle" />
        </div>
      </div>
    </section>
  );
}
