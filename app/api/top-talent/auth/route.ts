import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const pass = String(body.pass || "");
    const expected = process.env.TOP_TALENT_PASSCODE || "";

    if (!expected) {
      return NextResponse.json({ ok: false, error: "Server missing TOP_TALENT_PASSCODE" }, { status: 500 });
    }
    if (pass !== expected) {
      return NextResponse.json({ ok: false, error: "Invalid passcode" }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });
    // Signalling cookie: value can be anything non-empty
    res.cookies.set("tt_pass", "1", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      // secure: true, // enable when on HTTPS
      maxAge: 60 * 60 * 8, // 8h
    });
    return res;
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Server error" }, { status: 500 });
  }
}
