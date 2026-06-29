import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const FROM = "EP Tools <noreply@auth.execpartners.ch>";
const TO_GIL = "gil.chalem@execpartners.ch";
const SHEET_ID = "1Osr2RrgQZqDjK28knSXlqNXqJk2rcaATLqE1Yjy_W0c";

const AUM_LABELS: Record<string, string> = {
  sub50: "Below CHF 50M", "50_150": "CHF 50M-150M", "150_500": "CHF 150M-500M",
  "500_1b": "CHF 500M-1B", above1b: "Above CHF 1B",
};

async function logToSheet(row: string[]) {
  try {
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || process.env.GOOGLE_CLIENT_EMAIL;
    const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY;
    if (!clientEmail || !privateKeyRaw) return;
    const privateKey = privateKeyRaw.replace(/\\n/g, "\n");
    const now = Math.floor(Date.now() / 1000);
    const encode = (obj: object) => Buffer.from(JSON.stringify(obj)).toString("base64url");
    const si = `${encode({ alg: "RS256", typ: "JWT" })}.${encode({ iss: clientEmail, scope: "https://www.googleapis.com/auth/spreadsheets", aud: "https://oauth2.googleapis.com/token", exp: now + 3600, iat: now })}`;
    const kd = privateKey.replace("-----BEGIN PRIVATE KEY-----", "").replace("-----END PRIVATE KEY-----", "").replace(/\s/g, "");
    const ck = await crypto.subtle.importKey("pkcs8", Buffer.from(kd, "base64"), { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
    const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", ck, Buffer.from(si));
    const jwt = `${si}.${Buffer.from(sig).toString("base64url")}`;
    const tr = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt }) });
    const td = await tr.json();
    if (!td.access_token) return;
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/FitMatcher_Leads:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`, {
      method: "POST",
      headers: { Authorization: `Bearer ${td.access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ values: [row] }),
    });
  } catch (e) { console.error("[fit-matcher] sheet error:", e); }
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("[fit-matcher] RESEND_API_KEY not set");
      return NextResponse.json({ ok: true, warning: "resend_not_configured" });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const body = await req.json();
    const { name, email, aum, seniority, geography, clientType, mandate, employment, booking, assessment, ts } = body;

    const aumLabel = AUM_LABELS[aum] || aum;
    const segment = assessment?.segment || "";
    const demand = assessment?.demandLevel || "";
    const rationale = assessment?.demandRationale || "";
    const timestamp = new Date().toLocaleString("en-GB", { timeZone: "Europe/Zurich", day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

    await resend.emails.send({
      from: FROM,
      to: TO_GIL,
      subject: `[Fit Matcher] ${demand} demand — ${(geography || "").toUpperCase()} / ${aumLabel}`,
      html: `<div style="font-family:Georgia,serif;max-width:580px;color:#1a1a1a;line-height:1.7">
        <p style="font-size:10px;letter-spacing:3px;color:#9a8a7a;text-transform:uppercase">Executive Partners · Fit Matcher · ${timestamp}</p>
        <h2 style="font-weight:400;font-size:20px;margin:8px 0 20px">New Profile Assessment</h2>
        <table style="width:100%;border-collapse:collapse;font-size:13px">
          <tr><td style="padding:5px 0;color:#777;width:42%">Name</td><td>${name || "Not provided"}</td></tr>
          <tr><td style="padding:5px 0;color:#777">Email</td><td>${email}</td></tr>
          <tr><td style="padding:5px 0;color:#777">AUM</td><td><strong>${aumLabel}</strong></td></tr>
          <tr><td style="padding:5px 0;color:#777">Seniority</td><td>${seniority}</td></tr>
          <tr><td style="padding:5px 0;color:#777">Geography</td><td>${geography}</td></tr>
          <tr><td style="padding:5px 0;color:#777">Client Tier</td><td>${clientType}</td></tr>
          <tr><td style="padding:5px 0;color:#777">Mandate Style</td><td>${mandate}</td></tr>
          <tr><td style="padding:5px 0;color:#777">Employment Pref</td><td>${employment}</td></tr>
          <tr><td style="padding:5px 0;color:#777">Booking Centre</td><td>${booking}</td></tr>
        </table>
        <div style="background:#f9f7f2;border-left:3px solid #b89557;padding:16px 18px;margin:22px 0">
          <strong>${segment}</strong> — Demand: <strong>${demand}</strong>
          <p style="font-size:12px;color:#777;font-style:italic;margin:8px 0 0">${rationale}</p>
        </div>
      </div>`,
    });

    // Candidate confirmation email
    if (email && email.includes("@")) {
      const greeting = (name || "").trim().split(" ")[0] || "Colleague";
      const demandColor = demand === "High" ? "#C9A14A" : demand === "Emerging" ? "#5a88b0" : "#a07840";
      await resend.emails.send({
        from: "Gil M. Chalem · Executive Partners <noreply@auth.execpartners.ch>",
        to: email,
        subject: `Your Private Bank Fit Assessment — ${segment}`,
        html: `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f0;font-family:Georgia,'Times New Roman',serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f0;padding:40px 16px">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:580px">

        <!-- HEADER -->
        <tr><td style="background:#05070E;padding:0">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="height:3px;background:linear-gradient(90deg,#05070E 0%,#C9A14A 35%,#C9A14A 65%,#05070E 100%)"></td></tr>
            <tr><td style="padding:28px 36px 24px">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 6px;font-size:9px;letter-spacing:3px;text-transform:uppercase;color:#C9A14A;font-family:Arial,sans-serif;font-weight:700">Executive Partners</p>
                    <p style="margin:0;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,0.35);font-family:Arial,sans-serif">Private Banking · Geneva · Confidential</p>
                  </td>
                  <td align="right" style="font-size:9px;color:rgba(255,255,255,0.25);font-family:Arial,sans-serif;letter-spacing:1px">
                    Market Intelligence
                  </td>
                </tr>
              </table>
            </td></tr>
            <tr><td style="padding:0 36px 32px">
              <h1 style="margin:0;font-size:26px;font-weight:400;color:#ffffff;letter-spacing:-0.5px;line-height:1.2">
                Private Bank<br><span style="color:#C9A14A;font-weight:700">Fit Assessment</span>
              </h1>
            </td></tr>
          </table>
        </td></tr>

        <!-- GREETING -->
        <tr><td style="background:#ffffff;padding:36px 36px 0">
          <p style="margin:0 0 8px;font-size:15px;color:#1a1a2e">Dear ${greeting},</p>
          <p style="margin:0;font-size:14px;color:#555;line-height:1.7">
            Your market positioning assessment has been completed and is summarised below.
          </p>
        </td></tr>

        <!-- SEGMENT CARD -->
        <tr><td style="background:#ffffff;padding:24px 36px">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#05070E;border:1px solid rgba(201,161,74,0.2)">
            <tr><td style="height:2px;background:#C9A14A"></td></tr>
            <tr><td style="padding:20px 24px">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:9px;letter-spacing:2.5px;text-transform:uppercase;color:rgba(201,161,74,0.6);font-family:Arial,sans-serif;font-weight:700">Market Segment</p>
                    <p style="margin:0;font-size:18px;font-weight:700;color:#ffffff;letter-spacing:-0.3px">${segment}</p>
                  </td>
                  <td align="right" valign="top">
                    <table cellpadding="0" cellspacing="0" style="border:1px solid ${demandColor};background:rgba(201,161,74,0.08)">
                      <tr><td style="padding:10px 16px;text-align:center">
                        <p style="margin:0 0 3px;font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,0.35);font-family:Arial,sans-serif">Demand</p>
                        <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:${demandColor};font-family:Arial,sans-serif">${demand}</p>
                      </td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td></tr>
            <tr><td style="padding:0 24px 20px">
              <p style="margin:12px 0 0;font-size:12px;color:rgba(255,255,255,0.4);line-height:1.7;font-style:italic">${rationale}</p>
            </td></tr>
          </table>
        </td></tr>

        <!-- BODY TEXT -->
        <tr><td style="background:#ffffff;padding:8px 36px 28px">
          <p style="margin:0 0 14px;font-size:14px;color:#444;line-height:1.75">
            We will review your profile against current market activity and contact you within 48 hours if we identify relevant positioning for your specific configuration.
          </p>
          <p style="margin:0;font-size:14px;color:#444;line-height:1.75">
            If you would like to discuss your positioning in confidence before then, I am available for a 20-minute call.
          </p>
        </td></tr>

        <!-- CTA -->
        <tr><td style="background:#ffffff;padding:4px 36px 36px">
          <table cellpadding="0" cellspacing="0">
            <tr><td style="background:#C9A14A">
              <a href="https://www.execpartners.ch/en/contact"
                style="display:inline-block;padding:14px 32px;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#000000;text-decoration:none;font-family:Arial,sans-serif">
                Schedule a Confidential Call &rarr;
              </a>
            </td></tr>
          </table>
        </td></tr>

        <!-- DIVIDER -->
        <tr><td style="background:#ffffff;padding:0 36px">
          <div style="height:1px;background:#e8e4dc"></div>
        </td></tr>

        <!-- SIGNATURE -->
        <tr><td style="background:#ffffff;padding:24px 36px 36px">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td>
                <p style="margin:0 0 3px;font-size:14px;font-weight:600;color:#1a1a2e">Gil M. Chalem</p>
                <p style="margin:0 0 3px;font-size:12px;color:#888">Managing Partner, Executive Partners</p>
                <p style="margin:0;font-size:12px"><a href="https://www.execpartners.ch" style="color:#C9A14A;text-decoration:none">execpartners.ch</a></p>
              </td>
              <td align="right" valign="bottom">
                <p style="margin:0;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#ccc;font-family:Arial,sans-serif">Geneva · Switzerland</p>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- FOOTER -->
        <tr><td style="background:#05070E;padding:20px 36px">
          <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.2);font-family:Arial,sans-serif;line-height:1.7;text-align:center">
            Executive Partners Sarl · Geneva · recruiter@execpartners.ch<br>
            This assessment is based on structural market dynamics only. Treated with absolute discretion under Swiss data protection standards.
          </p>
        </td></tr>
        <tr><td style="height:3px;background:linear-gradient(90deg,#05070E 0%,#C9A14A 35%,#C9A14A 65%,#05070E 100%);opacity:0.5"></td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
      });
    }

    logToSheet([ts || new Date().toISOString(), name || "", email, aumLabel, seniority, geography, clientType, mandate, employment, booking, segment, demand]).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[fit-matcher] error:", err);
    return NextResponse.json({ ok: true, warning: "notification_failed" });
  }
}
