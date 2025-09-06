// app/hiring-managers/create-job/page.tsx
"use client";

import { useState } from "react";

const normalizeSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

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

  const Label = ({ children }: { children: React.ReactNode }) => (
    <label className="mb-1 block text-[13px] font-semibold tracking-wide text-neutral-800 dark:text-neutral-200">
      {children}
    </label>
  );

  const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
      {...props}
      className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-[15px] leading-6 text-neutral-900 placeholder-neutral-400 outline-none ring-blue-600/10 focus:ring-4 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
    />
  );

  const Textarea = (
    props: React.TextareaHTMLAttributes<HTMLTextAreaElement>
  ) => (
    <textarea
      {...props}
      className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-[15px] leading-6 text-neutral-900 placeholder-neutral-400 outline-none ring-blue-600/10 focus:ring-4 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
    />
  );

  return (
    <main className="mx-auto max-w-2xl">
      <div className="rounded-2xl bg-neutral-950 px-6 py-8 ring-1 ring-white/10">
        <h1 className="text-2xl font-extrabold tracking-tight text-white">
          Create a Role
        </h1>
        <p className="mt-2 text-sm text-neutral-300">
          Provide the basics. You can refine with our team after submission.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <Label>Title</Label>
          <Input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Senior Private Banker (Zurich)"
          />
        </div>

        <div>
          <Label>Slug (optional)</Label>
          <Input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            placeholder="auto-generated from title if empty"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <Label>Location</Label>
            <Input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Zurich"
            />
          </div>
          <div>
            <Label>Market</Label>
            <Input
              name="market"
              value={form.market}
              onChange={handleChange}
              placeholder="Swiss / LATAM / MENA / Asia..."
            />
          </div>
          <div>
            <Label>Seniority</Label>
            <Input
              name="seniority"
              value={form.seniority}
              onChange={handleChange}
              placeholder="VP / Director / MD"
            />
          </div>
        </div>

        <div>
          <Label>Summary</Label>
          <Input
            name="summary"
            value={form.summary}
            onChange={handleChange}
            placeholder="1–2 lines about the role"
          />
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={6}
            placeholder="Responsibilities, coverage, book expectations, portability, remuneration..."
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Save Role
          </button>
          {status && (
            <span className="text-sm text-neutral-600 dark:text-neutral-300">
              {status}
            </span>
          )}
        </div>
      </form>
    </main>
  );
}