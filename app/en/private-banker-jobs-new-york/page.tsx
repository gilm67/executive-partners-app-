import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private Banker Jobs in New York | Executive Partners",
  description:
    "Senior private banker and wealth manager roles in New York, often with cross-border links to Switzerland and Europe.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#0B0E13] text-white py-16 px-4">
      <div className="container-max mx-auto max-w-5xl space-y-10">
        <nav className="text-xs text-white/60">
          <Link href="/en/markets" className="hover:text-[#D4AF37]">
            Markets
          </Link>
          <span className="mx-1">/</span>
          <span>Private Banker Jobs in New York</span>
        </nav>

        <header className="space-y-4">
          <p className="uppercase tracking-[0.2em] text-[11px] text-white/60">
            PRIVATE BANKING · NEW YORK
          </p>
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Private Banker Jobs in <span className="gold">New York</span>
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-3xl">
            New York remains a key hub for UHNW and HNW wealth in the US and
            globally. We advise senior bankers and wealth managers exploring
            roles within global institutions, US wealth managers and family
            offices.
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

        <section className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,1.25fr)] items-start">
          <div className="space-y-8">
            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                Typical Mandates in New York
              </h2>
              <p className="mt-3 text-white/75">
                Our involvement spans UHNW and HNW franchises, including:
              </p>
              <ul className="mt-3 space-y-1 text-white/80 list-disc list-inside">
                <li>UHNW adviser roles at global private banks</li>
                <li>Senior positions within US wealth managers and wirehouses</li>
                <li>Multi-family office roles supporting complex client needs</li>
                <li>
                  Cross-border positions linking New York with Switzerland and
                  Europe
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                Moving Between Europe/Switzerland and New York
              </h2>
              <p className="mt-3 text-white/75">
                Transitions between European or Swiss platforms and the US require
                careful attention to licensing, client portability and compliance.
                We help you understand which institutions truly value your
                background and network.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-semibold">
                Strategic, Not Opportunistic, Moves
              </h2>
              <p className="mt-3 text-white/75">
                New York can be highly attractive but also demanding. We focus on
                strategic moves where platform, culture and client base are
                aligned with your profile.
              </p>
            </div>
          </div>

          <aside className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur space-y-4">
            <h3 className="text-lg font-semibold">New York Wealth Snapshot</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>• Major hub for global UHNW and institutional families</li>
              <li>• Dense competition among banks, wealth managers and FOs</li>
              <li>• Strong governance and regulatory environment</li>
              <li>• Attractive for senior advisers with deep client networks</li>
            </ul>
            <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-white/60">
              <p>
                We can help you identify which New York opportunities genuinely
                recognise and reward your experience.
              </p>
              <Link
                href="/en/apply"
                className="inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-medium bg-[#D4AF37] text-black hover:bg-[#f5d778] transition"
              >
                Start a confidential discussion
              </Link>
            </div>
          </aside>
        </section>

        <section className="grid gap-6 md:grid-cols-2 border-t border-white/10 pt-10">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="text-lg font-semibold">For Private Bankers</h3>
            <p className="mt-2 text-sm text-white/75">
              If you are considering New York as a base or already there and
              evaluating options, we can help you compare platforms and teams.
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
              We can discreetly identify senior advisers in New York who bring
              both production and strong compliance culture.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/en/hiring-managers"
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium border border-white/40 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition"
              >
                Brief a mandate
              </Link>
              <Link
                href="/en/contact"
                className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium text-white/70 hover:text-[#D4AF37] transition"
              >
                Contact Executive Partners
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}