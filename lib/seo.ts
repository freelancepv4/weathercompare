import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/**
 * Search results show roughly 60 characters of a title and ~155–160 of a
 * description before cutting them off. These helpers keep every page within
 * those limits:
 *  - seoTitle: keeps the " — WeatherCompare" suffix (added by the root
 *    layout's title template) only when the full title still fits in 60
 *    characters; otherwise uses the page title alone.
 *  - seoDescription: trims at a word boundary with an ellipsis if too long.
 */
const TITLE_MAX = 60;
const DESC_MAX = 158;
const SUFFIX = ` — ${siteConfig.name}`;

function trimAtWord(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:—–-]+$/, "")}…`;
}

export function seoTitle(title: string): Metadata["title"] {
  if (title.length + SUFFIX.length <= TITLE_MAX) return title;
  return { absolute: trimAtWord(title, TITLE_MAX) };
}

export function seoDescription(description: string): string {
  return trimAtWord(description, DESC_MAX);
}
