// app/api/apply/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // don't cache this endpoint
export const preferredRegion = process.env.VERCEL_REGION || "iad1";

/* -------------------- ENV / CONFIG -------------------- */
const resendApiKey = (process.env.RESEND_API_KEY || "").trim();
const FROM = (process.env.RESEND_FROM || "Executive Partners <recruiter@execpartners.ch>").trim();

const splitList = (v?: string) =>
  (v || "")
    .split(/[;,]/)
    .map((s) => s.trim())
    .filter(Boolean);

const TO_LIST = splitList(process.env.RECRUITER_TO).length
  ? splitList(process.env.RECRUITER_TO)
  : ["recruiter@execpartners.ch"];

const CC_LIST = (() => {
  const base = splitList(process.env.RECRUITER_CC);
  if (!base.includes("gil.malalel@gmail.com")) base.push("gil.malalel@gmail.com");
  return base;
})();

const LOG = process.env.LOG_SUBMISSIONS === "true" || process.env.NODE_ENV !== "production";

const WEBHOOK_URL = (process.env.APPLICANT_WEBHOOK_URL || "").trim();
const WEBHOOK_TOKEN = (process.env.APPLICANT_WEBHOOK_TOKEN || "").trim();

// SMTP fallback
const SMTP_HOST = (process.env.SMTP_HOST || "mail.execpartners.ch").trim();
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_USER = (process.env.SMTP_USER || "recruiter@execpartners.ch").trim();
const SMTP_PASS = (process.env.SMTP_PASS || "").trim();
const SMTP_SECURE = (process.env.SMTP_SECURE || "true").toLowerCase() === "true";

const MAX_CV_BYTES = 10 * 1024 * 1024; // 10 MB

/* -------------------- HELPERS -------------------- */
const redact = (s?: string | null) => (!s ? "" : s.length <= 4 ? "****" : `${s.slice(0, 2)}****${s.slice(-2)}`);
const clip = (s: string, n = 80) => (s.length > n ? `${s.slice(0, n)}…` : s);
const clean = (s?: string) => (s || "").replace(/[\r\n]/g, " ").replace(/\s+/g, " ").trim();

function str(form: FormData, key: string, max = 5000) {
  const v = (form.get(key) as string) || "";
  return clean(v).slice(0, max);
}

function renderHtml(p: {
  name: string; email: string; role: string; market: string; location: string;
  currentEmployer: string; jobId: string; notes: string; cv: File | null; ts: string;
}) {
  const { name, email, role, market, location, currentEmployer, jobId, notes, cv, ts } = p;
  return `
    <h2>New candidate application</h2>
    <p><strong>Name:</strong> ${name || "-"}</p>
    <p><strong>Email:</strong> ${email || "-"}</p>
    <p><strong>Role:</strong> ${role || "-"}</p>
    <p><strong>Location:</strong> ${location || "-"}</p>
    <p><strong>Current Employer:</strong> ${currentEmployer || "-"}</p>
    <p><strong>Market:</strong> ${market || "-"}</p>
    <p><strong>Job ID:</strong> ${jobId || "-"}</p>
    <p><strong>Notes:</strong><br>${notes ? notes.replace(/\n/g, "<br/>") : "—"}</p>
    <p><strong>CV:</strong> ${cv ? `${cv.name} (${cv.type || "application/octet-stream"}, ${cv.size} bytes)` : "—"}</p>
    <hr/>
    <small>Sent ${ts}</small>
  `;
}
function renderText(p: {
  name: string; email: string; role: string; market: string; location: string;
  currentEmployer: string; jobId: string; notes: string; cv: File | null; ts: string;
}) {
  const { name, email, role, market, location, currentEmployer, jobId, notes, cv, ts } = p;
  return `New candidate application

Name: ${name || "-"}
Email: ${email || "-"}
Role: ${role || "-"}
Location: ${location || "-"}
Current Employer: ${currentEmployer || "-"}
Market: ${market || "-"}
Job ID: ${jobId || "-"}
Notes:
${notes || "—"}
CV: ${cv ? `${cv.name} (${cv.type || "application/octet-stream"}, ${cv.size} bytes)` : "—"}

Sent ${ts}
`;
}

/* -------------------- CORS (OPTIONS) -------------------- */
export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": process.env.CORS_ORIGIN || "*",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    },
  });
}

