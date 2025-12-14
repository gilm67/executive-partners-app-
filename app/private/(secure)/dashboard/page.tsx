export default function PrivateDashboardPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-semibold">Private Area</h1>
      <p className="mt-2 text-white/70">
        Confidential access for enrolled candidates and approved hiring managers.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <a href="/private/profiles" className="rounded-xl border border-white/10 p-5 hover:border-white/20">
          <div className="text-sm text-white/60">Client-facing</div>
          <div className="mt-1 font-medium">Anonymised Profiles</div>
          <div className="mt-2 text-sm text-white/60">
            Review vetted profiles with discretion-first formatting.
          </div>
        </a>

        <a href="/private/settings" className="rounded-xl border border-white/10 p-5 hover:border-white/20">
          <div className="text-sm text-white/60">Security</div>
          <div className="mt-1 font-medium">Session & Access</div>
          <div className="mt-2 text-sm text-white/60">
            Manage access, expiry, and request a new link.
          </div>
        </a>

        <a href="/insights" className="rounded-xl border border-white/10 p-5 hover:border-white/20">
          <div className="text-sm text-white/60">Market Intel</div>
          <div className="mt-1 font-medium">Private Wealth Pulse</div>
          <div className="mt-2 text-sm text-white/60">
            Weekly hiring signals across CH, UK, US, Dubai, SG, HK.
          </div>
        </a>
      </div>
    </div>
  );
}