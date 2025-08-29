// middleware.ts  (WWW project)
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// ✅ Only guard POST admin endpoints. Leave GET list/get/diag open.
export const config = {
  matcher: [
    "/api/jobs/create",
    "/api/jobs/activate",
    "/api/jobs/reindex",
  ],
};

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  // Constant-time-ish comparison to avoid early exit timing leaks
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export function middleware(req: NextRequest) {
  // Only enforce for POST. Let GET/HEAD/OPTIONS through (preflights, etc.)
  if (req.method !== "POST") return NextResponse.next();

  const token =
    req.headers.get("x-admin-token") ??
    req.headers.get("X-Admin-Token") ?? // some clients vary casing
    undefined;

  const expected = process.env.JOBS_ADMIN_TOKEN || process.env.APP_ADMIN_TOKEN;

  if (!expected || !token || !timingSafeEqual(token, expected)) {
    return new NextResponse(
      JSON.stringify({ ok: false, error: "Unauthorized" }),
      { status: 401, headers: { "content-type": "application/json" } }
    );
  }

  return NextResponse.next();
}