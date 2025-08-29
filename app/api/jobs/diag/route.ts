export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export async function GET() {
  try {
    const redis = await getRedis();

    // Light ping without fancy options (compat across redis clients)
    const key = "diag:ping";
    await redis.set(key, "pong");      // set value
    // Optional TTL if your client supports it via PEXPIRE/EXPIRE:
    try { await (redis as any).pexpire?.(key, 5000); } catch {}

    let ping = "ok";
    try { ping = (await redis.get(key)) || "ok"; } catch {}

    // Index size (if exists)
    let indexCount = 0;
    try {
      const members = await redis.smembers("jobs:index");
      indexCount = Array.isArray(members) ? members.length : 0;
    } catch {}

    return NextResponse.json({ ok: true, msg: "jobs diag alive", ping, indexCount });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Server error" }, { status: 500 });
  }
}