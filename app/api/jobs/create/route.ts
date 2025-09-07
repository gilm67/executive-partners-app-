// app/api/jobs/create/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export const runtime = "nodejs";

type Incoming = {
  title?: string;
  slug?: string;
  summary?: string;
  description?: string;
  location?: string;
  market?: string;
  seniority?: string;
  role?: string;
  confidential?: boolean | "true" | "false" | string | number;
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
  // default to true so new roles are visible unless explicitly disabled
  return "true";
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
  const baseSlug = slugify(base).trim();
  let candidate = baseSlug;
  let n = 1;
  // Use the O(1) by-slug mapping to test existence
  // and short-circuit if free.
  while (true) {
    const exists = await redis.get(`jobs:by-slug:${candidate}`);
    if (!exists) return candidate;
    n += 1;
    candidate = `${baseSlug}-${n}`;
  }
}

function corsHeaders(extra?: Record<string, string>) {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST",
    "Access-Control-Allow-Headers": "Content-Type, x-admin-token, authorization",
    ...(extra || {}),
  };
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders({ Allow: "GET, HEAD, OPTIONS, POST" }),
  });
}

export async function POST(req: Request) {
  // --- Auth ---
  const bearer = req.headers.get("authorization");
  const tokenHeader =
    req.headers.get("x-admin-token") ||
    (bearer && bearer.toLowerCase().startsWith("bearer ")
      ? bearer.slice(7).trim()
      : "");

  const serverToken = process.env.JOBS_ADMIN_TOKEN;
  if (!serverToken) {
    return NextResponse.json(
      { ok: false, error: "Server auth not configured" },
      { status: 500, headers: corsHeaders() }
    );
  }
  if (!tokenHeader || tokenHeader !== serverToken) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401, headers: corsHeaders() }
    );
  }

  // --- Parse body ---
  let body: Incoming;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400, headers: corsHeaders() }
    );
  }

  // Trim incoming strings
  const title = (body.title ?? "").toString().trim();
  const providedSlug = (body.slug ?? "").toString().trim();

  if (!title && !providedSlug) {
    return NextResponse.json(
      { ok: false, error: "Missing 'title' or 'slug'" },
      { status: 400, headers: corsHeaders() }
    );
  }

  const redis = await getRedis();

  // --- Slug ---
  const desiredBase = providedSlug || title;
  const finalSlug = await ensureUniqueSlug(redis, desiredBase);

  // --- ID & doc ---
  const id = `job:${Date.now()}:${randIdPart()}`;
  const nowIso = new Date().toISOString();

  const doc: Record<string, string> = {
    id,
    title,
    slug: finalSlug,
    summary: (body.summary ?? "").toString().trim(),
    description: (body.description ?? "").toString(),
    location: (body.location ?? "").toString().trim(),
    market: (body.market ?? "").toString().trim(),
    seniority: (body.seniority ?? "").toString().trim(),
    role: (body.role ?? "").toString().trim(),
    confidential: toBoolString(body.confidential),
    active: toBoolString(body.active),
    createdAt: nowIso,
  };

  // --- Write to Redis (hash + indexes) ---
  try {
    // 1) full document as hash
    await redis.hset(id, doc);

    // 2) O(1) slug → id
    await redis.set(`jobs:by-slug:${finalSlug}`, id);

    // 3) native set index (if supported)
    await redis.sadd("jobs:index", id);

    // 4) JSON fallback index for KV/REST backends
    const indexKey = "jobs:index:__set__";
    try {
      const current = await redis.get(indexKey);
      let arr: string[] = [];
      if (current) {
        try {
          const parsed = JSON.parse(current);
          if (Array.isArray(parsed)) arr = parsed.map(String);
        } catch {
          // corrupt or non-array → reset gracefully
          arr = [];
        }
      }
      if (!arr.includes(id)) {
        arr.push(id);
        await redis.set(indexKey, JSON.stringify(arr));
      }
    } catch (e) {
      console.error("[jobs:create] JSON index update failed:", e);
    }
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: `Storage failed: ${err?.message || String(err)}` },
      { status: 500, headers: corsHeaders() }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      id: { id, title: doc.title, location: doc.location, slug: finalSlug, createdAt: nowIso },
    },
    { headers: corsHeaders() }
  );
}