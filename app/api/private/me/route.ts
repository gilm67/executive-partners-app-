// app/api/private/me/route.ts
import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const noStoreHeaders = {
  "Cache-Control": "no-store, max-age=0",
  Pragma: "no-cache",
};

function getCookieValue(cookieHeader: string, name: string): string | null {
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  if (!match) return null;
  const raw = match[1] ?? "";
  const val = decodeURIComponent(raw).trim();
  return val || null;
}

type ReqType = "bp" | "portability" | "profile";
type ReqStatus = "none" | "pending" | "approved" | "rejected";

type LatestReq = {
  id: string;
  request_type: ReqType | string;
  profile_id: string | null;
  status: string | null;
  created_at: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
};

function normalizeStatus(s: any): Exclude<ReqStatus, "none"> {
  if (s === "approved") return "approved";
  if (s === "rejected") return "rejected";
  return "pending";
}

export async function GET(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const sessionHash = getCookieValue(cookieHeader, "ep_private");

  const hasCookie =
    typeof sessionHash === "string" &&
    sessionHash.length >= 24 &&
    !["null", "undefined"].includes(sessionHash.toLowerCase());

  if (!hasCookie) {
    return NextResponse.json(
      { ok: false, authenticated: false },
      { status: 401, headers: noStoreHeaders }
    );
  }

  const supabaseAdmin = await getSupabaseAdmin();
  const nowIso = new Date().toISOString();

  // 1) Validate session
  const { data: session, error } = await supabaseAdmin
    .from("private_sessions")
    .select("id, email, role, expires_at, revoked_at")
    .eq("session_hash", sessionHash)
    .is("revoked_at", null)
    .gt("expires_at", nowIso)
    .maybeSingle();

  if (error || !session) {
    return NextResponse.json(
      { ok: false, authenticated: false },
      { status: 401, headers: noStoreHeaders }
    );
  }

  // Best effort (don’t break auth if it fails)
  void supabaseAdmin
    .from("private_sessions")
    .update({ last_seen_at: nowIso })
    .eq("id", session.id);

  const email = String(session.email || "").trim().toLowerCase();

  // 2) ✅ Source-of-truth role from private_users (fixes "admin stuck as candidate")
  let role = String(session.role || "candidate");
  try {
    const { data: u } = await supabaseAdmin
      .from("private_users")
      .select("role")
      .eq("email", email)
      .maybeSingle();

    if (u?.role) role = String(u.role);
  } catch {
    // ignore (never block /me)
  }

  // 3) ✅ LIVE access status per tool (default = "none")
  let access: Record<
    ReqType,
    {
      status: ReqStatus;
      requestId: string | null;
      reviewedAt?: string | null;
      reviewedBy?: string | null;
    }
  > = {
    bp: { status: "none", requestId: null },
    portability: { status: "none", requestId: null },
    profile: { status: "none", requestId: null },
  };

  try {
    const { data: reqs } = await supabaseAdmin
      .from("private_profile_access_requests")
      .select("id,request_type,profile_id,status,created_at,reviewed_at,reviewed_by")
      .eq("requester_email", email)
      .order("created_at", { ascending: false })
      .limit(50);

    const latestByType: Record<string, LatestReq | undefined> = {};
    for (const r of (reqs ?? []) as LatestReq[]) {
      const t = String(r.request_type || "").toLowerCase();
      if (t !== "bp" && t !== "portability" && t !== "profile") continue;
      if (!latestByType[t]) latestByType[t] = r; // first seen is latest (desc order)
    }

    const bpRow = latestByType["bp"];
    const portRow = latestByType["portability"];
    const profRow = latestByType["profile"];

    access = {
      bp: bpRow
        ? {
            status: normalizeStatus(bpRow.status),
            requestId: bpRow.id,
            reviewedAt: bpRow.reviewed_at,
            reviewedBy: bpRow.reviewed_by,
          }
        : { status: "none", requestId: null },

      portability: portRow
        ? {
            status: normalizeStatus(portRow.status),
            requestId: portRow.id,
            reviewedAt: portRow.reviewed_at,
            reviewedBy: portRow.reviewed_by,
          }
        : { status: "none", requestId: null },

      profile: profRow
        ? {
            status: normalizeStatus(profRow.status),
            requestId: profRow.id,
            reviewedAt: profRow.reviewed_at,
            reviewedBy: profRow.reviewed_by,
          }
        : { status: "none", requestId: null },
    };
  } catch {
    // ignore: don't block /me
  }

  return NextResponse.json(
    {
      ok: true,
      authenticated: true,
      user: { email: session.email, role }, // ✅ role from private_users
      access,
      toolAccess: {
        bpApproved: access.bp.status === "approved",
        portabilityApproved: access.portability.status === "approved",
      },
    },
    { status: 200, headers: noStoreHeaders }
  );
}