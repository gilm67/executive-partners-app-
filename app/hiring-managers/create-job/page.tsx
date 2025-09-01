// unified Hiring Managers page — bright card on dark bg
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const normalizeSlug = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function HiringManagersPage() {
  const router = useRouter();

  const [token, setToken] = useState("");
  const [saving, setSaving] = useState(false);
  const [note, setNote] = useState<null | { ok: boolean; msg: string }>(null);

  const [form, setForm] = useState({
    title: "",
    role: "",
    location: "",
    market: "",
    seniority: "",
    summary: "",
    description: "",
    confidential: false,
  });

  const onField =
    (name: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((p) => ({ ...p, [name]: e.target.value }));

  const onToggle =
    (name: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((p) => ({ ...p, [name]: e.target.checked }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setNote(null);
    const slug = normalizeSlug(form.title || `${form.role}-${form.location}`);

    try {
      const res = await fetch("/api/jobs/admin-create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": token.trim(),
        },
        body: JSON.stringify({ ...form, slug }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Failed to create role");
      setNote({ ok: true, msg: `Role created: ${form.title}` });
      setForm({
        title: "",
        role: "",
        location: "",
        market: "",
        seniority: "",
        summary: "",
        description: "",
        confidential: false,
      });
      router.push("/jobs");
    } catch (err: any) {
      setNote({ ok: false, msg: err.message || "Unexpected error" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      {/* page header */}
      <header className="mb-8 text-center">
        <div className="mx-auto w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
          Hiring Managers
        </div>
        <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
          Post a New Role
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-sm text-neutral-300">
          Create a new role. Entries are added instantly and appear on the{" "}
          <a href="/jobs" className="underline decoration-white/20 underline-offset-4 hover:text-white">
            Jobs
          </a>{" "}
          page.
        </p>
      </header>

      {/* bright card on dark background */}
      <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5">
        <form onSubmit={onSubmit} className="grid gap-6">
          {/* token */}
          <div className="grid gap-2">
            <label className="text-sm font-medium text-neutral-800">Admin Token</label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Paste the value you set in Vercel (JOBS_ADMIN_TOKEN)"
              className="w-full rounded-md border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-500 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <p className="text-xs text-neutral-500">Used once for this request only.</p>
          </div>

          {/* title */}
          <div className="grid gap-2">
            <label className="text-sm font-medium text-neutral-800">Title</label>
            <input
              value={form.title}
              onChange={onField("title")}
              placeholder="e.g. Senior Relationship Manager — Brazil"
              className="w-full rounded-md border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-500 px-4 py-3 text-base outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* 2-col fields */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-neutral-800">Role</label>
              <input
                value={form.role}
                onChange={onField("role")}
                placeholder="e.g. Senior Relationship Manager"
                className="w-full rounded-md border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-500 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-neutral-800">Location</label>
              <input
                value={form.location}
                onChange={onField("location")}
                placeholder="e.g. Zurich or Geneva"
                className="w-full rounded-md border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-500 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-neutral-800">Market</label>
              <input
                value={form.market}
                onChange={onField("market")}
                placeholder="e.g. CH Onshore / Brazil / MENA"
                className="w-full rounded-md border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-500 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-neutral-800">Seniority</label>
              <input
                value={form.seniority}
                onChange={onField("seniority")}
                placeholder="e.g. Director / ED / MD"
                className="w-full rounded-md border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-500 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
          </div>

          {/* summary */}
          <div className="grid gap-2">
            <label className="text-sm font-medium text-neutral-800">Short one-line summary</label>
            <input
              value={form.summary}
              onChange={onField("summary")}
              placeholder="Lead and grow an HNW/UHNW portfolio in Geneva."
              className="w-full rounded-md border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-500 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* description */}
          <div className="grid gap-2">
            <label className="text-sm font-medium text-neutral-800">Full description</label>
            <textarea
              value={form.description}
              onChange={onField("description")}
              placeholder="Write the full role description…"
              rows={10}
              className="w-full rounded-md border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-500 px-3 py-3 outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <p className="text-xs text-neutral-500">Markdown is fine.</p>
          </div>

          {/* actions */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <label className="inline-flex items-center gap-3">
              <input
                type="checkbox"
                checked={form.confidential}
                onChange={onToggle("confidential")}
                className="h-4 w-4 rounded border-neutral-400 text-blue-600 focus:ring-blue-600"
              />
              <span className="text-sm text-neutral-700">Confidential</span>
            </label>

            <div className="flex gap-3">
              <a
                href="/jobs"
                className="rounded-md bg-neutral-800 px-4 py-2 text-sm font-medium text-white ring-1 ring-black/10 hover:bg-neutral-700"
              >
                View Jobs
              </a>
              <button
                type="submit"
                disabled={saving}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? "Posting…" : "Post Job"}
              </button>
            </div>
          </div>

          {note && (
            <div
              className={`rounded-md px-4 py-3 text-sm ${
                note.ok
                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                  : "bg-rose-50 text-rose-700 ring-1 ring-rose-200"
              }`}
            >
              {note.msg}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
