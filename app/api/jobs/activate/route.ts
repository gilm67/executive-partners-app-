// app/api/jobs/activate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

type Payload = {
  id?: string;
  slug?: string;
  active?: boolean | "true" | "false" | string | number;
};

function toBool(v: Payload["active"]): boolean | null {
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v !== 0;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    if (["1", "true", "yes", "on"].includes(s)) return true;
    if (["0", "false", "no", "off"].includes(s)) return false;
  }
  return null;
}

function isAuthorized(req: NextRequest) {
  const env = process.env.JOBS_ADMIN_TOKEN || "";
  const head = req.headers.get("x-admin-token") || "";
  const auth = req.headers.get("authorization") || "";
  if (!env) return false;
  if (head && head === env) return true;
  if (auth.toLowerCase().startsWith("bearer ") && auth.slice(7).trim() === env) return true;
  return false;
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

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  const desired = toBool(body.active);
  if (desired === null) {
    return NextResponse.json(
      { ok: false, error: "Missing/invalid 'active' (expected boolean-like)" },
      { status: 400 }
    );
  }

  const redis = getRedis();

  // Resolve ID
  let id: string | undefined =
    typeof body.id === "string" && body.id.trim() ? body.id.trim() : undefined;

  if (!id && body.slug) {
    const slug = body.slug.trim();
    // Try both legacy and new slug pointers
    const candidates = [`jobs:by-slug:${slug}`, `slug:${slug}`];

    let resolved: string | null = null;
    for (const key of candidates) {
      try {
        const v = (await redis.get(key)) as string | null;
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
        { status: 404 }
      );
    }

    id = resolved; // <- now definitely a string
  }

  if (!id) {
    return NextResponse.json(
      { ok: false, error: "Missing 'id' or 'slug' in body" },
      { status: 400 }
    );
  }

  // Write the flag
  try {
    await redis.hset(id, { active: desired ? "true" : "false" });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: "Failed to update job", detail: String(e?.message ?? e) },
      { status: 500 }
    );
  }

  // Read back a few fields for confirmation
  const updated = (await redis.hgetall(id)) as Record<string, string>;

  return NextResponse.json({
    ok: true,
    id,
    active: updated?.active ?? (desired ? "true" : "false"),
    job: {
      slug: updated?.slug ?? null,
      title: updated?.title ?? null,
      location: updated?.location ?? null,
      active: updated?.active ?? null,
    },
  });
}