export default function PrivateSettingsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-semibold">Session & Access</h1>
      <p className="mt-2 text-white/70">
        For security, access expires automatically. If needed, request a new magic link.
      </p>

      <div className="mt-8 rounded-xl border border-white/10 p-5">
        <div className="text-sm text-white/60">Next step</div>
        <div className="mt-1 font-medium">Add Logout + Session revoke</div>
        <div className="mt-2 text-sm text-white/60">
          We’ll add a one-click logout that revokes the current session in Supabase and clears the cookie.
        </div>
      </div>
    </div>
  );
}