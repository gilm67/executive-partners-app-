/**
 * TEMP SHIMS for build stability.
 * Replace with real Google API client later.
 */

export function googleEnvStatus() {
  const required = ["GOOGLE_CLIENT_EMAIL", "GOOGLE_PRIVATE_KEY", "GOOGLE_SHEETS_ID"];
  const missing = required.filter((k) => !process.env[k]);
  return { ok: missing.length === 0, missing, present: required.filter((k) => !missing.includes(k)) };
}

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
  client.sheets = client;
  return client;
}
