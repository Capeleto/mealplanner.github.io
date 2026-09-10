"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { loadTheme, saveTheme, type Theme } from "@/lib/storage";

const THEME_CHANGE_EVENT = "mealPlannerThemeChange";

function subscribeToTheme(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_CHANGE_EVENT, callback);

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
    media.removeEventListener("change", callback);
  };
}

function getThemeSnapshot(): Theme {
  return loadTheme();
}

function getThemeServerSnapshot(): Theme {
  return "light";
}

function applyTheme(next: Theme): void {
  document.documentElement.classList.toggle("dark", next === "dark");
}

function writeTheme(next: Theme): void {
  saveTheme(next);
  applyTheme(next);
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

export function useTheme() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getThemeServerSnapshot,
  );

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggle = useCallback(() => {
    writeTheme(getThemeSnapshot() === "dark" ? "light" : "dark");
  }, []);

  const setTheme = useCallback((next: Theme) => {
    writeTheme(next);
  }, []);

  return { theme, toggle, setTheme };
}
