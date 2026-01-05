/* app/en/about/page.tsx */
import Link from "next/link";
import type { Metadata } from "next";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import { BreadcrumbSchema } from "@/components/StructuredData";

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
const PAGE_URL = `${SITE}/en/about`;

export const revalidate = 60;

/* ---------------- SEO ---------------- */
export const metadata: Metadata = {
  title:
    "About Executive Partners | Connecting Top Talent with Private Banking Excellence – In Switzerland & Beyond",
  description:
    "Executive Partners is Switzerland's specialist recruiter for Private Banking & Wealth Management. Geneva-headquartered, delivering discreet search across Zurich, Dubai, Singapore, London & New York.",
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

  /* AboutPage schema */
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
    mainEntityOfPage: PAGE_URL,
    publisher: {
      "@type": "Organization",
      name: "Executive Partners",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/icon.png` },
    },
  };

  return (
    <>
      {/* Breadcrumb Schema */}
      <BreadcrumbSchema 
        items={[
          { name: "Home", url: SITE },
          { name: "About", url: PAGE_URL }
        ]}
      />

      <main className="relative min-h-screen bg-[#0B0E13] text-white">
        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }} />

        {/* Gold background glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(1200px 420px at 20% -10%, rgba(255,215,130,0.10) 0%, rgba(0,0,0,0) 60%), radial-gradient(1200px 420px at 90% 0%, rgba(255,215,130,0.08) 0%, rgba(0,0,0,0) 60%)",
          }}
        />

        <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-12">

          {/* Eyebrow Label */}
          <div className="mx-auto w-fit rounded-full border border-brandGold/30 bg-brandGold/10 px-3 py-1 text-xs font-semibold text-brandGoldSoft shadow-sm backdrop-blur">
            Private Banking &amp; Wealth Management — Executive Search
          </div>

          {/* Title */}
          <h1 className="mt-3 text-center text-4xl font-extrabold tracking-tight md:text-5xl">
            About Executive Partners — Connecting Top Talent with Excellence
          </h1>

          <p className="mx-auto mt-3 max-w-3xl text-center text-neutral-300">
            Specialist search for <strong>Private Banking</strong> &amp;{" "}
            <strong>Wealth Management</strong>. Based in Geneva, active across Zurich,
            Dubai, Singapore, London & New York.
          </p>

          {/* Who we are / What we do */}
          <section className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-brandGold/20 bg-white/[0.03] p-6 shadow-[0_0_30px_rgba(0,0,0,0.35)]">
              <h2 className="text-xl font-bold text-brandGoldSoft">Who we are</h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-300">
                Executive Partners is a boutique executive search firm focused on
                Private Banking & Wealth Management. Headquartered in Geneva with
                international reach.
              </p>
            </article>

            <article className="rounded-2xl border border-brandGold/20 bg-white/[0.03] p-6 shadow-[0_0_30px_rgba(0,0,0,0.35)]">
              <h2 className="text-xl font-bold text-brandGoldSoft">What we do</h2>
              <ul className="mt-3 grid list-disc gap-2 pl-5 text-sm text-neutral-300">
                <li><span className="font-medium text-white">Front-office hires:</span> Directors, ED, MD, Team Heads, Market Leads</li>
                <li><span className="font-medium text-white">Strategic mandates:</span> Desk builds, expansions, M&A integration</li>
                <li><span className="font-medium text-white">Discreet approach work:</span> Targeted outreach to specific bankers</li>
                <li><span className="font-medium text-white">Advisory:</span> Portability, compensation benchmarking, team moves</li>
              </ul>
            </article>
          </section>

          {/* Why clients trust us */}
          <section className="mt-8 rounded-2xl border border-brandGold/20 bg-white/[0.05] p-6">
            <h2 className="text-xl font-bold text-brandGoldSoft">Why clients trust us</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {[
                ["True sector specialists", "Former front-office/in-house specialists who understand cross-border and compliance realities."],
                ["Portability obsessed", "We validate coverage, wallet share and realistic transfer potential before interviews."],
                ["Targeted, not transactional", "Research-led shortlists with actionable signals—never volume."],
                ["Confidential by design", "Quiet, discreet processes for clients and candidates."],
                ["Swiss execution, global reach", "Deep roots in CH with mandates across MEA, UK, US & APAC."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-xl border border-brandGold/20 bg-neutral-900/40 p-4">
                  <div className="text-sm font-semibold text-brandGold">{title}</div>
                  <p className="mt-1 text-sm text-neutral-300">{text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Coverage */}
          <section className="mt-8 rounded-2xl border border-brandGold/20 bg-white/[0.04] p-6">
            <h2 className="text-xl font-bold text-brandGoldSoft">Coverage</h2>
            <div className="mt-4 grid gap-6 md:grid-cols-3">
              {/* Switzerland */}
              <div>
                <div className="text-sm font-semibold text-brandGold">Switzerland (Onshore)</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Geneva", "Zurich", "Lausanne"].map((t) => (
                    <span key={t} className="rounded-full border border-brandGold/20 bg-brandGold/5 px-2.5 py-1 text-xs text-brandGoldSoft">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* International */}
              <div>
                <div className="text-sm font-semibold text-brandGold">International hubs</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Dubai", "London", "New York", "Singapore", "Hong Kong"].map(
                    (t) => (
                      <span key={t} className="rounded-full border border-brandGold/20 bg-brandGold/5 px-2.5 py-1 text-xs text-brandGoldSoft">
                        {t}
                      </span>
                    )
                  )}
                </div>
              </div>

              {/* Segments */}
              <div>
                <div className="text-sm font-semibold text-brandGold">Segments & Booking</div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[
                    "HNW",
                    "UHNW",
                    "Entrepreneurs",
                    "Family Offices",
                    "CH / EU / UK / UAE / US / APAC",
                  ].map((t) => (
                    <span key={t} className="rounded-full border border-brandGold/20 bg-brandGold/5 px-2.5 py-1 text-xs text-brandGoldSoft">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* How we work */}
          <section className="mt-8 rounded-2xl border border-brandGold/20 bg-white/[0.04] p-6">
            <h2 className="text-xl font-bold text-brandGoldSoft">How we work</h2>
            <ol className="mt-4 grid gap-4 md:grid-cols-5">
              {[
                ["Brief & calibration", "Clear success profile & compliance constraints."],
                ["Market map", "Define viable universe & check portability."],
                ["Approach & vet", "Discreet outreach + structured evaluation."],
                ["Shortlist", "3–5 candidates you'd credibly hire."],
                ["Close & land", "Offer, risk checks & onboarding."],
              ].map(([title, text], i) => (
                <li key={i} className="rounded-xl border border-brandGold/20 bg-neutral-900/40 p-4">
                  <div className="text-xs font-bold text-brandGoldSoft">Step {i + 1}</div>
                  <div className="mt-1 text-sm font-semibold text-white">{title}</div>
                  <p className="mt-1 text-sm text-neutral-300">{text}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* Promise */}
          <section className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              ["Integrity", "Candid advice, even when it is not yet ready."],
              ["Discretion", "Quiet processes; zero market noise."],
              ["Outcomes", "Hires that perform and stay."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-brandGold/20 bg-white/[0.05] p-6">
                <div className="text-lg font-bold text-brandGold">{title}</div>
                <p className="mt-2 text-sm text-neutral-300">{text}</p>
              </div>
            ))}
          </section>

          {/* CTA */}
          <section className="mt-10 rounded-2xl border border-brandGold/20 bg-white/[0.04] p-6 text-center">
            <h3 className="text-xl font-bold text-brandGoldSoft">
              Ready to discuss a mandate or explore a move?
            </h3>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-neutral-300">
              Hiring Managers: share your brief. Candidates: speak confidentially about your market, portability and next step.
            </p>

            <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <PrimaryButton href="/hiring-managers">Hire Talent</PrimaryButton>
              <SecondaryButton href="/candidates">I'm a Candidate</SecondaryButton>
              <SecondaryButton href="/jobs">Private Banking Jobs</SecondaryButton>
              <SecondaryButton href="/contact">Contact Us</SecondaryButton>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}