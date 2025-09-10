// app/insights/agility-small-bankers-win/page.tsx
import type { Metadata } from "next";
import InsightArticle from "@/components/InsightArticle";

/* ---------- helpers ---------- */
function siteBase() {
  const env =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
    "https://www.execpartners.ch";
  const url = env.startsWith("http") ? env : `https://${env}`;
  return url.replace(/\/+$/, "");
}

const SITE = siteBase();
const SLUG = "agility-small-bankers-win";
const URL = `${SITE}/insights/${SLUG}`;

export const revalidate = 3600;

/* ---------- page metadata ---------- */
export const metadata: Metadata = {
  title: "Agility over size: why small Swiss private bankers win",
  description:
    "In Swiss private banking, agility beats scale. Why smaller teams out-maneuver big platforms across speed, accountability, and client outcomes.",
  alternates: { canonical: URL },
  openGraph: {
    type: "article",
    url: URL,
    title: "Agility over size: why small Swiss private bankers win",
    description:
      "How lean Swiss private banking teams out-execute bigger platforms — speed, accountability, and true client alignment.",
    images: [{ url: `${SITE}/og.png` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Agility over size: why small Swiss private bankers win",
    description: "Agility beats scale in Swiss private banking. Here’s why.",
    images: [`${SITE}/og.png`],
  },
  robots: { index: true, follow: true },
};

export default function Page() {
  /* ----- BlogPosting JSON-LD ----- */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: "Agility over size: why small Swiss private bankers win",
    description:
      "In Swiss private banking, agility beats scale. Why smaller teams out-maneuver big platforms across speed, accountability, and client outcomes.",
    datePublished: "2025-09-09",
    dateModified: "2025-09-09",
    author: {
      "@type": "Person",
      name: "Executive Partners",
      url: SITE,
    },
    publisher: {
      "@type": "Organization",
      name: "Executive Partners",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": URL },
    image: [`${SITE}/og.png`],
    url: URL,
    articleSection: "Insights",
    wordCount: 450, // rough estimate; optional
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <InsightArticle
        title="Agility over size: why small Swiss private bankers win"
        subtitle="Speed, accountability, and alignment beat bureaucracy every time."
        author={{ name: "Executive Partners", url: SITE }}
        publishedISO="2025-09-09"
        readMinutes={6}
        // heroSrc="/insights/agility-hero.jpg"
        // heroAlt="Geneva private banking skyline at dusk"
        cta={{ text: "Talk to us confidentially", href: "/contact" }}
      >
        <p>
          In Swiss private banking, smaller teams consistently outperform
          larger platforms where decision chains are long and incentives
          get diluted. Agility compels focus: faster credit answers,
          sharper investment execution, and relationship managers who
          truly own outcomes.
        </p>

        <h2>Why agility beats scale</h2>
        <ul>
          <li><strong>Speed to yes/no:</strong> short approval lines, faster client outcomes.</li>
          <li><strong>Accountability:</strong> clear ownership; fewer hand-offs and surprises.</li>
          <li><strong>Alignment:</strong> bankers and leadership row in the same direction.</li>
          <li><strong>Tailored platform:</strong> right-sized product shelf without the noise.</li>
        </ul>

        <h2>What clients actually feel</h2>
        <ul>
          <li>Proactive communication and fewer delays.</li>
          <li>Investment delivery that matches mandate and risk, not bureaucracy.</li>
          <li>Credit answers in days, not weeks—especially for complex UHNW needs.</li>
        </ul>

        <h2>When a bigger platform still helps</h2>
        <p>
          Scale can matter for specialty lending, jurisdictional coverage,
          or private markets access. The win comes from <em>choosing</em>
          scale selectively—without sacrificing responsiveness.
        </p>

        <h2>What this means for candidates</h2>
        <ul>
          <li>High-conviction platforms with faster underwriting.</li>
          <li>Clear grids, transparent governance, realistic portability.</li>
          <li>Leadership that backs client-first judgment.</li>
        </ul>

        <h2>For hiring managers</h2>
        <p>
          Compete on cycle time and clarity. Remove unnecessary steps,
          publish real SLAs, and empower teams closest to clients.
        </p>

        <hr className="my-6 opacity-20" />

        <p>
          If you’re a senior RM or a hiring leader planning moves in Geneva,
          Zurich, London, Dubai or Singapore, we can pressure-test options
          confidentially.
        </p>
      </InsightArticle>
    </>
  );
}