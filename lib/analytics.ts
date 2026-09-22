"use client";

import { readConsent } from "@/components/CookieConsent";

/**
 * Minimal, provider-agnostic analytics loader.
 *
 * Does nothing until the user has accepted the "Analytics" cookie category
 * AND NEXT_PUBLIC_ANALYTICS_ID (or ANALYTICS_ID passed through at build
 * time) is configured. Swap `injectScript` for your provider's real
 * snippet (GA4, Plausible, Fathom, etc.) — everything else (consent
 * gating) stays the same.
 */

let initialized = false;

export function initAnalyticsIfConsented(analyticsId?: string) {
  if (initialized || typeof window === "undefined") return;
  const consent = readConsent();
  if (!consent?.analytics || !analyticsId) return;
  injectScript(analyticsId);
  initialized = true;
}

function injectScript(analyticsId: string) {
  // Example GA4 wiring — replace with your provider of choice.
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
  document.head.appendChild(script);

  const inline = document.createElement("script");
  inline.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${analyticsId}', { anonymize_ip: true });
  `;
  document.head.appendChild(inline);
}

if (typeof window !== "undefined") {
  window.addEventListener("wc-consent-updated", () => {
    initialized = false;
    initAnalyticsIfConsented(process.env.NEXT_PUBLIC_ANALYTICS_ID);
  });
}
