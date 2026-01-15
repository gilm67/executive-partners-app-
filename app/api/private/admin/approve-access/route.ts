// app/api/private/admin/approve-access/route.ts
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Simple admin key to protect the endpoint (set in Vercel env)
const ADMIN_KEY = (process.env.PRIVATE_ADMIN_KEY || "").trim();

// ✅ Must match where you insert requests
const TABLE = "private_profile_access_requests_v2";

function unauthorized() {
  return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
}

function badRequest(msg = "BAD_REQUEST") {
  return NextResponse.json({ ok: false, error: msg }, { status: 400 });
}

function clean(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

function cleanLower(v: unknown) {
  return typeof v === "string" ? v.trim().toLowerCase() : "";
}

/**
 * ✅ Core approve logic shared by GET/POST
 */
async function approve(params: {
  key: string;
  requester_email: string;
  request_type: "portability" | "bp" | "profile";
  profile_id?: string | null; // required only when request_type="profile"
  requester_org?: string | null;
  reviewed_by?: string | null;
}) {
  const { key, requester_email, request_type } = params;

  if (!ADMIN_KEY || key !== ADMIN_KEY) return unauthorized();
  if (!requester_email || !request_type) return badRequest("MISSING_FIELDS");

  if (request_type === "profile") {
    const profile_id = clean(params.profile_id);
    if (!profile_id) return badRequest("PROFILE_ID_REQUIRED");
  }

  const supabase = await getSupabaseAdmin();

  // For portability/bp, DB expects profile_id = null (your constraint)
  const match: any = {
    request_type,
    requester_email,
    profile_id: request_type === "profile" ? clean(params.profile_id) : null,
  };

  // ✅ First try UPDATE (normal case: row already exists from /api/access-request)
  const nowIso = new Date().toISOString();
  const reviewed_by = params.reviewed_by || "admin";

  const { data: updated, error: updErr } = await supabase
    .from(TABLE)
    .update({
      status: "approved",
      reviewed_at: nowIso,
      reviewed_by,
    })
    .match(match)
    .select("id,status,request_type,profile_id,requester_email,reviewed_at,reviewed_by")
    .limit(1);

  if (updErr) {
    console.error("[approve-access] update error:", updErr);
    return NextResponse.json({ ok: false, error: "UPDATE_FAILED" }, { status: 500 });
  }

  if (updated && updated.length > 0) {
    return NextResponse.json(
      { ok: true, action: "updated_approved", approved: updated[0] },
      { status: 200 }
    );
  }

  // ✅ If no row existed yet, INSERT an approved row (failsafe)
  const insertRow: any = {
    request_type,
    profile_id: request_type === "profile" ? clean(params.profile_id) : null,
    requester_email,
    requester_org: params.requester_org || null,
    status: "approved",
    reviewed_at: nowIso,
    reviewed_by,
  };

  const { data: inserted, error: insErr } = await supabase
    .from(TABLE)
    .insert(insertRow)
    .select("id,status,request_type,profile_id,requester_email,reviewed_at,reviewed_by")
    .limit(1);

  if (insErr) {
    console.error("[approve-access] insert error:", insErr);
    return NextResponse.json({ ok: false, error: "INSERT_FAILED" }, { status: 500 });
  }

  return NextResponse.json(
    { ok: true, action: "inserted_approved", approved: inserted?.[0] || null },
    { status: 200 }
  );
}

/**
 * ✅ GET (optional) — allows one-click approval link:
 * /api/private/admin/approve-access?key=...&type=portability&email=...
 * For profile-type approvals:
 * /api/private/admin/approve-access?key=...&type=profile&email=...&profile_id=<uuid>
 */
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const key = clean(url.searchParams.get("key"));
    const email = cleanLower(url.searchParams.get("email"));
    const type = cleanLower(url.searchParams.get("type")) as
      | "portability"
      | "bp"
      | "profile";

    const profile_id = clean(url.searchParams.get("profile_id"));
    const org = clean(url.searchParams.get("org"));

    if (!key || !email || !type) return badRequest("MISSING_QUERY");

    return approve({
      key,
      requester_email: email,
      request_type: type,
      profile_id: profile_id || null,
      requester_org: org || null,
    });
  } catch (e: any) {
    console.error("[approve-access] GET unexpected:", e?.message || e);
    return NextResponse.json({ ok: false, error: "INTERNAL_ERROR" }, { status: 500 });
  }
}

/**
 * ✅ POST — recommended for curl / admin tooling
 * Body:
 * {
 *   "request_type": "portability",
 *   "requester_email": "verify+portability@test.com",
 *   "profile_id": "..." // only for request_type="profile"
 * }
 * Header:
 * x-admin-key: <PRIVATE_ADMIN_KEY>
 */
export async function POST(req: Request) {
  try {
    const key = clean(req.headers.get("x-admin-key"));

    const body = await req.json().catch(() => ({}));
    const request_type = cleanLower(body?.request_type) as "portability" | "bp" | "profile";
    const requester_email = cleanLower(body?.requester_email);
    const profile_id = clean(body?.profile_id);
    const requester_org = clean(body?.requester_org);

    if (!key || !request_type || !requester_email) return badRequest("MISSING_FIELDS");

    return approve({
      key,
      requester_email,
      request_type,
      profile_id: profile_id || null,
      requester_org: requester_org || null,
    });
  } catch (e: any) {
    console.error("[approve-access] POST unexpected:", e?.message || e);
    return NextResponse.json({ ok: false, error: "INTERNAL_ERROR" }, { status: 500 });
  }
}