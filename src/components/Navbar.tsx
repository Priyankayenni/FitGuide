import { useState, useEffect } from 'react';
import { Activity, Moon, Sun, Globe, Menu, X, User, LogOut } from 'lucide-react';
import type { Theme, Language, User as UserType } from '@/types';
import { languageNames } from '@/lib/i18n';
import type { Translation } from '@/lib/i18n';

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: Translation;
  user: UserType | null;
  onSignIn: () => void;
  onSignOut: () => void;
}

export function Navbar({ theme, toggleTheme, language, changeLanguage, t, user, onSignIn, onSignOut }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { id: 'calculator', label: t.nav.calculator },
    { id: 'trends', label: t.nav.trends },
    { id: 'recommendations', label: t.nav.recommendations },
    { id: 'meals', label: t.nav.meals },
    { id: 'videos', label: t.nav.videos },
    { id: 'challenges', label: t.nav.challenges },
    { id: 'dashboard', label: t.nav.dashboard },
    { id: 'history', label: t.nav.history },
  ];

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-strong shadow-card py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="section-padding flex items-center justify-between">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
              <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="absolute inset-0 rounded-xl bg-primary-500/30 blur-lg -z-10 group-hover:bg-primary-500/40 transition-colors" />
          </div>
          <span className="font-display font-700 text-xl tracking-tight">
            Fit<span className="gradient-text">Guide</span>
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="px-3 py-2 rounded-lg text-sm font-500 text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-all duration-200"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-500 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-all duration-200"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">{languageNames[language]}</span>
              <span className="sm:hidden uppercase">{language}</span>
            </button>
            {langOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                <div className="absolute right-0 mt-2 w-40 glass-strong rounded-xl shadow-cinematic overflow-hidden z-50 animate-scale-in">
                  {(['en', 'te', 'hi'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => { changeLanguage(lang); setLangOpen(false); }}
                      className={`w-full px-4 py-2.5 text-sm text-left font-500 transition-colors duration-200 ${
                        language === lang
                          ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60'
                      }`}
                    >
                      {languageNames[lang]}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-all duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-500 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-all duration-200"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-xs font-700">
                  {user.email[0].toUpperCase()}
                </div>
                <span className="hidden sm:inline max-w-32 truncate">{user.email}</span>
              </button>
              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 glass-strong rounded-xl shadow-cinematic overflow-hidden z-50 animate-scale-in">
                    <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-700/50">
                      <p className="text-xs font-600 text-neutral-400 uppercase tracking-wider">{t.auth.email}</p>
                      <p className="text-sm font-600 text-neutral-700 dark:text-neutral-200 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => { onSignOut(); setUserMenuOpen(false); }}
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm font-500 text-error-600 dark:text-error-400 hover:bg-error-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      {t.auth.signOut}
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={onSignIn}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-500 text-white text-sm font-600 hover:bg-primary-600 active:scale-95 transition-all shadow-glow"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">{t.auth.signIn}</span>
            </button>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-all"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden glass-strong border-t border-neutral-200/60 dark:border-neutral-700/40 animate-fade-in-down">
          <div className="section-padding py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="px-4 py-3 rounded-lg text-sm font-500 text-left text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition-all"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
