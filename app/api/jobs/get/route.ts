import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

type JobHash = {
  id?: string;
  slug?: string;
  title?: string;
  summary?: string;
  description?: string;
  location?: string;
  market?: string;
  seniority?: string;
  active?: string;       // "true"/"false"
  createdAt?: string;
  role?: string;
  confidential?: string; // "true"/"false"
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id")?.trim() || undefined;
    const slugParam = searchParams.get("slug")?.trim() || undefined;

    if (!idParam && !slugParam) {
      return NextResponse.json({ ok: false, error: "Missing id or slug" }, { status: 400 });
    }

    const redis = await getRedis();

    // Resolve ID if slug was given
    let id: string | undefined = idParam;
    if (!id && slugParam) {
      const resolved = await redis.get(`jobs:by-slug:${slugParam}`);
      if (!resolved || typeof resolved !== "string" || !resolved.trim()) {
        return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
      }
      id = resolved.trim(); // now definitely a string
    }

    // Read the job hash
    const hash = await redis.hgetall(id as string);
    const h = hash as unknown as JobHash;

    if (!h || !h.title) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    // Normalize booleans and shape
    const job = {
      id,
      slug: h.slug,
      title: h.title,
      summary: h.summary,
      description: h.description,
      location: h.location,
      market: h.market,
      seniority: h.seniority,
      active: h.active === "true" ? "true" : "false",
      createdAt: h.createdAt,
      role: h.role,
      confidential: h.confidential === "true" ? "true" : "false",
    };

    return NextResponse.json({ ok: true, job });
  } catch (e) {
    console.error("GET /api/jobs/get error:", e);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}