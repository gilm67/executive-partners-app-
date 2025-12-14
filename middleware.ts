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

  // ✅ ONLY handle the root /portability route (no /private logic here)
  if (pathname !== "/portability") {
    return NextResponse.next();
  }

  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}/portability`;

  return NextResponse.redirect(url);
}

// ✅ Run middleware ONLY for the exact path we need
export const config = {
  matcher: ["/portability"],
};