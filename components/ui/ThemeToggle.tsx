'use client';
import { useTheme } from '@/hooks/useTheme';
import { useI18n } from '@/lib/i18n';

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { t } = useI18n();
  return (
    <button
      onClick={toggle}
      title={theme === 'dark' ? t.meta.themeLight : t.meta.themeDark}
      className="min-h-11 min-w-11 touch-manipulation rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}