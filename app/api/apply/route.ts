// app/api/apply/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const resendApiKey = process.env.RESEND_API_KEY;
const recruiterTo = process.env.RECRUITER_TO || "recruiter@execpartners.ch";
const LOG = process.env.LOG_SUBMISSIONS === "true" || process.env.NODE_ENV !== "production";

function redacted(s?: string | null) {
  if (!s) return "";
  // show first 2 and last 2 chars
  if (s.length <= 4) return "****";
  return `${s.slice(0, 2)}****${s.slice(-2)}`;
}

export async function POST(req: Request) {
  try {
    // Must be multipart/form-data (our client sends FormData)
    const form = await req.formData();

    const name = (form.get("name") as string | null) || "";
    const email = (form.get("email") as string | null) || "";
    const role = (form.get("role") as string | null) || "";
    const market = (form.get("market") as string | null) || "";
    const jobId = (form.get("jobId") as string | null) || "";
    const notes = (form.get("notes") as string | null) || "";
    const cv = form.get("cv") as File | null;

    const payload = {
      name,
      email,
      role,
      market,
      jobId,
      notes,
      cv: cv
        ? {
            name: cv.name,
            type: cv.type,
            size: cv.size,
          }
        : null,
      ts: new Date().toISOString(),
    };

    // ---- Development / debug logging (safe, redacted) ----
    if (LOG) {
      console.log("[apply] submission received", {
        name,
        email: redacted(email),
        role,
        market,
        jobId,
        notesPreview: notes ? `${notes.slice(0, 40)}${notes.length > 40 ? "…" : ""}` : "",
        cv: payload.cv,
      });
    }

    // ---- Optional: forward to webhook (e.g., Zapier/Manatal/Apps Script) ----
    const webhookUrl = process.env.APPLICANT_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (e) {
        if (LOG) console.warn("[apply] webhook failed:", (e as Error)?.message);
      }
    }

    // ---- Optional: Email notification via Resend ----
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      // Build HTML body
      const html = `
        <h2>New Apply submission</h2>
        <p><b>Name:</b> ${name || "-"}</p>
        <p><b>Email:</b> ${email || "-"}</p>
        <p><b>Role:</b> ${role || "-"}</p>
        <p><b>Market:</b> ${market || "-"}</p>
        <p><b>Job ID:</b> ${jobId || "-"}</p>
        <p><b>Notes:</b> ${notes ? notes.replace(/\n/g, "<br/>") : "-"}</p>
        <p><b>CV:</b> ${cv ? `${cv.name} (${cv.type || "application/octet-stream"}, ${cv.size} bytes)` : "—"}</p>
        <hr/>
        <small>Sent ${new Date().toISOString()}</small>
      `;

      // Attach CV if provided (Resend accepts base64 content)
      let attachments: { filename: string; content: string }[] | undefined;
      if (cv) {
        const buf = Buffer.from(await cv.arrayBuffer());
        attachments = [
          {
            filename: cv.name || "cv",
            content: buf.toString("base64"),
          },
        ];
      }

      try {
        await resend.emails.send({
          from: "Executive Partners <no-reply@execpartners.ch>",
          to: recruiterTo,
          subject: `Apply — ${name || "Unknown"} (${market || "Market"})`,
          html,
          attachments,
        });
      } catch (e) {
        if (LOG) console.warn("[apply] email send failed:", (e as Error)?.message);
      }
    }

    return NextResponse.json({ ok: true, received: { ...payload, email: redacted(email) } });
  } catch (err: any) {
    if (LOG) console.error("[apply] error:", err?.message, err);
    return NextResponse.json(
      { ok: false, error: err?.message ?? "apply failed" },
      { status: 500 }
    );
  }
}