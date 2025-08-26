import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export const dynamic = "force-dynamic";

type JobInput = {
  title: string;
  role?: string;
  location?: string;
  market?: string;
  seniority?: string;
  summary?: string;
  description?: string;
  confidential?: boolean;
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function ok(data: any, status = 200) {
  return NextResponse.json(data, { status });
}

export async function POST(req: Request) {
  try {
    // auth (Bearer or x-admin-token)
    const token =
      req.headers.get("authorization")?.replace(/bearer\s+/i, "") ||
      req.headers.get("x-admin-token") ||
      "";

    if (!process.env.APP_ADMIN_TOKEN || token !== process.env.APP_ADMIN_TOKEN) {
      return ok({ ok: false, error: "Unauthorized" }, 401);
    }

    const body = (await req.json()) as JobInput;
    if (!body?.title) return ok({ ok: false, error: "Missing title" }, 400);

    const redis = await getRedis();

    // id + unique slug
    const id = `job:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`;
    const slugBase = slugify(body.title) || "job";
    let slug = slugBase;
    for (let i = 1; await redis.exists(`jobs:by-slug:${slug}`); i++) {
      slug = `${slugBase}-${i}`;
    }

    const job = {
      id,
      title: body.title || "",
      role: body.role || "",
      location: body.location || "",
      market: body.market || "",
      seniority: body.seniority || "",
      summary: body.summary || "",
      description: body.description || "",
      confidential: !!body.confidential,
      slug,
      createdAt: new Date().toISOString(),
      active: true,
    };

    // STRINGIFY everything for Redis hashes
    const jobForRedis: Record<string, string> = Object.fromEntries(
      Object.entries(job).map(([k, v]) => [k, String(v)])
    );

    // write
    await redis.hSet(id, jobForRedis);
    await redis.set(`jobs:by-slug:${slug}`, id);
    await redis.zAdd("jobs:index", [{ score: Date.now(), value: id }]);

    return ok({ ok: true, id: { id, title: job.title, location: job.location, slug } });
  } catch (err: any) {
    console.error("jobs/create error:", err?.message || err);
    return ok({ ok: false, error: "Server error" }, 500);
  }
}
