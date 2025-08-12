// app/api/top-talent/logout/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  // Redirect back to the passcode screen
  const res = NextResponse.redirect(new URL("/top-talent", req.url));

  // Expire the tt_access cookie
  res.cookies.set({
    name: "tt_access",
    value: "",
    path: "/",
    maxAge: 0,
    sameSite: "lax",
    secure: true,
  });

  return res;
}
