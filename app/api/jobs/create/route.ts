// app/api/jobs/create/route.ts
import { NextResponse } from "next/server";
import { createJob, type NewJobInput } from "@/lib/sheets";

function hasAdminToken() {
  return !!process.env.APP_ADMIN_TOKEN;
}

function getAuthToken(req: Request) {
  // 1) Authorization: Bearer <token>
  const auth = req.headers.get("authorization") || "";
  if (auth.toLowerCase().startsWith("bearer ")) {
    return auth.slice(7).trim();
  }
  // 2) ?token=<token>
  const url = new URL(req.url);
  const q = url.searchParams.get("token");
  return q ? q.trim() : "";
}

// --- GET: diagnostics (so you don’t get 405) ---
export async function GET(req: Request) {
  const url = new URL(req.url);
  const echo = url.searchParams.get("echo");
  return NextResponse.json({
    ok: true,
    diag: "jobs/create",
    hasEnv: hasAdminToken(),
    tokenLen: (process.env.APP_ADMIN_TOKEN || "").length,
    ...(echo ? { echoHint: "Send Authorization: Bearer <APP_ADMIN_TOKEN> or ?token=..." } : {}),
  });
}

// --- POST: secured create ---
export async function POST(req: Request) {
  if (!hasAdminToken()) {
    return NextResponse.json(
      { ok: false, error: "Server missing APP_ADMIN_TOKEN" },
      { status: 500 }
    );
  }

  const token = getAuthToken(req);
  if (token !== process.env.APP_ADMIN_TOKEN) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  let body: NewJobInput;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!body?.title) {
    return NextResponse.json({ ok: false, error: "Missing 'title'" }, { status: 400 });
  }

  await createJob(body);
  return NextResponse.json({ ok: true });
}
