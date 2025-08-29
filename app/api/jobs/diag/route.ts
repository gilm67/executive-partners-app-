// app/api/jobs/diag/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export async function GET() {
  try {
    const redis = await getRedis();

    // simple ping via set/get (works across redis variants)
    let ping = "ok";
    try {
      const key = "diag:ping";
      await redis.set(key, "pong"); // 2-arg version for broad compat
      ping = (await redis.get(key)) || "ok";
      // best-effort TTL
      try {
        await (redis as any).expire?.(key, 5);
      } catch {}
    } catch {
      /* ignore */
    }

    let indexCount = 0;
    try {
      const members = await redis.smembers("jobs:index");
      indexCount = Array.isArray(members) ? members.length : 0;
    } catch {}

    return NextResponse.json({ ok: true, msg: "jobs diag alive", ping, indexCount });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}