// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Only protect these write endpoints.
// Read endpoints (list/get/diag) must remain public for the pages to render.
const PROTECTED = new Set<string>([
  "/api/jobs/create",
  "/api/jobs/activate",
  "/api/jobs/reindex",
]);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // If it's not one of the protected paths, let it through.
  if (!PROTECTED.has(pathname)) {
    return NextResponse.next();
  }

  // Simple header-based admin token check.
  const incoming =
    req.headers.get("x-admin-token") || req.nextUrl.searchParams.get("token");

  if (incoming && incoming === process.env.JOBS_ADMIN_TOKEN) {
    return NextResponse.next();
  }

  return new NextResponse(JSON.stringify({ ok: false, error: "Unauthorized" }), {
    status: 401,
    headers: { "content-type": "application/json" },
  });
}

// Only run this middleware under /api/jobs/*
export const config = {
  matcher: ["/api/jobs/:path*"],
};