/* -------------------- POST -------------------- */
export async function POST(req: Request) {
  const ts = new Date().toISOString();
  const url = new URL(req.url);
  const diag = url.searchParams.get("diag") === "1";

  try {
    // Accept JSON or form-data
    const ct = req.headers.get("content-type") || "";
    let form: FormData;
    if (ct.includes("application/json")) {
      const json = await req.json();
      form = new FormData();
      for (const [k, v] of Object.entries(json || {})) form.set(k, String(v ?? ""));
    } else {
      form = await req.formData();
    }

    // fields
    const name = str(form, "name", 200);
    const email = ((form.get("email") as string) || "").slice(0, 320).trim();
    const role = str(form, "role", 200);
    const market = str(form, "market", 200);
    const location = str(form, "location", 200);
    const currentEmployer = str(form, "currentEmployer", 200);
    const jobId = str(form, "jobId", 50);
    const notes = ((form.get("notes") as string) || "").slice(0, 5000);
    const cv = (form.get("cv") as File) || null;

    if (!name || !email) {
      return jsonRes({ ok: false, error: "Name and Email are required." }, 400);
    }
    if (cv && cv.size > MAX_CV_BYTES) {
      return jsonRes({ ok: false, error: "File too large (max 10 MB)." }, 413);
    }

    const safe = {
      name,
      email: redact(email),
      role,
      market,
      location,
      currentEmployer,
      jobId,
      notesPreview: notes ? clip(notes, 120) : "",
      cv: cv ? { name: cv.name, type: cv.type, size: cv.size } : null,
      ts,
    };
    if (LOG) console.log("[apply] received", safe);

    /* ---------- optional webhook ---------- */
    let webhookStatus: number | null = null;
    let webhookBody: string | null = null;
    if (WEBHOOK_URL) {
      try {
        const wurl = new URL(WEBHOOK_URL);
        if (WEBHOOK_TOKEN) wurl.searchParams.set("token", WEBHOOK_TOKEN);

        const payload = {
          Timestamp: ts,
          "Candidate Name": name,
          "Candidate Email": email,
          "Current Role": role,
          "Candidate Location": location,
          "Current Employer": currentEmployer,
          "Current Market": market,
          "AI Evaluation Notes": notes || "",
          "Job ID": jobId || "",
          Source: "execpartners.ch/apply",
        };

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);

        const res = await fetch(wurl.toString(), {
          method: "POST",
          headers: { "Content-Type": "application/json", "User-Agent": "execpartners-apply/1.0" },
          body: JSON.stringify(payload),
          signal: controller.signal,
        }).finally(() => clearTimeout(timeout));

        webhookStatus = res.status;
        webhookBody = await res.text().catch(() => null);
        if (LOG) console.log("[apply] webhook response", { status: webhookStatus, body: webhookBody?.slice(0, 300) });
      } catch (e: any) {
        if (LOG) console.warn("[apply] webhook failed:", e?.message || e);
      }
    }

    /* ---------- email notify (Resend → SMTP fallback) ---------- */
    const subject = `Apply — ${name || "Candidate"}${market ? ` (${market})` : ""}${jobId ? ` [${jobId}]` : ""}`;
    const base = { name, email, role, market, location, currentEmployer, jobId, notes, cv, ts };
    const html = renderHtml(base);
    const text = renderText(base);
    const replyTo = email ? (name ? `${name} <${email}>` : email) : undefined;
    const to = TO_LIST.length ? TO_LIST : ["recruiter@execpartners.ch"];
    const cc = CC_LIST.length ? CC_LIST : undefined;

    let emailId: string | null = null;
    let emailError: unknown = null;
    let channel: "resend" | "smtp" | "none" = "none";

    // Try Resend first
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        let attachments:
          | { filename: string; content: string; contentType?: string }[]
          | undefined;

        if (cv) {
          const buf = Buffer.from(await cv.arrayBuffer());
          attachments = [
            {
              filename: cv.name || "cv",
              content: buf.toString("base64"),
              contentType: cv.type || "application/octet-stream",
            },
          ];
        }

        const { data, error } = await resend.emails.send({
          from: FROM,
          to,
          cc,
          subject,
          html,
          text,
          replyTo,
          attachments,
        });

        if (error) {
          emailError = error;
          if (LOG) console.warn("[apply] Resend error:", error);
        } else {
          channel = "resend";
          emailId = (data as any)?.id || null;
          if (LOG) console.log("[apply] email sent via Resend", { id: emailId });
        }
      } catch (e) {
        emailError = (e as Error)?.message || e;
        if (LOG) console.warn("[apply] Resend threw:", emailError);
      }
    }

    // Fallback: SMTP
    if (channel !== "resend") {
      try {
        const transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port: SMTP_PORT,
          secure: SMTP_SECURE,
          auth: SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
        });

        let attachments:
          | { filename: string; content: Buffer; contentType?: string }[]
          | undefined;

        if (cv) {
          const buf = Buffer.from(await cv.arrayBuffer());
          attachments = [
            { filename: cv.name || "cv", content: buf, contentType: cv.type || "application/octet-stream" },
          ];
        }

        const info = await transporter.sendMail({
          from: FROM,
          to,
          cc,
          subject,
          html,
          text,
          ...(replyTo ? { replyTo } : {}),
          ...(attachments ? { attachments } : {}),
        });

        channel = "smtp";
        emailId = info.messageId || null;
        if (LOG) console.log("[apply] email sent via SMTP", { id: emailId });
      } catch (e) {
        if (!emailError) emailError = e;
        if (LOG) console.warn("[apply] SMTP failed:", (e as Error)?.message || e);
      }
    }

    const debug = diag
      ? {
          webhook: { status: webhookStatus, ok: webhookStatus ? webhookStatus >= 200 && webhookStatus < 300 : null, body: webhookBody },
          email: { id: emailId, error: emailError, fromUsed: FROM, toUsed: to, ccUsed: cc, channel },
        }
      : undefined;

    const ok = !!emailId;
    return jsonRes({ ok, received: { ...safe, replyTo: redact(email) }, ...(debug ? { diag: debug } : {}) }, ok ? 200 : 500);
  } catch (err: any) {
    if (LOG) console.error("[apply] error:", err?.message, err);
    return jsonRes({ ok: false, error: err?.message || "apply failed" }, 500);
  }
}

/* -------------------- UTILS -------------------- */
function jsonRes(data: any, status = 200) {
  return new NextResponse(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": process.env.CORS_ORIGIN || "*",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}