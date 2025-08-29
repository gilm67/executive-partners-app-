import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export async function GET() {
  try {
    const redis = getRedis();
    const ids = await redis.smembers("jobs:index");

    const jobs = await Promise.all(
      ids.map(async (id) => {
        return await redis.hgetall(id);
      })
    );

    return NextResponse.json({ ok: true, jobs });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
