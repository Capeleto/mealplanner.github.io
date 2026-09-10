import type { AppState } from './types';
import { createDefaultState } from './defaultData';

const STORAGE_KEY = 'mealPlannerData.v2';
const THEME_KEY = 'mealPlannerTheme';
const LOCALE_KEY = 'mealPlannerLocale';

export type Theme = 'light' | 'dark';
export type Locale = 'pt' | 'en';

const isBrowser = () => typeof window !== 'undefined';

export function loadState(locale: Locale): AppState {
  if (!isBrowser()) return createDefaultState(locale);
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createDefaultState(locale);
    const parsed = JSON.parse(raw);
    return { ...createDefaultState(locale), ...parsed };
  } catch {
    return createDefaultState(locale);
  }
}

export function saveState(state: AppState): void {
  if (!isBrowser()) return;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* ignore */ }
}

export function clearStoredState(): void {
  if (!isBrowser()) return;
  localStorage.removeItem(STORAGE_KEY);
}

export function loadTheme(): Theme {
  if (!isBrowser()) return 'light';
  const stored = localStorage.getItem(THEME_KEY) as Theme | null;
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function saveTheme(theme: Theme): void {
  if (!isBrowser()) return;
  localStorage.setItem(THEME_KEY, theme);
}

export function loadLocale(): Locale {
  if (!isBrowser()) return 'pt';
  const stored = localStorage.getItem(LOCALE_KEY) as Locale | null;
  if (stored === 'pt' || stored === 'en') return stored;
  return navigator.language.toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

export function saveLocale(locale: Locale): void {
  if (!isBrowser()) return;
  localStorage.setItem(LOCALE_KEY, locale);
}