// app/api/jobs/reindex/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";
import { assertAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, x-admin-token, authorization",
      "Cache-Control": "no-store",
    },
  });
}

export async function POST(req: Request) {
  try {
    const auth = await assertAdmin(req);
    if (!auth.ok) return json({ ok: false, error: auth.message }, auth.status);

    const redis = await getRedis();

    const toAdd = new Set<string>();

    // Collect all job hashes (two common patterns: "job:*" and "jobs:*" numeric ids)
    // @ts-ignore Upstash supports scanIterator
    for await (const k of redis.scanIterator({ match: "job:*" }) as AsyncIterable<string>) {
      // We only want hashes that actually contain a job (have a title/slug)
      toAdd.add(String(k));
    }
    // Some projects stored as "jobs:<number>"
    // @ts-ignore
    for await (const k of redis.scanIterator({ match: "jobs:[0-9]*" }) as AsyncIterable<string>) {
      toAdd.add(String(k));
    }
    // Resolve slug pointers
    // @ts-ignore
    for await (const k of redis.scanIterator({ match: "jobs:by-slug:*" }) as AsyncIterable<string>) {
      const id = await redis.get(k);
      if (id) toAdd.add(String(id));
    }

    let added = 0;
    if (toAdd.size) {
      const ids = Array.from(toAdd);
      // add only those that are real job hashes (heuristic: they have "title" and "slug")
      const verified: string[] = [];
      for (const id of ids) {
        const h = await redis.hGetAll(id);
        if (h && h.title && h.slug) verified.push(id);
      }
      if (verified.length) {
        try {
          // @ts-ignore
          const n = await redis.sAdd("jobs:index", ...verified);
          added = Number(n) || 0;
        } catch (e) {
          console.error("reindex sAdd error:", e);
        }
      }
    }

    const total = await redis.sCard("jobs:index");
    return json({ ok: true, added, total, scanned: toAdd.size });
  } catch (err) {
    console.error("reindex fatal error:", err);
    return json({ ok: false, error: "Server error in reindex" }, 500);
  }
}