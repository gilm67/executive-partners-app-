// app/jobs/page.tsx
import { getJobs } from "@/lib/sheets";
import JobsFilterClient from "./components/JobsFilterClient";

export const revalidate = 30; // refresh list regularly (ISR)

export default async function JobsPage() {
  const rows = await getJobs(); // server-side fetch from Google Sheets

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Current Opportunities</h1>
        <p className="text-neutral-700">
          Apply confidentially or register to be matched to upcoming mandates.
        </p>
      </div>

      <JobsFilterClient jobs={rows} />
    </section>
  );
}


