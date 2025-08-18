import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.redirect(new URL("/top-talent", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"));
  res.cookies.set("tt_pass", "", { path: "/", maxAge: 0 });
  return res;
}
