/**
 * TEMP shim used by /app/api/google/diag.
 * Reports whether required env vars are present.
 */
export function googleEnvStatus() {
  const required = ["GOOGLE_CLIENT_EMAIL", "GOOGLE_PRIVATE_KEY", "GOOGLE_SHEETS_ID"];
  const missing = required.filter((k) => !process.env[k]);
  return {
    ok: missing.length === 0,
    missing,
    present: required.filter((k) => !missing.includes(k)),
  };
}
