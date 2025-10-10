// data/jobs.ts
export type Job = {
  slug: string;
  title: string;
  market: string;
  location: string;
  experience_min?: number;
  languages?: string[];
  summary: string;               // short blurb for cards
  overview: string[];            // long spec sections for the details page
  responsibilities: string[];
  qualifications: string[];
  offer: string[];
  compliance?: string[];
  apply_note?: string;

  // Optional (used by details page / SEO but not mandatory)
  seniority?: string;
  confidential?: boolean;
  active?: boolean;
  createdAt?: string;            // ISO date
  body?: string;                 // if you want to supply a full markdown body
};

/* ---------------- Helpers ---------------- */
function norm(s: string | undefined) {
  return (s ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-|-$/g, "");
}

/* ---------------- Data ---------------- */
export const jobsBySlug: Record<string, Job> = {
  // 1) MEA — Dubai
  "senior-relationship-manager-mea-dubai": {
    slug: "senior-relationship-manager-mea-dubai",
    title: "Senior Relationship Manager — MEA",
    market: "Middle East & Africa (MEA)",
    location: "Dubai, UAE",
    experience_min: 7,
    languages: ["English", "Arabic (plus)"],
    summary:
      "Cover UHNW/HNW MEA clients from Dubai; strong acquisition and cross-border expertise.",
    overview: [
      "Lead and grow a portfolio of MEA HNW/UHNW clients booked in UAE/CH/SG.",
      "Deliver bespoke multi-asset solutions (DPM/Advisory, structured, alternatives, Lombard).",
      "Coordinate with product desks and Geneva/Zurich booking centres.",
    ],
    responsibilities: [
      "Bring a portable network across GCC/KSA/MEA; originate consistent NNM.",
      "Convert prospects via events, introducers and bank referrals.",
      "Structure lending, FX, mandates and alternatives to suit client objectives.",
      "Maintain rigorous cross-border governance and lifecycle documentation.",
    ],
    qualifications: [
      "7+ years serving MEA clientele with proven NNM/AUM growth.",
      "Credible introducer network (family offices, lawyers, corporate owners).",
      "Strong advisory/lending knowledge; Islamic-finance awareness is a plus.",
    ],
    compliance: [
      "Adhere to DFSA/CBUAE and bank cross-border frameworks.",
      "Gold-standard KYC/AML, SoW/SoF and suitability.",
    ],
    offer: [
      "Highly competitive fixed + variable linked to quality of revenues and plan delivery.",
      "Transition support possible for senior hires (subject to approval).",
    ],
    apply_note:
      "Confidentially share your CV and brief business plan (AUM, NNM, pipeline).",
    seniority: "Director / Executive Director",
    confidential: true,
    active: true,
    createdAt: "2025-09-01",
  },

  // 2) Brazil — Zurich or Geneva
  "senior-relationship-manager-brazil-ch": {
    slug: "senior-relationship-manager-brazil-ch",
    title: "Senior Relationship Manager — Brazil",
    market: "Brazil (LatAm)",
    location: "Zurich or Geneva, Switzerland",
    experience_min: 7,
    languages: ["Portuguese", "English", "French (plus)"],
    summary:
      "Acquire, develop and manage Brazilian HNW/UHNW clients in Switzerland; offshore diversification and advisory.",
    overview: [
      "Serve sophisticated Brazilian families and entrepreneurs seeking diversification via Swiss booking.",
      "Deliver holistic coverage: DPM/Advisory, structured solutions, Lombard & bespoke lending.",
      "Work with tax/legal partners to ensure compliant international setups.",
    ],
    responsibilities: [
      "Bring a portable Brazilian client base and develop new relationships.",
      "Drive NNM via warm network, events and introducers.",
      "Promote mandates, FX, lending and private markets access.",
    ],
    qualifications: [
      "7+ years PB with Brazilian clientele; consistent NNM track record.",
      "Deep network with entrepreneurs and family offices.",
      "Excellent product knowledge incl. alternatives and structured solutions.",
    ],
    compliance: [
      "Strict Swiss cross-border and Brazil-related constraints; perfect documentation.",
    ],
    offer: [
      "Competitive Swiss package + variable tied to NNM/revenue quality.",
      "Relocation support where applicable; strong LatAm desk collaboration.",
    ],
    apply_note: "Send CV + short plan (AUM, NNM, pipeline).",
    seniority: "Director / Executive Director",
    confidential: true,
    active: true,
    createdAt: "2025-09-05",
  },

  // 3) Portugal — Geneva / Zurich (long spec per your example)
  "senior-relationship-manager-portugal-geneva": {
    slug: "senior-relationship-manager-portugal-geneva",
    title: "Senior Relationship Manager — Portugal Market",
    market: "Portugal (LatAm/Europe)",
    location: "Geneva / Zurich, Switzerland",
    experience_min: 7,
    languages: ["Portuguese", "English", "French (plus)"],
    summary:
      "Manage UHNW/HNW Portuguese clients booking in Switzerland; strong cross-border, advisory and acquisition expertise.",
    overview: [
      "Strengthen the bank’s Lusophone franchise via acquisition and retention of HNW/UHNW clients.",
      "Provide bespoke investment and planning solutions from a top Swiss platform.",
      "Leverage global reach for lending, FX and private markets opportunities.",
    ],
    responsibilities: [
      "Act as trusted advisor to Portuguese HNW/UHNW clients with bespoke solutions.",
      "Bring and actively grow a personal book; build multi-generational ties.",
      "Identify new opportunities via your network and qualified introducers.",
      "Work closely with investment specialists, PMs and wealth planners.",
      "Uphold the highest standards of compliance and cross-border rules.",
    ],
    qualifications: [
      "7+ years managing Portuguese HNW/UHNW; proven AUM/NNM growth.",
      "Strong network and credibility within the Portuguese wealth ecosystem.",
      "Deep understanding of markets, products and planning solutions.",
      "Fluent in Portuguese & English (French a plus).",
    ],
    offer: [
      "Respected Swiss private bank with global reach.",
      "Competitive compensation with attractive incentive scheme.",
      "Full support from investment, advisory and product teams.",
      "Opportunity to further develop the Portuguese market.",
    ],
    apply_note:
      "👉 To apply: send your CV and a brief cover note via the Apply form or contact us for a confidential discussion.",
    seniority: "Director / Executive Director",
    confidential: true,
    active: true,
    createdAt: "2025-09-10",
  },

  // 4) CH Onshore — Zurich
  "senior-relationship-manager-ch-onshore-zurich": {
    slug: "senior-relationship-manager-ch-onshore-zurich",
    title: "Senior Relationship Manager — CH Onshore",
    market: "Switzerland (Onshore)",
    location: "Zurich, Switzerland",
    experience_min: 7,
    languages: ["German", "English"],
    summary:
      "Manage Swiss-domiciled HNW/UHNW clients in Zurich/Deutschschweiz; mandates, lending and PM advisory.",
    overview: [
      "Advise entrepreneurs, executives and next-gen wealth in the Zurich region.",
      "Promote DPM/Advisory, Lombard lending and private markets access.",
      "Leverage bank brand, events and referrals for growth.",
    ],
    responsibilities: [
      "Develop a Zurich-centric onshore book with clear NNM targets.",
      "Increase mandate penetration and wallet share.",
      "Build introducer network (law/tax/corp-finance boutiques).",
    ],
    qualifications: [
      "7+ years with Swiss onshore clients; consistent delivery and references.",
      "Strong reputation and network in Deutschschweiz.",
    ],
    compliance: [
      "Operate under LSFin/FinSA/MiFID-aligned policies; perfect documentation.",
    ],
    offer: [
      "Top-quartile Zurich package; upside tied to plan execution.",
      "Strong product platform and local PM/advisory support.",
    ],
    apply_note: "Submit CV + brief plan; Zurich hiring window is open.",
    seniority: "Director / Executive Director",
    confidential: true,
    active: true,
    createdAt: "2025-09-12",
  },

  // 5) CH Onshore — Lausanne
  "senior-relationship-manager-ch-onshore-lausanne": {
    slug: "senior-relationship-manager-ch-onshore-lausanne",
    title: "Senior Relationship Manager — CH Onshore",
    market: "Switzerland (Onshore)",
    location: "Lausanne, Switzerland",
    experience_min: 7,
    languages: ["French", "English (plus)"],
    summary:
      "Cover UHNW/HNW Swiss onshore clients in Romandie; focus on acquisition and cross-generational advisory.",
    overview: [
      "Develop domestic relationships across the Arc Lémanique (Lausanne/Nyon/Montreux).",
      "Deliver mandates, lending, FX and planning with local specialists.",
      "Engage via regional events, clubs and professional networks.",
    ],
    responsibilities: [
      "Acquire and deepen client relationships; manage retention and referrals.",
      "Promote DPM/Advisory adoption and lending utilization.",
      "Build introducer channels across the region.",
    ],
    qualifications: [
      "Proven onshore track record in Suisse Romande; strong NNM history.",
      "Presence with entrepreneurs/professionals and family advisers.",
    ],
    compliance: ["LSFin/FinSA rules strictly applied; suitability discipline."],
    offer: [
      "Attractive fixed + variable; seniority-linked upside.",
      "Prestigious Swiss brand with strong local heritage.",
    ],
    apply_note: "Confidential enquiries welcome; immediate interviews possible.",
    seniority: "Director / Executive Director",
    confidential: true,
    active: true,
    createdAt: "2025-09-15",
  },

  // 6) MEA — Zurich
  "senior-relationship-manager-mea-zurich": {
    slug: "senior-relationship-manager-mea-zurich",
    title: "Senior Relationship Manager — MEA",
    market: "Middle East & Africa (MEA)",
    location: "Zurich, Switzerland",
    experience_min: 7,
    languages: ["English", "German (plus)", "Arabic (plus)"],
    summary:
      "Cover UHNW/HNW MEA clients from Zurich; GCC and African markets focus.",
    overview: [
      "Serve MEA clients booked in Switzerland, combining Swiss platform safety with MEA origination.",
      "Coordinate with Dubai/MEA teams and CH product desks.",
      "Deliver multi-asset mandates, credit and alternatives.",
    ],
    responsibilities: [
      "Bring portable MEA relationships; grow NNM from Zurich hub.",
      "Ensure best-in-class client experience and retention.",
      "Travel regionally to maintain key relationships.",
    ],
    qualifications: [
      "7+ years covering MEA; portable network; compliant practices.",
      "Fluency in English; German/Arabic advantageous.",
    ],
    compliance: ["Swiss cross-border discipline; robust SoW/SoF documentation."],
    offer: [
      "Competitive Swiss package with performance-linked variable.",
      "Entrepreneurial environment with strong support functions.",
    ],
    apply_note: "Contact us confidentially; Zurich MEA desk is growing.",
    seniority: "Director / Executive Director",
    confidential: true,
    active: true,
    createdAt: "2025-09-20",
  },

  // 7) LATAM — New York (NEW)
  "senior-relationship-manager-latam-new-york": {
    slug: "senior-relationship-manager-latam-new-york",
    title: "Senior Relationship Manager — LATAM (New York)",
    market: "Latin America (LatAm)",
    location: "New York, USA",
    experience_min: 7,
    languages: ["English", "Spanish (strong)", "Portuguese (plus)"],
    summary:
      "Acquire and manage HNW/UHNW Latin American clients from a New York hub; cross-border advisory, lending and investment solutions.",
    overview: [
      "Lead client acquisition and relationship management for HNW/UHNW LATAM clients (Mexico, Andean region, Southern Cone, Brazil diaspora) from New York.",
      "Provide holistic wealth management across advisory/DPM, structured products, credit (Lombard/RE), FX and estate planning coordination.",
      "Leverage US platform breadth with international booking options (US/CH/SG as applicable) and specialist teams.",
    ],
    responsibilities: [
      "Bring a portable network and originate consistent NNM via referrals, diaspora communities, and professional introducers.",
      "Deliver tailored investment and credit solutions; coordinate with product, lending and planning specialists.",
      "Maintain disciplined pipeline management, documenting opportunities and conversion.",
      "Travel within the region as needed to maintain and expand key relationships.",
    ],
    qualifications: [
      "7–10+ years serving LATAM private clients with a proven AUM/NNM track record.",
      "Deep understanding of cross-border considerations for LATAM clients banking in the US and abroad.",
      "Strong product knowledge across multi-asset advisory/DPM, alternatives, and credit.",
      "Fluent English with strong Spanish (Portuguese a plus); excellent communication and negotiation skills.",
    ],
    compliance: [
      "Operate within US regulatory requirements and internal cross-border frameworks.",
      "Exemplary KYC/AML, Source of Wealth/Funds and suitability standards; documentation excellence.",
    ],
    offer: [
      "Highly competitive US package with performance-linked variable; upside for quality, recurring revenues.",
      "Access to a robust product shelf, private markets and specialized lending.",
      "Entrepreneurial culture with senior support for strategic hires.",
    ],
    apply_note:
      "Apply confidentially with CV and a brief plan (current AUM, 12-month NNM, early portability view).",
    seniority: "Director / Executive Director / MD",
    confidential: true,
    active: true,
    createdAt: "2025-10-09",
  },
};

/* ---------------- Exports ---------------- */
export const jobsList: Job[] = Object.values(jobsBySlug);

/**
 * getJobBySlug
 * - Tries exact raw key
 * - Tries normalized key
 * - Fuzzy-falls back on title/location if needed
 */
export function getJobBySlug(slug: string): Job | null {
  if (!slug) return null;

  // 1) exact
  const exact = jobsBySlug[slug];
  if (exact) return exact;

  // 2) normalized exact
  const wanted = norm(slug);
  const byNormKey = Object.values(jobsBySlug).find((j) => norm(j.slug) === wanted);
  if (byNormKey) return byNormKey;

  // 3) fuzzy (startsWith / includes on normalized fields)
  const fuzzy =
    Object.values(jobsBySlug).find((j) => norm(j.slug).startsWith(wanted)) ||
    Object.values(jobsBySlug).find((j) => wanted.startsWith(norm(j.slug))) ||
    Object.values(jobsBySlug).find((j) => norm(j.title).includes(wanted)) ||
    Object.values(jobsBySlug).find((j) =>
      (norm(j.title) + "-" + norm(j.location) + "-" + norm(j.market)).includes(wanted)
    );

  return fuzzy ?? null;
}