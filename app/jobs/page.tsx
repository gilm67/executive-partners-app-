/* app/jobs/page.tsx */
import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  Shield,
  CalendarDays,
  ChevronRight,
  Filter,
  Star,
} from "lucide-react";

import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
import { jobsList as CANONICAL_DATA } from "@/data/jobs";

/* ---------------- TYPES ---------------- */
type Job = {
  id?: string;
  title: string;
  location: string;
  market?: string;
  seniority?: string;
  summary?: string;
  slug: string;
  confidential?: boolean;
  active?: boolean;
  createdAt?: string;
};

type Locale = "en" | "fr" | "de";

/* ---------------- UI COPY ---------------- */
const JOBS_COPY: Record<
  Locale,
  {
    kicker: string;
    title: string;
    subtitle: string;
    submitCv: string;
    candidateHub: string;
    contactRecruiter: string;
    search: string;
    allMarkets: string;
    allLocations: string;
    allSeniorities: string;
    applyFilters: string;
    newestFirst: string;
    oldestFirst: string;
    titleAZ: string;
    countRoles: (n: number) => string;
    emptyTitle: string;
    emptyText: string;
    emptyButton: string;
    footerTitle: string;
    footerCta1: string;
    footerCta2: string;
  }
> = {
  en: {
    kicker: "Private Banking · Discreet Mandates",
    title: "Private Banking Jobs in Switzerland",
    subtitle:
      "Live mandates across Geneva and Zurich, with international coverage in Dubai, Singapore, London & New York. We publish a subset of searches; confidential roles are shared directly with qualified bankers.",
    submitCv: "Submit CV",
    candidateHub: "Candidate Hub",
    contactRecruiter: "Contact a Recruiter",
    search: "Search by title, market, location…",
    allMarkets: "All markets",
    allLocations: "All locations",
    allSeniorities: "All seniorities",
    applyFilters: "Apply",
    newestFirst: "Newest first",
    oldestFirst: "Oldest first",
    titleAZ: "Title A–Z",
    countRoles: (n) => `${n} role${n === 1 ? "" : "s"}`,
    emptyTitle: "No roles match your filters",
    emptyText:
      "Try clearing filters or checking back soon—new mandates drop regularly.",
    emptyButton: "Talk to us confidentially",
    footerTitle:
      "Don’t see your exact market? We run confidential mandates continuously.",
    footerCta1: "Contact us",
    footerCta2: "Register confidentially",
  },

  fr: {
    kicker: "Private Banking · Mandats confidentiels",
    title: "Jobs en Banque Privée en Suisse",
    subtitle:
      "Mandats actifs à Genève et Zurich, avec couverture internationale à Dubaï, Singapour, Londres & New York. Nous publions une partie de nos recherches ; les postes confidentiels sont partagés directement avec des banquiers qualifiés.",
    submitCv: "Envoyer mon CV",
    candidateHub: "Espace Candidats",
    contactRecruiter: "Contacter un recruteur",
    search: "Rechercher par titre, marché, localisation…",
    allMarkets: "Tous les marchés",
    allLocations: "Toutes les localisations",
    allSeniorities: "Tous niveaux de seniorité",
    applyFilters: "Appliquer",
    newestFirst: "Plus récents d’abord",
    oldestFirst: "Plus anciens d’abord",
    titleAZ: "Titre A–Z",
    countRoles: (n) => `${n} poste${n > 1 ? "s" : ""}`,
    emptyTitle: "Aucun poste ne correspond à vos filtres",
    emptyText:
      "Essayez d’élargir les filtres ou revenez bientôt — de nouveaux mandats arrivent régulièrement.",
    emptyButton: "Échanger en toute confidentialité",
    footerTitle:
      "Vous ne trouvez pas votre marché ? Nous gérons des mandats confidentiels en continu.",
    footerCta1: "Nous contacter",
    footerCta2: "Inscription confidentielle",
  },

  de: {
    kicker: "Private Banking · Diskrete Mandate",
    title: "Private-Banking-Jobs in der Schweiz",
    subtitle:
      "Aktive Mandate in Genf und Zürich, mit internationaler Abdeckung in Dubai, Singapur, London & New York. Wir veröffentlichen nur einen Teil der Suchen; vertrauliche Rollen teilen wir direkt mit qualifizierten Bankern.",
    submitCv: "CV einreichen",
    candidateHub: "Kandidatenbereich",
    contactRecruiter: "Recruiter kontaktieren",
    search: "Nach Titel, Markt, Standort suchen…",
    allMarkets: "Alle Märkte",
    allLocations: "Alle Standorte",
    allSeniorities: "Alle Senioritätsstufen",
    applyFilters: "Anwenden",
    newestFirst: "Neueste zuerst",
    oldestFirst: "Älteste zuerst",
    titleAZ: "Titel A–Z",
    countRoles: (n) => `${n} Stelle${n === 1 ? "" : "n"}`,
    emptyTitle: "Keine passenden Rollen gefunden",
    emptyText:
      "Versuchen Sie, die Filter zu ändern — neue Mandate werden regelmäßig ergänzt.",
    emptyButton: "Diskret Kontakt aufnehmen",
    footerTitle:
      "Nicht Ihr Markt? Wir betreuen kontinuierlich vertrauliche Mandate.",
    footerCta1: "Kontaktieren Sie uns",
    footerCta2: "Vertraulich registrieren",
  },
};

