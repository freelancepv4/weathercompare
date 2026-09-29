import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SearchBar } from "@/components/SearchBar";
import { buildFaq, FAQ_COPY } from "@/lib/content/faq";
import { paths, type AnyLocale } from "@/lib/i18n/routing";

/** /faq and its translations: the site-wide weather FAQ. */
export function FaqPage({ locale }: { locale: AnyLocale }) {
  const t = FAQ_COPY[locale];
  const sections = buildFaq(locale);
  const url = `${siteConfig.url}${paths.faq(locale)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        url,
        name: t.h1,
        inLanguage: locale,
        mainEntity: sections.flatMap((s) =>
          s.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } }))
        ),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.home, item: `${siteConfig.url}${paths.home(locale)}` },
          { "@type": "ListItem", position: 2, name: t.crumb, item: url },
        ],
      },
    ],
  };

  return (
    <div className="container-page py-8 sm:py-10">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb items={[{ label: t.home, href: paths.home(locale) }, { label: t.crumb }]} />

      <header className="max-w-3xl">
        <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-300">
          <HelpCircle size={14} aria-hidden="true" /> FAQ
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">{t.h1}</h1>
        <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">{t.intro}</p>
      </header>

      <nav aria-label={t.crumb} className="mt-6 flex flex-wrap gap-2">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:border-brand-400 hover:text-brand-700 dark:border-white/10 dark:bg-surface-dark-subtle dark:text-slate-200"
          >
            {s.heading}
          </a>
        ))}
      </nav>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-10">
          {sections.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-24">
              <h2 id={`${s.id}-h`} className="mb-4 text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">
                {s.heading}
              </h2>
              <div className="divide-y divide-slate-100 rounded-xl3 border border-slate-200 bg-white dark:divide-white/10 dark:border-white/10 dark:bg-surface-dark-subtle">
                {s.items.map((item, i) => (
                  <details key={item.q} className="group p-5 sm:p-6" open={i === 0}>
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-base font-semibold text-slate-900 dark:text-white [&::-webkit-details-marker]:hidden">
                      <h3 className="text-base font-semibold">{item.q}</h3>
                      <span aria-hidden="true" className="mt-0.5 text-lg leading-none text-brand-600 transition-transform group-open:rotate-45 dark:text-brand-300">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{item.a}</p>
                    {item.links && item.links.length > 0 && (
                      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                        {item.links.map((l) => (
                          <Link key={l.href} href={l.href} className="font-medium text-brand-700 hover:underline dark:text-brand-300">
                            {l.label} →
                          </Link>
                        ))}
                      </p>
                    )}
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl3 border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-surface-dark-subtle">
            <SearchBar compact />
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href={paths.countries(locale)} className="font-medium text-brand-700 hover:underline dark:text-brand-300">
                  {t.l.countries} →
                </Link>
              </li>
              <li>
                <Link href={paths.today(locale)} className="font-medium text-brand-700 hover:underline dark:text-brand-300">
                  {t.l.today} →
                </Link>
              </li>
              <li>
                <Link href={paths.tripFinder(locale)} className="font-medium text-brand-700 hover:underline dark:text-brand-300">
                  {t.l.tripFinder} →
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
