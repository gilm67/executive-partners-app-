import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const FROM = "EP Tools <noreply@auth.execpartners.ch>";
const TO = "gil.chalem@execpartners.ch";
const SHEET_ID = "1Osr2RrgQZqDjK28knSXlqNXqJk2rcaATLqE1Yjy_W0c";

async function logToSheet(email: string, name: string, tool: string) {
  try {
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
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
    const { name, email, tool, summary } = body as {
      name?: string; email: string; tool: string; summary?: string;
    };

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    const displayName = name?.trim() || "Anonymous";
    const toolLabel = tool === "portability" ? "Portability Readiness Score™" : "Business Plan Simulator";
    const timestamp = new Date().toLocaleString("en-GB", {
      timeZone: "Europe/Zurich", day: "2-digit", month: "short",
      year: "numeric", hour: "2-digit", minute: "2-digit",
    });

    await resend.emails.send({
      from: FROM, to: TO,
      subject: `🔔 New tool lead — ${toolLabel} — ${email}`,
      html: `<p><b>${displayName}</b> (${email}) used <b>${toolLabel}</b> at ${timestamp}${summary ? `<br><br>${summary}` : ""}</p>`,
    });

    logToSheet(email, displayName, tool).catch(() => {});
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[capture-lead] error:", err);
    return NextResponse.json({ ok: true, warning: "notification_failed" });
  }
}
