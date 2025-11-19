// app/page.tsx
import Link from "next/link";
import Image from "next/image";

/* Public assets */
const HERO = "/hero-skyline-hq.jpg";
const LADY = "/candidate-eurasian.jpg";
const MAN = "/manager-portrait.jpg";

export const dynamic = "force-static";
export const revalidate = false;

/* -------- Full homepage localisation (EN / FR / DE) -------- */

type Locale = "en" | "fr" | "de";

const HOME_COPY: Record<
  Locale,
  {
    heroPrefix: string;
    heroHighlight: string;
    heroSubtitle: string;
    heroCta: string;

    kpi1Title: string;
    kpi2Title: string;
    kpi3Title: string;
    kpi1Note: string;
    kpi2Note: string;
    kpi3Note: string;

    candTitle: string;
    candCopy: string;
    candPrimary: string;
    candSecondary: string;

    hmTitle: string;
    hmCopy: string;
    hmPrimary: string;
    hmSecondary: string;

    toolsHeading: string;
    toolsSubheading: string;

    portTitle: string;
    portBullets: string[];
    portCta: string;

    bpTitle: string;
    bpBullets: string[];
    bpCta: string;
  }
> = {
  en: {
    heroPrefix: "International & Swiss",
    heroHighlight: "Private Banking",
    heroSubtitle:
      "Executive Search & Talent Advisory for HNW/UHNW banking. Geneva-based, globally connected.",
    heroCta: "Apply Confidentially",

    kpi1Title: "Placements",
    kpi2Title: "12-month Retention",
    kpi3Title: "Global Hubs",
    kpi1Note: "Senior RMs & Private Bankers placed worldwide",
    kpi2Note: "Candidates still in seat after 12 months",
    kpi3Note:
      "Geneva, Zurich, London, Dubai, Singapore, Hong Kong, New York, Miami, Paris, Milano, Madrid, Lisbon",

    candTitle: "For Candidates",
    candCopy:
      "Advance your career with discreet, tailored search. Explore live mandates and roles that match your market, seniority and portability.",
    candPrimary: "Explore Opportunities",
    candSecondary: "Candidate Hub",

    hmTitle: "For Hiring Managers",
    hmCopy:
      "Market mapping, calibrated outreach and vetted shortlists with real portability. Brief a new role or ask us to approach specific bankers.",
    hmPrimary: "Find Top Talent",
    hmSecondary: "Talk to Us",

    toolsHeading: "Due-Diligence Tools",
    toolsSubheading:
      "Validate portability and strengthen approvals before you move.",

    portTitle: "Portability Score™",
    portBullets: [
      "Estimate AUM portability",
      "Flag risks early",
      "Evidence pack for approvals",
    ],
    portCta: "Calculate Score",

    bpTitle: "Business Plan Simulator",
    bpBullets: [
      "Model revenue scenarios",
      "Document assumptions",
      "Export for review",
    ],
    bpCta: "Run Simulation",
  },

  fr: {
    heroPrefix: "Carrières en",
    heroHighlight: "Banque privée internationale & suisse",
    heroSubtitle:
      "Executive Search & Talent Advisory pour la banque HNWI/UHNWI. Basés à Genève, connectés au niveau mondial.",
    heroCta: "Postuler en toute confidentialité",

    kpi1Title: "Placements",
    kpi2Title: "Rétention à 12 mois",
    kpi3Title: "Hubs internationaux",
    kpi1Note:
      "Senior RMs & Private Bankers placés en Suisse et à l’international",
    kpi2Note: "Candidats toujours en poste après 12 mois",
    kpi3Note:
      "Genève, Zurich, Londres, Dubaï, Singapour, Hong Kong, New York, Miami, Paris, Milan, Madrid, Lisbonne",

    candTitle: "Pour les candidats",
    candCopy:
      "Faites évoluer votre carrière via une approche confidentielle et ciblée. Accédez à des mandats en ligne avec votre marché, votre séniorité et la portabilité de votre portefeuille.",
    candPrimary: "Découvrir les opportunités",
    candSecondary: "Espace candidats",

    hmTitle: "Pour les employeurs",
    hmCopy:
      "Market mapping, approche ciblée et shortlists qualifiées avec une vraie portabilité d’AUM. Confiez-nous un mandat ou demandez une approche de banquiers identifiés.",
    hmPrimary: "Trouver un banquier privé",
    hmSecondary: "Échanger avec nous",

    toolsHeading: "Outils de due diligence",
    toolsSubheading:
      "Validez la portabilité et préparez les approbations avant un move.",

    portTitle: "Portability Score™",
    portBullets: [
      "Estimer la portabilité de votre AUM",
      "Identifier les risques en amont",
      "Préparer un dossier pour les approbations internes",
    ],
    portCta: "Calculer mon score",

    bpTitle: "Business Plan Simulator",
    bpBullets: [
      "Modéliser plusieurs scénarios de revenus",
      "Documenter les hypothèses de NNM et de ROA",
      "Exporter un support pour les comités",
    ],
    bpCta: "Lancer une simulation",
  },

  de: {
    heroPrefix: "Internationale & Schweizer",
    heroHighlight: "Private-Banking-Karrieren",
    heroSubtitle:
      "Executive Search & Talent Advisory für HNWI/UHNWI-Banking. Mit Sitz in Genf, global vernetzt.",
    heroCta: "Vertraulich bewerben",

    kpi1Title: "Besetzungen",
    kpi2Title: "12-Monats-Retention",
    kpi3Title: "Globale Hubs",
    kpi1Note:
      "Senior RMs & Private Banker, in der Schweiz und international platziert",
    kpi2Note: "Kandidaten nach 12 Monaten noch in Funktion",
    kpi3Note:
      "Genf, Zürich, London, Dubai, Singapur, Hongkong, New York, Miami, Paris, Mailand, Madrid, Lissabon",

    candTitle: "Für Kandidaten",
    candCopy:
      "Entwickeln Sie Ihre Karriere über eine diskrete, gezielte Suche weiter. Zugriff auf Mandate, die zu Markt, Seniorität und Portabilität Ihres Buches passen.",
    candPrimary: "Offene Mandate ansehen",
    candSecondary: "Kandidatenbereich",

    hmTitle: "Für Auftraggeber",
    hmCopy:
      "Market Mapping, gezielte Ansprache und geprüfte Shortlists mit echter AUM-Portabilität. Erteilen Sie uns ein Mandat oder bitten Sie um die Ansprache bestimmter Banker.",
    hmPrimary: "Top-Talente finden",
    hmSecondary: "Mit uns sprechen",

    toolsHeading: "Due-Diligence-Tools",
    toolsSubheading:
      "Portabilität prüfen und Entscheidungsprozesse vor einem Wechsel stärken.",

    portTitle: "Portability Score™",
    portBullets: [
      "Portabilität Ihres AUM einschätzen",
      "Risiken frühzeitig identifizieren",
      "Unterlagen für interne Freigaben vorbereiten",
    ],
    portCta: "Score berechnen",

    bpTitle: "Business Plan Simulator",
    bpBullets: [
      "Ertragsszenarien modellieren",
      "Annahmen zu NNM und ROA dokumentieren",
      "Unterlagen für Gremien exportieren",
    ],
    bpCta: "Simulation starten",
  },
};

