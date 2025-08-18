// app/api/candidates/shortlist/route.ts
import { NextResponse } from "next/server";
import { updateShortlistCell } from "@/lib/sheets";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body?.email || "").trim();
    const rawValue = String(body?.value || "").trim().toUpperCase();

    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Missing email" },
        { status: 400 }
      );
    }

    // Normalize value to YES/NO only
    const value = rawValue === "YES" ? "YES" : "NO";

    // IMPORTANT: call with **two** arguments (email, value)
    await updateShortlistCell(email, value);

    return NextResponse.json({ ok: true, method: "POST", email, value });
  } catch (err: any) {
    console.error("Shortlist API error:", err?.message || err);
    return NextResponse.json(
      { ok: false, error: err?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

