export async function getJobs(): Promise<any[]> {
  return []; // empty by default; replace with real data later
}
export function jobSlug(j: any): string {
  const s = (j?.ID ? String(j.ID) + "-" : "") + (j?.Title || j?.Role || "role");
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
