import { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Activity } from 'lucide-react';
import type { Translation } from '@/lib/i18n';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onSignIn: (email: string, password: string) => Promise<{ error: string | null }>;
  onSignUp: (email: string, password: string) => Promise<{ error: string | null }>;
  t: Translation;
}

export function AuthModal({ open, onClose, onSignIn, onSignUp, t }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setError(null);
      setEmail('');
      setPassword('');
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = mode === 'signin' ? await onSignIn(email, password) : await onSignUp(email, password);
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-ink-900/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md glass-strong rounded-3xl shadow-cinematic p-8 animate-scale-in">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-glow">
            <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display font-700 text-xl">Fit<span className="gradient-text">Guide</span></span>
        </div>

        <h2 className="font-display font-700 text-2xl mb-1">
          {mode === 'signin' ? t.auth.signInTitle : t.auth.signUpTitle}
        </h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
          {mode === 'signin' ? t.auth.signInSubtitle : t.auth.signUpSubtitle}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-600 text-neutral-700 dark:text-neutral-300 mb-2">
              <Mail className="w-4 h-4 text-primary-500" />
              {t.auth.email}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input-field"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-600 text-neutral-700 dark:text-neutral-300 mb-2">
              <Lock className="w-4 h-4 text-primary-500" />
              {t.auth.password}
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-field"
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-error-500/10 text-error-600 dark:text-error-400 text-sm font-500 animate-fade-in">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {t.common.loading}
              </>
            ) : (
              <>
                <User className="w-5 h-5" />
                {mode === 'signin' ? t.auth.signIn : t.auth.signUp}
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-neutral-500 dark:text-neutral-400">
            {mode === 'signin' ? t.auth.noAccount : t.auth.haveAccount}
          </span>
          <button
            onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(null); }}
            className="ml-2 font-600 text-primary-600 dark:text-primary-400 hover:underline"
          >
            {mode === 'signin' ? t.auth.signUp : t.auth.signIn}
          </button>
        </div>
      </div>
    </div>
  );
}
