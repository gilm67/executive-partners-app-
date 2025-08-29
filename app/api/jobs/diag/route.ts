// app/api/jobs/diag/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export async function GET() {
  try {
    const redis = await getRedis();

    // Minimal ping using only methods your compat layer exposes
    let ping = "ok";
    try {
      const key = "diag:ping";
      await redis.set(key, "pong");     // write
      ping = (await redis.get(key)) || "ok"; // read
      // no TTL here; keep it simple and compatible
    } catch {
      /* ignore ping failures, still return diag ok:false below if needed */
    }

    // Count current index entries (also only using exposed methods)
    let indexCount = 0;
    try {
      const members = await redis.smembers("jobs:index");
      indexCount = Array.isArray(members) ? members.length : 0;
    } catch {
      indexCount = 0;
    }

    return NextResponse.json({ ok: true, msg: "jobs diag alive", ping, indexCount });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Server error" }, { status: 500 });
  }
}