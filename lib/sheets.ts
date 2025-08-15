// lib/sheets.ts
import { getSheetsClient } from "./google";

/* ─────────────────────────
   Types
   ───────────────────────── */

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
  "Match Score": string;
  Shortlist?: "YES" | "NO" | string;
  [key: string]: any;
};

export type Application = {
  Timestamp: string;
  Name: string;
  Email: string;
  Role?: string;
  Market?: string;
  Notes?: string;
  JobID?: string;
  [key: string]: any;
};

export type Job = {
  ID?: string;
  Title?: string;
  Role?: string;
  Location?: string;
  Market?: string;
  Summary?: string;
  Seniority?: string;
  Confidential?: string;
  [key: string]: any;
};

/* ─────────────────────────
   Low-level helpers
   ───────────────────────── */

function normalizeString(v: any): string {
  return (v ?? "").toString();
}

async function readTable<T extends Record<string, any>>(range: string): Promise<T[]> {
  const { sheets, sheetId } = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range,
  });
  const rows = (res.data.values as string[][]) ?? [];
  if (rows.length === 0) return [];

  const header = rows[0].map((h) => (h ?? "").toString());
  const out: T[] = [];

  for (let i = 1; i < rows.length; i++) {
    const r = rows[i] ?? [];
    const obj: Record<string, string> = {};
    for (let c = 0; c < header.length; c++) {
      obj[header[c]] = normalizeString(r[c]);
    }
    out.push(obj as T);
  }
  return out;
}

export async function readRows(range: string): Promise<string[][]> {
  const { sheets, sheetId } = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range,
  });
  return (res.data.values as string[][]) ?? [];
}

export async function appendRow(range: string, values: string[]): Promise<void> {
  const { sheets, sheetId } = getSheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [values.map(normalizeString)] },
  });
}

/* ─────────────────────────
   Candidates
   ───────────────────────── */

export async function getCandidates(): Promise<Candidate[]> {
  const raw = await readTable<Record<string, string>>("Candidates!A:Z");
  // Normalize to the strict UI shape
  return raw.map((r) => ({
    Timestamp: r["Timestamp"] ?? "",
    Name: r["Name"] ?? "",
    Email: r["Email"] ?? "",
    Role: r["Role"] ?? "",
    Market: r["Market"] ?? "",
    AUM: r["AUM"] ?? "",
    Mobility: r["Mobility"] ?? "",
    Notes: r["Notes"] ?? "",
    "CV Link": r["CV Link"] ?? "",
    "LinkedIn Search": r["LinkedIn Search"] ?? "",
    "AI Summary": r["AI Summary"] ?? "",
    Tags: r["Tags"] ?? "",
    "Match Score": r["Match Score"] ?? "",
    Shortlist: (r["Shortlist"] as any) ?? "",
    ...r,
  }));
}

/** Update YES/NO in the Shortlist column for a row identified by Email */
export async function updateShortlistCell(
  email: string,
  value: "YES" | "NO"
): Promise<void> {
  const { sheets, sheetId } = getSheetsClient();

  // Read whole table to discover column indices
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "Candidates!A:Z",
  });
  const rows = (res.data.values as string[][]) ?? [];
  const header = rows[0] ?? [];

  const emailCol = header.findIndex((h) => (h || "").toLowerCase().includes("email"));
  const shortlistCol = header.findIndex((h) =>
    (h || "").toLowerCase().includes("shortlist")
  );
  if (emailCol === -1 || shortlistCol === -1) {
    throw new Error("Email or Shortlist column not found in Candidates sheet");
  }

  const rowIndex = rows.findIndex(
    (r, i) => i > 0 && (normalizeString(r[emailCol]).toLowerCase() === email.toLowerCase())
  );
  if (rowIndex === -1) throw new Error(`Email ${email} not found`);

  const rowNumber = rowIndex + 1; // 1-indexed for Sheets
  const colLetter = String.fromCharCode(65 + shortlistCol);

  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: `Candidates!${colLetter}${rowNumber}`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [[value]] },
  });
}

/* ─────────────────────────
   Applications
   ───────────────────────── */

export async function getApplications(): Promise<Application[]> {
  const rows = await readTable<Record<string, string>>("Applications!A:Z");
  return rows.map((r) => ({
    Timestamp: r.Timestamp ?? "",
    Name: r.Name ?? "",
    Email: r.Email ?? "",
    Role: r.Role ?? "",
    Market: r.Market ?? "",
    Notes: r.Notes ?? "",
    JobID: r.JobID ?? "",
    ...r,
  }));
}

// Normalize and append one Application row to the "Applications" sheet
export async function appendApplication(input: {
  Timestamp?: string;
  Name?: string;
  Email?: string;
  Role?: string;
  Market?: string;
  Notes?: string;
  JobID?: string;
}): Promise<void> {
  const Timestamp = input.Timestamp ?? new Date().toISOString();
  const Name = input.Name ?? "";
  const Email = input.Email ?? "";
  const Role = input.Role ?? "";
  const Market = input.Market ?? "";
  const Notes = input.Notes ?? "";
  const JobID = input.JobID ?? "";

  await appendRow("Applications!A1", [
    Timestamp,
    Name,
    Email,
    Role,
    Market,
    Notes,
    JobID,
  ]);
}

/* ─────────────────────────
   Jobs
   ───────────────────────── */

export function jobSlug(title?: string): string {
  return (title ?? "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function getJobs(): Promise<Job[]> {
  const rows = await readTable<Record<string, string>>("Jobs!A:Z");
  return rows.map((r) => ({
    ID: r["ID"] ?? "",
    Title: r["Title"] ?? "",
    Role: r["Role"] ?? "",
    Location: r["Location"] ?? "",
    Market: r["Market"] ?? "",
    Summary: r["Summary"] ?? "",
    Seniority: r["Seniority"] ?? "",
    Confidential: r["Confidential"] ?? "",
    ...r,
  }));
}

export async function getJobByIdOrSlug(idOrSlug: string): Promise<Job | null> {
  const rows = await getJobs();
  const byId = rows.find((j) => (j.ID ?? "") === idOrSlug);
  if (byId) return byId;

  const bySlug = rows.find((j) => jobSlug(j.Title) === idOrSlug);
  return bySlug ?? null;
}

export async function createJob(input: {
  Title: string;
  Location?: string;
  Market?: string;
  Summary?: string;
  Seniority?: string;
  Confidential?: string;
}): Promise<{ ok: true; id?: string } | { ok: false; error?: string }> {
  try {
    const title = (input.Title ?? "").trim();
    if (!title) return { ok: false, error: "Title is required" };

    const id = `${Date.now()}`; // simple unique ID
    await appendRow("Jobs!A1", [
      id,
      title,
      input.Location ?? "",
      input.Market ?? "",
      input.Summary ?? "",
      input.Seniority ?? "",
      input.Confidential ?? "",
    ]);

    return { ok: true, id };
  } catch (err: any) {
    return { ok: false, error: err?.message || "Failed creating job" };
  }
}

