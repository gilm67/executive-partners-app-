import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const SHEET_ID = "1Osr2RrgQZqDjK28knSXlqNXqJk2rcaATLqE1Yjy_W0c";
const TOKENS_SHEET = "Tokens";

async function getGoogleToken(): Promise<string> {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || process.env.GOOGLE_CLIENT_EMAIL!;
  const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY!;
  const privateKey = privateKeyRaw.replace(/\\n/g, "\n");
  const now = Math.floor(Date.now() / 1000);
  const encode = (obj: object) => Buffer.from(JSON.stringify(obj)).toString("base64url");
  const si = `${encode({ alg: "RS256", typ: "JWT" })}.${encode({ iss: clientEmail, scope: "https://www.googleapis.com/auth/spreadsheets", aud: "https://oauth2.googleapis.com/token", exp: now + 3600, iat: now })}`;
  const kd = privateKey.replace("-----BEGIN PRIVATE KEY-----", "").replace("-----END PRIVATE KEY-----", "").replace(/\s/g, "");
  const ck = await crypto.subtle.importKey("pkcs8", Buffer.from(kd, "base64"), { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", ck, Buffer.from(si));
  const jwt = `${si}.${Buffer.from(sig).toString("base64url")}`;
  const tr = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt }) });
  const td = await tr.json();
  if (!td.access_token) throw new Error("No access token");
  return td.access_token;
}

async function lookupTokenInSheets(token: string) {
  const gToken = await getGoogleToken();
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${TOKENS_SHEET}`,
    { headers: { Authorization: `Bearer ${gToken}` } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  const rows: string[][] = data.values || [];
  // Find row where column A matches token
  const row = rows.find(r => r[0] === token);
  if (!row) return null;
  // Columns: token, candidateName, institution, mandate, market, hub/language, createdAt, tool/used, ...
  // portability tokens: token, name, institution, mandate, market, hub, createdAt, "portability", used
  // assessment tokens: token, name, institution, mandate, market, language, createdAt, used
  return {
    candidateName: row[1] || "",
    institution: row[2] || "",
    mandate: row[3] || "",
    market: row[4] || "",
    hub: row[5] || "",
  };
}

export async function GET(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    // 1. Try local JSON file first (assessment tokens)
    const tokensPath = path.join(process.cwd(), "data/assessment-tokens.json");
    if (fs.existsSync(tokensPath)) {
      const tokens = JSON.parse(fs.readFileSync(tokensPath, "utf-8"));
      const entry = tokens[params.token];
      if (entry) {
        return NextResponse.json({
          candidateName: entry.candidateName || "",
          institution: entry.institution || "",
          mandate: entry.mandate || "",
          market: entry.market || "",
          hub: entry.hub || "",
        });
      }
    }

    // 2. Fall back to Google Sheets (portability tokens + any sheet-based tokens)
    const sheetEntry = await lookupTokenInSheets(params.token);
    if (sheetEntry) {
      return NextResponse.json(sheetEntry);
    }

    return NextResponse.json({ error: "Invalid token" }, { status: 404 });
  } catch (e) {
    console.error("token-info error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
