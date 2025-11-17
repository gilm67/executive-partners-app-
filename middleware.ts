// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED_LOCALES = ["en", "fr", "de"]; // adjust to what you actually use
const DEFAULT_LOCALE = "en";

function detectLocale(req: NextRequest): string {
  // 1) From cookie (if you use NEXT_LOCALE or similar)
  const cookieLocale = req.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2) From Accept-Language header
  const header = req.headers.get("accept-language");
  if (header) {
    const preferred = header
      .split(",")
      .map((part) => part.split(";")[0]?.trim())
      .filter(Boolean);

    for (const lang of preferred) {
      const base = lang.slice(0, 2).toLowerCase();
      if (SUPPORTED_LOCALES.includes(base)) return base;
    }
  }

  // 3) Fallback
  return DEFAULT_LOCALE;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only handle the root /portability route
  if (pathname === "/portability") {
    const locale = detectLocale(req);
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}/portability`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Limit middleware to paths we care about
export const config = {
  matcher: ["/portability"],
};