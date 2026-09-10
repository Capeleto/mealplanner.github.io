'use client';
import { useI18n } from '@/lib/i18n';
import type { AppState, CookingStep, PrepKey, PrepTask } from '@/lib/types';
import { PREP_KEYS } from '@/lib/defaultData';
import { hasText } from '@/lib/print';
import { Section, SubHeading, Cell } from '../Section';
import { Checkbox } from '../ui/Checkbox';
import { TextInput } from '../ui/TextInput';
import { TextArea } from '../ui/TextArea';

type Props = { state: AppState; onChange(next: AppState): void }

export function CookingOrderSection({ state, onChange }: Props) {
  const { t } = useI18n();

  const updateStep = (index: number, patch: Partial<CookingStep>) => {
    const cookingSteps = state.cookingSteps.map((s, i) => (i === index ? { ...s, ...patch } : s));
    onChange({ ...state, cookingSteps });
  };

  const updatePrep = (key: PrepKey, patch: Partial<PrepTask>) => {
    onChange({
      ...state,
      prepTasks: { ...state.prepTasks, [key]: { ...state.prepTasks[key], ...patch } },
    });
  };

  const filledSteps = state.cookingSteps.some((step) =>
    hasText(step.dish, step.appliance, step.prep, step.cook, step.order) || step.handsOff,
  );
  const filledPrep = PREP_KEYS.some(
    (key) => hasText(state.prepTasks[key].forDishes) || state.prepTasks[key].done,
  );
  const hasSequence = hasText(state.cookingSequence);

  return (
    <Section title={t.cooking.title} className={filledSteps || filledPrep || hasSequence ? '' : 'print:hidden'}>
      <p className="text-slate-700 dark:text-slate-300 mb-4 print:hidden">{t.cooking.description}</p>
      <table className={`section-table ${filledSteps ? '' : 'print:hidden'}`}>
        <thead>
          <tr>
            <th>{t.cooking.columns.dish}</th>
            <th>{t.cooking.columns.appliance}</th>
            <th>{t.cooking.columns.prep}</th>
            <th>{t.cooking.columns.cook}</th>
            <th>{t.cooking.columns.order}</th>
            <th className="w-24 text-center">{t.cooking.columns.handsOff}</th>
          </tr>
        </thead>
        <tbody>
          {state.cookingSteps.map((step, i) => (
            <tr
              key={i}
              className={
                hasText(step.dish, step.appliance, step.prep, step.cook, step.order) || step.handsOff
                  ? undefined
                  : 'print:hidden'
              }
            >
              <Cell label={t.cooking.columns.dish}><TextInput value={step.dish} onValueChange={(v) => updateStep(i, { dish: v })} placeholder={`${t.cooking.placeholders.dish} ${i + 1}`} /></Cell>
              <Cell label={t.cooking.columns.appliance}><TextInput value={step.appliance} onValueChange={(v) => updateStep(i, { appliance: v })} placeholder={t.cooking.placeholders.appliance} /></Cell>
              <Cell label={t.cooking.columns.prep}><TextInput value={step.prep} onValueChange={(v) => updateStep(i, { prep: v })} placeholder={t.cooking.placeholders.prep} /></Cell>
              <Cell label={t.cooking.columns.cook}><TextInput value={step.cook} onValueChange={(v) => updateStep(i, { cook: v })} placeholder={t.cooking.placeholders.cook} /></Cell>
              <Cell label={t.cooking.columns.order}><TextInput value={step.order} onValueChange={(v) => updateStep(i, { order: v })} placeholder={t.cooking.placeholders.order} /></Cell>
              <Cell label={t.cooking.columns.handsOff} className="md:text-center"><Checkbox checked={step.handsOff} onChange={(c) => updateStep(i, { handsOff: c })} /></Cell>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-sm text-slate-600 dark:text-slate-400 print:hidden">{t.cooking.tip}</p>

      <SubHeading className={filledPrep ? '' : 'print:hidden'}>{t.cooking.prepTitle}</SubHeading>
      <table className={`section-table ${filledPrep ? '' : 'print:hidden'}`}>
        <thead>
          <tr>
            <th>{t.cooking.prepColumns.task}</th>
            <th>{t.cooking.prepColumns.forDishes}</th>
            <th className="w-28 text-center">{t.cooking.prepColumns.once}</th>
          </tr>
        </thead>
        <tbody>
          {PREP_KEYS.map((key) => (
            <tr
              key={key}
              className={
                hasText(state.prepTasks[key].forDishes) || state.prepTasks[key].done
                  ? undefined
                  : 'print:hidden'
              }
            >
              <Cell label={t.cooking.prepColumns.task}>{t.cooking.prepLabels[key]}</Cell>
              <Cell label={t.cooking.prepColumns.forDishes}>
                <TextInput
                  value={state.prepTasks[key].forDishes}
                  onValueChange={(v) => updatePrep(key, { forDishes: v })}
                  placeholder={t.cooking.prepPlaceholder}
                />
              </Cell>
              <Cell label={t.cooking.prepColumns.once} className="md:text-center">
                <Checkbox checked={state.prepTasks[key].done} onChange={(c) => updatePrep(key, { done: c })} />
              </Cell>
            </tr>
          ))}
        </tbody>
      </table>

      <SubHeading className={hasSequence ? '' : 'print:hidden'}>{t.cooking.sequenceTitle}</SubHeading>
      <TextArea
        value={state.cookingSequence}
        onValueChange={(v) => onChange({ ...state, cookingSequence: v })}
        placeholder={t.cooking.sequencePlaceholder}
        className={`min-h-[80px] ${hasSequence ? '' : 'print:hidden'}`}
      />
    </Section>
  );
}