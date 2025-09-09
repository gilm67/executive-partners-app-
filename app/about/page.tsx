/* app/about/page.tsx */
import Link from "next/link";
import type { Metadata } from "next";

/* Resolve absolute site URL from env or fallback */
function siteBase() {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    "https://www.execpartners.ch";
  const url = raw.startsWith("http") ? raw : `https://${raw}`;
  return url.replace(/\/$/, "");
}
const SITE = siteBase();
const PAGE_URL = `${SITE}/about`;

export const revalidate = 60;

/* ---------------- SEO ---------------- */
export const metadata: Metadata = {
  title:
    "About Executive Partners | Connecting Top Talent with Private Banking Excellence – In Switzerland & Beyond",
  description:
    "Executive Partners is Switzerland’s specialist recruiter for Private Banking & Wealth Management. Geneva-headquartered, delivering discreet search across Zurich, Dubai, Singapore, London & New York.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    siteName: "Executive Partners",
    url: PAGE_URL,
    title:
      "About Executive Partners | Connecting Top Talent with Private Banking Excellence – In Switzerland & Beyond",
    description:
      "Boutique executive search for Private Banking & Wealth Management. Trusted by banks, EAMs and family offices across Switzerland and global hubs.",
    images: [{ url: "/og.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "About Executive Partners | Private Banking & Wealth Management Search",
    description:
      "Geneva-based boutique executive search for Private Banking & Wealth Management with international reach.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export default function AboutPage() {
  /* Organization schema */
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Executive Partners",
    url: SITE,
    logo: `${SITE}/icon.png`,
    sameAs: ["https://www.linkedin.com/company/executive-partners", SITE],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "Recruitment",
        areaServed: ["CH", "AE", "GB", "US", "SG", "HK"],
        availableLanguage: ["en", "fr", "de", "pt", "ar"],
        url: `${SITE}/contact`,
      },
    ],
  };

  /* Breadcrumbs */
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "About", item: PAGE_URL },
    ],
  };

  /* AboutPage schema (helps Google understand this page type) */
  const aboutPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Executive Partners",
    url: PAGE_URL,
    description:
      "Boutique executive search for Private Banking & Wealth Management, headquartered in Geneva with global reach.",
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE}/og.png`,
    },
    breadcrumb: breadcrumbJsonLd,
    mainEntityOfPage: PAGE_URL,
    publisher: {
      "@type": "Organization",
      name: "Executive Partners",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/icon.png` },
    },
  };

  return (
    <main className="relative min-h-screen bg-neutral-950 text-white">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />

      {/* background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 420px at 18% -10%, rgba(59,130,246,.16) 0%, rgba(59,130,246,0) 60%), radial-gradient(1000px 380px at 110% 0%, rgba(16,185,129,.15) 0%, rgba(16,185,129,0) 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-12">
        {/* Eyebrow */}
        <div className="mx-auto w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 shadow-sm backdrop-blur">
          Private Banking &amp; Wealth Management — Executive Search
        </div>

        {/* SEO H1 */}
        <h1 className="mt-3 text-balance text-center text-4xl font-extrabold tracking-tight md:text-5xl">
          About Executive Partners — Connecting Top Talent with Private Banking Excellence
        </h1>

        <p className="mx-auto mt-3 max-w-3xl text-center text-neutral-300">
          Specialist search for <strong>Private Banking</strong> &amp;{" "}
          <strong>Wealth Management</strong>. From <strong>Geneva</strong> and{" "}
          <strong>Zurich</strong> to global hubs including <strong>Dubai</strong>,{" "}
          <strong>Singapore</strong>, <strong>London</strong> and{" "}
          <strong>New York</strong>, we deliver targeted shortlists and discreet
          approach work for HNW/UHNW markets.
        </p>

        {/* Two-column: Who we are / What we do */}
        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-6 shadow-[0_1px_3px_rgba(0,0,0,.25)]">
            <h2 className="text-xl font-bold">Who we are</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-300">
              Executive Partners is a boutique executive search firm focused
              exclusively on <strong>Private Banking</strong> &amp;{" "}
              <strong>Wealth Management</strong>. Headquartered in{" "}
              <strong>Geneva</strong> with an international footprint, we advise
              banks, EAMs and family offices on critical hires across
              Relationship Management, Desk/Market Heads and senior leadership.
            </p>
          </article>

          <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-6 shadow-[0_1px_3px_rgba(0,0,0,.25)]">
            <h2 className="text-xl font-bold">What we do</h2>
            <ul className="mt-3 grid list-disc gap-2 pl-5 text-sm text-neutral-300">
              <li>
                <span className="font-medium text-white">Front-office hires:</span>{" "}
                Senior/Executive/Managing Directors, Team Heads, Market Leaders
              </li>
              <li>
                <span className="font-medium text-white">Strategic mandates:</span>{" "}
                New-desk builds, market entries, M&amp;A integration, key
                replacements
              </li>
              <li>
                <span className="font-medium text-white">Discreet approach work:</span>{" "}
                Targeted outreach to specific bankers or teams
              </li>
              <li>
                <span className="font-medium text-white">Advisory:</span>{" "}
                Portability assessment, compensation benchmarking, succession and
                team moves
              </li>
            </ul>
          </article>
        </section>

        {/* Why clients trust us */}
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-bold">Why clients trust us</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {[
              {
                title: "True sector specialists",
                text:
                  "Former front-office and in-house talent leaders; fluent in cross-border, booking-centre and compliance realities.",
              },
              {
                title: "Portability obsessed",
                text:
                  "We validate client coverage, wallet share and realistic transfer potential—before you interview.",
              },
              {
                title: "Targeted, not transactional",
                text:
                  "Research-led market mapping and shortlists you can act on—no volume spam.",
              },
              {
                title: "Confidential by design",
                text: "Quiet processes that protect brands, teams and careers.",
              },
              {
                title: "Swiss execution, global reach",
                text:
                  "Deep roots in Geneva/Zurich with active mandates across MEA, UK, US and APAC.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-white/10 bg-neutral-900/40 p-4"
              >
                <div className="text-sm font-semibold text-white">{f.title}</div>
                <p className="mt-1 text-sm text-neutral-300">{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Coverage chips */}
        <section className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6">
          <h2 className="text-xl font-bold">Coverage</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-3">
            <div>
              <div className="text-sm font-semibold text-white">
                Switzerland (Onshore)
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Geneva", "Zurich", "Lausanne"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">
                International hubs
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Dubai", "London", "New York", "Singapore", "Hong Kong"].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">
                Segments &amp; Booking
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  "HNW",
                  "UHNW",
                  "Entrepreneurs",
                  "Family Offices",
                  "CH / EU / UK / UAE / US / APAC",
                ].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How we work (steps) */}
        <section className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-bold">How we work</h2>
          <ol className="mt-4 grid gap-4 md:grid-cols-5">
            {[
              [
                "Brief & calibration",
                "Clarify the mandate, success profile and compliance constraints.",
              ],
              [
                "Market map",
                "Long-list the viable universe; pressure-test portability.",
              ],
              [
                "Approach & vet",
                "Discreet outreach, structured evaluation, reference signals.",
              ],
              ["Shortlist", "3–5 candidates you’d credibly hire."],
              [
                "Close & land",
                "Offer design, risk checks and onboarding support.",
              ],
            ].map(([title, text], i) => (
              <li
                key={i}
                className="rounded-xl border border-white/10 bg-neutral-900/40 p-4"
              >
                <div className="text-xs font-bold text-white/80">
                  Step {i + 1}
                </div>
                <div className="mt-1 text-sm font-semibold text-white">
                  {title}
                </div>
                <p className="mt-1 text-sm text-neutral-300">{text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Our promise */}
        <section className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            ["Integrity", "Candid advice, even when it’s “not yet.”"],
            ["Discretion", "Quiet processes; zero market noise."],
            ["Outcomes", "Hires that perform—and stay."],
          ].map(([title, text]) => (
            <div
              key={title}
              className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-6"
            >
              <div className="text-lg font-bold">{title}</div>
              <p className="mt-2 text-sm text-neutral-300">{text}</p>
            </div>
          ))}
        </section>

        {/* CTA with internal links (SEO) */}
        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center">
          <h3 className="text-xl font-bold">
            Ready to discuss a mandate or a move?
          </h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-neutral-300">
            Hiring Manager: share your brief and timelines—expect a calibrated
            shortlist quickly. Candidates: speak confidentially about your
            market, portability and next step.
          </p>
          <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/hiring-managers"
              className="w-full rounded-xl bg-[#1D4ED8] px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-[#1E40AF] sm:w-auto"
            >
              Hire Talent
            </Link>
            <Link
              href="/candidates"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
            >
              I’m a Candidate
            </Link>
            <Link
              href="/jobs"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
            >
              View Private Banking Jobs
            </Link>
            <Link
              href="/contact"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
            >
              Contact us
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}