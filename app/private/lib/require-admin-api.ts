// app/private/lib/require-admin-api.ts
import { cookies } from "next/headers";
import { getSupabaseAdmin } from "@/lib/supabase-server";

const PRIVATE_COOKIE_NAME = "ep_private" as const;

function parseCookieHeader(cookieHeader: string | null) {
  const out: Record<string, string> = {};
  if (!cookieHeader) return out;

  // Split on ; but keep "=" in values (session hashes won't, but safe)
  for (const part of cookieHeader.split(";")) {
    const p = part.trim();
    if (!p) continue;

    const eqIdx = p.indexOf("=");
    if (eqIdx === -1) continue;

    const key = p.slice(0, eqIdx).trim();
    const val = p.slice(eqIdx + 1).trim();

    if (!key) continue;

    // decodeURIComponent can throw on malformed input; guard it.
    try {
      out[key] = decodeURIComponent(val);
    } catch {
      out[key] = val;
    }
  }

  return out;
}

function getSessionHashFromReq(req?: Request) {
  if (!req) return null;
  const cookieHeader = req.headers.get("cookie");
  const parsed = parseCookieHeader(cookieHeader);
  return parsed[PRIVATE_COOKIE_NAME] ?? null;
}

async function getSessionHashFromNextCookies() {
  // Next.js 15+: cookies() may be async depending on context
  const cookieStore = await cookies();
  return cookieStore.get(PRIVATE_COOKIE_NAME)?.value ?? null;
}

export async function requireAdminApi(req?: Request) {
  // 1) Read cookie either from Request (Route Handlers / fetch / curl)
  //    OR from Next cookies() (Server Components)
  const sessionHash = getSessionHashFromReq(req) ?? (await getSessionHashFromNextCookies());

  const debug = process.env.DEBUG_ADMIN_AUTH === "1";
  if (debug) {
    const hasReq = Boolean(req);
    const hasCookieHeader = Boolean(req?.headers.get("cookie"));
    // eslint-disable-next-line no-console
    console.log("[requireAdminApi]", {
      hasReq,
      hasCookieHeader,
      hasSessionHash: Boolean(sessionHash),
    });
  }

  if (!sessionHash) {
    return { ok: false as const, status: 401, error: "no_session" as const };
  }

  // 2) Validate session in DB
  const supabaseAdmin = await getSupabaseAdmin();
  const nowIso = new Date().toISOString();

  const { data: session, error } = await supabaseAdmin
    .from("private_sessions")
    .select("email, role, expires_at, revoked_at")
    .eq("session_hash", sessionHash)
    .is("revoked_at", null)
    .gt("expires_at", nowIso)
    .maybeSingle();

  if (debug) {
    // eslint-disable-next-line no-console
    console.log("[requireAdminApi] session lookup", {
      ok: Boolean(session) && !error,
      error: error ? String((error as any).message ?? error) : null,
      role: session?.role ?? null,
      expires_at: session?.expires_at ?? null,
    });
  }

  if (error || !session) {
    return { ok: false as const, status: 401, error: "invalid_session" as const };
  }

  // 3) Role gate
  if (session.role !== "admin") {
    return { ok: false as const, status: 403, error: "not_admin" as const };
  }

  // 4) Success
  return { ok: true as const, adminEmail: session.email, supabaseAdmin };
}