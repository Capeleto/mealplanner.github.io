'use client';
import { useI18n } from '@/lib/i18n';
import type { AppState, GroceryItem } from '@/lib/types';
import { hasText } from '@/lib/print';
import { Section } from '../Section';
import { Checkbox } from '../ui/Checkbox';
import { TextInput } from '../ui/TextInput';

type Props = { state: AppState; onChange(next: AppState): void }

export function GroceryListSection({ state, onChange }: Props) {
  const { t } = useI18n();

  const update = (index: number, patch: Partial<GroceryItem>) => {
    const groceries = state.groceries.map((g, i) => (i === index ? { ...g, ...patch } : g));
    onChange({ ...state, groceries });
  };

  const hasAny = state.groceries.some((item) => hasText(item.text));

  return (
    <Section title={t.groceries.title} className={hasAny ? '' : 'print:hidden'}>
      <p className="text-slate-700 dark:text-slate-300 mb-4 print:hidden">{t.groceries.description}</p>
      <div className="flex flex-col gap-1.5">
        {state.groceries.map((item, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 min-h-11 py-2 border-b border-slate-100 dark:border-slate-800 print:items-start print:min-h-0 print:py-1 ${hasText(item.text) ? '' : 'print:hidden'}`}
          >
            <Checkbox checked={item.checked} onChange={(c) => update(i, { checked: c })} />
            <TextInput
              value={item.text}
              onValueChange={(v) => update(i, { text: v })}
              placeholder={`${t.groceries.itemPlaceholder} ${i + 1}...`}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}