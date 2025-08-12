import { google } from "googleapis";

/* =========================
   Google Sheets Auth
   ========================= */
export function getSheetsAuth() {
  const email = process.env.GOOGLE_CLIENT_EMAIL || "";

  // Prefer base64-encoded key on Vercel; fallback to \n-escaped plaintext locally
  let key = "";
  if (process.env.GOOGLE_PRIVATE_KEY_B64) {
    key = Buffer.from(process.env.GOOGLE_PRIVATE_KEY_B64, "base64").toString("utf8");
  } else if (process.env.GOOGLE_PRIVATE_KEY) {
    key = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  }

  if (!email || !key) {
    throw new Error("Missing GOOGLE_CLIENT_EMAIL or GOOGLE_PRIVATE_KEY(_B64)");
  }

  return new google.auth.JWT({
    email,
    key,
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets", // read + write
    ],
  });
}

/* =========================
   Candidates
   ========================= */
export type Candidate = {
  Timestamp: string;
  Name: string;
  Email: string;
  Role: string;
  Market: string;
  AUM: string;
  Mobility: string;
  Notes: string;
  "CV Link": string;
  "LinkedIn Search": string;
  "AI Summary": string;
  Tags: string;                  // header must be "Tags"
  "Match Score": string | number;
  Shortlist?: string;            // "YES"/"NO" (may be missing initially)
};

const CANDIDATES_TAB = "Candidates";

export async function getCandidates(): Promise<Candidate[]> {
  const sheetId = process.env.GOOGLE_SHEET_ID || "";
  if (!sheetId) throw new Error("GOOGLE_SHEET_ID missing");

  const auth = getSheetsAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const resp = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${CANDIDATES_TAB}!A1:ZZ10000`,
  });

  const rows = resp.data.values || [];
  if (rows.length < 2) return [];

  const headers = rows[0] as string[];
  const data = rows.slice(1);

  const list = data.map((r) => {
    const o: Record<string, any> = {};
    headers.forEach((h, i) => (o[h] = r[i] ?? ""));
    const ms = Number(o["Match Score"]);
    o["Match Score"] = Number.isFinite(ms) ? ms : o["Match Score"];
    return o as Candidate;
  });

  return list;
}

/** Ensure a header exists on the first row; returns its 1-based column index. */
export async function ensureHeader(headerName: string): Promise<number> {
  const sheetId = process.env.GOOGLE_SHEET_ID || "";
  if (!sheetId) throw new Error("GOOGLE_SHEET_ID missing");

  const auth = getSheetsAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const headersResp = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${CANDIDATES_TAB}!1:1`,
  });
  const headers = (headersResp.data.values?.[0] || []) as string[];

  let idx = headers.findIndex(
    (h) => (h || "").trim().toLowerCase() === headerName.trim().toLowerCase()
  );
  if (idx >= 0) return idx + 1;

  // append new header
  const newHeaders = [...headers, headerName];
  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: `${CANDIDATES_TAB}!1:1`,
    valueInputOption: "RAW",
    requestBody: { values: [newHeaders] },
  });
  return newHeaders.length; // 1-based
}

