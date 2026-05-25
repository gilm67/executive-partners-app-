import { NextResponse } from "next/server";
import { createJob } from "@/lib/sheets";

function hasAdminToken() {
  return !!process.env.APP_ADMIN_TOKEN;
}

function getAuthToken(req: Request) {
  const auth = req.headers.get("authorization") || "";
  if (auth.toLowerCase().startsWith("bearer ")) return auth.slice(7).trim();
  const url = new URL(req.url);
  return url.searchParams.get("token")?.trim() || "";
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    diag: "jobs/create",
    hasEnv: hasAdminToken(),
    tokenLen: (process.env.APP_ADMIN_TOKEN || "").length,
  });
}

export async function POST(req: Request) {
  if (!hasAdminToken()) {
    return NextResponse.json(
      { ok: false, error: "Server missing APP_ADMIN_TOKEN" },
      { status: 500 }
    );
  }

  const token = getAuthToken(req);
  if (token !== process.env.APP_ADMIN_TOKEN) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const result = await createJob({
      title: body.title,
      location: body.location,
    });
    return NextResponse.json({ ok: true, result });
  } catch (err: any) {
    console.error("[jobs/create]", err);
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Failed to create job" },
      { status: 500 }
    );
  }
}
