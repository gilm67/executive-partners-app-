"use client";

import { useState, useMemo } from "react";

interface Job {
  id: number;
  title: string;
  role: string;
  location: string;
  market: string;
  seniority: string;
  summary: string;
  description: string;
  confidential: string;
  active: string;
}

interface JobsFilterClientProps {
  jobs: Job[];
}

const DEFAULT_LOCATION = "All Locations";
const DEFAULT_MARKET = "All Markets";
const DEFAULT_SENIORITY = "All Seniority Levels";

// Hardcoded master lists
const LOCATION_OPTIONS = [
  DEFAULT_LOCATION,
  "Zurich",
  "Geneva",
  "Lausanne",
  "Basel",
  "London",
  "New York",
  "Miami",
  "Dubai",
  "Singapore",
  "Hong Kong",
  "Abu Dhabi",
  "Paris",
  "Madrid",
  "Lisbon",
];

const MARKET_OPTIONS = [
  DEFAULT_MARKET,
  "CH Onshore",
  "MEA",
  "UAE",
  "Saudi Arabia",
  "Levant",
  "LATAM",
  "Brazil",
  "Argentina",
  "Chile",
  "Conosur",
  "Portugal",
  "UK",
  "Spain",
  "Nordics",
  "Benelux",
  "France",
  "Germany",
  "Austria",
  "Hong Kong",
  "Singapore",
  "China",
  "US",
];

const SENIORITY_OPTIONS = [
  DEFAULT_SENIORITY,
  "CEO",
  "CIO",
  "COO",
  "ARM",
  "RM",
  "SRM",
  "Investment Advisor",
  "Wealth Planner",
  "Managing Director",
  "Director",
  "Head Compliance",
  "Compliance Officer",
];

export default function JobsFilterClient({ jobs }: JobsFilterClientProps) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [market, setMarket] = useState(DEFAULT_MARKET);
  const [seniority, setSeniority] = useState(DEFAULT_SENIORITY);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.summary.toLowerCase().includes(q) ||
        job.role.toLowerCase().includes(q);

      const matchesLocation =
        location === DEFAULT_LOCATION || job.location === location;
      const matchesMarket =
        market === DEFAULT_MARKET || job.market === market;
      const matchesSeniority =
        seniority === DEFAULT_SENIORITY || job.seniority === seniority;

      return matchesSearch && matchesLocation && matchesMarket && matchesSeniority;
    });
  }, [jobs, search, location, market, seniority]);

  const resetFilters = () => {
    setSearch("");
    setLocation(DEFAULT_LOCATION);
    setMarket(DEFAULT_MARKET);
    setSeniority(DEFAULT_SENIORITY);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border px-3 py-2"
          aria-label="Search jobs"
        />

        <label className="flex items-center gap-2">
          <span className="text-xs font-medium text-neutral-500">Location</span>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-44 rounded-lg border px-3 py-2"
            aria-label="Filter by location"
          >
            {LOCATION_OPTIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2">
          <span className="text-xs font-medium text-neutral-500">Market</span>
          <select
            value={market}
            onChange={(e) => setMarket(e.target.value)}
            className="w-44 rounded-lg border px-3 py-2"
            aria-label="Filter by market"
          >
            {MARKET_OPTIONS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2">
          <span className="text-xs font-medium text-neutral-500">Seniority</span>
          <select
            value={seniority}
            onChange={(e) => setSeniority(e.target.value)}
            className="w-52 rounded-lg border px-3 py-2"
            aria-label="Filter by seniority"
          >
            {SENIORITY_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={resetFilters}
          className="ml-auto rounded-lg border px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          Reset filters
        </button>
      </div>

      {/* Jobs list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJobs.map((job) => (
          <div key={job.id} className="rounded-lg border p-4 hover:shadow-lg">
            <div className="text-sm text-neutral-500">
              {job.location} • {job.market} • {job.seniority}
            </div>
            <div className="mt-1 text-lg font-semibold">{job.title}</div>
            {job.summary ? (
              <div className="mt-1 text-neutral-600 text-sm">{job.summary}</div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
