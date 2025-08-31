// app/hiring-managers/create-job/page.tsx
"use client";

import { useState } from "react";

const normalizeSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function CreateJobPage() {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
          "x-admin-token": process.env.NEXT_PUBLIC_JOBS_ADMIN_TOKEN!,
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
        setStatus(`❌ Error: ${data.error}`);
      }
    } catch (err: any) {
      setStatus(`❌ Error: ${err.message}`);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-6">Create a Job</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border px-3 py-2 rounded" />
        <input name="slug" value={form.slug} onChange={handleChange} placeholder="Slug (optional, will auto-generate)" className="w-full border px-3 py-2 rounded" />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Location" className="w-full border px-3 py-2 rounded" />
        <input name="market" value={form.market} onChange={handleChange} placeholder="Market" className="w-full border px-3 py-2 rounded" />
        <input name="seniority" value={form.seniority} onChange={handleChange} placeholder="Seniority" className="w-full border px-3 py-2 rounded" />
        <input name="summary" value={form.summary} onChange={handleChange} placeholder="Summary" className="w-full border px-3 py-2 rounded" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border px-3 py-2 rounded" />
        <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Save</button>
      </form>
      {status && <p className="mt-4">{status}</p>}
    </main>
  );
}
