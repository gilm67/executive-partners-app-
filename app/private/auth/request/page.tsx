// app/private/auth/request/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

type PageProps = {
  searchParams?: { next?: string | string[] };
};

function pickFirst(v?: string | string[]) {
  if (!v) return null;
  return typeof v === "string" ? v : v[0] ?? null;
}

export default async function PrivateAuthRequestPage({ searchParams }: PageProps) {
  const next = pickFirst(searchParams?.next);

  return (
    <main className="mx-auto max-w-xl px-6 py-16 text-white">
      <h1 className="text-2xl font-semibold">Request secure access</h1>
      <p className="mt-2 text-white/70">
        Enter your email. We will send a single-use link (valid 20 minutes).
      </p>

      <form
        className="mt-6 space-y-3"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const email = (form.elements.namedItem("email") as HTMLInputElement).value;
          const nextValue = (form.elements.namedItem("next") as HTMLInputElement).value || null;

          await fetch("/api/magic-link/request", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, next: nextValue }),
          });

          alert("If this email is allowed, a secure link has been sent.");
        }}
      >
        <input
          name="email"
          type="email"
          required
          placeholder="you@domain.com"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
        />

        {/* ✅ forward next to the API */}
        <input type="hidden" name="next" value={next ?? ""} />

        <button className="w-full rounded-xl bg-white px-4 py-3 text-sm font-semibold text-black">
          Send secure link
        </button>
      </form>
    </main>
  );
}