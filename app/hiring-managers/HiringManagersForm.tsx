// app/hiring-managers/HiringManagersForm.tsx
"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function HiringManagersForm() {
  const [state, setState] = useState<FormState>("idle");
  const [msg, setMsg] = useState("");

  const [formData, setFormData] = useState({
    Title: "",
    Location: "",
    Market: "",
    Seniority: "",
    Summary: "",
    Confidential: "NO", // YES/NO
    Active: "TRUE",      // TRUE/FALSE
    AdminToken: "",
  });

  function onChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setMsg("");

    // map UI fields -> API body
    const body = {
      title: formData.Title,
      location: formData.Location,
      market: formData.Market,
      seniority: formData.Seniority,
      summary: formData.Summary,
      confidential: formData.Confidential === "YES",
      active: formData.Active === "TRUE",
    };

    try {
      const res = await fetch("/api/jobs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${formData.AdminToken.trim()}`,
        },
        body: JSON.stringify(body),
      });

      const text = await res.text();
      let data: any = { ok: res.ok };
      try { data = JSON.parse(text); } catch {}

      if (!res.ok || data?.error) {
        throw new Error(data?.error || text || "Failed to create job");
      }

      setState("success");
      setMsg("✅ Job published successfully. It’s now live.");
      setFormData({
        Title: "",
        Location: "",
        Market: "",
        Seniority: "",
        Summary: "",
        Confidential: "NO",
        Active: "TRUE",
        AdminToken: "",
      });
      (e.currentTarget as HTMLFormElement).reset();
    } catch (err: any) {
      setState("error");
      setMsg(`❌ ${err?.message ?? "Unable to create job"}`);
    }
  }

  return (
    <section className="md:col-span-3">
      {state !== "idle" && msg && (
        <div
          className={`mb-6 rounded-xl border p-4 text-sm ${
            state === "success"
              ? "border-emerald-700/40 bg-emerald-900/20 text-emerald-300"
              : state === "error"
              ? "border-red-700/40 bg-red-900/20 text-red-300"
              : "border-neutral-700 bg-neutral-900 text-neutral-300"
          }`}
        >
          {msg}
        </div>
      )}

      <form
        onSubmit={onSubmit}
        className="space-y-6 rounded-2xl border border-neutral-800 bg-neutral-950/40 p-6 shadow-lg"
      >
        <div>
          <label className="block text-sm font-medium text-neutral-300">
            Admin Token <span className="text-neutral-500">(from Vercel)</span>
          </label>
          <input
            name="AdminToken"
            type="password"
            required
            placeholder="Paste JOBS_ADMIN_TOKEN"
            value={formData.AdminToken}
            onChange={onChange}
            className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-neutral-600"
          />
          <p className="mt-2 text-xs text-neutral-500">Used for secure posting. Not stored on the site.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-neutral-300">Title</label>
            <input
              name="Title"
              required
              placeholder="Private Banker — Geneva"
              value={formData.Title}
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm focus:border-neutral-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300">Role (optional)</label>
            <input
              name="Role"
              placeholder="Private Banker / Team Head"
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm focus:border-neutral-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300">Market</label>
            <input
              name="Market"
              required
              placeholder="CH Onshore / MEA / UK / APAC"
              value={formData.Market}
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm focus:border-neutral-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300">Location</label>
            <input
              name="Location"
              required
              placeholder="Geneva / Zurich / Dubai / Singapore / London / NYC / HK"
              value={formData.Location}
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm focus:border-neutral-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-300">Seniority</label>
            <input
              name="Seniority"
              required
              placeholder="Director / ED / MD"
              value={formData.Seniority}
              onChange={onChange}
              className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm focus:border-neutral-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300">Short one-line summary</label>
          <input
            name="Summary"
            required
            placeholder="UHNW book build-out; Geneva onshore"
            value={formData.Summary}
            onChange={onChange}
            className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm focus:border-neutral-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300">Confidential</label>
          <select
            name="Confidential"
            value={formData.Confidential}
            onChange={onChange}
            className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm"
          >
            <option value="NO">NO</option>
            <option value="YES">YES</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300">Active</label>
          <select
            name="Active"
            value={formData.Active}
            onChange={onChange}
            className="mt-2 w-full rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm"
          >
            <option value="TRUE">TRUE</option>
            <option value="FALSE">FALSE</option>
          </select>
        </div>

        <button
          disabled={state === "submitting"}
          className="w-full rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 disabled:opacity-60"
        >
          {state === "submitting" ? "Posting…" : "Post Job"}
        </button>
      </form>
    </section>
  );
}
