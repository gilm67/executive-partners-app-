// lib/sheets.ts
import { getSheetsClient } from "./google";

/* =========================
   Types
   ========================= */
export type Candidate = {
  Timestamp?: string;
  Name?: string;
  Email?: string;
  Role?: string;
  Market?: string;
  AUM?: string;
  Mobility?: string;
  Notes?: string;
  CVLink?: string;
  LinkedInSearch?: string;
  AISummary?: string;
  Tags?: string;
  MatchScore?: string | number;
};

export type Job = {
  ID?: string | number;
  Title?: string;
  Role?: string;
  Market?: string;
  Location?: string;
  Seniority?: string;
  Summary?: string;
  Slug?: string;
};

export type NewJobInput = {
  Title: string;
  Market?: string;
  Location?: string;
  Seniority?: string;
  Summary?: string;
};

export type NewApplication = {
  Timestamp: string;
  Name: string;
  Email: string;
  Role?: string;
  Market?: string;
  Notes?: string;
  JobID?: string;
};

/* =========================
   Utils
   ========================= */
function normalizeHeader(h: string) {
  return (h || "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");
}

function parseTable<T = Record<string, any>>(rows: any[][]): T[] {
  if (!rows || rows.length === 0) return [];
  const header = (rows[0] || []).map((h: any) => normalizeHeader(String(h || "")));
  return rows.slice(1).map((r) => {
    const obj: Record<string, any> = {};
    header.forEach((key: string, i: number) => {
      obj[key] = r[i] ?? "";
    });
    return obj as T;
  });
}

/* =========================
   Generic helpers (shims for older routes)
   ========================= */
export async function appendRow(range: string, values: any[]) {
  const { sheets, sheetId } = getSheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [values] },
  });
}

export async function readRows(range: string): Promise<any[][]> {
  const { sheets, sheetId } = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range,
  });
  return (res.data.values as any[][]) || [];
}

/* =========================
   Jobs
   ========================= */
export async function getJobs(): Promise<Job[]> {
  const rows = await readRows("Jobs!A:Z");
  const parsed = parseTable(rows);
  return parsed.map((r: any) => ({
    ID: r.id || r.jobid || r.job_id || "",
    Title: r.title || r.role || "",
    Role: r.role || r.title || "",
    Market: r.market || "",
    Location: r.location || "",
    Seniority: r.seniority || "",
    Summary: r.summary || "",
    Slug: r.slug || "",
  }));
}

export function jobSlug(j: Job) {
  const base = (j.Title || j.Role || "role")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const market = (j.Market || "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return market ? `${base}-${market}` : base;
}

export async function getJobByIdOrSlug(idOrSlug: string): Promise<Job | null> {
  const jobs = await getJobs();
  const needle = (idOrSlug || "").toString().trim().toLowerCase();
  return (
    jobs.find(
      (j) =>
        String(j.ID || "").toLowerCase() === needle ||
        String(j.Slug || "").toLowerCase() === needle ||
        jobSlug(j) === needle
    ) || null
  );
}

export async function createJob(
  input: NewJobInput
): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  try {
    const id = String(Date.now());
    await appendRow("Jobs!A1", [
      id,
      input.Title,
      input.Market || "",
      input.Location || "",
      input.Seniority || "",
      input.Summary || "",
    ]);
    return { ok: true, id };
  } catch (e: any) {
    return { ok: false, error: e?.message || "Failed to create job" };
  }
}

/* =========================
   Candidates
   ========================= */
export async function getCandidates(): Promise<Candidate[]> {
  const rows = await readRows("Candidates!A:Z");
  const parsed = parseTable(rows);
  return parsed.map((r: any) => ({
    Timestamp: r.timestamp || "",
    Name: r.name || "",
    Email: r.email || "",
    Role: r.role || "",
    Market: r.market || "",
    AUM: r.aum || r.aummillions || "",
    Mobility: r.mobility || "",
    Notes: r.notes || "",
    CVLink: r.cvlink || r.cv || "",
    LinkedInSearch: r.linkedinsearch || "",
    AISummary: r.aisummary || "",
    Tags: r.tags || "",
    MatchScore: r.matchscore || "",
  }));
}

/** Internal helper: update by row number (Z column as example) */
async function updateShortlistCellByRow(rowIndex: number, value: string) {
  const { sheets, sheetId } = getSheetsClient();
  const targetRange = `Candidates!Z${rowIndex}:Z${rowIndex}`; // adjust if your shortlist column differs
  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: targetRange,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [[value]] },
  });
}

/** Internal helper: find row by (email, timestamp) then update Z column */
async function updateShortlistCellByKeys(email: string, timestamp: string, value: string) {
  const rows = await readRows("Candidates!A:Z");
  if (!rows.length) return;

  // Build a header index for email/timestamp
  const header = rows[0].map((h) => normalizeHeader(String(h || "")));
  const emailIdx = header.indexOf("email");
  const tsIdx = header.indexOf("timestamp");
  const shortlistColIdx = 25; // Z = 26th col, 0-based index is 25. Change if needed.

  if (emailIdx === -1 || tsIdx === -1) return;

  // Find the row (starting from row 2 in sheet, which is index 1 in array)
  let rowNumber: number | null = null;
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i] || [];
    const e = String(r[emailIdx] || "").trim().toLowerCase();
    const t = String(r[tsIdx] || "").trim();
    if (e === email.trim().toLowerCase() && t === timestamp.trim()) {
      rowNumber = i + 1; // sheet rows are 1-based and include header
      break;
    }
  }
  if (!rowNumber) return;

  // Ensure row has at least Z columns when updating via range:
  const colLetter = "Z"; // adjust if your shortlist column is different
  const range = `Candidates!${colLetter}${rowNumber}:${colLetter}${rowNumber}`;

  const { sheets, sheetId } = getSheetsClient();
  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [[value]] },
  });
}

/**
 * Public function that supports:
 *  - updateShortlistCell(rowIndex:number, value:string)
 *  - updateShortlistCell(email:string, timestamp:string, value:string)
 */
export async function updateShortlistCell(
  a: number | string,
  b: string,
  c?: string
) {
  if (typeof a === "number" && c === undefined) {
    // signature: (rowIndex, value)
    return updateShortlistCellByRow(a, b);
  }
  // signature: (email, timestamp, value)
  const email = String(a);
  const timestamp = String(b);
  const value = String(c ?? "");
  return updateShortlistCellByKeys(email, timestamp, value);
}

/* =========================
   Applications (/apply)
   ========================= */
export async function appendApplication(app: NewApplication) {
  await appendRow("Applications!A1", [
    app.Timestamp,
    app.Name,
    app.Email,
    app.Role || "",
    app.Market || "",
    app.Notes || "",
    app.JobID || "",
  ]);
}

export async function getApplications(): Promise<Record<string, any>[]> {
  const rows = await readRows("Applications!A:Z");
  return parseTable(rows);
}
