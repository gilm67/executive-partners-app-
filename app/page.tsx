// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import HomeClient from "./(marketing)/HomeClient";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { ArrowRight, Sparkles, Calculator } from "lucide-react";
import { OrganizationSchema } from "@/components/StructuredData";

/**
 * ✅ Use the new WebP hero (you generated: public/hero-skyline-hq.webp)
 */
const HERO = "/hero-skyline-hq.webp";

/**
 * ✅ IMPORTANT:
 * Page-level metadata OVERRIDES layout metadata.
 * If you set openGraph/twitter here, include images, otherwise you'll lose og:image/twitter:image.
 * Use relative URL so metadataBase (canonical domain) resolves it correctly.
 */
const OG_IMAGE = "/og.webp";

export const metadata: Metadata = {
  title: "Executive Partners | Private Banking Executive Search | Geneva",
  description:
    "Leading executive search firm specializing in senior private banking roles across Geneva, Zurich, London, Dubai, Singapore. 200+ placements, 98% retention rate.",

  openGraph: {
    title: "Executive Partners | Private Banking Executive Search",
    description:
      "Global executive search for senior private banking professionals. Geneva-based, globally connected.",
    type: "website",
    url: "/",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Executive Partners – Private Banking & Wealth Management Executive Search",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Executive Partners | Private Banking Executive Search",
    description:
      "Leading executive search for senior private banking roles worldwide.",
    images: [OG_IMAGE],
  },

  alternates: {
    canonical: "/",
  },
};

export const dynamic = "force-static";
export const revalidate = false;

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      <main className="relative min-h-screen body-grain text-white">
        <section className="relative overflow-hidden">
          {/* ✅ Controlled hero height (prevents “too tall” feeling) */}
          <div className="relative h-[68vh] min-h-[560px] max-h-[820px] w-full md:h-[72vh]">
            <Image
              src={HERO}
              alt="Executive Partners – global private banking hubs skyline at dusk"
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover object-center"
            />

            {/* ✅ Premium overlay stack (stronger, consistent contrast) */}
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(1200px_420px_at_18%_-10%,rgba(0,0,0,.55),transparent_60%),linear-gradient(to_bottom,rgba(0,0,0,.72),rgba(0,0,0,.25)_42%,rgba(0,0,0,.78))]"
            />
            <div aria-hidden className="absolute inset-0 bg-black/25" />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 [box-shadow:inset_0_-160px_220px_-90px_rgba(0,0,0,0.75)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 [box-shadow:inset_0_120px_180px_-120px_rgba(0,0,0,0.70)]"
            />

            <div className="relative mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-4">
              {/* ✅ Slightly smaller, tighter hero card */}
              <div className="max-w-3xl rounded-2xl bg-black/45 px-6 py-6 text-center backdrop-blur-sm ring-1 ring-white/10">
                {/* Optional: add logo above H1 for stronger brand signal */}
                <div className="flex justify-center">
                  <Image
                    src="/transparent-ep-logo.png"
                    alt="Executive Partners – Private Banking & Wealth Management Executive Search"
                    width={320}
                    height={110}
                    priority
                    sizes="320px"
                    className="h-auto w-[210px] drop-shadow-[0_0_18px_rgba(255,255,255,0.28)] sm:w-[260px] md:w-[320px]"
                  />
                </div>

                <h1 className="mt-4 font-[var(--font-playfair)] text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
                  International &amp; Swiss{" "}
                  <span className="gold">Private Banking</span>
                </h1>

                <p className="mt-4 text-white/90">
                  Executive Search &amp; Talent Advisory for HNW/UHNW banking.
                  Geneva-based, globally connected.
                </p>

                <div className="mt-7">
                  <Link
                    href="/apply"
                    className="btn-primary btn-xl rounded-full px-8 shadow-lg"
                  >
                    Apply Confidentially
                  </Link>
                </div>
              </div>
            </div>

            {/* subtle frame */}
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
          </div>

          {/* FREE TOOLS SECTION - Now first and prominent */}
          <div className="relative mx-auto -mt-14 max-w-6xl px-4 pb-8 sm:-mt-20">
            <div className="mb-6 text-center">
              <h2 className="font-[var(--font-playfair)] text-3xl font-semibold text-white md:text-4xl">
                Free Tools for Private Bankers
              </h2>
              <p className="mt-3 text-lg text-white/80">
                Assess your portability and model your business plan in minutes
              </p>
            </div>
            <GatewayPanel />
          </div>

          {/* KPI CARDS - Now below tools */}
          <div className="relative mx-auto max-w-6xl px-4 pb-10">
            <div className="rounded-2xl bg-white text-[#0B0E13] shadow-xl">
              <div className="grid gap-4 p-6 md:grid-cols-3">
                <KpiCard
                  title="Placements"
                  value="200+"
                  note="Senior RMs & Private Bankers placed worldwide"
                />
                <KpiCard
                  title="12-month Retention"
                  value="98%"
                  note="Candidates still in seat after 12 months"
                />
                <KpiCard
                  title="Global Hubs"
                  value="12+"
                  note="Geneva, Zurich, London, Dubai, Singapore, Hong Kong, New York, Miami, Paris, Milan, Madrid, Lisbon"
                />
              </div>
            </div>
          </div>
        </section>

        <HomeClient />
      </main>
    </>
  );
}

