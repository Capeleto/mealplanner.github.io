'use client';
import { useI18n } from '@/lib/i18n';
import type { AppState } from '@/lib/types';
import { hasText } from '@/lib/print';
import { Section, Callout } from '../Section';
import { TextArea } from '../ui/TextArea';

type Props = { state: AppState; onChange(next: AppState): void }

export function IngredientsSection({ state, onChange }: Props) {
  const { t } = useI18n();

  const update = (index: number, value: string) => {
    const ingredients = state.ingredients.map((ing, i) => (i === index ? value : ing));
    onChange({ ...state, ingredients });
  };

  const hasAny = state.ingredients.some((ing) => hasText(ing));

  return (
    <Section title={t.ingredients.title} className={hasAny ? '' : 'print:hidden'}>
      <p className="text-slate-700 dark:text-slate-300 mb-4 print:hidden">{t.ingredients.description}</p>

      <div className="rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50 p-3 sm:p-5 print:border print:border-solid print:border-slate-300 print:bg-white print:p-0">
        <div className="font-semibold mb-3 text-slate-800 dark:text-slate-100 print:mb-2 print:text-sm">
          {t.ingredients.boxTitle}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 print:grid-cols-2 print:gap-3">
          {state.ingredients.map((ing, i) => (
            <div key={i} className={hasText(ing) ? undefined : 'print:hidden'}>
              <strong className="text-sm text-slate-700 dark:text-slate-300">
                {t.ingredients.dishLabel} {i + 1}:
              </strong>
              <TextArea
                value={ing}
                onValueChange={(v) => update(i, v)}
                placeholder={t.ingredients.placeholder}
                className="min-h-[50px] mt-1"
              />
            </div>
          ))}
        </div>
      </div>

      <Callout tone="warning" className="print:hidden">{t.ingredients.tip}</Callout>
    </Section>
  );
}