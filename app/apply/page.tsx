// app/apply/page.tsx
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export const dynamic = 'force-dynamic';

function ApplyFormInner() {
  const sp = useSearchParams();                   // ✅ inside Suspense
  const prefill = sp.get('job') || '';

  const [form, setForm] = useState({
    job: prefill,
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMsg(null);
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || `HTTP ${res.status}`);
      setMsg('Application sent. Thank you!');
      setForm((s) => ({ ...s, name: '', email: '', phone: '', message: '' }));
    } catch (e: any) {
      setMsg(`Failed: ${e?.message || String(e)}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Submit your CV</h1>

      {msg && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm">
          {msg}
        </div>
      )}

      <form onSubmit={onSubmit} className="grid gap-4">
        <div>
          <label className="text-sm font-medium">Role (optional)</label>
          <input
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            value={form.job}
            onChange={(e) => setForm((s) => ({ ...s, job: e.target.value }))}
            placeholder="e.g., Private Banker — MEA"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Name</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={form.email}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
              required
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Phone</label>
          <input
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            value={form.phone}
            onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Message</label>
          <textarea
            rows={6}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            value={form.message}
            onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-black px-4 py-2 text-white text-sm disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? 'Sending…' : 'Send Application'}
        </button>
      </form>
    </main>
  );
}

export default function ApplyPage() {
  return (
    <Suspense fallback={<main className="mx-auto max-w-3xl px-4 py-10">Loading…</main>}>
      <ApplyFormInner />
    </Suspense>
  );
}