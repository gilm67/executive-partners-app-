import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// resend: lazy init inside handler

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await req.json();
    const email = (body.email || "").trim().toLowerCase();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    // 1. Notification to Gil
    await resend.emails.send({
      from: "Executive Partners <no-reply@auth.execpartners.ch>",
      to: "gil.chalem@execpartners.ch",
      subject: `📬 New PWP subscriber: ${email}`,
      html: `
        <div style="font-family:system-ui;padding:20px;background:#020617;">
          <div style="max-width:500px;margin:0 auto;background:#0b0f18;border:1px solid #1f2937;border-radius:12px;padding:24px;">
            <h2 style="color:#D4AF37;font-size:16px;margin:0 0 12px;">New Private Wealth Pulse subscriber</h2>
            <p style="color:#e0e0e0;font-size:14px;margin:0 0 8px;">Email: <strong>${email}</strong></p>
            <p style="color:#6b7280;font-size:12px;margin:0;">Submitted via execpartners.ch/en/insights</p>
          </div>
        </div>
      `,
      text: `New PWP subscriber: ${email}`,
    });

    // 2. Welcome email to subscriber
    await resend.emails.send({
      from: "Gil M. Chalem | Executive Partners <no-reply@auth.execpartners.ch>",
      to: email,
      replyTo: "gil.chalem@execpartners.ch",
      subject: "Welcome to Private Wealth Pulse",
      html: `
        <div style="font-family:system-ui;padding:20px;background:#f9fafb;">
          <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;padding:32px;">

            <p style="font-size:13px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#D4AF37;margin:0 0 16px;">Private Wealth Pulse</p>

            <h1 style="font-size:22px;font-weight:700;color:#0f172a;margin:0 0 16px;line-height:1.3;">
              You are in.
            </h1>

            <div style="background:#fdf6e8;border:1px solid #f0e0bb;border-radius:10px;padding:18px;margin:0 0 24px;">
              <p style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#D4AF37;margin:0 0 6px;">Welcome gift</p>
              <p style="font-size:14px;font-weight:600;color:#0f172a;margin:0 0 6px;">Private Banking Career Intelligence — H2 2026 Edition</p>
              <p style="font-size:13px;color:#6b7280;margin:0 0 12px;">Compensation benchmarks, hiring signals, and AUM portability data across 13 global wealth hubs.</p>
              <a href="https://www.execpartners.ch/pdfs/private-banking-career-intelligence-2026.pdf" style="display:inline-block;background:#0B1929;color:#D4AF37;font-size:13px;font-weight:600;padding:10px 18px;border-radius:8px;text-decoration:none;">Download your report (PDF)</a>
            </div>

            <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 16px;">
              Every week, I publish one piece of analysis on what is actually moving in private banking — talent flows, AUM portability, institutional restructuring, and market dynamics across Geneva, Zurich, Dubai, Singapore, and London.
            </p>

            <p style="font-size:15px;color:#374151;line-height:1.6;margin:0 0 24px;">
              No noise. No recruitment spam. Just the signals that matter to senior practitioners.
            </p>

            <div style="border-top:1px solid #e5e7eb;padding-top:24px;margin-bottom:24px;">
              <p style="font-size:13px;font-weight:600;color:#0f172a;margin:0 0 12px;">Start here — most read articles</p>
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;">
                    <a href="https://www.execpartners.ch/en/insights/is-your-aum-portable" style="font-size:14px;color:#1d4ed8;text-decoration:none;">Is Your AUM Actually Portable?</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #f3f4f6;">
                    <a href="https://www.execpartners.ch/en/insights/the-alpine-exit" style="font-size:14px;color:#1d4ed8;text-decoration:none;">The Alpine Exit</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;">
                    <a href="https://www.execpartners.ch/en/insights/compliance-golden-handcuff" style="font-size:14px;color:#1d4ed8;text-decoration:none;">Compliance Is the New Golden Handcuff</a>
                  </td>
                </tr>
              </table>
            </div>

            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px;margin-bottom:24px;">
              <p style="font-size:13px;font-weight:600;color:#0f172a;margin:0 0 6px;">Free tool — check your AUM portability</p>
              <p style="font-size:13px;color:#6b7280;margin:0 0 10px;">Most senior bankers overestimate how much of their book will follow them. Find out where you actually stand.</p>
              <a href="https://www.execpartners.ch/en/portability-score" style="display:inline-block;background:#D4AF37;color:#000000;font-size:13px;font-weight:600;padding:8px 16px;border-radius:8px;text-decoration:none;">Check my portability score</a>
            </div>

            <p style="font-size:13px;color:#6b7280;line-height:1.6;margin:0 0 4px;">
              If you are considering a move or simply want to understand your market value, reply to this email. I read everything personally.
            </p>

            <p style="font-size:14px;color:#0f172a;margin:24px 0 4px;font-weight:600;">Gil M. Chalem</p>
            <p style="font-size:13px;color:#6b7280;margin:0;">Managing Partner, Executive Partners</p>
            <p style="font-size:13px;color:#6b7280;margin:0;">Geneva | execpartners.ch</p>

            <div style="border-top:1px solid #e5e7eb;margin-top:24px;padding-top:16px;">
              <p style="font-size:11px;color:#9ca3af;margin:0;">
                Private Wealth Pulse is an independent newsletter by Executive Partners. Views are the author's own.<br>
                You subscribed via execpartners.ch/en/insights.
              </p>
            </div>

          </div>
        </div>
      `,
      text: `Welcome to Private Wealth Pulse\n\nYour welcome gift: Private Banking Career Intelligence — H2 2026 Edition\nDownload: https://www.execpartners.ch/pdfs/private-banking-career-intelligence-2026.pdf\n\nEvery week, one piece of analysis on what is actually moving in private banking.\n\nStart here:\n- Is Your AUM Actually Portable? https://www.execpartners.ch/en/insights/is-your-aum-portable\n- The Alpine Exit: https://www.execpartners.ch/en/insights/the-alpine-exit\n- Compliance Is the New Golden Handcuff: https://www.execpartners.ch/en/insights/compliance-golden-handcuff\n\nGil M. Chalem\nManaging Partner, Executive Partners\nGeneva | execpartners.ch`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("SUBSCRIBE_ERROR", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
