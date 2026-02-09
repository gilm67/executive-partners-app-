import type { Metadata } from "next";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import JobJsonLd from "@/components/JobJsonLd";

// 1) Canonical + basic SEO
export const metadata: Metadata = {
  title: "Private Banker — UHNW (Swiss Onshore) | Executive Partners",
  description:
    "Lead UHNW relationships with a Swiss onshore focus. Portability required; strong RM track record.",
  alternates: {
    canonical: "https://www.execpartners.ch/jobs/sample",
  },
};

export default function SampleJobPage() {
  // ✅ Use your canonical domain (no localhost in prod SEO)
  const SITE_URL = "https://www.execpartners.ch";

  // Dummy job data for the JSON-LD + UI
  const job = {
    ID: "SAMPLE-123",
    Title: "Private Banker — UHNW (Swiss Onshore)",
    Summary:
      "Lead UHNW relationships with a Swiss onshore focus. Portability required; strong RM track record.",
    Location: "Geneva, CH",
    Seniority: "Director",
    Market: "Swiss Onshore",
    DatePosted: new Date().toISOString(),
    EmploymentType: "FULL_TIME",
    HiringOrganization: "Executive Partners",
    BaseSalaryMin: 180000,
    BaseSalaryMax: 240000,
    Currency: "CHF",
    Url: `${SITE_URL}/jobs/sample`, // ✅ prod URL
    Industry: "Private Banking & Wealth Management",
    JobLocationType: "ONSITE" as const,
    DirectApply: true,
    ValidThrough: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // +60 days
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-3xl px-4 py-10">
        {/* Breadcrumbs JSON-LD */}
        <BreadcrumbJsonLd
          items={[
            { name: "Home", item: `${SITE_URL}/` },
            { name: "Jobs", item: `${SITE_URL}/jobs` },
            {
              name: "Private Banker — UHNW (Swiss Onshore)",
              item: `${SITE_URL}/jobs/sample`,
            },
          ]}
        />

        {/* JobPosting JSON-LD */}
        <JobJsonLd job={job} />

        {/* Page content */}
        <h1 className="text-2xl font-semibold">{job.Title}</h1>
        <p className="mt-2 text-neutral-300">{job.Summary}</p>

        <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-neutral-300">
          <div className="rounded border border-neutral-800 bg-neutral-900 p-3">
            <div className="text-neutral-400">Location</div>
            <div>{job.Location}</div>
          </div>
          <div className="rounded border border-neutral-800 bg-neutral-900 p-3">
            <div className="text-neutral-400">Seniority</div>
            <div>{job.Seniority}</div>
          </div>
        </div>
      </section>
    </main>
  );
}