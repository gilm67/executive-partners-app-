// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const BOT_RE = /(bot|crawler|spider|crawling|preview|facebookexternalhit|slackbot|twitterbot|bingbot|googlebot)/i;

export function middleware(req: NextRequest) {
  // Feature flag off → do nothing
  if (process.env.NEXT_PUBLIC_WELCOME_GATE !== "1") return NextResponse.next();

  const url = req.nextUrl;

  // Only act on the homepage
  if (url.pathname !== "/") return NextResponse.next();

  // Allow manual bypass: /?nowelcome=1
  if (url.searchParams.has("nowelcome")) return NextResponse.next();

  // Skip crawlers / link unfurlers (SEO + social)
  const ua = req.headers.get("user-agent") || "";
  if (BOT_RE.test(ua)) return NextResponse.next();

  // Already seen within the cookie window?
  const seen = req.cookies.get("ep_seen_welcome")?.value === "1";
  if (seen) return NextResponse.next();

  // First-time human visitor → redirect to /welcome and set a 24h cookie
  const res = NextResponse.redirect(new URL("/welcome", req.url));
  res.cookies.set("ep_seen_welcome", "1", {
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
    sameSite: "lax",
    secure: true,
    httpOnly: false, // client code doesn't need it; keep visible
  });
  return res;
}

// Only match the homepage (keeps the rest of the site untouched)
export const config = {
  matcher: ["/"],
};