// app/apply/page.tsx
// Server component: plain HTML form posts to /api/apply

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SearchParams = {
  [key: string]: string | string[] | undefined;
};

function pickFirst(v: string | string[] | undefined): string {
  if (Array.isArray(v)) return v[0] ?? "";
  return v ?? "";
}

export default function ApplyPage({
  searchParams,
}: {
  searchParams?: SearchParams;
}) {
  const role = pickFirst(searchParams?.role);
  const market = pickFirst(searchParams?.market);
  const jobId = pickFirst(searchParams?.jobId);

  return (
    <section className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-2">Apply confidentially</h1>
      <p className="text-sm text-neutral-500 mb-6">
        Your profile will be reviewed discreetly. We’ll contact you if there’s a strong fit.
      </p>

      <form
        action="/api/apply"
        method="POST"
        className="space-y-4 rounded-2xl border bg-white p-6 shadow-sm"
      >
        {/* Hidden job id if present */}
        <input type="hidden" name="jobId" value={jobId} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-800">Name</label>
            <input
              name="name"
              required
              className="mt-1 block w-full rounded-lg border border-neutral-300 bg-white p-2 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-800">Email</label>
            <input
              name="email"
              type="email"
              required
              className="mt-1 block w-full rounded-lg border border-neutral-300 bg-white p-2 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-800">Role</label>
            <input
              name="role"
              defaultValue={role}
              className="mt-1 block w-full rounded-lg border border-neutral-300 bg-white p-2 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Private Banker"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-800">Market</label>
            <input
              name="market"
              defaultValue={market}
              className="mt-1 block w-full rounded-lg border border-neutral-300 bg-white p-2 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., CH Onshore"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-800">Notes (optional)</label>
          <textarea
            name="notes"
            rows={5}
            className="mt-1 block w-full rounded-lg border border-neutral-300 bg-white p-2 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Anything you’d like to add…"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </section>
  );
}

