// app/page.tsx
import Link from "next/link";
import Image from "next/image";

/* Public assets */
const HERO = "/hero-skyline-hq.jpg";
const LADY = "/candidate-eurasian.jpg";
const MAN  = "/manager-portrait.jpg";

export const dynamic = "force-static";
export const revalidate = false;

export default function HomePage() {
  return (
    <main className="relative min-h-screen body-grain text-white">
      {/* ===== HERO (taller so KPI can overlap near bottom) ===== */}
      <section className="relative overflow-hidden">
        <div className="relative h-[72vh] min-h-[560px] w-full">
          <Image
            src={HERO}
            alt="Executive Partners — international skyline at dusk"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(1200px_420px_at_18%_-10%,rgba(0,0,0,.45),transparent_60%),linear-gradient(to_bottom,rgba(0,0,0,.55),rgba(0,0,0,.22)_40%,rgba(0,0,0,.6))]"
          />

          <div className="relative mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-4">
            {/* === Dark glass overlay for title === */}
            <div className="rounded-xl bg-black/45 px-6 py-5 backdrop-blur-sm text-center max-w-3xl">
              <h1 className="font-[var(--font-playfair)] text-5xl font-semibold tracking-tight md:text-6xl text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]">
                International &amp; Swiss <span className="gold">Private Banking</span>
              </h1>
              <p className="mt-4 text-white/90 text-base md:text-lg">
                Executive Search &amp; Talent Advisory for HNW/UHNW banking. Geneva-based, globally connected.
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <Link href="/apply" className="btn-primary btn-xl text-center">
                Apply Confidentially
              </Link>
            </div>
          </div>
        </div>

        {/* ===== KPI BAR — WHITE, placed near bottom of skyline ===== */}
        <div className="relative mx-auto -mt-20 max-w-6xl px-4 pb-6">
          <div className="rounded-2xl border border-black/10 bg-white text-[#0B0E13] shadow-xl">
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3 md:p-6">
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
                value="10+"
                note="Geneva, Zurich, London, Dubai, Singapore, Hong Kong, New York, Miami"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SIDE-IMAGE FEATURE PANELS (tall portraits; faces visible) ===== */}
      <section className="relative mx-auto mt-10 max-w-6xl space-y-6 px-4">
        <FeaturePanel
          imageSrc={LADY}
          imageAlt="Eurasian private banker — warm, approachable"
          title="For Candidates"
          copy="Advance your career with discreet, tailored search. Explore live mandates and roles that match your market, seniority and portability."
          primary={{ href: "/jobs", label: "Explore Opportunities" }}
          secondary={{ href: "/candidates", label: "Candidate Hub" }}
          imageLeft
        />
        <FeaturePanel
          imageSrc={MAN}
          imageAlt="Hiring manager — executive tone"
          title="For Hiring Managers"
          copy="Market mapping, calibrated outreach and vetted shortlists with real portability. Brief a new role or ask us to approach specific bankers."
          primary={{ href: "/hiring-managers", label: "Find Top Talent" }}
          secondary={{ href: "/contact", label: "Talk to Us" }}
        />
      </section>

      {/* ===== DUE-DILIGENCE TOOLS (Portability + BP Simulator) ===== */}
      <section className="container-max mt-14 px-4 pb-16">
        <h2 className="text-center text-3xl font-semibold">Due-Diligence Tools</h2>
        <p className="mx-auto mt-2 max-w-3xl text-center text-white/75">
          Validate portability and strengthen approvals before you move.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <ToolCard
            title="Portability Score™"
            bullets={[
              "Estimate AUM portability",
              "Flag risks early",
              "Evidence pack for approvals",
            ]}
            primary={{ href: "/portability-score", label: "Calculate Score" }}
          />
          <ToolCard
            title="Business Plan Simulator"
            bullets={[
              "Model revenue scenarios",
              "Document assumptions",
              "Export for review",
            ]}
            /* ✅ FIX: route to /bp-simulator */
            primary={{ href: "/bp-simulator", label: "Run Simulation" }}
          />
        </div>
      </section>
    </main>
  );
}

/* ===== Components ===== */

function KpiCard({ title, value, note }: { title: string; value: string; note?: string }) {
  return (
    <div className="rounded-xl border border-black/10 bg-white/90 p-5 shadow-sm">
      <div className="text-sm font-semibold text-black/70">{title}</div>
      <div className="mt-2 text-4xl font-extrabold tracking-tight text-black">{value}</div>
      {note ? <div className="mt-2 text-[13px] leading-snug text-black/70">{note}</div> : null}
    </div>
  );
}

function FeaturePanel({
  imageSrc,
  imageAlt,
  title,
  copy,
  primary,
  secondary,
  imageLeft = false,
}: {
  imageSrc: string;
  imageAlt: string;
  title: string;
  copy: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
  imageLeft?: boolean;
}) {
  return (
    <article className="grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur md:grid-cols-2">
      {/* IMAGE SIDE — taller and focused higher to hide bottom triangle */}
      <div className={imageLeft ? "order-1" : "order-2"}>
        <div className="relative h-[460px] w-full md:h-[520px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-[50%_15%] md:object-[50%_22%]"
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_220px_at_90%_0%,rgba(158,203,255,.18),transparent_60%)]" />
        </div>
      </div>

      {/* CONTENT SIDE */}
      <div className={imageLeft ? "order-2" : "order-1"}>
        <div className="flex h-full flex-col justify-center gap-4 p-6 md:p-10">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <p className="text-white/85">{copy}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link href={primary.href} className="btn-primary">{primary.label}</Link>
            <Link href={secondary.href} className="btn-ghost">{secondary.label}</Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function ToolCard({
  title,
  bullets,
  primary,
}: {
  title: string;
  bullets: string[];
  primary: { href: string; label: string };
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
      <h3 className="text-xl font-semibold">{title}</h3>
      <ul className="mt-3 space-y-1 text-white/80">
        {bullets.map((b) => (
          <li key={b} className="list-disc pl-5">{b}</li>
        ))}
      </ul>
      <div className="mt-5">
        <Link href={primary.href} className="btn-primary">{primary.label}</Link>
      </div>
    </div>
  );
}