import type { ReactNode, TdHTMLAttributes } from 'react';

export function Section({
  title,
  children,
  className = '',
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mt-6 sm:mt-8 break-inside-avoid print:break-inside-auto ${className}`}>
      {title ? <h2 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-slate-100 border-b-2 border-slate-200 dark:border-slate-700 pb-2 mb-4 print:text-base print:mb-2 print:pb-1">
          {title}
        </h2> : null}
      {children}
    </section>
  );
}

export function Cell({
  label,
  children,
  className = '',
  ...rest
}: TdHTMLAttributes<HTMLTableCellElement> & { label: string; children: ReactNode }) {
  return (
    <td className={className} {...rest}>
      <span className="font-semibold text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 md:hidden print:hidden">
        {label}
      </span>
      <div className="min-w-0 print:overflow-visible">{children}</div>
    </td>
  );
}

export function SubHeading({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h3 className={`text-base font-semibold text-slate-800 dark:text-slate-100 mt-6 mb-3 print:mt-3 print:mb-2 print:text-sm ${className}`}>
      {children}
    </h3>
  );
}

export function Paragraph({ children }: { children: ReactNode }) {
  return <p className="text-slate-700 dark:text-slate-300 mb-3 print:hidden">{children}</p>;
}

export function Callout({
  children,
  tone = 'info',
  className = '',
}: {
  children: ReactNode;
  tone?: 'info' | 'warning' | 'success';
  className?: string;
}) {
  const tones = {
    info: 'bg-blue-50 dark:bg-blue-950/40 border-blue-600 dark:border-blue-400',
    warning: 'bg-amber-50 dark:bg-amber-950/40 border-amber-500',
    success: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500',
  };
  return (
    <div className={`my-4 sm:my-5 rounded-md border-l-4 px-4 py-3 sm:px-5 sm:py-3.5 text-slate-800 dark:text-slate-100 ${tones[tone]} ${className}`}>
      {children}
    </div>
  );
}