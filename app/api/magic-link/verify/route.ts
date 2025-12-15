import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase-server";

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

async function audit(req: Request, action: string, email?: string, meta?: any) {
  try {
    const { ip, user_agent } = getClientMeta(req);
    await supabaseAdmin.from("private_audit_log").insert({
      action,
      email: email ?? null,
      ip,
      user_agent,
      meta: meta ?? null,
    });
  } catch {
    // ignore on purpose (keeps auth flow robust)
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const token = typeof body?.token === "string" ? body.token : "";

    if (!token) {
      await audit(req, "magic_link_verify_failed", undefined, {
        reason: "missing_token",
      });
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
      await audit(req, "magic_link_verify_failed", undefined, {
        reason: "not_found",
      });
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const expired = new Date(data.expires_at).getTime() < Date.now();
    const used = !!data.used_at;

    if (expired || used) {
      await audit(req, "magic_link_verify_failed", data.email, {
        reason: expired ? "expired" : "used",
      });
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    // 2) ATOMIC single-use: mark as used only if still unused
    const nowIso = new Date().toISOString();
    const { data: usedRow, error: useErr } = await supabaseAdmin
      .from("magic_links")
      .update({ used_at: nowIso })
      .eq("id", data.id)
      .is("used_at", null)
      .select("id")
      .maybeSingle();

    if (useErr || !usedRow) {
      await audit(req, "magic_link_verify_failed", data.email, {
        reason: useErr ? "use_update_error" : "already_used_race",
      });
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    // 3) Create session (DB + cookie)
    const sessionRaw = crypto.randomBytes(32).toString("hex");
    const sessionHash = sha256(sessionRaw);

    const { ip, user_agent } = getClientMeta(req);

    const expiresAtIso = new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toISOString();

    const role = "candidate";
    const email = String(data.email || "").trim().toLowerCase();

    // ✅ Revoke any previous active sessions for this email
    const { error: revokeErr } = await supabaseAdmin
      .from("private_sessions")
      .update({ revoked_at: nowIso })
      .eq("email", email)
      .is("revoked_at", null);

    if (revokeErr) {
      await audit(req, "magic_link_verify_revoke_failed", email, {
        reason: "revoke_update_error",
      });
    }

    // ✅ Insert new session
    const { error: sessErr } = await supabaseAdmin
      .from("private_sessions")
      .insert({
        session_hash: sessionHash,
        email,
        role,
        expires_at: expiresAtIso,
        revoked_at: null,
        last_seen_at: nowIso,
        ip,
        user_agent,
        meta: { via: "magic_link" },
      });

    if (sessErr) {
      await audit(req, "magic_link_verify_failed", email, {
        reason: "session_insert_failed",
      });
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    // 4) ✅ Set cookie (share across execpartners.ch + www.execpartners.ch)
    const res = NextResponse.json({ ok: true }, { status: 200 });

    const isProd = process.env.NODE_ENV === "production";

    res.cookies.set("ep_private", sessionHash, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      domain: isProd ? ".execpartners.ch" : undefined, // ✅ explicit
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    await audit(req, "magic_link_verify_ok", email, {
      session: "issued",
      role,
      expires_days: 7,
    });

    return res;
  } catch {
    await audit(req, "magic_link_verify_failed", undefined, {
      reason: "exception",
    });
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}