import { NextResponse } from "next/server";

export const runtime = "nodejs";

const SHEET_ID = "1Osr2RrgQZqDjK28knSXlqNXqJk2rcaATLqE1Yjy_W0c";
const SHEET_NAME = "Sheet1";
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

function getScoreBucket(score: number) {
  if (score >= 75) return "A+ (Immediate move)";
  if (score >= 60) return "A (Strong portability)";
  if (score >= 40) return "B (Conditional portability)";
  return "C (Weak portability)";
}

async function getAccessToken(): Promise<string> {
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!;
  const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY!;
  const privateKey = privateKeyRaw.replace(/\\n/g, "\n");

  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: clientEmail,
    scope: SCOPES.join(" "),
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const encode = (obj: object) =>
    Buffer.from(JSON.stringify(obj)).toString("base64url");

  const signingInput = `${encode(header)}.${encode(payload)}`;

  const keyData = privateKey
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\s/g, "");

  const binaryKey = Buffer.from(keyData, "base64");
  const cryptoKey = await crypto.subtle.importKey(
    "pkcs8",
    binaryKey,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    cryptoKey,
    Buffer.from(signingInput)
  );

  const jwt = `${signingInput}.${Buffer.from(signature).toString("base64url")}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const tokenData = await tokenRes.json();
  if (!tokenData.access_token) {
    throw new Error("Failed to get Google access token: " + JSON.stringify(tokenData));
  }
  return tokenData.access_token;
}

async function appendToSheet(values: string[]) {
  const token = await getAccessToken();
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values: [values] }),
    }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Sheets API error: ${err}`);
  }
  return res.json();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, tool_name, score, input_data } = body;

    if (!email || !tool_name) {
      return NextResponse.json(
        { error: "Email and tool_name are required" },
        { status: 400 }
      );
    }

    const numericScore = Number(score || 0);
    const scoreBucket = getScoreBucket(numericScore);
    const market = input_data?.current_market || "N/A";
    const candidateName = input_data?.candidate_name || "—";
    const employer = input_data?.current_employer || "—";
    const aumM = input_data?.current_assets_m || "—";
    const committeeScore = input_data?.committee_score || "—";
    const timestamp = new Date().toLocaleString("en-GB", {
      timeZone: "Europe/Zurich",
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

    await appendToSheet([
      timestamp,
      email,
      candidateName,
      tool_name,
      String(numericScore),
      scoreBucket,
      market,
      employer,
      String(aumM),
      String(committeeScore),
    ]);

    try {
      const apiKey = process.env.RESEND_API_KEY;
      if (apiKey) {
        const { Resend } = await import("resend");
        const resend = new Resend(apiKey);
        await resend.emails.send({
          from: "EP Tools <noreply@auth.execpartners.ch>",
          to: "gil.chalem@execpartners.ch",
          subject: `New tool lead — ${tool_name} — ${email}`,
          html: `<p><b>${candidateName}</b> (${email}) completed <b>${tool_name}</b> at ${timestamp}</p><p>Market: ${market} | AUM: ${aumM}M | Score: ${numericScore} (${scoreBucket}) | Committee: ${committeeScore}/100</p><p>Employer: ${employer}</p><p><a href="https://docs.google.com/spreadsheets/d/${SHEET_ID}">View in Google Sheet</a></p>`,
        });
      }
    } catch { /* silent fail on email */ }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("tool-leads error:", error);
    return NextResponse.json({ success: true, warning: "logging_failed" });
  }
}

export async function GET() {
  try {
    await appendToSheet([
      "Timestamp", "Email", "Name", "Tool", "Score",
      "Score Bucket", "Market", "Employer", "AUM (M)", "Committee Score"
    ]);
    return NextResponse.json({ ok: true, message: "Headers added to sheet" });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
