// app/page.tsx
import Link from "next/link";
import Image from "next/image";
import HomeClient from "./(marketing)/HomeClient";
import type { ReactNode } from "react";
import type { Metadata } from "next";
import { ArrowRight, Sparkles, Calculator } from "lucide-react";
import { OrganizationSchema, FAQSchema } from "@/components/StructuredData";

const HERO = "/hero-jeteau.webp";
const HERO_MOBILE = "/hero-jeteau-mobile.webp";
const OG_IMAGE = "/og.webp";

export const metadata: Metadata = {
  title: { absolute: "Private Banking Recruiter Switzerland | Executive Partners Geneva" },
  description:
    "Switzerland's leading executive recruiters for private banking and wealth management, based in Geneva. Senior Relationship Managers, Team Heads and UHNW bankers placed across Geneva, Zurich, London, Dubai, Singapore and Hong Kong. 200+ placements.",

  openGraph: {
    title: "Private Banking Recruiter Switzerland ",
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
    title: "Private Banking Recruiter Switzerland ",
    description:
      "Leading executive search for senior private banking roles worldwide.",
    images: [OG_IMAGE],
  },

  alternates: {
    canonical: "https://www.execpartners.ch/",
  },
};

export const dynamic = "force-static";

export default function HomePage() {
  return (
    <>
      <OrganizationSchema />
      <FAQSchema />
      <main className="relative min-h-screen body-grain text-white">
        <section className="relative overflow-hidden">
          {/* Hero */}
          <div className="relative h-[92vh] min-h-[640px] max-h-[900px] w-full sm:h-[80vh] md:h-[72vh]">
            <Image
              src={HERO}
              alt="Executive Partners – global private banking hubs skyline at dusk"
              fill
              priority
              fetchPriority="high"
              quality={80}
              sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, 1200px"
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

            <div className="relative mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-4 md:-mt-12">
              <div className="max-w-3xl text-center">

                {/* Logo mark */}
                <div className="mb-5 sm:mb-8 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-[#D4AF37]/10 blur-xl scale-150" aria-hidden />
                    <Image
                      src="/transparent-ep-logo.png"
                      alt="Executive Partners — Private Banking Executive Search"
                      width={160}
                      height={160}
                      priority
                      className="relative h-auto w-[100px] sm:w-[130px] md:w-[160px] drop-shadow-[0_0_40px_rgba(212,175,55,0.7)] brightness-110"
                    />
                  </div>
                </div>

                {/* Eyebrow */}
                <p className="mb-4 sm:mb-6 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.15em] sm:tracking-[0.22em] text-[#D4AF37] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  Private Banking · Executive Search · Switzerland
                </p>

                {/* H1 */}
                <h1 className="font-[var(--font-playfair)] text-[2.6rem] font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08]">
                  Where the right banker<br />
                  meets the{" "}
                  <span className="gold">right bank.</span>
                </h1>

                {/* Subline */}
                <p className="mt-4 text-sm sm:text-base text-white/90 leading-relaxed max-w-lg mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                  Senior Relationship Managers, Team Heads and Investment Advisors placed across the world&apos;s leading private banking hubs.
                </p>

                {/* Dual CTA */}
                <div className="mt-6 sm:mt-8 flex flex-col items-center justify-center gap-3">
                  <Link
                    href="/en/apply"
                    className="btn-primary btn-xl rounded-full px-10 shadow-lg"
                  >
                    Apply Confidentially
                  </Link>
                  <Link
                    href="/en/jobs"
                    className="inline-flex items-center text-sm font-medium text-white/70 hover:text-[#D4AF37] transition-colors drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
                  >
                    or browse open mandates →
                  </Link>
                </div>


              </div>
            </div>

            {/* Markets ticker — bottom of hero */}
            <div className="absolute bottom-0 left-0 right-0 border-t border-white/8 bg-black/30 backdrop-blur-sm py-3">
              <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-4 flex-wrap">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C9A14A]/70 mr-3">Active markets</span>
                {[
                  { city: "Geneva", slug: "geneva" },
                  { city: "Zurich", slug: "zurich" },
                  { city: "London", slug: "london" },
                  { city: "Dubai", slug: "dubai" },
                  { city: "Riyadh", slug: "riyadh" },
                  { city: "Singapore", slug: "singapore" },
                  { city: "Hong Kong", slug: "hong-kong" },
                  { city: "New York", slug: "new-york" },
                  { city: "Miami", slug: "miami" },
                  { city: "Paris", slug: "paris" },
                  { city: "Milan", slug: "milan" },
                  { city: "Madrid", slug: "madrid" },
                  { city: "Lisbon", slug: "lisbon" },
                ].map((m, i) => (
                  <span key={m.city} className="hidden sm:flex items-center gap-2">
                    {i > 0 && <span className="text-white/20">·</span>}
                    <Link href={`/en/markets/${m.slug}`} className="text-[12px] text-white/50 hover:text-[#D4AF37] transition-colors">{m.city}</Link>
                  </span>
                ))}
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
          </div>

          {/* Gold divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />

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

/* ── REPLACE GatewayPanel and ActionCard with enhanced versions ── */

function PortabilityPreview() {
  return (
    <div className="relative rounded-xl border border-[#D4AF37]/20 bg-[#0B1929] overflow-hidden">
      {/* Chrome bar */}
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-3 py-2">
        <div className="h-2 w-2 rounded-full bg-red-500/50" />
        <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
        <div className="h-2 w-2 rounded-full bg-green-500/50" />
        <div className="ml-2 flex-1 rounded bg-white/5 px-2 py-0.5 text-[9px] text-white/25">
          execpartners.ch/en/portability
        </div>
      </div>
      <div className="p-4 space-y-3">
        {/* Score dial */}
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0">
            <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#D4AF37" strokeWidth="3"
                strokeDasharray="68 32" strokeLinecap="round"
                className="origin-center [animation:dash_2s_ease-in-out_infinite_alternate]" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-base font-bold text-white">68</span>
              <span className="text-[8px] text-white/35">/100</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-[#D4AF37]">Strong portability</p>
            <p className="text-[10px] text-white/45 mt-0.5">CHF 154M estimated portable</p>
            <p className="text-[10px] text-white/30">within 12 months</p>
          </div>
        </div>
        {/* Mini bars */}
        {[
          { label: "Client loyalty", w: "75%", color: "bg-[#D4AF37]" },
          { label: "Wallet share", w: "60%", color: "bg-emerald-400" },
          { label: "Compliance status", w: "85%", color: "bg-blue-400" },
        ].map(r => (
          <div key={r.label}>
            <div className="flex justify-between text-[9px] mb-1">
              <span className="text-white/40">{r.label}</span>
            </div>
            <div className="h-1 w-full rounded-full bg-white/10">
              <div className={`h-1 rounded-full ${r.color} opacity-70`} style={{ width: r.w }} />
            </div>
          </div>
        ))}
        <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-center">
          <p className="text-[9px] uppercase tracking-wider text-white/30">100% encrypted · no data stored</p>
        </div>
      </div>
    </div>
  );
}

function BPPreview() {
  return (
    <div className="relative rounded-xl border border-[#9ECBFF]/20 bg-[#0B1929] overflow-hidden">
      {/* Chrome bar */}
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-3 py-2">
        <div className="h-2 w-2 rounded-full bg-red-500/50" />
        <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
        <div className="h-2 w-2 rounded-full bg-green-500/50" />
        <div className="ml-2 flex-1 rounded bg-white/5 px-2 py-0.5 text-[9px] text-white/25">
          execpartners.ch/en/bp-simulator
        </div>
      </div>
      <div className="p-4 space-y-2.5">
        {/* Revenue bars */}
        <p className="text-[9px] uppercase tracking-wider text-white/30 mb-2">3-year revenue projection</p>
        {[
          { label: "Year 1 (conservative)", value: "CHF 890K", w: "45%", color: "bg-[#9ECBFF]" },
          { label: "Year 2 (base case)", value: "CHF 1.54M", w: "72%", color: "bg-[#9ECBFF]" },
          { label: "Year 3 (target)", value: "CHF 2.1M", w: "95%", color: "bg-[#9ECBFF]" },
        ].map(r => (
          <div key={r.label}>
            <div className="flex justify-between text-[9px] mb-1">
              <span className="text-white/40">{r.label}</span>
              <span className="text-white/70 font-semibold">{r.value}</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-white/10">
              <div className={`h-1.5 rounded-full ${r.color} opacity-60`} style={{ width: r.w }} />
            </div>
          </div>
        ))}
        {/* Key metrics */}
        <div className="grid grid-cols-2 gap-2 mt-1">
          {[
            { label: "Break-even AUM", value: "CHF 95M" },
            { label: "NPC buyout", value: "6 months" },
          ].map(m => (
            <div key={m.label} className="rounded-lg bg-white/5 border border-white/10 px-2 py-1.5 text-center">
              <p className="text-[8px] text-white/35">{m.label}</p>
              <p className="text-xs font-semibold text-[#9ECBFF]">{m.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GatewayPanel() {
  return (
    <section
      aria-label="Primary tools"
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0B0F1A]/72 p-5 backdrop-blur-xl shadow-[0_26px_90px_rgba(0,0,0,.55)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          background:
            "radial-gradient(900px 260px at 18% 0%, rgba(201,161,74,.22) 0%, rgba(201,161,74,0) 60%), radial-gradient(900px 260px at 92% 25%, rgba(158,203,255,.16) 0%, rgba(158,203,255,0) 55%), linear-gradient(to bottom, rgba(255,255,255,.06), rgba(0,0,0,0))",
        }}
      />

      <div className="relative grid gap-5 md:grid-cols-2">

        {/* ── Portability Score card ── */}
        <div className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/28 bg-gradient-to-b from-[#D4AF37]/12 to-white/[0.03] p-5 shadow-[0_18px_55px_rgba(0,0,0,.45)]">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] items-start">
            {/* Left: copy */}
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/65">Signature tool</p>
                <div className="mt-1 flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#D4AF37]/16 ring-1 ring-[#F5D778]/28 text-[#F5D778]">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <h3 className="text-base font-semibold text-white">Portability Score™</h3>
                </div>
              </div>
              <p className="text-sm text-white/65 leading-relaxed">
                Model realistic AUM transfer potential before any conversation with a bank. Wallet share, compliance status, and timeline — calculated in minutes.
              </p>
              <ul className="space-y-1">
                {["Client loyalty analysis","Wallet share estimate","Non-solicit risk flag","Transfer timeline"].map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs text-white/50">
                    <span className="text-[#D4AF37]">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/en/portability"
                className="mt-1 inline-flex items-center gap-1.5 rounded-xl bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-black hover:opacity-90 transition self-start"
              >
                Calculate Your Score →
              </Link>
            </div>
            {/* Right: preview */}
            <div className="hidden md:block w-[180px] shrink-0">
              <PortabilityPreview />
            </div>
          </div>
        </div>

        {/* ── BP Simulator card ── */}
        <div className="relative overflow-hidden rounded-2xl border border-[#9ECBFF]/26 bg-gradient-to-b from-[#9ECBFF]/12 to-white/[0.03] p-5 shadow-[0_18px_55px_rgba(0,0,0,.45)]">
          <div className="grid gap-5 md:grid-cols-[1fr_auto] items-start">
            {/* Left: copy */}
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/65">Approval tool</p>
                <div className="mt-1 flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-[#9ECBFF]/16 ring-1 ring-[#CFE6FF]/26 text-[#CFE6FF]">
                    <Calculator className="h-4 w-4" />
                  </div>
                  <h3 className="text-base font-semibold text-white">Business Plan Simulator</h3>
                </div>
              </div>
              <p className="text-sm text-white/65 leading-relaxed">
                Build a three-year revenue case before you walk into any hiring meeting. Banks close offers faster when portability logic arrives pre-documented.
              </p>
              <ul className="space-y-1">
                {["3-year revenue projection","Break-even AUM calculation","NPC buyout recommendation","PDF export ready"].map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs text-white/50">
                    <span className="text-[#9ECBFF]">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/en/bp-simulator"
                className="mt-1 inline-flex items-center gap-1.5 rounded-xl bg-[#9ECBFF]/20 border border-[#9ECBFF]/30 px-4 py-2 text-sm font-semibold text-[#CFE6FF] hover:bg-[#9ECBFF]/30 transition self-start"
              >
                Run Simulation →
              </Link>
            </div>
            {/* Right: preview */}
            <div className="hidden md:block w-[180px] shrink-0">
              <BPPreview />
            </div>
          </div>
        </div>

      </div>

      <div className="relative px-2 pt-4 text-center">
        <span className="text-xs text-white/55">
          Used by 500+ private bankers · 100% confidential · No obligation
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
    <Link href={href} className={["group relative overflow-hidden rounded-2xl border p-6 backdrop-blur-md transition shadow-[0_18px_55px_rgba(0,0,0,.45)] hover:shadow-[0_26px_78px_rgba(0,0,0,.60)]", styles].join(" ")}>
      <div className="relative flex flex-col items-center text-center gap-3">
        <div className={["grid h-11 w-11 place-items-center rounded-xl", iconWrap].join(" ")}>{icon}</div>
        <div className="min-w-0 w-full">
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/65 text-center">{eyebrow}</div>
          <h3 className="mt-1 text-lg font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm text-white/65">{desc}</p>
          <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white/80">{ctaText}</div>
        </div>
      </div>
    </Link>
  );
}
