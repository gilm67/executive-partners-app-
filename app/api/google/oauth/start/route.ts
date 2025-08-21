import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI } = process.env;

  // If any missing → politely disable OAuth (no crashes)
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REDIRECT_URI) {
    return NextResponse.json(
      {
        ok: false,
        error: "Google OAuth is disabled on this deployment.",
        hint: "Set GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET/GOOGLE_REDIRECT_URI to enable.",
      },
      { status: 501 }
    );
  }

  // (Optional: if you implement later, generate auth URL here)
  return NextResponse.json({ ok: false, error: "Not implemented yet." }, { status: 501 });
}
