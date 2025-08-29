// app/api/jobs/reindex/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";
import { headers } from "next/headers";

function ok(data: any, status = 200) {
  return NextResponse.json({ ok: true, ...data }, { status });
}
function err(message: string, status = 500) {
  return NextResponse.json({ ok: false, error: message }, { status });
}

function requireAdmin() {
  const h = headers();
  const tok = h.get("x-admin-token") || h.get("authorization")?.replace(/^Bearer\s+/i, "");
  const env = process.env.JOBS_ADMIN_TOKEN || "";
  return tok && env && tok === env;
}

export async function POST() {
  try {
    if (!requireAdmin()) return err("Unauthorized", 401);

    const redis = await getRedis();

    const MATCH = "job:*";
    const COUNT = 500;

    let cursor = "0";
    const candidateIds: string[] = [];

    // Use low-level SCAN to avoid TS option mismatches across redis clients
    do {
      const res = (await (redis as any).sendCommand([
        "SCAN",
        cursor,
        "MATCH",
        MATCH,
        "COUNT",
        String(COUNT),
      ])) as [string, string[]] | any;

      // Some clients return array, others return objects — normalize defensively
      let next = "0";
      let keys: string[] = [];

      if (Array.isArray(res) && res.length === 2 && Array.isArray(res[1])) {
        next = String(res[0] ?? "0");
        keys = res[1] as string[];
      } else if (res && typeof res === "object" && Array.isArray(res.keys)) {
        next = String(res.cursor ?? "0");
        keys = res.keys as string[];
      }

      cursor = next || "0";
      if (keys?.length) candidateIds.push(...keys);
    } while (cursor !== "0");

    const verified: string[] = [];
    for (const id of candidateIds) {
      try {
        const h = await (redis as any).hgetall(id);
        if (h && h.title && h.slug) verified.push(id);
      } catch {
        // ignore bad hash
      }
    }

    let added = 0;
    if (verified.length) {
      try {
        await (redis as any).sadd("jobs:index", ...verified);
        added = verified.length;
      } catch {
        // if spread is not supported, add one by one
        for (const id of verified) await (redis as any).sadd("jobs:index", id);
        added = verified.length;
      }
    }

    const total = (await (redis as any).scard("jobs:index")) || 0;

    return ok({
      scanned: candidateIds.length,
      verified: verified.length,
      added,
      total,
    });
  } catch (e: any) {
    return err("Server error in reindex");
  }
}