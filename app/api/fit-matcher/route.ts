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
      await resend.emails.send({
        from: "Gil M. Chalem · Executive Partners <noreply@auth.execpartners.ch>",
        to: email,
        subject: `Your Private Bank Fit Assessment — ${segment}`,
        html: `<div style="font-family:Georgia,serif;max-width:560px;color:#1a1a2e;padding:32px 0">
          <p style="font-size:13px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#C9A14A;margin:0 0 24px">Executive Partners · Confidential</p>
          <p style="font-size:16px;margin:0 0 16px">Dear ${greeting},</p>
          <p style="font-size:15px;margin:0 0 16px">Your market positioning assessment has been completed.</p>
          <div style="background:#f9f7f2;border-left:3px solid #C9A14A;padding:16px 20px;margin:0 0 20px">
            <p style="font-size:13px;font-weight:600;color:#1a1a2e;margin:0 0 6px">${segment}</p>
            <p style="font-size:13px;color:#444;margin:0">Market Demand: <strong>${demand}</strong></p>
          </div>
          <p style="font-size:14px;color:#444;margin:0 0 16px">We will review your profile against current market activity and be in touch within 48 hours if we identify relevant positioning for your specific configuration.</p>
          <p style="font-size:14px;color:#444;margin:0 0 24px">If you would like to discuss your positioning in confidence before then, I am available for a 20-minute call.</p>
          <p style="font-size:14px;margin:24px 0 0"><a href="https://www.execpartners.ch/en/contact" style="background:#C9A14A;color:#000;padding:10px 22px;border-radius:20px;text-decoration:none;font-weight:600;font-size:13px">Schedule a confidential call &#8594;</a></p>
          <p style="font-size:13px;color:#888;margin:32px 0 0;border-top:1px solid #eee;padding-top:16px">Gil M. Chalem<br>Managing Partner, Executive Partners<br><a href="https://www.execpartners.ch" style="color:#C9A14A">execpartners.ch</a></p>
        </div>`,
      });
    }

    logToSheet([ts || new Date().toISOString(), name || "", email, aumLabel, seniority, geography, clientType, mandate, employment, booking, segment, demand]).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[fit-matcher] error:", err);
    return NextResponse.json({ ok: true, warning: "notification_failed" });
  }
}
