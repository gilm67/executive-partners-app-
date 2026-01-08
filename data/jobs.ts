// data/jobs.ts
export type Job = {
  slug: string;
  title: string;
  market: string;
  location: string;
  experience_min?: number;
  languages?: string[];
  summary: string; // short blurb for cards
  overview: string[]; // long spec sections for the details page
  responsibilities: string[];
  qualifications: string[];
  offer: string[];
  compliance?: string[];
  apply_note?: string;

  // Optional (used by details page / SEO but not mandatory)
  seniority?: string;
  confidential?: boolean;
  active?: boolean;
  createdAt?: string; // ISO date
  body?: string; // if you want to supply a full markdown body
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

/**
 * Standardized EP intro sentence (adapted per region/location).
 * Inserted as the FIRST line of overview[] for every job ad.
 */
function introSentence(market: string, location: string) {
  return `Executive Partners is partnering with a leading global private bank to recruit a Senior Relationship Manager for the ${market} region, based in ${location}. This strategic role will manage and grow a portfolio of high-net-worth and ultra-high-net-worth clients, delivering bespoke wealth solutions rooted in strong fiduciary trust and international expertise.`;
}

function withIntro(market: string, location: string, bullets: string[]) {
  return [introSentence(market, location), ...bullets];
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
      "Build and develop MEA HNW/UHNW relationships from Dubai with access to Swiss booking and a disciplined cross-border framework.",
    overview: withIntro("Middle East & Africa (MEA)", "Dubai, UAE", [
      "Build and develop a portfolio of MEA private clients, acting as primary trusted advisor.",
      "Deliver holistic solutions across advisory/discretionary mandates, credit, structured investments and wealth planning.",
      "Partner with product and investment teams and relevant booking centres to ensure seamless delivery.",
    ]),
    responsibilities: [
      "Originate sustainable net new money and deepen wallet share through targeted coverage and introducer channels.",
      "Provide disciplined advisory across investments, FX, structured solutions and bespoke lending where appropriate.",
      "Maintain robust pipeline management, suitability discipline and ongoing client documentation standards.",
    ],
    qualifications: [
      "7–10+ years’ track record serving MEA HNW/UHNW clients with demonstrable NNM and AUM growth.",
      "Established introducer network across GCC/KSA/MEA (families, entrepreneurs, family offices and professional intermediaries).",
      "Strong advisory, credit and investment product knowledge; Islamic-finance awareness is a plus.",
      "Fluent English required; Arabic desirable.",
    ],
    compliance: [
      "Operate within applicable UAE and group cross-border frameworks; no compromise on governance standards.",
      "Maintain FINMA-grade KYC/AML, source of wealth/source of funds, suitability and lifecycle documentation.",
    ],
    offer: [
      "High-quality platform with specialist coverage and product depth.",
      "Competitive fixed and variable compensation aligned with quality of revenue and plan delivery.",
    ],
    apply_note:
      "Confidentially share your CV and a brief plan (current AUM, 12-month NNM, pipeline).",
    seniority: "Director / Executive Director",
    confidential: true,
    active: true,
    createdAt: "2026-01-08",
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
      "Build and develop Brazilian HNW/UHNW relationships from Switzerland, delivering compliant cross-border wealth and credit solutions.",
    overview: withIntro("Brazil (LatAm)", "Zurich or Geneva, Switzerland", [
      "Build and develop a portfolio of Brazilian private clients, acting as principal advisor in a Swiss booking environment.",
      "Deliver holistic wealth management solutions across investments, credit, structured products and planning.",
      "Work closely with internal specialists to ensure consistent, high-governance execution.",
    ]),
    responsibilities: [
      "Drive sustainable asset growth through disciplined acquisition and deepening of existing relationships.",
      "Originate tailored solutions in collaboration with investment advisory, lending and structuring teams.",
      "Maintain robust client documentation and ongoing due diligence aligned with Swiss governance expectations.",
    ],
    qualifications: [
      "7–10+ years’ private banking experience with Brazilian clients and demonstrated portfolio growth.",
      "Strong network with entrepreneurs, families and family offices; credibility in the Brazilian wealth ecosystem.",
      "Strong breadth in investment and structured solutions.",
      "English required; Portuguese highly advantageous.",
    ],
    compliance: [
      "Operate within Swiss cross-border policies and Brazil-related constraints; documentation quality is critical.",
      "Consistently apply KYC/AML, suitability and lifecycle controls.",
    ],
    offer: [
      "Swiss private banking platform with strong product and specialist support.",
      "Competitive compensation aligned to revenue quality and sustainable growth.",
    ],
    apply_note:
      "Apply confidentially with CV and a brief plan (current AUM, 12-month NNM, pipeline).",
    seniority: "Director / Executive Director",
    confidential: true,
    active: true,
    createdAt: "2026-01-08",
  },

  // 3) Portugal — Geneva / Zurich
  "senior-relationship-manager-portugal-geneva": {
    slug: "senior-relationship-manager-portugal-geneva",
    title: "Senior Relationship Manager — Portugal Market",
    market: "Portugal (LatAm/Europe)",
    location: "Geneva / Zurich, Switzerland",
    experience_min: 7,
    languages: ["Portuguese", "English", "French (plus)"],
    summary:
      "Build and develop Portuguese HNW/UHNW relationships from Switzerland with disciplined advisory delivery and strong governance.",
    overview: withIntro("Portugal (LatAm/Europe)", "Geneva / Zurich, Switzerland", [
      "Build and develop a portfolio of Portuguese private clients booking in Switzerland.",
      "Deliver holistic advice across discretionary/advisory mandates, credit and wealth planning solutions.",
      "Partner with internal specialists to deliver tailored outcomes in a controlled risk framework.",
    ]),
    responsibilities: [
      "Originate sustainable NNM via targeted outreach and professional networks.",
      "Increase mandate penetration and deepen wallet share with disciplined advisory coverage.",
      "Maintain high standards of KYC/AML, suitability and ongoing documentation.",
    ],
    qualifications: [
      "7–10+ years’ experience with Portuguese clients; strong track record of portfolio growth.",
      "Well-established network within the Portuguese wealth ecosystem.",
      "Deep understanding of investment products, structured solutions and cross-border planning.",
      "English required; Portuguese strongly preferred; French an advantage.",
    ],
    compliance: [
      "Operate within Swiss cross-border policies; ensure consistent governance and documentation quality.",
      "Maintain FINMA-grade KYC/AML and lifecycle controls.",
    ],
    offer: [
      "Geneva/Zurich platform with robust product depth and specialist support.",
      "Competitive compensation aligned to sustainable growth and execution quality.",
    ],
    apply_note:
      "Apply confidentially with CV and a brief plan (current AUM, 12-month NNM, pipeline).",
    seniority: "Director / Executive Director",
    confidential: true,
    active: true,
    createdAt: "2026-01-08",
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
      "Build and develop Swiss-domiciled HNW/UHNW relationships in Zurich with disciplined advisory, credit and governance standards.",
    overview: withIntro("Switzerland (Onshore)", "Zurich, Switzerland", [
      "Build and develop an onshore Swiss portfolio in Zurich/Deutschschweiz.",
      "Advise entrepreneurs, executives and multi-generational families across investments and credit solutions.",
      "Deliver solutions within a strict Swiss regulatory and internal governance framework.",
    ]),
    responsibilities: [
      "Drive sustainable NNM and asset growth through disciplined acquisition and relationship deepening.",
      "Increase penetration of discretionary/advisory mandates, lending and planning solutions.",
      "Maintain exemplary documentation standards across onboarding and ongoing review cycles.",
    ],
    qualifications: [
      "7–10+ years’ Swiss onshore RM experience with a verifiable local network in Zurich/Deutschschweiz.",
      "Strong advisory capability across investments and credit; client-centric long-term approach.",
      "German and English typically expected for Zurich onshore coverage.",
    ],
    compliance: [
      "Operate under LSFin/FinSA-aligned policies and internal risk frameworks; no exceptions on documentation quality.",
      "Maintain KYC/AML, suitability and ongoing monitoring to FINMA-grade standards.",
    ],
    offer: [
      "Strong local platform with specialist support and disciplined governance.",
      "Competitive Zurich compensation aligned to sustainable growth and plan delivery.",
    ],
    apply_note:
      "Apply confidentially with CV and a brief plan (current AUM, 12-month NNM, pipeline).",
    seniority: "Director / Executive Director",
    confidential: true,
    active: true,
    createdAt: "2026-01-08",
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
      "Build and develop Swiss-domiciled HNW/UHNW relationships in Romandie with disciplined advisory delivery and strong governance.",
    overview: withIntro("Switzerland (Onshore)", "Lausanne, Switzerland", [
      "Build and develop an onshore Swiss portfolio in Lausanne/Romandie.",
      "Deliver holistic advisory across investments, credit and planning solutions for private clients.",
      "Partner with internal specialists to ensure high-quality execution and client outcomes.",
    ]),
    responsibilities: [
      "Drive sustainable NNM and deepen wallet share through disciplined relationship management.",
      "Promote discretionary/advisory mandates and credit solutions aligned with client objectives.",
      "Maintain high standards of documentation, suitability and ongoing due diligence.",
    ],
    qualifications: [
      "7–10+ years’ Swiss onshore RM experience with a strong Romandie network.",
      "Strong advisory capability and professional judgment in complex client situations.",
      "French required; English strong.",
    ],
    compliance: [
      "Operate under LSFin/FinSA-aligned policies with rigorous documentation and governance standards.",
      "Maintain FINMA-grade KYC/AML and lifecycle controls.",
    ],
    offer: [
      "Romandie platform with strong product depth and specialist support.",
      "Competitive compensation aligned to sustainable growth and execution quality.",
    ],
    apply_note:
      "Apply confidentially with CV and a brief plan (current AUM, 12-month NNM, pipeline).",
    seniority: "Director / Executive Director",
    confidential: true,
    active: true,
    createdAt: "2026-01-08",
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
      "Build and develop MEA HNW/UHNW relationships from Zurich with disciplined cross-border governance and strong product access.",
    overview: withIntro("Middle East & Africa (MEA)", "Zurich, Switzerland", [
      "Build and develop a portfolio of MEA private clients from a Swiss booking centre.",
      "Deliver holistic solutions across investments, credit, structured products and wealth planning.",
      "Work closely with product and investment teams to ensure compliant delivery.",
    ]),
    responsibilities: [
      "Originate sustainable NNM and deepen wallet share through targeted coverage and introducer channels.",
      "Provide disciplined advisory across discretionary/advisory mandates and credit solutions.",
      "Maintain strong documentation and lifecycle controls aligned to Swiss governance standards.",
    ],
    qualifications: [
      "7–10+ years’ private banking experience with MEA clients and demonstrated acquisition capability.",
      "Established network across GCC/MEA families and professional intermediaries.",
      "English required; Arabic desirable.",
    ],
    compliance: [
      "Operate within Swiss cross-border policies and internal risk frameworks; documentation quality is critical.",
      "Maintain FINMA-grade KYC/AML, suitability and lifecycle controls.",
    ],
    offer: [
      "Swiss platform with strong product access and specialist coverage.",
      "Competitive compensation aligned to revenue quality and plan delivery.",
    ],
    apply_note:
      "Apply confidentially with CV and a brief plan (current AUM, 12-month NNM, pipeline).",
    seniority: "Director / Executive Director",
    confidential: true,
    active: true,
    createdAt: "2026-01-08",
  },

  // 7) LATAM — New York
  "senior-relationship-manager-latam-new-york": {
    slug: "senior-relationship-manager-latam-new-york",
    title: "Senior Relationship Manager — LATAM (New York)",
    market: "Latin America (LatAm)",
    location: "New York, USA",
    experience_min: 7,
    languages: ["English", "Spanish (strong)", "Portuguese (plus)"],
    summary:
      "Build and develop Latin American HNW/UHNW relationships from New York with disciplined cross-border advisory and governance.",
    overview: withIntro("Latin America (LatAm)", "New York, USA", [
      "Build and develop a portfolio of Latin American private clients from a New York hub.",
      "Deliver holistic wealth advice across investments, credit, FX and planning solutions.",
      "Coordinate with global product teams to deliver solutions within appropriate governance standards.",
    ]),
    responsibilities: [
      "Drive sustainable asset growth through disciplined acquisition and relationship deepening.",
      "Originate tailored solutions across advisory/discretionary, lending and structured investments.",
      "Maintain robust onboarding and ongoing due diligence aligned to relevant regulatory frameworks.",
    ],
    qualifications: [
      "7–10+ years’ private banking experience with LATAM clients and demonstrated acquisition track record.",
      "Strong network with families, entrepreneurs and intermediaries across Latin America.",
      "English required; Spanish preferred; Portuguese a plus.",
    ],
    compliance: [
      "Operate within applicable US and cross-border policies; ensure strong documentation and controls.",
      "Maintain high standards of KYC/AML, suitability and lifecycle monitoring.",
    ],
    offer: [
      "New York platform with international product access and specialist coverage.",
      "Competitive compensation aligned to sustainable growth and execution quality.",
    ],
    apply_note:
      "Apply confidentially with CV and a brief plan (current AUM, 12-month NNM, pipeline).",
    seniority: "Director / Executive Director / MD",
    confidential: true,
    active: true,
    createdAt: "2026-01-08",
  },

  // 8) Nordics — Zurich
  "senior-relationship-manager-nordics-zurich": {
    slug: "senior-relationship-manager-nordics-zurich",
    title: "Senior Relationship Manager — Nordics",
    market: "Nordics (SE/NO/DK/FI/IS)",
    location: "Zurich, Switzerland",
    experience_min: 7,
    languages: ["English", "Swedish/Norwegian/Danish/Finnish (plus)"],
    summary:
      "Build and develop Nordic HNW/UHNW relationships from Zurich with disciplined advisory delivery and Swiss governance standards.",
    overview: withIntro("Nordics (SE/NO/DK/FI/IS)", "Zurich, Switzerland", [
      "Build and develop a portfolio of Nordic private clients booking in Switzerland.",
      "Deliver holistic advice across investments, credit solutions and planning needs.",
      "Partner with internal specialists to deliver tailored outcomes within a controlled risk framework.",
    ]),
    responsibilities: [
      "Drive sustainable NNM through targeted outreach and professional networks.",
      "Increase mandate penetration and deepen wallet share through disciplined advisory coverage.",
      "Maintain exemplary documentation and ongoing due diligence standards.",
    ],
    qualifications: [
      "7–10+ years’ private banking experience with Nordic clients and a proven acquisition track record.",
      "Strong network with Nordic entrepreneurs, executives and intermediaries.",
      "English required; Nordic language(s) advantageous.",
    ],
    compliance: [
      "Operate within Swiss cross-border and internal governance frameworks; documentation quality is critical.",
      "Maintain FINMA-grade KYC/AML, suitability and lifecycle controls.",
    ],
    offer: [
      "Swiss platform with strong product access and specialist support.",
      "Competitive compensation aligned to sustainable growth and plan delivery.",
    ],
    apply_note:
      "Apply confidentially with CV and a brief plan (current AUM, 12-month NNM, pipeline).",
    seniority: "Director / Executive Director",
    confidential: true,
    active: true,
    createdAt: "2026-01-08",
  },

  // 9) US Onshore — Miami
  "senior-relationship-manager-us-miami": {
    slug: "senior-relationship-manager-us-miami",
    title: "Senior Relationship Manager — US Onshore (Miami)",
    market: "United States (Onshore)",
    location: "Miami, USA",
    experience_min: 7,
    languages: ["English", "Spanish (plus)"],
    summary:
      "Build and develop US onshore HNW/UHNW relationships from Miami with disciplined advisory delivery and governance standards.",
    overview: withIntro("United States (Onshore)", "Miami, USA", [
      "Build and develop a portfolio of US onshore private clients from Miami.",
      "Deliver holistic advice across investments, credit and planning solutions.",
      "Partner with internal specialists to deliver tailored outcomes for complex client needs.",
    ]),
    responsibilities: [
      "Drive sustainable client acquisition and deepen existing relationships.",
      "Originate advisory and lending solutions aligned with client objectives and risk appetite.",
      "Maintain strong documentation, suitability discipline and ongoing monitoring.",
    ],
    qualifications: [
      "7–10+ years’ US onshore private banking experience with demonstrated acquisition capability.",
      "Strong network in South Florida/US private wealth ecosystem.",
      "English required; Spanish advantageous.",
    ],
    compliance: [
      "Operate within applicable US regulatory and internal governance frameworks; no compromise on documentation quality.",
      "Maintain KYC/AML, suitability and lifecycle monitoring standards.",
    ],
    offer: [
      "Miami platform with strong product access and specialist coverage.",
      "Competitive compensation aligned to sustainable growth and execution quality.",
    ],
    apply_note:
      "Apply confidentially with CV and a brief plan (current AUM, 12-month NNM, pipeline).",
    seniority: "Director / Executive Director / MD",
    confidential: true,
    active: true,
    createdAt: "2026-01-08",
  },

  // 10) LATAM — Miami
  "senior-relationship-manager-latam-miami": {
    slug: "senior-relationship-manager-latam-miami",
    title: "Senior Relationship Manager — LATAM (Miami)",
    market: "Latin America (LatAm)",
    location: "Miami, USA",
    experience_min: 7,
    languages: ["Spanish", "English", "Portuguese (plus)"],
    summary:
      "Build and develop Latin American HNW/UHNW relationships from Miami with disciplined cross-border advisory and strong governance.",
    overview: withIntro("Latin America (LatAm)", "Miami, USA", [
      "Build and develop a portfolio of Latin American private clients from Miami.",
      "Deliver holistic advice across investments, credit, FX and planning solutions.",
      "Coordinate with product teams to deliver solutions within appropriate governance standards.",
    ]),
    responsibilities: [
      "Drive sustainable NNM through targeted coverage, introducer networks and diaspora channels.",
      "Increase mandate penetration and deepen wallet share through disciplined advisory delivery.",
      "Maintain robust onboarding, suitability discipline and ongoing due diligence.",
    ],
    qualifications: [
      "7–10+ years’ private banking experience with LATAM clients and demonstrated acquisition track record.",
      "Strong network across key LATAM corridors; proven ability to convert and retain relationships.",
      "English required; Spanish preferred; Portuguese a plus.",
    ],
    compliance: [
      "Operate within applicable US and cross-border frameworks; documentation quality is critical.",
      "Maintain high standards of KYC/AML, suitability and lifecycle monitoring.",
    ],
    offer: [
      "Miami platform with international product access and specialist coverage.",
      "Competitive compensation aligned to sustainable growth and execution quality.",
    ],
    apply_note:
      "Apply confidentially with CV and a brief plan (current AUM, 12-month NNM, pipeline).",
    seniority: "Director / Executive Director / MD",
    confidential: true,
    active: true,
    createdAt: "2026-01-08",
  },

  // 11) Turkey — Dubai
  "senior-relationship-manager-turkey-dubai": {
    slug: "senior-relationship-manager-turkey-dubai",
    title: "Senior Relationship Manager — Turkey",
    market: "Turkey",
    location: "Dubai, UAE",
    experience_min: 7,
    languages: ["Turkish", "English", "Arabic (plus)"],
    summary:
      "Build and develop Turkish HNW/UHNW relationships from Dubai with disciplined cross-border advisory and robust governance standards.",
    overview: withIntro("Turkey", "Dubai, UAE", [
      "Build and develop a portfolio of Turkish private clients from Dubai, acting as primary trusted advisor.",
      "Deliver holistic solutions across investments, discretionary/advisory mandates, credit and wealth structuring.",
      "Partner with product and investment teams and relevant booking centres to ensure seamless delivery within a controlled risk framework.",
    ]),
    responsibilities: [
      "Originate sustainable NNM through targeted coverage, client referrals and introducer networks (entrepreneurs, family offices, intermediaries).",
      "Increase mandate penetration and deepen wallet share through disciplined advisory delivery and solution-led coverage.",
      "Maintain robust onboarding, suitability discipline and ongoing due diligence; ensure consistently high documentation standards.",
    ],
    qualifications: [
      "7–10+ years’ private banking experience with Turkish HNW/UHNW clients and a demonstrated acquisition track record.",
      "Strong network across Turkey/UAE corridors; proven ability to convert and retain relationships.",
      "Turkish and English required; Arabic desirable.",
      "Solid product fluency across multi-asset advisory/DPM, structured solutions and bespoke lending.",
    ],
    compliance: [
      "Operate within applicable UAE and group cross-border frameworks; no compromise on governance standards.",
      "Maintain FINMA-grade KYC/AML, source of wealth/source of funds, suitability and lifecycle documentation.",
    ],
    offer: [
      "High-quality Dubai platform with specialist coverage and product depth.",
      "Competitive compensation aligned to sustainable growth and execution quality.",
    ],
    apply_note:
      "Apply confidentially with CV and a brief plan (current AUM, 12-month NNM, pipeline).",
    seniority: "Director / Executive Director",
    confidential: true,
    active: true,
    createdAt: "2026-01-08",
  },

  // 12) CH Onshore — Geneva
  "senior-relationship-manager-ch-onshore-geneva": {
    slug: "senior-relationship-manager-ch-onshore-geneva",
    title: "Senior Relationship Manager — CH Onshore",
    market: "Switzerland (Onshore)",
    location: "Geneva, Switzerland",
    experience_min: 7,
    languages: ["French", "English"],
    summary:
      "Build and develop Swiss-domiciled HNW/UHNW relationships in Geneva with disciplined advisory, credit and governance standards.",
    overview: withIntro("Switzerland (Onshore)", "Geneva, Switzerland", [
      "Build and develop an onshore Swiss portfolio in Geneva and the broader Arc Lémanique.",
      "Advise entrepreneurs, executives and multi-generational families across investments, credit and planning solutions.",
      "Partner with internal specialists to deliver tailored outcomes within a strict Swiss regulatory and internal governance framework.",
    ]),
    responsibilities: [
      "Drive sustainable NNM and asset growth through disciplined acquisition and relationship deepening.",
      "Increase penetration of discretionary/advisory mandates and lending solutions aligned with client objectives.",
      "Maintain exemplary documentation standards across onboarding, suitability and ongoing review cycles.",
    ],
    qualifications: [
      "7–10+ years’ Swiss onshore RM experience with a verifiable local network in Geneva/Romandie.",
      "Strong advisory capability across investments and credit; client-centric long-term approach.",
      "French required; English strong (additional languages an advantage).",
    ],
    compliance: [
      "Operate under LSFin/FinSA-aligned policies and internal risk frameworks; no exceptions on documentation quality.",
      "Maintain FINMA-grade KYC/AML, suitability and lifecycle monitoring standards.",
    ],
    offer: [
      "Top-tier Geneva platform with strong specialist support and product depth.",
      "Competitive compensation aligned to sustainable growth and plan delivery.",
    ],
    apply_note:
      "Apply confidentially with CV and a brief plan (current AUM, 12-month NNM, pipeline).",
    seniority: "Director / Executive Director",
    confidential: true,
    active: true,
    createdAt: "2026-01-08",
  },

  // 13) Portugal — Lisbon
  "senior-relationship-manager-portugal-lisbon": {
    slug: "senior-relationship-manager-portugal-lisbon",
    title: "Senior Relationship Manager — Portugal Market",
    market: "Portugal",
    location: "Lisbon, Portugal",
    experience_min: 7,
    languages: ["Portuguese", "English", "Spanish (plus)"],
    summary:
      "Build and develop Portuguese HNW/UHNW relationships from Lisbon with disciplined advisory delivery and robust governance standards.",
    overview: withIntro("Portugal", "Lisbon, Portugal", [
      "Build and develop a portfolio of Portuguese private clients from Lisbon, acting as primary trusted advisor.",
      "Deliver holistic advice across investments, discretionary/advisory mandates, credit solutions, FX and planning coordination.",
      "Partner with investment specialists and product teams to deliver tailored outcomes within a controlled risk framework.",
    ]),
    responsibilities: [
      "Drive sustainable NNM through targeted acquisition, client referrals and professional introducer channels.",
      "Increase mandate penetration and deepen wallet share through disciplined advisory delivery and solution-led coverage.",
      "Maintain robust onboarding, suitability discipline and ongoing due diligence; ensure audit-ready documentation.",
    ],
    qualifications: [
      "7–10+ years’ private banking experience with Portuguese HNW/UHNW clients and a demonstrated acquisition track record.",
      "Strong network across Portugal and key international corridors; proven ability to convert and retain relationships.",
      "Portuguese and English required; Spanish desirable.",
      "Solid product fluency across multi-asset advisory/DPM, structured solutions and bespoke lending.",
    ],
    compliance: [
      "Operate within applicable local frameworks and internal governance standards; documentation quality is critical.",
      "Maintain high standards of KYC/AML, source of wealth/source of funds, suitability and lifecycle monitoring.",
    ],
    offer: [
      "High-quality platform with specialist coverage and strong product depth.",
      "Competitive compensation aligned to sustainable growth and execution quality.",
    ],
    apply_note:
      "Apply confidentially with CV and a brief plan (current AUM, 12-month NNM, pipeline).",
    seniority: "Director / Executive Director",
    confidential: true,
    active: true,
    createdAt: "2026-01-08",
  },

  // 14) Spain — Madrid
  "senior-relationship-manager-spain-madrid": {
    slug: "senior-relationship-manager-spain-madrid",
    title: "Senior Relationship Manager — Spain",
    market: "Spain",
    location: "Madrid, Spain",
    experience_min: 7,
    languages: ["Spanish", "English", "French (plus)"],
    summary:
      "Build and develop Spanish HNW/UHNW relationships from Madrid with disciplined advisory delivery and robust governance standards.",
    overview: withIntro("Spain", "Madrid, Spain", [
      "Build and develop a portfolio of Spanish private clients from Madrid, acting as primary trusted advisor.",
      "Deliver holistic advice across investments, discretionary/advisory mandates, credit solutions, FX and planning coordination.",
      "Partner with product and investment teams to deliver tailored solutions within a controlled risk framework.",
    ]),
    responsibilities: [
      "Drive sustainable NNM through targeted coverage, introducer networks and client referrals.",
      "Increase mandate penetration and deepen wallet share through disciplined advisory delivery and structured credit-led solutions where appropriate.",
      "Maintain robust onboarding, suitability discipline and ongoing due diligence; ensure audit-ready documentation standards.",
    ],
    qualifications: [
      "7–10+ years’ private banking experience with Spanish HNW/UHNW clients and demonstrated acquisition capability.",
      "Strong network across Spain; proven ability to convert prospects and retain relationships.",
      "Spanish and English required; French desirable.",
      "Strong product knowledge across multi-asset advisory/DPM, structured solutions and bespoke lending.",
    ],
    compliance: [
      "Operate within applicable local frameworks and internal governance standards; documentation quality is critical.",
      "Maintain high standards of KYC/AML, source of wealth/source of funds, suitability and lifecycle monitoring.",
    ],
    offer: [
      "High-quality platform with specialist coverage and strong product depth.",
      "Competitive compensation aligned to sustainable growth and execution quality.",
    ],
    apply_note:
      "Apply confidentially with CV and a brief plan (current AUM, 12-month NNM, pipeline).",
    seniority: "Director / Executive Director",
    confidential: true,
    active: true,
    createdAt: "2026-01-08",
  },

  // 15) France — Paris (NEW)
  "senior-relationship-manager-france-paris": {
    slug: "senior-relationship-manager-france-paris",
    title: "Senior Relationship Manager — France",
    market: "France",
    location: "Paris, France",
    experience_min: 7,
    languages: ["French", "English (strong)"],
    summary:
      "Build and develop a French HNW/UHNW client portfolio from Paris, delivering bespoke wealth and credit solutions with strong governance and disciplined advisory.",
    overview: withIntro("France", "Paris, France", [
      "Build and develop a portfolio of French private clients, acting as primary trusted advisor.",
      "Deliver holistic solutions across discretionary/advisory mandates, lending and wealth planning.",
      "Partner with investment and product specialists to deliver tailored outcomes with consistent execution.",
    ]),
    responsibilities: [
      "Originate sustainable net new money and deepen wallet share through targeted coverage and introducer channels.",
      "Provide disciplined advice across investments, portfolio construction, structured solutions and bespoke lending where appropriate.",
      "Maintain robust pipeline management, suitability discipline and high-quality client documentation standards.",
    ],
    qualifications: [
      "7–10+ years’ private banking track record serving French HNW/UHNW clients with demonstrable NNM and AUM growth.",
      "Established network across Paris and key French wealth corridors (entrepreneurs, families, family offices and professional intermediaries).",
      "Strong advisory, credit and investment product knowledge; experience with structured solutions is a plus.",
      "Fluent French required; English strong.",
    ],
    compliance: [
      "Operate within applicable French and group governance frameworks; no compromise on conduct and documentation standards.",
      "Maintain FINMA-grade KYC/AML mindset: source of wealth/source of funds, suitability and lifecycle documentation.",
    ],
    offer: [
      "High-quality platform with specialist coverage and product depth.",
      "Competitive fixed and variable compensation aligned with quality of revenue and plan delivery.",
    ],
    apply_note:
      "Apply confidentially with CV and a brief plan (current AUM, 12-month NNM, pipeline).",
    seniority: "Director / Executive Director",
    confidential: true,
    active: true,
    createdAt: "2026-01-08",
  },

  // 16) Benelux — Geneva (NEW)
  "senior-relationship-manager-benelux-geneva": {
    slug: "senior-relationship-manager-benelux-geneva",
    title: "Senior Relationship Manager — Benelux",
    market: "Benelux (Belgium / Netherlands / Luxembourg)",
    location: "Geneva, Switzerland",
    experience_min: 7,
    languages: ["English", "French (strong)", "Dutch (plus)"],
    summary:
      "Build and develop a Benelux HNW/UHNW client portfolio from Geneva, leveraging a Swiss booking centre and a disciplined cross-border framework.",
    overview: withIntro("Benelux (Belgium / Netherlands / Luxembourg)", "Geneva, Switzerland", [
      "Build and develop a portfolio of Benelux private clients booking in Switzerland, acting as primary trusted advisor.",
      "Deliver holistic solutions across investments, credit, structured products and wealth planning.",
      "Coordinate with internal specialists and relevant booking centres to ensure seamless delivery and governance.",
    ]),
    responsibilities: [
      "Originate sustainable NNM through targeted coverage, introducer channels and professional networks across Benelux.",
      "Increase mandate penetration and deepen wallet share with disciplined advisory and lending solutions.",
      "Maintain exemplary documentation standards across onboarding, suitability and ongoing review cycles.",
    ],
    qualifications: [
      "7–10+ years’ private banking experience covering Benelux HNW/UHNW clients with proven portfolio growth.",
      "Strong network with entrepreneurs, families and professional intermediaries (lawyers, tax advisors, family offices).",
      "Strong advisory and credit competence; structured investment exposure is a plus.",
      "English required; French strong; Dutch an advantage.",
    ],
    compliance: [
      "Operate within Swiss and EU-related cross-border policies; documentation quality is critical.",
      "Maintain FINMA-grade KYC/AML, suitability and lifecycle controls with no exceptions.",
    ],
    offer: [
      "Geneva platform with strong product depth and specialist support.",
      "Competitive compensation aligned to sustainable growth and execution quality.",
    ],
    apply_note:
      "Apply confidentially with CV and a brief plan (current AUM, 12-month NNM, pipeline).",
    seniority: "Director / Executive Director",
    confidential: true,
    active: true,
    createdAt: "2026-01-08",
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