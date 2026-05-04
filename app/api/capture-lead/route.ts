// app/api/capture-lead/route.ts
// Drop this file at: app/api/capture-lead/route.ts
// Requires: RESEND_API_KEY in your .env.local / Vercel env vars
// Requires: npm install resend (already installed if you use it for the contact form)
 
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
 
const resend = new Resend(process.env.RESEND_API_KEY);
 
// Adjust sender to match your verified Resend domain.
// If execpartners.ch is verified in Resend, use noreply@execpartners.ch.
// Otherwise use: onboarding@resend.dev (Resend's default sandbox sender).
const FROM = "EP Tools <noreply@auth.execpartners.ch>";
const TO = "gil.chalem@execpartners.ch";
 
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      tool,
      summary,
    }: { name?: string; email: string; tool: string; summary?: string } = body;
 
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }
 
    const displayName = name?.trim() || "Anonymous";
    const toolLabel =
      tool === "portability"
        ? "Portability Readiness Score™"
        : "Business Plan Simulator";
    const timestamp = new Date().toLocaleString("en-GB", {
      timeZone: "Europe/Zurich",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
 
    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `🔔 New tool lead — ${toolLabel} — ${email}`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0B0E13;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0B0E13;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#141820;border-radius:12px;overflow:hidden;border:1px solid #2a2f3a;">
        
        <!-- Header -->
        <tr>
          <td style="background:#1B3A6B;padding:20px 28px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td>
                  <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#D4AF37;font-weight:700;">Executive Partners</div>
                  <div style="font-size:18px;font-weight:700;color:#ffffff;margin-top:4px;">New Tool Lead</div>
                </td>
                <td align="right">
                  <div style="background:#D4AF37;border-radius:20px;padding:6px 14px;font-size:11px;font-weight:700;color:#000;white-space:nowrap;">${toolLabel}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
 
        <!-- Body -->
        <tr>
          <td style="padding:28px;">
            
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #2a2f3a;border-radius:8px;overflow:hidden;margin-bottom:20px;">
              <tr style="background:#1a1f2a;">
                <td style="padding:10px 16px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#D4AF37;">Contact</td>
              </tr>
              <tr>
                <td style="padding:16px;">
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="font-size:13px;color:#8a9ab5;padding-right:12px;padding-bottom:8px;white-space:nowrap;">Name</td>
                      <td style="font-size:13px;color:#ffffff;font-weight:600;padding-bottom:8px;">${displayName}</td>
                    </tr>
                    <tr>
                      <td style="font-size:13px;color:#8a9ab5;padding-right:12px;padding-bottom:8px;white-space:nowrap;">Email</td>
                      <td style="font-size:13px;color:#D4AF37;font-weight:600;padding-bottom:8px;">
                        <a href="mailto:${email}" style="color:#D4AF37;text-decoration:none;">${email}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="font-size:13px;color:#8a9ab5;padding-right:12px;white-space:nowrap;">Tool</td>
                      <td style="font-size:13px;color:#ffffff;font-weight:600;">${toolLabel}</td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
 
            ${
              summary
                ? `
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #2a2f3a;border-radius:8px;overflow:hidden;margin-bottom:20px;">
              <tr style="background:#1a1f2a;">
                <td style="padding:10px 16px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#D4AF37;">Tool Summary</td>
              </tr>
              <tr>
                <td style="padding:16px;font-size:13px;color:#cbd5e1;line-height:1.6;">${summary}</td>
              </tr>
            </table>
            `
                : ""
            }
 
            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" style="padding-top:8px;">
                  <a href="mailto:${email}?subject=Your%20${encodeURIComponent(toolLabel)}%20results%20—%20Executive%20Partners" 
                     style="display:inline-block;background:#D4AF37;color:#000;font-weight:700;font-size:13px;padding:12px 28px;border-radius:8px;text-decoration:none;">
                    Reply to ${displayName} →
                  </a>
                </td>
              </tr>
            </table>
 
          </td>
        </tr>
 
        <!-- Footer -->
        <tr>
          <td style="border-top:1px solid #2a2f3a;padding:16px 28px;">
            <div style="font-size:11px;color:#4a5568;text-align:center;">
              Received ${timestamp} CET · Executive Partners · execpartners.ch
            </div>
          </td>
        </tr>
 
      </table>
    </td></tr>
  </table>
</body>
</html>
      `,
    });
 
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[capture-lead] Resend error:", err);
    // Return success anyway — never block the user experience over a notification failure
    return NextResponse.json({ ok: true, warning: "notification_failed" });
  }
}