import { Sparkles } from "lucide-react";

/** Short, data-driven observations for a city and month (see lib/content/insights.ts). */
export function InsightList({ title, items, className = "" }: { title: string; items: string[]; className?: string }) {
  const list = items.filter(Boolean);
  if (list.length === 0) return null;
  return (
    <section className={`rounded-xl3 border border-violet-100 bg-gradient-to-br from-violet-50 to-sky-50 p-5 shadow-soft dark:border-violet-500/20 dark:from-violet-500/10 dark:to-sky-500/5 sm:p-6 ${className}`}>
      <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
        <Sparkles size={17} className="text-violet-500" aria-hidden="true" /> {title}
      </h2>
      <ul className="mt-3 space-y-2">
        {list.map((t) => (
          <li key={t} className="flex gap-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" aria-hidden="true" />
            {t}
          </li>
        ))}
      </ul>
    </section>
  );
}
