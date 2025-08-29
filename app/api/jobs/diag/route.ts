// app/api/jobs/diag/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export async function GET() {
  try {
    const redis = await getRedis();

    // ping (tolerate missing PING on some proxies)
    let ping = "ok";
    try {
      const key = "diag:ping";
      await redis.set(key, "pong", { ex: 5 });
      ping = (await redis.get(key)) || "ok";
    } catch {
      // ignore
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
    // Still no 500
    return NextResponse.json({ ok: true, msg: "diag fallback", detail: err?.message ?? "" });
  }
}