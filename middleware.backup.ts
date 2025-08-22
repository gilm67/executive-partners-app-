import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Protect /top-talent and its APIs with a simple cookie gate.
 * Cookie is set by POST /api/top-talent/auth and cleared by /api/top-talent/logout.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Paths to protect (add/remove as you like)
  const protectedPaths = [
    "/top-talent",
    "/api/candidates", // enables API protection too
  ];
  const isProtected = protectedPaths.some((p) => pathname === p || pathname.startsWith(p + "/"));

  if (!isProtected) return NextResponse.next();

  // Allow health checks/public stuff through
  if (pathname.startsWith("/api/diag") || pathname.startsWith("/health")) {
    return NextResponse.next();
  }

  const cookie = req.cookies.get("tt_pass");
  const authed = !!cookie?.value;

  if (authed) return NextResponse.next();

  // Not authed: if it's an API request, return 401 JSON; otherwise render the page (it already shows a passcode form)
  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

// Limit the middleware to only the areas we care about (small perf win)
export const config = {
  matcher: ["/top-talent/:path*", "/api/candidates/:path*", "/health", "/api/diag"],
};
