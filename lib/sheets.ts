// lib/sheets.ts
import { googleEnvHealth, getSheetsClient } from "./google";

/**
 * =========
 *  Types
 * =========
 */

export type Job = {
  ID?: string;
  Title?: string;
  Role?: string;
  Location?: string;
  Market?: string;
  Seniority?: string;
  Summary?: string;
  Description?: string;
  Confidential?: string; // "YES" / "NO"
};

export type NewJobInput = {
  title: string;
  description: string;
  location?: string;
};

/**
 * =========
 *  Config
 * =========
 * You can override sheet/tab names by env if needed.
 */
const JOBS_SHEET_NAME =
  process.env.JOBS_SHEET_NAME?.trim() || "Jobs";
const CANDIDATES_SHEET_NAME =
  process.env.CANDIDATES_SHEET_NAME?.trim() || "Candidates";

/**
 * Utility to turn an A1 header row + rows of values into objects.
 */
function rowsToObjects<T extends Record<string, any>>(
  headers: string[],
  rows: any[][]
): T[] {
  return rows.map((r) => {
    const obj: Record<string, any> = {};
    headers.forEach((h, i) => {
      obj[h] = r[i] ?? "";
    });
    return obj as T;
  });
}

/**
 * Tiny slug helper used for job URLs.
 */
export function jobSlug(job: Job): string {
  const base = (job.Title || job.Role || "role")
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  // If there is an ID, include it to avoid collisions.
  return job.ID ? `${base}-${job.ID}` : base;
}

/**
 * =========
 *  Jobs
 * =========
 */

/**
 * Read all jobs from the "Jobs" sheet (A:Z).
 * Expects first row to be headers (e.g. ID, Title, Location, Summary, Description, ...)
 */
export async function getJobs(): Promise<Job[]> {
  const { sheets, sheetId } = getSheetsClient();
  const range = `${JOBS_SHEET_NAME}!A1:Z`;

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range,
    majorDimension: "ROWS",
  });

  const values = res.data.values || [];
  if (values.length === 0) return [];

  const headers = values[0].map((h) => String(h).trim());
  const rows = values.slice(1);
  const jobs = rowsToObjects<Job>(headers, rows);

  return jobs;
}

/**
 * Find a single job by numeric/string ID or by slug.
 */
export async function getJobByIdOrSlug(idOrSlug: string): Promise<Job | null> {
  const all = await getJobs();

  // Exact ID match (string compare)
  const byId = all.find((j) => String(j.ID || "").trim() === String(idOrSlug).trim());
  if (byId) return byId;

  // Slug match
  const bySlug = all.find((j) => jobSlug(j) === idOrSlug);
  return bySlug || null;
}

/**
 * Append a new job in the Jobs sheet.
 * We write a simple set of columns. If your header has more fields, Sheets will fill blanks.
 */
export async function createJob(input: NewJobInput): Promise<void> {
  const { sheets, sheetId } = getSheetsClient();

  // Generate a simple ID (timestamp). Replace if you have your own ID logic.
  const id = String(Date.now());

  // We’ll write columns in this order (make sure your Jobs sheet has these headers in row 1).
  // A:ID, B:Title, C:Location, D:Summary, E:Description, F:CreatedAt
  const headers = ["ID", "Title", "Location", "Summary", "Description", "CreatedAt"];

  // Try to find headers row and ensure columns exist (optional).
  // For simplicity, we assume the sheet is already set up with a header row.

  const row = [
    id,
    input.title,
    input.location || "",
    "", // Summary (optional; left empty)
    input.description,
    new Date().toISOString(),
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `${JOBS_SHEET_NAME}!A1:F1`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}

/**
 * ============
 *  Shortlist
 * ============
 * Update the "Shortlist" column for a candidate row located by Email.
 * Signature matches your route: updateShortlistCell(email, value).
 */
export async function updateShortlistCell(
  email: string,
  value: "YES" | "NO"
): Promise<void> {
  const { sheets, sheetId } = getSheetsClient();

  // Read candidates (we’ll search the Email column and Shortlist column)
  const range = `${CANDIDATES_SHEET_NAME}!A1:Z`;
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range,
    majorDimension: "ROWS",
  });
  const values = res.data.values || [];
  if (values.length === 0) throw new Error("Candidates sheet is empty");

  const headers = values[0].map((h) => String(h).trim());
  const rows = values.slice(1);

  const emailIdx = headers.findIndex((h) => h.toLowerCase() === "email");
  if (emailIdx === -1) throw new Error("No Email column in Candidates sheet");

  // Find "Shortlist" column (create if missing by falling back to a sensible default).
  let shortlistIdx = headers.findIndex((h) => h.toLowerCase() === "shortlist");
  if (shortlistIdx === -1) {
    // If no column, we can’t create columns via values API easily. Fail with a clear message.
    throw new Error(
      `No "Shortlist" column in ${CANDIDATES_SHEET_NAME}. Add a Shortlist header in row 1.`
    );
  }

  // locate the row index by email (case-insensitive)
  const rowIndex = rows.findIndex((r) => String(r[emailIdx] || "").trim().toLowerCase() === email.trim().toLowerCase());
  if (rowIndex === -1) {
    throw new Error(`Email ${email} not found`);
  }

  // Convert to A1 range for the single cell we want to update.
  // rowIndex + 2 (because data starts at row 2), column index is shortlistIdx (0-based) -> convert to letters.
  const targetRow = rowIndex + 2;
  const targetColLetter = indexToColumn(shortlistIdx); // A=0 -> "A", etc.

  const targetRange = `${CANDIDATES_SHEET_NAME}!${targetColLetter}${targetRow}:${targetColLetter}${targetRow}`;

  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: targetRange,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [[value]] },
  });
}

/** 0-based index to column letters (A, B, ... Z, AA, AB, ...) */
function indexToColumn(i: number): string {
  let s = "";
  i = Math.max(0, i); // safety
  while (true) {
    s = String.fromCharCode((i % 26) + 65) + s;
    if (i < 26) break;
    i = Math.floor(i / 26) - 1;
  }
  return s;
}

/**
 * =========
 *  Diag
 * =========
 * Re-export env health for /api/google/diag.
 */
export { googleEnvHealth };

/**
 * =========
 *  Legacy Compatibility
 * =========
 * Some older code imported `getSheetsAuth` from here. Provide a shim that returns the same
 * shape `{ sheets, sheetId }` as `getSheetsClient()`.
 */
export function getSheetsAuth() {
  return getSheetsClient();
}

