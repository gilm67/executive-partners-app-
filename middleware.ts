// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/** Normalize a pathname for stable matching (decode + strip trailing slash). */
function norm(pathname: string) {
  try {
    pathname = decodeURIComponent(pathname);
  } catch {
    // ignore decode errors and use raw
  }
  if (pathname.length > 1 && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }
  return pathname;
}

// Slugs to erase permanently (410 Gone)
const GONE = new Set<string>([
  "/jobs/senior-relationship-manager-ch-onshore-4",
  "/jobs/senior-relationship-manager-brazil-2",
  "/jobs/private-banker-mea-2",
].map(norm));

export function middleware(req: NextRequest) {
  const url = new URL(req.url);
  const path = norm(url.pathname);

  // 410 for permanently retired slugs
  if (GONE.has(path)) {
    return new NextResponse("Gone", {
      status: 410,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "x-robots-tag": "noindex, nofollow",
        "cache-control": "no-store",
      },
    });
  }

  // Otherwise continue
  return NextResponse.next();
}

/** Only run on jobs pages (safe, no complex regex). */
export const config = {
  matcher: ["/jobs/:path*"],
};