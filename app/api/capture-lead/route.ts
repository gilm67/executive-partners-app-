import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const FROM_NOREPLY = "EP Tools <noreply@auth.execpartners.ch>";
const FROM_GIL = "Gil M. Chalem · Executive Partners <noreply@auth.execpartners.ch>";
const TO_GIL = "gil.chalem@execpartners.ch";
const SHEET_ID = "1Osr2RrgQZqDjK28knSXlqNXqJk2rcaATLqE1Yjy_W0c";

async function logToSheet(email: string, name: string, tool: string) {
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
    await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`, {
      method: "POST",
      headers: { Authorization: `Bearer ${td.access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ values: [[new Date().toISOString(), email, name || "", tool, "", "", "", "", "", ""]] }),
    });
  } catch (e) { console.error("capture-lead sheet log failed:", e); }
}

function scoreContext(score: number): string {
  if (score >= 85) return "Your profile is in the top tier of candidates we assess. With appropriate legal preparation and structured timing, Tier-1 platforms will take this conversation seriously.";
  if (score >= 72) return "Your profile is commercially presentable at Tier-1 level. The next step is identifying 3 to 5 target platforms that match your client geography and approaching them in a sequenced, discreet process.";
  if (score >= 58) return "Your profile has workable portability. There are specific preparation steps — set out in your PDF — that could materially improve your position before any approach to a bank.";
  return "Your profile has areas that need attention before approaching Tier-1 platforms. The recommendations in your PDF are worth working through carefully before any conversation starts.";
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("[capture-lead] RESEND_API_KEY not set");
      return NextResponse.json({ ok: true, warning: "resend_not_configured" });
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const body = await req.json();
    const { name, email, tool, summary, score, level } = body as {
      name?: string; email: string; tool: string; summary?: string; score?: number; level?: string;
    };

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const displayName = name?.trim() || "";
    const greeting = displayName ? displayName.split(" ")[0] : "Colleague";
    const toolLabel = tool === "portability" ? "Portability Readiness Score\u2122" : "Business Plan Simulator";
    const timestamp = new Date().toLocaleString("en-GB", {
      timeZone: "Europe/Zurich", day: "2-digit", month: "short",
      year: "numeric", hour: "2-digit", minute: "2-digit",
    });

    // 1. Notify Gil
    await resend.emails.send({
      from: FROM_NOREPLY,
      to: TO_GIL,
      subject: `New tool lead \u2014 ${toolLabel}${score ? " \u2014 " + score + "%" : ""} \u2014 ${email}`,
      html: `<p><b>${displayName || "Anonymous"}</b> (${email}) used <b>${toolLabel}</b> at ${timestamp}${score ? ` \u2014 Score: <b>${score}%</b> (${level || ""})` : ""}${summary ? `<br><br><small style="color:#666">${summary}</small>` : ""}</p>`,
    });

    // 2. Immediate confirmation to candidate (portability tool only)
    if (tool === "portability" && score !== undefined) {
      const ctx = scoreContext(score);

      await resend.emails.send({
        from: FROM_GIL,
        to: email,
        subject: `Your EP Portability Score\u2122 \u2014 ${score}%`,
        html: `<div style="font-family:Georgia,serif;max-width:560px;color:#1a1a2e;padding:32px 0">
  <p style="font-size:13px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#C9A14A;margin:0 0 24px">Executive Partners \u00b7 Confidential</p>
  <p style="font-size:16px;margin:0 0 16px">Dear ${greeting},</p>
  <p style="font-size:15px;margin:0 0 16px">Your EP Portability Score\u2122 came in at <strong>${score}%</strong> \u2014 <em>${level || ""}</em>.</p>
  <p style="font-size:14px;color:#444;margin:0 0 16px">${ctx}</p>
  <p style="font-size:14px;color:#444;margin:0 0 24px">Your full diagnostic PDF \u2014 including risk flags, score breakdown, and specific recommendations \u2014 was downloaded to your device when you completed the assessment.</p>
  <p style="font-size:14px;color:#444;margin:0 0 8px">If you would like to discuss your results in confidence, I am available for a 20-minute call. No pipeline pressure \u2014 just a direct conversation about your situation.</p>
  <p style="font-size:14px;margin:24px 0 0"><a href="https://www.execpartners.ch/en/contact" style="background:#C9A14A;color:#000;padding:10px 22px;border-radius:20px;text-decoration:none;font-weight:600;font-size:13px">Schedule a confidential call \u2192</a></p>
  <p style="font-size:13px;color:#888;margin:32px 0 0;border-top:1px solid #eee;padding-top:16px">Gil M. Chalem<br>Managing Partner, Executive Partners<br><a href="https://www.execpartners.ch" style="color:#C9A14A">execpartners.ch</a></p>
</div>`,
      });

      // 3. Scheduled 24h follow-up
      const followUpAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      await resend.emails.send({
        from: FROM_GIL,
        to: email,
        subject: `One thought on your portability score`,
        scheduledAt: followUpAt,
        html: `<div style="font-family:Georgia,serif;max-width:560px;color:#1a1a2e;padding:32px 0">
  <p style="font-size:16px;margin:0 0 16px">Dear ${greeting},</p>
  <p style="font-size:15px;margin:0 0 16px">You ran the EP Portability Score\u2122 yesterday and came in at <strong>${score}%</strong>.</p>
  <p style="font-size:14px;color:#444;margin:0 0 16px">The bankers who get the best outcomes from a move are the ones who understand their commercial position before the first conversation with a bank \u2014 not after.</p>
  <p style="font-size:14px;color:#444;margin:0 0 16px">If you would like a 20-minute confidential call to discuss what your score means in practice \u2014 which platforms make sense, what to prepare, how to protect your book during the transition \u2014 I am available this week.</p>
  <p style="font-size:14px;color:#444;margin:0 0 24px">Nothing to pitch. Just a direct conversation about your situation.</p>
  <p style="font-size:14px;margin:24px 0 0"><a href="https://www.execpartners.ch/en/contact" style="background:#C9A14A;color:#000;padding:10px 22px;border-radius:20px;text-decoration:none;font-weight:600;font-size:13px">Book a 20-minute call \u2192</a></p>
  <p style="font-size:13px;color:#888;margin:32px 0 0;border-top:1px solid #eee;padding-top:16px">Gil M. Chalem<br>Managing Partner, Executive Partners<br><a href="https://www.execpartners.ch" style="color:#C9A14A">execpartners.ch</a></p>
</div>`,
      });
    }

    logToSheet(email, displayName, tool).catch(() => {});
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[capture-lead] error:", err);
    return NextResponse.json({ ok: true, warning: "notification_failed" });
  }
}
