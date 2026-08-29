import { useState, useCallback } from 'react';
import type { Language } from '@/types';
import { translations, type Translation } from '@/lib/i18n';

const STORAGE_KEY = 'fitguide-language';

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
  if (stored === 'en' || stored === 'te' || stored === 'hi') return stored;
  return 'en';
}

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  const changeLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }, []);

  const t: Translation = translations[language];

  return { language, changeLanguage, t };
}
