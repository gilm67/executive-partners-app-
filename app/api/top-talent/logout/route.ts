// app/api/top-talent/logout/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const res = NextResponse.redirect(new URL("/top-talent", req.url));
  res.cookies.set({
    name: "tt_access",
    value: "",
    path: "/",
    maxAge: 0,
    sameSite: "lax",
    secure: true, // keep true on Vercel (HTTPS)
  });
  return res;
}

