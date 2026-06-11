import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    const correctPassword = process.env.TALENT_BENCH_PASSWORD;

    if (!correctPassword) {
      return NextResponse.json(
        { error: "Server not configured" },
        { status: 500 }
      );
    }

    if (password === correctPassword) {
      const res = NextResponse.json({ success: true });
      res.cookies.set("ep_talent_bench_auth", "granted", {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
      return res;
    }

    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  } catch (err) {
    console.error("talent-bench-auth error", err);
    return NextResponse.json({ error: "Request failed" }, { status: 500 });
  }
}
