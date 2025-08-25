import { NextResponse, type NextRequest } from "next/server";

/**
 * Run on every path and skip excluded ones at runtime.
 * (No regex capturing groups in config.matcher anymore.)
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip Next internals, API routes, and common static assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    /\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|map)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  // your logic here (currently pass-through)
  return NextResponse.next();
}

/** IMPORTANT: no capturing groups here */
export const config = {
  matcher: ["/:path*"],
};
