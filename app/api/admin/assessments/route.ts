import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const SHEET_ID = "1Osr2RrgQZqDjK28knSXlqNXqJk2rcaATLqE1Yjy_W0c";
const ASSESSMENTS_SHEET = "Assessments";
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

async function getGoogleToken(): Promise<string> {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!;
  const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY!;
  const privateKey = privateKeyRaw.replace(/\n/g, "\n");
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = { iss: clientEmail, scope: SCOPES.join(" "), aud: "https://oauth2.googleapis.com/token", exp: now + 3600, iat: now };
  const encode = (obj: object) => Buffer.from(JSON.stringify(obj)).toString("base64url");
  const signingInput = `${encode(header)}.${encode(payload)}`;
  const keyData = privateKey.replace("-----BEGIN PRIVATE KEY-----", "").replace("-----END PRIVATE KEY-----", "").replace(/\s/g, "");
  const binaryKey = Buffer.from(keyData, "base64");
  const cryptoKey = await crypto.subtle.importKey("pkcs8", binaryKey, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", cryptoKey, Buffer.from(signingInput));
  const jwt = `${signingInput}.${Buffer.from(signature).toString("base64url")}`;
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt }),
  });
  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) throw new Error("Failed to get Google access token");
  return tokenData.access_token;
}

export async function GET(req: NextRequest) {
  try {
    const auth = req.headers.get("x-ep-admin");
    if (auth !== process.env.TALENT_BENCH_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = await getGoogleToken();
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${ASSESSMENTS_SHEET}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Sheets read error: ${err}`);
    }

    const data = await res.json();
    const rows: string[][] = data.values || [];

    // Skip header row, reverse so newest first
    const assessments = rows.slice(1).reverse().map((row: string[]) => ({
      timestamp: row[0] || "",
      name: row[1] || "",
      email: row[2] || "",
      institution: row[3] || "",
      market: row[4] || "",
      aum: row[5] || "",
      roa: row[6] || "",
      portability: row[7] || "",
      epScore: row[8] || "",
      token: row[9] || "",
      analysisSummary: row[10] || "",
    }));

    return NextResponse.json({ success: true, assessments, total: assessments.length });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// GET with init=true initialises headers
export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get("x-ep-admin");
    if (auth !== process.env.TALENT_BENCH_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const token = await getGoogleToken();
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${ASSESSMENTS_SHEET}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ values: [["Timestamp", "Name", "Email", "Institution", "Market", "AUM", "ROA", "Portability", "EP Score", "Token", "Analysis Summary"]] }),
      }
    );
    return NextResponse.json({ ok: true, message: "Assessments headers added" });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
