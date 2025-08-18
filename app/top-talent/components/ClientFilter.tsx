"use client";

import { useMemo, useState } from "react";
import ShortlistToggle from "./ShortlistToggle";

type Candidate = {
  Timestamp: string;
  Name: string;
  Email: string;
  Role: string;
  Market: string;
  AUM: string;
  Mobility: string;
  Notes: string;
  "CV Link": string;
  "LinkedIn Search": string;
  "AI Summary": string;
  Tags: string;
  "Match Score": string | number;
  Shortlist?: string;
};

type SortKey = "Timestamp" | "Name" | "Role" | "Market" | "Match Score";

function parseScore(v: string | number): number {
  if (typeof v === "number") return v;
  const n = Number(v);
  return Number.isFinite(n) ? n : -1;
}

// Deterministic formatter to avoid locale/hydration mismatch
function formatTimestamp(iso: string | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const pad = (n: number) => (n < 10 ? `0${n}` : String(n));
  const dd = pad(d.getDate());
  const mm = pad(d.getMonth() + 1);
  const yyyy = d.getFullYear();
  const HH = pad(d.getHours());
  const MM = pad(d.getMinutes());
  const SS = pad(d.getSeconds());
  return `${dd}-${mm}-${yyyy} ${HH}:${MM}:${SS}`;
}

