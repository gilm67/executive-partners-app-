// app/api/jobs/create/route.ts
import { NextResponse } from "next/server";
import { createJob, type NewJobInput } from "@/lib/sheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function json(data: any, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function unauthorized(msg = "Unauthorized") {
  return json({ ok: false, error: msg }, 401);
}

// POST = create job (requires token)
export async function POST(req: Request) {
  const expected = (process.env.APP_ADMIN_TOKEN || "").trim();

  // Fail CLOSED if misconfigured in prod
  if (!expected) {
    return unauthorized("Missing APP_ADMIN_TOKEN on server");
  }

  // Allow either Authorization: Bearer <token> OR ?token=<token>
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
      return json({ ok: false, error: "Missing required field: title" }, 400);
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

    return json({ ok: true });
  } catch (err: any) {
    console.error("jobs/create error:", err);
    return json({ ok: false, error: err?.message || "Internal error" }, 500);
  }
}

// GET = diagnostics (safe to keep; returns no secret values)
export async function GET(req: Request) {
  const expected = (process.env.APP_ADMIN_TOKEN || "").trim();
  const url = new URL(req.url);
  const echo = url.searchParams.get("echo") === "1";

  // We never return the actual token. Only lengths and booleans.
  return json({
    ok: true,
    diag: "jobs/create",
    hasEnv: !!expected,
    tokenLen: expected.length || 0,
    echoHint: echo
      ? "Pass Authorization: Bearer <token> or ?token=… on POST to create jobs."
      : "Add ?echo=1 to this URL for this hint.",
  });
}

