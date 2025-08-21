// lib/sheets.ts
import { z } from "zod";
import { DateTime } from "luxon";            // Zurich timezone for CreatedAt
import { getSheetsClient, readEnvSheetId } from "./google";

/** ===== Sheet & Column Setup ===== */
const SHEET_ID = readEnvSheetId();           // reads SHEET_ID or GOOGLE_SHEET_ID
const JOBS_RANGE = "Jobs!A:Z";

/** Canonical Job shape (matches headers in the Jobs sheet) */
export const JobSchema = z.object({
  ID: z.string(),
  Title: z.string(),
  Role: z.string(),
  Location: z.string(),
  Market: z.string(),
  Seniority: z.string(),
  Summary: z.string(),
  Description: z.string(),
  Confidential: z.string(),
  Active: z.string().optional().default("TRUE"),
  CreatedAt: z.string(),
});
export type Job = z.infer<typeof JobSchema>;

/** Slug helper: "<title-slug>-<ID>" */
export function jobSlug(job: Pick<Job, "ID" | "Title">) {
  const base = (job.Title || "").toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${base}-${job.ID}`;
}

/** Convenience helper (used by cards/pages) */
export function idOrSlug(job: Pick<Job, "ID" | "Title">) {
  return jobSlug(job);
}

/** Read all jobs from the sheet and parse to typed objects */
export async function getJobs(): Promise<Job[]> {
  const { sheets } = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: JOBS_RANGE,
  });

  const rows = res.data.values || [];
  if (rows.length === 0) return [];

  const header = rows[0].map((h) => String(h).trim());
  const idx = (name: string) => header.findIndex((h) => h.toLowerCase() === name.toLowerCase());

  const iID          = idx("ID");
  const iTitle       = idx("Title");
  const iRole        = idx("Role");
  const iLocation    = idx("Location");
  const iMarket      = idx("Market");
  const iSeniority   = idx("Seniority");
  const iSummary     = idx("Summary");
  const iDescription = idx("Description");
  const iConfidential= idx("Confidential");
  const iActive      = idx("Active");      // may be -1 if column doesn’t exist
  const iCreatedAt   = idx("CreatedAt");

  const data = rows.slice(1).map((r) => {
    const row = {
      ID:          String(r[iID] ?? ""),
      Title:       String(r[iTitle] ?? ""),
      Role:        String(r[iRole] ?? ""),
      Location:    String(r[iLocation] ?? ""),
      Market:      String(r[iMarket] ?? ""),
      Seniority:   String(r[iSeniority] ?? ""),
      Summary:     String(r[iSummary] ?? ""),
      Description: String(r[iDescription] ?? ""),
      Confidential:String(r[iConfidential] ?? ""),
      Active:      iActive >= 0 ? String(r[iActive] ?? "TRUE") : "TRUE",
      CreatedAt:   String(r[iCreatedAt] ?? ""),
    };
    return JobSchema.parse(row);
  });

  return data;
}

/** Find a single job by exact ID or by slug "<title>-<ID>" */
export async function getJobByIdOrSlug(idOr: string): Promise<Job | null> {
  const all = await getJobs();
  const byId = all.find((j) => String(j.ID) === idOr);
  if (byId) return byId;
  const bySlug = all.find((j) => jobSlug(j) === idOr);
  return bySlug ?? null;
}

/** Create (append) a job row; returns the new ID */
export async function appendJob(input: {
  Title: string;
  Role?: string;
  Location?: string;
  Market?: string;
  Seniority?: string;
  Summary?: string;
  Description?: string;
  Confidential?: string;
}): Promise<string> {
  const { sheets } = getSheetsClient();

  const id = Date.now().toString();
  const createdAt = DateTime.now().setZone("Europe/Zurich").toFormat("yyyy-MM-dd HH:mm:ss");

  // We’ll write values in a sensible default order. If your sheet has different
  // column positions, it still works because readers locate by header names.
  const row: Job = JobSchema.parse({
    ID: id,
    Title: input.Title ?? "",
    Role: input.Role ?? "",
    Location: input.Location ?? "",
    Market: input.Market ?? "",
    Seniority: input.Seniority ?? "",
    Summary: input.Summary ?? "",
    Description: input.Description ?? "",
    Confidential: input.Confidential ?? "",
    Active: "TRUE",
    CreatedAt: createdAt,
  });

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: JOBS_RANGE,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        row.ID,
        row.Title,
        row.Role,
        row.Location,
        row.Market,
        row.Seniority,
        row.Summary,
        row.Description,
        row.Confidential,
        row.Active,      // if “Active” column is later in the sheet, that’s fine
        row.CreatedAt,   // unused cells will be left blank by Sheets
      ]],
    },
  });

  return id;
}

/** Back-compat name used by /api/jobs/create */
export const createJob = appendJob;
