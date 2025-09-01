cat > app/hiring-managers/create-job/page.tsx <<'TSX'
// app/hiring-managers/create-job/page.tsx
"use client";

import { useState } from "react";

const normalizeSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function CreateJobPage() {
  // Read token if exposed as public env; keep editable so it works either way
  const defaultToken =
    (process.env.NEXT_PUBLIC_JOBS_ADMIN_TOKEN as string | undefined) || "";

  const [adminToken, setAdminToken] = useState(defaultToken);

  const [form, setForm] = useState({
    slug: "",
    title: "",
    summary: "",
    description: "",
    location: "",
    market: "",
    seniority: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Saving...");

    const safeSlug = form.slug ? normalizeSlug(form.slug) : normalizeSlug(form.title);

    try {
      const res = await fetch("/api/jobs/admin-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": adminToken,
        },
        body: JSON.stringify({ ...form, slug: safeSlug }),
      });

      const data = await res.json();
      if (data.ok) {
        setStatus(`✅ Job created: ${form.title}`);
        setForm({
          slug: "",
          title: "",
          summary: "",
          description: "",
          location: "",
          market: "",
          seniority: "",
        });
      } else {
        setStatus(`❌ Error: ${data.error || "Unknown error"}`);
      }
    } catch (err: any) {
      setStatus(`❌ Error: ${err.message}`);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="rounded-2xl bg-white text-neutral-900 shadow-xl ring-1 ring-black/10">
        {/* Header */}
        <div className="border-b border-neutral-200 px-6 py-5">
          <h1 className="text-2xl font-semibold">Hiring Managers</h1>
          <p className="mt-1 text-sm text-neutral-600">
            Create a new role. Entries are added instantly to the site.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-6">
          {/* Admin Token */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-800">
              Admin Token
            </label>
            <input
              value={adminToken}
              onChange={(e) => setAdminToken(e.target.value)}
              placeholder="Paste the value set in Vercel (JOBS_ADMIN_TOKEN)."
              className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-xs text-neutral-500">
              We send this as <code>x-admin-token</code> to <code>/api/jobs/admin-create</code>.
            </p>
          </div>

          {/* Two-column fields */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-neutral-800">
                Title
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Private Banker — Zurich"
                className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-800">
                Slug <span className="text-neutral-500">(optional)</span>
              </label>
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                placeholder="auto-generated from title if empty"
                className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-800">
                Location
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Geneva"
                className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-800">
                Seniority
              </label>
              <input
                name="seniority"
                value={form.seniority}
                onChange={handleChange}
                placeholder="Director"
                className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-800">
                Market
              </label>
              <input
                name="market"
                value={form.market}
                onChange={handleChange}
                placeholder="CH Onshore"
                className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-800">
                Short one-line summary
              </label>
              <input
                name="summary"
                value={form.summary}
                onChange={handleChange}
                placeholder="Onshore Geneva book development"
                className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-neutral-800">
              Full description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Write the full role description..."
              rows={8}
              className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <div className="mt-6">
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
            >
              Post Job
            </button>
          </div>

          {status && <p className="mt-4 text-sm">{status}</p>}
        </form>
      </div>
    </div>
  );
}
TSX