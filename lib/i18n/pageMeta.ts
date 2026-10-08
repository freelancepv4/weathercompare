import type { Metadata } from "next";
import { siteConfig, defaultOgImage } from "@/config/site";
import { seoTitle, seoDescription } from "@/lib/seo";
import { pathFor, languageAlternates, type AnyLocale, type PageRef } from "./routing";

const OG_LOCALE: Record<AnyLocale, string> = {
  en: "en_GB",
  it: "it_IT",
  de: "de_DE",
  fr: "fr_FR",
  es: "es_ES",
  pt: "pt_PT",
  nl: "nl_NL",
  pl: "pl_PL",
};

/**
 * Metadata for any page that exists in every language: canonical URL,
 * hreflang alternates (all 8 versions + x-default), and length-safe
 * title/description.
 */
export function localizedMetadata(
  locale: AnyLocale,
  ref: PageRef,
  title: string,
  description: string,
  opts: { keywords?: string[]; ogImage?: boolean; noindex?: boolean } = {}
): Metadata {
  const url = `${siteConfig.url}${pathFor(locale, ref)}`;
  const images = opts.ogImage === false ? undefined : [defaultOgImage];
  return {
    title: seoTitle(title),
    description: seoDescription(description),
    ...(opts.keywords ? { keywords: opts.keywords } : {}),
    ...(opts.noindex ? { robots: { index: false, follow: true } } : {}),
    alternates: { canonical: url, languages: languageAlternates(siteConfig.url, ref) },
    openGraph: { type: "website", siteName: siteConfig.name, title, description, url, locale: OG_LOCALE[locale], ...(images ? { images } : {}) },
    twitter: { card: "summary_large_image", title, description, ...(images ? { images } : {}) },
  };
}

/** hreflang block to spread into an existing English page's `alternates`. */
export function hreflang(ref: PageRef) {
  return { languages: languageAlternates(siteConfig.url, ref) };
}
