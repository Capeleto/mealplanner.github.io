'use client';
import { useI18n } from '@/lib/i18n';
import type { AppState, StorageItem } from '@/lib/types';
import { hasText } from '@/lib/print';
import { Section, Callout, SubHeading, Cell } from '../Section';
import { Checkbox } from '../ui/Checkbox';
import { TextInput } from '../ui/TextInput';
import { TextArea } from '../ui/TextArea';

type Props = { state: AppState; onChange(next: AppState): void }

export function StorageSection({ state, onChange }: Props) {
  const { t } = useI18n();

  const update = (index: number, patch: Partial<StorageItem>) => {
    const storage = state.storage.map((s, i) => (i === index ? { ...s, ...patch } : s));
    onChange({ ...state, storage });
  };

  const filledStorage = state.storage.some(
    (item) => hasText(item.dish, item.portions) || item.fridge || item.freezer || item.useFirst,
  );
  const hasReheat = hasText(state.reheatNotes);
  const hasNextWeek = hasText(state.nextWeekNotes);

  return (
    <Section title={t.storage.title} className={filledStorage || hasReheat || hasNextWeek ? '' : 'print:hidden'}>
      <p className="text-slate-700 dark:text-slate-300 mb-4 print:hidden">{t.storage.description}</p>

      <div className="flex flex-wrap gap-4 mb-4 print:hidden">
        <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-full px-4 py-2 text-sm">
          {t.storage.fridgeChecked}
        </span>
        <span className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-full px-4 py-2 text-sm">
          {t.storage.containersReady}
        </span>
      </div>

      <SubHeading className={filledStorage ? '' : 'print:hidden'}>{t.storage.sectionTitle}</SubHeading>
      <table className={`section-table ${filledStorage ? '' : 'print:hidden'}`}>
        <thead>
          <tr>
            <th>{t.storage.columns.dish}</th>
            <th>{t.storage.columns.portions}</th>
            <th className="w-24 text-center">{t.storage.columns.fridge}</th>
            <th className="w-24 text-center">{t.storage.columns.freezer}</th>
            <th className="w-28 text-center">{t.storage.columns.useFirst}</th>
          </tr>
        </thead>
        <tbody>
          {state.storage.map((item, i) => (
            <tr
              key={i}
              className={
                hasText(item.dish, item.portions) || item.fridge || item.freezer || item.useFirst
                  ? undefined
                  : 'print:hidden'
              }
            >
              <Cell label={t.storage.columns.dish}><TextInput value={item.dish} onValueChange={(v) => update(i, { dish: v })} placeholder={`${t.storage.dishLabel} ${i + 1}`} /></Cell>
              <Cell label={t.storage.columns.portions}><TextInput value={item.portions} onValueChange={(v) => update(i, { portions: v })} placeholder="4" /></Cell>
              <Cell label={t.storage.columns.fridge} className="md:text-center"><Checkbox checked={item.fridge} onChange={(c) => update(i, { fridge: c })} /></Cell>
              <Cell label={t.storage.columns.freezer} className="md:text-center"><Checkbox checked={item.freezer} onChange={(c) => update(i, { freezer: c })} /></Cell>
              <Cell label={t.storage.columns.useFirst} className="md:text-center"><Checkbox checked={item.useFirst} onChange={(c) => update(i, { useFirst: c })} /></Cell>
            </tr>
          ))}
        </tbody>
      </table>

      <SubHeading className={hasReheat ? '' : 'print:hidden'}>{t.storage.reheatTitle}</SubHeading>
      <TextArea
        value={state.reheatNotes}
        onValueChange={(v) => onChange({ ...state, reheatNotes: v })}
        placeholder={t.storage.reheatPlaceholder}
        className={`min-h-[60px] ${hasReheat ? '' : 'print:hidden'}`}
      />

      <Callout tone="success" className="print:hidden">
        <strong>{t.storage.finalTitle}</strong>
        <p className="mt-1">{t.storage.finalText}</p>
      </Callout>

      <SubHeading className={hasNextWeek ? '' : 'print:hidden'}>{t.storage.nextWeekTitle}</SubHeading>
      <TextArea
        value={state.nextWeekNotes}
        onValueChange={(v) => onChange({ ...state, nextWeekNotes: v })}
        placeholder={t.storage.nextWeekPlaceholder}
        className={`min-h-[80px] ${hasNextWeek ? '' : 'print:hidden'}`}
      />
    </Section>
  );
}