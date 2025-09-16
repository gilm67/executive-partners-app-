/**
 * Stub Google Sheets integration so build/deploy doesn’t break.
 * Replace with real implementations later.
 */
export type Application = Record<string, any>;
export type Candidate = Record<string, any>;

export async function getApplications(): Promise<Application[]> {
  return [];
}

export async function getCandidates(): Promise<Candidate[]> {
  return [];
}

export async function updateShortlistCell(
  _candidateId: string,
  _value: string
): Promise<boolean> {
  return true; // pretend success
}

/**
 * Some routes call this WITHOUT await and destructure:
 *   const { sheets, sheetId } = getSheetsClient();
 * Provide a synchronous stub with the expected shape.
 */
const sheetsStub = {
  spreadsheets: {
    values: {
      append: async (..._args: any[]) => ({
        status: 200,
        data: { updates: {} },
      }),
    },
  },
};

// Synchronous function on purpose
export function getSheetsClient() {
  return {
    sheets: sheetsStub as any,
    sheetId: "stub-sheet-id",
  };
}

/** Optional helpers used elsewhere */
export async function exportCandidatesToSheet() {
  return { ok: true, sheetUrl: null };
}
export async function shortlistToSheet() {
  return { ok: true, sheetUrl: null };
}
export async function diagnoseCandidates() {
  return { ok: true, reportUrl: null };
}

export default {};
