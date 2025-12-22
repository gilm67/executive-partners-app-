// app/api/private/admin/requests/[id]/status/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import { requireAdminApi } from "@/app/private/lib/require-admin-api";
import { notifyRequestDecision } from "@/app/private/lib/notify-request-decision";
import { MAIL_FROM } from "@/app/private/config/mail";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const noStoreHeaders = {
  "Cache-Control": "no-store, max-age=0",
  Pragma: "no-cache",
};

type Status = "approved" | "rejected" | "pending";

type Body = {
  status?: unknown;
  reason?: unknown;
};

function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function sanitizeNext(nextRaw: unknown): string | null {
  if (typeof nextRaw !== "string") return null;

  const next = nextRaw.trim();
  if (!next) return null;
  if (!next.startsWith("/")) return null;
  if (next.startsWith("//")) return null;
  if (next.includes("://")) return null;

  const ALLOWED_PREFIXES = ["/private", "/en/portability", "/en/bp-simulator"];
  if (!ALLOWED_PREFIXES.some((p) => next.startsWith(p))) return null;

  return next;
}

function nextForRequestType(requestType?: string | null): string {
  if (requestType === "bp") return "/en/bp-simulator";
  if (requestType === "portability") return "/en/portability";
  return "/private";
}

function cleanOrigin(req: Request) {
  // Use configured origin when available; otherwise derive from headers
  const explicit =
    process.env.PRIVATE_APP_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    "";

  if (explicit) {
    const u = explicit.startsWith("http") ? explicit : `https://${explicit}`;
    return u.replace(/\/$/, "");
  }

  const proto = req.headers.get("x-forwarded-proto") ?? "https";
  const host =
    req.headers.get("x-forwarded-host") ??
    req.headers.get("host") ??
    "www.execpartners.ch";
  return `${proto}://${host}`.replace(/\/$/, "");
}

