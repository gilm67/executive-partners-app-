// app/api/private/admin/requests/route.ts
import { NextResponse } from "next/server";
import { requireAdminApi } from "@/app/private/lib/require-admin-api";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const noStoreHeaders = {
  "Cache-Control": "no-store, max-age=0",
  Pragma: "no-cache",
};

type DecisionStatus = "approved" | "denied";

function normalizeStatus(v: unknown): DecisionStatus | null {
  const s = String(v || "").trim().toLowerCase();
  if (s === "approved") return "approved";
  if (s === "denied") return "denied";
  return null;
}

// Keep in sync with verify sanitizeNext allow-list
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

export async function GET(req: Request) {
  // ✅ Works for browser + curl (cookie comes from req.headers.cookie)
  const auth = await requireAdminApi(req);

  if (!auth.ok) {
    return NextResponse.json(
      { ok: false, error: auth.error },
      { status: auth.status, headers: noStoreHeaders }
    );
  }

  const { supabaseAdmin } = auth;

  const { data, error } = await supabaseAdmin
    .from("private_profile_access_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { ok: false, error: "query_failed" },
      { status: 500, headers: noStoreHeaders }
    );
  }

  return NextResponse.json(
    { ok: true, data: data ?? [] },
    { status: 200, headers: noStoreHeaders }
  );
}

/**
 * Admin decision endpoint:
 * Body: { id: string, status: "approved" | "denied", next?: string }
 *
 * On approved:
 *  - updates request status
 *  - upserts requester into private_users (role=candidate)
 *  - triggers /api/magic-link/request to send "Continue" link to requester_email
 */
export async function POST(req: Request) {
  const auth = await requireAdminApi(req);

  if (!auth.ok) {
    return NextResponse.json(
      { ok: false, error: auth.error },
      { status: auth.status, headers: noStoreHeaders }
    );
  }

  const { supabaseAdmin } = auth;

  const body = await req.json().catch(() => ({}));
  const id = typeof (body as any)?.id === "string" ? (body as any).id.trim() : "";
  const status = normalizeStatus((body as any)?.status);
  const next = sanitizeNext((body as any)?.next) ?? "/en/bp-simulator";

  if (!id || !status) {
    return NextResponse.json(
      { ok: false, error: "invalid_payload" },
      { status: 400, headers: noStoreHeaders }
    );
  }

  // 1) Update request status (return requester_email for follow-up actions)
  const nowIso = new Date().toISOString();

  const { data: updated, error: updErr } = await supabaseAdmin
    .from("private_profile_access_requests")
    .update({
      status,
      decided_at: nowIso, // ok if column exists; if not, remove this line
      updated_at: nowIso, // ok if column exists; if not, remove this line
    })
    .eq("id", id)
    .select("id, requester_email, request_type, profile_id, status")
    .maybeSingle();

  if (updErr || !updated) {
    return NextResponse.json(
      { ok: false, error: "update_failed" },
      { status: 500, headers: noStoreHeaders }
    );
  }

  const requesterEmail = String(updated.requester_email || "").trim().toLowerCase();

  // 2) On approval: upsert into private_users + send magic link email
  if (status === "approved" && requesterEmail) {
    // ✅ Patch A: persist approval into app-level users table
    const { error: upsertErr } = await supabaseAdmin
      .from("private_users")
      .upsert(
        {
          email: requesterEmail,
          role: "candidate",
          updated_at: nowIso,
          created_at: nowIso,
        },
        { onConflict: "email" }
      );

    if (upsertErr) {
      return NextResponse.json(
        { ok: false, error: "private_users_upsert_failed" },
        { status: 500, headers: noStoreHeaders }
      );
    }

    // ✅ Patch B: send access link automatically (candidate clicks email -> instant access)
    // We reuse your existing email template + token storage in /api/magic-link/request
    try {
      const origin = new URL(req.url).origin;

      await fetch(`${origin}/api/magic-link/request`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: requesterEmail,
          next, // where candidate lands after login
          // optional metadata:
          reason: "approved_access_request",
          requestId: updated.id,
          requestType: updated.request_type,
        }),
      });
    } catch {
      // keep decision robust; email can be retried from admin UI
    }
  }

  return NextResponse.json(
    {
      ok: true,
      data: {
        id: updated.id,
        status: updated.status,
        requester_email: requesterEmail,
        next: status === "approved" ? next : null,
      },
    },
    { status: 200, headers: noStoreHeaders }
  );
}