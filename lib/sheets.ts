// lib/sheets.ts
import { google } from "googleapis";
import { z } from "zod";
import { DateTime } from "luxon"; // Zurich timezone

// ================== CONFIG ==================
const SHEET_ID = process.env.SHEET_ID!;
const CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL!;
const PRIVATE_KEY =
  process.env.GOOGLE_PRIVATE_KEY_B64
    ? Buffer.from(process.env.GOOGLE_PRIVATE_KEY_B64, "base64").toString("utf8")
    : process.env.GOOGLE_PRIVATE_KEY!;

// Your Jobs sheet range (header in row 1)
const JOBS_RANGE = "BP_Entries!A:Z";

// ================== TYPES / SCHEMA ==================
const JobSchema = z.object({
  ID: z.string(),
  Title: z.string(),
  Role: z.string(),
  Location: z.string(),
  Market: z.string(),
  Seniority: z.string(),
  Summary: z.string(),
  Description: z.string(),
  Confidential: z.string(),
  Active: z.string(),
  CreatedAt: z.string(),
});
export type Job = z.infer<typeof JobSchema>;

// ================== CORE GOOGLE CLIENT ==================
export async function getSheetsClient() {
  const auth = new google.auth.JWT({
    email: CLIENT_EMAIL,
    key: PRIVATE_KEY,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

// ================== HELPERS ==================
/** Slug for pretty URLs: "private-banker-zurich-175569..." */
export function jobSlug(job: Pick<Job, "Title" | "ID">) {
  const base = (job.Title || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return base ? `${base}-${job.ID}` : `${job.ID}`;
}

// ================== READ ==================
export async function getJobs(): Promise<Job[]> {
  const sheets = await getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: JOBS_RANGE,
    majorDimension: "ROWS",
  });
  const rows = res.data.values || [];
  const [, ...data] = rows; // skip header row

  return data
    .map((r) =>
      JobSchema.parse({
        ID: r[0] || "",
        Title: r[1] || "",
        Role: r[2] || "",
        Location: r[3] || "",
        Market: r[4] || "",
        Seniority: r[5] || "",
        Summary: r[6] || "",
        Description: r[7] || "",
        Confidential: r[8] || "",
        Active: r[9] || "",
        CreatedAt: r[10] || "",
      })
    );
}

/** Find by numeric ID or by slug (…-<id>). Also accepts exact Title match (case-insensitive) as a fallback. */
export async function getJobByIdOrSlug(idOrSlug: string): Promise<Job | null> {
  const jobs = await getJobs();

  // 1) looks like pure numeric ID
  if (/^\d+$/.test(idOrSlug)) {
    return jobs.find((j) => String(j.ID) === idOrSlug) || null;
  }

  // 2) ends with -<digits> (slug)
  const m = idOrSlug.match(/-(\d+)$/);
  if (m) {
    const byId = jobs.find((j) => String(j.ID) === m[1]);
    if (byId) return byId;
  }

  // 3) fallback: exact Title match (case-insensitive)
  const wanted = idOrSlug.trim().toLowerCase();
  const byTitle =
    jobs.find((j) => (j.Title || "").trim().toLowerCase() === wanted) || null;

  return byTitle;
}

// ================== WRITE ==================
/** Append a new job row; returns the new ID */
export async function appendJob(
  data: Omit<Job, "ID" | "CreatedAt" | "Active">
): Promise<string> {
  const sheets = await getSheetsClient();

  const id = Date.now().toString();
  const createdAt = DateTime.now()
    .setZone("Europe/Zurich")
    .toFormat("yyyy-MM-dd HH:mm:ss");

  const row: Job = {
    ID: id,
    Title: data.Title || "",
    Role: data.Role || "",
    Location: data.Location || "",
    Market: data.Market || "",
    Seniority: data.Seniority || "",
    Summary: data.Summary || "",
    Description: data.Description || "",
    Confidential: data.Confidential || "",
    Active: "TRUE",
    CreatedAt: createdAt,
  };

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: JOBS_RANGE,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          row.ID,
          row.Title,
          row.Role,
          row.Location,
          row.Market,
          row.Seniority,
          row.Summary,
          row.Description,
          row.Confidential,
          row.Active,
          row.CreatedAt,
        ],
      ],
    },
  });

  return id;
}

/** Back-compat name used by /api/jobs/create */
export const createJob = appendJob;
/** Convenience helper used by app/page.tsx */
export function idOrSlug(job: Pick<Job, "ID" | "Title">) {
  // Our slugs already end with -ID, so this is safe and stable.
  return jobSlug(job);
}
