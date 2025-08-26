import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const redis = await getRedis();
    const ids = await redis.zRange("jobs:index", 0, 50, { REV: true });
    const jobs = await Promise.all(ids.map((id) => redis.hGetAll(id)));
    const cleaned = jobs
      .filter((j) => j && j.active !== "false")
      .map((j) => ({
        id: j.id,
        title: j.title,
        location: j.location,
        summary: j.summary,
        slug: j.slug,
      }));
    return NextResponse.json({ ok: true, jobs: cleaned });
  } catch (e) {
    console.error("jobs/list error:", e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
