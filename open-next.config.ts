import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import { withRegionalCache } from "@opennextjs/cloudflare/overrides/incremental-cache/regional-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";

/**
 * Cloudflare (OpenNext) cache setup for WeatherCompare.
 * - Pages and fetch() results are cached in an R2 bucket, with a
 *   regional in-memory layer in front so most hits never touch R2.
 * - Time-based revalidation (city forecasts every 12h, "today" pages every
 *   3h) runs in the background through a Durable Object queue.
 * - No tag cache: the site never calls revalidateTag/revalidatePath.
 */
export default defineCloudflareConfig({
  incrementalCache: withRegionalCache(r2IncrementalCache, { mode: "long-lived" }),
  queue: doQueue,
  enableCacheInterception: true,
});
