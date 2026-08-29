import { Activity } from 'lucide-react';
import type { Translation } from '@/lib/i18n';

interface FooterProps {
  t: Translation;
}

export function Footer({ t }: FooterProps) {
  return (
    <footer className="relative section-padding py-16 border-t border-neutral-200 dark:border-neutral-800">
      <div className="absolute inset-0 bg-mesh dark:bg-mesh-dark opacity-50 -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-md">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-glow">
                <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-700 text-xl">
                Fit<span className="gradient-text">Guide</span>
              </span>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 leading-relaxed">{t.footer.tagline}</p>
          </div>

          <div className="flex flex-col gap-2 text-sm text-neutral-400 dark:text-neutral-500">
            <a href="#calculator" className="hover:text-primary-500 transition-colors">{t.nav.calculator}</a>
            <a href="#trends" className="hover:text-primary-500 transition-colors">{t.nav.trends}</a>
            <a href="#recommendations" className="hover:text-primary-500 transition-colors">{t.nav.recommendations}</a>
            <a href="#history" className="hover:text-primary-500 transition-colors">{t.nav.history}</a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-xs text-neutral-400 dark:text-neutral-500 leading-relaxed max-w-3xl">
            {t.footer.disclaimer}
          </p>
          <p className="mt-4 text-sm text-neutral-400 dark:text-neutral-500">
            © {new Date().getFullYear()} FitGuide. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
