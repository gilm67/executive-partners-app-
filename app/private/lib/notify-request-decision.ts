import { Resend } from "resend";
import type { CreateEmailOptions } from "resend";

type Decision = "approved" | "rejected";

type NotifyArgs = {
  decision: Decision;
  adminEmail: string; // INTERNAL ONLY (audit/db) — never exposed in email payload/body
  requestId: string;
  profileId: string;
  requesterEmail: string;
  requesterOrg: string | null;
  reason?: string;
  reviewedAt: string; // ISO string
};

function mustGetEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

function esc(s: string) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeEmail(email: string) {
  const e = String(email || "").trim();
  if (!e || !e.includes("@") || e.length > 320) {
    throw new Error("Invalid requester email");
  }
  return e;
}

export async function notifyRequestDecision(args: NotifyArgs) {
  const apiKey = mustGetEnv("RESEND_API_KEY");
  const resend = new Resend(apiKey);

  // ✅ single source of truth identity
  const RECRUITER_MAILBOX = "recruiter@execpartners.ch";
  const from = `Executive Partners <${RECRUITER_MAILBOX}>`;
  const replyTo = RECRUITER_MAILBOX;

  const to = safeEmail(args.requesterEmail);

  const subject =
    args.decision === "approved"
      ? "Access request approved — Executive Partners"
      : "Access request rejected — Executive Partners";

  const decisionLabel = args.decision.toUpperCase();
  const reviewedAtHuman = new Date(args.reviewedAt).toLocaleString("en-CH");

  const reasonHtml = args.reason
    ? `<p style="margin:14px 0 0 0;"><strong>Reason:</strong> ${esc(args.reason)}</p>`
    : "";

  const html = `
  <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.5; color: #111;">
    <h2 style="margin:0 0 12px 0;">Private Profile Access Request: ${decisionLabel}</h2>

    <p style="margin:0 0 10px 0;">
      Your access request has been <strong>${esc(args.decision)}</strong>.
    </p>

    <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; font-size: 14px;">
      <tr>
        <td style="padding:6px 10px; color:#555;">Profile ID</td>
        <td style="padding:6px 10px;"><code>${esc(args.profileId)}</code></td>
      </tr>
      <tr>
        <td style="padding:6px 10px; color:#555;">Request ID</td>
        <td style="padding:6px 10px;"><code>${esc(args.requestId)}</code></td>
      </tr>
      <tr>
        <td style="padding:6px 10px; color:#555;">Organization</td>
        <td style="padding:6px 10px;">${esc(args.requesterOrg ?? "—")}</td>
      </tr>
      <tr>
        <td style="padding:6px 10px; color:#555;">Reviewed at</td>
        <td style="padding:6px 10px;">${esc(reviewedAtHuman)}</td>
      </tr>
    </table>

    ${reasonHtml}

    <p style="margin:18px 0 0 0; color:#666; font-size: 12px;">
      Executive Partners • Private & Confidential
    </p>
  </div>
  `;

  const text = [
    `Private Profile Access Request: ${decisionLabel}`,
    ``,
    `Decision: ${args.decision}`,
    `Profile ID: ${args.profileId}`,
    `Request ID: ${args.requestId}`,
    `Organization: ${args.requesterOrg ?? "—"}`,
    `Reviewed at: ${reviewedAtHuman}`,
    args.reason ? `Reason: ${args.reason}` : ``,
    ``,
    `Executive Partners • Private & Confidential`,
  ]
    .filter(Boolean)
    .join("\n");

  // ✅ FIX: strongly type the payload to Resend's CreateEmailOptions
  // ✅ FIX: bcc must be string[] (safe across SDK versions)
  const payload: CreateEmailOptions = {
    from,
    to,
    replyTo,
    subject,
    html,
    text,
    bcc: [RECRUITER_MAILBOX],
    tags: [{ name: "module", value: "private-access" }],
  };

  const res = await resend.emails.send(payload);

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log("RESEND_SEND_RESULT", res);
  }

  return res;
}