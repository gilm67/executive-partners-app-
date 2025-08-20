// app/api/jobs/create/route.ts
import { NextResponse } from "next/server";
import { createJob, type NewJobInput } from "@/lib/sheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function unauthorized(msg = "Unauthorized") {
  return NextResponse.json({ ok: false, error: msg }, { status: 401 });
}

export async function POST(req: Request) {
  // 1) Read expected token from env
  const expected = (process.env.APP_ADMIN_TOKEN || "").trim();
  if (!expected) {
    // Fail closed if misconfigured in prod
    return unauthorized("Missing APP_ADMIN_TOKEN on server");
  }

  // 2) Accept either:
  //    - Authorization: Bearer <token>
  //    - OR a `token` query param (handy for quick internal tools)
  const auth = req.headers.get("authorization") || "";
  const bearer = auth.toLowerCase().startsWith("bearer ")
    ? auth.slice(7).trim()
    : "";

  const url = new URL(req.url);
  const tokenParam = (url.searchParams.get("token") || "").trim();

  const provided = bearer || tokenParam;

  if (provided !== expected) {
    return unauthorized();
  }

  try {
    const body = (await req.json()) as Partial<NewJobInput>;
    if (!body.title || !String(body.title).trim()) {
      return NextResponse.json(
        { ok: false, error: "Missing required field: title" },
        { status: 400 }
      );
    }

    await createJob({
      title: String(body.title).trim(),
      role: body.role,
      location: body.location,
      market: body.market,
      seniority: body.seniority,
      summary: body.summary,
      description: body.description,
      confidential: body.confidential,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("jobs/create error:", err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Internal error" },
      { status: 500 }
    );
  }
}

// Optional hard 405 for GET so folks can’t “poke” the endpoint
export async function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed" }, { status: 405 });
}

