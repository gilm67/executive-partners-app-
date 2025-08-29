// app/api/jobs/get/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const idParam = url.searchParams.get("id");
    const slugParam = url.searchParams.get("slug");

    if (!idParam && !slugParam) {
      return NextResponse.json(
        { ok: false, error: "id or slug is required" },
        { status: 400 }
      );
    }

    const redis = await getRedis();

    let id = idParam || "";
    if (!id && slugParam) {
      // Fast path: direct slug index
      let resolved: string | null = null;
      try {
        resolved = await redis.get(`jobs:by-slug:${slugParam}`);
      } catch {}
      // Slow path: scan for any job whose hash has this slug
      if (!resolved) {
        let cursor = "0";
        do {
          const [next, keys] = (await redis.scan(cursor, {
            match: "job:*",
            count: 200,
          })) as unknown as [string, string[]];
          cursor = next || "0";
          for (const k of keys || []) {
            try {
              const h = (await redis.hgetall(k)) as Record<string, string> | null;
              if (h?.slug === slugParam) {
                resolved = k;
                break;
              }
            } catch {}
          }
          if (resolved) break;
        } while (cursor !== "0");
      }
      if (!resolved) {
        return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
      }
      id = resolved;
    }

    const h = (await redis.hgetall(id)) as Record<string, string> | null;
    if (!h || !h.slug || !h.title) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      job: {
        id,
        ...h,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}