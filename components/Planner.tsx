"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { createDefaultState } from "@/lib/defaultData";
import { clearStoredState, loadState, saveState } from "@/lib/storage";
import type { AppState } from "@/lib/types";

import { Toolbar } from "./Toolbar";
import { IntroSection } from "./sections/IntroSection";
import { AppliancesSection } from "./sections/AppliancesSection";
import { BaseDishesSection } from "./sections/BaseDishesSection";
import { SidesSection } from "./sections/SidesSection";
import { WeekPlanSection } from "./sections/WeekPlanSection";
import { IngredientsSection } from "./sections/IngredientsSection";
import { GroceryListSection } from "./sections/GroceryListSection";
import { CookingOrderSection } from "./sections/CookingOrderSection";
import { StorageSection } from "./sections/StorageSection";

function subscribeToHydration(): () => void {
  return () => {};
}

function getHydratedSnapshot(): boolean {
  return true;
}

function getServerHydratedSnapshot(): boolean {
  return false;
}

function PlannerInner() {
  const { locale } = useI18n();

  const hydrated = useSyncExternalStore(
    subscribeToHydration,
    getHydratedSnapshot,
    getServerHydratedSnapshot,
  );

  const [editedState, setEditedState] = useState<AppState | null>(null);

  const state = useMemo<AppState>(
    () =>
      editedState ??
      (hydrated ? loadState(locale) : createDefaultState(locale)),
    [editedState, hydrated, locale],
  );

  useEffect(() => {
    if (editedState === null) return;
    saveState(editedState);
  }, [editedState]);

  const setState = useCallback((next: AppState) => {
    setEditedState(next);
  }, []);

  const handleClear = useCallback(() => {
    clearStoredState();
    setEditedState(createDefaultState(locale));
  }, [locale]);

  return (
    <div className="min-h-screen pb-[max(1rem,env(safe-area-inset-bottom))] sm:pb-[max(1.5rem,env(safe-area-inset-bottom))] print:min-h-0 print:p-0">
      <Toolbar onClear={handleClear} />
      <main
        id="planner-print"
        className="mx-auto w-full max-w-4xl mt-4 px-3 sm:px-4 bg-transparent print:mt-0 print:px-0"
      >
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl p-4 sm:p-6 md:p-10 print:shadow-none print:p-0 print:rounded-none transition-colors">
          <IntroSection />
          <AppliancesSection state={state} onChange={setState} />
          <BaseDishesSection state={state} onChange={setState} />
          <SidesSection state={state} onChange={setState} />
          <WeekPlanSection state={state} onChange={setState} />
          <IngredientsSection state={state} onChange={setState} />
          <GroceryListSection state={state} onChange={setState} />
          <CookingOrderSection state={state} onChange={setState} />
          <StorageSection state={state} onChange={setState} />
        </div>
      </main>
    </div>
  );
}

export function Planner() {
  return (
    <I18nProvider>
      <PlannerInner />
    </I18nProvider>
  );
}
