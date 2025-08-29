// app/api/jobs/diag/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export async function GET() {
  try {
    const redis = await getRedis();

    // ping with TTL (no 3rd-arg SET options, no expire())
    let ping = "ok";
    try {
      const key = "diag:ping";
      await redis.setex(key, 5, "pong");   // <- set value and TTL in one call
      ping = (await redis.get(key)) || "ok";
    } catch {
      /* ignore */
    }

    // index size
    let indexCount = 0;
    try {
      const members = await redis.smembers("jobs:index");
      indexCount = Array.isArray(members) ? members.length : 0;
    } catch {
      indexCount = 0;
    }

    return NextResponse.json({ ok: true, msg: "jobs diag alive", ping, indexCount });
  } catch (err: any) {
    return NextResponse.json({ ok: true, msg: "diag fallback", detail: err?.message ?? "" });
  }
}