import { google } from "googleapis";
import { DateTime } from "luxon";

/** ===== Env / Config ===== */
const SHEET_ID = process.env.SHEET_ID || process.env.GOOGLE_SHEET_ID || "";
const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL || "";
const PRIVATE_KEY =
  process.env.GOOGLE_PRIVATE_KEY_B64
    ? Buffer.from(process.env.GOOGLE_PRIVATE_KEY_B64, "base64").toString("utf8")
    : (process.env.GOOGLE_PRIVATE_KEY || "");

// Basic validation so errors are obvious
if (!SHEET_ID) {
  // Don’t throw at import time in Next; routes may still render
  // eslint-disable-next-line no-console
  console.warn("SHEET_ID/GOOGLE_SHEET_ID is not set.");
}
if (!CLIENT_EMAIL) {
  // eslint-disable-next-line no-console
  console.warn("GOOGLE_CLIENT_EMAIL is not set.");
}
if (!PRIVATE_KEY) {
  // eslint-disable-next-line no-console
  console.warn("GOOGLE_PRIVATE_KEY_B64/GOOGLE_PRIVATE_KEY is not set.");
}

/** ===== Types ===== */
export type Job = {
  ID: string;
  Title: string;
  Role: string;
  Location: string;
  Market: string;
  Seniority: string;
  Summary: string;
  Description: string;
  Confidential: string;
  Active: string;
  CreatedAt: string;
};

/** ===== Google Sheets client ===== */
export function getSheetsClient() {
  if (!SHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
    throw new Error(
      "Missing Google Sheets env (SHEET_ID/CLIENT_EMAIL/PRIVATE_KEY)."
    );
  }
  if (!PRIVATE_KEY.includes("BEGIN PRIVATE KEY")) {
    throw new Error(
      "Google private key looks invalid (missing BEGIN PRIVATE KEY)."
    );
  }

  const auth = new google.auth.JWT({
    email: CLIENT_EMAIL,
    key: PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });
  return { sheets, sheetId: SHEET_ID };
}

/** Helper: map headers case-insensitively */
function headerIndex(headers: string[], name: string) {
  const lower = name.toLowerCase();
  return headers.findIndex((h) => String(h || "").trim().toLowerCase() === lower);
}

/** ===== Read Jobs ===== */
export async function getJobs(): Promise<Job[]> {
  const { sheets, sheetId } = getSheetsClient();

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "Jobs!A1:Z1000",
    majorDimension: "ROWS",
  });

  const values = res.data.values || [];
  if (values.length === 0) return [];

  const headers = values[0].map((h) => String(h || "").trim());
  const rows = values.slice(1);

  // Find column indices
  const idx = {
    ID: headerIndex(headers, "ID"),
    Title: headerIndex(headers, "Title"),
    Role: headerIndex(headers, "Role"),
    Location: headerIndex(headers, "Location"),
    Market: headerIndex(headers, "Market"),
    Seniority: headerIndex(headers, "Seniority"),
    Summary: headerIndex(headers, "Summary"),
    Description: headerIndex(headers, "Description"),
    Confidential: headerIndex(headers, "Confidential"),
    Active: headerIndex(headers, "Active"),
    CreatedAt: headerIndex(headers, "CreatedAt"),
  };

  return rows.map((r) => ({
    ID: String(r[idx.ID] ?? ""),
    Title: String(r[idx.Title] ?? ""),
    Role: String(r[idx.Role] ?? ""),
    Location: String(r[idx.Location] ?? ""),
    Market: String(r[idx.Market] ?? ""),
    Seniority: String(r[idx.Seniority] ?? ""),
    Summary: String(r[idx.Summary] ?? ""),
    Description: String(r[idx.Description] ?? ""),
    Confidential: String(r[idx.Confidential] ?? ""),
    Active: String(r[idx.Active] ?? ""),
    CreatedAt: String(r[idx.CreatedAt] ?? ""),
  }));
}

/** ===== Slug helpers ===== */
function toKebab(s: string) {
  return s
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

export function jobSlug(job: Pick<Job, "ID" | "Title">) {
  const base = job.Title ? toKebab(job.Title) : "role";
  const id = job.ID || "";
  return `${base}-${id}`; // stable slug with ID baked in
}

// Convenience: some callers just want "id or slug"
export function idOrSlug(job: Pick<Job, "ID" | "Title">) {
  return jobSlug(job);
}

/** ===== Find single job by ID or slug ===== */
export async function getJobByIdOrSlug(key: string): Promise<Job | null> {
  const all = await getJobs();
  // Exact ID match
  const byId = all.find((j) => String(j.ID) === key);
  if (byId) return byId;

  // Slug match
  const bySlug = all.find((j) => jobSlug(j) === key);
  return bySlug || null;
}

/** ===== Append a new Job =====
 * Writes a new row with these headers:
 * ID, Title, Role, Location, Market, Seniority, Summary, Description, Confidential, Active, CreatedAt
 */
export async function appendJob(input: {
  title: string;
  role: string;
  location: string;
  market: string;
  seniority: string;
  summary: string;
  description: string;
  confidential: string;
}): Promise<string> {
  const { sheets, sheetId } = getSheetsClient();

  const id = Date.now().toString();
  const createdAt = DateTime.now().setZone("Europe/Zurich").toFormat("yyyy-MM-dd HH:mm:ss");

  const row = [
    id,
    input.title || "",
    input.role || "",
    input.location || "",
    input.market || "",
    input.seniority || "",
    input.summary || "",
    input.description || "",
    input.confidential || "",
    "FALSE", // default inactive; flip with /api/jobs/activate
    createdAt,
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: "Jobs!A1:Z1",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [row] },
  });

  return id;
}

/** Back-compat alias used by /api/jobs/create */
export const createJob = appendJob;
