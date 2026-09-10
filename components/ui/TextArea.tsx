'use client';
import type { TextareaHTMLAttributes } from 'react';

type Props = {
  value: string;
  onValueChange(value: string): void;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange' | 'value'>

export function TextArea({ value, onValueChange, className = '', ...rest }: Props) {
  return (
    <>
      <textarea
        className={`editable-textarea ${className}`}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        {...rest}
      />
      <div className="print-value">{value}</div>
    </>
  );
}