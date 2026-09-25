import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { AssistantWidget } from "@/components/AssistantWidget";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Weather forecasts, compared in one place`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  // Deprecated as a Google ranking signal, but still read by Bing and a few
  // smaller engines, and costs nothing to include. Mixes English with the
  // native terms used across the countries this site covers, since a
  // visitor searching in their own language types "meteo" or "wetter," not
  // "weather" — matching what the site's own translated UI already says
  // once they land (see locales/*.json), not new/unrelated terms.
  keywords: [
    "weather forecast",
    "weather comparison",
    "10 day forecast",
    "meteo",
    "previsioni meteo",
    "wetter",
    "wettervorhersage",
    "météo",
    "prévisions météo",
    "tiempo",
    "pronóstico del tiempo",
    "clima",
  ],
  applicationName: siteConfig.name,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Weather forecasts, compared in one place`,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    title: `${siteConfig.name} — Weather forecasts, compared in one place`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  // Search-engine ownership verification codes, read from env vars so they
  // can be added/changed in Vercel without a code change. Only included
  // when actually set, so this is a no-op until you add one.
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
    other: {
      ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
        ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
        : {}),
      // Pinterest domain claim (Settings → Link to Pinterest → Claim your
      // website → "Add HTML tag"). Hardcoded rather than env-gated like the
      // others above — it needs to be live in <head> before Pinterest's
      // "Claim your website" button will find and verify it.
      "p:domain_verify": "eef2b4125671cb9026780d9f6f0bbdc1",
    },
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteConfig.defaultLocale} suppressHydrationWarning>
      <head>
        {/* Set <html lang> for the translated /{lang}/ sections before first paint. */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `(function(){var m=location.pathname.match(/^\\/(it|de|fr|es|pt|nl|pl)(\\/|$)/);if(m)document.documentElement.lang=m[1];})();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers locale={siteConfig.defaultLocale}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to content
          </a>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieConsent />
          {/* Chat assistant appears only once a Gemini key is configured (see app/api/assistant/route.ts). */}
          {process.env.GEMINI_API_KEY ? <AssistantWidget /> : null}
        </Providers>
      </body>
    </html>
  );
}
