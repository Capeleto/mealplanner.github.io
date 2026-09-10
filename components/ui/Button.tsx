import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Props = {
  variant?: 'primary' | 'danger';
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ variant = 'primary', className = '', children, ...rest }: Props) {
  const base =
    'min-h-11 px-4 py-2.5 sm:py-2 rounded-md text-sm font-semibold text-white transition shadow-sm ' +
    'touch-manipulation sm:hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50';
  const variants = {
    primary: 'bg-slate-700 hover:bg-slate-900 dark:bg-slate-600 dark:hover:bg-slate-500',
    danger: 'bg-red-700 hover:bg-red-800',
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}