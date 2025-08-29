// app/api/jobs/get/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

// CORS/preflight (optional but nice to have)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

/**
 * GET /api/jobs/get?slug=...  OR  /api/jobs/get?id=...
 * Returns: { ok: true, job: {...} } or an error JSON
 */
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");
    let id = url.searchParams.get("id");

    if (!id && !slug) {
      return NextResponse.json(
        { ok: false, error: "Missing query: provide either ?slug= or ?id=" },
        { status: 400 }
      );
    }

    const redis = await getRedis();

    // Resolve id from slug if needed
    if (!id && slug) {
      const lookedUp = await redis.get(`jobs:by-slug:${slug}`);
      if (!lookedUp) {
        return NextResponse.json(
          { ok: false, error: `No job found for slug '${slug}'` },
          { status: 404 }
        );
      }
      id = String(lookedUp);
    }

    // Pull the hash
    const job = await redis.hGetAll(String(id));
    if (!job || Object.keys(job).length === 0) {
      return NextResponse.json(
        { ok: false, error: `No job found for id '${id}'` },
        { status: 404 }
      );
    }

    return NextResponse.json({ ok: true, job });
  } catch (err) {
    console.error("GET /api/jobs/get error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}