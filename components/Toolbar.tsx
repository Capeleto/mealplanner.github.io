"use client";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { Button } from "./ui/Button";
import { ThemeToggle } from "./ui/ThemeToggle";
import { LocaleToggle } from "./ui/LocaleToggle";

type Props = { onClear(): void };

export function Toolbar({ onClear }: Props) {
  const { t } = useI18n();
  const [tone, setTone] = useState<"saved" | "cleared">("saved");
  const timeoutRef = useRef<number | null>(null);

  const message = tone === "cleared" ? t.toolbar.cleared : t.toolbar.saved;

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleClear = () => {
    if (!confirm(t.toolbar.clearConfirm)) return;

    onClear();
    setTone("cleared");

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setTone("saved");
      timeoutRef.current = null;
    }, 2500);
  };

  return (
    <header className="sticky top-0 z-30 print:hidden bg-slate-100/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-700/80 pt-[max(0.75rem,env(safe-area-inset-top))]">
      <div className="mx-auto w-full max-w-4xl px-3 sm:px-4 pb-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <span
          className={`self-start rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-medium transition ${
            tone === "cleared"
              ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-200"
              : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200"
          }`}
          aria-live="polite"
        >
          {message}
        </span>
        <div className="flex flex-wrap gap-2 sm:ml-auto">
          <Button
            className="flex-1 sm:flex-none"
            onClick={() => window.print()}
          >
            {t.toolbar.print}
          </Button>
          <Button
            className="flex-1 sm:flex-none"
            variant="danger"
            onClick={handleClear}
          >
            {t.toolbar.clear}
          </Button>
          <ThemeToggle />
          <LocaleToggle />
        </div>
      </div>
    </header>
  );
}
