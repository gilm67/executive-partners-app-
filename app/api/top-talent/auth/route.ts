import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const form = await req.formData();
  const pass = String(form.get("passcode") || "").trim();
  const expected = (process.env.TOP_TALENT_PASSCODE || "").trim();

  if (!expected) {
    return NextResponse.json({ ok: false, error: "Passcode not configured on server." }, { status: 500 });
  }
  if (pass !== expected) {
    return NextResponse.json({ ok: false, error: "Invalid passcode." }, { status: 401 });
  }

  const res = NextResponse.redirect(new URL("/top-talent", req.url));
  res.cookies.set("tt_access", "1", {
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
    sameSite: "lax",
    secure: false,       // change to true in production (HTTPS)
  });
  return res;
}
