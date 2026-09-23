"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Logo } from "./Logo";
import { useTranslations, useI18n } from "@/lib/i18n/I18nProvider";
import { siteConfig, localeNames, type Locale } from "@/config/site";
import { popularCities } from "@/config/countries";
import { openCookiePreferences } from "./CookieConsent";

export function Footer() {
  const t = useTranslations();
  const { locale, setLocale } = useI18n();
  const cities = popularCities(6);

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-surface-dark">
      <div className="container-page grid grid-cols-2 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-slate-500 dark:text-slate-400">{t("footer.tagline")}</p>
          <div className="mt-5 flex gap-2">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social media"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-brand-600 hover:text-white dark:bg-white/5 dark:text-slate-400"
              >
                <Icon size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title={t("footer.navigation")}>
          <FooterLink href="/">{t("nav.weather")}</FooterLink>
          <FooterLink href="/#compare">{t("nav.compare")}</FooterLink>
          <FooterLink href="/#map">{t("nav.maps")}</FooterLink>
          <FooterLink href="/#alerts">{t("nav.alerts")}</FooterLink>
          <FooterLink href="/news">{t("nav.news")}</FooterLink>
          <FooterLink href="/favorites">{t("nav.favorites")}</FooterLink>
        </FooterColumn>

        <FooterColumn title={t("footer.company")}>
          <FooterLink href="/about">{t("footer.about")}</FooterLink>
          <FooterLink href="/contact">{t("footer.contact")}</FooterLink>
          <FooterLink href="/data-sources">{t("footer.dataSources")}</FooterLink>
          <FooterLink href="/status">{t("footer.status")}</FooterLink>
          <FooterLink href="/api-docs">{t("footer.api")}</FooterLink>
          <FooterLink href="/privacy">{t("footer.privacy")}</FooterLink>
          <FooterLink href="/cookies">{t("footer.cookies")}</FooterLink>
          <FooterLink href="/terms">{t("footer.terms")}</FooterLink>
          <li>
            <button
              type="button"
              onClick={openCookiePreferences}
              className="text-sm text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400"
            >
              {t("footer.cookieSettings")}
            </button>
          </li>
        </FooterColumn>

        <FooterColumn title={t("footer.cities")}>
          {cities.map(({ country, city }) => (
            <FooterLink key={city.slug} href={`/weather/${country.slug}/${city.slug}`}>
              {city.name}
            </FooterLink>
          ))}
        </FooterColumn>
      </div>

      <div className="border-t border-slate-100 py-5 dark:border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. {t("footer.rights")}
          </p>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">{t("footer.languages")}:</span>
            {siteConfig.locales.map((code: Locale) => (
              <button
                key={code}
                type="button"
                onClick={() => setLocale(code)}
                className={`transition-colors hover:text-brand-600 ${locale === code ? "font-semibold text-brand-600" : ""}`}
              >
                {localeNames[code]}
              </button>
            ))}
          </div>
        </div>
        <div className="container-page mt-3">
          <p className="max-w-3xl text-[11px] leading-relaxed text-slate-400 dark:text-slate-500">
            {t("footer.notMeteorologicalAuthority")}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
      <ul className="flex flex-col gap-2">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (!children) return null;
  return (
    <li>
      <Link href={href} className="text-sm text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400">
        {children}
      </Link>
    </li>
  );
}
