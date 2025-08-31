// app/hiring-managers/create-job/page.tsx
"use client";

import { useState } from "react";

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
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Saving...");

    try {
      const res = await fetch("/api/jobs/admin-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": process.env.NEXT_PUBLIC_JOBS_ADMIN_TOKEN!,
        },
        body: JSON.stringify(form),
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
      <h1 className="text-3xl font-semibold mb-6">Create New Job</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="slug"
          placeholder="Slug (e.g., private-banker-geneva)"
          value={form.slug}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2"
          required
        />

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2"
          required
        />

        <input
          type="text"
          name="summary"
          placeholder="Summary"
          value={form.summary}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2"
        />

        <textarea
          name="description"
          placeholder="Full Description"
          value={form.description}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2 h-32"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2"
        />

        <input
          type="text"
          name="market"
          placeholder="Market (e.g., CH Onshore)"
          value={form.market}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2"
        />

        <input
          type="text"
          name="seniority"
          placeholder="Seniority (e.g., Director)"
          value={form.seniority}
          onChange={handleChange}
          className="w-full rounded-md border px-3 py-2"
        />

        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Create Job
        </button>
      </form>

      {status && <p className="mt-4 text-sm">{status}</p>}
    </main>
  );
}