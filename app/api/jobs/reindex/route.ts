// app/api/jobs/reindex/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

function ok(json: any, init?: number) {
  return NextResponse.json({ ok: true, ...json }, { status: init ?? 200 });
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
  // --- Auth ---
  const envToken = process.env.JOBS_ADMIN_TOKEN;
  if (!envToken) return err("Server auth not configured", 500);

  const token = readAdminToken(req);
  if (!token || token !== envToken) return err("Unauthorized", 401);

  const redis = await getRedis();

  // --- SCAN all potential job hash keys: "job:*"
  const candidateIds: string[] = [];
  let cursor = "0";
  const MATCH = "job:*";
  const COUNT = 300;

  try {
    do {
      // node-redis v4: scan returns [nextCursor, keys[]]
      const [next, keys] = await redis.scan(cursor, "MATCH", MATCH, "COUNT", COUNT);
      cursor = next || "0";
      if (Array.isArray(keys) && keys.length) {
        for (const k of keys) candidateIds.push(k);
      }
    } while (cursor !== "0");
  } catch (e) {
    console.error("SCAN error:", e);
    return err("Server error during scan");
  }

  // --- Verify each candidate looks like a job (has title & slug)
  const verified: string[] = [];
  let verifiedCount = 0;

  for (const id of candidateIds) {
    try {
      const h = await redis.hgetall(id);
      if (h && h.title && h.slug) {
        verified.push(id);
        verifiedCount++;
      }
    } catch (e) {
      console.error("hgetall error:", id, e);
    }
  }

  // --- Add to index set
  let added = 0;
  if (verified.length) {
    try {
      // sadd accepts (...members)
      const addedCount = await redis.sadd("jobs:index", ...verified);
      // node-redis returns number of new elements added
      added = typeof addedCount === "number" ? addedCount : 0;
    } catch (e) {
      console.error("sadd error:", e);
      return err("Server error while updating index set");
    }
  }

  // (Optional) De-duplicate by ensuring each verified key is present in the by-slug index
  // Not strictly required for listing, so skipping for speed.

  return ok({
    scanned: candidateIds.length,
    verified: verifiedCount,
    added,
    total: verifiedCount, // number of job-like hashes encountered this run
  });
}