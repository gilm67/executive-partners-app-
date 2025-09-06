// app/api/jobs/index-debug/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export const runtime = "nodejs";

export async function GET() {
  const redis = await getRedis();

  // What does smembers see?
  const ids = await redis.smembers("jobs:index");

  // Also peek at the emulated set storage used by the KV fallback
  const rawIndex = await redis.get("jobs:index:__set__");

  // If we have at least one id, fetch its doc to verify hgetall path
  let sample: any = null;
  if (ids && ids.length) {
    sample = await redis.hgetall(ids[0]);
  }

  return NextResponse.json({
    ok: true,
    ids,
    rawIndexJsonArray: rawIndex || null,
    sampleFirstDoc: sample,
  });
}
