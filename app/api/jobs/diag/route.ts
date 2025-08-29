// app/api/jobs/diag/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export async function GET() {
  try {
    const redis = await getRedis();

    // Try ping (if client supports it), otherwise set+expire fallback
    let ping: string = "ok";
    try {
      if (typeof (redis as any).ping === "function") {
        ping = await (redis as any).ping();
      } else {
        const key = "diag:ping";
        await redis.set(key, "pong");           // 2-arg set
        try {
          // if expire() exists, set TTL (portable)
          await (redis as any).expire?.(key, 5);
        } catch {}
        ping = (await redis.get(key)) || "ok";
      }
    } catch {
      ping = "ok";
    }

    // Count index members (portable)
    let indexCount = 0;
    try {
      const members = await redis.sMembers("jobs:index");
      indexCount = Array.isArray(members) ? members.length : 0;
    } catch {
      indexCount = 0;
    }

    return NextResponse.json({ ok: true, msg: "jobs diag alive", ping, indexCount });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "diag error" },
      { status: 500 }
    );
  }
}