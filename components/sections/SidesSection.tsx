'use client';
import { useI18n } from '@/lib/i18n';
import type { AppState, Side } from '@/lib/types';
import { hasText } from '@/lib/print';
import { Section, SubHeading, Paragraph, Cell } from '../Section';
import { TextInput } from '../ui/TextInput';
import { TextArea } from '../ui/TextArea';

type Props = { state: AppState; onChange(next: AppState): void }

export function SidesSection({ state, onChange }: Props) {
  const { t } = useI18n();

  const updateSide = (index: number, patch: Partial<Side>) => {
    const sides = state.sides.map((s, i) => (i === index ? { ...s, ...patch } : s));
    onChange({ ...state, sides });
  };

  const filledSides = state.sides.some((side) =>
    hasText(side.dish, side.optionA, side.optionB, side.texture),
  );
  const hasOther = hasText(state.otherSides);

  return (
    <Section title={t.sides.title} className={filledSides || hasOther ? '' : 'print:hidden'}>
      <Paragraph>{t.sides.description}</Paragraph>
      <Paragraph><em>{t.sides.example}</em></Paragraph>

      <SubHeading className={filledSides ? '' : 'print:hidden'}>{t.sides.sectionTitle}</SubHeading>
      <table className={`section-table ${filledSides ? '' : 'print:hidden'}`}>
        <thead>
          <tr>
            <th>{t.sides.columns.base}</th>
            <th>{t.sides.columns.optionA}</th>
            <th>{t.sides.columns.optionB}</th>
            <th>{t.sides.columns.texture}</th>
          </tr>
        </thead>
        <tbody>
          {state.sides.map((side, i) => (
            <tr
              key={i}
              className={hasText(side.dish, side.optionA, side.optionB, side.texture) ? undefined : 'print:hidden'}
            >
              <Cell label={t.sides.columns.base}><TextInput value={side.dish} onValueChange={(v) => updateSide(i, { dish: v })} placeholder={`${t.sides.placeholders.dish} ${i + 1}`} /></Cell>
              <Cell label={t.sides.columns.optionA}><TextInput value={side.optionA} onValueChange={(v) => updateSide(i, { optionA: v })} placeholder={t.sides.placeholders.optionA} /></Cell>
              <Cell label={t.sides.columns.optionB}><TextInput value={side.optionB} onValueChange={(v) => updateSide(i, { optionB: v })} placeholder={t.sides.placeholders.optionB} /></Cell>
              <Cell label={t.sides.columns.texture}><TextInput value={side.texture} onValueChange={(v) => updateSide(i, { texture: v })} placeholder={t.sides.placeholders.texture} /></Cell>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-sm text-slate-600 dark:text-slate-400 print:hidden">{t.sides.tip}</p>

      <SubHeading className="print:hidden">{t.sides.ideasTitle}</SubHeading>
      <table className="section-table print:hidden">
        <thead>
          <tr>
            <th>{t.sides.ideaColumns.carbs}</th>
            <th>{t.sides.ideaColumns.fresh}</th>
            <th>{t.sides.ideaColumns.crunch}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Cell label={t.sides.ideaColumns.carbs}><TextInput value={state.carbsIdea} onValueChange={(v) => onChange({ ...state, carbsIdea: v })} /></Cell>
            <Cell label={t.sides.ideaColumns.fresh}><TextInput value={state.freshIdea} onValueChange={(v) => onChange({ ...state, freshIdea: v })} /></Cell>
            <Cell label={t.sides.ideaColumns.crunch}><TextInput value={state.crunchIdea} onValueChange={(v) => onChange({ ...state, crunchIdea: v })} /></Cell>
          </tr>
        </tbody>
      </table>

      <SubHeading className={hasOther ? '' : 'print:hidden'}>{t.sides.otherTitle}</SubHeading>
      <TextArea
        value={state.otherSides}
        onValueChange={(v) => onChange({ ...state, otherSides: v })}
        placeholder={t.sides.otherPlaceholder}
        className={`min-h-[50px] ${hasOther ? '' : 'print:hidden'}`}
      />
    </Section>
  );
}