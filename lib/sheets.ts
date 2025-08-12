// lib/sheets.ts
import { google } from "googleapis";

/* ========= Google Sheets Auth ========= */
function getSheetsAuth() {
  const email = process.env.GOOGLE_CLIENT_EMAIL || "";

  // Accept either:
  //  - normal escaped key: -----BEGIN... \n ...END-----
  //  - base64-encoded key (we detect and decode)
  let rawKey = process.env.GOOGLE_PRIVATE_KEY || "";
  if (!rawKey) throw new Error("Missing GOOGLE_PRIVATE_KEY");

  const looksBase64 = /^[A-Za-z0-9+/=\s]+$/.test(rawKey) && !rawKey.includes("BEGIN");
  if (looksBase64) {
    try {
      rawKey = Buffer.from(rawKey.trim(), "base64").toString("utf8");
    } catch {
      // ignore; will try as-is with \n
    }
  }
  const key = rawKey.replace(/\\n/g, "\n");

  if (!email || !key) {
    throw new Error("Missing GOOGLE_CLIENT_EMAIL/GOOGLE_PRIVATE_KEY");
  }

  return new google.auth.JWT({
    email,
    key,
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets", // read + write
    ],
  });
}

/* ========= Candidates ========= */
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
  Tags: string;
  "Match Score": string | number;
  Shortlist?: string;
};

const CANDIDATES_TAB = "Candidates";

export async function getCandidates(): Promise<Candidate[]> {
  const sheetId = process.env.GOOGLE_SHEET_ID || "";
  if (!sheetId) throw new Error("GOOGLE_SHEET_ID missing");

  const sheets = google.sheets({ version: "v4", auth: getSheetsAuth() });
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
    headers.forEach((h, i) => {
      o[h] = r[i] ?? "";
    });
    const ms = Number(o["Match Score"]);
    o["Match Score"] = Number.isFinite(ms) ? ms : o["Match Score"];
    return o as Candidate;
  });

  return list;
}

/** Ensure a header exists in row 1; returns its 1-based column index. */
export async function ensureHeader(headerName: string): Promise<number> {
  const sheetId = process.env.GOOGLE_SHEET_ID || "";
  if (!sheetId) throw new Error("GOOGLE_SHEET_ID missing");

  const sheets = google.sheets({ version: "v4", auth: getSheetsAuth() });

  const resp = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${CANDIDATES_TAB}!1:1`,
  });
  const headers = (resp.data.values?.[0] || []) as string[];

  const idx = headers.findIndex(
    (h) => (h || "").trim().toLowerCase() === headerName.trim().toLowerCase()
  );
  if (idx >= 0) return idx + 1;

  const newHeaders = [...headers, headerName];
  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: `${CANDIDATES_TAB}!1:1`,
    valueInputOption: "RAW",
    requestBody: { values: [newHeaders] },
  });
  return newHeaders.length;
}

/** Update the “Shortlist” cell for a row identified by (Timestamp, Email). */
export async function updateShortlistCell(
  email: string,
  timestamp: string,
  value: "YES" | "NO"
): Promise<void> {
  const sheetId = process.env.GOOGLE_SHEET_ID || "";
  if (!sheetId) throw new Error("GOOGLE_SHEET_ID missing");

  const sheets = google.sheets({ version: "v4", auth: getSheetsAuth() });

  // ensure target column exists
  const shortlistCol = await ensureHeader("Shortlist");

  // read full grid to find the row
  const resp = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${CANDIDATES_TAB}!A1:ZZ10000`,
  });
  const rows = resp.data.values || [];
  if (rows.length < 2) throw new Error("No candidate rows.");

  const headers = rows[0] as string[];
  const tsIdx = headers.findIndex((h) => (h || "").toLowerCase() === "timestamp");
  const emailIdx = headers.findIndex((h) => (h || "").toLowerCase() === "email");
  if (tsIdx < 0 || emailIdx < 0)
    throw new Error("Sheet must contain 'Timestamp' and 'Email' headers.");

  let rowNumber = -1; // 1-based
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

  const a1 = `${CANDIDATES_TAB}!${colNumberToLetters(shortlistCol)}${rowNumber}`;
  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: a1,
    valueInputOption: "RAW",
    requestBody: { values: [[value]] },
  });
}

function colNumberToLetters(n: number): string {
  let s = "";
  while (n > 0) {
    const m = (n - 1) % 26;
    s = String.fromCharCode(65 + m) + s;
    n = Math.floor((n - 1) / 26);
  }
  return s;
}

/* ========= Jobs ========= */
export type Job = {
  ID?: string;
  Title: string;          // optional if your sheet uses “Role”; we’ll map below
  Role?: string;          // supports legacy “Role” header
  Location?: string;
  Market?: string;
  Seniority?: string;
  Summary?: string;
  Description?: string;
  Active?: string;
  Confidential?: string;
};

function toBool(v: unknown): boolean {
  if (typeof v === "boolean") return v;
  const s = String(v ?? "").trim().toLowerCase();
  return s === "true" || s === "yes" || s === "1";
}

export async function getJobs(): Promise<Job[]> {
  const sheetId = process.env.GOOGLE_SHEET_ID || "";
  if (!sheetId) throw new Error("GOOGLE_SHEET_ID missing");

  const sheets = google.sheets({ version: "v4", auth: getSheetsAuth() });
  const resp = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "Jobs!A1:Z1000",
  });

  const rows = resp.data.values || [];
  if (rows.length < 2) return [];

  const headers = rows[0] as string[];
  const data = rows.slice(1);

  const list = data.map((r) => {
    const o: Record<string, string> = {};
    headers.forEach((h, i) => (o[h] = r[i] ?? ""));

    // normalize Title from Role if needed
    if (!o["Title"] && o["Role"]) o["Title"] = o["Role"];

    return o as unknown as Job;
  });

  const active = list.filter((j) => toBool(j.Active));
  // newer first by numeric ID if possible
  active.sort((a, b) => {
    const an = Number(a.ID);
    const bn = Number(b.ID);
    if (Number.isFinite(an) && Number.isFinite(bn)) return bn - an;
    return String(b.ID ?? "").localeCompare(String(a.ID ?? ""));
  });

  return active;
}

export function jobSlug(j: Job) {
  const base =
    (j.ID && String(j.ID).trim()) ||
    `${j.Title || j.Role || ""}-${j.Location || ""}`;
  return String(base)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function getJobByIdOrSlug(idOrSlug: string): Promise<Job | null> {
  const all = await getJobs();
  const byId = all.find((j) => (j.ID || "").toString() === idOrSlug);
  if (byId) return byId;
  const bySlug = all.find((j) => jobSlug(j) === idOrSlug);
  return bySlug || null;
}


