// pages/apply.tsx
import Head from "next/head";

export default function ApplyFallbackPage() {
  const role =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("role") || ""
      : "";
  const market =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("market") || ""
      : "";
  const jobId =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("jobId") || ""
      : "";

  return (
    <>
      <Head>
        <title>Apply confidentially | Executive Partners</title>
      </Head>

      <section className="space-y-6 max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-semibold">Apply confidentially</h1>
        <p className="text-neutral-500">
          Your profile will be reviewed discreetly. We’ll contact you if there’s a strong fit.
        </p>

        <form
          method="POST"
          action="/api/apply"
          className="rounded-2xl border bg-white p-4 shadow-sm"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-800">Name</label>
              <input
                name="name"
                required
                className="mt-1 w-full rounded-lg border px-3 py-2 text-neutral-900 placeholder-neutral-400 bg-white"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-800">Email</label>
              <input
                type="email"
                name="email"
                required
                className="mt-1 w-full rounded-lg border px-3 py-2 text-neutral-900 placeholder-neutral-400 bg-white"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-800">Role</label>
              <input
                name="role"
                defaultValue={role}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-neutral-900 placeholder-neutral-400 bg-white"
                placeholder="e.g., Private Banker"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-800">Market</label>
              <input
                name="market"
                defaultValue={market}
                className="mt-1 w-full rounded-lg border px-3 py-2 text-neutral-900 placeholder-neutral-400 bg-white"
                placeholder="e.g., CH Onshore"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-neutral-800">Notes (optional)</label>
            <textarea
              name="notes"
              rows={5}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-neutral-900 placeholder-neutral-400 bg-white"
              placeholder="Anything you’d like to add…"
            />
          </div>

          <input type="hidden" name="jobId" value={jobId} />

          <button
            type="submit"
            className="mt-4 rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
          >
            Submit
          </button>
        </form>
      </section>
    </>
  );
}