function KpiCard({
  title,
  value,
  note,
}: {
  title: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="rounded-xl border border-black/10 bg-white/90 p-5 shadow-sm">
      <div className="text-sm font-semibold text-black/70">{title}</div>
      <div className="mt-2 text-4xl font-extrabold tracking-tight text-black">
        {value}
      </div>
      {note ? (
        <div className="mt-2 text-[13px] leading-snug text-black/70">
          {note}
        </div>
      ) : null}
    </div>
  );
}

function GatewayPanel() {
  return (
    <section
      aria-label="Primary tools"
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B0F1A]/72 p-4 backdrop-blur-xl shadow-[0_26px_90px_rgba(0,0,0,.55)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          background:
            "radial-gradient(900px 260px at 18% 0%, rgba(201,161,74,.22) 0%, rgba(201,161,74,0) 60%), radial-gradient(900px 260px at 92% 25%, rgba(158,203,255,.16) 0%, rgba(158,203,255,0) 55%), linear-gradient(to bottom, rgba(255,255,255,.06), rgba(0,0,0,0))",
        }}
      />

      <div className="relative grid gap-4 md:grid-cols-2">
        <ActionCard
          href="/portability"
          icon={<Sparkles className="h-5 w-5" />}
          eyebrow="Signature tool"
          title="Calculate Portability Score™"
          desc="Estimate realistic AUM transfer potential before you move."
          variant="gold"
        />

        <ActionCard
          href="/bp-simulator"
          icon={<Calculator className="h-5 w-5" />}
          eyebrow="Approval tool"
          title="Business Plan Simulator"
          desc="Model revenue, break-even timeline and approval readiness."
          variant="ice"
        />
      </div>

      <div className="relative px-2 pt-4 text-center">
        <span className="text-xs text-white/55">
          Used by 500+ private bankers • 100% confidential • No obligation
        </span>
      </div>
    </section>
  );
}

function ActionCard({
  href,
  icon,
  eyebrow,
  title,
  desc,
  variant = "gold",
}: {
  href: string;
  icon: ReactNode;
  eyebrow: string;
  title: string;
  desc: string;
  variant?: "gold" | "ice";
}) {
  const styles =
    variant === "gold"
      ? "border-[#D4AF37]/28 bg-gradient-to-b from-[#D4AF37]/12 to-white/[0.03] hover:border-[#F5D778]/45"
      : "border-[#9ECBFF]/26 bg-gradient-to-b from-[#9ECBFF]/12 to-white/[0.03] hover:border-[#CFE6FF]/45";

  const iconWrap =
    variant === "gold"
      ? "bg-[#D4AF37]/16 ring-1 ring-[#F5D778]/28 text-[#F5D778]"
      : "bg-[#9ECBFF]/16 ring-1 ring-[#CFE6FF]/26 text-[#CFE6FF]";

  const ctaText =
    variant === "gold" ? "Calculate Your Score →" : "Run Simulation →";

  return (
    <Link
      href={href}
      className={[
        "group relative overflow-hidden rounded-2xl border p-6 backdrop-blur-md transition",
        "shadow-[0_18px_55px_rgba(0,0,0,.45)] hover:shadow-[0_26px_78px_rgba(0,0,0,.60)]",
        styles,
      ].join(" ")}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(650px 260px at 22% 0%, rgba(255,255,255,.10) 0%, rgba(255,255,255,0) 60%)",
        }}
      />

      <div className="relative flex items-start gap-4">
        <div
          className={[
            "grid h-11 w-11 place-items-center rounded-xl",
            iconWrap,
          ].join(" ")}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/65">
            {eyebrow}
          </div>

          <div className="mt-1 font-[var(--font-playfair)] text-2xl leading-tight text-white">
            {title}
          </div>

          <div className="mt-2 text-sm text-white/75">{desc}</div>

          <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/90">
            {ctaText}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}