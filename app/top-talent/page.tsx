// app/top-talent/page.tsx
import Link from "next/link";

type Talent = {
  id: string;
  title: string;
  summary: string;
  location: string;
  market: string;
  seniority: string;
  portability: string; // e.g. "CHF 80M+"
  tags: string[];
};

const talent: Talent[] = [
  {
    id: "t1",
    title: "Private Banker (UHNW) — Anon",
    summary:
      "UHNW-focused RM with multi-jurisdictional AUM and deep GCC relationships.",
    location: "Geneva",
    market: "GCC",
    seniority: "Senior",
    portability: "CHF 80M+",
    tags: ["Geneva", "GCC", "Senior", "Portability CHF 80M+"],
  },
  {
    id: "t2",
    title: "Market Head — LatAm (Anon)",
    summary:
      "Bilingual leader (ES/EN) with team P&L, strong Mexico/Andean coverage.",
    location: "Zurich",
    market: "LATAM",
    seniority: "Exec",
    portability: "Team P&L",
    tags: ["Zurich", "LATAM", "Exec", "Leadership"],
  },
  {
    id: "t3",
    title: "Wealth Manager — UK Non-Dom (Anon)",
    summary:
      "HNWI/Non-Dom coverage with cross-border UK/CH booking center experience.",
    location: "London",
    market: "UK",
    seniority: "Mid/Senior",
    portability: "CHF 40M+",
    tags: ["London", "UK", "Mid/Senior", "Portability CHF 40M+"],
  },
  {
    id: "t4",
    title: "EAM Coverage — DACH (Anon)",
    summary:
      "EAM/External Asset Manager coverage; product depth across WM/AM.",
    location: "Zurich",
    market: "DACH",
    seniority: "Senior",
    portability: "Platform Deals",
    tags: ["Zurich", "DACH", "Senior", "EAM"],
  },
  {
    id: "t5",
    title: "PB Desk Head — APAC (Anon)",
    summary:
      "Mandarin speaker; portable book with UHNW families in HK/SG/PRC.",
    location: "Singapore",
    market: "APAC",
    seniority: "Exec",
    portability: "CHF 120M+",
    tags: ["Singapore", "APAC", "Exec", "Mandarin"],
  },
  {
    id: "t6",
    title: "Relationship Manager — MENA (Anon)",
    summary:
      "Family office relationships in UAE/KSA/Qatar; strong portability.",
    location: "Dubai",
    market: "MENA",
    seniority: "Senior",
    portability: "CHF 70M+",
    tags: ["Dubai", "MENA", "Senior", "Portability CHF 70M+"],
  },
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-neutral-700/60 bg-neutral-900/60 px-3 py-1 text-xs text-neutral-300">
      {children}
    </span>
  );
}

export const revalidate = 60;

export default function TopTalentPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 pb-16 pt-14">
      {/* Hero */}
      <header className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Top Talent
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-neutral-300">
          Discover exceptional private bankers and executives who are open to
          new opportunities. Each profile is carefully vetted to ensure
          discretion and quality.
        </p>

        {/* CTAs */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/hiring-managers"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white ring-1 ring-white transition-colors hover:bg-emerald-600"
          >
            Request Shortlist
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-neutral-900/80 px-5 py-2.5 text-sm font-bold text-white ring-1 ring-white/70 transition-colors hover:bg-neutral-800"
          >
            Talk to Us
          </Link>
        </div>
      </header>

      {/* Filters (visual only for now) */}
      <section className="mt-10">
        <div className="flex flex-wrap items-center gap-2">
          <Pill>Geneva</Pill>
          <Pill>Zurich</Pill>
          <Pill>Dubai</Pill>
          <Pill>GCC</Pill>
          <Pill>LATAM</Pill>
          <Pill>APAC</Pill>
          <Pill>Senior</Pill>
          <Pill>Exec</Pill>
          <Pill>Portability 50M+</Pill>
        </div>
      </section>

      {/* Cards */}
      <section className="mt-8 grid gap-6 sm:grid-cols-2">
        {talent.map((t) => (
          <article
            key={t.id}
            className="rounded-2xl border border-neutral-800/70 bg-neutral-900/40 p-5 shadow-sm transition-colors hover:border-neutral-700 hover:bg-neutral-900/60"
          >
            <div className="mb-3 flex flex-wrap gap-2">
              {t.tags.map((tag) => (
                <Pill key={tag}>{tag}</Pill>
              ))}
            </div>

            <h3 className="text-lg font-semibold text-white">{t.title}</h3>
            <p className="mt-1 text-sm text-neutral-400">{t.summary}</p>

            <div className="mt-4 flex items-center gap-3 text-sm text-neutral-300">
              <span className="rounded-md border border-neutral-700/70 bg-neutral-900/50 px-2 py-1">
                {t.location}
              </span>
              <span className="rounded-md border border-neutral-700/70 bg-neutral-900/50 px-2 py-1">
                {t.market}
              </span>
              <span className="rounded-md border border-neutral-700/70 bg-neutral-900/50 px-2 py-1">
                {t.seniority}
              </span>
              <span className="rounded-md border border-neutral-700/70 bg-neutral-900/50 px-2 py-1">
                {t.portability}
              </span>
            </div>

            <div className="mt-5 flex gap-2">
              <Link
                href="/hiring-managers"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-white ring-1 ring-white transition-colors hover:bg-emerald-600"
              >
                Request Intro
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-neutral-900/80 px-4 py-2 text-sm font-bold text-white ring-1 ring-white/70 transition-colors hover:bg-neutral-800"
              >
                Discreet Inquiry
              </Link>
            </div>
          </article>
        ))}
      </section>

      {/* Footnote */}
      <p className="mt-10 text-center text-xs text-neutral-400">
        Profiles are anonymized by default. Full profiles shared after mutual NDA
        &amp; interest alignment.
      </p>
    </main>
  );
}