export default function HomePage({ locale }: { locale?: Locale }) {
  const lang: Locale =
    locale && ["en", "fr", "de"].includes(locale) ? locale : "en";
  const t = HOME_COPY[lang];

  return (
    <main className="relative min-h-screen body-grain text-white">
      {/* ===== HERO (same layout as original) ===== */}
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
            {/* === GLASS CARD HERO (matching FR/DE look, more transparent) === */}
            <div className="mx-auto max-w-3xl rounded-2xl border border-white/8 bg-black/25 px-8 py-7 text-center shadow-[0_22px_60px_rgba(0,0,0,0.75)] backdrop-blur-md">
              <h1 className="font-[var(--font-playfair)] text-5xl font-semibold tracking-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)] md:text-6xl">
                {t.heroPrefix}
                <br className="hidden md:block" />
                {t.heroHighlight}
              </h1>
              <p className="mt-4 text-base text-white/90 md:text-lg">
                {t.heroSubtitle}
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <Link href="/apply" className="btn-primary btn-xl text-center">
                {t.heroCta}
              </Link>
            </div>
          </div>
        </div>

        {/* ===== KPI BAR — WHITE, placed near bottom of skyline ===== */}
        <div className="relative mx-auto -mt-20 max-w-6xl px-4 pb-6">
          <div className="rounded-2xl border border-black/10 bg-white text-[#0B0E13] shadow-xl">
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3 md:p-6">
              <KpiCard title={t.kpi1Title} value="200+" note={t.kpi1Note} />
              <KpiCard title={t.kpi2Title} value="98%" note={t.kpi2Note} />
              <KpiCard title={t.kpi3Title} value="12+" note={t.kpi3Note} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== SIDE-IMAGE FEATURE PANELS ===== */}
      <section className="relative mx-auto mt-10 max-w-6xl space-y-6 px-4">
        <FeaturePanel
          imageSrc={LADY}
          imageAlt="Eurasian private banker — warm, approachable"
          title={t.candTitle}
          copy={t.candCopy}
          primary={{ href: "/jobs", label: t.candPrimary }}
          secondary={{ href: "/candidates", label: t.candSecondary }}
          imageLeft
        />
        <FeaturePanel
          imageSrc={MAN}
          imageAlt="Hiring manager — executive tone"
          title={t.hmTitle}
          copy={t.hmCopy}
          primary={{ href: "/hiring-managers", label: t.hmPrimary }}
          secondary={{ href: "/contact", label: t.hmSecondary }}
        />
      </section>

      {/* ===== DUE-DILIGENCE TOOLS ===== */}
      <section className="container-max mt-14 px-4 pb-16">
        <h2 className="text-center text-3xl font-semibold">
          {t.toolsHeading}
        </h2>
        <p className="mx-auto mt-2 max-w-3xl text-center text-white/75">
          {t.toolsSubheading}
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <ToolCard
            title={t.portTitle}
            bullets={t.portBullets}
            primary={{ href: "/portability-score", label: t.portCta }}
          />
          <ToolCard
            title={t.bpTitle}
            bullets={t.bpBullets}
            primary={{ href: "/bp-simulator", label: t.bpCta }}
          />
        </div>
      </section>
    </main>
  );
}

/* ===== Components ===== */

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
      {/* IMAGE SIDE */}
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
            <Link href={primary.href} className="btn-primary">
              {primary.label}
            </Link>
            <Link href={secondary.href} className="btn-ghost">
              {secondary.label}
            </Link>
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
          <li key={b} className="list-disc pl-5">
            {b}
          </li>
        ))}
      </ul>
      <div className="mt-5">
        <Link href={primary.href} className="btn-primary">
          {primary.label}
        </Link>
      </div>
    </div>
  );
}