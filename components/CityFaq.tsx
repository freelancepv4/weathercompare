import Link from "next/link";
import { paths, type AnyLocale } from "@/lib/i18n/routing";

const MORE: Record<AnyLocale, string> = {
  en: "More weather questions answered",
  it: "Altre domande frequenti sul meteo",
  de: "Weitere häufige Fragen zum Wetter",
  fr: "Plus de questions sur la météo",
  es: "Más preguntas frecuentes sobre el tiempo",
  pt: "Mais perguntas frequentes sobre o tempo",
  nl: "Meer veelgestelde vragen over het weer",
  pl: "Więcej pytań o pogodę",
};

interface FaqItem {
  question: string;
  answer: string;
}

export function CityFaq({ items, title, locale = "en" }: { items: FaqItem[]; title: string; locale?: AnyLocale }) {
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
      <p className="mt-5 text-sm">
        <Link href={paths.faq(locale)} className="font-medium text-brand-700 hover:underline dark:text-brand-300">
          {MORE[locale]} →
        </Link>
      </p>
    </section>
  );
}
