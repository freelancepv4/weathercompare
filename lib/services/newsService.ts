/**
 * Lightweight, dependency-free RSS aggregation for the /news page.
 *
 * Deliberately hand-rolled instead of pulling in an npm RSS parser: this
 * keeps the build free of an extra dependency and its supply-chain surface
 * for what's a simple, well-defined parsing job (standard RSS 2.0 <item>
 * blocks only — no Atom support needed for the feeds configured below).
 *
 * Only headline + short excerpt + link-out is shown anywhere in the app —
 * never full article bodies — and every item links back to the original
 * publisher. Sources are chosen for having their own public syndication
 * policy (see each entry's `sourceUrl`), not aggregator feeds whose terms
 * restrict reuse to personal feed readers (e.g. Google News' RSS explicitly
 * forbids that — do not add it here).
 */

export interface NewsItem {
  title: string;
  link: string;
  excerpt: string;
  pubDate: string | null;
  source: string;
  sourceUrl: string;
}

interface FeedConfig {
  url: string;
  source: string;
  sourceUrl: string;
}

const FEEDS: FeedConfig[] = [
  {
    url: "https://feeds.bbci.co.uk/news/science_and_environment/rss.xml",
    source: "BBC News — Science & Environment",
    sourceUrl: "https://www.bbc.co.uk/news/science_and_environment",
  },
];

function decodeEntities(input: string): string {
  return input
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .trim();
}

function stripTags(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim();
}

function extractTag(block: string, tag: string): string | null {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  return match && match[1] !== undefined ? decodeEntities(match[1]) : null;
}

function parseRssItems(xml: string, feed: FeedConfig, limit: number): NewsItem[] {
  const itemBlocks = xml.match(/<item>[\s\S]*?<\/item>/gi) ?? [];
  return itemBlocks.slice(0, limit).map((block) => {
    const title = extractTag(block, "title") ?? "Untitled";
    const link = extractTag(block, "link") ?? feed.sourceUrl;
    const rawDescription = extractTag(block, "description") ?? "";
    const excerpt = stripTags(rawDescription).slice(0, 220);
    const pubDate = extractTag(block, "pubDate");
    return {
      title: stripTags(title),
      link: link.trim(),
      excerpt: excerpt.length === 220 ? `${excerpt}…` : excerpt,
      pubDate,
      source: feed.source,
      sourceUrl: feed.sourceUrl,
    };
  });
}

async function fetchFeed(feed: FeedConfig, limit: number): Promise<NewsItem[]> {
  const res = await fetch(feed.url, {
    next: { revalidate: 21600 }, // refresh every 6 hours
    headers: { "User-Agent": "WeatherCompareBot/1.0 (+https://weathercompare.example)" },
  });
  if (!res.ok) throw new Error(`Feed request failed (${res.status}): ${feed.url}`);
  const xml = await res.text();
  return parseRssItems(xml, feed, limit);
}

/**
 * Fetch every configured feed in parallel, failing soft per-feed so one
 * unreachable source doesn't take down the whole page.
 */
export async function getWeatherNews(perFeedLimit = 12): Promise<{
  items: NewsItem[];
  errors: Array<{ source: string; message: string }>;
}> {
  const results = await Promise.allSettled(FEEDS.map((feed) => fetchFeed(feed, perFeedLimit)));

  const items: NewsItem[] = [];
  const errors: Array<{ source: string; message: string }> = [];

  results.forEach((result, i) => {
    const feed = FEEDS[i]!;
    if (result.status === "fulfilled") {
      items.push(...result.value);
    } else {
      console.error(`[newsService] feed "${feed.source}" failed: ${result.reason?.message ?? result.reason}`);
      errors.push({ source: feed.source, message: result.reason?.message ?? "Unknown error" });
    }
  });

  items.sort((a, b) => {
    const aTime = a.pubDate ? Date.parse(a.pubDate) : 0;
    const bTime = b.pubDate ? Date.parse(b.pubDate) : 0;
    return bTime - aTime;
  });

  return { items, errors };
}
