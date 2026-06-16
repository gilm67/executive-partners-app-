import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = (body.email || "").trim().toLowerCase();
    const market = (body.market || "Any market").trim();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    // Notification to Gil
    await resend.emails.send({
      from: "Executive Partners <no-reply@auth.execpartners.ch>",
      to: "gil.chalem@execpartners.ch",
      subject: `🔔 New mandate alert signup: ${email}`,
      html: `
        <div style="font-family:system-ui;padding:20px;background:#020617;">
          <div style="max-width:500px;margin:0 auto;background:#0b0f18;border:1px solid #1f2937;border-radius:12px;padding:24px;">
            <h2 style="color:#D4AF37;font-size:16px;margin:0 0 12px;">New mandate alert signup</h2>
            <p style="color:#e0e0e0;font-size:14px;margin:0 0 8px;">Email: <strong>${email}</strong></p>
            <p style="color:#e0e0e0;font-size:14px;margin:0 0 8px;">Market interest: <strong>${market}</strong></p>
            <p style="color:#6b7280;font-size:12px;margin:0;">Submitted via execpartners.ch/en/jobs</p>
          </div>
        </div>
      `,
      text: `New mandate alert signup: ${email} (${market})`,
    });

    // Confirmation to subscriber
    await resend.emails.send({
      from: "Executive Partners <no-reply@auth.execpartners.ch>",
      to: email,
      replyTo: "recruiter@execpartners.ch",
      subject: "You're on the list — new mandate alerts",
      html: `
        <div style="font-family:system-ui;padding:20px;background:#f9fafb;">
          <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;padding:32px;">
            <p style="font-size:13px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#D4AF37;margin:0 0 16px;">Executive Partners</p>
            <h1 style="font-size:22px;font-weight:700;color:#0f172a;margin:0 0 16px;line-height:1.3;">You're on the list.</h1>
            <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 16px;">
              We'll email you when a new private banking mandate matching${market !== "Any market" ? ` <strong>${market}</strong>` : ""} goes live. No spam, no recruitment noise — just relevant openings as they're confirmed.
            </p>
            <div style="background:#fdf6e8;border:1px solid #f0e0bb;border-radius:10px;padding:18px;margin:0 0 24px;">
              <p style="font-size:13px;color:#374151;margin:0 0 10px;">In the meantime, you can browse all current mandates:</p>
              <a href="https://www.execpartners.ch/en/jobs" style="display:inline-block;background:#0B1929;color:#D4AF37;font-size:13px;font-weight:600;padding:10px 18px;border-radius:8px;text-decoration:none;">View open mandates</a>
            </div>
            <p style="font-size:14px;color:#0f172a;margin:24px 0 4px;font-weight:600;">Executive Partners</p>
            <p style="font-size:13px;color:#6b7280;margin:0;">Geneva | execpartners.ch</p>
          </div>
        </div>
      `,
      text: `You're on the list.\n\nWe'll email you when a new private banking mandate matching ${market} goes live.\n\nView open mandates: https://www.execpartners.ch/en/jobs\n\nExecutive Partners\nGeneva | execpartners.ch`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("MANDATE_ALERT_ERROR", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
