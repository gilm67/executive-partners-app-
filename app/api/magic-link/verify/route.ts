// app/api/magic-link/verify/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase-server";

function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function getClientMeta(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    null;

  const user_agent = req.headers.get("user-agent") ?? null;

  return { ip, user_agent };
}

/**
 * ✅ SAFE INTERNAL REDIRECTS ONLY (must match request route allow-list)
 * Also normalize common aliases so "next=/private/bp-simulator" works.
 */
function sanitizeNext(nextRaw: unknown): string | null {
  if (typeof nextRaw !== "string") return null;

  let next = nextRaw.trim();
  if (!next) return null;

  // internal-only
  if (!next.startsWith("/")) return null;
  if (next.startsWith("//")) return null;
  if (next.includes("://")) return null;

  // normalize common variants (mirror request route)
  if (next === "/portability") next = "/en/portability";
  if (next === "/bp-simulator") next = "/en/bp-simulator";
  if (next === "/en/portability/") next = "/en/portability";
  if (next === "/en/bp-simulator/") next = "/en/bp-simulator";
  if (next === "/private/") next = "/private";

  const ALLOWED_PREFIXES = ["/private", "/en/portability", "/en/bp-simulator"];
  if (!ALLOWED_PREFIXES.some((p) => next.startsWith(p))) return null;

  return next;
}

async function audit(
  req: Request,
  action: string,
  email?: string,
  meta?: any,
  supabaseAdmin?: any
) {
  try {
    const admin = supabaseAdmin ?? (await getSupabaseAdmin());
    const { ip, user_agent } = getClientMeta(req);

    await admin.from("private_audit_log").insert({
      action,
      email: email ?? null,
      ip,
      user_agent,
      meta: meta ?? null,
    });
  } catch {
    // keep auth flow robust
  }
}

