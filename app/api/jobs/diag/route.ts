// app/api/jobs/diag/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export async function GET() {
  try {
    const redis = await getRedis();

    // Try native ping if available; otherwise fall back to set + expire
    let ping = "ok";
    try {
      if (typeof (redis as any).ping === "function") {
        ping = await (redis as any).ping();
      } else {
        const key = "diag:ping";
        await redis.set(key, "pong");         // 2-arg set
        try {
          await (redis as any).expire?.(key, 5);
        } catch {}
        ping = (await redis.get(key)) || "ok";
      }
    } catch {
      ping = "ok";
    }

    // Count jobs in the index (lowercase smembers)
    let indexCount = 0;
    try {
      const members = await (redis as any).smembers("jobs:index");
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