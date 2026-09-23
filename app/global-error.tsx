"use client";

import { useEffect } from "react";

/**
 * Last-resort boundary for errors in the root layout itself (rare — most
 * errors are caught by app/error.tsx instead, which keeps Header/Footer
 * intact). This one has to render its own <html>/<body> since the layout
 * that would normally provide them is what errored.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[global-error]", error.message, error.digest ? `(digest: ${error.digest})` : "", error.stack);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#0b1f49", color: "#fff" }}>
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, textAlign: "center", padding: 24 }}>
          <h1 style={{ fontSize: 20, fontWeight: 600 }}>Something went wrong</h1>
          <p style={{ maxWidth: 420, fontSize: 14, opacity: 0.8 }}>
            The site hit an unexpected error and has been logged. Please try again.
            {error.digest && <span style={{ display: "block", marginTop: 4, fontFamily: "monospace", fontSize: 12, opacity: 0.6 }}>Reference: {error.digest}</span>}
          </p>
          <button
            type="button"
            onClick={reset}
            style={{ borderRadius: 12, background: "#fff", color: "#0b1f49", fontWeight: 600, padding: "10px 20px", border: "none", cursor: "pointer" }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
