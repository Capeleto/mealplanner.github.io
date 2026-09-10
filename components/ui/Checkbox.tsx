'use client';

type Props = {
  checked: boolean;
  onChange(checked: boolean): void;
  className?: string;
}

export function Checkbox({ checked, onChange, className = '' }: Props) {
  return (
    <input
      type="checkbox"
      className={`h-5 w-5 shrink-0 cursor-pointer accent-slate-700 dark:accent-slate-300 md:mx-auto md:block ${className}`}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
  );
}