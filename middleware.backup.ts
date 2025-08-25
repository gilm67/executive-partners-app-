import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

// ✅ Use non-capturing group (?: ... ) and no capture groups
export const config = {
  matcher: [
    "/:path*",
  ],
};
