import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";
import { assertAdmin } from "@/lib/admin-auth";

type Body = {
  title: string;
  slug: string;
  summary?: string;
  description?: string;
  location?: string;
  market?: string;
  seniority?: string;
  active?: string | boolean;
};

function boolString(v: Body["active"]) {
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    if (["1", "true", "yes", "on"].includes(s)) return "true";
    if (["0", "false", "no", "off"].includes(s)) return "false";
  }
  return "true"; // default show
}

async function uniqueSlug(redis: any, base: string): Promise<string> {
  let slug = base;
  let n = 1;
  // keep trying slug, slug-1, slug-2...
  while (await redis.get(`jobs:by-slug:${slug}`)) {
    n += 1;
    slug = `${base}-${n}`;
  }
  return slug;
}

export async function POST(req: Request) {
  const auth = await assertAdmin(req);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: auth.message }, { status: auth.status });
  }

  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.title || !body.slug) {
    return NextResponse.json({ ok: false, error: "Missing title or slug" }, { status: 400 });
  }

  const redis = await getRedis();
  const finalSlug = await uniqueSlug(redis, body.slug.trim());
  const id = `job:${Date.now()}:${Math.random().toString(36).slice(2, 6)}`;

  const doc = {
    id,
    title: body.title,
    slug: finalSlug,
    summary: body.summary ?? "",
    description: body.description ?? "",
    location: body.location ?? "",
    market: body.market ?? "",
    seniority: body.seniority ?? "",
    active: boolString(body.active),
    createdAt: new Date().toISOString(),
  };

  // write
  await redis.hSet(id, doc);
  await redis.set(`jobs:by-slug:${finalSlug}`, id);
  await redis.sAdd("jobs:index", id); // <-- CRITICAL: keep the index updated

  return NextResponse.json({
    ok: true,
    id: { id, title: doc.title, location: doc.location, slug: doc.slug },
  });
}