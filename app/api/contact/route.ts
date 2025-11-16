// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const resendApiKey = process.env.RESEND_API_KEY;
const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL || "contact@execpartners.ch";
const CONTACT_FROM_EMAIL =
  process.env.CONTACT_FROM_EMAIL ||
  "Executive Partners <no-reply@execpartners.ch>";

function clean(v: any): string {
  if (!v) return "";
  return String(v).trim();
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let body: Record<string, any> = {};

    // Handle JSON or FormData
    if (contentType.includes("application/json")) {
      body = await req.json();
    } else {
      const form = await req.formData();
      body = Object.fromEntries(form.entries());
    }

    // Extract fields
    const name = clean(body.name);
    const email = clean(body.email);
    const message = clean(body.message);
    const contactType = clean(body.contactType);

    // Optional: phone
    const phone = clean(body.phone);

    // Hiring Manager fields
    const hm_company = clean(body.hm_company);
    const hm_role = clean(body.hm_role);
    const hm_location = clean(body.hm_location);

    // Candidate fields
    const cand_bank = clean(body.cand_bank);
    const cand_market = clean(body.cand_market);
    const cand_aum_band = clean(body.cand_aum_band);

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const typeLabel =
      contactType === "candidate"
        ? "Candidate"
        : contactType === "hiring-manager"
        ? "Hiring Manager"
        : "Other";

    const subject = `[Executive Partners] New ${typeLabel} contact — ${name}`;

    /* ----------------------------------------------------------
       Build the beautiful HTML email
    ---------------------------------------------------------- */

    const htmlParts: string[] = [];

    // Basic info
    htmlParts.push(`
      <h2 style="font-family:system-ui;font-size:18px;margin-bottom:8px;">
        New contact received
      </h2>

      <table cellpadding="6" style="font-family:system-ui;font-size:14px;border-collapse:collapse;">
        <tr><td style="font-weight:600;">Name</td><td>${name}</td></tr>
        <tr><td style="font-weight:600;">Email</td><td>${email}</td></tr>
        <tr><td style="font-weight:600;">Type</td><td>${typeLabel}</td></tr>
        <tr><td style="font-weight:600;">Phone</td><td>${phone || "—"}</td></tr>
      </table>
    `);

    // Hiring manager block
    if (hm_company || hm_role || hm_location) {
      htmlParts.push(`
        <h3 style="font-family:system-ui;font-size:15px;margin-top:20px;">
          Hiring Manager details
        </h3>
        <table cellpadding="6" style="font-family:system-ui;font-size:14px;border-collapse:collapse;">
          <tr><td style="font-weight:600;">Company</td><td>${hm_company || "—"}</td></tr>
          <tr><td style="font-weight:600;">Role</td><td>${hm_role || "—"}</td></tr>
          <tr><td style="font-weight:600;">Location</td><td>${hm_location || "—"}</td></tr>
        </table>
      `);
    }

    // Candidate block
    if (cand_bank || cand_market || cand_aum_band) {
      htmlParts.push(`
        <h3 style="font-family:system-ui;font-size:15px;margin-top:20px;">
          Candidate details
        </h3>
        <table cellpadding="6" style="font-family:system-ui;font-size:14px;border-collapse:collapse;">
          <tr><td style="font-weight:600;">Current bank</td><td>${cand_bank || "—"}</td></tr>
          <tr><td style="font-weight:600;">Market</td><td>${cand_market || "—"}</td></tr>
          <tr><td style="font-weight:600;">AUM band</td><td>${cand_aum_band || "—"}</td></tr>
        </table>
      `);
    }

    // Message
    const safeMsg = message
      .split("\n")
      .map((line) =>
        line.replace(/</g, "&lt;").replace(/>/g, "&gt;")
      )
      .join("<br />");

    htmlParts.push(`
      <h3 style="font-family:system-ui;font-size:15px;margin-top:20px;">
        Message
      </h3>
      <div style="font-family:system-ui;font-size:14px;line-height:1.5;padding:12px;border-radius:8px;background:#0b0f18;color:#e0e0e0;border:1px solid #1f2933;">
        ${safeMsg}
      </div>
    `);

    const html = `
      <div style="background:#020617;padding:20px;">
        <div style="max-width:600px;margin:0 auto;background:#020617;border-radius:16px;border:1px solid #111827;padding:20px;">
          ${htmlParts.join("")}
          <p style="font-size:11px;color:#999;margin-top:20px;font-family:system-ui;">
            Sent from the Executive Partners contact page.
          </p>
        </div>
      </div>
    `;

    /* ----------------------------------------------------------
       TEXT fallback email
    ---------------------------------------------------------- */

    const text = [
      `New contact form submission`,
      ``,
      `Name: ${name}`,
      `Email: ${email}`,
      `Type: ${typeLabel}`,
      `Phone: ${phone || "—"}`,
      ``,
      hm_company || hm_role || hm_location
        ? `Hiring Manager:\n  Company: ${hm_company}\n  Role: ${hm_role}\n  Location: ${hm_location}\n`
        : "",
      cand_bank || cand_market || cand_aum_band
        ? `Candidate:\n  Bank: ${cand_bank}\n  Market: ${cand_market}\n  AUM: ${cand_aum_band}\n`
        : "",
      `Message:\n${message}`,
    ].join("\n");

    /* ----------------------------------------------------------
       SEND EMAIL (Resend)
    ---------------------------------------------------------- */

    if (!resendApiKey) {
      console.warn("⚠ RESEND_API_KEY missing — simulated email:", {
        to: CONTACT_TO_EMAIL,
        subject,
        text,
      });
      return NextResponse.json({ ok: true, simulated: true });
    }

    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      reply_to: email,
      subject,
      html,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("CONTACT_FORM_ERROR", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 200 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, route: "/api/contact" });
}