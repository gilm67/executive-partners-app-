import { NextResponse, NextRequest } from "next/server";
import { google } from "googleapis";
import fs from "node:fs";
import path from "node:path";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");
    if (!code) return NextResponse.json({ ok: false, error: "Missing code" }, { status: 400 });

    const id = process.env.GOOGLE_OAUTH_CLIENT_ID || "";
    const secret = process.env.GOOGLE_OAUTH_CLIENT_SECRET || "";
    const redirect = process.env.GOOGLE_OAUTH_REDIRECT_URI || "";
    if (!id || !secret || !redirect) {
      return NextResponse.json({ ok: false, error: "Missing OAuth env vars" }, { status: 500 });
    }

    const oauth2 = new google.auth.OAuth2(id, secret, redirect);
    const { tokens } = await oauth2.getToken(code);

    const dir = path.join(process.cwd(), ".tokens");
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "google-oauth.json"), JSON.stringify(tokens, null, 2));

    return NextResponse.json({
      ok: true,
      message: "Tokens saved to ./.tokens/google-oauth.json",
      has_refresh_token: !!tokens.refresh_token,
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
