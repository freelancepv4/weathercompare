import { NextRequest, NextResponse } from "next/server";
import { rateLimit, clientIp } from "@/lib/rateLimit";

/**
 * POST /api/contact
 *
 * No email backend is connected yet. This route validates input server-side
 * (never trust the client) and returns a clear "not yet connected" response
 * rather than pretending to send an email.
 *
 * TO CONNECT A REAL BACKEND:
 *   1. Choose a transactional email provider (Resend, Postmark, SendGrid) or
 *      a form backend (Formspree).
 *   2. Set CONTACT_FORM_API_KEY in your environment.
 *   3. Replace the TODO block below with the real send call.
 *   4. Add basic spam protection (e.g. a honeypot field — already present
 *      on the client form as `company` — and/or rate limiting/CAPTCHA).
 */
export async function POST(request: NextRequest) {
  // 5 submissions/10 minutes/IP — plenty for a real visitor, tight enough to
  // blunt scripted spam even before an email backend is connected.
  const limit = rateLimit(`contact:${clientIp(request)}`, 5, 10 * 60_000);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((limit.resetAt - Date.now()) / 1000)) } }
    );
  }

  let body: { name?: string; email?: string; subject?: string; message?: string; company?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, subject, message, company } = body;

  // Honeypot: real users never fill this hidden field in.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  const backendConfigured = Boolean(process.env.CONTACT_FORM_API_KEY);
  if (!backendConfigured) {
    return NextResponse.json(
      {
        error:
          "The contact form is not yet connected to an email backend. Set CONTACT_FORM_API_KEY and implement the send call in app/api/contact/route.ts.",
      },
      { status: 503 }
    );
  }

  // TODO: implement the real send call once CONTACT_FORM_API_KEY is set, e.g.:
  // await resend.emails.send({ to: "hello@yourdomain.com", from: "noreply@yourdomain.com", subject, text: message, replyTo: email });

  return NextResponse.json({ ok: true });
}
