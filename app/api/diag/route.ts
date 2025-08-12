import { NextResponse } from "next/server";
export const runtime = "nodejs";
export async function GET() {
  const sheet = (process.env.GOOGLE_SHEET_ID || "").trim();
  const drive = (process.env.GOOGLE_DRIVE_FOLDER_ID || "").trim();
  const email = (process.env.GOOGLE_CLIENT_EMAIL || "").trim();
  return NextResponse.json({
    ok: true,
    GOOGLE_SHEET_ID_present: !!sheet,
    GOOGLE_SHEET_ID_preview: sheet ? sheet.slice(0,6) + "…" : null,
    GOOGLE_DRIVE_FOLDER_ID_present: !!drive,
    GOOGLE_DRIVE_FOLDER_ID_preview: drive ? drive.slice(0,6) + "…" : null,
    GOOGLE_CLIENT_EMAIL_present: !!email,
  });
}
