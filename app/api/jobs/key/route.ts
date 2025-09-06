// app/api/jobs/key/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = url.searchParams.get("k");
  if (!key) return NextResponse.json({ ok: false, error: "Missing ?k=" }, { status: 400 });

  const redis = await getRedis();
  const val = await redis.get(key);
  return NextResponse.json({ ok: true, key, value: val });
}
