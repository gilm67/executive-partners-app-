// app/api/jobs/reindex/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

function ok(json: any, status = 200) {
  return NextResponse.json({ ok: true, ...json }, { status });
}
function err(message: string, status = 500) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

function readAdminToken(req: Request): string | null {
  const h = req.headers;
  const headerToken = h.get("x-admin-token");
  if (headerToken) return headerToken.trim();
  const auth = h.get("authorization");
  if (auth?.toLowerCase().startsWith("bearer ")) return auth.slice(7).trim();
  return null;
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: "GET, HEAD, OPTIONS, POST",
      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST",
      "Access-Control-Allow-Headers": "Content-Type, x-admin-token, authorization",
    },
  });
}

export async function POST(req: Request) {
  // Auth
  const envToken = process.env.JOBS_ADMIN_TOKEN;
  if (!envToken) return err("Server auth not configured", 500);
  const token = readAdminToken(req);
  if (!token || token !== envToken) return err("Unauthorized", 401);

  const redis = await getRedis();

  // Scan job hashes
  const MATCH = "job:*";
  const COUNT = 300;
  let cursor = "0";
  const candidateIds: string[] = [];

  try {
    do {
      // node-redis v4: scan(cursor, { MATCH, COUNT }) -> [nextCursor, keys[]]
      const [next, keys] = (await redis.scan(cursor, { MATCH, COUNT })) as [string, string[]];
      cursor = next || "0";
      if (Array.isArray(keys) && keys.length) candidateIds.push(...keys);
    } while (cursor !== "0");
  } catch (e) {
    console.error("SCAN error:", e);
    return err("Server error during scan");
  }

  // Verify each candidate looks like a job (has title & slug)
  const verified: string[] = [];
  for (const id of candidateIds) {
    try {
      const h = await redis.hgetall(id);
      if (h && h.title && h.slug) verified.push(id);
    } catch (e) {
      console.error("hgetall error:", id, e);
    }
  }

  // Add to index set
  let added = 0;
  if (verified.length) {
    try {
      const addedCount = await redis.sadd("jobs:index", ...verified);
      added = typeof addedCount === "number" ? addedCount : 0;
    } catch (e) {
      console.error("sadd error:", e);
      return err("Server error while updating index set");
    }
  }

  return ok({
    scanned: candidateIds.length,
    verified: verified.length,
    added,
    total: verified.length,
  });
} s