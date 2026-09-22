interface FaqItem {
  question: string;
  answer: string;
}

export function CityFaq({ items, title }: { items: FaqItem[]; title: string }) {
  return (
    <section aria-labelledby="faq-heading" className="rounded-xl3 border border-slate-200 bg-white p-6 dark:border-white/10 dark:bg-surface-dark-subtle sm:p-8">
      <h2 id="faq-heading" className="mb-5 text-xl font-semibold text-slate-900 dark:text-white">
        {title}
      </h2>
      <dl className="space-y-4">
        {items.map((item) => (
          <div key={item.question} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0 dark:border-white/10">
            <dt className="text-sm font-semibold text-slate-900 dark:text-white">{item.question}</dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
