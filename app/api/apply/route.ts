// app/api/apply/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

/* ---------- config ---------- */
const resendApiKey = process.env.RESEND_API_KEY || "";
// Use Resend default until your domain is verified. Then switch to:
//   "Executive Partners <noreply@execpartners.ch>"
const FROM = process.env.RESEND_FROM || "onboarding@resend.dev";

// allow multiple recipients via comma/semicolon
const splitList = (v?: string) =>
  (v || "")
    .split(/[;,]/)
    .map((s) => s.trim())
    .filter(Boolean);

const TO_LIST = splitList(process.env.RECRUITER_TO) || ["recruiter@execpartners.ch"];
const CC_LIST = splitList(process.env.RECRUITER_CC); // e.g. "gil.malalel@gmail.com"
const LOG = process.env.LOG_SUBMISSIONS === "true" || process.env.NODE_ENV !== "production";

// Secure webhook (Google Apps Script, Zapier, ATS…)
const WEBHOOK_URL = process.env.APPLICANT_WEBHOOK_URL || "";
const WEBHOOK_TOKEN = process.env.APPLICANT_WEBHOOK_TOKEN || "";

// server-side safety limits
const MAX_CV_BYTES = 10 * 1024 * 1024; // 10 MB

/* ---------- helpers ---------- */
const redact = (s?: string | null) =>
  !s ? "" : s.length <= 4 ? "****" : `${s.slice(0, 2)}****${s.slice(-2)}`;

const clip = (s: string, n = 80) => (s.length > n ? `${s.slice(0, n)}…` : s);

const clean = (s: string) =>
  s.replace(/[\r\n]/g, " ").replace(/\s+/g, " ").trim(); // remove newlines, collapse spaces

/* ---------- POST ---------- */
export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const name = clean(((form.get("name") as string) || "").slice(0, 200));
    const email = ((form.get("email") as string) || "").slice(0, 320);
    const role = clean(((form.get("role") as string) || "").slice(0, 200));
    const market = clean(((form.get("market") as string) || "").slice(0, 200));
    const jobId = clean(((form.get("jobId") as string) || "").slice(0, 50));
    const notes = ((form.get("notes") as string) || "").slice(0, 5000);
    const cv = form.get("cv") as File | null;

    if (!name || !email) {
      return NextResponse.json({ ok: false, error: "Name and Email are required." }, { status: 400 });
    }

    if (cv && cv.size > MAX_CV_BYTES) {
      return NextResponse.json({ ok: false, error: "File too large (max 10 MB)." }, { status: 413 });
    }

    const safe = {
      name,
      email: redact(email),
      role,
      market,
      jobId,
      notesPreview: notes ? clip(notes, 120) : "",
      cv: cv ? { name: cv.name, type: cv.type, size: cv.size } : null,
      ts: new Date().toISOString(),
    };

    if (LOG) console.log("[apply] received", safe);

    /* ---------- webhook (with secret token) ---------- */
    if (WEBHOOK_URL) {
      try {
        const url = new URL(WEBHOOK_URL);
        if (WEBHOOK_TOKEN) url.searchParams.set("token", WEBHOOK_TOKEN);

        const controller = new AbortController();
        const t = setTimeout(() => controller.abort(), 6000);

        await fetch(url.toString(), {
          method: "POST",
          headers: { "Content-Type": "application/json", "User-Agent": "execpartners-apply/1.0" },
          body: JSON.stringify({
            ts: safe.ts,
            name,
            email, // send full email to the sheet/webhook
            role,
            market,
            jobId,
            notes,
            cv: safe.cv,
            source: "execpartners.ch/apply",
          }),
          signal: controller.signal,
        }).finally(() => clearTimeout(t));
      } catch (e) {
        if (LOG) console.warn("[apply] webhook failed:", (e as Error)?.message || e);
      }
    }

    /* ---------- email notify (Resend) ---------- */
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      const html = `
        <h2>New candidate application</h2>
        <p><strong>Name:</strong> ${name || "-"}</p>
        <p><strong>Email:</strong> ${email || "-"}</p>
        <p><strong>Role:</strong> ${role || "-"}</p>
        <p><strong>Market:</strong> ${market || "-"}</p>
        <p><strong>Job ID:</strong> ${jobId || "-"}</p>
        <p><strong>Notes:</strong><br>${notes ? notes.replace(/\n/g, "<br/>") : "—"}</p>
        <p><strong>CV:</strong> ${cv ? `${cv.name} (${cv.type || "application/octet-stream"}, ${cv.size} bytes)` : "—"}</p>
        <hr/>
        <small>Sent ${new Date().toISOString()}</small>
      `;

      const text =
        `New candidate application\n\n` +
        `Name: ${name || "-"}\n` +
        `Email: ${email || "-"}\n` +
        `Role: ${role || "-"}\n` +
        `Market: ${market || "-"}\n` +
        `Job ID: ${jobId || "-"}\n` +
        `Notes:\n${notes || "—"}\n` +
        `CV: ${cv ? `${cv.name} (${cv.type || "application/octet-stream"}, ${cv.size} bytes)` : "—"}\n`;

      let attachments:
        | { filename: string; content: string }[]
        | undefined;

      if (cv) {
        const buf = Buffer.from(await cv.arrayBuffer());
        attachments = [{ filename: cv.name || "cv", content: buf.toString("base64") }];
      }

      try {
        const result = await resend.emails.send({
          from: FROM,
          to: TO_LIST,
          cc: CC_LIST.length ? CC_LIST : undefined,
          subject: `Apply — ${name || "Candidate"}${market ? ` (${market})` : ""}`,
          html,
          text,
          attachments,
          reply_to: email ? [{ email, name: name || undefined }] : undefined,
        });
        if (LOG) console.log("[apply] email sent", { id: (result as any)?.id || "n/a" });
      } catch (e) {
        if (LOG) console.warn("[apply] email send failed:", (e as Error)?.message || e);
      }
    } else if (LOG) {
      console.warn("[apply] RESEND_API_KEY not set — skipping email send");
    }

    return NextResponse.json({ ok: true, received: safe });
  } catch (err: any) {
    if (LOG) console.error("[apply] error:", err?.message, err);
    return NextResponse.json({ ok: false, error: err?.message || "apply failed" }, { status: 500 });
  }
}