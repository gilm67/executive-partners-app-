// app/api/jobs/activate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";
import { readIncomingToken, isAdmin } from "@/lib/admin-auth";

const ALLOWED_ORIGINS = [
  "https://www.execpartners.ch",
  "https://execpartners.ch",
  "https://jobs.execpartners.ch",
  "http://localhost:3000",
];

function corsHeaders(req: NextRequest) {
  const origin = req.headers.get("origin") || "";
  const allow =
    ALLOWED_ORIGINS.includes(origin) || origin.endsWith(".vercel.app");
  return {
    "Access-Control-Allow-Origin": allow ? origin : "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, x-admin-token, authorization",
    "Access-Control-Max-Age": "86400",
  };
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(req) as any });
}

type Body = {
  id?: string;
  slug?: string;
  active?: boolean | string;
};

export async function POST(req: NextRequest) {
  const headers = corsHeaders(req);

  // Auth
  const token = readIncomingToken();
  if (!isAdmin(token)) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401, headers }
    );
  }

  // Parse body
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400, headers }
    );
  }

  // Get a redis client (IMPORTANT: await getRedis() once)
  const redis = await getRedis();

  // Resolve id by id or slug
  let id: string | undefined = body.id;

  if (!id && body.slug) {
    const slug = String(body.slug).trim();
    // Try known slug→id keys
    const candidates = [
      `jobs:by-slug:${slug}`,
      `job:by-slug:${slug}`,
    ];
    let resolved: string | undefined;

    for (const key of candidates) {
      try {
        const v = await redis.get(key); // ← now on the resolved client
        if (typeof v === "string" && v) {
          resolved = v;
          break;
        }
      } catch {
        // ignore and try next
      }
    }

    if (!resolved) {
      return NextResponse.json(
        { ok: false, error: `No job found for slug '${slug}'` },
        { status: 404, headers }
      );
    }
    id = resolved;
  }

  if (!id) {
    return NextResponse.json(
      { ok: false, error: "Provide job 'id' or 'slug'" },
      { status: 400, headers }
    );
  }

  // Load current job hash
  const h = await redis.hgetall(id);
  if (!h || Object.keys(h).length === 0) {
    return NextResponse.json(
      { ok: false, error: `Job not found: ${id}` },
      { status: 404, headers }
    );
  }

  // Decide new active state
  let nextActive: boolean;
  if (typeof body.active === "string") {
    nextActive = body.active.toLowerCase() !== "false";
  } else if (typeof body.active === "boolean") {
    nextActive = body.active;
  } else {
    // default: toggle to true if missing, or keep current if present
    nextActive = (h.active ?? "true") !== "false";
  }

  // Persist
  h.active = nextActive ? "true" : "false";
  await redis.hset(id, h);

  // Maintain index membership
  if (nextActive) {
    await redis.sadd("jobs:index", id);
  }

  return NextResponse.json(
    {
      ok: true,
      id,
      active: h.active,
      job: {
        slug: h.slug,
        title: h.title,
        location: h.location,
        active: h.active,
      },
    },
    { status: 200, headers }
  );
}