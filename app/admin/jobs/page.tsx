// app/admin/jobs/page.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';

type Job = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  location: string;
  market: string;
  seniority: string;
  role: string;
  confidential: boolean;
  active: boolean;
  createdAt?: string;
};

export const dynamic = 'force-dynamic';

const FIELDS = [
  { name: 'title', label: 'Title', placeholder: 'Senior Relationship Manager — CH Onshore' },
  { name: 'role', label: 'Role', placeholder: 'Senior Relationship Manager' },
  { name: 'market', label: 'Market', placeholder: 'Switzerland (Onshore) / Middle East & Africa (MEA) / Brazil (LatAm)' },
  { name: 'location', label: 'Location', placeholder: 'Geneva' },
  { name: 'seniority', label: 'Seniority', placeholder: 'Director / Executive Director' },
] as const;

// Helpers to build HeadersInit safely (avoid unions with possibly-undefined)
function jsonAuthHeaders(token: string): HeadersInit {
  const h: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}
function authHeaders(token: string): HeadersInit {
  const h: Record<string, string> = {};
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

export default function AdminJobsPage() {
  const [token, setToken] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // form state
  const [form, setForm] = useState({
    title: '',
    role: '',
    market: '',
    location: '',
    seniority: '',
    summary: '',
    description:
      '## Position Overview\n\n(Write a short overview…)\n\n## Key Responsibilities\n- …\n\n## Requirements\n- …\n',
    confidential: true,
    active: true,
  });

  // load token from localStorage once
  useEffect(() => {
    try {
      const t = localStorage.getItem('EP_ADMIN_TOKEN') || '';
      if (t) setToken(t);
    } catch {}
  }, []);

  // keep this if you want to render UI conditionally on auth,
  // but don't spread it into fetch headers (that caused the TS error)
  const hasAuth = useMemo(() => Boolean(token), [token]);

  async function loadJobs() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/jobs/list', { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || `HTTP ${res.status}`);
      setJobs(data.jobs as Job[]);
    } catch (e: any) {
      setMessage(`Load failed: ${e?.message || String(e)}`);
    } finally {
      setLoading(false);
    }
  }

  async function createJob(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    setMessage(null);

    if (!token) {
      setMessage('Please paste your admin token first.');
      setCreating(false);
      return;
    }

    try {
      const res = await fetch('/api/jobs/create', {
        method: 'POST',
        headers: jsonAuthHeaders(token),
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || `HTTP ${res.status}`);
      }

      setMessage(`Created: ${data.id?.title || ''} (${data.id?.slug || ''})`);
      await loadJobs(); // refresh list
    } catch (e: any) {
      setMessage(`Create failed: ${e?.message || String(e)}`);
    } finally {
      setCreating(false);
    }
  }

  async function revalidate() {
    setMessage(null);
    try {
      const res = await fetch('/api/revalidate-jobs', {
        method: 'POST',
        headers: authHeaders(token),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || `HTTP ${res.status}`);
      setMessage('Revalidated /jobs');
    } catch (e: any) {
      setMessage(`Revalidate failed: ${e?.message || String(e)}`);
    }
  }

  function saveToken(t: string) {
    setToken(t);
    try {
      localStorage.setItem('EP_ADMIN_TOKEN', t);
    } catch {}
  }

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Admin — Jobs</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={loadJobs}
            className="rounded-lg border px-3 py-2 text-sm"
            disabled={loading}
          >
            {loading ? 'Loading…' : 'Load Jobs'}
          </button>
          <button
            onClick={revalidate}
            className="rounded-lg border px-3 py-2 text-sm"
            disabled={!hasAuth}
            title={!hasAuth ? 'Paste admin token first' : undefined}
          >
            Revalidate /jobs
          </button>
        </div>
      </header>

      {/* Token */}
      <section className="rounded-2xl border p-4">
        <label className="block text-sm font-medium">Admin Token</label>
        <div className="mt-2 flex gap-2">
          <input
            type="password"
            value={token}
            onChange={(e) => saveToken(e.target.value)}
            className="w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="Paste your ADMIN token…"
          />
          <button
            onClick={() => saveToken('')}
            className="rounded-lg border px-3 py-2 text-sm"
          >
            Clear
          </button>
        </div>
        <p className="mt-1 text-xs text-neutral-500">
          Stored locally in your browser (localStorage). Never commit this to Git.
        </p>
      </section>

      {/* Create form */}
      <section className="rounded-2xl border p-4">
        <h2 className="text-lg font-medium">Create Job</h2>
        <form onSubmit={createJob} className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {FIELDS.map((f) => (
            <div key={f.name} className="flex flex-col">
              <label className="text-sm font-medium">{f.label}</label>
              <input
                className="mt-1 rounded-lg border px-3 py-2 text-sm"
                placeholder={f.placeholder}
                value={(form as any)[f.name]}
                onChange={(e) => setForm((s) => ({ ...s, [f.name]: e.target.value }))}
              />
            </div>
          ))}

          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm font-medium">Summary</label>
            <input
              className="mt-1 rounded-lg border px-3 py-2 text-sm"
              placeholder="One-line teaser…"
              value={form.summary}
              onChange={(e) => setForm((s) => ({ ...s, summary: e.target.value }))}
            />
          </div>

          <div className="md:col-span-2 flex flex-col">
            <label className="text-sm font-medium">Description (Markdown)</label>
            <textarea
              rows={10}
              className="mt-1 rounded-lg border px-3 py-2 text-sm font-mono"
              value={form.description}
              onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.confidential}
                onChange={(e) => setForm((s) => ({ ...s, confidential: e.target.checked }))}
              />
              Confidential
            </label>
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm((s) => ({ ...s, active: e.target.checked }))}
              />
              Active
            </label>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="rounded-lg bg-black px-4 py-2 text-sm text-white disabled:opacity-60"
              disabled={creating}
            >
              {creating ? 'Creating…' : 'Create Job'}
            </button>
          </div>
        </form>
      </section>

      {/* Messages */}
      {message && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm">
          {message}
        </div>
      )}

      {/* List */}
      <section className="rounded-2xl border p-4">
        <h2 className="text-lg font-medium mb-3">Jobs ({jobs.length})</h2>
        <div className="grid gap-3">
          {jobs.map((j) => (
            <div key={j.id} className="rounded-xl border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="font-medium">{j.title}</div>
                <div className="text-xs text-neutral-600">
                  {j.market} — {j.location} — {j.seniority}
                </div>
              </div>
              <div className="mt-1 text-xs text-neutral-600">
                slug: <code>{j.slug}</code> · id: <code>{j.id}</code>{' '}
                {j.createdAt ? `· ${new Date(j.createdAt).toLocaleString()}` : null}
              </div>
              <div className="mt-2 flex gap-2 text-xs">
                <span className="rounded bg-neutral-100 px-2 py-1">active: {String(j.active)}</span>
                <span className="rounded bg-neutral-100 px-2 py-1">confidential: {String(j.confidential)}</span>
                <a
                  className="rounded bg-neutral-900 px-2 py-1 text-white"
                  href={`/jobs/${j.slug}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View
                </a>
              </div>
            </div>
          ))}
          {!jobs.length && <p className="text-sm text-neutral-500">No jobs loaded. Click “Load Jobs”.</p>}
        </div>
      </section>
    </main>
  );
}