import { NextResponse } from "next/server";
import { updateShortlistCell } from "../../../../lib/sheets";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { email, timestamp, value } = await req.json();
    const v = String(value || "").toUpperCase();
    if (!email || !timestamp || (v !== "YES" && v !== "NO")) {
      return NextResponse.json({ ok: false, error: "Invalid payload." }, { status: 400 });
    }

    await updateShortlistCell(String(email), String(timestamp), v as "YES" | "NO");
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Shortlist API error:", err?.message || err);
    return NextResponse.json({ ok: false, error: String(err?.message || "Server error.") }, { status: 500 });
  }
}
