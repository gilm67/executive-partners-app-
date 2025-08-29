export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    let id = searchParams.get("id");
    const slug = searchParams.get("slug");

    const redis = await getRedis();

    if (!id) {
      if (!slug) {
        return NextResponse.json(
          { ok: false, error: "Missing id or slug" },
          { status: 400 }
        );
      }
      // resolve slug -> id
      let resolved: unknown = null;
      try {
        resolved = await redis.get(`jobs:by-slug:${slug}`);
      } catch {}
      if (typeof resolved !== "string" || !resolved) {
        return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
      }
      id = resolved; // definitely a string
    }

    // Read job hash
    let h: Record<string, string> | null = null;
    try {
      h = await redis.hgetall(id);
    } catch {}
    if (!h || !h.slug || !h.title) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    const job = {
      id,
      ...h,
    };

    return NextResponse.json({ ok: true, job });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Server error" }, { status: 500 });
  }
}