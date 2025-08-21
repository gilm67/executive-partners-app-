import { getSheetsClient } from "@/lib/google";

export type Job = {
  ID?: string;
  Title?: string;
  Role?: string;
  Location?: string;
  Market?: string;
  Seniority?: string;
  Summary?: string;
  Description?: string;
  Active?: string;
};

// Turn any job row into a slug
export function jobSlug(job: Job): string {
  const id = job.ID ? String(job.ID) : "";
  const title = job.Title || job.Role || "job";
  return (
    (title + "-" + id)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")
  );
}

// Normalize ID or slug for consistent usage
export function idOrSlug(job: Job): string {
  return (job.ID && String(job.ID)) || jobSlug(job);
}

// Fetch jobs
export async function getJobs(): Promise<Job[]> {
  const { sheets, sheetId } = getSheetsClient();

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: "Jobs!A1:Z1000",
  });

  const rows = res.data.values || [];
  const headers = rows[0] || [];
  const jobs = rows.slice(1).map((row) => {
    const obj: Job = {};
    headers.forEach((h, i) => {
      obj[h.trim()] = row[i] || "";
    });
    return obj;
  });

  // Only return active jobs
  return jobs.filter(
    (j) => (j.Active || "").toString().toLowerCase() !== "false"
  );
}

// Get a single job by ID or slug
export async function getJobByIdOrSlug(idOrSlug: string): Promise<Job | null> {
  const jobs = await getJobs();

  return (
    jobs.find(
      (j) =>
        String(j.ID) === idOrSlug ||
        jobSlug(j) === idOrSlug.toLowerCase()
    ) || null
  );
}
