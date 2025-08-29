// app/api/jobs/create/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

type Incoming = {
  title?: string;
  slug?: string;
  summary?: string;
  description?: string;
  location?: string;
  market?: string;
  seniority?: string;
  active?: boolean | "true" | "false" | string | number;
};

function toBoolString(v: Incoming["active"]): "true" | "false" {
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "number") return v !== 0 ? "true" : "false";
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    if (["1", "true", "yes", "on"].includes(s)) return "true";
    if (["0", "false", "no", "off"].includes(s)) return "false";
  }
  return "true"; // default to active
}

function randIdPart() {
  return Math.random().toString(36).slice(2, 8);
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/--+/g, "-");
}

async function ensureUniqueSlug(
  redis: Awaited<ReturnType<typeof getRedis>>,
  base: string
): Promise<string> {
  const baseSlug = slugify(base);
  let candidate = baseSlug;
  let n = 1;
  // Check existence via the by-slug index
  while (true) {
    const exists = await redis.get(`jobs:by-slug:${candidate}`);
    if (!exists) return candidate;
    n += 1;
    candidate = `${baseSlug}-${n}`;
  }
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
  const token =
    req.headers.get("x-admin-token") ||
    (req.headers.get("authorization")?.toLowerCase().startsWith("bearer ")
      ? req.headers.get("authorization")!.slice(7).trim()
      : "");

  if (!process.env.JOBS_ADMIN_TOKEN) {
    return NextResponse.json(
      { ok: false, error: "Server auth not configured" },
      { status: 500 }
    );
  }
  if (!token || token !== process.env.JOBS_ADMIN_TOKEN) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  // --- Parse body ---
  let body: Incoming;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.title && !body.slug) {
    return NextResponse.json(
      { ok: false, error: "Missing 'title' or 'slug'" },
      { status: 400 }
    );
  }

  const redis = await getRedis();

  // --- Slug ---
  const desiredBase = body.slug ? String(body.slug) : String(body.title);
  const finalSlug = await ensureUniqueSlug(redis, desiredBase);

  // --- ID & doc ---
  const id = `job:${Date.now()}:${randIdPart()}`;
  const doc: Record<string, string> = {
    id,
    title: body.title ?? "",
    slug: finalSlug,
    summary: body.summary ?? "",
    description: body.description ?? "",
    location: body.location ?? "",
    market: body.market ?? "",
    seniority: body.seniority ?? "",
    active: toBoolString(body.active),
    confidential: "false",
    role: "",
    createdAt: new Date().toISOString(),
  };

  // --- Write to Redis (lowercase commands) ---
  await redis.hset(id, doc);
  await redis.set(`jobs:by-slug:${finalSlug}`, id);
  await redis.sadd("jobs:index", id);

  return NextResponse.json({
    ok: true,
    id: { id, title: doc.title, location: doc.location, slug: finalSlug },
  });
}