export async function POST(req: Request) {
  try {
    const supabaseAdmin = await getSupabaseAdmin();

    const body = await req.json().catch(() => ({}));
    const token = typeof body?.token === "string" ? body.token : "";
    const next = sanitizeNext(body?.next);

    if (!token) {
      await audit(
        req,
        "magic_link_verify_failed",
        undefined,
        { reason: "missing_token" },
        supabaseAdmin
      );
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const tokenHash = sha256(token);

    // 1) Fetch magic link row
    const { data, error } = await supabaseAdmin
      .from("magic_links")
      .select("id,email,expires_at,used_at")
      .eq("token_hash", tokenHash)
      .maybeSingle();

    if (error || !data) {
      await audit(
        req,
        "magic_link_verify_failed",
        undefined,
        { reason: "not_found" },
        supabaseAdmin
      );
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const expired = new Date(data.expires_at).getTime() < Date.now();
    const used = !!data.used_at;

    if (expired || used) {
      await audit(
        req,
        "magic_link_verify_failed",
        data.email,
        { reason: expired ? "expired" : "used" },
        supabaseAdmin
      );
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    // 2) ATOMIC single-use
    const nowIso = new Date().toISOString();
    const { data: usedRow, error: useErr } = await supabaseAdmin
      .from("magic_links")
      .update({ used_at: nowIso })
      .eq("id", data.id)
      .is("used_at", null)
      .select("id")
      .maybeSingle();

    if (useErr || !usedRow) {
      await audit(
        req,
        "magic_link_verify_failed",
        data.email,
        { reason: useErr ? "use_update_error" : "already_used_race" },
        supabaseAdmin
      );
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    // Normalize email once
    const email = String(data.email || "").trim().toLowerCase();
    if (!email) {
      await audit(
        req,
        "magic_link_verify_failed",
        undefined,
        { reason: "bad_email" },
        supabaseAdmin
      );
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    // Ensure private_users exists (do NOT overwrite role)
    let role = "candidate";

    const { data: existingUser, error: existingErr } = await supabaseAdmin
      .from("private_users")
      .select("email, role, created_at")
      .eq("email", email)
      .maybeSingle();

    if (!existingErr && existingUser?.role) {
      role = String(existingUser.role);
    }

    const upsertPayload: any = {
      email,
      role: role || "candidate",
      updated_at: nowIso,
    };
    if (!existingUser?.created_at) upsertPayload.created_at = nowIso;

    const { error: upsertErr } = await supabaseAdmin
      .from("private_users")
      .upsert(upsertPayload, { onConflict: "email" });

    if (upsertErr) {
      await audit(
        req,
        "magic_link_verify_user_upsert_failed",
        email,
        {
          reason: "private_users_upsert_failed",
          detail: String((upsertErr as any)?.message || upsertErr),
        },
        supabaseAdmin
      );
      // continue
    }

    // AUTO-GRANT: BP + Portability on login
    try {
      const toolTypes = ["bp", "portability"] as const;

      for (const t of toolTypes) {
        const { data: alreadyApproved } = await supabaseAdmin
          .from("private_profile_access_requests")
          .select("id")
          .eq("requester_email", email)
          .eq("request_type", t)
          .eq("status", "approved")
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (alreadyApproved?.id) continue;

        await supabaseAdmin.from("private_profile_access_requests").insert({
          request_type: t,
          profile_id: null,
          requester_email: email,
          requester_org: null,
          message: null,
          status: "approved",
          reviewed_at: nowIso,
          reviewed_by: "auto",
        });
      }
    } catch (e) {
      await audit(
        req,
        "tool_auto_grant_failed",
        email,
        { error: String((e as any)?.message || e) },
        supabaseAdmin
      );
    }

    // 3) Create session (DB + cookie)
    const sessionRaw = crypto.randomBytes(32).toString("hex");
    const sessionHash = sha256(sessionRaw);

    const { ip, user_agent } = getClientMeta(req);
    const expiresAtIso = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toISOString();

    // Revoke previous active sessions for this email
    const { error: revokeErr } = await supabaseAdmin
      .from("private_sessions")
      .update({ revoked_at: nowIso })
      .eq("email", email)
      .is("revoked_at", null);

    if (revokeErr) {
      await audit(
        req,
        "magic_link_verify_revoke_failed",
        email,
        { reason: "revoke_update_error" },
        supabaseAdmin
      );
    }

    // Insert new session
    const { error: sessErr } = await supabaseAdmin.from("private_sessions").insert({
      session_hash: sessionHash,
      email,
      role: role || "candidate",
      expires_at: expiresAtIso,
      revoked_at: null,
      last_seen_at: nowIso,
      ip,
      user_agent,
      meta: { via: "magic_link" },
    });

    if (sessErr) {
      await audit(
        req,
        "magic_link_verify_failed",
        email,
        { reason: "session_insert_failed" },
        supabaseAdmin
      );
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    // 4) ✅ Set cookie so /en/* can read it + works on www + apex
    const isProd = process.env.NODE_ENV === "production";

    const res = NextResponse.json(
      { ok: true, next: next ?? null, role: role || "candidate" },
      { status: 200 }
    );

    res.cookies.set({
      name: "ep_private",
      value: sessionHash,
      httpOnly: true,
      // Vercel production is always HTTPS; keep secure on in prod.
      secure: isProd ? true : false,
      sameSite: "lax",
      // ✅ CRITICAL: must be "/" or /en/bp-simulator won't see it
      path: "/",
      // ✅ Share across execpartners.ch + www.execpartners.ch
      ...(isProd ? { domain: ".execpartners.ch" } : {}),
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    await audit(
      req,
      "magic_link_verify_ok",
      email,
      { session: "issued", role: role || "candidate", expires_days: 7, next: next ?? null },
      supabaseAdmin
    );

    return res;
  } catch {
    await audit(req, "magic_link_verify_failed", undefined, { reason: "exception" });
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}