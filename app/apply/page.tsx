// app/apply/page.tsx
export default function ApplyPage({ searchParams }: { searchParams: { job?: string } }) {
  const prefill = searchParams?.job ?? "";

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Submit your CV</h1>

      <form action="/api/apply" method="post" className="space-y-4">
        <input type="hidden" name="job" value={prefill} />
        <div>
          <label className="block text-sm font-medium">Role of interest (optional)</label>
          <input
            name="role"
            defaultValue={prefill}
            placeholder="e.g., Senior Relationship Manager — CH Onshore"
            className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2"
          />
        </div>
        {/* … your existing fields for name, email, cv link, message etc … */}
        <button className="rounded-lg bg-black text-white px-4 py-2">Send</button>
      </form>
    </div>
  );
}