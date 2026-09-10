'use client';
import { useI18n } from '@/lib/i18n';
import type { AppState, ApplianceKey } from '@/lib/types';
import { APPLIANCE_KEYS } from '@/lib/defaultData';
import { hasText } from '@/lib/print';
import { Section, SubHeading, Paragraph, Callout, Cell } from '../Section';
import { Checkbox } from '../ui/Checkbox';
import { TextInput } from '../ui/TextInput';

type Props = { state: AppState; onChange(next: AppState): void }

export function AppliancesSection({ state, onChange }: Props) {
  const { t } = useI18n();

  const toggle = (key: ApplianceKey, checked: boolean) =>
    onChange({
      ...state,
      appliances: { ...state.appliances, [key]: { ...state.appliances[key], checked } },
    });

  const setNote = (key: ApplianceKey, note: string) =>
    onChange({
      ...state,
      appliances: { ...state.appliances, [key]: { ...state.appliances[key], note } },
    });

  const hasAny = APPLIANCE_KEYS.some(
    (key) => state.appliances[key].checked || hasText(state.appliances[key].note),
  );

  return (
    <Section title={t.appliances.title} className={hasAny ? '' : 'print:hidden'}>
      <Paragraph>{t.appliances.description}</Paragraph>
      <Paragraph><em>{t.appliances.example}</em></Paragraph>

      <SubHeading className="print:hidden">{t.appliances.sectionTitle}</SubHeading>
      <table className="section-table">
        <thead>
          <tr>
            <th>{t.appliances.columns.appliance}</th>
            <th className="w-24 text-center">{t.appliances.columns.use}</th>
            <th>{t.appliances.columns.notes}</th>
          </tr>
        </thead>
        <tbody>
          {APPLIANCE_KEYS.map((key) => (
            <tr
              key={key}
              className={
                state.appliances[key].checked || hasText(state.appliances[key].note)
                  ? undefined
                  : 'print:hidden'
              }
            >
              <Cell label={t.appliances.columns.appliance}>{t.appliances.labels[key]}</Cell>
              <Cell label={t.appliances.columns.use} className="md:text-center">
                <Checkbox checked={state.appliances[key].checked} onChange={(c) => toggle(key, c)} />
              </Cell>
              <Cell label={t.appliances.columns.notes}>
                <TextInput
                  value={state.appliances[key].note}
                  onValueChange={(v) => setNote(key, v)}
                  placeholder={key === 'other' ? t.appliances.otherPlaceholder : t.appliances.notePlaceholder}
                />
              </Cell>
            </tr>
          ))}
        </tbody>
      </table>

      <Callout className="print:hidden">
        <strong>{t.appliances.calloutTitle}</strong>
        <p className="mt-1">{t.appliances.calloutText}</p>
      </Callout>
    </Section>
  );
}