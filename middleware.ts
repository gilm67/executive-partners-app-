// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = new URL(req.url);

  // 🚫 DO NOT redirect /bp-simulator — let Next.js serve our page
  if (url.pathname === "/bp-simulator" || url.pathname === "/bp-simulator/") {
    return NextResponse.next();
  }

  // ✅ Default behavior for everything else
  return NextResponse.next();
}

// Keep matcher so middleware still runs, but no redirect is applied
export const config = {
  matcher: ["/:path*"], // or remove entirely if you don’t need middleware
};
