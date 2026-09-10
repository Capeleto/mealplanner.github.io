'use client';
import type { InputHTMLAttributes } from 'react';

type Props = {
  value: string;
  onValueChange(value: string): void;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'>

export function TextInput({ value, onValueChange, className = '', ...rest }: Props) {
  return (
    <>
      <input
        type="text"
        className={`editable-input ${className}`}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        {...rest}
      />
      <span className="print-value">{value}</span>
    </>
  );
}