'use client';
import { useI18n } from '@/lib/i18n';
import type { AppState, DayKey } from '@/lib/types';
import { DAY_KEYS } from '@/lib/defaultData';
import { hasText } from '@/lib/print';
import { Section, Callout, Cell } from '../Section';
import { TextInput } from '../ui/TextInput';

type Props = { state: AppState; onChange(next: AppState): void }

export function WeekPlanSection({ state, onChange }: Props) {
  const { t } = useI18n();

  const update = (day: DayKey, field: keyof AppState['week'][DayKey], value: string) =>
    onChange({
      ...state,
      week: { ...state.week, [day]: { ...state.week[day], [field]: value } },
    });

  const filledDays = DAY_KEYS.some((day) =>
    hasText(state.week[day].lunch, state.week[day].lunchSide, state.week[day].dinner, state.week[day].dinnerSide),
  );
  const hasFlex = hasText(state.flexNotes);

  return (
    <Section title={t.week.title} className={filledDays || hasFlex ? '' : 'print:hidden'}>
      <p className="text-slate-700 dark:text-slate-300 mb-4 print:hidden">{t.week.description}</p>
      <table className={`section-table ${filledDays ? '' : 'print:hidden'}`}>
        <thead>
          <tr>
            <th>{t.week.columns.day}</th>
            <th>{t.week.columns.lunch}</th>
            <th>{t.week.columns.lunchSide}</th>
            <th>{t.week.columns.dinner}</th>
            <th>{t.week.columns.dinnerSide}</th>
          </tr>
        </thead>
        <tbody>
          {DAY_KEYS.map((day) => (
            <tr
              key={day}
              className={
                hasText(state.week[day].lunch, state.week[day].lunchSide, state.week[day].dinner, state.week[day].dinnerSide)
                  ? undefined
                  : 'print:hidden'
              }
            >
              <Cell label={t.week.columns.day} className="font-bold">{t.week.days[day]}</Cell>
              <Cell label={t.week.columns.lunch}><TextInput value={state.week[day].lunch} onValueChange={(v) => update(day, 'lunch', v)} placeholder={t.week.placeholders.lunch} /></Cell>
              <Cell label={t.week.columns.lunchSide}><TextInput value={state.week[day].lunchSide} onValueChange={(v) => update(day, 'lunchSide', v)} placeholder={t.week.placeholders.side} /></Cell>
              <Cell label={t.week.columns.dinner}><TextInput value={state.week[day].dinner} onValueChange={(v) => update(day, 'dinner', v)} placeholder={t.week.placeholders.dinner} /></Cell>
              <Cell label={t.week.columns.dinnerSide}><TextInput value={state.week[day].dinnerSide} onValueChange={(v) => update(day, 'dinnerSide', v)} placeholder={t.week.placeholders.side} /></Cell>
            </tr>
          ))}
        </tbody>
      </table>

      <Callout tone="warning" className={hasFlex ? '' : 'print:hidden'}>
        <strong>{t.week.flexTitle}</strong>
        <p className="mt-1 print:hidden">{t.week.flexText}</p>
        <div className="mt-2">
          <TextInput
            value={state.flexNotes}
            onValueChange={(v) => onChange({ ...state, flexNotes: v })}
            placeholder={t.week.flexPlaceholder}
          />
        </div>
      </Callout>
    </Section>
  );
}