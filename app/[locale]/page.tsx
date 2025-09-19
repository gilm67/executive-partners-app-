import Link from "next/link";
import type { Metadata } from "next";

/* ------------ Optional featured jobs (won't crash if it fails) ------------ */
async function getFeaturedJobs(): Promise<
  Array<{ slug: string; title: string; city?: string; summary?: string }>
> {
  try {
    const qs = new URLSearchParams({ featured: "1", limit: "3" }).toString();
    const r = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/jobs?${qs}`, {
      cache: "no-store",
      // If NEXT_PUBLIC_BASE_URL is not set, fall back to relative at runtime
      // (Next.js will still SSR just fine on Vercel)
      next: { revalidate: 0 }
    });
    if (!r.ok) return [];
    const data = await r.json();
    if (!Array.isArray(data)) return [];
    return data
      .filter((j) => j?.active !== false)
      .slice(0, 3)
      .map((j) => ({ slug: j.slug, title: j.title, city: j.city, summary: j.summary }));
  } catch {
    return [];
  }
}

/* ------------ SEO ------------ */
export const metadata: Metadata = {
  title: {
    absolute: "Executive Partners – Private Banking & Wealth Management Search"
  },
  description:
    "Executive Partners is Switzerland’s leading financial recruiter in private banking and wealth management. Based in Geneva, we connect private bankers with confidential opportunities in Zurich, Dubai, Singapore, London, and New York."
};

/* ------------ Buttons (local) ------------ */
function PrimaryBtn({
  href,
  children,
  variant = "blue"
}: {
  href: string;
  children: React.ReactNode;
  variant?: "blue" | "outline" | "ghost";
}) {
  const cls =
    variant === "blue"
      ? "bg-[#1D4ED8] text-white hover:bg-[#1E40AF] shadow-[0_8px_30px_rgba(29,78,216,.35)] font-semibold"
      : variant === "outline"
      ? "border border-white/15 bg-white/5 hover:bg-white/10 text-white"
      : "border border-white/10 bg-transparent hover:bg-white/5 text-white";

  return (
    <Link
      href={href}
      className={`w-full rounded-xl px-4 py-3 text-center text-sm font-semibold transition ${cls}`}
    >
      {children}
    </Link>
  );
}

function CardBtn({
  href,
  tone = "blue",
  children
}: {
  href: string;
  tone?: "blue" | "green" | "neutral";
  children: React.ReactNode;
}) {
  const toneClass =
    tone === "blue"
      ? "bg-blue-600 hover:bg-blue-700"
      : tone === "green"
      ? "bg-emerald-600 hover:bg-emerald-700"
      : "bg-white/10 hover:bg-white/20";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${toneClass}`}
    >
      {children}
    </Link>
  );
}

/* ---------------- Page ---------------- */
export default async function HomePage() {
  const featured = await getFeaturedJobs();

  return (
    <main className="min-h-[70vh]">
      {/* Hero */}
      <section
        className="relative overflow-hidden rounded-2xl"
        style={{
          background:
            "radial-gradient(1200px 500px at 10% 0%, #0b3175 0%, #0a0f1f 60%, #0a0f1f 100%)",
          color: "#fff"
        }}
      >
        <div className="px-6 py-16 md:px-12 md:py-24 max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Private Banking & Wealth Management Search
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Geneva-based. Discreet placements across Zurich, Dubai, Singapore, London, and New York.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:w-[560px]">
            <PrimaryBtn href="/jobs">Browse Roles</PrimaryBtn>
            <PrimaryBtn href="/contact" variant="outline">Speak with a Partner</PrimaryBtn>
          </div>
        </div>
      </section>

      {/* Featured Roles */}
      <section className="mt-10 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl md:text-2xl font-semibold">Featured Roles</h2>
          <Link href="/jobs" className="text-sm underline">View all</Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(featured.length ? featured : [
            { slug: "private-banker-geneva", title: "Private Banker", city: "Geneva" },
            { slug: "relationship-manager-zurich", title: "Relationship Manager", city: "Zurich" },
            { slug: "uhnw-advisor-dubai", title: "UHNWI Advisor", city: "Dubai" }
          ]).map((j) => (
            <article key={j.slug} className="rounded-xl border border-white/10 bg-[#0a0f1f] p-5 text-white">
              <h3 className="text-base font-semibold">{j.title}</h3>
              <p className="text-sm opacity-70">{j.city ?? "—"}</p>
              {j.summary ? (
                <p className="mt-3 text-sm opacity-80 line-clamp-3">{j.summary}</p>
              ) : null}
              <div className="mt-4">
                <CardBtn href={`/jobs/${j.slug}`}>View role</CardBtn>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Audiences */}
      <section className="mt-12 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border p-5">
            <h3 className="font-semibold">Candidates</h3>
            <p className="mt-2 text-sm opacity-80">
              Confidential introductions to leading platforms and boutiques.
            </p>
            <div className="mt-4">
              <CardBtn href="/candidates">Explore</CardBtn>
            </div>
          </article>
          <article className="rounded-xl border p-5">
            <h3 className="font-semibold">Hiring Managers</h3>
            <p className="mt-2 text-sm opacity-80">
              Targeted searches and market intelligence across EMEA & APAC.
            </p>
            <div className="mt-4">
              <CardBtn href="/hiring-managers" tone="green">Discover</CardBtn>
            </div>
          </article>
          <article className="rounded-xl border p-5">
            <h3 className="font-semibold">Contact</h3>
            <p className="mt-2 text-sm opacity-80">
              Speak directly with a partner. Discretion guaranteed.
            </p>
            <div className="mt-4">
              <CardBtn href="/contact" tone="neutral">Get in touch</CardBtn>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
