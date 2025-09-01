import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/bp-simulator") {
    return NextResponse.redirect("https://executive-partners-bp-simulator.streamlit.app", 308);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/bp-simulator"] };
