import { NextRequest, NextResponse } from "next/server";
import { countries } from "@/config/countries";
import { findCity } from "@/config/world";
import { getCityGuide } from "@/lib/data/cityGuides";
import { allGuides } from "@/lib/data/guides";
import { getCityClimate, MONTHS } from "@/lib/data/climate";
import { rateLimit, clientIp } from "@/lib/rateLimit";

/**
 * POST /api/assistant — the on-site travel-weather chat assistant.
 *
 * Uses Google's Gemini API (free tier is enough for a small site). Needs
 * GEMINI_API_KEY in the environment — get one free at
 * https://aistudio.google.com/apikey. Without it this route returns 503
 * and the chat button is never shown (see app/layout.tsx).
 *
 * Grounding: the model gets this site's own city list, "best time to visit"
 * notes and long-term climate averages, so it answers from the same data
 * the pages show and links visitors to the relevant page. It is told NOT to
 * invent live forecasts — for those it points to the city's forecast page.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_MESSAGES = 12;
const MAX_CHARS = 600;
// Model is configurable so a future Gemini release can be adopted without a
// code change. Tried in order; the second is Google's rolling alias.
const MODELS = [process.env.GEMINI_MODEL, "gemini-3.5-flash-lite", "gemini-flash-lite-latest"].filter(
  (m, i, arr): m is string => !!m && arr.indexOf(m) === i
);

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function r(n: number) {
  return Math.round(n);
}

/** Compact, token-cheap summary of the whole site for the system prompt. */
function siteContext(): string {
  const cityLines: string[] = [];
  for (const country of countries) {
    for (const city of country.cities) {
      const guide = getCityGuide(country.slug, city.slug);
      const climate = getCityClimate(country.slug, city.slug);
      const climateStr = climate
        ? " | avg high/low °C & rain mm by month: " +
          MONTHS.map((m, i) => `${m.short} ${r(climate.tMax[i]!)}/${r(climate.tMin[i]!)} ${climate.precipMm[i]}mm`).join(", ")
        : "";
      cityLines.push(
        `- ${city.name}, ${country.name}: forecast /weather/${country.slug}/${city.slug} ; best time /guides/best-time-to-visit/${country.slug}/${city.slug}` +
          (guide ? ` | best time: ${guide.bestTimeToVisit}` : "") +
          climateStr
      );
    }
  }
  const guideLines = allGuides().map((g) => `- ${g.title}: /guides/${g.slug}`);
  return `CITIES ON THE SITE:\n${cityLines.join("\n")}\n\nGUIDES:\n${guideLines.join("\n")}\n\nOTHER PAGES: trip weather finder /trip-finder ; all guides /guides`;
}

function pageContext(path: string | undefined): string {
  const m = path?.match(/^\/(?:weather|guides\/best-time-to-visit)\/([a-z-]+)\/([a-z-]+)/);
  if (!m) return "";
  const found = findCity(m[1]!, m[2]!);
  if (!found) return "";
  const guide = getCityGuide(found.country.slug, found.city.slug);
  return (
    `\n\nThe visitor is currently on the page for ${found.city.name}, ${found.country.name}. ` +
    `If their question is ambiguous, assume it is about this city.` +
    (guide
      ? ` Local notes: ${guide.intro} Getting around: ${guide.gettingAround} Tip: ${guide.localTip} Landmarks: ${guide.landmarks
          .map((l) => l.name)
          .join(", ")}.`
      : "")
  );
}

const SYSTEM_PROMPT = `You are the travel-weather assistant on WeatherCompare (weathercompare.eu), a site that compares weather forecasts from several providers and publishes travel guides.

Rules:
- Help with weather, climate, when-to-visit, packing and trip-planning questions. Politely decline unrelated requests in one sentence.
- Base climate answers on the monthly averages provided below; say they are long-term averages, not a forecast.
- You do NOT have live forecasts. For current or upcoming weather, link the city's forecast page.
- Whenever you mention a city from the list, link its page using markdown with the relative path, e.g. [Rome forecast](/weather/italy/rome). Only use paths listed below — never invent URLs.
- For cities not on the site, answer from general knowledge, clearly hedged.
- Keep answers short: 2–5 sentences or a short bulleted list. Plain, friendly English (or the visitor's language if they write in another).
- Never ask for or store personal information.`;

async function callGemini(apiKey: string, system: string, messages: ChatMessage[]) {
  const body = {
    systemInstruction: { parts: [{ text: system }] },
    contents: messages.map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] })),
    generationConfig: { temperature: 0.4, maxOutputTokens: 500 },
  };
  let lastStatus = 0;
  for (const model of MODELS) {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(20_000),
    });
    lastStatus = res.status;
    if (res.status === 404 || res.status === 400) continue; // unknown model name → try the next one
    if (!res.ok) break;
    const json = await res.json();
    const text: string | undefined = json?.candidates?.[0]?.content?.parts
      ?.map((p: { text?: string }) => p.text ?? "")
      .join("")
      .trim();
    if (text) return { text };
    break;
  }
  return { error: lastStatus };
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "Assistant is not configured." }, { status: 503 });

  // Keeps one visitor (or script) from burning through the free daily quota.
  const limit = rateLimit(`assistant:${clientIp(request)}`, 10, 60_000);
  if (!limit.allowed) {
    return NextResponse.json({ error: "You're sending messages quickly — please wait a minute." }, { status: 429 });
  }

  let payload: { messages?: ChatMessage[]; path?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const messages = (payload.messages ?? [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-MAX_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
  if (messages.length === 0 || messages[messages.length - 1]!.role !== "user") {
    return NextResponse.json({ error: "Please type a question." }, { status: 400 });
  }

  const system = `${SYSTEM_PROMPT}\n\n${siteContext()}${pageContext(typeof payload.path === "string" ? payload.path : undefined)}`;

  try {
    const result = await callGemini(apiKey, system, messages);
    if ("text" in result) return NextResponse.json({ reply: result.text });
    const busy = result.error === 429;
    return NextResponse.json(
      {
        error: busy
          ? "The assistant is very busy right now — please try again in a little while."
          : "Sorry, the assistant couldn't answer just now. Please try again.",
      },
      { status: busy ? 429 : 502 }
    );
  } catch {
    return NextResponse.json({ error: "Sorry, the assistant couldn't answer just now. Please try again." }, { status: 502 });
  }
}
