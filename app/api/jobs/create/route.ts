import { NextResponse } from "next/server";
import { createJob } from "@/lib/sheets"; // must be exported from lib/sheets

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function readToken(req: Request) {
  const h = req.headers.get("authorization") || "";
  if (h.toLowerCase().startsWith("bearer ")) return h.slice(7).trim();
  const url = new URL(req.url);
  const q = url.searchParams.get("token");
  return q ? q.trim() : "";
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const echo = url.searchParams.get("echo");
  const hasEnv =
    !!process.env.APP_ADMIN_TOKEN &&
    !!process.env.SHEET_ID &&
    (!!process.env.GOOGLE_PRIVATE_KEY_B64 || !!process.env.GOOGLE_PRIVATE_KEY) &&
    !!process.env.GOOGLE_CLIENT_EMAIL;

  if (echo) {
    return NextResponse.json({
      ok: true,
      route: "jobs/create",
      hasEnv,
      tokenLen: (process.env.APP_ADMIN_TOKEN || "").length,
    });
  }
  return NextResponse.json({ ok: true, route: "jobs/create" });
}

export async function POST(req: Request) {
  try {
    // auth
    const supplied = readToken(req);
    const server = process.env.APP_ADMIN_TOKEN || "";
    if (!server) {
      return NextResponse.json(
        { ok: false, error: "Server missing APP_ADMIN_TOKEN" },
        { status: 500 }
      );
    }
    if (!supplied || supplied !== server) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }

    // body
    let body: any;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
    }

    const title = (body.title ?? "").toString().trim();
    if (!title) {
      return NextResponse.json({ ok: false, error: "Missing 'title'" }, { status: 400 });
    }

    const payload = {
      title,
      role: (body.role ?? "").toString(),
      location: (body.location ?? "").toString(),
      market: (body.market ?? "").toString(),
      seniority: (body.seniority ?? "").toString(),
      summary: (body.summary ?? "").toString(),
      description: (body.description ?? "").toString(),
      confidential: (body.confidential ?? "").toString(),
    };

    // dry-run: skip Sheets call to make sure route/auth/body work
    const url = new URL(req.url);
    if (url.searchParams.get("dry") === "1") {
      const fakeId = Date.now().toString();
      return NextResponse.json({ ok: true, id: fakeId, dryRun: true });
    }

    // real create
    const id = await createJob(payload);
    return NextResponse.json({ ok: true, id });
  } catch (err: any) {
    const message = err?.message || "Unknown error";
    const stack = process.env.NODE_ENV !== "production" ? err?.stack : undefined;
    return NextResponse.json({ ok: false, error: message, stack }, { status: 500 });
  }
}
