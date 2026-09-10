'use client';
import { useI18n } from '@/lib/i18n';

export function IntroSection() {
  const { t } = useI18n();
  const steps = [
    { s: t.header.steps.plan, d: t.header.steps.planDesc },
    { s: t.header.steps.pick, d: t.header.steps.pickDesc },
    { s: t.header.steps.cook, d: t.header.steps.cookDesc },
  ];
  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-1 tracking-tight">
        {t.header.title}
      </h1>
      <p className="text-base sm:text-xl font-light text-slate-700 dark:text-slate-300 border-b-2 border-slate-200 dark:border-slate-700 pb-4 print:text-sm print:pb-2 print:mb-4">
        {t.header.subtitle}
      </p>
      <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 mt-5 mb-3 print:hidden">{t.header.tagline}</p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 my-5 sm:my-6 print:hidden">
        {steps.map((item, i) => (
          <div
            key={i}
            className="flex-1 rounded-lg bg-slate-50 dark:bg-slate-800 border-t-4 border-slate-700 dark:border-slate-500 px-4 py-3 sm:px-5 sm:py-4 text-center"
          >
            <strong className="block text-lg text-slate-800 dark:text-slate-100">{item.s}</strong>
            <span className="text-sm text-slate-600 dark:text-slate-400">{item.d}</span>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/40 border-l-4 border-blue-600 dark:border-blue-400 rounded-md px-4 py-3 sm:px-5 sm:py-4 my-5 print:hidden">
        <strong className="text-slate-800 dark:text-slate-100">{t.header.ideaTitle}</strong>
        <p className="text-slate-800 dark:text-slate-100 mt-1">{t.header.ideaText}</p>
      </div>
    </>
  );
}