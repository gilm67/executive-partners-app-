export default function PrivateProfilesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-semibold">Anonymised Profiles</h1>
      <p className="mt-2 text-white/70">
        Profiles shown here are anonymised by default. Identity is disclosed only after approval.
      </p>

      <div className="mt-8 rounded-xl border border-white/10 p-5">
        <div className="text-sm text-white/60">Next step</div>
        <div className="mt-1 font-medium">Connect profiles to a data source</div>
        <div className="mt-2 text-sm text-white/60">
          We’ll add a Supabase table and render real anonymised cards (Geneva / Zurich / Dubai / SG / HK / London / US).
        </div>
      </div>
    </div>
  );
}