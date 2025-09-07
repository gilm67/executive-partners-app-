// app/api/jobs/update/route.ts
import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export const runtime = "nodejs";

type PatchBody = Partial<{
  slug: string;
  title: string;
  summary: string;
  description: string;
  location: string;
  market: string;
  seniority: string;
  role: string;
  confidential: boolean | "true" | "false";
  active: boolean | "true" | "false";
}> & { slug: string };

function toBoolString(v: any): "true" | "false" {
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "number") return v !== 0 ? "true" : "false";
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    if (["1","true","yes","on"].includes(s)) return "true";
    if (["0","false","no","off"].includes(s)) return "false";
  }
  return "true";
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      Allow: "OPTIONS,PATCH",
      "Access-Control-Allow-Methods": "OPTIONS,PATCH",
      "Access-Control-Allow-Headers": "Content-Type, x-admin-token, authorization",
    },
  });
}

export async function PATCH(req: Request) {
  const tokenHeader =
    req.headers.get("x-admin-token") ||
    (req.headers.get("authorization")?.toLowerCase().startsWith("bearer ")
      ? req.headers.get("authorization")!.slice(7).trim()
      : "");
  const serverToken = process.env.JOBS_ADMIN_TOKEN;
  if (!serverToken) {
    return NextResponse.json({ ok: false, error: "Server auth not configured" }, { status: 500 });
  }
  if (!tokenHeader || tokenHeader !== serverToken) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let body: PatchBody;
  try { body = await req.json(); }
  catch { return NextResponse.json({ ok:false, error:"Invalid JSON" }, { status:400 }); }

  if (!body.slug) {
    return NextResponse.json({ ok:false, error:"Missing 'slug'" }, { status:400 });
  }

  const redis = await getRedis();
  const id = await redis.get(`jobs:by-slug:${body.slug}`);
  if (!id) return NextResponse.json({ ok:false, error:"Not found" }, { status:404 });

  const current = await redis.hgetall(id);
  if (!current || !current.id) {
    return NextResponse.json({ ok:false, error:"Not found" }, { status:404 });
  }

  const patch: Record<string,string> = { ...current };

  if (body.title !== undefined) patch.title = String(body.title);
  if (body.summary !== undefined) patch.summary = String(body.summary);
  if (body.description !== undefined) patch.description = String(body.description);
  if (body.location !== undefined) patch.location = String(body.location);
  if (body.market !== undefined) patch.market = String(body.market);
  if (body.seniority !== undefined) patch.seniority = String(body.seniority);
  if (body.role !== undefined) patch.role = String(body.role);
  if (body.confidential !== undefined) patch.confidential = toBoolString(body.confidential);
  if (body.active !== undefined) patch.active = toBoolString(body.active);

  await redis.hset(id, patch);

  return NextResponse.json({ ok:true, id, slug: body.slug, updated: patch });
}