async function sendCandidateLoginLink(args: {
  req: Request;
  supabaseAdmin: any;
  email: string;
  nextPath: string;
  requestType?: string | null;
}) {
  const { req, supabaseAdmin, email, nextPath, requestType } = args;

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) return;

  const origin = cleanOrigin(req);

  // Create one-time token in magic_links (same system as request/verify)
  const tokenRaw = crypto.randomBytes(32).toString("hex");
  const tokenHash = sha256(tokenRaw);

  const expiresAtIso = new Date(Date.now() + 20 * 60 * 1000).toISOString(); // 20 min

  // Store magic link
  const { error: insErr } = await supabaseAdmin.from("magic_links").insert({
    email,
    token_hash: tokenHash,
    expires_at: expiresAtIso,
    used_at: null,
    meta: { via: "admin_approval", next: nextPath, request_type: requestType ?? null },
  });

  if (insErr) return;

  // Link points to your /private/auth/verify page (client hits /api/magic-link/verify)
  const nextEncoded = encodeURIComponent(nextPath);
  const href = `${origin}/private/auth/verify?token=${tokenRaw}&next=${nextEncoded}`;

  const resend = new Resend(RESEND_API_KEY);

  const toolLabel =
    requestType === "bp"
      ? "Business Plan Simulator"
      : requestType === "portability"
      ? "Portability Readiness Score™"
      : "Private Area";

  const html = `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
      <h2 style="margin:0 0 12px;">Access approved — Executive Partners</h2>
      <p style="margin:0 0 14px; font-size:14px; line-height:1.6;">
        Your access to <b>${toolLabel}</b> has been approved.
      </p>

      <p style="margin:0 0 16px;">
        <a href="${href}" style="display:inline-block; background:#111827; color:#fff; padding:10px 14px; border-radius:10px; text-decoration:none;">
          Continue securely
        </a>
      </p>

      <p style="margin:0; font-size:12px; color:#6b7280;">
        This link expires in 20 minutes and can be used once.
      </p>
    </div>
  `;

  await resend.emails.send({
    from: MAIL_FROM,
    to: [email],
    subject: "Your access is approved — Executive Partners",
    html,
    tags: [{ name: "module", value: "auto-approve" }],
  });
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // Next 15: params is async
) {
  // 1) AUTH ONLY
  const auth = await requireAdminApi(req);
  if (!auth.ok) {
    return NextResponse.json(
      { ok: false, error: auth.error },
      { status: auth.status, headers: noStoreHeaders }
    );
  }

  try {
    const supabaseAdmin = auth.supabaseAdmin;
    const adminEmail = auth.adminEmail;

    const { id } = await params;

    const body: Body = await req.json().catch(() => ({}));
    const status = typeof body.status === "string" ? body.status : "";
    const reason =
      typeof body.reason === "string" ? body.reason.trim().slice(0, 500) : null;

    if (!id) {
      return NextResponse.json(
        { ok: false, error: "missing_id" },
        { status: 400, headers: noStoreHeaders }
      );
    }

    if (!["approved", "rejected", "pending"].includes(status)) {
      return NextResponse.json(
        { ok: false, error: "invalid_status" },
        { status: 400, headers: noStoreHeaders }
      );
    }

    const nextStatus = status as Status;
    const nowIso = new Date().toISOString();

    // Read current row
    const { data: beforeRow, error: beforeErr } = await supabaseAdmin
      .from("private_profile_access_requests")
      .select("id,status,requester_email,requester_org,profile_id,request_type")
      .eq("id", id)
      .maybeSingle();

    if (beforeErr || !beforeRow) {
      return NextResponse.json(
        { ok: false, error: "not_found" },
        { status: 404, headers: noStoreHeaders }
      );
    }

    // Update + stamp reviewer
    const patch =
      nextStatus === "pending"
        ? { status: nextStatus, reviewed_at: null, reviewed_by: null }
        : { status: nextStatus, reviewed_at: nowIso, reviewed_by: adminEmail };

    const { data: updated, error: updErr } = await supabaseAdmin
      .from("private_profile_access_requests")
      .update(patch)
      .eq("id", id)
      .select(
        "id,status,reviewed_at,reviewed_by,profile_id,requester_email,requester_org,request_type"
      )
      .maybeSingle();

    if (updErr || !updated) {
      return NextResponse.json(
        { ok: false, error: "update_failed" },
        { status: 500, headers: noStoreHeaders }
      );
    }

    // ✅ If approved: upsert into private_users + auto-send login link
    if (nextStatus === "approved") {
      const requesterEmail = String(updated.requester_email || "").trim().toLowerCase();
      const requestType = String(updated.request_type || beforeRow.request_type || "").trim();

      // 1) Upsert user (role candidate by default)
      if (requesterEmail) {
        try {
          await supabaseAdmin.from("private_users").upsert(
            {
              email: requesterEmail,
              role: "candidate",
              org: updated.requester_org ?? beforeRow.requester_org ?? null,
              updated_at: nowIso,
            },
            { onConflict: "email" }
          );
        } catch {
          // swallow
        }

        // 2) Send magic login link to the tool
        const nextPath = sanitizeNext(nextForRequestType(requestType)) ?? "/private";
        try {
          await sendCandidateLoginLink({
            req,
            supabaseAdmin,
            email: requesterEmail,
            nextPath,
            requestType,
          });
        } catch {
          // swallow
        }
      }
    }

    // Audit (best-effort)
    try {
      await supabaseAdmin.from("private_audit_log").insert({
        action: "request_status_changed",
        email: adminEmail,
        meta: {
          id,
          from: beforeRow.status,
          to: nextStatus,
          reason: reason || undefined,
          profile_id: beforeRow.profile_id,
          requester_email: beforeRow.requester_email,
          requester_org: beforeRow.requester_org,
          request_type: beforeRow.request_type,
        },
        created_at: nowIso,
      });
    } catch {
      // swallow
    }

    // Existing decision email (best-effort)
    if (nextStatus !== "pending") {
      try {
        Promise.resolve(
          notifyRequestDecision({
            decision: nextStatus,
            adminEmail,
            requestId: updated.id,
            profileId: updated.profile_id ?? beforeRow.profile_id,
            requesterEmail: updated.requester_email ?? beforeRow.requester_email,
            requesterOrg: updated.requester_org ?? beforeRow.requester_org,
            reason: reason || undefined,
            reviewedAt: updated.reviewed_at ?? nowIso,
          })
        ).catch(() => {});
      } catch {
        // swallow
      }
    }

    return NextResponse.json(
      { ok: true, data: updated },
      { status: 200, headers: noStoreHeaders }
    );
  } catch (err: any) {
    console.error("[status route] server error", err);

    const hint =
      process.env.NODE_ENV !== "production"
        ? String(err?.message || err)
        : undefined;

    return NextResponse.json(
      { ok: false, error: "server_error", hint },
      { status: 500, headers: noStoreHeaders }
    );
  }
}