#!/usr/bin/env node
/**
 * Tells IndexNow search engines (Bing, Yandex, Seznam, Naver and others —
 * Bing's index also feeds DuckDuckGo, Yahoo, Ecosia and ChatGPT search)
 * about every page in the live sitemap, so new and changed pages get
 * crawled within days instead of weeks. Free, no account needed.
 *
 * Submit ONLY pages that are new or changed — every URL you send makes
 * Bing re-crawl it, and on Vercel each crawl of a page that isn't cached yet
 * costs an ISR write (the Hobby plan allows 200,000 a month).
 *
 *   node scripts/indexnow.mjs /weather/spain/salou /guides/best-time-to-visit/spain/salou
 *       → submits just those pages (paths or full URLs)
 *   node scripts/indexnow.mjs --match costa-adeje,salou
 *       → submits every sitemap URL containing one of those words
 *   node scripts/indexnow.mjs --all
 *       → the whole sitemap (13,000+ URLs). Rarely needed; never right
 *         after a deploy while the ISR budget is tight.
 *
 * Ownership is proven by the key file public/bd257da50bc3d5a9a74cdf30d2c92167.txt, which Vercel
 * serves at https://weathercompare.eu/bd257da50bc3d5a9a74cdf30d2c92167.txt — keep that file.
 */

const HOST = "weathercompare.eu";
const KEY = "bd257da50bc3d5a9a74cdf30d2c92167";
const SITEMAP = `https://${HOST}/sitemap.xml`;

async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log("Nothing sent. Pass the pages to submit, e.g.\n  node scripts/indexnow.mjs /weather/spain/salou\n  node scripts/indexnow.mjs --match salou,costa-adeje\n  node scripts/indexnow.mjs --all   (whole sitemap — use sparingly)");
    return;
  }
  const explicit = args.filter((a) => !a.startsWith("--") && !args[args.indexOf(a) - 1]?.startsWith("--match"));
  if (explicit.length > 0 && !args.includes("--all") && !args.includes("--match")) {
    const urls = explicit.map((a) => (a.startsWith("http") ? a : `https://${HOST}${a.startsWith("/") ? "" : "/"}${a}`));
    return submit(urls);
  }

  // 1. Check the key file is live (IndexNow rejects submissions otherwise).
  const keyRes = await fetch(`https://${HOST}/${KEY}.txt`);
  const keyText = keyRes.ok ? (await keyRes.text()).trim() : "";
  if (keyText !== KEY) {
    console.error(`Key file https://${HOST}/${KEY}.txt is not live yet (status ${keyRes.status}). Push the site, wait for Vercel to finish, then run this again.`);
    process.exit(1);
  }

  // 2. Read every URL from the live sitemap.
  // /sitemap.xml is an index of per-language sitemaps; follow it one level.
  const locs = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  const root = await (await fetch(SITEMAP)).text();
  let urls = locs(root);
  if (root.includes("<sitemapindex")) {
    const children = await Promise.all(urls.map(async (u) => locs(await (await fetch(u)).text())));
    urls = children.flat();
  }
  if (urls.length === 0) {
    console.error("No URLs found in the sitemap — nothing sent.");
    process.exit(1);
  }

  const mi = args.indexOf("--match");
  if (mi >= 0) {
    const words = (args[mi + 1] ?? "").split(",").map((w) => w.trim()).filter(Boolean);
    urls = urls.filter((u) => words.some((w) => u.includes(w)));
    if (urls.length === 0) {
      console.error(`No sitemap URLs contain: ${words.join(", ")}`);
      process.exit(1);
    }
  }
  return submit(urls);
}

async function submit(urls) {
  // 3. Submit (IndexNow accepts up to 10,000 URLs per request).
  for (let i = 0; i < urls.length; i += 10000) {
    const batch = urls.slice(i, i + 10000);
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: batch }),
    });
    const meaning = {
      200: "OK — submitted",
      202: "Accepted — key is being verified; submissions will be processed",
      400: "Bad request",
      403: "Key not valid — check the key file is live",
      422: "URLs don't belong to the host or key mismatch",
      429: "Too many requests — try again later",
    }[res.status] ?? "Unexpected response";
    console.log(`Sent ${batch.length} URLs → HTTP ${res.status}: ${meaning}`);
    if (res.status >= 400) process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error("IndexNow submission failed:", err.message);
  process.exit(1);
});
