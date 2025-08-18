// re-export the google sheets client so routes can import from "@/lib/sheets"
export { getSheetsClient } from "./google";
// lib/sheets.ts
import { googleEnvHealth, getSheetsClient } from "./google";

/**
 * =================
 * Types
 * =================
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
  Confidential?: string; // "YES" | "NO"
};

export type NewJobInput = {
  title: string;
  description: string;
  location?: string;
};

export type Candidate = Record<string, string>;
export type Application = Record<string, string>;

/**
 * =================
 * Sheet names (override via env if needed)
 * =================
 */
const JOBS_SHEET_NAME = process.env.JOBS_SHEET_NAME?.trim() || "Jobs";
const CANDIDATES_SHEET_NAME =
  process.env.CANDIDATES_SHEET_NAME?.trim() || "Candidates";
const APPLICATIONS_SHEET_NAME =
  process.env.APPLICATIONS_SHEET_NAME?.trim() || "Applications";

/**
 * Convert header row + values to array of objects
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
 * A1 utils
 */
function indexToColumn(i: number): string {
  let s = "";
  i = Math.max(0, i);
  while (true) {
    s = String.fromCharCode((i % 26) + 65) + s;
    if (i < 26) break;
    i = Math.floor(i / 26) - 1;
  }
  return s;
}

/**
 * =================
 * Jobs
 * =================
 */
export function jobSlug(job: Job): string {
  const base = (job.Title || job.Role || "role")
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return job.ID ? `${base}-${job.ID}` : base;
}

export async function getJobs(): Promise<Job[]> {
  const { sheets, sheetId } = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${JOBS_SHEET_NAME}!A1:Z`,
    majorDimension: "ROWS",
  });
  const values = res.data.values || [];
  if (values.length === 0) return [];
  const headers = values[0].map((h) => String(h).trim());
  const rows = values.slice(1);
  return rowsToObjects<Job>(headers, rows);
}

export async function getJobByIdOrSlug(idOrSlug: string): Promise<Job | null> {
  const all = await getJobs();
  const byId = all.find(
    (j) => String(j.ID || "").trim() === String(idOrSlug).trim()
  );
  if (byId) return byId;
  const bySlug = all.find((j) => jobSlug(j) === idOrSlug);
  return bySlug || null;
}

export async function createJob(input: NewJobInput): Promise<void> {
  const { sheets, sheetId } = getSheetsClient();
  const id = String(Date.now());

  // Expected headers in row 1 (at least these): ID, Title, Location, Summary, Description, CreatedAt
  const row = [
    id,
    input.title,
    input.location || "",
    "", // Summary (optional)
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
 * =================
 * Candidates
 * =================
 */
export async function getCandidates(): Promise<Candidate[]> {
  const { sheets, sheetId } = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${CANDIDATES_SHEET_NAME}!A1:Z`,
    majorDimension: "ROWS",
  });
  const values = res.data.values || [];
  if (values.length === 0) return [];
  const headers = values[0].map((h) => String(h).trim());
  const rows = values.slice(1);
  return rowsToObjects<Candidate>(headers, rows);
}

/**
 * Update "Shortlist" for a candidate looked up by Email.
 * Two-argument signature matches your API route.
 */
export async function updateShortlistCell(
  email: string,
  value: "YES" | "NO"
): Promise<void> {
  const { sheets, sheetId } = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${CANDIDATES_SHEET_NAME}!A1:Z`,
    majorDimension: "ROWS",
  });
  const values = res.data.values || [];
  if (values.length === 0) throw new Error("Candidates sheet is empty");

  const headers = values[0].map((h) => String(h).trim());
  const rows = values.slice(1);

  const emailIdx = headers.findIndex((h) => h.toLowerCase() === "email");
  if (emailIdx === -1) throw new Error('No "Email" column in Candidates');

  const shortlistIdx = headers.findIndex(
    (h) => h.toLowerCase() === "shortlist"
  );
  if (shortlistIdx === -1) {
    throw new Error(
      `No "Shortlist" column in ${CANDIDATES_SHEET_NAME}. Add "Shortlist" to header row.`
    );
  }

  const rowIndex = rows.findIndex(
    (r) =>
      String(r[emailIdx] || "").trim().toLowerCase() ===
      email.trim().toLowerCase()
  );
  if (rowIndex === -1) {
    throw new Error(`Email ${email} not found`);
  }

  const targetRow = rowIndex + 2; // +2 for header offset
  const targetCol = indexToColumn(shortlistIdx);
  const targetRange = `${CANDIDATES_SHEET_NAME}!${targetCol}${targetRow}:${targetCol}${targetRow}`;

  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: targetRange,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [[value]] },
  });
}

/**
 * =================
 * Applications
 * =================
 */
export async function getApplications(): Promise<Application[]> {
  const { sheets, sheetId } = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${APPLICATIONS_SHEET_NAME}!A1:Z`,
    majorDimension: "ROWS",
  });
  const values = res.data.values || [];
  if (values.length === 0) return [];
  const headers = values[0].map((h) => String(h).trim());
  const rows = values.slice(1);
  return rowsToObjects<Application>(headers, rows);
}

/**
 * Append an application row. We accept a generic record so the API route
 * can pass whatever keys it collects; any missing headers will be added
 * to the right automatically by Sheets.
 */
export async function appendApplication(
  fields: Record<string, any>
): Promise<void> {
  const { sheets, sheetId } = getSheetsClient();

  // Read headers (row 1). If missing, create a simple default header set.
  const read = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${APPLICATIONS_SHEET_NAME}!A1:Z1`,
    majorDimension: "ROWS",
  });

  let headers = (read.data.values?.[0] as string[] | undefined)?.map((h) =>
    String(h).trim()
  );

  if (!headers || headers.length === 0) {
    headers = [
      "Timestamp",
      "Name",
      "Email",
      "Role",
      "Market",
      "CV Link",
      "LinkedIn",
      "Notes",
    ];
    // write headers
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `${APPLICATIONS_SHEET_NAME}!A1:${indexToColumn(
        headers.length - 1
      )}1`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [headers] },
    });
  }

  // Build row following header order
  const row = headers.map((h) =>
    h === "Timestamp"
      ? new Date().toISOString()
      : fields[h] ?? fields[h.replace(/\s+/g, "_")] ?? ""
  );

  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `${APPLICATIONS_SHEET_NAME}!A1:${indexToColumn(headers.length - 1)}1`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}

/**
 * =================
 * Diagnostics & Legacy shim
 * =================
 */
export { googleEnvHealth };

/** Some older code expected getSheetsAuth(); return the same as getSheetsClient() */
export function getSheetsAuth() {
  return getSheetsClient();
}



