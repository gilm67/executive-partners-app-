/**
 * Stub Google clients. Replace with real Google API / service account code later.
 */

export async function googleDiag() {
  return { status: "stub", message: "Google integration not implemented yet." };
}

export async function getGoogleClient() {
  return null; // placeholder
}

/** Some routes expect this specifically */
export async function getSheetsClient() {
  return null; // placeholder for Google Sheets API client
}

export default {};
