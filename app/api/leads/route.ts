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
    const {
      title, market, location, seniority,
      summary, confidential, contactName, contactEmail,
    } = body;

    if (!contactEmail || !title) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }

    const timestamp = new Date().toLocaleString("en-GB", {
      timeZone: "Europe/Zurich", day: "2-digit", month: "short",
      year: "numeric", hour: "2-digit", minute: "2-digit",
    });

    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: contactEmail,
      subject: `🔔 New mandate brief — ${title} — ${market}`,
      html: `
<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0B0E13;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0B0E13;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#141820;border-radius:12px;border:1px solid #2a2f3a;">
        <tr><td style="background:#1B3A6B;padding:20px 28px;">
          <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#D4AF37;font-weight:700;">Executive Partners</div>
          <div style="font-size:18px;font-weight:700;color:#fff;margin-top:4px;">New Mandate Brief</div>
        </td></tr>
        <tr><td style="padding:28px;">
          <table width="100%" cellpadding="6" style="font-size:13px;border-collapse:collapse;border:1px solid #2a2f3a;border-radius:8px;">
            <tr style="background:#1a1f2a;"><td colspan="2" style="padding:10px 16px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#D4AF37;">Role</td></tr>
            <tr><td style="color:#8a9ab5;padding-left:16px;">Title</td><td style="color:#fff;font-weight:600;">${title}</td></tr>
            <tr><td style="color:#8a9ab5;padding-left:16px;">Market</td><td style="color:#fff;">${market}</td></tr>
            <tr><td style="color:#8a9ab5;padding-left:16px;">Location</td><td style="color:#fff;">${location}</td></tr>
            <tr><td style="color:#8a9ab5;padding-left:16px;">Seniority</td><td style="color:#fff;">${seniority}</td></tr>
            <tr><td style="color:#8a9ab5;padding-left:16px;">Confidential</td><td style="color:#fff;">${confidential ? "Yes" : "No"}</td></tr>
          </table>
          <table width="100%" cellpadding="6" style="font-size:13px;border-collapse:collapse;border:1px solid #2a2f3a;border-radius:8px;margin-top:16px;">
            <tr style="background:#1a1f2a;"><td colspan="2" style="padding:10px 16px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#D4AF37;">Contact</td></tr>
            <tr><td style="color:#8a9ab5;padding-left:16px;">Name</td><td style="color:#fff;font-weight:600;">${contactName}</td></tr>
            <tr><td style="color:#8a9ab5;padding-left:16px;">Email</td><td><a href="mailto:${contactEmail}" style="color:#D4AF37;">${contactEmail}</a></td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#1a1f2a;border-radius:8px;border:1px solid #2a2f3a;font-size:13px;color:#cbd5e1;line-height:1.6;">${summary}</div>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;">
            <tr><td align="center">
              <a href="mailto:${contactEmail}?subject=Re%3A%20${encodeURIComponent(title)}%20mandate%20brief"
                 style="display:inline-block;background:#D4AF37;color:#000;font-weight:700;font-size:13px;padding:12px 28px;border-radius:8px;text-decoration:none;">
                Reply to ${contactName} →
              </a>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="border-top:1px solid #2a2f3a;padding:16px 28px;font-size:11px;color:#4a5568;text-align:center;">
          Received ${timestamp} CET · Executive Partners · execpartners.ch
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[leads] error:", err);
    return NextResponse.json({ ok: true, warning: "notification_failed" });
  }
}
