import { NextResponse } from "next/server";
export function middleware(req: Request) {
  const url = new URL(req.url);
  if (url.pathname === "/bp-simulator" || url.pathname === "/bp-simulator/") {
    return NextResponse.redirect("https://executive-partners-bp-simulator.streamlit.app", 308);
  }
  return NextResponse.next();
}
export const config = { matcher: ["/bp-simulator", "/bp-simulator/"] };
