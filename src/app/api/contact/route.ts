import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Tiny in-memory rate limit: 5 messages per IP per 10 minutes.
// (Per server instance; good enough to stop casual abuse.)
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function fail(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return fail("Invalid request.", 400);
  }

  // Honeypot: real visitors never fill this. Pretend success so bots move on.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (name.length < 2 || name.length > 100) return fail("Please enter your name.", 400);
  if (!EMAIL_RE.test(email) || email.length > 200)
    return fail("Please enter a valid email address.", 400);
  if (message.length < 10 || message.length > 5000)
    return fail("Your message must be between 10 and 5000 characters.", 400);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return fail("Too many messages. Please try again in a few minutes.", 429);
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return fail(
      "The contact form isn't configured yet. Please email me directly.",
      503,
    );
  }

  const from =
    process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";
  // Strip line breaks so the name can't inject extra email headers
  const safeName = name.replace(/[\r\n]+/g, " ");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio message from ${safeName}`,
      text: `Name: ${safeName}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return fail("Couldn't send your message. Please try again later.", 502);
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return fail("Couldn't send your message. Please try again later.", 500);
  }
}
