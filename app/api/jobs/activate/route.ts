// app/api/jobs/activate/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";
import { assertAdmin } from "@/lib/admin-auth";

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
  const auth = await assertAdmin(req);
  if (!auth.ok) {
    return NextResponse.json({ ok: false, error: auth.message }, { status: auth.status });
  }

  let body: Payload;
  try {
    body = await req.json();
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

  const redis = await getRedis();

  // Resolve id via slug if needed
  let id: string | undefined = body.id;
  if (!id && body.slug) {
    const key = `jobs:by-slug:${body.slug}`;
    const resolved = await redis.get(key); // string | null
    if (!resolved) {
      return NextResponse.json(
        { ok: false, error: `No job found for slug '${body.slug}'` },
        { status: 404 }
      );
    }
    id = resolved; // now definitely a string
  }

  if (!id) {
    return NextResponse.json(
      { ok: false, error: "Missing 'id' or 'slug' in body" },
      { status: 400 }
    );
  }

  // Update hash
  const wrote = await redis.hSet(String(id), { active: desired ? "true" : "false" });

  const updated = await redis.hGetAll(String(id));

  return NextResponse.json({
    ok: true,
    id,
    active: updated?.active ?? (desired ? "true" : "false"),
    job: {
      slug: updated?.slug,
      title: updated?.title,
      location: updated?.location,
      active: updated?.active,
    },
  });
}