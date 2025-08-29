import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");
    if (!slug) {
      return NextResponse.json({ ok: false, error: "Missing slug" }, { status: 400 });
    }

    const redis = getRedis();
    const id = (await redis.get(`slug:${slug}`)) as string | null;
    if (!id) {
      return NextResponse.json({ ok: false, error: "Job not found" }, { status: 404 });
    }

    const job = await redis.hgetall(id);
    return NextResponse.json({ ok: true, job });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
