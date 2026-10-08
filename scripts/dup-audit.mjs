#!/usr/bin/env node
/**
 * Near-duplicate / thin-content audit for the programmatic pages.
 *
 * Why: the site publishes ~200k template-driven URLs. Google files pages that
 * are thin or too similar to their siblings under "Crawled – currently not
 * indexed", so every content change should be checked against that.
 *
 * Usage (against a local production server):
 *   npm run build && npx next start -p 3100 &
 *   node scripts/dup-audit.mjs [samplePerGroup=60] [baseUrl=http://localhost:3100]
 *
 * For each language and page type it samples URLs from the sitemaps, takes the
 * main content text, masks numbers and the page's own place names (so two
 * pages that differ only by city name and figures look identical, which is
 * what a template duplicate is), and estimates pairwise similarity with
 * MinHash over 4-word shingles. Exits 1 when a group is too similar or an
 * indexable page is too short.
 */
const N = +process.argv[2] || 60;
const BASE = process.argv[3] || "http://localhost:3100";
const LANGS = ["en", "it", "de", "fr", "es", "pt", "nl", "pl"];
/** Share of sampled page pairs allowed at >= 80% similarity, per group. */
const MAX_PCT_SIMILAR = 5;
/** Minimum characters of main text for any page we ask Google to index. */
const MIN_CHARS = 1200;

const locs = async (sm) => {
  const r = await fetch(BASE + sm);
  if (!r.ok) return [];
  return [...(await r.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, ""));
};
const samp = (a, n) => {
  const out = [];
  const step = Math.max(1, Math.floor(a.length / n));
  for (let i = 0; i < a.length && out.length < n; i += step) out.push(a[i]);
  return out;
};
async function page(u) {
  try {
    const r = await fetch(BASE + u);
    if (!r.ok) return { status: r.status, text: "", noindex: false };
    const h = await r.text();
    const noindex = /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(h);
    const m = h.match(/<main[^>]*id="main-content"[^>]*>([\s\S]*?)<\/main>/i);
    const s = (m ? m[1] : h)
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&[#a-z0-9]+;/gi, " ");
    return { status: 200, text: s.replace(/\s+/g, " ").trim().toLowerCase(), noindex };
  } catch {
    return { status: 0, text: "", noindex: false };
  }
}
async function pool(list, fn, c = 24) {
  const out = new Array(list.length);
  let i = 0;
  await Promise.all(Array.from({ length: c }, async () => { while (i < list.length) { const k = i++; out[k] = await fn(list[k]); } }));
  return out;
}
const H = (s, seed) => {
  let x = seed >>> 0;
  for (let i = 0; i < s.length; i++) x = Math.imul(x ^ s.charCodeAt(i), 0x01000193) >>> 0;
  x ^= x >>> 15; x = Math.imul(x, 0x85ebca6b) >>> 0; x ^= x >>> 13;
  return x >>> 0;
};
const SEEDS = Array.from({ length: 64 }, (_, i) => ((i + 1) * 2654435761) >>> 0);
const mask = (t, u) => {
  const slugs = new Set(u.split(/[/?]/).flatMap((s) => s.split("-")).filter((x) => x.length > 2));
  return t.split(/[^\p{L}\p{N}°]+/u).filter(Boolean).map((w) => (/\d/.test(w) ? "#" : slugs.has(w) ? "@" : w));
};
const sig = (w) => {
  const sh = new Set();
  for (let i = 0; i + 4 <= w.length; i++) sh.add(w.slice(i, i + 4).join(" "));
  const m = new Array(SEEDS.length).fill(0xffffffff);
  for (const s of sh) for (let j = 0; j < SEEDS.length; j++) { const v = H(s, SEEDS[j]); if (v < m[j]) m[j] = v; }
  return m;
};
const est = (a, b) => { let e = 0; for (let i = 0; i < a.length; i++) if (a[i] === b[i]) e++; return e / a.length; };

let failed = false;
const fail = (msg) => { failed = true; console.log("  FAIL:", msg); };

for (const l of LANGS) {
  const main = await locs(`/sitemaps/${l}.xml`);
  const months = await locs(`/sitemaps/${l}-months.xml`);
  const groups = { month: months };
  for (const u of main) {
    const p = u.split("/").filter(Boolean);
    const q = l === "en" ? p : p.slice(1);
    const key = q.length === 0 ? "home" : `${l === "en" ? q[0] : "section"}:${q.length}${l === "en" || q.length > 1 ? "" : ""}`;
    // Group by (section slug, depth) so country, city and best-time pages are compared like with like.
    const g = `${q[0] ?? "home"}:${q.length}`;
    (groups[g] = groups[g] || []).push(u);
    void key;
  }
  for (const [g, list] of Object.entries(groups)) {
    if (list.length < 20) continue;
    const s = samp(list, N);
    const pages = await pool(s, page);
    const recs = s.map((u, i) => ({ u, ...pages[i] })).filter((r) => r.status === 200 && r.text.length > 50);
    const bad = pages.filter((p) => p.status !== 200).length;
    recs.forEach((r) => { r.m = sig(mask(r.text, r.u)); });
    let pairs = 0, hi = 0;
    for (let i = 0; i < recs.length; i++) for (let j = i + 1; j < recs.length; j++) { pairs++; if (est(recs[i].m, recs[j].m) >= 0.8) hi++; }
    const pct = pairs ? (100 * hi) / pairs : 0;
    const thin = recs.filter((r) => !r.noindex && r.text.length < MIN_CHARS);
    const lens = recs.map((r) => r.text.length).sort((a, b) => a - b);
    console.log(`${l} ${g.padEnd(22)} n=${recs.length} median=${lens[lens.length >> 1]} min=${lens[0]} similar>=0.8: ${pct.toFixed(1)}% thin: ${thin.length} bad: ${bad}`);
    if (pct > MAX_PCT_SIMILAR) fail(`${l} ${g}: ${pct.toFixed(1)}% of page pairs are >=80% similar`);
    if (thin.length) fail(`${l} ${g}: indexable pages under ${MIN_CHARS} chars, e.g. ${thin.slice(0, 3).map((t) => t.u).join(", ")}`);
    if (bad) fail(`${l} ${g}: ${bad} sampled sitemap URLs did not return 200`);
  }
}
console.log(failed ? "\nDuplicate-content audit FAILED" : "\nDuplicate-content audit passed");
process.exit(failed ? 1 : 0);
