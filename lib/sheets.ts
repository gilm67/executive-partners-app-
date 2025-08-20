// lib/sheets.ts
import { google } from "googleapis";
import { z } from "zod";
import { DateTime } from "luxon";  // ✅ for Zurich timezone

// ================== CONFIG ==================
const SPREADSHEET_ID = process.env.SHEETS_ID!;
const SHEET_NAME = "BP_Entries"; // adjust if your sheet/tab has another name

// ================== TYPES ==================
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
  Active: z.string().optional(),
  CreatedAt: z.string().optional(),
});

export type Job = z.infer<typeof JobSchema>;

export type NewJobInput = Omit<Job, "ID" | "CreatedAt" | "Active">;

// ================== AUTH ==================
function getSheets() {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_KEY!),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

// ================== GET JOBS ==================
export async function getJobs(): Promise<Job[]> {
  const sheets = getSheets();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: SHEET_NAME,
  });

  const rows = res.data.values;
  if (!rows || rows.length < 2) return [];

  const headers = rows[0];
  const jobs: Job[] = rows.slice(1).map((row) => {
    const obj: any = {};
    headers.forEach((h, i) => {
      obj[h] = row[i] ?? "";
    });
    return JobSchema.parse(obj);
  });

  return jobs;
}

// ================== CREATE JOB ==================
export async function createJob(input: NewJobInput): Promise<string> {
  const sheets = getSheets();
  const id = Date.now().toString();

  // ✅ Use Zurich time instead of UTC
  const now = DateTime.now()
    .setZone("Europe/Zurich")
    .toFormat("yyyy-LL-dd HH:mm:ss");

  const row = [
    id,
    input.Title,
    input.Role,
    input.Location,
    input.Market,
    input.Seniority,
    input.Summary,
    input.Description,
    input.Confidential,
    "FALSE", // default Active
    now,
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: SHEET_NAME,
    valueInputOption: "RAW",
    requestBody: { values: [row] },
  });

  return id;
}

// ================== ACTIVATE JOB ==================
export async function activateJob(id: string, active: boolean): Promise<boolean> {
  const sheets = getSheets();

  // Fetch all rows
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: SHEET_NAME,
  });

  const rows = res.data.values;
  if (!rows || rows.length < 2) return false;

  const headers = rows[0];
  const idIndex = headers.indexOf("ID");
  const activeIndex = headers.indexOf("Active");

  if (idIndex === -1 || activeIndex === -1) return false;

  const rowIndex = rows.findIndex((r, i) => i > 0 && r[idIndex] === id);
  if (rowIndex === -1) return false;

  const range = `${SHEET_NAME}!${String.fromCharCode(65 + activeIndex)}${rowIndex + 1}`;
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range,
    valueInputOption: "RAW",
    requestBody: { values: [[active ? "TRUE" : "FALSE"]] },
  });

  return true;
}
