// app/contact/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ContactPage() {
  const sp = useSearchParams();

  // Prefill from query
  const [role, setRole] = useState(sp.get("role") || "");
  const [jobId, setJobId] = useState(sp.get("jobId") || "");
  const [location, setLocation] = useState(sp.get("location") || "");
  const [market, setMarket] = useState(sp.get("market") || "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [ok, setOk] = useState<null | string>(null);
  const [err, setErr] = useState<null | string>(null);

  // Capture UA once on client
  const [ua, setUa] = useState("");
  useEffect(() => {
    setUa(typeof navigator !== "undefined" ? navigator.userAgent : "");
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setOk(null);
    setErr(null);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: name,
          Email: email,
          Message: message,
          JobID: jobId,
          Role: role,
          Location: location,
          Market: market,
          Source: "contact-page",
          UserAgent: ua,
          Notes: "",
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.ok === false) {
        throw new Error(data?.error || `Request failed (${res.status})`);
      }
      setOk("Thanks! We’ve received your message.");
      setName("");
      setEmail("");
      setMessage("");
    } catch (e: any) {
      setErr(e?.message || "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Contact Executive Partners</h1>
      <p className="text-sm text-neutral-400">
        Send us a confidential note about{role ? ` “${role}”` : " this opportunity"}.
      </p>

      <form onSubmit={onSubmit} className="space-y-4 max-w-lg">
        {/* Visible fields */}
        <div className="grid gap-3">
          <label className="grid gap-1">
            <span className="text-sm text-neutral-300">Your name</span>
            <input
              className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm text-neutral-300">Email</span>
            <input
              type="email"
              className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="grid gap-1">
            <span className="text-sm text-neutral-300">Message (optional)</span>
            <textarea
              rows={5}
              className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-white"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Quick intro, questions, availability…"
            />
          </label>
        </div>

        {/* Hidden (but editable if you want) prefilled context */}
        <div className="grid gap-3 rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <div className="grid gap-1">
            <span className="text-xs text-neutral-400">Role</span>
            <input
              className="rounded-md border border-neutral-800 bg-neutral-950 px-2 py-1 text-neutral-200"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <span className="text-xs text-neutral-400">Job ID</span>
            <input
              className="rounded-md border border-neutral-800 bg-neutral-950 px-2 py-1 text-neutral-200"
              value={jobId}
              onChange={(e) => setJobId(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <span className="text-xs text-neutral-400">Location</span>
            <input
              className="rounded-md border border-neutral-800 bg-neutral-950 px-2 py-1 text-neutral-200"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <span className="text-xs text-neutral-400">Market</span>
            <input
              className="rounded-md border border-neutral-800 bg-neutral-950 px-2 py-1 text-neutral-200"
              value={market}
              onChange={(e) => setMarket(e.target.value)}
            />
          </div>
        </div>

        {ok && <p className="text-sm text-green-400">{ok}</p>}
        {err && <p className="text-sm text-red-400">{err}</p>}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={busy}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {busy ? "Sending…" : "Send securely"}
          </button>
          <a
            href="/jobs"
            className="rounded-lg border border-neutral-700 px-4 py-2 text-neutral-200 hover:bg-neutral-800"
          >
            Back to Jobs
          </a>
        </div>
      </form>
    </section>
  );
}
