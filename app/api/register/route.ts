import { google } from "googleapis";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { Readable } from "stream";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

function getEnv() {
  const sheetId = (process.env.GOOGLE_SHEET_ID || "").trim();
  const saEmail = (process.env.GOOGLE_CLIENT_EMAIL || "").trim();
  const saKey = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");

  const oauthClientId = (process.env.GOOGLE_OAUTH_CLIENT_ID || "").trim();
  const oauthClientSecret = (process.env.GOOGLE_OAUTH_CLIENT_SECRET || "").trim();
  const oauthRedirect = (process.env.GOOGLE_OAUTH_REDIRECT_URI || "").trim();
  const oauthRefresh = (process.env.GOOGLE_OAUTH_REFRESH_TOKEN || "").trim();

  const folderId = (process.env.GOOGLE_DRIVE_FOLDER_ID || "").trim();
  const openaiKey = (process.env.OPENAI_API_KEY || "").trim();

  return {
    sheetId,
    saEmail,
    saKey,
    oauthClientId,
    oauthClientSecret,
    oauthRedirect,
    oauthRefresh,
    folderId,
    openaiKey,
  };
}

function getSheetsAuth() {
  const { saEmail, saKey } = getEnv();
  if (!saEmail || !saKey)
    throw new Error("Missing service account env (GOOGLE_CLIENT_EMAIL/GOOGLE_PRIVATE_KEY)");
  return new google.auth.JWT({
    email: saEmail,
    key: saKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

function getOAuth2FromEnvOrFile() {
  const { oauthClientId, oauthClientSecret, oauthRedirect, oauthRefresh } = getEnv();
  if (!oauthClientId || !oauthClientSecret || !oauthRedirect)
    throw new Error("Missing Google OAuth env vars (CLIENT_ID/SECRET/REDIRECT_URI).");

  const oauth2 = new google.auth.OAuth2(oauthClientId, oauthClientSecret, oauthRedirect);

  if (oauthRefresh) {
    oauth2.setCredentials({ refresh_token: oauthRefresh });
    return oauth2;
  }

  const file = path.join(process.cwd(), ".tokens", "google-oauth.json");
  if (fs.existsSync(file)) {
    const tokens = JSON.parse(fs.readFileSync(file, "utf8"));
    if (tokens?.refresh_token) {
      oauth2.setCredentials({ refresh_token: tokens.refresh_token });
      return oauth2;
    }
  }
  throw new Error("No refresh token. Visit /api/google/oauth/start and authorize once.");
}

export async function GET() {
  const { sheetId, folderId, openaiKey } = getEnv();
  return NextResponse.json({
    ok: true,
    sheetId_present: !!sheetId,
    folderId_present: !!folderId,
    openai_present: !!openaiKey,
  });
}

async function uploadToDrive(file: File) {
  const { folderId } = getEnv();

  const buffer = Buffer.from(await file.arrayBuffer());
  const stream = Readable.from(buffer);

  const oauth2 = getOAuth2FromEnvOrFile();
  const drive = google.drive({ version: "v3", auth: oauth2 });

  const res = await drive.files.create({
    requestBody: {
      name: file.name || `cv_${Date.now()}`,
      mimeType: file.type || "application/octet-stream",
      parents: folderId ? [folderId] : undefined,
    },
    media: { mimeType: file.type || "application/octet-stream", body: stream },
    fields: "id, webViewLink",
  });

  const id = res.data.id;
  return {
    link: res.data.webViewLink || (id ? `https://drive.google.com/file/d/${id}/view` : ""),
    buffer,
    mime: file.type || "application/octet-stream",
  };
}

async function extractTextFromCV(buffer: Buffer, mime: string): Promise<string> {
  try {
    const m = mime.toLowerCase();

    // PDF
    if (m.includes("pdf")) {
      const pdfParse = (await import("pdf-parse")).default as any;
      const parsed = await pdfParse(buffer);
      return (parsed.text || "").trim();
    }

    // DOCX
    if (m.includes("wordprocessingml") || m.includes("docx")) {
      const mammoth = await import("mammoth");
      const { value } = await mammoth.extractRawText({ buffer });
      return (value || "").trim();
    }

    // Fallback to UTF-8 text
    return buffer.toString("utf8");
  } catch (e) {
    console.error("CV parse error:", e);
    return "";
  }
}

function buildAIPrompt(inputs: {
  form: {
    fullName: string;
    email: string;
    role: string;
    market: string;
    aum: string;
    mobility: string;
    notes: string;
  };
  cvText: string;
}) {
  const { form, cvText } = inputs;
  return `
You are an expert executive recruiter for private banking/wealth management. Analyse this candidate and return STRICT JSON only.

FORM INPUT:
Name: ${form.fullName}
Email: ${form.email}
Target Role: ${form.role}
Market: ${form.market}
AUM (self-reported): ${form.aum}
Mobility/Notice: ${form.mobility}
Notes: ${form.notes}

CV TEXT (may be empty):
${cvText.slice(0, 12000)}

Return JSON exactly like:
{
  "summary": "2-3 sentences: role/markets/portable book/strengths",
  "tags": ["Private Banker","CH Onshore","UHNWI"],
  "markets": ["CH Onshore","UK","US","GCC","Singapore","Hong Kong"],
  "languages": ["English","French","German"],
  "years_experience": 12,
  "aum_millions": 250,
  "match_score": 0-100
}
Strict JSON only.`;
}

async function aiAnalyse(form: any, cvText: string) {
  const { openaiKey } = getEnv();
  if (!openaiKey)
    return {
      summary: null,
      tags: [],
      markets: [],
      languages: [],
      years_experience: null,
      aum_millions: null,
      match_score: null,
    };

  try {
    const openai = new OpenAI({ apiKey: openaiKey });
    const resp = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        { role: "system", content: "You are a precise recruiting analyst. Output strict JSON only." },
        { role: "user", content: buildAIPrompt({ form, cvText }) },
      ],
    });

    const raw = (resp.choices?.[0]?.message?.content || "").trim();
    const s = raw.indexOf("{");
    const e = raw.lastIndexOf("}");
    const jsonText = s >= 0 && e > s ? raw.slice(s, e + 1) : raw;

    const p = JSON.parse(jsonText);
    return {
      summary: p.summary ?? null,
      tags: Array.isArray(p.tags) ? p.tags.slice(0, 10) : [],
      markets: Array.isArray(p.markets) ? p.markets : [],
      languages: Array.isArray(p.languages) ? p.languages : [],
      years_experience: Number.isFinite(p.years_experience) ? p.years_experience : null,
      aum_millions: Number.isFinite(p.aum_millions) ? p.aum_millions : null,
      match_score: Number.isFinite(p.match_score) ? p.match_score : null,
    };
  } catch (err) {
    console.error("OpenAI error:", err);
    // Fallback so upload + sheet still succeed
    return {
      summary: null,
      tags: [],
      markets: [],
      languages: [],
      years_experience: null,
      aum_millions: null,
      match_score: null,
    };
  }
}