/* ---------------- DATA ---------------- */
const CANONICAL_JOBS: Job[] = CANONICAL_DATA.map((j) => ({
  title: j.title,
  location: j.location,
  market: j.market,
  seniority: "Director / Executive Director",
  summary: j.summary,
  slug: j.slug,
  confidential: true,
  active: true,
}));

const HIDDEN_SLUGS = new Set<string>([
  "senior-relationship-manager-ch-onshore-4",
  "senior-relationship-manager-brazil-2",
  "private-banker-mea-2",
]);

/* ---------------- HELPERS ---------------- */
async function safeFetchJSON(url: string): Promise<any | null> {
  try {
    const res = await fetch(url, { cache: "no-store" });
    const text = await res.text();
    return JSON.parse(text);
  } catch {
    return null;
  }
}

async function getJobs(query: string, filters: Record<string, string>) {
  const params = new URLSearchParams({ q: query, ...filters });
  const urls = [
    (process.env.NEXT_PUBLIC_SITE_URL ?? "") + `/api/jobs?${params}`,
    `/api/jobs?${params}`,
  ];

  for (const u of urls) {
    const json = await safeFetchJSON(u);
    if (Array.isArray(json) && json.length) return json as Job[];
  }
  return CANONICAL_JOBS;
}

/* ---------------- UI COMPONENTS ---------------- */
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-medium text-white/80">
      {children}
    </span>
  );
}

function BadgeTone({ market }: { market?: string }) {
  const mk = (market || "").toLowerCase();
  const isMEA = mk.includes("mea");
  const isCH = mk.includes("switzerland") || mk.includes("onshore");

  const base = isMEA
    ? "from-brandGoldDark to-brandGold"
    : isCH
    ? "from-brandGold to-brandGoldSoft"
    : "from-brandGoldSoft to-brandGold";

  return (
    <div
      className={`inline-flex select-none items-center gap-2 rounded-full bg-gradient-to-r ${base} px-2.5 py-1 text-xs font-semibold text-black shadow-sm`}
    >
      <Star className="h-3.5 w-3.5 opacity-90" />
      {market ?? "International"}
    </div>
  );
}

