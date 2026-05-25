cd ~/Desktop/executive-partners-app/* app/api/jobs/create/route.ts */ import { NextResponse } 
from "next/server"; import { createJob, type NewJobInput } from "@/lib/sheets"; nano 
lib/sheets.ts /** Helpers */ function hasAdminToken() { nano lib/sheets.ts return 
!!process.env.APP_ADMIN_TOKEN; } function getAuthToken(req: Request) {
  const auth = req.headers.get("authorization") || "";
  if (auth.toLowerCase().startsWith("bearer ")) return auth.slice(7).trim();
  const url = new URL(req.url);
  const q = url.searchParams.get("token");
  return q ? q.trim() : "";
}

/** GET — diagnostics (prevents 405) */
export async function GET(req: Request) {
  return NextResponse.json({
    ok: true,
    diag: "jobs/create",
    hasEnv: hasAdminToken(),
    tokenLen: (process.env.APP_ADMIN_TOKEN || "").length,
  });
}

/** POST — secured create */
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

  // createJob now returns the new ID
  const id = await createJob(body);
  return NextResponse.json({ ok: true, id });
}
