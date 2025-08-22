import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Example: pass-through middleware (add your logic if needed)
export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

// IMPORTANT: exclude system + SEO files so they don't get intercepted
export const config = {
  matcher: [
    // run on everything EXCEPT the following:
    "/((?!_next|api|favicon.ico|icon.png|og.png|robots.txt|sitemap.xml|.*\\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|map)).*)",
  ],
};
