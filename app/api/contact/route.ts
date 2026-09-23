import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit, clientIp } from "@/lib/rateLimit";

/**
 * POST /api/contact
 *
 * Sends contact form submissions via Resend (resend.com) — a transactional
 * email API with a free tier (100 emails/day, 3,000/month at time of
 * writing; verify current terms). Falls back to a clear "not yet connected"
 * response if CONTACT_FORM_API_KEY isn't set, rather than pretending to
 * send.
 *
 * SETUP (see .env.example):
 *   1. Sign up at https://resend.com and verify weathercompare.eu as a
 *      sending domain (adds a couple of DNS records, same idea as the
 *      privacy@ email forwarding setup).
 *   2. Create an API key in the Resend dashboard.
 *   3. Set CONTACT_FORM_API_KEY in your environment.
 *   4. Optionally change CONTACT_FORM_TO_EMAIL below if you want
 *      submissions to land somewhere other than contact@weathercompare.eu.
 */
const resend = process.env.CONTACT_FORM_API_KEY ? new Resend(process.env.CONTACT_FORM_API_KEY) : null;
const TO_EMAIL = process.env.CONTACT_FORM_TO_EMAIL || "contact@weathercompare.eu";
const FROM_EMAIL = "WeatherCompare <noreply@weathercompare.eu>";
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

  if (!resend) {
    return NextResponse.json(
      {
        error:
          "The contact form is not yet connected to an email backend. Set CONTACT_FORM_API_KEY (see .env.example) to enable sending.",
      },
      { status: 503 }
    );
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email, // lets you hit "Reply" and go straight back to the visitor
      subject: `[Contact form] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("[contact] Resend send failed:", error.message);
      return NextResponse.json({ error: "Could not send your message right now. Please try again shortly." }, { status: 502 });
    }
  } catch (error) {
    console.error("[contact] Unexpected error sending via Resend:", (error as Error).message);
    return NextResponse.json({ error: "Could not send your message right now. Please try again shortly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
