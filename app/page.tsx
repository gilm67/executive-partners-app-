// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import HomeClient from "./(marketing)/HomeClient";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { ArrowRight, Sparkles, Calculator } from "lucide-react";
import { OrganizationSchema, FAQSchema } from "@/components/StructuredData";

const HERO = "/hero-skyline-hq.webp";
const OG_IMAGE = "/og.webp";

export const metadata: Metadata = {
  title: "Private Banking Executive Search & Headhunter Switzerland | Executive Partners Geneva",
  description:
    "Geneva's leading executive recruiters for private banking and wealth management. Senior Relationship Managers, Team Heads and UHNW bankers placed across Switzerland, London, Dubai, Singapore and Hong Kong. 200+ placements.",

  openGraph: {
    title: "Private Banking Recruiter Switzerland | Executive Partners",
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
    title: "Private Banking Recruiter Switzerland | Executive Partners",
    description:
      "Leading executive search for senior private banking roles worldwide.",
    images: [OG_IMAGE],
  },

  alternates: {
    canonical: "https://www.execpartners.ch/en",
  },
};

export const dynamic = "force-static";
export const revalidate = false;

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      <FAQSchema />
      <main className="relative min-h-screen body-grain text-white">
        <section className="relative overflow-hidden">
          {/* Hero */}
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
              <div className="max-w-3xl text-center">

                {/* Eyebrow */}
                <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9A14A]">
                  Private Banking · Executive Search · Since 2010
                </p>

                {/* H1 */}
                <h1 className="font-[var(--font-playfair)] text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl leading-[1.05]">
                  Where the right banker<br />
                  meets the{" "}
                  <span className="gold">right bank.</span>
                </h1>

                {/* Subline */}
                <p className="mt-5 text-base text-white/60 leading-relaxed max-w-lg mx-auto">
                  Senior Relationship Managers, Team Heads and Investment Advisors placed across the world&apos;s leading private banking hubs.
                </p>

                {/* Dual CTA */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/en/apply"
                    className="btn-primary btn-xl rounded-full px-8 shadow-lg"
                  >
                    Apply Confidentially
                  </Link>
                  <Link
                    href="/en/jobs"
                    className="inline-flex items-center rounded-full border border-[#C9A14A]/40 px-7 py-3 text-sm font-semibold text-[#C9A14A] hover:bg-[#C9A14A]/10 transition-colors"
                  >
                    Browse Mandates →
                  </Link>
                </div>

                {/* Social proof strip */}
                <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-t border-white/10 pt-8">
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-white">200+</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white/40">Placements</div>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-white">98%</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white/40">Retention Rate</div>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-white">7</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white/40">Global Hubs</div>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-white">15y</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.14em] text-white/40">Experience</div>
                  </div>
                </div>

              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
          </div>

          {/* FREE TOOLS SECTION */}
          <div className="relative mx-auto mt-8 max-w-6xl px-4 pb-8 sm:mt-12">
            <div className="mb-6 text-center pt-4">
              <h2 className="font-[var(--font-playfair)] text-3xl font-semibold text-white md:text-4xl">
                Free Tools for Private Bankers
              </h2>
              <p className="mt-3 text-lg text-white/80">
                Assess your portability and model your business plan in minutes
              </p>
            </div>
            <GatewayPanel />
          </div>
        </section>

        <HomeClient />
      </main>
    </>
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
          href="/en/portability"
          icon={<Sparkles className="h-5 w-5" />}
          eyebrow="Signature tool"
          title="Calculate Portability Score™"
          desc="Estimate realistic AUM transfer potential before you move."
          variant="gold"
        />

        <ActionCard
          href="/en/bp-simulator"
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

      <div className="relative flex flex-col items-center text-center gap-3">
        <div
          className={[
            "grid h-11 w-11 place-items-center rounded-xl",
            iconWrap,
          ].join(" ")}
        >
          {icon}
        </div>

        <div className="min-w-0 w-full">
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/65 text-center">
            {eyebrow}
          </div>

          <div className="mt-1 font-[var(--font-playfair)] text-2xl leading-tight text-white text-center">
            {title}
          </div>

          <div className="mt-2 text-sm text-white/75 text-center">{desc}</div>

          <div className="mt-5 inline-flex items-center justify-center gap-2 text-sm font-semibold text-white/90 w-full">
            {ctaText}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          </div>
        </div>
      </div>
    </Link>
  );
}
