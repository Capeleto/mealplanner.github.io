"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Dictionary } from "./types";
import { pt } from "./pt";
import { en } from "./en";
import { loadLocale, saveLocale, type Locale } from "@/lib/storage";

const dictionaries: Record<Locale, Dictionary> = { pt, en };

type I18nValue = {
  locale: Locale;
  t: Dictionary;
  setLocale(locale: Locale): void;
};

const I18nContext = createContext<I18nValue | null>(null);
const LOCALE_CHANGE_EVENT = "mealPlannerLocaleChange";

function subscribeToLocale(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  window.addEventListener(LOCALE_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LOCALE_CHANGE_EVENT, callback);
  };
}

function getLocaleSnapshot(): Locale {
  return loadLocale();
}

function getLocaleServerSnapshot(): Locale {
  return "pt";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribeToLocale,
    getLocaleSnapshot,
    getLocaleServerSnapshot,
  );

  const setLocale = useCallback((next: Locale) => {
    saveLocale(next);
    window.dispatchEvent(new Event(LOCALE_CHANGE_EVENT));
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en";
  }, [locale]);

  return (
    <I18nContext.Provider
      value={{ locale, t: dictionaries[locale], setLocale }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
