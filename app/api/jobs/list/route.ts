// app/api/jobs/list/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export const runtime = "nodejs";

export async function GET() {
  try {
    const redis = await getRedis();

    // read ids from the emulated set (KV fallback handles this)
    const ids = await redis.smembers("jobs:index");

    if (!ids || ids.length === 0) {
      return NextResponse.json({ ok: true, jobs: [] });
    }

    // hydrate each job
    const jobs = await Promise.all(
      ids.map(async (id) => {
        try {
          const doc = await redis.hgetall(id);
          // normalize booleans stored as strings
          const active =
            doc.active === "true" || doc.active === "1" || !doc.active /* default to visible */;

          if (!doc || !doc.title) return null;
          return {
            id: doc.id || id,
            title: doc.title,
            slug: doc.slug || "",
            summary: doc.summary || "",
            description: doc.description || "",
            location: doc.location || "",
            market: doc.market || "",
            seniority: doc.seniority || "",
            role: doc.role || "",
            confidential: doc.confidential === "true",
            active,
            createdAt: doc.createdAt || null,
          };
        } catch {
          return null;
        }
      })
    );

    // filter nulls + inactive if you prefer
    const cleaned = jobs.filter(Boolean);

    // sort newest first if createdAt present
    cleaned.sort((a: any, b: any) => {
      const ta = a.createdAt ? Date.parse(a.createdAt) : 0;
      const tb = b.createdAt ? Date.parse(b.createdAt) : 0;
      return tb - ta;
    });

    return NextResponse.json({ ok: true, jobs: cleaned });
  } catch (err: any) {
    console.error("/api/jobs/list error", err);
    return NextResponse.json({ ok: false, error: "List failed" }, { status: 500 });
  }
}