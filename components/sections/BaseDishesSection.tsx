'use client';
import { useI18n } from '@/lib/i18n';
import type { AppState, Dish } from '@/lib/types';
import { hasText } from '@/lib/print';
import { Section, SubHeading, Paragraph, Cell } from '../Section';
import { TextInput } from '../ui/TextInput';
import { TextArea } from '../ui/TextArea';

type Props = { state: AppState; onChange(next: AppState): void }

export function BaseDishesSection({ state, onChange }: Props) {
  const { t } = useI18n();

  const updateDish = (index: number, patch: Partial<Dish>) => {
    const dishes = state.dishes.map((d, i) => (i === index ? { ...d, ...patch } : d));
    onChange({ ...state, dishes });
  };

  const filledDishes = state.dishes.some((dish) =>
    hasText(dish.name, dish.protein, dish.appliance, dish.portions),
  );
  const hasNotes = hasText(state.recipeNotes);

  return (
    <Section title={t.dishes.title} className={filledDishes || hasNotes ? '' : 'print:hidden'}>
      <Paragraph>{t.dishes.description}</Paragraph>

      <SubHeading className={filledDishes ? '' : 'print:hidden'}>{t.dishes.sectionTitle}</SubHeading>
      <table className={`section-table ${filledDishes ? '' : 'print:hidden'}`}>
        <thead>
          <tr>
            <th>{t.dishes.columns.dish}</th>
            <th>{t.dishes.columns.protein}</th>
            <th>{t.dishes.columns.appliance}</th>
            <th>{t.dishes.columns.portions}</th>
          </tr>
        </thead>
        <tbody>
          {state.dishes.map((dish, i) => (
            <tr
              key={i}
              className={hasText(dish.name, dish.protein, dish.appliance, dish.portions) ? undefined : 'print:hidden'}
            >
              <Cell label={t.dishes.columns.dish}><TextInput value={dish.name} onValueChange={(v) => updateDish(i, { name: v })} placeholder={t.dishes.placeholders.name} /></Cell>
              <Cell label={t.dishes.columns.protein}><TextInput value={dish.protein} onValueChange={(v) => updateDish(i, { protein: v })} placeholder={t.dishes.placeholders.protein} /></Cell>
              <Cell label={t.dishes.columns.appliance}><TextInput value={dish.appliance} onValueChange={(v) => updateDish(i, { appliance: v })} placeholder={t.dishes.placeholders.appliance} /></Cell>
              <Cell label={t.dishes.columns.portions}><TextInput value={dish.portions} onValueChange={(v) => updateDish(i, { portions: v })} placeholder={t.dishes.placeholders.portions} /></Cell>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-sm text-slate-600 dark:text-slate-400 print:hidden">{t.dishes.tip}</p>

      <SubHeading className={hasNotes ? '' : 'print:hidden'}>{t.dishes.notesTitle}</SubHeading>
      <TextArea
        value={state.recipeNotes}
        onValueChange={(v) => onChange({ ...state, recipeNotes: v })}
        placeholder={t.dishes.notesPlaceholder}
        className={`min-h-[60px] ${hasNotes ? '' : 'print:hidden'}`}
      />
    </Section>
  );
}