/**
 * Minimal in-memory rate limiter for API routes.
 *
 * This is a per-serverless-instance token bucket, not a distributed one —
 * on Vercel, concurrent requests can land on different warm instances, so
 * this is a defensive speed bump against casual abuse/scraping (a script
 * hammering /api/geocode or /api/contact from one source), not a hard
 * guarantee. That's an intentional trade-off: it needs no external service
 * (Redis, Upstash, etc.) or extra account to set up, and it's the same
 * "start simple, upgrade later" pattern the rest of this codebase follows
 * (see lib/providers/registry.ts). If traffic grows enough that this stops
 * being sufficient, swap in Vercel's own Edge Config/KV-backed rate limiter
 * or a service like Upstash Ratelimit — this function's call sites won't
 * need to change.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

// Prevent unbounded memory growth from many distinct IPs over a long-running
// instance lifetime.
const MAX_TRACKED_KEYS = 5000;

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

/**
 * @param key Usually the client IP plus a route name, e.g. `geocode:1.2.3.4`.
 * @param limit Max requests allowed within the window.
 * @param windowMs Window length in milliseconds.
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    if (buckets.size >= MAX_TRACKED_KEYS) buckets.clear();
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: limit - 1, resetAt };
  }

  if (existing.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return { allowed: true, remaining: limit - existing.count, resetAt: existing.resetAt };
}

/** Best-effort client IP from standard proxy headers (Vercel sets x-forwarded-for). */
export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
