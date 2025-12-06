// lib/markets/data.ts

// ---------- types ----------

export type CompBand = {
  role: string;
  baseMin: number; // in local currency units (annual gross, directional)
  baseMax: number;
  bonusPct: string; // e.g. "40–100%"
  topQuartileNote?: string;
};

export type Stat = { label: string; value: string; hint?: string };

export type Market = {
  slug: string; // url segment, lowercase, kebab
  city: string; // display
  country: string;
  currency: "CHF" | "GBP" | "EUR" | "USD" | "AED" | "HKD" | "SGD";
  locale: string; // for number formatting, e.g. "de-CH"
  heroImage: string; // /markets/geneva.jpg (placed in /public)
  summary: string; // short intro under hero

  compensation: CompBand[];

  licensing: {
    regulator: string;
    mustHaveCerts: string[]; // list of credentials/licenses
    notes?: string;
  };

  clientBase: {
    sourcing: string[]; // bullets (local vs cross-border, languages, etc.)
  };

  relocation: {
    oneParagraph: string; // short paragraph
    officialLinkLabel: string; // link text
    officialLinkUrl: string; // gov/regulator portal
  };

  cta: {
    confidentialCallHref: string; // e.g. "/contact" or Calendly URL
    uploadPlanHref: string; // e.g. "/bp-simulator" or "/candidates/register"
  };

  legalDisclaimer?: string;

  // NEW sections
  hiringPulse: {
    hotRoles: string[];
    hotSkills: string[];
    notes?: string;
  };

  atAGlance: Stat[];

  ecosystem: {
    bookingCentres: string[];
    keyBanks: string[];
    eamsAndFOs: string[];
    regulators: string[];
  };
};

// ---------- helper ----------

// Format a number in the market's locale & currency (no decimals by default)
export const fmt = (value: number, m: Pick<Market, "locale" | "currency">) =>
  new Intl.NumberFormat(m.locale, {
    style: "currency",
    currency: m.currency,
    maximumFractionDigits: 0,
  }).format(value);

// Reusable disclaimer (2025 directional benchmarks)
const DEFAULT_DISCLAIMER =
  "Compensation ranges are directional benchmarks for 2025 private banking roles (mid-senior RM to team lead). Final offers vary by portable book, ROA, lending penetration, alternatives distribution, compliance history, and firm performance. Figures are not an offer and are provided for guidance only.";

