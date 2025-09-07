// app/apply/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export const dynamic = 'force-dynamic';

export default function ApplyPage() {
  const sp = useSearchParams();
  const prefilledJob = sp.get('job') ?? '';

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: prefilledJob,
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
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
      setMsg(`Submit failed: ${e?.message || String(e)}`);
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Submit your CV</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Apply confidentially. We’ll get back to you shortly.
      </p>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Role</label>
          <input
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            value={form.role}
            onChange={(e) => setForm((s) => ({ ...s, role: e.target.value }))}
            placeholder="e.g., Senior Relationship Manager — Brazil"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Full name</label>
          <input
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            placeholder="Your name"
            required
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={form.email}
              onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
              placeholder="you@company.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
              value={form.phone}
              onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
              placeholder="+41 ..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Message</label>
          <textarea
            rows={6}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            value={form.message}
            onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
            placeholder="A short note about your experience and goals…"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-black px-4 py-2 text-sm text-white disabled:opacity-60"
          disabled={sending}
        >
          {sending ? 'Sending…' : 'Submit'}
        </button>
      </form>

      {msg && (
        <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm">
          {msg}
        </div>
      )}
    </main>
  );
}
