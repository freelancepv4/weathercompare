"use client";

import { useState } from "react";
import { Link2, Check, Share2 } from "lucide-react";
import { useTranslations } from "@/lib/i18n/I18nProvider";
import { FacebookIcon, LinkedInIcon, PinterestIcon, WhatsAppIcon, XIcon } from "./SocialIcons";

interface ShareBarProps {
  /** Absolute URL of the page being shared. */
  url: string;
  title: string;
  /** Absolute image URL for Pinterest (the page's 2:3 portrait card). */
  pinImage?: string;
  /** Pin description; defaults to the title. */
  pinDescription?: string;
  className?: string;
}

/**
 * Share row: a prominent "Save to Pinterest" button (the site's main social
 * channel) plus WhatsApp, Facebook, X, LinkedIn, copy-link and — on phones —
 * the device's own share sheet. Plain share URLs, no third-party scripts, so
 * nothing loads or tracks visitors until they actually click.
 */
export function ShareBar({ url, title, pinImage, pinDescription, className = "" }: ShareBarProps) {
  const [copied, setCopied] = useState(false);
  const tr = useTranslations();
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const pinterest =
    `https://www.pinterest.com/pin/create/button/?url=${u}&description=${encodeURIComponent(pinDescription ?? title)}` +
    (pinImage ? `&media=${encodeURIComponent(pinImage)}` : "");
  const links = [
    { name: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`, Icon: WhatsAppIcon, hover: "hover:bg-[#25D366]" },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, Icon: FacebookIcon, hover: "hover:bg-[#1877F2]" },
    { name: "X", href: `https://x.com/intent/post?url=${u}&text=${t}`, Icon: XIcon, hover: "hover:bg-black" },
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`, Icon: LinkedInIcon, hover: "hover:bg-[#0A66C2]" },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked — ignore */
    }
  }

  async function nativeShare() {
    try {
      await navigator.share({ title, url });
    } catch {
      /* cancelled */
    }
  }

  // Share targets are buttons, not <a href> links: share endpoints (wa.me,
  // sharer.php, …) answer crawlers with 429/redirect loops, which audit tools
  // report as thousands of "broken external links", and they are not links
  // search engines should follow anyway.
  const open = (href: string) => {
    if (window.innerWidth < 768) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    window.open(href, "share", "width=720,height=640,noopener,noreferrer");
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={() => open(pinterest)}
        className="inline-flex items-center gap-2 rounded-full bg-[#E60023] px-4 py-2 text-sm font-semibold text-white shadow-soft transition-transform hover:scale-[1.03] hover:bg-[#ad081b]"
      >
        <PinterestIcon size={17} /> {tr("share.pin")}
      </button>
      <span className="mx-1 hidden text-xs font-medium text-slate-400 sm:inline">{tr("share.or")}</span>
      {links.map(({ name, href, Icon, hover }) => (
        <button
          type="button"
          key={name}
          onClick={() => open(href)}
          aria-label={`Share on ${name}`}
          title={`Share on ${name}`}
          className={`flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:text-white dark:bg-white/10 dark:text-slate-300 ${hover}`}
        >
          <Icon size={16} />
        </button>
      ))}
      <button
        type="button"
        onClick={copy}
        aria-label={tr("share.copy")}
        title={tr("share.copy")}
        className="flex h-9 items-center gap-1.5 rounded-full bg-slate-100 px-3 text-xs font-semibold text-slate-600 transition-colors hover:bg-brand-600 hover:text-white dark:bg-white/10 dark:text-slate-300"
      >
        {copied ? <Check size={15} aria-hidden="true" /> : <Link2 size={15} aria-hidden="true" />}
        {copied ? tr("share.copied") : tr("share.copy")}
      </button>
      <button
        type="button"
        onClick={nativeShare}
        aria-label={tr("share.more")}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-brand-600 hover:text-white dark:bg-white/10 dark:text-slate-300 md:hidden"
      >
        <Share2 size={15} aria-hidden="true" />
      </button>
    </div>
  );
}
