import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export const dynamic = "force-dynamic";

function ok(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

export async function GET(req: Request) {
  try {
    const token =
      req.headers.get("authorization")?.replace(/bearer\s+/i, "") ||
      req.headers.get("x-admin-token") ||
      "";

    if (!process.env.APP_ADMIN_TOKEN || token !== process.env.APP_ADMIN_TOKEN) {
      return ok({ ok: false, error: "Unauthorized" }, 401);
    }

    const redis = await getRedis();
    const ids = await redis.zRange("jobs:index", 0, -1, { REV: true });
    let first: any = null;
    if (ids[0]) first = await redis.hGetAll(ids[0]);

    return ok({ ok: true, count: ids.length, first: first || null });
  } catch (err) {
    console.error("jobs/diag error:", err);
    return ok({ ok: false, error: "Server error" }, 500);
  }
}
