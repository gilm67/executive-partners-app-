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

export async function GET(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const sessionHash = getCookieValue(cookieHeader, "ep_private");

  const hasCookie =
    typeof sessionHash === "string" &&
    sessionHash.length >= 24 &&
    !["null", "undefined"].includes(sessionHash.toLowerCase());

  if (!hasCookie) {
    return NextResponse.json({ ok: false, authenticated: false }, { status: 401, headers: noStoreHeaders });
  }

  const supabaseAdmin = await getSupabaseAdmin();
  const nowIso = new Date().toISOString();

  const { data: session, error } = await supabaseAdmin
    .from("private_sessions")
    .select("id, email, role, expires_at, revoked_at")
    .eq("session_hash", sessionHash)
    .is("revoked_at", null)
    .gt("expires_at", nowIso)
    .maybeSingle();

  if (error || !session) {
    return NextResponse.json({ ok: false, authenticated: false }, { status: 401, headers: noStoreHeaders });
  }

  // best effort (don’t break auth if it fails)
  void supabaseAdmin
    .from("private_sessions")
    .update({ last_seen_at: nowIso })
    .eq("id", session.id);

  return NextResponse.json(
    { ok: true, authenticated: true, user: { email: session.email, role: session.role } },
    { status: 200, headers: noStoreHeaders }
  );
}