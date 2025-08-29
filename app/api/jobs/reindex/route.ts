// app/api/jobs/reindex/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";
import { assertAdmin } from "@/lib/admin-auth";

export const runtime = "nodejs";

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });
}

async function scanAll(redis: any, pattern: string, count = 500): Promise<string[]> {
  const keys: string[] = [];
  let cursor: string = "0";
  try {
    do {
      // Upstash returns [nextCursor, keys[]]
      const res = await redis.scan(cursor, { match: pattern, count });
      const next = Array.isArray(res) ? String(res[0]) : "0";
      const batch = Array.isArray(res) ? (res[1] as string[]) : [];
      keys.push(...batch);
      cursor = next;
    } while (cursor !== "0");
  } catch (e) {
    console.error("scanAll error for", pattern, e);
  }
  return keys;
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

    const candidateIds = new Set<string>();

    // Collect job:* keys (hashes)
    for (const k of await scanAll(redis, "job:*")) candidateIds.add(k);

    // Some projects use jobs:<number>
    for (const k of await scanAll(redis, "jobs:[0-9]*")) candidateIds.add(k);

    // Resolve slug pointers
    for (const slugKey of await scanAll(redis, "jobs:by-slug:*")) {
      try {
        const id = await redis.get(slugKey);
        if (id) candidateIds.add(String(id));
      } catch (e) {
        console.error("read slug ptr error:", slugKey, e);
      }
    }

    // Verify real jobs (must have title+slug)
    const verified: string[] = [];
    for (const id of candidateIds) {
      try {
        const h = await redis.hGetAll(id);
        if (h && h.title && h.slug) verified.push(id);
      } catch (e) {
        console.error("hGetAll error:", id, e);
      }
    }

    let added = 0;
    if (verified.length) {
      try {
        const n = await redis.sAdd("jobs:index", ...verified);
        added = Number(n) || 0;
      } catch (e) {
        console.error("sAdd jobs:index error:", e);
      }
    }

    const total = await redis.sCard("jobs:index").catch(() => 0);
    return json({ ok: true, scanned: candidateIds.size, verified: verified.length, added, total });
  } catch (err) {
    console.error("reindex fatal:", err);
    return json({ ok: false, error: "Server error in reindex" }, 500);
  }
}