function Card({ job }: { job: Job }) {
  const href = `/jobs/${job.slug}`;
  const created = job.createdAt ? new Date(job.createdAt) : null;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))] p-5">
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between">
          <BadgeTone market={job.market} />
          {created && (
            <span className="flex items-center gap-1 text-xs text-white/70">
              <CalendarDays className="h-3.5 w-3.5" />
              {created.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
        </div>

        <h3 className="mt-3 text-xl font-bold">{job.title}</h3>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-[13px] text-white/80">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" /> {job.location}
          </span>
          <span className="flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5" /> {job.seniority}
          </span>
          {job.confidential && (
            <Chip>
              <Shield className="mr-1 h-3.5 w-3.5" />
              Confidential
            </Chip>
          )}
        </div>

        <p className="mt-3 line-clamp-3 text-sm text-neutral-300">
          {job.summary ??
            "Discreet mandate with strong platform, open architecture and competitive grid."}
        </p>

        <div className="mt-auto pt-4">
          <Link
            href={href}
            className="inline-flex items-center gap-2 rounded-xl border border-brandGold/40 bg-black/30 px-4 py-2 text-sm font-semibold text-brandGoldPale hover:bg-brandGold/15 hover:text-white"
          >
            View details <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="h-5 w-40 rounded-full bg-white/10" />
      <div className="mt-3 h-6 w-3/5 rounded bg-white/10" />
      <div className="mt-2 h-4 w-2/5 rounded bg-white/10" />
      <div className="mt-4 h-16 w-full rounded bg-white/10" />
      <div className="mt-6 h-9 w-32 rounded-xl bg-white/10" />
    </div>
  );
}

/* ---------------- FILTER BAR (TRANSLATED) ---------------- */
function FilterBar({
  t,
  defaultQuery,
  defaultFilters,
}: {
  t: (typeof JOBS_COPY)["en"];
  defaultQuery?: string;
  defaultFilters?: Record<string, string>;
}) {
  return (
    <form className="flex w-full flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
        <input
          name="q"
          defaultValue={defaultQuery}
          placeholder={t.search}
          className="w-full rounded-xl border border-white/10 bg-transparent py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/50 outline-none"
        />
      </div>

      <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-3">
        <select
          name="market"
          defaultValue={defaultFilters?.market ?? ""}
          className="rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm text-white"
        >
          <option value="" className="bg-[#0B0E13]">
            {t.allMarkets}
          </option>
          <option value="Switzerland (Onshore)" className="bg-[#0B0E13]">
            Switzerland (Onshore)
          </option>
          <option value="Middle East & Africa (MEA)" className="bg-[#0B0E13]">
            MEA
          </option>
          <option value="UK" className="bg-[#0B0E13]">
            UK
          </option>
          <option value="US" className="bg-[#0B0E13]">
            US
          </option>
          <option value="Singapore" className="bg-[#0B0E13]">
            Singapore
          </option>
          <option value="Hong Kong" className="bg-[#0B0E13]">
            Hong Kong
          </option>
          <option value="Portugal (LatAm/Europe)" className="bg-[#0B0E13]">
            Portugal
          </option>
        </select>

        <select
          name="location"
          defaultValue={defaultFilters?.location ?? ""}
          className="rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm text-white"
        >
          <option value="" className="bg-[#0B0E13]">
            {t.allLocations}
          </option>
          <option value="Geneva" className="bg-[#0B0E13]">
            Geneva
          </option>
          <option value="Zurich" className="bg-[#0B0E13]">
            Zurich
          </option>
          <option value="Lausanne" className="bg-[#0B0E13]">
            Lausanne
          </option>
          <option value="Dubai" className="bg-[#0B0E13]">
            Dubai
          </option>
          <option value="Singapore" className="bg-[#0B0E13]">
            Singapore
          </option>
          <option value="Hong Kong" className="bg-[#0B0E13]">
            Hong Kong
          </option>
          <option value="London" className="bg-[#0B0E13]">
            London
          </option>
          <option value="New York" className="bg-[#0B0E13]">
            New York
          </option>
        </select>

        <select
          name="seniority"
          defaultValue={defaultFilters?.seniority ?? ""}
          className="rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm text-white"
        >
          <option value="" className="bg-[#0B0E13]">
            {t.allSeniorities}
          </option>
          <option value="Director" className="bg-[#0B0E13]">
            Director
          </option>
          <option value="Executive Director" className="bg-[#0B0E13]">
            Executive Director
          </option>
          <option value="Managing Director" className="bg-[#0B0E13]">
            Managing Director
          </option>
          <option value="Team Head" className="bg-[#0B0E13]">
            Team Head
          </option>
        </select>
      </div>

      <button className="inline-flex items-center gap-2 rounded-xl border border-brandGold/70 bg-brandGold/20 px-4 py-2 text-sm font-semibold text-brandGoldPale hover:bg-brandGold/30 hover:text-white">
        <Filter className="h-4 w-4" /> {t.applyFilters}
      </button>
    </form>
  );
}

/* ---------------- PAGE ---------------- */
export const metadata: Metadata = {
  title: "Private Banking Jobs in Switzerland | Executive Partners",
  description:
    "Explore confidential Private Banking jobs across Geneva & Zurich, plus Dubai, Singapore, London and New York. Discreet executive search for HNW/UHNW markets.",
  openGraph: {
    title: "Private Banking Jobs in Switzerland | Executive Partners",
    description:
      "Confidential Private Banking opportunities in Geneva, Zurich and global hubs. Submit your CV or speak with our search team.",
    url: "https://www.execpartners.ch/jobs",
    images: [{ url: "/og.png" }],
  },
  alternates: { canonical: "https://www.execpartners.ch/jobs" },
};

export default async function JobsPage({
  searchParams,
  locale = "en",
}: {
  searchParams?: Promise<Record<string, string | string[]>>;
  locale?: Locale;
}) {
  const t = JOBS_COPY[locale] ?? JOBS_COPY.en;

  const sp = (await searchParams) ?? {};
  const q = typeof sp.q === "string" ? sp.q : "";
  const market = typeof sp.market === "string" ? sp.market : "";
  const location = typeof sp.location === "string" ? sp.location : "";
  const seniority = typeof sp.seniority === "string" ? sp.seniority : "";
  const sort = typeof sp.sort === "string" ? sp.sort : "newest";

  const filters: Record<string, string> = {};
  if (market) filters.market = market;
  if (location) filters.location = location;
  if (seniority) filters.seniority = seniority;
  if (sort) filters.sort = sort;

  const rawJobs: Job[] = await getJobs(q, filters);
  const jobs = rawJobs.filter(
    (j) => j?.active !== false && !HIDDEN_SLUGS.has(j.slug),
  );

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white">
      <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-14">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brandGoldSoft/90">
            {t.kicker}
          </p>

          <h1 className="mt-3 text-4xl font-extrabold md:text-5xl">
            {t.title}
          </h1>

          <p className="mt-3 mx-auto max-w-3xl text-neutral-300">
            {t.subtitle}
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm">
            <Link
              href="/apply"
              className="rounded-full border border-brandGold/40 bg-black/30 px-3 py-1 text-xs font-semibold text-brandGoldPale hover:bg-brandGold/15 hover:text-white"
            >
              {t.submitCv}
            </Link>

            <Link
              href="/candidates"
              className="rounded-full border border-brandGold/40 bg-black/30 px-3 py-1 text-xs font-semibold text-brandGoldPale hover:bg-brandGold/15 hover:text-white"
            >
              {t.candidateHub}
            </Link>

            <Link
              href="/contact"
              className="rounded-full border border-brandGold/40 bg-black/30 px-3 py-1 text-xs font-semibold text-brandGoldPale hover:bg-brandGold/15 hover:text-white"
            >
              {t.contactRecruiter}
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <FilterBar
            t={t}
            defaultQuery={q}
            defaultFilters={{ market, location, seniority }}
          />
        </div>

        {/* SORT */}
        <div className="mt-4 flex items-center justify-between text-sm text-white/70">
          <div>{t.countRoles(jobs.length)}</div>
          <form>
            <select
              name="sort"
              defaultValue={sort}
              className="rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm text-white"
            >
              <option value="newest" className="bg-[#0B0E13]">
                {t.newestFirst}
              </option>
              <option value="oldest" className="bg-[#0B0E13]">
                {t.oldestFirst}
              </option>
              <option value="title" className="bg-[#0B0E13]">
                {t.titleAZ}
              </option>
            </select>
          </form>
        </div>

        {/* GRID */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <Suspense
            fallback={
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            }
          >
            {jobs.length === 0 ? (
              <div className="col-span-full rounded-2xl border border-white/10 bg-white/5 p-10 text-center">
                <h3 className="text-lg font-semibold text-white">
                  {t.emptyTitle}
                </h3>
                <p className="mt-2 text-sm text-neutral-300">{t.emptyText}</p>
                <div className="mt-4 flex justify-center">
                  <PrimaryButton href="/contact" className="px-4 py-2 text-sm">
                    {t.emptyButton}
                  </PrimaryButton>
                </div>
              </div>
            ) : (
              jobs.map((job) => <Card key={job.slug} job={job} />)
            )}
          </Suspense>
        </div>

        {/* FOOTER CTA */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center">
          <p className="text-neutral-300">{t.footerTitle}</p>
          <div className="mt-3 flex flex-wrap justify-center gap-3">
            <PrimaryButton href="/contact">{t.footerCta1}</PrimaryButton>
            <SecondaryButton href="/candidates">{t.footerCta2}</SecondaryButton>
          </div>
        </div>
      </div>
    </main>
  );
}