// LinkedIn Search helper (ensure your sheet has this column after "CV Link")
function linkedInUrl(name: string, market: string) {
  const q = encodeURIComponent(`${name} ${market} Private Banking Wealth Management`);
  return `https://www.linkedin.com/search/results/people/?keywords=${q}`;
}

async function appendToSheet(values: any[]) {
  const { sheetId } = getEnv();
  if (!sheetId) throw new Error("GOOGLE_SHEET_ID missing");
  const auth = getSheetsAuth();
  const sheets = google.sheets({ version: "v4", auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Candidates!A1",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [values] },
  });
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const fullName = String(formData.get("fullName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const role = String(formData.get("role") || "").trim();
    const market = String(formData.get("market") || "").trim();
    const aum = String(formData.get("aum") || "").trim();
    const mobility = String(formData.get("mobility") || "").trim();
    const notes = String(formData.get("notes") || "").trim();
    const file = formData.get("cv") as File | null;

    if (!fullName || !email) {
      return NextResponse.json({ ok: false, error: "Name and email are required." }, { status: 400 });
    }

    // Upload + parse
    let driveLink = "";
    let cvText = "";
    if (file && file.size > 0) {
      const uploaded = await uploadToDrive(file);
      driveLink = uploaded.link || "";
      cvText = await extractTextFromCV(uploaded.buffer, uploaded.mime);
    }

    // AI analysis
    const ai = await aiAnalyse({ fullName, email, role, market, aum, mobility, notes }, cvText);
    const timestamp = new Date().toISOString();

    // LinkedIn Search (column right after CV Link)
    const liSearch = linkedInUrl(fullName, market);

    await appendToSheet([
      timestamp,             // 1  Timestamp
      fullName,              // 2  Name
      email,                 // 3  Email
      role,                  // 4  Role
      market,                // 5  Market
      aum,                   // 6  AUM
      mobility,              // 7  Mobility
      notes,                 // 8  Notes
      driveLink,             // 9  CV Link
      liSearch,              // 10 LinkedIn Search
      ai.summary || "",      // 11 AI Summary
      (ai.tags || []).join(", "), // 12 Tags
      ai.match_score ?? "",  // 13 Match Score
    ]);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Register API error:", err?.message || err);
    return NextResponse.json({ ok: false, error: String(err?.message || "Server error.") }, { status: 500 });
  }
}