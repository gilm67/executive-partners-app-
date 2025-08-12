export default function RegisterPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Register Confidentially</h1>
      <p className="text-neutral-700">
        This is a placeholder. Next step: we’ll add a form that saves to Google Sheets (or Supabase) and accepts CV uploads,
        then runs AI parsing for profile summaries and matching.
      </p>
      <a href="/contact" className="inline-block rounded-lg border px-4 py-2 hover:bg-white">
        Prefer to email us? Get in touch
      </a>
    </section>
  );
}
