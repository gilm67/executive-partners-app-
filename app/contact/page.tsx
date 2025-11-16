// app/contact/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

/* ---------------- helpers ---------------- */
function siteBase() {
  const fromEnv =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_URL ||
    "https://www.execpartners.ch";

  const url = fromEnv.startsWith("http")
    ? fromEnv
    : `https://${fromEnv}`;

  return url.replace(/\/$/, "");
}

const SITE = siteBase();
const PAGE_URL = `${SITE}/contact`;

/* ---------------- metadata ---------------- */
export const metadata: Metadata = {
  title:
    "Contact Executive Partners | Private Banking Recruitment (Geneva)",
  description:
    "Contact Executive Partners for confidential searches in private banking and wealth management. Geneva HQ with mandates across Switzerland, UK, US, Dubai, Singapore & Hong Kong.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    title: "Contact Executive Partners",
    siteName: "Executive Partners",
    description:
      "Confidential private banking & wealth management recruitment. Geneva-based, globally connected.",
    images: [{ url: "/og.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Executive Partners",
    description:
      "Private Banking & Wealth Management executive search — Geneva HQ, international reach.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  // ---------- Structured Data (JSON-LD) ----------
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: "Executive Partners",
    url: SITE,
    image: `${SITE}/og.png`,
    logo: `${SITE}/icon.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "118 rue du Rhône",
      addressLocality: "Geneva",
      postalCode: "1204",
      addressCountry: "CH",
    },
    areaServed: ["CH", "GB", "US", "AE", "SG", "HK"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "General",
        email: "contact@execpartners.ch",
        availableLanguage: ["en", "fr", "de"],
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: PAGE_URL,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you handle confidential mandates?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Yes. Most of our searches are confidential. We only introduce shortlists to the client and never share your profile without consent.",
        },
      },
      {
        "@type": "Question",
        name: "Which markets do you cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Switzerland first (Geneva & Zurich) with active mandates in the UK, US, Dubai, Singapore and Hong Kong.",
        },
      },
      {
        "@type": "Question",
        name: "How quickly will you respond?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "We typically respond the same business day. If urgent, include timing in your message.",
        },
      },
    ],
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(orgJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd),
        }}
      />

      <header className="mb-10">
        <h1 className="page-title">Contact Executive Partners</h1>
        <p className="mt-2 text-sm text-neutral-400">
          Geneva-based. Mandates across Switzerland, the UK, the US,
          Dubai, Singapore &amp; Hong Kong.
        </p>
        <p className="text-sm text-neutral-500">
          We typically respond within the same business day.
        </p>
      </header>

      {/* GRID: FORM LEFT / MAP RIGHT */}
      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-5">
        {/* LEFT COLUMN — FULL CONTACT FORM */}
        <section className="md:col-span-3 h-full">
          <div className="h-full rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
            <form
              method="POST"
              action="/api/contact"
              className="space-y-6"
            >
              {/* BASIC INFO */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Name<span className="text-emerald-300">*</span>
                  </label>
                  <input
                    name="name"
                    required
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-400/80"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Email<span className="text-emerald-300">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-400/80"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    I am a…<span className="text-emerald-300">*</span>
                  </label>
                  <select
                    name="contactType"
                    required
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-400/80"
                  >
                    <option value="">Please select</option>
                    <option value="candidate">Candidate</option>
                    <option value="hiring-manager">
                      Hiring Manager
                    </option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-400/80"
                  />
                  <p className="text-[11px] text-neutral-400">
                    We can call you discreetly — no messages left without
                    your consent.
                  </p>
                </div>
              </div>

              {/* HIRING MANAGER SECTION */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300/80">
                  For hiring managers
                </p>
                <p className="mt-1 text-[11px] text-neutral-400">
                  Optional — helps us prepare before our call.
                </p>

                <div className="mt-3 grid gap-4 md:grid-cols-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">Company</label>
                    <input
                      name="hm_company"
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-400/80"
                      placeholder="e.g. Private Bank"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">Role</label>
                    <input
                      name="hm_role"
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-400/80"
                      placeholder="e.g. Desk Head MEA"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">Location</label>
                    <input
                      name="hm_location"
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-400/80"
                      placeholder="e.g. Geneva, Dubai"
                    />
                  </div>
                </div>
              </div>

              {/* CANDIDATE SECTION */}
              <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 px-4 py-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300/80">
                  For candidates
                </p>
                <p className="mt-1 text-[11px] text-neutral-400">
                  Optional — high-level details only (no client names).
                </p>

                <div className="mt-3 grid gap-4 md:grid-cols-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">
                      Current bank
                    </label>
                    <input
                      name="cand_bank"
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-400/80"
                      placeholder="e.g. UBS, Pictet…"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">Market</label>
                    <input
                      name="cand_market"
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-400/80"
                      placeholder="e.g. CH Onshore, MEA"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium">AUM band</label>
                    <select
                      name="cand_aum_band"
                      className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-xs focus:ring-1 focus:ring-emerald-400/80"
                    >
                      <option value="">Select…</option>
                      <option value="<200m">&lt; CHF 200m</option>
                      <option value="200-500m">CHF 200–500m</option>
                      <option value="500-800m">CHF 500–800m</option>
                      <option value="800m-1.2bn">
                        CHF 800m–1.2bn
                      </option>
                      <option value=">1.2bn">
                        &gt; CHF 1.2bn
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* MESSAGE */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Message<span className="text-emerald-300">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full rounded-2xl border border-neutral-700 bg-neutral-800 px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-400/80"
                  placeholder="Tell us briefly what you’re looking for (confidential move, new hire, market intelligence…)."
                />
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full md:w-auto rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 focus:ring-2 focus:ring-emerald-400/80"
              >
                Send message
              </button>
            </form>
          </div>
        </section>

        {/* RIGHT COLUMN — INFO BLOCK + MAP */}
        <aside className="md:col-span-2 h-full">
          <div className="flex h-full flex-col">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6">
              <h2 className="text-sm font-semibold text-neutral-200">
                Executive Partners
              </h2>

              <div className="mt-2 text-sm text-neutral-400">
                <p className="font-medium text-neutral-200">
                  Head Office
                </p>
                <p>118 rue du Rhône</p>
                <p>1204 Geneva</p>
                <p>Switzerland</p>
              </div>

              <div className="my-4 h-px w-full bg-neutral-800" />

              <h3 className="text-sm font-semibold text-neutral-200">
                Typical Mandates
              </h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-neutral-400">
                <li>Relationship Managers &amp; Team Heads</li>
                <li>Market Leaders (CH, MEA, UK, APAC, LatAm)</li>
                <li>Investor Protection, Risk &amp; COO roles</li>
                <li>Private Markets distribution &amp; advisory</li>
              </ul>

              <p className="mt-4 text-xs text-neutral-500">
                Meetings by appointment.{" "}
                <Link
                  href="/contact"
                  className="underline underline-offset-2"
                >
                  Get in touch
                </Link>{" "}
                to schedule a time.
              </p>
            </div>

            {/* MAP */}
            <div className="mt-4 flex-1 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50">
              <iframe
                title="Executive Partners – 118 rue du Rhône, 1204 Geneva"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Executive%20Partners%20118%20rue%20du%20Rh%C3%B4ne%201204%20Geneva&output=embed"
              />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}