/** Convert 1-based column number to letters (1 -> A, 28 -> AB) */
function colNumberToLetters(n: number): string {
  let s = "";
  while (n > 0) {
    const m = (n - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

/**
 * Update the “Shortlist” cell for a row identified by (Timestamp, Email).
 * Creates the “Shortlist” header if missing.
 */
export async function updateShortlistCell(
  email: string,
  timestamp: string,
  value: "YES" | "NO"
): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEET_ID || "";
  if (!sheetId) throw new Error("GOOGLE_SHEET_ID missing");

  const auth = getSheetsAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const shortlistCol = await ensureHeader("Shortlist");

  const resp = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${CANDIDATES_TAB}!A1:ZZ10000`,
  });
  const rows = resp.data.values || [];
  if (rows.length < 2) throw new Error("No candidate rows.");

  const headers = rows[0] as string[];
  const tsIdx = headers.findIndex((h) => (h || "").toLowerCase() === "timestamp");
  const emailIdx = headers.findIndex((h) => (h || "").toLowerCase() === "email");
  if (tsIdx < 0 || emailIdx < 0) throw new Error("Sheet must have 'Timestamp' and 'Email' headers.");

  // find matching row (2+)
  let rowNumber = -1;
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i] || [];
    const ts = (row[tsIdx] || "").toString().trim();
    const em = (row[emailIdx] || "").toString().trim();
    if (ts === timestamp && em === email) {
      rowNumber = i + 1;
      break;
    }
  }
  if (rowNumber < 0) throw new Error("Row not found for given email/timestamp.");

  const col = colNumberToLetters(shortlistCol);
  const a1 = `${CANDIDATES_TAB}!${col}${rowNumber}`;
  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: a1,
    valueInputOption: "RAW",
    requestBody: { values: [[value]] },
  });
}

/* =========================
   Jobs
   ========================= */
export type Job = {
  ID?: string;
  Title?: string;          // optional: some tabs use Title instead of Role
  Role?: string;
  Location?: string;
  Market?: string;
  Seniority?: string;
  Summary?: string;
  Description?: string;
  Confidential?: string;   // "YES"/"NO"
  Active?: string;         // "TRUE"/"FALSE"
};

function toBool(v: unknown): boolean {
  if (typeof v === "boolean") return v;
  const s = String(v ?? "").trim().toLowerCase();
  return s === "true" || s === "yes" || s === "1";
}

/** Reads "Jobs" tab and returns ACTIVE jobs only (Active == TRUE/YES/1). */
export async function getJobs(): Promise<Job[]> {
  const sheetId = process.env.GOOGLE_SHEET_ID || "";
  if (!sheetId) throw new Error("GOOGLE_SHEET_ID missing");

  const auth = getSheetsAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const resp = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `Jobs!A1:ZZ1000`,
  });

  const rows = resp.data.values || [];
  if (rows.length < 2) return [];

  const headers = rows[0] as string[];
  const data = rows.slice(1);

  const list = data.map((r) => {
    const o: Record<string, string> = {};
    headers.forEach((h, i) => (o[h] = r[i] ?? ""));
    return o as Job;
  });

  // Only active
  const active = list.filter((j) => toBool(j.Active));

  // Sort newest ID first when numeric; fallback string
  active.sort((a, b) => {
    const an = Number(a.ID);
    const bn = Number(b.ID);
    if (Number.isFinite(an) && Number.isFinite(bn)) return bn - an;
    return String(b.ID || "").localeCompare(String(a.ID || ""));
  });

  return active;
}

export function jobSlug(j: Job) {
  const base =
    (j.ID && String(j.ID).trim().length > 0 ? String(j.ID) : `${j.Title || j.Role || ""}-${j.Location || ""}`) ||
    "";
  return base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function getJobByIdOrSlug(idOrSlug: string): Promise<Job | null> {
  const all = await getJobs();
  // direct ID match
  let match = all.find((j) => (j.ID || "").toString() === idOrSlug);
  if (match) return match;
  // slug match
  match = all.find((j) => jobSlug(j) === idOrSlug);
  return match || null;
}
// ---------- Create Job (append to "Jobs" tab") ----------
export type NewJobInput = {
  Title?: string;        // or use Role if your sheet uses that column
  Role?: string;
  Location?: string;
  Market?: string;
  Seniority?: string;
  Summary?: string;
  Description?: string;
  Confidential?: string; // "YES"/"NO"
  Active?: string;       // "TRUE"/"FALSE"
};

export async function createJob(input: NewJobInput): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const sheetId = process.env.GOOGLE_SHEET_ID || "";
  if (!sheetId) return { ok: false, error: "GOOGLE_SHEET_ID missing" };

  const auth = getSheetsAuth();
  const sheets = google.sheets({ version: "v4", auth });

  // Read header row to know the column order and the next ID
  const range = `Jobs!A1:ZZ1`;
  const headResp = await sheets.spreadsheets.values.get({ spreadsheetId: sheetId, range });
  const headers = (headResp.data.values?.[0] || []) as string[];

  // Ensure must-have columns exist
  const required = ["ID", "Title", "Role", "Location", "Market", "Seniority", "Summary", "Description", "Confidential", "Active"];
  const merged = Array.from(new Set([...headers, ...required]));
  if (merged.length !== headers.length) {
    // write updated headers back (adds missing ones)
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `Jobs!1:1`,
      valueInputOption: "RAW",
      requestBody: { values: [merged] },
    });
  }
  const cols = merged; // use final header order

  // Find next numeric ID (read a few rows)
  const idRange = `Jobs!A2:A1000`;
  const idResp = await sheets.spreadsheets.values.get({ spreadsheetId: sheetId, range: idRange });
  const ids = (idResp.data.values || []).map(r => Number(r?.[0])).filter(n => Number.isFinite(n)) as number[];
  const nextId = ids.length ? Math.max(...ids) + 1 : 101;

  // Build row by header order
  const row: string[] = cols.map((h) => {
    if (h === "ID") return String(nextId);
    const v =
      (input as any)[h] ??
      (h === "Title" ? input.Title ?? input.Role ?? "" :
       h === "Role" ? input.Role ?? input.Title ?? "" :
       h === "Confidential" ? (input.Confidential ?? "YES") :
       h === "Active" ? (input.Active ?? "TRUE") :
       "");
    return String(v ?? "");
  });

  // Append
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `Jobs!A:A`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });

  return { ok: true, id: String(nextId) };
}


