// app/hiring-managers/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/—/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

export default function HiringManagersPage() {
  const [token, setToken] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");
  const [market, setMarket] = useState("");
  const [seniority, setSeniority] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [confidential, setConfidential] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const finalSlug = slugify(title);

      const res = await fetch("/api/jobs/admin-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token,
        },
        body: JSON.stringify({
          title,
          slug: finalSlug,
          location,
          market,
          seniority,
          summary,
          description,
          confidential,
          active: "true",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed to create job");
      router.push(`/jobs/${finalSlug}`);
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="ep-section">
      <h1 className="ep-title">Hiring Managers</h1>
      <p className="ep-subtitle">Create a new role. Entries are added instantly to the site.</p>

      <form onSubmit={onSubmit} className="ep-panel mt-6 space-y-5">
        <div>
          <label className="ep-label">Admin Token</label>
          <input
            className="ep-input"
            placeholder="EP_admin_…"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <p className="ep-help">Paste the value set in Vercel (JOBS_ADMIN_TOKEN).</p>
        </div>

        <div>
          <label className="ep-label">Title</label>
          <input
            className="ep-input"
            placeholder="e.g. Private Banker — Zurich"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="ep-label">Role</label>
            <input className="ep-input" value={role} onChange={(e) => setRole(e.target.value)} />
          </div>
          <div>
            <label className="ep-label">Location</label>
            <input
              className="ep-input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Geneva"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="ep-label">Market</label>
            <input
              className="ep-input"
              value={market}
              onChange={(e) => setMarket(e.target.value)}
              placeholder="CH Onshore"
            />
          </div>
          <div>
            <label className="ep-label">Seniority</label>
            <input
              className="ep-input"
              value={seniority}
              onChange={(e) => setSeniority(e.target.value)}
              placeholder="Director"
            />
          </div>
        </div>

        <div>
          <label className="ep-label">Short one-line summary</label>
          <input
            className="ep-input"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Onshore Geneva book development"
          />
        </div>

        <div>
          <label className="ep-label">Full description</label>
          <textarea
            className="ep-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write the full role description…"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            id="confidential"
            type="checkbox"
            className="ep-checkbox"
            checked={confidential}
            onChange={(e) => setConfidential(e.target.checked)}
          />
          <label htmlFor="confidential" className="text-sm text-neutral-800 dark:text-neutral-200">
            Confidential
          </label>
        </div>

        <button type="submit" className="ep-btn-primary" disabled={loading}>
          {loading ? "Posting…" : "Post Job"}
        </button>
      </form>
    </div>
  );
}
