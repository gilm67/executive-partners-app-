/**
 * TEMP SHIMS for build stability.
 * Replace with real Google Sheets logic later.
 */

/** ---------- Types ---------- **/
export type Application = {
  id: string;
  shortlisted?: boolean;
  [key: string]: any;
};

export type Candidate = {
  id: string;
  name?: string;
  email?: string;
  market?: string;
  aum?: number;
  shortlisted?: boolean;
  [key: string]: any;
};

export type Job = {
  id: string;
  title: string;
  location?: string;
  slug?: string;
  [key: string]: any;
};

/** ---------- Helpers ---------- **/
export function jobSlug(input: string | { id?: string; title?: string }): string {
  const str = typeof input === "string" ? input : (input.title || input.id || "");
  return str.toString().trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

/** ---------- Applications ---------- **/
export async function getApplications(): Promise<Application[]> { return []; }
export async function appendApplication(_payload: unknown): Promise<{ id: string }> {
  return { id: "stub-app-" + Date.now().toString(36) };
}

/** ---------- Candidates ---------- **/
export async function getCandidates(): Promise<Candidate[]> { return []; }
export async function updateShortlistCell(_rowId: string, _value: boolean | string): Promise<void> {}

/** ---------- Jobs ---------- **/
export async function getJobs(): Promise<Job[]> { return []; }
export async function getJobByIdOrSlug(idOrSlug: string): Promise<Job | null> {
  const jobs = await getJobs();
  const needle = idOrSlug.toLowerCase();
  return (
    jobs.find((j) => j.id?.toLowerCase() === needle) ||
    jobs.find((j) => (j.slug || jobSlug(j.title)).toLowerCase() === needle) ||
    null
  );
}
export async function createJob(payload: { title: string; location?: string }): Promise<Job> {
  const id = "stub-job-" + Date.now().toString(36);
  return { id, title: payload.title, location: payload.location, slug: jobSlug(payload.title) };
}

/** ---------- Sheets client (SYNC stub; supports BOTH call styles) ---------- **/
type SheetsSpreadsheetsValues = {
  append: (args: any) => Promise<{ status: number }>;
  update: (args: any) => Promise<{ status: number }>;
  get: (args: any) => Promise<{ status: number; data?: any }>;
  batchGet: (args: any) => Promise<{ status: number; data?: any }>;
};
type SheetsSpreadsheets = {
  get: (args: any) => Promise<{ status: number; data?: any }>;
  values: SheetsSpreadsheetsValues;
};

/**
 * Return an object that:
 *  - has `.spreadsheets` at top-level (so `const sheets = await getSheetsClient(); sheets.spreadsheets...`)
 *  - also has `.sheets` alias to itself + `.sheetId` (so `const { sheets, sheetId } = getSheetsClient();`)
 */
export function getSheetsClient(): any {
  const values: SheetsSpreadsheetsValues = {
    append: async (_args) => ({ status: 200 }),
    update: async (_args) => ({ status: 200 }),
    get: async (_args) => ({ status: 200, data: {} }),
    batchGet: async (_args) => ({ status: 200, data: {} }),
  };
  const spreadsheets: SheetsSpreadsheets = {
    get: async (_args) => ({ status: 200, data: {} }),
    values,
  };
  const client: any = {
    spreadsheets,
    sheetId: process.env.SHEET_ID || process.env.GOOGLE_SHEETS_ID || "stub-sheet-id",
  };
  // alias to support `{ sheets, sheetId } = getSheetsClient()`
  client.sheets = client;
  return client;
}
