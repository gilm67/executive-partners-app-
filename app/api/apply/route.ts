// app/api/apply/route.ts
import { NextResponse } from "next/server";
import { appendApplication } from "@/lib/sheets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Accepts JSON and appends a row to the "Applications" sheet.
 * We accept either snake/space headers; the helper aligns to your real headers.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    // Basic sanity (optional)
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON body" },
        { status: 400 }
      );
    }

    // Pass straight through. The helper will map to your headers and add Timestamp.
    await appendApplication(body);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("❌ /api/apply error:", err?.message || err, err?.stack);
    return NextResponse.json(
      { ok: false, error: String(err?.message || err) },
      { status: 500 }
    );
  }
}


