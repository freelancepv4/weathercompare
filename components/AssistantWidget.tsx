"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Send, Sparkles, X, Loader2 } from "lucide-react";

/**
 * Floating "Ask about weather & trips" chat. Talks to /api/assistant.
 * Only rendered when GEMINI_API_KEY is configured (see app/layout.tsx).
 */

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "Where is warm and dry in November?",
  "Is Rome or Florence better in October?",
  "What should I pack for Munich in March?",
];

/** Renders the model's markdown-ish reply safely: links, **bold**, bullet lines. */
function renderInline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(((?:\/[^)\s]*)|(?:https?:\/\/[^)\s]+))\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let n = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] && m[2]) {
      const internal = m[2].startsWith("/");
      out.push(
        internal ? (
          <Link key={`${keyBase}-${n++}`} href={m[2]} className="font-semibold text-brand-600 underline decoration-brand-300 underline-offset-2 hover:text-brand-700 dark:text-brand-300">
            {m[1]}
          </Link>
        ) : (
          <a key={`${keyBase}-${n++}`} href={m[2]} target="_blank" rel="noopener noreferrer nofollow" className="font-semibold text-brand-600 underline underline-offset-2 dark:text-brand-300">
            {m[1]}
          </a>
        )
      );
    } else if (m[3]) {
      out.push(<strong key={`${keyBase}-${n++}`}>{m[3]}</strong>);
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function Reply({ text }: { text: string }) {
  const lines = text.split("\n").filter((l) => l.trim());
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        const bullet = line.match(/^\s*[-*•]\s+(.*)$/);
        return bullet ? (
          <p key={i} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
            <span>{renderInline(bullet[1]!, `l${i}`)}</span>
          </p>
        ) : (
          <p key={i}>{renderInline(line, `l${i}`)}</p>
        );
      })}
    </div>
  );
}

export function AssistantWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Embeds are framed on other sites — keep them clean.
  if (pathname?.startsWith("/embed")) return null;

  async function send(text: string) {
    const question = text.trim();
    if (!question || loading) return;
    const next: Message[] = [...messages, { role: "user", content: question }];
    setMessages(next);
    setInput("");
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, path: pathname }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.reply) throw new Error(json.error || "Sorry, something went wrong. Please try again.");
      setMessages([...next, { role: "assistant", content: json.reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sorry, something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition-transform hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-300"
          aria-label="Open the weather and trip assistant"
        >
          <Sparkles size={18} aria-hidden="true" />
          <span className="hidden sm:inline">Ask about weather &amp; trips</span>
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-label="Weather and trip assistant"
          className="fixed inset-x-3 bottom-3 z-50 flex max-h-[80vh] flex-col overflow-hidden rounded-xl3 border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-surface-dark-subtle sm:inset-x-auto sm:bottom-5 sm:right-5 sm:w-[380px]"
        >
          <div className="flex items-center justify-between bg-gradient-to-r from-brand-600 to-indigo-600 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                <MessageCircle size={16} aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold leading-tight">Trip weather assistant</p>
                <p className="text-[11px] text-white/75">Climate averages, best times, packing</p>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="rounded-full p-1.5 hover:bg-white/15" aria-label="Close assistant">
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm leading-relaxed" aria-live="polite">
            {messages.length === 0 && (
              <div>
                <p className="text-slate-600 dark:text-slate-300">
                  Hi! Ask me when to visit a city, what the weather is usually like in a given month, or what to pack.
                </p>
                <div className="mt-3 flex flex-col gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-xl2 border border-brand-100 bg-brand-50 px-3 py-2 text-left text-xs font-medium text-brand-700 hover:bg-brand-100 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-200"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="ml-8 rounded-2xl rounded-br-md bg-brand-600 px-3.5 py-2.5 text-white">
                  {m.content}
                </div>
              ) : (
                <div key={i} className="mr-6 rounded-2xl rounded-bl-md bg-slate-100 px-3.5 py-2.5 text-slate-700 dark:bg-white/5 dark:text-slate-200">
                  <Reply text={m.content} />
                </div>
              )
            )}
            {loading && (
              <div className="mr-6 flex items-center gap-2 rounded-2xl bg-slate-100 px-3.5 py-2.5 text-slate-500 dark:bg-white/5">
                <Loader2 size={14} className="animate-spin" aria-hidden="true" /> Thinking…
              </div>
            )}
            {error && <p className="text-xs text-rose-600">{error}</p>}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-slate-100 p-3 dark:border-white/10"
          >
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={600}
                placeholder="e.g. Best month for Lisbon?"
                className="min-w-0 flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 dark:border-white/10 dark:bg-white/5 dark:text-white"
                aria-label="Your question"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white disabled:opacity-40"
                aria-label="Send"
              >
                <Send size={15} aria-hidden="true" />
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-slate-400">
              AI answers (Google Gemini) can be wrong — check the live forecast. Don&apos;t share personal details.
            </p>
          </form>
        </div>
      )}
    </>
  );
}
