// lib/sheets.ts

// Import for internal use, and re-export so other files can `import { getSheetsClient } from "@/lib/sheets"`
import { getSheetsClient, googleEnvHealth } from "./google";
export { googleEnvHealth, getSheetsClient } from "./google";

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
  CreatedAt?: string;
};

export type NewJobInput = {
  title: string;
  role?: string;
  location?: string;
  market?: string;
  seniority?: string;
  summary?: string;
  description?: string;
  confidential?: string; // optional "YES"/"NO"
};

export type Candidate = Record<string, string>;
export type Application = Record<string, string>;

/**
 * =================
 * Sheet names
 * =================
 */
const JOBS_SHEET_NAME = process.env.JOBS_SHEET_NAME?.trim() || "Jobs";
const CANDIDATES_SHEET_NAME =
  process.env.CANDIDATES_SHEET_NAME?.trim() || "Candidates";
const APPLICATIONS_SHEET_NAME =
  process.env.APPLICATIONS_SHEET_NAME?.trim() || "Applications";

/**
 * =================
 * Utils
 * =================
 */
function rowsToObjects<T extends Record<string, any>>(
  headers: string[],
  rows: any[][]
): T[] {
  return rows.map((r) => {
    const obj: Record<string, any> = {};
    headers.forEach((h, i) => (obj[h] = r[i] ?? ""));
    return obj as T;
  });
}

// 0-based column index (0 = A) → A1 column letters
function indexToColumn(index: number): string {
  let col = "";
  while (index >= 0) {
    col = String.fromCharCode((index % 26) + 65) + col;
    index = Math.floor(index / 26) - 1;
  }
  return col;
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

/** Header-safe append that aligns fields by header name, not by fixed column order. */
export async function createJob(input: NewJobInput): Promise<string> {
  const { sheets, sheetId } = getSheetsClient();

  // 1) Read the header row (order-agnostic)
  const read = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${JOBS_SHEET_NAME}!A1:Z1`,
    majorDimension: "ROWS",
  });

  let headers =
    (read.data.values?.[0] as string[] | undefined)?.map((h) =>
      String(h).trim()
    ) || [];

  // 2) Ensure minimum headers exist (we'll add any missing)
  const required = [
    "ID",
    "Title",
    "Role",
    "Location",
    "Market",
    "Seniority",
    "Summary",
    "Description",
    "Confidential",
    "CreatedAt",
  ];
  const have = new Set(headers.map((h) => h.toLowerCase()));
  const toAdd = required.filter((h) => !have.has(h.toLowerCase()));
  if (toAdd.length > 0) {
    headers = [...headers, ...toAdd];
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `${JOBS_SHEET_NAME}!A1:${indexToColumn(headers.length - 1)}1`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [headers] },
    });
  }

  // 3) Build values map (accept both camel & Sheet-style keys)
  const id = String(Date.now());
  const now = new Date().toISOString();

  const valuesByHeader: Record<string, any> = {
    ID: id,
    Title: input.title ?? "",
    Role: (input.role ?? "").toString(),
    Location: (input.location ?? "").toString(),
    Market: (input.market ?? "").toString(),
    Seniority: (input.seniority ?? "").toString(),
    Summary: (input.summary ?? "").toString(),
    Description: (input.description ?? "").toString(),
    Confidential:
      (input.confidential ?? "").toString().trim().toUpperCase() === "YES"
        ? "YES"
        : "",
    CreatedAt: now,
  };

  // 4) Create row matching the *current* header order
  const row = headers.map((h) => valuesByHeader[h] ?? "");

  // 5) Append in one go using the full width of the header row
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `${JOBS_SHEET_NAME}!A1:${indexToColumn(headers.length - 1)}1`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });

  // NEW: return the new ID so callers can use it
  return id;
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

/** Update "Shortlist" for a candidate looked up by Email. */
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

/** Append one application row, aligning to whatever headers exist */
export async function appendApplication(
  fields: Record<string, any>
): Promise<void> {
  const { sheets, sheetId } = getSheetsClient();

  // Read header row
  const read = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${APPLICATIONS_SHEET_NAME}!A1:Z1`,
    majorDimension: "ROWS",
  });

  let headers =
    (read.data.values?.[0] as string[] | undefined)?.map((h) =>
      String(h).trim()
    ) || [];

  // If empty sheet, create a reasonable default header set
  if (headers.length === 0) {
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
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `${APPLICATIONS_SHEET_NAME}!A1:${indexToColumn(headers.length - 1)}1`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [headers] },
    });
  }

  // Build row values in header order
  const row = headers.map((h) =>
    h === "Timestamp"
      ? new Date().toISOString()
      : fields[h] ?? fields[h.replace(/\s+/g, "_")] ?? ""
  );

  // Append
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: `${APPLICATIONS_SHEET_NAME}!A1:${indexToColumn(headers.length - 1)}1`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}

