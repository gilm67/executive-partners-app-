// app/jobs/components/JobsFilterClient.tsx
"use client";

type Job = {
  ID?: string;
  Title?: string;
  Role?: string;
  Location?: string;
  Market?: string;
  Seniority?: string;
  Summary?: string;
  Confidential?: string;
  Active?: string;
};

import { useMemo, useState } from "react";

function uniqSorted(values: (string | undefined)[]) {
  return Array.from(new Set(values.filter(Boolean) as string[])).sort((a, b) =>
    a.localeCompare(b),
  );
}

export default function JobsFilterClient({ jobs }: { jobs: Job[] }) {
  const [location, setLocation] = useState<string>("");
  const [market, setMarket] = useState<string>("");
  const [seniority, setSeniority] = useState<string>("");

  const options = useMemo(() => {
    return {
      locations: uniqSorted(jobs.map((j) => j.Location)),
      markets: uniqSorted(jobs.map((j) => j.Market)),
      seniorities: uniqSorted(jobs.map((j) => j.Seniority)),
    };
  }, [jobs]);

  const filtered = useMemo(() => {
    return jobs.filter((j) =>
      (!location || j.Location === location) &&
      (!market || j.Market === market) &&
      (!seniority || j.Seniority === seniority)
    );
  }, [jobs, location, market, seniority]);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label className="block text-xs text-neutral-500">Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm"
          >
            <option value="">All</option>
            {options.locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-xs text-neutral-500">Market</label>
          <select
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm"
          >
            <option value="">All</option>
            {options.markets.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        <div className="flex-1">
          <label className="block text-xs text-neutral-500">Seniority</label>
          <select
            value={seniority}
            onChange={(e) => setSeniority(e.target.value)}
            className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-sm"
          >
            <option value="">All</option>
            {options.seniorities.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {(location || market || seniority) && (
          <button
            type="button"
            onClick={() => { setLocation(""); setMarket(""); setSeniority(""); }}
            className="rounded-lg border px-3 py-2 text-sm"
            title="Clear all filters"
          >
            Clear
          </button>
        )}
      </div>

      {/* Count */}
      <p className="text-sm text-neutral-600">
        Showing <b>{filtered.length}</b> of {jobs.length} roles
      </p>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((j, idx) => {
          const title = j.Title || j.Role || "Untitled Role";
          const loc = j.Location || "—";
          const sen = j.Seniority || "—";
          const summary = j.Summary || "";
          const confidential = (j.Confidential || "").toLowerCase() === "yes";
          const id = j.ID || "";

          const applyHref =
            `/candidates/register?role=${encodeURIComponent(title)}&market=${encodeURIComponent(j.Market || "")}&jobId=${encodeURIComponent(id)}`;

          const askHref =
            `/contact?subject=${encodeURIComponent("Ask about: " + title)}&jobId=${encodeURIComponent(id)}`;

          return (
            <article key={`${id}-${idx}`} className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="text-xs text-neutral-500">{loc} • {sen}</div>
              <h3 className="mt-1 text-lg font-semibold">{title}</h3>
              {confidential && (
                <div className="mt-1 inline-flex items-center rounded bg-neutral-100 px-2 py-0.5 text-[11px] text-neutral-700">
                  Confidential
                </div>
              )}
              {summary && <p className="mt-2 text-sm text-neutral-700">{summary}</p>}

              <div className="mt-4 flex gap-3">
                <a
                  href={applyHref}
                  className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
                >
                  Apply confidentially
                </a>
                <a
                  href={askHref}
                  className="rounded-lg border px-4 py-2 text-sm hover:bg-neutral-50"
                >
                  Ask about this role
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

