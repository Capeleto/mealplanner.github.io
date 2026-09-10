'use client';
import { useI18n } from '@/lib/i18n';

export function LocaleToggle() {
  const { locale, setLocale, t } = useI18n();
  const next = locale === 'pt' ? 'en' : 'pt';
  return (
    <button
      onClick={() => setLocale(next)}
      title="Switch language / Trocar idioma"
      className="min-h-11 touch-manipulation rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700"
    >
      🌐 {t.meta.switchLabel}
    </button>
  );
}