// ---------- data ----------
export const MARKETS: Market[] = [
  /* =========================
     Switzerland — Geneva
     ========================= */
  {
    slug: "geneva",
    city: "Geneva",
    country: "Switzerland",
    currency: "CHF",
    locale: "de-CH",
    heroImage: "/markets/geneva.jpg",
    summary:
      "Switzerland’s most international private banking hub, with deep UHNW coverage, cross-border franchises, and a highly developed EAM ecosystem. Regulatory scrutiny, pricing discipline and client sophistication are materially higher than in neighbouring markets.",
    compensation: [
      {
        role: "RM / Senior Advisor",
        baseMin: 150_000,
        baseMax: 200_000,
        bonusPct: "40–80%",
      },
      {
        role: "Senior RM / Director",
        baseMin: 180_000,
        baseMax: 250_000,
        bonusPct: "50–100%",
        topQuartileNote:
          "Top performers with multi-year revenue history and portable UHNW books may exceed 100%.",
      },
      {
        role: "Team Lead / Market Head",
        baseMin: 220_000,
        baseMax: 300_000,
        bonusPct: "60–120%",
      },
    ],
    licensing: {
      regulator: "FINMA (Switzerland)",
      mustHaveCerts: [
        "FATCA/CRS competence",
        "Cross-border rules (EU, UK, MEA, LatAm, Asia as applicable)",
        "Local suitability & appropriateness framework",
      ],
      notes:
        "French is essential for onshore and resident clients; English is required; Arabic, Spanish or Portuguese are differentiators for cross-border books.",
    },
    clientBase: {
      sourcing: [
        "Onshore UHNW/HNW residents, often multi-banked and fee-sensitive",
        "Cross-border MEA, LatAm, Southern Europe and UK channels (high compliance standards)",
        "Strong EAM/FO ecosystem with sophisticated product expectations (Advisory, DPM, Alts, Lombard lending)",
      ],
    },
    relocation: {
      oneParagraph:
        "Geneva provides political stability, strong investor protection and globally recognised platforms. Compliance intensity is high: cross-border frameworks, AML/KYC depth, and suitability checks are materially stricter than in many other hubs. Cost of living is elevated; effective taxation depends by canton.",
      officialLinkLabel: "Swiss authorities (ch.ch)",
      officialLinkUrl: "https://www.ch.ch/",
    },
    cta: { confidentialCallHref: "/contact", uploadPlanHref: "/bp-simulator" },
    legalDisclaimer: DEFAULT_DISCLAIMER,
    hiringPulse: {
      hotRoles: [
        "Senior RM Switzerland Onshore",
        "Team Lead MEA",
        "UHNW Banker with structured solutions exposure",
      ],
      hotSkills: [
        "Lombard lending & credit structuring",
        "Alternatives/Private Markets distribution",
        "Cross-border frameworks (EU/MEA/LatAm)",
      ],
      notes:
        "Hiring remains selective. Business cases must demonstrate verifiable revenue, clear portability assumptions and ROA uplift. Teams hiring for MEA and LatAm are particularly active across Tier-1 banks.",
    },
    atAGlance: [
      { label: "Focus", value: "Onshore + Cross-border" },
      { label: "Languages", value: "FR/EN", hint: "AR/ES/PT advantageous" },
      { label: "Deal Style", value: "Advisory/DPM + Credit" },
      { label: "Ecosystem", value: "High-density EAM/FO network" },
    ],
    ecosystem: {
      bookingCentres: [
        "Geneva (primary Swiss booking centre)",
        "Zurich",
        "Lugano",
        "Luxembourg",
        "Monaco",
      ],
      keyBanks: [
        "UBS",
        "Julius Baer",
        "Pictet",
        "Lombard Odier",
        "Mirabaud",
        "Banque Syz",
        "EFG International",
        "Rothschild & Co",
        "Credit Suisse (integrated into UBS)",
      ],
      eamsAndFOs: [
        "FINMA-licensed independent EAMs covering UHNW/HNW",
        "Multi-family offices with Geneva investment teams",
        "Single-family offices of international UHNW families",
      ],
      regulators: [
        "FINMA (Swiss Financial Market Supervisory Authority)",
        "Swiss Federal Tax Administration (SFTA)",
      ],
    },
  },

  /* =========================
     Switzerland — Zurich
     ========================= */
  {
    slug: "zurich",
    city: "Zurich",
    country: "Switzerland",
    currency: "CHF",
    locale: "de-CH",
    heroImage: "/markets/zurich.jpg",
    summary:
      "The largest Swiss wealth hub, with deep balance sheet, strong product factories, and proximity to German-speaking entrepreneurs and family offices.",
    compensation: [
      {
        role: "RM / Senior Advisor",
        baseMin: 160_000,
        baseMax: 210_000,
        bonusPct: "40–80%",
      },
      {
        role: "Senior RM / Director",
        baseMin: 190_000,
        baseMax: 260_000,
        bonusPct: "50–100%",
      },
      {
        role: "Team Lead / Market Head",
        baseMin: 230_000,
        baseMax: 320_000,
        bonusPct: "60–120%",
      },
    ],
    licensing: {
      regulator: "FINMA (Switzerland)",
      mustHaveCerts: [
        "FATCA/CRS competence",
        "Cross-border rules (EU/UK)",
        "Local suitability & appropriateness framework",
      ],
      notes:
        "German language is strongly preferred for DACH onshore; English is required; Italian/French are useful for cross-border segments.",
    },
    clientBase: {
      sourcing: [
        "Onshore CH/DE/AT entrepreneurs and corporate owners",
        "International UHNW with Swiss booking preference",
        "Significant EAM channel; DPM/Alts/lending penetration are key KPIs",
      ],
    },
    relocation: {
      oneParagraph:
        "Zurich offers scale and breadth of product, plus strong balance-sheet capacity. Expect disciplined sales governance, robust credit processes and intense competition from local and international platforms.",
      officialLinkLabel: "City of Zurich — authorities",
      officialLinkUrl: "https://www.stadt-zuerich.ch/",
    },
    cta: { confidentialCallHref: "/contact", uploadPlanHref: "/bp-simulator" },
    legalDisclaimer: DEFAULT_DISCLAIMER,
    hiringPulse: {
      hotRoles: ["CH Onshore Senior RM", "DACH Market Head"],
      hotSkills: ["DPM penetration", "Credit structuring", "Alts distribution"],
      notes:
        "Strong preference for German-speaking profiles with portable, well-documented books.",
    },
    atAGlance: [
      { label: "Focus", value: "Onshore DACH + Intl" },
      { label: "Languages", value: "DE/EN", hint: "IT/FR a plus" },
      { label: "Deal Style", value: "Advisory + Credit" },
      { label: "EAM", value: "Very active" },
    ],
    ecosystem: {
      bookingCentres: [
        "Zurich (Swiss booking centre)",
        "Geneva",
        "Basel",
        "Lugano",
        "Luxembourg",
      ],
      keyBanks: [
        "UBS",
        "Julius Baer",
        "Credit Suisse legacy (UBS integration)",
        "Zürcher Kantonalbank (ZKB)",
        "Pictet",
        "Lombard Odier",
        "EFG International",
        "Vontobel",
      ],
      eamsAndFOs: [
        "Zurich-based independent asset managers",
        "Global multi-family offices with Swiss hubs",
        "Boutique UHNW advisory firms",
      ],
      regulators: ["FINMA (Swiss Financial Market Supervisory Authority)"],
    },
  },

  /* =========================
     United Kingdom — London
     ========================= */
  {
    slug: "london",
    city: "London",
    country: "United Kingdom",
    currency: "GBP",
    locale: "en-GB",
    heroImage: "/markets/london.jpg",
    summary:
      "Global wealth gateway with multi-jurisdiction platforms and intense competition among international private banks, wealth managers and multi-family offices.",
    compensation: [
      {
        role: "RM / Senior Banker",
        baseMin: 140_000,
        baseMax: 220_000,
        bonusPct: "50–100%",
      },
      {
        role: "Director / Senior RM",
        baseMin: 180_000,
        baseMax: 300_000,
        bonusPct: "60–125%",
        topQuartileNote:
          "High upside possible for top performers, especially post bonus-cap changes.",
      },
      {
        role: "Team Lead / MD",
        baseMin: 220_000,
        baseMax: 350_000,
        bonusPct: "70–150%",
      },
    ],
    licensing: {
      regulator: "FCA (UK)",
      mustHaveCerts: [
        "FCA Certification Regime alignment",
        "MiFID II suitability/appropriateness knowledge",
        "Local KYC/AML standards",
      ],
      notes:
        "Institutional-grade advice models and documented suitability are critical. Deferrals and clawbacks are common at seniority.",
    },
    clientBase: {
      sourcing: [
        "International UHNW/HNW, non-doms, PE/hedge fund and tech founders",
        "Large FO/MFO segment with institutional expectations",
        "Regulated wealth managers/EAMs with UK permissions",
      ],
    },
    relocation: {
      oneParagraph:
        "London offers unparalleled international coverage and access to sophisticated clients. Post-Brexit work rights, visa status and housing costs are key negotiation angles alongside deferral structures.",
      officialLinkLabel: "UK FCA — wealth/retail investments",
      officialLinkUrl: "https://www.fca.org.uk/",
    },
    cta: { confidentialCallHref: "/contact", uploadPlanHref: "/bp-simulator" },
    legalDisclaimer: DEFAULT_DISCLAIMER,
    hiringPulse: {
      hotRoles: ["UHNW Banker", "Team Lead Europe", "Non-Resident RM"],
      hotSkills: ["Cross-border structuring", "Alts access", "Credit expertise"],
      notes:
        "Strong demand for portable non-resident and FO-linked books with documented advice processes.",
    },
    atAGlance: [
      { label: "Focus", value: "International UHNW" },
      { label: "Comp Shape", value: "High variable" },
      { label: "Languages", value: "EN + EU/MEA/Asia" },
      { label: "Deferrals", value: "Common at seniority" },
    ],
    ecosystem: {
      bookingCentres: [
        "London (UK booking centre)",
        "Jersey",
        "Guernsey",
        "Isle of Man",
        "Zurich",
        "Geneva",
      ],
      keyBanks: [
        "UBS",
        "Julius Baer",
        "Coutts",
        "HSBC Global Private Banking",
        "Barclays Private Bank",
        "Rothschild & Co",
        "J.P. Morgan Private Bank",
        "Goldman Sachs Private Wealth Management",
      ],
      eamsAndFOs: [
        "UK-regulated wealth managers",
        "Multi-family offices in Mayfair and the City",
        "Single-family offices of UHNW families",
      ],
      regulators: [
        "FCA (Financial Conduct Authority)",
        "PRA (Prudential Regulation Authority)",
      ],
    },
  },

  /* =========================
     UAE — Dubai
     ========================= */
  {
    slug: "dubai",
    city: "Dubai",
    country: "United Arab Emirates",
    currency: "AED",
    locale: "en-AE",
    heroImage: "/markets/dubai.jpg",
    summary:
      "Tax-advantaged MENA hub with DIFC/ADGM frameworks and expanding platforms targeting GCC, NRI, African and global expat wealth.",
    compensation: [
      {
        role: "RM / Senior Advisor",
        baseMin: 350_000,
        baseMax: 550_000,
        bonusPct: "30–80%",
      },
      {
        role: "Senior RM / Director",
        baseMin: 500_000,
        baseMax: 750_000,
        bonusPct: "40–100%",
        topQuartileNote:
          "Packages at some platforms include housing/schooling allowances and relocation support.",
      },
      {
        role: "Team Lead / Market Head",
        baseMin: 700_000,
        baseMax: 1_000_000,
        bonusPct: "50–120%",
      },
    ],
    licensing: {
      regulator: "DFSA (DIFC) / FSRA (ADGM) / UAE SCA",
      mustHaveCerts: [
        "Local approvals (DFSA/FSRA as applicable)",
        "Cross-border MEA/India model understanding",
        "Sharia product familiarity where relevant",
      ],
      notes:
        "Tax-free salary; schooling/housing packages are material. Relationship culture is intense; compliance around legacy CIS/Russia flows is strict.",
    },
    clientBase: {
      sourcing: [
        "GCC/UAE onshore and resident UHNW/HNW",
        "NRI and South Asia entrepreneurs and families",
        "African and global expats using UAE as a regional base",
      ],
    },
    relocation: {
      oneParagraph:
        "Dubai offers rapid client-acquisition potential with regional mobility and a tax-free salary environment. Schooling, housing and DIFC/ADGM licensing timelines are central in relocation negotiations.",
      officialLinkLabel: "DIFC — regulations",
      officialLinkUrl:
        "https://www.difc.ae/business/operating/regulatory-framework/",
    },
    cta: { confidentialCallHref: "/contact", uploadPlanHref: "/bp-simulator" },
    legalDisclaimer: DEFAULT_DISCLAIMER,
    hiringPulse: {
      hotRoles: ["Senior RM GCC", "Team Lead South Asia", "NRI Banker"],
      hotSkills: ["Sharia awareness", "Cross-border MEA/India", "Credit + Lombard"],
      notes:
        "Demand strongest for bankers with portable GCC/NRI books and clean, well-documented KYC histories.",
    },
    atAGlance: [
      { label: "Tax", value: "Salary tax-free" },
      { label: "Focus", value: "GCC + NRI + Expats" },
      { label: "Languages", value: "EN + AR/HI/UR" },
      { label: "Time-to-Live", value: "Fast onboarding" },
    ],
    ecosystem: {
      bookingCentres: [
        "Dubai (DIFC)",
        "Abu Dhabi (ADGM)",
        "Geneva",
        "Zurich",
        "Singapore",
        "Luxembourg",
      ],
      keyBanks: [
        "Julius Baer",
        "UBS",
        "Credit Suisse legacy (UBS integration)",
        "Pictet",
        "Lombard Odier",
        "EFG",
        "Emirates NBD Private Banking",
        "HSBC Global Private Banking",
        "Standard Chartered Private Bank",
      ],
      eamsAndFOs: [
        "DIFC-based multi-family offices",
        "ADGM-based wealth managers",
        "Single-family offices of GCC families",
      ],
      regulators: [
        "DFSA (Dubai Financial Services Authority)",
        "FSRA (Financial Services Regulatory Authority, ADGM)",
        "Securities and Commodities Authority (UAE SCA)",
      ],
    },
  },

  /* =========================
     Singapore
     ========================= */
  {
    slug: "singapore",
    city: "Singapore",
    country: "Singapore",
    currency: "SGD",
    locale: "en-SG",
    heroImage: "/markets/singapore.jpg",
    summary:
      "Stable APAC hub with favourable tax, robust MAS governance and significant regional booking-centre activity for ASEAN and North Asia wealth.",
    compensation: [
      {
        role: "RM / Associate Director",
        baseMin: 180_000,
        baseMax: 240_000,
        bonusPct: "40–80%",
      },
      {
        role: "Director / Senior RM",
        baseMin: 220_000,
        baseMax: 320_000,
        bonusPct: "50–100%",
      },
      {
        role: "Team Lead / Market Head",
        baseMin: 280_000,
        baseMax: 380_000,
        bonusPct: "60–120%",
      },
    ],
    licensing: {
      regulator: "MAS (Singapore)",
      mustHaveCerts: [
        "MAS fit & proper criteria",
        "Relevant CMFAS modules",
        "Cross-border APAC rules awareness",
      ],
      notes:
        "Mandarin, Malay or Indonesian are highly valued. Deferrals are common at senior levels; suitability and product-governance files must be robust.",
    },
    clientBase: {
      sourcing: [
        "SEA/ASEAN onshore and regional cross-border clients",
        "Entrepreneurs, tech founders and family business owners",
        "High adoption of DPM, Alts and Lombard lending",
      ],
    },
    relocation: {
      oneParagraph:
        "Singapore offers efficient licensing, safety, competitive tax and a family-friendly environment. Housing and schooling are major cost items and should be factored into total-comp discussions.",
      officialLinkLabel: "MAS — regulations",
      officialLinkUrl: "https://www.mas.gov.sg/",
    },
    cta: { confidentialCallHref: "/contact", uploadPlanHref: "/bp-simulator" },
    legalDisclaimer: DEFAULT_DISCLAIMER,
    hiringPulse: {
      hotRoles: ["RM SE Asia", "North Asia RM (SG booking)", "Credit-led RM"],
      hotSkills: [
        "Mandarin/Indonesian",
        "Alts distribution",
        "Credit structuring",
      ],
      notes:
        "Language skills and cross-border expertise are decisive; competition for top profiles is intense.",
    },
    atAGlance: [
      { label: "Tax", value: "Favourable" },
      { label: "Focus", value: "SEA + North Asia" },
      { label: "Languages", value: "EN + ZH/ID/MS" },
      { label: "Ecosystem", value: "Regional booking centre" },
    ],
    ecosystem: {
      bookingCentres: [
        "Singapore",
        "Hong Kong",
        "Zurich",
        "Geneva",
        "Offshore centres used by Asian clients",
      ],
      keyBanks: [
        "UBS",
        "Credit Suisse legacy (UBS integration)",
        "Julius Baer",
        "Pictet",
        "Lombard Odier",
        "Bank of Singapore",
        "DBS Private Bank",
        "UOB Private Bank",
        "HSBC Global Private Banking",
        "Standard Chartered Private Bank",
      ],
      eamsAndFOs: [
        "MAS-licensed external asset managers",
        "Multi-family offices serving ASEAN and North Asia",
        "Single-family offices under Singapore FO/VCC regimes",
      ],
      regulators: ["MAS (Monetary Authority of Singapore)"],
    },
  },

  /* =========================
     Hong Kong
     ========================= */
  {
    slug: "hong-kong",
    city: "Hong Kong",
    country: "Hong Kong SAR",
    currency: "HKD",
    locale: "en-HK",
    heroImage: "/markets/hong-kong.jpg",
    summary:
      "APAC powerhouse with access to Mainland China flows; strong SFC oversight and competitive compensation at senior levels for North Asia-focused bankers.",
    compensation: [
      {
        role: "RM / Senior Advisor",
        baseMin: 1_200_000,
        baseMax: 1_800_000,
        bonusPct: "40–80%",
      },
      {
        role: "Senior RM / Director",
        baseMin: 1_500_000,
        baseMax: 2_500_000,
        bonusPct: "50–110%",
      },
      {
        role: "Team Lead / Market Head",
        baseMin: 2_000_000,
        baseMax: 3_500_000,
        bonusPct: "60–130%",
      },
    ],
    licensing: {
      regulator: "SFC (Hong Kong)",
      mustHaveCerts: [
        "Relevant SFC licences (e.g. Type 1 & 4)",
        "Cross-border Mainland China rules",
        "Enhanced due diligence for PEP/AML",
      ],
      notes:
        "Cantonese/Mandarin are highly valued; deferrals and clawbacks are standard for senior roles.",
    },
    clientBase: {
      sourcing: [
        "Mainland China and regional UHNW/HNW",
        "Family offices, next-gen and tech wealth",
        "High adoption of Alts and structured products",
      ],
    },
    relocation: {
      oneParagraph:
        "Hong Kong offers high total-comp potential and proximity to Mainland clients. Housing costs, schooling and licensing timelines must be factored into the overall package.",
      officialLinkLabel: "SFC — licensing",
      officialLinkUrl: "https://www.sfc.hk/en/",
    },
    cta: { confidentialCallHref: "/contact", uploadPlanHref: "/bp-simulator" },
    legalDisclaimer: DEFAULT_DISCLAIMER,
    hiringPulse: {
      hotRoles: ["North Asia RM", "China offshore RM", "UHNW Team Lead"],
      hotSkills: ["Cantonese/Mandarin", "Structured products/Alts", "CN cross-border"],
      notes:
        "Language plus Mainland China client access are decisive differentiators.",
    },
    atAGlance: [
      { label: "Focus", value: "Mainland CN + Regional" },
      { label: "Languages", value: "ZH/EN" },
      { label: "Comp", value: "High variable" },
      { label: "Booking", value: "HK / SG" },
    ],
    ecosystem: {
      bookingCentres: [
        "Hong Kong",
        "Singapore",
        "Zurich",
        "Geneva",
        "Offshore centres used by North Asia clients",
      ],
      keyBanks: [
        "UBS",
        "Credit Suisse legacy (UBS integration)",
        "Julius Baer",
        "HSBC Global Private Banking",
        "Standard Chartered Private Bank",
        "J.P. Morgan Private Bank",
        "Goldman Sachs Private Wealth Management",
      ],
      eamsAndFOs: [
        "SFC-licensed external asset managers",
        "Hong Kong-based multi-family offices",
      ],
      regulators: [
        "SFC (Securities and Futures Commission)",
        "HKMA (Hong Kong Monetary Authority)",
      ],
    },
  },

  /* =========================
     United States — New York
     ========================= */
  {
    slug: "new-york",
    city: "New York",
    country: "United States",
    currency: "USD",
    locale: "en-US",
    heroImage: "/markets/new-york.jpg",
    summary:
      "Premier US wealth centre with fierce competition among wirehouses, global private banks and ultra-lean multi-family offices.",
    compensation: [
      {
        role: "RM / Private Banker",
        baseMin: 180_000,
        baseMax: 250_000,
        bonusPct: "40–90%",
      },
      {
        role: "Senior RM / Director",
        baseMin: 220_000,
        baseMax: 350_000,
        bonusPct: "50–125%",
      },
      {
        role: "Team Lead / Market Head",
        baseMin: 280_000,
        baseMax: 450_000,
        bonusPct: "60–150%",
      },
    ],
    licensing: {
      regulator: "SEC/FINRA (United States)",
      mustHaveCerts: [
        "Series 7",
        "Series 66 (or 63 + 65)",
        "Insurance licences for certain products",
      ],
      notes:
        "Reg BI, robust AML/KYC and household-level suitability are central. Some boutiques use revenue-share/1099 frameworks.",
    },
    clientBase: {
      sourcing: [
        "US-taxable entrepreneurs, PE/hedge fund principals and C-suite executives",
        "Cross-border LatAm/EU/Asia inflows into US structures",
        "High sophistication: Alts, private credit, complex lending and structured solutions",
      ],
    },
    relocation: {
      oneParagraph:
        "NYC packages often combine meaningful variable compensation with deferrals. State/city tax, housing and schooling should be evaluated in net terms, not just base/bonus headline figures.",
      officialLinkLabel: "FINRA — qualifications",
      officialLinkUrl:
        "https://www.finra.org/registration-exams-ce/qualifications",
    },
    cta: { confidentialCallHref: "/contact", uploadPlanHref: "/bp-simulator" },
    legalDisclaimer: DEFAULT_DISCLAIMER,
    hiringPulse: {
      hotRoles: ["UHNW Banker", "Team Lead LatAm", "Credit-led PB"],
      hotSkills: ["Private credit", "Secondaries/Alts", "Complex lending"],
      notes:
        "Books with fee yield, Alts penetration and credit usage command premium terms.",
    },
    atAGlance: [
      { label: "Focus", value: "Onshore UHNW" },
      { label: "Deal Style", value: "Alts + Credit + IB" },
      { label: "Languages", value: "EN", hint: "ES/PT a plus" },
      { label: "Comp Shape", value: "High variable + deferrals" },
    ],
    ecosystem: {
      bookingCentres: [
        "New York",
        "Miami",
        "Delaware trusts",
        "Zurich",
        "Geneva",
      ],
      keyBanks: [
        "J.P. Morgan Private Bank",
        "Morgan Stanley Private Wealth Management",
        "Goldman Sachs Private Wealth Management",
        "Citi Private Bank",
        "UBS Private Wealth Management",
        "Credit Suisse legacy (UBS integration)",
        "Northern Trust",
      ],
      eamsAndFOs: [
        "US-registered RIAs focused on UHNW",
        "New York-based multi-family offices",
      ],
      regulators: ["SEC (Securities and Exchange Commission)", "FINRA"],
    },
  },

  /* =========================
     United States — Miami
     ========================= */
  {
    slug: "miami",
    city: "Miami",
    country: "United States",
    currency: "USD",
    locale: "en-US",
    heroImage: "/markets/miami.jpg",
    summary:
      "US offshore gateway for LatAm wealth with a growing local UHNW base and strong presence of international private banks and MFOs.",
    compensation: [
      {
        role: "RM / Private Banker",
        baseMin: 140_000,
        baseMax: 200_000,
        bonusPct: "30–80%",
      },
      {
        role: "Senior RM / Director",
        baseMin: 170_000,
        baseMax: 260_000,
        bonusPct: "40–110%",
      },
      {
        role: "Team Lead / Market Head",
        baseMin: 220_000,
        baseMax: 350_000,
        bonusPct: "50–130%",
      },
    ],
    licensing: {
      regulator: "SEC/FINRA (United States) + Florida insurance where applicable",
      mustHaveCerts: [
        "Series 7",
        "Series 66 (or 63 + 65)",
        "AML/cross-border training",
      ],
      notes:
        "Spanish and often Portuguese are highly valued. Suitability must reconcile US and LatAm frameworks.",
    },
    clientBase: {
      sourcing: [
        "LatAm UHNW/HNW, regional families and expats",
        "Cross-border booking with CH/BS/NY hubs",
        "Demand for credit, Lombard and structured solutions is high",
      ],
    },
    relocation: {
      oneParagraph:
        "Florida’s personal tax environment is favourable versus many US states. Competition from wirehouses, internationals and MFOs is intense; bilingual capability and a clean, portable LatAm book are key differentiators.",
      officialLinkLabel: "SEC — investment adviser info",
      officialLinkUrl: "https://www.sec.gov/",
    },
    cta: { confidentialCallHref: "/contact", uploadPlanHref: "/bp-simulator" },
    legalDisclaimer: DEFAULT_DISCLAIMER,
    hiringPulse: {
      hotRoles: ["LatAm RM", "Offshore Private Banker", "UHNW Team Lead"],
      hotSkills: ["Spanish/Portuguese", "Cross-border AML", "Credit"],
      notes:
        "Bilingual + portable LatAm books are among the most sought-after profiles in Miami.",
    },
    atAGlance: [
      { label: "Focus", value: "US offshore + LatAm" },
      { label: "Languages", value: "EN/ES", hint: "PT a plus" },
      { label: "Comp", value: "Bonus-driven" },
      { label: "Migration", value: "Strong inflows" },
    ],
    ecosystem: {
      bookingCentres: [
        "Miami",
        "New York",
        "Delaware trusts",
        "Bahamas",
        "Zurich",
        "Geneva",
      ],
      keyBanks: [
        "J.P. Morgan Private Bank",
        "Citi Private Bank",
        "UBS International",
        "Credit Suisse legacy (UBS integration)",
        "Santander Private Banking International",
        "BTG Pactual (US/LatAm platform)",
      ],
      eamsAndFOs: [
        "RIAs and broker-dealers focused on LatAm HNW/UHNW",
        "Miami-based multi-family offices",
      ],
      regulators: ["SEC", "FINRA"],
    },
  },

  /* =========================
     France — Paris
     ========================= */
  {
    slug: "paris",
    city: "Paris",
    country: "France",
    currency: "EUR",
    locale: "fr-FR",
    heroImage: "/markets/paris.jpg",
    summary:
      "Onshore EU wealth hub with a strong domestic client base, growing family-office ecosystem and close connectivity to Swiss and Luxembourg booking platforms.",
    compensation: [
      {
        role: "RM / Private Banker",
        baseMin: 70_000,
        baseMax: 110_000,
        bonusPct: "20–50%",
      },
      {
        role: "Senior RM / Director",
        baseMin: 110_000,
        baseMax: 150_000,
        bonusPct: "30–60%",
      },
      {
        role: "Team Lead / Market Head",
        baseMin: 140_000,
        baseMax: 185_000,
        bonusPct: "40–80%",
      },
    ],
    licensing: {
      regulator: "AMF (France)",
      mustHaveCerts: ["AMF certification", "MiFID II", "PRIIPs/KID knowledge"],
      notes:
        "French is essential; understanding wealth tax, civil law and insurance wrappers is key to domestic UHNW/HNW advice.",
    },
    clientBase: {
      sourcing: [
        "Domestic UHNW/HNW, business owners and executives",
        "Cross-border EU coverage via CH/UK/SG platforms",
        "Strong use of life insurance wrappers and structured products",
      ],
    },
    relocation: {
      oneParagraph:
        "Paris roles are primarily onshore, often embedded in universal banks. Compensation trails CH/UK but the domestic client base and FO ecosystem are increasingly sophisticated.",
      officialLinkLabel: "AMF — market participants",
      officialLinkUrl: "https://www.amf-france.org/",
    },
    cta: { confidentialCallHref: "/contact", uploadPlanHref: "/bp-simulator" },
    legalDisclaimer: DEFAULT_DISCLAIMER,
    hiringPulse: {
      hotRoles: ["Onshore PB", "UHNW Advisor", "FO Coverage RM"],
      hotSkills: ["Insurance wrappers", "Structuring", "Alts access"],
      notes:
        "Onshore quality, FO connectivity and tax-aware planning are the main differentiators.",
    },
    atAGlance: [
      { label: "Focus", value: "Onshore EU" },
      { label: "Languages", value: "FR/EN" },
      { label: "Comp", value: "Moderate variable" },
      { label: "FO Growth", value: "Rising" },
    ],
    ecosystem: {
      bookingCentres: ["Paris", "Luxembourg", "Zurich", "Geneva"],
      keyBanks: [
        "BNP Paribas Banque Privée",
        "Société Générale Private Banking",
        "Crédit Agricole Indosuez Wealth Management",
        "Rothschild & Co",
        "UBS",
        "Julius Baer (coverage)",
      ],
      eamsAndFOs: [
        "Growing Paris-based multi-family offices",
        "Boutique EAMs focusing on French UHNW",
      ],
      regulators: [
        "AMF (Autorité des marchés financiers)",
        "ACPR (Autorité de contrôle prudentiel et de résolution)",
      ],
    },
  },

  /* =========================
     Italy — Milan
     ========================= */
  {
    slug: "milan",
    city: "Milan",
    country: "Italy",
    currency: "EUR",
    locale: "it-IT",
    heroImage: "/markets/milan.jpg",
    summary:
      "Northern Italy wealth centre serving entrepreneurs and family-business owners, with growing interest in Alts and cross-border solutions.",
    compensation: [
      {
        role: "RM / Private Banker",
        baseMin: 60_000,
        baseMax: 100_000,
        bonusPct: "20–50%",
      },
      {
        role: "Senior RM / Director",
        baseMin: 100_000,
        baseMax: 140_000,
        bonusPct: "30–60%",
      },
      {
        role: "Team Lead / Market Head",
        baseMin: 130_000,
        baseMax: 160_000,
        bonusPct: "40–80%",
      },
    ],
    licensing: {
      regulator: "Banca d’Italia / CONSOB",
      mustHaveCerts: ["MiFID II", "Local suitability rules", "AML/CTF"],
      notes:
        "Italian is required. Italy’s flat-tax regime has made UHNW relocation more attractive and connects Milan directly to Swiss and Luxembourg structures.",
    },
    clientBase: {
      sourcing: [
        "Domestic entrepreneurs and industrial families",
        "Cross-border CH/LU wrappers and booking centres",
        "Insurance and structured solutions gaining share in allocations",
      ],
    },
    relocation: {
      oneParagraph:
        "Milan offers depth in onshore wealth and is within easy reach of Swiss platforms. Packages are generally below CH/UK but improving for senior UHNW-focused roles.",
      officialLinkLabel: "CONSOB — regulations",
      officialLinkUrl: "https://www.consob.it/",
    },
    cta: { confidentialCallHref: "/contact", uploadPlanHref: "/bp-simulator" },
    legalDisclaimer: DEFAULT_DISCLAIMER,
    hiringPulse: {
      hotRoles: ["Onshore PB", "UHNW RM", "Team Lead North"],
      hotSkills: ["Insurance wrappers", "Alts", "Succession planning"],
      notes:
        "Entrepreneur/family business relationships and tax-aware planning are key.",
    },
    atAGlance: [
      { label: "Focus", value: "Onshore Italy" },
      { label: "Tax", value: "Flat-tax relocations" },
      { label: "Comp", value: "Below CH/UK" },
      { label: "Cross-border", value: "CH/LU wrappers" },
    ],
    ecosystem: {
      bookingCentres: ["Milan", "Luxembourg", "Zurich", "Geneva"],
      keyBanks: [
        "Intesa Sanpaolo Private Banking",
        "UniCredit Private Banking",
        "Banca Generali",
        "UBS",
        "Credit Suisse legacy (UBS integration)",
      ],
      eamsAndFOs: [
        "Italian multi-family offices",
        "Private offices for industrial families",
      ],
      regulators: ["Banca d’Italia", "CONSOB"],
    },
  },

  /* =========================
     Portugal — Lisbon
     ========================= */
  {
    slug: "lisbon",
    city: "Lisbon",
    country: "Portugal",
    currency: "EUR",
    locale: "pt-PT",
    heroImage: "/markets/lisbon.jpg",
    summary:
      "Emerging EU wealth node with a growing expat base; roles often blend affluent/HNW private banking with wealth planning and FO-style services.",
    compensation: [
      {
        role: "RM / Private Banker",
        baseMin: 40_000,
        baseMax: 70_000,
        bonusPct: "15–40%",
      },
      {
        role: "Senior RM / Director",
        baseMin: 60_000,
        baseMax: 90_000,
        bonusPct: "20–50%",
      },
      {
        role: "Team Lead / Market Head",
        baseMin: 80_000,
        baseMax: 120_000,
        bonusPct: "25–60%",
      },
    ],
    licensing: {
      regulator: "CMVM (Portugal)",
      mustHaveCerts: ["MiFID II", "Local suitability rules", "AML/CTF"],
      notes:
        "Portuguese is required; English is important for expats. Changes to the NHR regime have reduced the pure tax arbitrage story but inflows continue on lifestyle and EU residency grounds.",
    },
    clientBase: {
      sourcing: [
        "Expat HNW/retirees and tech migrants",
        "Domestic entrepreneurs and real-estate-driven wealth",
        "Cross-border wrappers via LU/IE/CH platforms",
      ],
    },
    relocation: {
      oneParagraph:
        "Lisbon combines lifestyle advantages with lower compensation versus core EU and Swiss hubs. Roles may mix private banking, affluent advisory and FO-style coordination with tax/legal partners.",
      officialLinkLabel: "CMVM — supervision",
      officialLinkUrl: "https://www.cmvm.pt/",
    },
    cta: { confidentialCallHref: "/contact", uploadPlanHref: "/bp-simulator" },
    legalDisclaimer: DEFAULT_DISCLAIMER,
    hiringPulse: {
      hotRoles: ["Affluent-to-HNW RM", "FO Services RM"],
      hotSkills: ["Insurance wrappers", "Real-estate wealth", "Cross-border basics"],
      notes:
        "Smaller PB market; language, local networks and lifestyle fit are key selling points.",
    },
    atAGlance: [
      { label: "Focus", value: "Onshore + Expats" },
      { label: "Comp", value: "Below core EU hubs" },
      { label: "Languages", value: "PT/EN" },
      { label: "Cross-border", value: "LU/IE/CH wrappers" },
    ],
    ecosystem: {
      bookingCentres: ["Lisbon", "Luxembourg", "Zurich", "Geneva"],
      keyBanks: [
        "Caixa Geral de Depósitos (CGD) private banking",
        "Millennium BCP",
        "Novo Banco",
        "Santander Private Banking",
        "International private banks (select coverage)",
      ],
      eamsAndFOs: [
        "Boutique family offices",
        "Local wealth managers focused on HNW/upper affluent",
      ],
      regulators: [
        "CMVM (Comissão do Mercado de Valores Mobiliários)",
        "Banco de Portugal",
      ],
    },
  },
];

// ---------- utilities ----------

export const MARKET_SLUGS = MARKETS.map((m) => m.slug);

export const getMarket = (slug: string): Market | undefined =>
  MARKETS.find((m) => m.slug === slug);

export const getAllMarkets = (): Market[] => MARKETS;

// Simple currency label if needed outside Intl API (not used by fmt)
export const CURRENCY_SYMBOL: Record<Market["currency"], string> = {
  CHF: "CHF",
  GBP: "£",
  EUR: "€",
  USD: "$",
  AED: "AED",
  HKD: "HK$",
  SGD: "S$",
};