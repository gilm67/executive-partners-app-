// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED_LOCALES = ["en", "fr", "de"] as const;
const DEFAULT_LOCALE: (typeof SUPPORTED_LOCALES)[number] = "en";

function detectLocale(req: NextRequest): string {
  // 1) Cookie
  const cookieLocale = req.cookies.get("NEXT_LOCALE")?.value?.toLowerCase();
  if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale as any)) {
    return cookieLocale;
  }

  // 2) Accept-Language header
  const header = req.headers.get("accept-language");
  if (header) {
    const preferred = header
      .split(",")
      .map((part) => part.split(";")[0]?.trim())
      .filter(Boolean);

    for (const lang of preferred) {
      const base = lang.slice(0, 2).toLowerCase();
      if (SUPPORTED_LOCALES.includes(base as any)) return base;
    }
  }

  // 3) Fallback
  return DEFAULT_LOCALE;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  /**
   * ✅ 1) PRIVATE AREA PROTECTION
   * Redirect to /private/auth/request when there is NO ep_private cookie.
   * Allow auth pages to be reached without session.
   */
  if (pathname.startsWith("/private")) {
    // ✅ FIX: cookie name must match what /api/magic-link/verify sets
    const hasSession = req.cookies.get("ep_private")?.value;

    // allow all auth routes
    const isAuthRoute = pathname.startsWith("/private/auth");

    if (!hasSession && !isAuthRoute) {
      const url = req.nextUrl.clone();
      url.pathname = "/private/auth/request";
      url.search = "";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  /**
   * ✅ 2) LOCALE REDIRECT FOR ROOT /portability ONLY
   * /portability -> /{locale}/portability
   */
  if (pathname === "/portability") {
    const locale = detectLocale(req);
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}/portability`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// ✅ Run middleware only where needed
export const config = {
  matcher: ["/private/:path*", "/portability"],
};