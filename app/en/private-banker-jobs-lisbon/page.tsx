import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private Banker Jobs in Lisbon, Portugal | Executive Partners",
  description:
    "Private banking and wealth management roles in Lisbon, including Portuguese onshore, Brazilian market and international offshore client coverage with strong links to Geneva, Zurich and London.",
  alternates: { canonical: "https://www.execpartners.ch/en/private-banker-jobs-lisbon" },
  twitter: {
    card: "summary_large_image",
    title: "Private Banker Jobs in Lisbon, Portugal",
    description: "Private banking roles in Lisbon covering Portuguese onshore, Brazilian and international offshore clients. Senior RM and advisory mandates with Swiss and European booking links.",
    images: ["/og.webp"],
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0E13] text-white py-16 px-4">
      <div className="container-max max-w-5xl space-y-10">

        {/* Breadcrumb */}
        <nav className="text-xs text-white/60">
          <Link href="/en/markets" className="hover:text-[#D4AF37]">Markets</Link>
          <span className="mx-1">/</span>
          <Link href="/en/markets/lisbon" className="hover:text-[#D4AF37]">Lisbon</Link>
          <span className="mx-1">/</span>
          <span>Private Banker Jobs</span>
        </nav>

        {/* Hero */}
        <header className="space-y-4">
          <p className="uppercase tracking-[0.2em] text-[11px] text-white/60">
            PRIVATE BANKING · LISBON / PORTUGAL
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Private Banker Jobs in <span className="text-[#D4AF37]">Lisbon</span>
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl">
            Lisbon is an emerging hub for international wealth professionals, combining
            Portuguese onshore HNW clients, a growing Brazilian market coverage desk,
            and international offshore clients who have relocated under Portugal&apos;s
            residency and tax programmes. We advise senior private bankers and
            relationship managers in Lisbon, typically in roles linked to Swiss,
            UK or other European booking centres.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/en/apply"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium bg-[#D4AF37] text-black hover:bg-[#f5d778] transition"
            >
              Apply confidentially
            </Link>
            <Link
              href="/en/jobs"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium border border-white/40 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
            >
              View open roles
            </Link>
          </div>
        </header>

        {/* Main content */}
        <section className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1.25fr)] items-start">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold">Lisbon as a Private Banking Hub</h2>
              <p className="mt-3 text-white/75">
                Lisbon has attracted a growing pool of international wealth professionals
                and UHNW individuals, partly driven by Portugal&apos;s residency programmes.
                Banks and EAMs active in Lisbon typically serve Portuguese domestic HNW
                clients, Brazilian offshore wealth (often booked in Geneva, Zurich or
                Luxembourg), and relocated international clients from the UK, France
                and further afield.
              </p>
              <p className="mt-3 text-white/75">
                Demand for senior relationship managers in Lisbon tends to focus on
                Portuguese-speaking bankers with cross-border knowledge and an understanding
                of how to structure wealth between Lisbon and a Swiss or European booking
                centre. Language is critical: Portuguese and English are the minimum for
                most roles, with French or Spanish adding material value depending on the
                client base.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold">What We Advise Bankers Considering Lisbon</h2>
              <ul className="mt-3 space-y-2 text-white/80 list-disc list-inside">
                <li>Portuguese and English fluency is the baseline for onshore roles</li>
                <li>Brazilian market coverage from Lisbon is a growing niche, often booking into Geneva or Luxembourg</li>
                <li>Cross-border regulatory knowledge between Portugal and Switzerland is a genuine differentiator</li>
                <li>Non-habitual resident and golden visa expertise is valued for UHNW client-facing roles</li>
                <li>Compensation is below Geneva and Zurich equivalents, but improving for senior roles with portable books</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold">Discreet Advisory for Senior Bankers</h2>
              <p className="mt-3 text-white/75">
                We help you assess whether a Lisbon-based role fits your client franchise,
                language profile and longer-term positioning, and whether your book would
                best be served onshore or via a cross-border structure linked to Geneva or
                Zurich. Every conversation is confidential.
              </p>
            </div>
          </div>

          {/* Snapshot card */}
          <aside className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur space-y-4">
            <h3 className="text-lg font-semibold">Lisbon Wealth Snapshot</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Portuguese onshore HNW and family wealth</li>
              <li>• Brazilian offshore market (Geneva/Luxembourg booking)</li>
              <li>• International relocatees under residency programmes</li>
              <li>• Portuguese and English mandatory, French/Spanish valuable</li>
              <li>• Strong links to Geneva, Zurich, London, Luxembourg</li>
            </ul>
            <div className="pt-4 border-t border-white/10 text-xs text-white/60 space-y-3">
              <p>We place senior private bankers covering Portuguese and Brazilian clients in Lisbon and from cross-border hub roles.</p>
              <Link
                href="/en/apply"
                className="inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-medium bg-[#D4AF37] text-black hover:bg-[#f5d778] transition"
              >
                Start a confidential discussion
              </Link>
            </div>
          </aside>
        </section>

        {/* CTA strip */}
        <section className="grid gap-6 md:grid-cols-2 border-t border-white/10 pt-10">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-lg font-semibold">For Private Bankers</h3>
            <p className="mt-2 text-sm text-white/75">
              Share a high-level overview of your Portuguese or Brazilian client franchise.
              We advise on onshore vs offshore structure, platform fit and compensation.
            </p>
            <div className="mt-4">
              <Link
                href="/en/apply"
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium bg-[#D4AF37] text-black hover:bg-[#f5d778] transition"
              >
                Apply confidentially
              </Link>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-lg font-semibold">For Hiring Managers</h3>
            <p className="mt-2 text-sm text-white/75">
              If you are building or expanding a Lisbon team, we can identify senior bankers
              with genuine Portuguese or Brazilian client relationships and portable revenue.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/en/hiring-managers"
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium border border-white/40 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
              >
                Brief a mandate
              </Link>
              <Link
                href="/en/markets/lisbon"
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-white/70 hover:text-[#D4AF37] transition"
              >
                Lisbon market page →
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
