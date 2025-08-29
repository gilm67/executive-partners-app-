// app/api/jobs/get/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const idParam = url.searchParams.get("id");
    const slugParam = url.searchParams.get("slug");

    if (!idParam && !slugParam) {
      return NextResponse.json({ ok: false, error: "Missing id or slug" }, { status: 400 });
    }

    const redis = await getRedis();

    // Resolve id from slug if needed
    let id = idParam || "";
    if (!id && slugParam) {
      try {
        const bySlug = await redis.get(`jobs:by-slug:${slugParam}`);
        if (typeof bySlug === "string" && bySlug) id = bySlug;
      } catch {
        // ignore
      }
    }

    if (!id) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    // Load the job hash
    let h: Record<string, string> | null = null;
    try {
      h = await redis.hgetall(id);
    } catch {
      h = null;
    }

    if (!h || !h.slug || !h.title) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    const job = {
      id,
      slug: String(h.slug),
      title: String(h.title),
      summary: h.summary ? String(h.summary) : undefined,
      description: h.description ? String(h.description) : undefined,
      location: h.location ? String(h.location) : undefined,
      market: h.market ? String(h.market) : undefined,
      seniority: h.seniority ? String(h.seniority) : undefined,
      active: h.active ? String(h.active) : undefined,
      createdAt: h.createdAt ? String(h.createdAt) : undefined,
    };

    return NextResponse.json({ ok: true, job });
  } catch (err: any) {
    // Clean failure
    return NextResponse.json({ ok: false, error: "Lookup failed", detail: err?.message ?? "" });
  }
}