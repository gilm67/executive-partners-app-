// app/api/contact/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json().catch(() => ({} as any));

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
    }

    // TODO: send email / push to CRM here
    // Example: console logging (visible in Vercel function logs)
    console.log("CONTACT_FORM_SUBMISSION", { name, email, len: String(message).length });

    // Respond success
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("CONTACT_FORM_ERROR", err);
    // Never crash the page; return sanitized error
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 200 });
  }
}

export async function GET() {
  // Optional: simple health check
  return NextResponse.json({ ok: true, route: "/api/contact" });
}
