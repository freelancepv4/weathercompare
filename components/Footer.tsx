"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Phone } from "lucide-react";
import { PinterestIcon, InstagramIcon, FacebookIcon, LinkedInIcon, XIcon, WhatsAppIcon } from "./SocialIcons";
import { Logo } from "./Logo";
import { useTranslations, useI18n } from "@/lib/i18n/I18nProvider";
import { siteConfig, localeNames, type Locale } from "@/config/site";
import { popularCities, countries } from "@/config/countries";
import { openCookiePreferences } from "./CookieConsent";
import { paths, parsePath, pathFor } from "@/lib/i18n/routing";
import { cityName, countryName } from "@/lib/i18n/places";

// Only profiles with a URL in siteConfig.social are shown — add Instagram,
// Facebook etc. there once those accounts exist.
const SOCIAL_LINKS = (
  [
    { key: "pinterest", label: "Pinterest", Icon: PinterestIcon, hover: "hover:bg-[#E60023]" },
    { key: "instagram", label: "Instagram", Icon: InstagramIcon, hover: "hover:bg-[#d62976]" },
    { key: "facebook", label: "Facebook", Icon: FacebookIcon, hover: "hover:bg-[#1877F2]" },
    { key: "linkedin", label: "LinkedIn", Icon: LinkedInIcon, hover: "hover:bg-[#0A66C2]" },
    { key: "x", label: "X", Icon: XIcon, hover: "hover:bg-black" },
  ] as const
).filter((s) => siteConfig.social[s.key]);

export function Footer() {
  const t = useTranslations();
  const { locale, setLocale } = useI18n();
  const cities = popularCities(6);
  const pathname = usePathname();

  // See the matching check in Header.tsx — /embed/* pages are a bare
  // widget meant to sit inside someone else's page, not the full site chrome.
  if (pathname?.startsWith("/embed")) return null;

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-surface-dark">
      <div className="container-page grid grid-cols-2 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="col-span-2 lg:col-span-2">
          <Logo href={paths.home(locale)} />
          <p className="mt-4 max-w-xs text-sm text-slate-500 dark:text-slate-400">{t("footer.tagline")}</p>
          <address className="mt-4 space-y-1.5 text-sm not-italic">
            <span className="sr-only">{t("footer.contactUs")}</span>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="flex items-center gap-2 text-slate-600 transition-colors hover:text-brand-600 dark:text-slate-300"
            >
              <Mail size={16} aria-hidden="true" />
              {siteConfig.contactEmail}
            </a>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp ${siteConfig.phoneDisplay}`}
              className="flex items-center gap-2 text-slate-600 transition-colors hover:text-[#128C7E] dark:text-slate-300"
            >
              <WhatsAppIcon size={16} />
              WhatsApp
            </a>
            <a
              href={`tel:+${siteConfig.whatsapp}`}
              className="flex items-center gap-2 text-slate-600 transition-colors hover:text-brand-600 dark:text-slate-300"
            >
              <Phone size={16} aria-hidden="true" />
              {siteConfig.phoneDisplay}
            </a>
          </address>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {SOCIAL_LINKS.map(({ key, label, Icon, hover }) => (
              <a
                key={key}
                href={siteConfig.social[key]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${siteConfig.name} on ${label}`}
                title={`Follow us on ${label}`}
                className={`flex h-9 items-center gap-2 rounded-full bg-slate-100 px-3 text-sm font-medium text-slate-600 transition-colors hover:text-white dark:bg-white/5 dark:text-slate-300 ${hover}`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title={t("footer.navigation")}>
          <FooterLink href={paths.home(locale)}>{t("nav.weather")}</FooterLink>
          <FooterLink href={paths.today(locale)}>{t("nav.weatherToday")}</FooterLink>
          {/* compare/map/alerts are sections on a city page, not the homepage
              — see the matching comment in components/Header.tsx */}
          <FooterLink href="/weather/italy/rome#compare">{t("nav.compare")}</FooterLink>
          <FooterLink href="/weather/italy/rome#map">{t("nav.maps")}</FooterLink>
          <FooterLink href={paths.tripFinder(locale)}>{t("nav.tripFinder")}</FooterLink>
          <FooterLink href="/news">{t("nav.news")}</FooterLink>
          <FooterLink href="/guides">{t("nav.guides")}</FooterLink>
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
            <FooterLink key={city.slug} href={paths.city(locale, country.slug, city.slug)}>
              {cityName(city.slug, city.name, locale)}
            </FooterLink>
          ))}
        </FooterColumn>
      </div>

      <nav aria-label={t("footer.byCountry")} className="container-page border-t border-slate-100 py-6 dark:border-white/10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{t("footer.byCountry")}</p>
        <ul className="flex flex-wrap gap-x-4 gap-y-2">
          {countries.map((c) => (
            <li key={c.slug}>
              <Link href={paths.country(locale, c.slug)} className="text-sm text-slate-500 transition-colors hover:text-brand-600 dark:text-slate-400">
                {countryName(c.slug, c.name, locale)}
              </Link>
            </li>
          ))}
          <li>
            <Link href={paths.whereToGo(locale, new Date().getMonth())} className="text-sm font-medium text-brand-600 hover:underline dark:text-brand-300">
              {t("footer.whereByMonth")}
            </Link>
          </li>
        </ul>
      </nav>

      <div className="border-t border-slate-100 py-5 dark:border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. {t("footer.rights")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span className="hidden sm:inline">{t("footer.languages")}:</span>
            {siteConfig.locales.map((code: Locale) => {
              // Real links (crawlable) to this page in each language, or that language's home.
              const parsed = parsePath(pathname || "/");
              const href = parsed ? pathFor(code, parsed.ref) : paths.home(code);
              return (
                <Link
                  key={code}
                  href={href}
                  hrefLang={code}
                  onClick={() => setLocale(code)}
                  className={`transition-colors hover:text-brand-600 ${locale === code ? "font-semibold text-brand-600" : ""}`}
                >
                  {localeNames[code]}
                </Link>
              );
            })}
          </div>
        </div>
        <div className="container-page mt-3">
          <p className="max-w-3xl text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
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
