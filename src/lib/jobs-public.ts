export type PublicJob = { id: string; title: string; slug: string; location?: string };

/** Primary API used across the app */
export async function listPublicJobs(): Promise<PublicJob[]> {
  return [];
}

/** Alternate name some code uses */
export async function getPublicJobs(): Promise<PublicJob[]> {
  return listPublicJobs();
}

/** Another alternate name referenced by sitemap */
export async function getAllJobsPublic(): Promise<PublicJob[]> {
  return listPublicJobs();
}

export default { listPublicJobs, getPublicJobs, getAllJobsPublic };
