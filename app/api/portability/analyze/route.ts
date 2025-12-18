import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const PRIVATE_COOKIE_NAME = "ep_private";

const noStoreHeaders = {
  "Cache-Control": "no-store, max-age=0",
  Pragma: "no-cache",
};

type Status = "pending" | "approved" | "rejected";

function normalizeStatus(input: unknown): Status {
  const s = String(input || "").toLowerCase();
  if (s === "approved") return "approved";
  if (s === "rejected") return "rejected";
  return "pending";
}

export async function POST(req: Request) {
  // 🔒 1) HARD AUTH CHECK (API-SAFE)
  const cookieStore = await cookies();
  const sessionHash = cookieStore.get(PRIVATE_COOKIE_NAME)?.value;

  if (!sessionHash) {
    return NextResponse.json(
      { ok: false, error: "no_session" },
      { status: 401, headers: noStoreHeaders }
    );
  }

  const supabaseAdmin = await getSupabaseAdmin();
  const nowIso = new Date().toISOString();

  const { data: session } = await supabaseAdmin
    .from("private_sessions")
    .select("email, expires_at, revoked_at")
    .eq("session_hash", sessionHash)
    .is("revoked_at", null)
    .gt("expires_at", nowIso)
    .maybeSingle();

  if (!session) {
    return NextResponse.json(
      { ok: false, error: "invalid_session" },
      { status: 401, headers: noStoreHeaders }
    );
  }

  // 🔒 2) APPROVAL CHECK
  const { data } = await supabaseAdmin
    .from("private_profile_access_requests")
    .select("id,status")
    .eq("requester_email", session.email)
    .eq("request_type", "portability")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const status = normalizeStatus(data?.status);

  if (status !== "approved") {
    return NextResponse.json(
      {
        ok: false,
        error: "access_required",
        status,
        requestId: data?.id ?? null,
      },
      { status: 403, headers: noStoreHeaders }
    );
  }

  // ✅ 3) BUSINESS LOGIC
  const score = 72;
  const benchmark = { median: 65, topQuartile: 80 };

  return NextResponse.json(
    { ok: true, score, benchmark },
    { status: 200, headers: noStoreHeaders }
  );
}