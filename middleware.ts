// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED_LOCALES = ["en", "fr", "de"] as const;
const DEFAULT_LOCALE: (typeof SUPPORTED_LOCALES)[number] = "en";

function detectLocale(req: NextRequest): string {
  const cookieLocale = req.cookies.get("NEXT_LOCALE")?.value?.toLowerCase();
  if (cookieLocale && (SUPPORTED_LOCALES as readonly string[]).includes(cookieLocale)) {
    return cookieLocale;
  }

  const header = req.headers.get("accept-language");
  if (header) {
    const preferred = header
      .split(",")
      .map((part) => part.split(";")[0]?.trim())
      .filter(Boolean);

    for (const lang of preferred) {
      const base = lang.slice(0, 2).toLowerCase();
      if ((SUPPORTED_LOCALES as readonly string[]).includes(base)) return base;
    }
  }

  return DEFAULT_LOCALE;
}

/**
 * ✅ Only allow INTERNAL safe redirect targets
 * - must start with "/"
 * - no "//", no scheme "://"
 * - strip hash/query
 */
function sanitizeNext(nextRaw: string | null): string {
  if (!nextRaw) return "";
  let next = nextRaw.trim();
  if (!next) return "";
  if (!next.startsWith("/")) return "";
  if (next.startsWith("//")) return "";
  if (next.includes("://")) return "";
  next = next.split("#")[0].split("?")[0];
  return next;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  /**
   * ✅ 1) PRIVATE AREA PROTECTION
   * Cookie name MUST match /api/magic-link/verify:
   * -> res.cookies.set("ep_private", ...)
   */
  if (pathname.startsWith("/private")) {
    const hasSession = !!req.cookies.get("ep_private")?.value;

    // ✅ IMPORTANT: auth flow must be PUBLIC (no session required)
    // Covers:
    // - /private/auth
    // - /private/auth/request
    // - /private/auth/request/sent
    // - /private/auth/verify (if any)
    const isAuthFlow = pathname === "/private/auth" || pathname.startsWith("/private/auth/");

    if (!hasSession && !isAuthFlow) {
      const url = req.nextUrl.clone();
      url.pathname = "/private/auth/request";

      // ✅ preserve intended destination safely
      const next = sanitizeNext(pathname);
      if (next) url.searchParams.set("next", next);

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

export const config = {
  matcher: ["/private/:path*", "/portability"],
};