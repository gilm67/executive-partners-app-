// app/apply/page.tsx
import Link from "next/link";

export const revalidate = 0;
export const dynamic = "force-dynamic";

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default function ApplyPage({ searchParams }: Props) {
  const qs = (k: string) => {
    const v = searchParams?.[k];
    return Array.isArray(v) ? v[0] : v || "";
  };

  const role = qs("role");
  const market = qs("market");
  const jobId = qs("jobId"); // optional

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Apply confidentially</h1>
        <Link href="/jobs" className="text-sm underline text-neutral-600 hover:text-neutral-800">
          ← Back to Jobs
        </Link>
      </div>

      <p className="text-neutral-500">
        Your profile will be reviewed discreetly. We’ll contact you if there’s a strong fit.
      </p>

      <form
        method="post"
        action="/api/apply"
        className="rounded-2xl border border-neutral-200 bg-white p-6 text-neutral-900"
      >
        {/* Name + Email */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-neutral-600">Name</label>
            <input
              name="name"
              required
              placeholder="Your full name"
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-neutral-600">Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-500"
            />
          </div>
        </div>

        {/* Role + Market */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-neutral-600">Role</label>
            <input
              name="role"
              defaultValue={role}
              placeholder="e.g., Private Banker"
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-neutral-600">Market</label>
            <input
              name="market"
              defaultValue={market}
              placeholder="e.g., CH Onshore"
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-500"
            />
          </div>
        </div>

        {/* Notes */}
        <div className="mt-4">
          <label className="mb-1 block text-sm text-neutral-600">Notes (optional)</label>
          <textarea
            name="notes"
            rows={5}
            placeholder="Anything you'd like to add…"
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-500"
          />
        </div>

        {/* Optional jobId propagated from job card */}
        <input type="hidden" name="jobId" value={jobId} />

        <button
          type="submit"
          className="mt-6 rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
