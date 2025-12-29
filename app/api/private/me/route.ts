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

type AccessShape = Record<
  ReqType,
  {
    status: ReqStatus;
    requestId: string | null;
    reviewedAt?: string | null;
    reviewedBy?: string | null;
  }
>;

function normalizeStatus(s: any): ReqStatus {
  const v = String(s || "").toLowerCase();
  if (v === "approved") return "approved";
  if (v === "rejected") return "rejected";
  if (v === "pending") return "pending";
  return "none";
}

function emptyMe() {
  const access: AccessShape = {
    bp: { status: "none", requestId: null },
    portability: { status: "none", requestId: null },
    profile: { status: "none", requestId: null },
  };
  return {
    ok: false,
    authenticated: false,
    user: null as any,
    access,
    toolAccess: {
      bpApproved: false,
      portabilityApproved: false,
    },
  };
}

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const sessionHash = getCookieValue(cookieHeader, "ep_private");

    const hasCookie =
      typeof sessionHash === "string" &&
      sessionHash.length >= 24 &&
      !["null", "undefined"].includes(sessionHash.toLowerCase());

    // ✅ Always 200 + stable JSON shape
    if (!hasCookie) {
      return NextResponse.json(emptyMe(), { status: 200, headers: noStoreHeaders });
    }

    const supabaseAdmin = await getSupabaseAdmin();
    const nowIso = new Date().toISOString();

    // 1) Validate session (session_hash column)
    const { data: session, error: sessErr } = await supabaseAdmin
      .from("private_sessions")
      .select("id, email, role, expires_at, revoked_at")
      .eq("session_hash", sessionHash)
      .is("revoked_at", null)
      .gt("expires_at", nowIso)
      .maybeSingle();

    if (sessErr || !session?.email) {
      return NextResponse.json(emptyMe(), { status: 200, headers: noStoreHeaders });
    }

    // Best effort last_seen update (never block /me)
    void supabaseAdmin
      .from("private_sessions")
      .update({ last_seen_at: nowIso })
      .eq("id", session.id);

    const email = String(session.email).trim().toLowerCase();

    // 2) Role source of truth: private_users
    let role = String(session.role || "candidate");
    try {
      const { data: u } = await supabaseAdmin
        .from("private_users")
        .select("role")
        .eq("email", email)
        .maybeSingle();
      if (u?.role) role = String(u.role);
    } catch {
      // ignore
    }

    // 3) Access requests source of truth: access_requests (your actual table)
    const access: AccessShape = {
      bp: { status: "none", requestId: null },
      portability: { status: "none", requestId: null },
      profile: { status: "none", requestId: null },
    };

    try {
      const { data: reqs } = await supabaseAdmin
        .from("access_requests")
        .select("id, request_type, status, created_at, reviewed_at, reviewed_by")
        .eq("email", email)
        .order("created_at", { ascending: false })
        .limit(100);

      // pick latest row per request_type
      const latest: Record<string, any> = {};
      for (const r of reqs ?? []) {
        const t = String(r.request_type || "").toLowerCase();
        if (!["bp", "portability", "profile"].includes(t)) continue;
        if (!latest[t]) latest[t] = r;
      }

      for (const t of ["bp", "portability", "profile"] as ReqType[]) {
        const row = latest[t];
        if (!row) continue;
        access[t] = {
          status: normalizeStatus(row.status),
          requestId: row.id ?? null,
          reviewedAt: row.reviewed_at ?? null,
          reviewedBy: row.reviewed_by ?? null,
        };
      }
    } catch {
      // ignore (never block /me)
    }

    return NextResponse.json(
      {
        ok: true,
        authenticated: true,
        user: { email: session.email, role },
        access,
        toolAccess: {
          bpApproved: access.bp.status === "approved",
          portabilityApproved: access.portability.status === "approved",
        },
      },
      { status: 200, headers: noStoreHeaders }
    );
  } catch (e) {
    console.error("[/api/private/me] fatal:", e);
    return NextResponse.json(emptyMe(), { status: 200, headers: noStoreHeaders });
  }
}