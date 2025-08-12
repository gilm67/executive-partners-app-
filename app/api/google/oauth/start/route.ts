import { NextResponse, NextRequest } from "next/server";
import { google } from "googleapis";

export async function GET(req: NextRequest) {
  const id = process.env.GOOGLE_OAUTH_CLIENT_ID || "";
  const secret = process.env.GOOGLE_OAUTH_CLIENT_SECRET || "";
  const redirect = process.env.GOOGLE_OAUTH_REDIRECT_URI || "";
  if (!id || !secret || !redirect) {
    return NextResponse.json({ ok: false, error: "Missing OAuth env vars" }, { status: 500 });
  }

  // If you add ?force=1 to the URL, we’ll force re-consent (useful if a token was issued without refresh_token)
  const force = req.nextUrl.searchParams.get("force") === "1";

  const oauth2 = new google.auth.OAuth2(id, secret, redirect);
  const url = oauth2.generateAuthUrl({
    access_type: "offline",            // ask for refresh_token
    prompt: force ? "consent" : "consent", // force consent page so Google returns refresh_token
    include_granted_scopes: false,
    scope: [
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/drive.metadata.readonly",
    ],
  });

  return NextResponse.redirect(url);
}
