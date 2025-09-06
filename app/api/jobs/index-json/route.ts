// app/api/jobs/index-json/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export const runtime = "nodejs";

export async function GET() {
  const redis = await getRedis();
  const raw = await redis.get("jobs:index:__set__");
  let parsed: string[] = [];
  try { if (raw) parsed = JSON.parse(raw) as string[]; } catch {}
  return NextResponse.json({
    ok: true,
    jsonIndexExists: Boolean(raw),
    raw: raw ?? null,
    parsed,
    count: parsed.length,
  });
}
