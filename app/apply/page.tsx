// app/apply/page.tsx
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Apply confidentially",
  description:
    "Send your details securely. We’ll contact you if there’s a strong fit.",
};

// Helper to read a single query value
function getParam(sp: Record<string, any> | undefined, key: string): string {
  const v = sp?.[key];
  if (Array.isArray(v)) return v[0] ?? "";
  return (v as string) ?? "";
}

export default function ApplyPage({ searchParams }: any) {
  const role = getParam(searchParams, "role");
  const market = getParam(searchParams, "market");
  const jobId = getParam(searchParams, "jobId");

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Apply confidentially</h1>
      <p className="text-neutral-400">
        Your profile will be reviewed discreetly. We’ll contact you if there’s a strong fit.
      </p>

      <form
        method="POST"
        action="/api/apply"
        className="mx-auto w-full max-w-2xl rounded-2xl border bg-white p-6 shadow-sm"
      >
        {/* hidden context */}
        <input type="hidden" name="jobId" value={jobId} />
        <input type="hidden" name="__source" value="apply-page" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-800">Name</label>
            <input
              name="name"
              required
              placeholder="Your full name"
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-800">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-800">Role</label>
            <input
              name="role"
              defaultValue={role}
              placeholder="e.g. Private Banker"
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-neutral-800">Market</label>
            <input
              name="market"
              defaultValue={market}
              placeholder="e.g. CH Onshore"
              className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="mb-1 block text-sm font-medium text-neutral-800">Notes (optional)</label>
          <textarea
            name="notes"
            rows={5}
            placeholder="Anything you’d like to add…"
            className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
          >
            Submit
          </button>
        </div>

        <p className="mt-3 text-xs text-neutral-500">
          By submitting, you agree your data will be processed to assess role fit. You can request deletion at any time.
        </p>
      </form>
    </section>
  );
}