export default function ClientFilter({ rows = [] as Candidate[] }: { rows?: Candidate[] }) {
  // Always work with an array
  const safeRows = Array.isArray(rows) ? rows : [];
  const [list] = useState<Candidate[]>(safeRows);

  const [market, setMarket] = useState<string>("");
  const [minScore, setMinScore] = useState<number | "">("");
  const [q, setQ] = useState("");
  const [onlyShort, setOnlyShort] = useState(false);

  const [sortKey, setSortKey] = useState<SortKey>("Timestamp");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const markets = useMemo(
    () =>
      Array.from(new Set((list || []).map((r) => r.Market).filter(Boolean))).sort((a, b) =>
        a.localeCompare(b)
      ),
    [list]
  );

  function toggleSort(k: SortKey) {
    if (k === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(k);
      setSortDir(k === "Name" || k === "Role" || k === "Market" ? "asc" : "desc");
    }
  }

  const filtered = useMemo(() => {
    const terms = q.toLowerCase().split(/[, ]+/).filter(Boolean);
    return (list || []).filter((r) => {
      if (onlyShort && (r.Shortlist || "").toUpperCase() !== "YES") return false;
      if (market && r.Market !== market) return false;

      const scoreNum = parseScore(r["Match Score"]);
      if (minScore !== "" && scoreNum >= 0 && scoreNum < Number(minScore)) return false;

      if (terms.length) {
        const hay = [r.Tags, r.Role, r.Market, r["AI Summary"], r.Name, r.Email]
          .join(" ")
          .toLowerCase();
        return terms.every((t) => hay.includes(t));
      }
      return true;
    });
  }, [list, market, minScore, q, onlyShort]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      let va: string | number = "";
      let vb: string | number = "";
      switch (sortKey) {
        case "Timestamp":
          va = a.Timestamp || "";
          vb = b.Timestamp || "";
          break;
        case "Name":
          va = a.Name || "";
          vb = b.Name || "";
          break;
        case "Role":
          va = a.Role || "";
          vb = b.Role || "";
          break;
        case "Market":
          va = a.Market || "";
          vb = b.Market || "";
          break;
        case "Match Score":
          return (
            (parseScore(a["Match Score"]) - parseScore(b["Match Score"])) *
            (sortDir === "asc" ? 1 : -1)
          );
      }
      const res = String(va).localeCompare(String(vb));
      return sortDir === "asc" ? res : -res;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  // Client-side CSV export for current view
  function exportCurrentView() {
    const headers = [
      "Timestamp",
      "Name",
      "Email",
      "Role",
      "Market",
      "Match Score",
      "AI Summary",
      "Tags",
      "CV Link",
      "LinkedIn Search",
      "Shortlist",
    ];
    const rows = sorted.map((r) => [
      r.Timestamp,
      r.Name,
      r.Email,
      r.Role,
      r.Market,
      parseScore(r["Match Score"]),
      r["AI Summary"],
      r.Tags,
      r["CV Link"],
      r["LinkedIn Search"],
      (r.Shortlist || "").toUpperCase() === "YES" ? "YES" : "NO",
    ]);
    const toCsv = (v: any) => {
      const s = String(v ?? "");
      // NOTE: no template literals/backslashes here—just plain concatenation
      return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    };
    const csv = [headers.map(toCsv).join(","), ...rows.map((r) => r.map(toCsv).join(","))].join(
      "\n"
    );
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `top_talent_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="grid gap-3 sm:grid-cols-6">
        <div className="sm:col-span-2">
          <label className="text-sm text-neutral-600">Market</label>
          <select
            className="w-full rounded-lg border px-3 py-2"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
          >
            <option value="">All</option>
            {markets.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-neutral-600">Min Match Score</label>
          <select
            className="w-full rounded-lg border px-3 py-2"
            value={String(minScore)}
            onChange={(e) => setMinScore(e.target.value === "" ? "" : Number(e.target.value))}
          >
            <option value="">Any</option>
            {[90, 80, 70, 60, 50, 0].map((s) => (
              <option key={s} value={s}>
                {s}+
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="text-sm text-neutral-600">Search tags/summary</label>
          <input
            className="w-full rounded-lg border px-3 py-2"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="UHNWI, CH Onshore, CIO, Geneva"
          />
        </div>

        <div className="flex items-end gap-2">
          <a
            href="/api/candidates/export?type=all"
            className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
          >
            Export CSV (all)
          </a>
          <a
            href="/api/candidates/export?type=short"
            className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
          >
            Export CSV (shortlisted)
          </a>
        </div>

        <div className="sm:col-span-6 flex items-center gap-3">
          <button
            onClick={exportCurrentView}
            className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
          >
            Export CSV (current view)
          </button>
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={onlyShort}
              onChange={(e) => setOnlyShort(e.target.checked)}
            />
            Only shortlisted
          </label>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border">
        <table className="w-full min-w-[1200px] border-collapse">
          <thead className="bg-neutral-50 text-xs uppercase sticky top-0 z-10">
            <tr className="[&>th]:px-3 [&>th]:py-2 [&>th]:text-left">
              <th className="w-14">★</th>
              <th className="w-48">
                <button
                  onClick={() => toggleSort("Timestamp")}
                  className="flex items-center gap-1 hover:underline"
                  title="Sort by Timestamp"
                >
                  Timestamp {sortKey === "Timestamp" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                </button>
              </th>
              <th className="w-56">
                <button
                  onClick={() => toggleSort("Name")}
                  className="flex items-center gap-1 hover:underline"
                  title="Sort by Name"
                >
                  Name {sortKey === "Name" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                </button>
              </th>
              <th className="w-52">
                <button
                  onClick={() => toggleSort("Role")}
                  className="flex items-center gap-1 hover:underline"
                  title="Sort by Role"
                >
                  Role {sortKey === "Role" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                </button>
              </th>
              <th className="w-40">
                <button
                  onClick={() => toggleSort("Market")}
                  className="flex items-center gap-1 hover:underline"
                  title="Sort by Market"
                >
                  Market {sortKey === "Market" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                </button>
              </th>
              <th className="w-24">
                <button
                  onClick={() => toggleSort("Match Score")}
                  className="flex items-center gap-1 hover:underline"
                  title="Sort by Match"
                >
                  Match {sortKey === "Match Score" ? (sortDir === "asc" ? "↑" : "↓") : ""}
                </button>
              </th>
              <th className="min-w-[420px]">AI Summary</th>
              <th className="min-w-[320px]">Tags</th>
              <th className="w-36">Links</th>
              <th className="w-28">Export</th>
            </tr>
          </thead>

        <tbody className="[&>tr:nth-child(even)]:bg-neutral-50/40">
            {sorted.map((r, idx) => {
              return (
                <tr
                  key={`${r.Email}-${r.Timestamp}-${idx}`}
                  className="[&>td]:px-3 [&>td]:py-2 align-top"
                >
                  <td>
                    <ShortlistToggle
                      email={r.Email}
                      timestamp={r.Timestamp}
                      initial={(r.Shortlist || "") as "" | "YES" | "NO"}
                    />
                  </td>

                  <td className="whitespace-nowrap">{formatTimestamp(r.Timestamp)}</td>

                  <td className="font-medium truncate max-w-[220px]" title={r.Name}>
                    {r.Name || "—"}
                  </td>
                  <td className="truncate max-w-[220px]" title={r.Role}>
                    {r.Role || "—"}
                  </td>
                  <td className="truncate max-w-[180px]" title={r.Market}>
                    {r.Market || "—"}
                  </td>

                  <td className="font-semibold">
                    {parseScore(r["Match Score"]) >= 0 ? parseScore(r["Match Score"]) : "—"}
                  </td>

                  <td
                    className="max-w-[520px] whitespace-pre-wrap break-words text-neutral-800"
                    title={r["AI Summary"]}
                  >
                    {r["AI Summary"] || "—"}
                  </td>

                  <td
                    className="max-w-[380px] whitespace-pre-wrap break-words text-neutral-700"
                    title={r.Tags}
                  >
                    {r.Tags || "—"}
                  </td>

                  <td className="whitespace-nowrap space-x-3">
                    {r["LinkedIn Search"] && (
                      <a
                        href={r["LinkedIn Search"]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:underline"
                      >
                        LinkedIn
                      </a>
                    )}
                    {r["CV Link"] && (
                      <a
                        href={r["CV Link"]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-700 hover:underline"
                      >
                        CV
                      </a>
                    )}
                  </td>

                  <td className="whitespace-nowrap">
                    {r.Timestamp && r.Email ? (
                      <a
                        href={`/api/candidates/pdf?ts=${encodeURIComponent(
                          r.Timestamp
                        )}&email=${encodeURIComponent(r.Email)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg border px-3 py-1 text-sm hover:bg-white"
                        title="Download one-pager PDF"
                      >
                        📄 PDF
                      </a>
                    ) : (
                      <span className="text-neutral-400">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-neutral-500">
        Showing {sorted.length} of {list.length} candidates.
      </p>
    </div>
  );
}
