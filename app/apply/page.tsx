// app/apply/page.tsx
'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export const dynamic = 'force-dynamic';

function ApplyFormInner() {
  const sp = useSearchParams(); // ✅ inside Suspense
  const prefill = sp.get('job') || '';

  // form state
  const [form, setForm] = useState({
    job: prefill,
    name: '',
    email: '',
    phone: '',
    message: '',
    // honeypot (spam trap)
    company: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const isValidEmail = useMemo(
    () => /^\S+@\S+\.\S+$/.test(form.email.trim()),
    [form.email]
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMsg(null);
    setErr(null);

    // simple client validation
    if (!form.name.trim()) {
      setErr('Please enter your name.');
      setSubmitting(false);
      return;
    }
    if (!isValidEmail) {
      setErr('Please enter a valid email address.');
      setSubmitting(false);
      return;
    }
    // honeypot check
    if (form.company.trim().length > 0) {
      setErr('Submission blocked.');
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // only send fields we care about
        body: JSON.stringify({
          job: form.job,
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || `HTTP ${res.status}`);

      setMsg('Application sent. Thank you!');
      setForm((s) => ({ ...s, name: '', email: '', phone: '', message: '' }));
    } catch (e: any) {
      setErr(`Failed: ${e?.message || String(e)}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Submit your CV</h1>

      {msg && (
        <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-3 text-sm">
          {msg}
        </div>
      )}
      {err && (
        <div className="rounded-xl border border-rose-300 bg-rose-50 p-3 text-sm">
          {err}
        </div>
      )}

      <form onSubmit={onSubmit} className="grid gap-4">
        <div>
          <label className="text-sm font-medium" htmlFor="job">Role (optional)</label>
          <input
            id="job"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            value={form.job}
            onChange={(e) => setForm((s) => ({ ...s, job: e.target.value }))}
            placeholder="e.g., Private Banker — MEA"
            aria-label="Role you are applying for (optional)"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium" htmlFor="name">Name</label>
            <input
              id="name"
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={form.name}
              onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={form.email}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
              required
              aria-invalid={!isValidEmail}
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="phone">Phone</label>
          <input
            id="phone"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            value={form.phone}
            onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
          />
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="message">Message</label>
          <textarea
            id="message"
            rows={6}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            value={form.message}
            onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
          />
        </div>

        {/* Honeypot (hidden) */}
        <div className="hidden">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            tabIndex={-1}
            autoComplete="off"
            value={form.company}
            onChange={(e) => setForm((s) => ({ ...s, company: e.target.value }))}
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