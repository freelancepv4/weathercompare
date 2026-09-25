#!/usr/bin/env node
/**
 * Tells IndexNow search engines (Bing, Yandex, Seznam, Naver and others —
 * Bing's index also feeds DuckDuckGo, Yahoo, Ecosia and ChatGPT search)
 * about every page in the live sitemap, so new and changed pages get
 * crawled within days instead of weeks. Free, no account needed.
 *
 * Run it after each deploy has finished on Vercel:
 *   node scripts/indexnow.mjs
 *
 * Only list a page to IndexNow when it has actually been added or changed.
 * Re-sending an unchanged list now and then is harmless; sending it
 * many times a day is not needed.
 *
 * Ownership is proven by the key file public/bd257da50bc3d5a9a74cdf30d2c92167.txt, which Vercel
 * serves at https://weathercompare.eu/bd257da50bc3d5a9a74cdf30d2c92167.txt — keep that file.
 */

const HOST = "weathercompare.eu";
const KEY = "bd257da50bc3d5a9a74cdf30d2c92167";
const SITEMAP = `https://${HOST}/sitemap.xml`;

async function main() {
  // 1. Check the key file is live (IndexNow rejects submissions otherwise).
  const keyRes = await fetch(`https://${HOST}/${KEY}.txt`);
  const keyText = keyRes.ok ? (await keyRes.text()).trim() : "";
  if (keyText !== KEY) {
    console.error(`Key file https://${HOST}/${KEY}.txt is not live yet (status ${keyRes.status}). Push the site, wait for Vercel to finish, then run this again.`);
    process.exit(1);
  }

  // 2. Read every URL from the live sitemap.
  const xml = await (await fetch(SITEMAP)).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  if (urls.length === 0) {
    console.error("No URLs found in the sitemap — nothing sent.");
    process.exit(1);
  }

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
