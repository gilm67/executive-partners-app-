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
  role?: string;
  confidential?: boolean | "true" | "false" | "yes" | "no" | string | number;
  active?: boolean | "true" | "false" | string | number;
};

export const runtime = "nodejs";

/* ---------------- helpers ---------------- */

function truthy(v: unknown): boolean {
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v !== 0;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    return ["1", "true", "yes", "on"].includes(s);
  }
  return false;
}
function falsy(v: unknown): boolean {
  if (typeof v === "boolean") return !v;
  if (typeof v === "number") return v === 0;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    return ["0", "false", "no", "off"].includes(s);
  }
  return false;
}
function toBoolString(v: Incoming["active"]): "true" | "false" {
  return truthy(v) ? "true" : falsy(v) ? "false" : "true"; // default active=true
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
  while (true) {
    const exists = await redis.get(`jobs:by-slug:${candidate}`);
    if (!exists) return candidate;
    n += 1;
    candidate = `${baseSlug}-${n}`;
  }
}

/* ---------------- auth ---------------- */

function expectedToken(): string {
  return (
    process.env.JOBS_ADMIN_TOKEN ||
    process.env.EP_ADMIN_TOKEN ||
    // casing safety in case the var was created with a capitalized second segment
    (process.env as any).EP_Admin_Token ||
    ""
  );
}

function providedToken(req: Request): string {
  const hAuth = req.headers.get("authorization");
  const hX = req.headers.get("x-admin-token");
  if (hAuth && hAuth.toLowerCase().startsWith("bearer ")) {
    return hAuth.slice(7).trim();
  }
  return (hAuth || hX || "").trim();
}

/* ---------------- CORS ---------------- */

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST",
  "Access-Control-Allow-Headers": "Content-Type, x-admin-token, authorization",
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

/* ---------------- POST ---------------- */

export async function POST(req: Request) {
  // Auth
  const exp = expectedToken();
  if (!exp) {
    return NextResponse.json(
      { ok: false, error: "Server auth not configured" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
  const got = providedToken(req);
  if (!got || got !== exp) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401, headers: CORS_HEADERS }
    );
  }

  // Parse body
  let body: Incoming;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  if (!body.title && !body.slug) {
    return NextResponse.json(
      { ok: false, error: "Missing 'title' or 'slug'" },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const redis = await getRedis();

  // Slug
  const desiredBase = body.slug ? String(body.slug) : String(body.title);
  const finalSlug = await ensureUniqueSlug(redis, desiredBase);

  // ID & doc
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
    role: body.role ?? "",
    active: toBoolString(body.active),
    confidential: truthy(body.confidential) ? "true" : "false",
    createdAt: new Date().toISOString(),
  };

  // Persist
  await redis.hset(id, doc);
  await redis.set(`jobs:by-slug:${finalSlug}`, id);
  await redis.sadd("jobs:index", id);

  return NextResponse.json(
    { ok: true, id: { id, title: doc.title, location: doc.location, slug: finalSlug } },
    { headers: CORS_HEADERS }
  );
}