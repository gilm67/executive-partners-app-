import { NextResponse } from "next/server";
import { requireAdminApi } from "@/app/private/lib/require-admin-api";
import { notifyRequestDecision } from "@/app/private/lib/notify-request-decision";

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

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // Next 15: params is async
) {
  // 1) AUTH ONLY (this is the ONLY place we should return 401/403)
  const auth = await requireAdminApi(req);
  if (!auth.ok) {
    return NextResponse.json(
      { ok: false, error: auth.error },
      { status: auth.status, headers: noStoreHeaders }
    );
  }

  // 2) Everything below is "business logic" — if it fails, it’s NOT "unauthorized"
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

    const next = status as Status;
    const nowIso = new Date().toISOString();

    // Read current row (for audit/email baseline)
    const { data: beforeRow, error: beforeErr } = await supabaseAdmin
      .from("private_profile_access_requests")
      .select("id,status,requester_email,requester_org,profile_id")
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
      next === "pending"
        ? { status: next, reviewed_at: null, reviewed_by: null }
        : { status: next, reviewed_at: nowIso, reviewed_by: adminEmail };

    const { data: updated, error: updErr } = await supabaseAdmin
      .from("private_profile_access_requests")
      .update(patch)
      .eq("id", id)
      .select(
        "id,status,reviewed_at,reviewed_by,profile_id,requester_email,requester_org"
      )
      .maybeSingle();

    if (updErr || !updated) {
      return NextResponse.json(
        { ok: false, error: "update_failed" },
        { status: 500, headers: noStoreHeaders }
      );
    }

    // Audit (best-effort) ✅ DO NOT use `.catch()` on Supabase builders
    try {
      await supabaseAdmin.from("private_audit_log").insert({
        action: "request_status_changed",
        email: adminEmail,
        meta: {
          id,
          from: beforeRow.status,
          to: next,
          reason: reason || undefined,
          profile_id: beforeRow.profile_id,
          requester_email: beforeRow.requester_email,
          requester_org: beforeRow.requester_org,
        },
        created_at: nowIso,
      });
    } catch {
      // swallow audit errors
    }

    // Email notification (best-effort — must never break API)
    if (next !== "pending") {
      try {
        Promise.resolve(
          notifyRequestDecision({
            decision: next,
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
        // swallow sync errors (e.g. missing RESEND_API_KEY)
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