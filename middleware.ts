import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (process.env.NEXT_PUBLIC_WELCOME_GATE !== "1") return NextResponse.next();

  const seen = req.cookies.get("ep_seen_welcome")?.value === "1";
  const url = req.nextUrl;
  if (url.pathname === "/" && !seen) {
    const res = NextResponse.redirect(new URL("/welcome", url));
    res.cookies.set("ep_seen_welcome", "1", { maxAge: 60 * 60 * 24, path: "/" });
    return res;
  }
  return NextResponse.next();
}

export const config = { matcher: ["/"] };
