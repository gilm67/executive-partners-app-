// app/api/jobs/get/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

function normalize(d: Record<string, string>) {
  return {
    id: d.id,
    title: d.title,
    slug: (d.slug || "").trim(),
    summary: d.summary || "",
    description: d.description || "",
    location: d.location || "",
    market: d.market || "",
    seniority: d.seniority || "",
    role: d.role || "",
    confidential: d.confidential === "true" || (d as any).confidential === true,
    active: d.active === "true" || (d as any).active === true,
    createdAt: d.createdAt,
  };
}

async function findJobBySlug(slug: string) {
  const want = slug.trim();
  const redis = await getRedis();

  try {
    const id = await redis.get(`jobs:by-slug:${want}`);
    if (id) {
      const data = await redis.hgetall(id);
      if (data?.slug?.trim() === want) return normalize(data);
    }
  } catch {}

  try {
    const ids = await redis.smembers("jobs:index");
    for (const id of ids) {
      const data = await redis.hgetall(id);
      if (data?.slug?.trim() === want) return normalize(data);
    }
  } catch {}

  try {
    const raw = await redis.get("jobs:index:__set__");
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) {
        for (const id of arr) {
          const data = await redis.hgetall(String(id));
          if (data?.slug?.trim() === want) return normalize(data);
        }
      }
    }
  } catch {}

  return null;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const slug = url.searchParams.get("slug");
  if (!slug) return NextResponse.json({ ok: false, error: "Missing slug" }, { status: 400 });
  const job = await findJobBySlug(slug);
  if (!job) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, job });
}