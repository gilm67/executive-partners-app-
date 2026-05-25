import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = "gil.chalem@execpartners.ch";
const FROM = "EP Website <noreply@auth.execpartners.ch>";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, market, location, seniority, summary, confidential, contactName, contactEmail } = body;
    if (!contactEmail || !title) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }
    const timestamp = new Date().toLocaleString("en-GB", {
      timeZone: "Europe/Zurich", day: "2-digit", month: "short",
      year: "numeric", hour: "2-digit", minute: "2-digit",
    });
    await resend.emails.send({
      from: FROM, to: TO, replyTo: contactEmail,
      subject: `🔔 New mandate brief — ${title} — ${market}`,
      html: `<div style="font-family:Arial,sans-serif;padding:20px;background:#0B0E13;color:#fff;">
        <h2 style="color:#D4AF37;">New Mandate Brief</h2>
        <p><strong>Role:</strong> ${title}</p>
        <p><strong>Market:</strong> ${market}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Seniority:</strong> ${seniority}</p>
        <p><strong>Confidential:</strong> ${confidential ? "Yes" : "No"}</p>
        <p><strong>Summary:</strong> ${summary}</p>
        <hr style="border-color:#2a2f3a;"/>
        <p><strong>Contact:</strong> ${contactName} &lt;<a href="mailto:${contactEmail}" style="color:#D4AF37;">${contactEmail}</a>&gt;</p>
        <p style="font-size:11px;color:#4a5568;">Received ${timestamp} CET · execpartners.ch</p>
      </div>`,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[leads] error:", err);
    return NextResponse.json({ ok: true, warning: "notification_failed" });
  }
}
