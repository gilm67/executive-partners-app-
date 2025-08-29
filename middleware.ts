// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  // Only protect these paths:
  matcher: [
    "/api/jobs/create",
    "/api/jobs/activate",
    "/api/jobs/reindex",
  ],
};

export function middleware(req: NextRequest) {
  const token = req.headers.get("x-admin-token");
  const expected = process.env.JOBS_ADMIN_TOKEN || process.env.APP_ADMIN_TOKEN;
  if (!expected || token !== expected) {
    return new NextResponse(JSON.stringify({ ok: false, error: "Unauthorized" }), {
      status: 401,
      headers: { "content-type": "application/json" },
    });
  }
  return NextResponse.next();
}