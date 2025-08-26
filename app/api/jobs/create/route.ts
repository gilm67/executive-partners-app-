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

    const id = `job:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`;
    const slugBase = slugify(body.title);
    let slug = slugBase || "job";
    let i = 1;
    while (await redis.exists(`jobs:by-slug:${slug}`)) {
      slug = `${slugBase}-${i++}`;
    }

    const job = {
      id,
      title: body.title,
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

    await redis.hSet(id, job as any);
    await redis.set(`jobs:by-slug:${slug}`, id);
    await redis.zAdd("jobs:index", [{ score: Date.now(), value: id }]);

    return ok({ ok: true, id: { id, title: job.title, location: job.location, slug } });
  } catch (err) {
    console.error("jobs/create error:", err);
    return ok({ ok: false, error: "Server error" }, 500);
  }
}
