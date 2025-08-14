import Link from "next/link";
import { getJobs, jobSlug, type Job } from "@/lib/sheets";

export const revalidate = 60;

export default async function JobsPage() {
  const jobs = await getJobs();
  // keep only active (anything not an explicit "false")
  const active = jobs.filter(
    (j: any) => (j.Active || "").toString().toLowerCase() !== "false"
  );

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Current Opportunities</h1>
      <p className="text-neutral-700">
        Apply confidentially or register to be matched to upcoming mandates.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {active.map((j: any) => {
          const title = (j.Title || j.Role || "Untitled Role").toString();
          const locationOrMarket = (j.Location || j.Market || "—").toString();
          const idOrSlug = (j.ID && String(j.ID)) || jobSlug(j as Job);
          const href = `/jobs/${idOrSlug}`;

          // ✅ NEW: point to the /apply page with id, role, and market prefilled
          const applyHref = `/apply?id=${encodeURIComponent(
            idOrSlug
          )}&role=${encodeURIComponent(title)}&market=${encodeURIComponent(
            locationOrMarket
          )}`;

          return (
            <div
              key={idOrSlug}
              className="rounded-2xl border border-neutral-200 p-6"
            >
              <Link href={href} className="block group">
                <h2 className="text-lg font-semibold group-hover:underline">
                  {title}
                </h2>
                <p className="text-sm text-neutral-600">
                  {locationOrMarket}
                  {j.Seniority ? ` • ${j.Seniority}` : ""}
                </p>
                {j.Summary && (
                  <p className="mt-3 text-sm text-neutral-700">{j.Summary}</p>
                )}
              </Link>

              <div className="mt-4 flex gap-3">
                <Link
                  href={applyHref}
                  className="rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
                >
                  Apply confidentially
                </Link>
                <Link
                  href="/contact"
                  className="rounded-lg border px-4 py-2 hover:bg-white"
                >
                  Ask about this role
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

