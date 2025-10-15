// lib/markets/data.ts

export type CompBand = {
  role: string;
  baseMin: number;   // in local currency units
  baseMax: number;
  bonusPct: string;  // e.g. "40–100%"
  topQuartileNote?: string;
};

export type Stat = { label: string; value: string; hint?: string };

export type Market = {
  slug: string;                // url segment, lowercase, kebab
  city: string;                // display
  country: string;
  currency: "CHF" | "GBP" | "EUR" | "USD" | "AED" | "HKD" | "SGD";
  locale: string;              // for number formatting, e.g. "de-CH"
  heroImage: string;           // /markets/geneva.jpg (place into /public)
  summary: string;             // short intro under hero
  compensation: CompBand[];
  licensing: {
    regulator: string;
    mustHaveCerts: string[];   // list of credentials/licenses
    notes?: string;
  };
  clientBase: {
    sourcing: string[];        // bullets (local vs cross-border, languages, etc.)
  };
  relocation: {
    oneParagraph: string;      // short paragraph
    officialLinkLabel: string; // link text
    officialLinkUrl: string;   // gov/regulator portal
  };
  cta: {
    confidentialCallHref: string;    // e.g. "/contact" or Calendly URL
    uploadPlanHref: string;          // e.g. "/bp-simulator" or "/candidates/register"
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

// Reusable disclaimer
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
      "Swiss private banking hub with international cross-border coverage, strong EAM ecosystem, and high standards for discretion and compliance.",
    compensation: [
      { role: "RM / Senior Advisor", baseMin: 150_000, baseMax: 200_000, bonusPct: "40–80%" },
      { role: "Senior RM / Director", baseMin: 180_000, baseMax: 250_000, bonusPct: "50–100%", topQuartileNote: "Top performers with portable books may exceed 100%." },
      { role: "Team Lead / Market Head", baseMin: 220_000, baseMax: 300_000, bonusPct: "60–120%" },
    ],
    licensing: {
      regulator: "FINMA (Switzerland)",
      mustHaveCerts: ["FATCA/CRS competence", "Cross-border rules (EU/US)", "Local suitability/appropriateness"],
      notes: "French highly valued; German or Italian advantageous depending on client base.",
    },
    clientBase: {
      sourcing: [
        "Strong onshore UHNW/HNW plus cross-border (EU/MEA/LatAm/Asia)",
        "Languages: French + English; Arabic/Spanish/Portuguese a plus",
        "EAM/FO coverage and platform breadth (Advisory, DPM, Alts, Lending)",
      ],
    },
    relocation: {
      oneParagraph:
        "Switzerland offers political stability and top-tier platforms. Expect rigorous KYC/AML and cross-border controls. Cost of living is high; tax depends by canton.",
      officialLinkLabel: "Swiss authorities (ch.ch)",
      officialLinkUrl: "https://www.ch.ch/",
    },
    cta: { confidentialCallHref: "/contact", uploadPlanHref: "/bp-simulator" },
    legalDisclaimer: DEFAULT_DISCLAIMER,
    hiringPulse: {
      hotRoles: ["Senior RM CH Onshore", "Team Lead MEA", "UHNW Banker"],
      hotSkills: ["Lombard lending", "Alternatives distribution", "Cross-border CH–EU/MEA"],
      notes: "Selective hiring; portable books & ROA uplift drive offers.",
    },
    atAGlance: [
      { label: "Focus", value: "Onshore + Cross-border" },
      { label: "Languages", value: "FR/EN", hint: "AR/ES/PT helpful" },
      { label: "Deal Style", value: "Advisory/DPM + Credit" },
      { label: "Pipelines", value: "Dense EAM/FO network" },
    ],
    ecosystem: {
      bookingCentres: ["Geneva", "Zurich", "Luxembourg", "Monaco"],
      keyBanks: ["UBS", "Julius Baer", "Pictet", "Lombard Odier", "Vontobel", "EFG", "UBP"],
      eamsAndFOs: ["Robust EAM channel", "Single/Multi-FO growth"],
      regulators: ["FINMA", "FDF", "OECD CRS"],
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
      "Largest Swiss wealth hub with deep institutional platforms, product depth, and proximity to German-speaking client bases.",
    compensation: [
      { role: "RM / Senior Advisor", baseMin: 160_000, baseMax: 210_000, bonusPct: "40–80%" },
      { role: "Senior RM / Director", baseMin: 190_000, baseMax: 260_000, bonusPct: "50–100%" },
      { role: "Team Lead / Market Head", baseMin: 230_000, baseMax: 320_000, bonusPct: "60–120%" },
    ],
    licensing: {
      regulator: "FINMA (Switzerland)",
      mustHaveCerts: ["FATCA/CRS competence", "Cross-border rules (EU/US)", "Local suitability/appropriateness"],
      notes: "German language strongly preferred; English required; Italian/French useful.",
    },
    clientBase: {
      sourcing: [
        "Onshore CH-DE-AT and international UHNW",
        "EAM channel significant; DPM/Alts/lending penetration key",
        "Corporate owners, entrepreneurs, next-gen wealth",
      ],
    },
    relocation: {
      oneParagraph:
        "Zurich offers scale and breadth of product. Expect disciplined sales governance, robust lending frameworks, and strong EAM competition.",
      officialLinkLabel: "City of Zurich — authorities",
      officialLinkUrl: "https://www.stadt-zuerich.ch/",
    },
    cta: { confidentialCallHref: "/contact", uploadPlanHref: "/bp-simulator" },
    legalDisclaimer: DEFAULT_DISCLAIMER,
    hiringPulse: {
      hotRoles: ["CH Onshore Senior RM", "DACH Market Head"],
      hotSkills: ["DPM penetration", "Credit structuring", "Alts distribution"],
      notes: "Preference for German-speaking profiles with portable books.",
    },
    atAGlance: [
      { label: "Focus", value: "Onshore DACH + Intl" },
      { label: "Languages", value: "DE/EN", hint: "IT/FR plus" },
      { label: "Deal Style", value: "Advisory + Credit" },
      { label: "EAM", value: "Very active" },
    ],
    ecosystem: {
      bookingCentres: ["Zurich", "Geneva", "Luxembourg"],
      keyBanks: ["UBS", "Julius Baer", "Credit Suisse legacy", "Vontobel", "EFG"],
      eamsAndFOs: ["Large EAM density", "Sophisticated FO market"],
      regulators: ["FINMA"],
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
      "Global wealth gateway with multi-jurisdiction platforms and intense competition among international private banks and MFOs.",
    compensation: [
      { role: "RM / Senior Banker", baseMin: 140_000, baseMax: 220_000, bonusPct: "50–100%" },
      { role: "Director / Senior RM", baseMin: 180_000, baseMax: 300_000, bonusPct: "60–125%", topQuartileNote: "High upside post bonus-cap removal at top performers." },
      { role: "Team Lead / MD", baseMin: 220_000, baseMax: 350_000, bonusPct: "70–150%" },
    ],
    licensing: {
      regulator: "FCA (UK)",
      mustHaveCerts: ["FCA Certification Regime", "MiFID II knowledge", "Local suitability/KYC"],
      notes: "Brand halo matters; deferred comp and clawbacks common at seniority.",
    },
    clientBase: {
      sourcing: [
        "International UHNW/HNW, NEDs, PE/Tech founders",
        "Languages: English plus EU/MEA/Asia languages advantageous",
        "Family offices and EAM/MFO collaboration strong",
      ],
    },
    relocation: {
      oneParagraph:
        "London offers unparalleled international coverage. Consider visa/work rights post-Brexit and housing costs when negotiating packages.",
      officialLinkLabel: "UK FCA — wealth/retail investments",
      officialLinkUrl: "https://www.fca.org.uk/",
    },
    cta: { confidentialCallHref: "/contact", uploadPlanHref: "/bp-simulator" },
    legalDisclaimer: DEFAULT_DISCLAIMER,
    hiringPulse: {
      hotRoles: ["UHNW Banker", "Team Lead Europe", "Non-Resident RM"],
      hotSkills: ["Cross-border structuring", "Alts access", "Credit expertise"],
      notes: "Strong demand for portable non-resident books.",
    },
    atAGlance: [
      { label: "Focus", value: "Intl UHNW" },
      { label: "Comp Shape", value: "High variable" },
      { label: "Languages", value: "EN + EU/MEA/Asia" },
      { label: "Deferrals", value: "Common at seniority" },
    ],
    ecosystem: {
      bookingCentres: ["London", "Jersey", "Guernsey", "Luxembourg"],
      keyBanks: ["Barclays", "UBS", "Citi PB", "JPM PB", "HSBC GPB", "Rothschild & Co"],
      eamsAndFOs: ["Large FO/MFO presence", "Active EAM links"],
      regulators: ["FCA", "PRA"],
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
      "Tax-advantaged MENA hub with DIFC/ADGM frameworks and expanding platforms targeting GCC, India, Africa, and CIS flows.",
    compensation: [
      { role: "RM / Senior Advisor", baseMin: 350_000, baseMax: 550_000, bonusPct: "30–80%" },
      { role: "Senior RM / Director", baseMin: 500_000, baseMax: 750_000, bonusPct: "40–100%", topQuartileNote: "Many packages include housing/schooling allowances." },
      { role: "Team Lead / Market Head", baseMin: 700_000, baseMax: 1_000_000, bonusPct: "50–120%" },
    ],
    licensing: {
      regulator: "DFSA (DIFC) / FSRA (ADGM) / UAE SCA",
      mustHaveCerts: ["Local approvals (DFSA/FSRA)", "Cross-border MEA knowledge", "Sharia product familiarity (where relevant)"],
      notes: "Tax-free salary; relocation allowances common. Client entertainment and relationship culture paramount.",
    },
    clientBase: {
      sourcing: [
        "GCC/UAE onshore + expat UHNW/HNW",
        "South Asia/Africa entrepreneurs; Russia/CIS legacy flows (compliance sensitive)",
        "Languages: English + Arabic/Hindi/Urdu/Russian a plus",
      ],
    },
    relocation: {
      oneParagraph:
        "Dubai offers rapid client acquisition potential with regional mobility. Consider schooling, housing, and DIFC/ADGM licensing timelines.",
      officialLinkLabel: "DIFC — regulations",
      officialLinkUrl: "https://www.difc.ae/business/operating/regulatory-framework/",
    },
    cta: { confidentialCallHref: "/contact", uploadPlanHref: "/bp-simulator" },
    legalDisclaimer: DEFAULT_DISCLAIMER,
    hiringPulse: {
      hotRoles: ["Senior RM GCC", "Team Lead South Asia", "NRI Banker"],
      hotSkills: ["Sharia awareness", "Cross-border MEA/India", "Credit + Lombard"],
      notes: "Packages often include housing/schooling allowances.",
    },
    atAGlance: [
      { label: "Tax", value: "Salary tax-free" },
      { label: "Focus", value: "GCC + NRI + Expats" },
      { label: "Languages", value: "EN + AR/HI/UR" },
      { label: "Time-to-Live", value: "Fast onboarding" },
    ],
    ecosystem: {
      bookingCentres: ["DIFC", "ADGM", "SG", "CH"],
      keyBanks: ["Emirates NBD PB", "HSBC GPB", "Barclays", "UBS", "Julius Baer"],
      eamsAndFOs: ["Growing FO ecosystem", "Boutique EAMs"],
      regulators: ["DFSA", "FSRA", "SCA"],
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
      "Stable APAC hub with favorable taxes, strong MAS governance, and significant regional booking-centre activity.",
    compensation: [
      { role: "RM / Associate Director", baseMin: 180_000, baseMax: 240_000, bonusPct: "40–80%" },
      { role: "Director / Senior RM", baseMin: 220_000, baseMax: 320_000, bonusPct: "50–100%" },
      { role: "Team Lead / Market Head", baseMin: 280_000, baseMax: 380_000, bonusPct: "60–120%" },
    ],
    licensing: {
      regulator: "MAS (Singapore)",
      mustHaveCerts: ["MAS fit & proper", "CMFAS modules (as applicable)", "Cross-border APAC rules"],
      notes: "Mandarin/Malay/Indonesian languages valued; deferrals common at senior levels.",
    },
    clientBase: {
      sourcing: [
        "SEA/ASEAN onshore plus regional cross-border",
        "Entrepreneurs, tech founders, family business owners",
        "High digital adoption and product breadth (DPM/Alts/Lombard lending)",
      ],
    },
    relocation: {
      oneParagraph:
        "Singapore offers efficient licensing, safety, and competitive tax. Housing and schooling are key negotiation points.",
      officialLinkLabel: "MAS — regulations",
      officialLinkUrl: "https://www.mas.gov.sg/",
    },
    cta: { confidentialCallHref: "/contact", uploadPlanHref: "/bp-simulator" },
    legalDisclaimer: DEFAULT_DISCLAIMER,
    hiringPulse: {
      hotRoles: ["RM SE Asia", "North Asia RM (SG booking)", "Credit-led RM"],
      hotSkills: ["Mandarin/Indonesian", "Alts distribution", "Credit structuring"],
      notes: "Competition high; language & cross-border skills prized.",
    },
    atAGlance: [
      { label: "Tax", value: "Favorable" },
      { label: "Focus", value: "SEA + North Asia" },
      { label: "Languages", value: "EN + ZH/ID/MS" },
      { label: "Ecosystem", value: "Booking centre" },
    ],
    ecosystem: {
      bookingCentres: ["Singapore", "HK", "CH"],
      keyBanks: ["DBS PB", "UOB PB", "OCBC PB", "Citi PB", "UBS", "Julius Baer"],
      eamsAndFOs: ["Rapid FO growth", "Regional EAM expansion"],
      regulators: ["MAS"],
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
      "APAC powerhouse with access to Mainland China flows; strong SFC oversight and competitive compensation at senior levels.",
    compensation: [
      { role: "RM / Senior Advisor", baseMin: 1_200_000, baseMax: 1_800_000, bonusPct: "40–80%" },
      { role: "Senior RM / Director", baseMin: 1_500_000, baseMax: 2_500_000, bonusPct: "50–110%" },
      { role: "Team Lead / Market Head", baseMin: 2_000_000, baseMax: 3_500_000, bonusPct: "60–130%" },
    ],
    licensing: {
      regulator: "SFC (Hong Kong)",
      mustHaveCerts: ["SFC Type 1 & 4 (as applicable)", "Cross-border CN rules", "Enhanced due diligence for PEP/AML"],
      notes: "Cantonese/Mandarin highly valued; deferrals and clawbacks common in senior roles.",
    },
    clientBase: {
      sourcing: [
        "Mainland China and regional UHNW/HNW",
        "Family offices, next-gen, tech wealth",
        "Alts and structured products penetration key",
      ],
    },
    relocation: {
      oneParagraph:
        "HK offers high total comp potential and proximity to Mainland clients. Consider housing costs and licensing timelines.",
      officialLinkLabel: "SFC — licensing",
      officialLinkUrl: "https://www.sfc.hk/en/",
    },
    cta: { confidentialCallHref: "/contact", uploadPlanHref: "/bp-simulator" },
    legalDisclaimer: DEFAULT_DISCLAIMER,
    hiringPulse: {
      hotRoles: ["North Asia RM", "China offshore RM", "UHNW Team Lead"],
      hotSkills: ["Cantonese/Mandarin", "Structure/Alts", "CN cross-border"],
      notes: "Language + CN client access are decisive.",
    },
    atAGlance: [
      { label: "Focus", value: "CN + Regional" },
      { label: "Languages", value: "ZH/EN" },
      { label: "Comp", value: "High variable" },
      { label: "Booking", value: "HK / SG" },
    ],
    ecosystem: {
      bookingCentres: ["Hong Kong", "Singapore"],
      keyBanks: ["HSBC GPB", "Citi PB", "UBS", "Julius Baer", "BOC", "ICBC"],
      eamsAndFOs: ["FO growth, CN-linked"],
      regulators: ["SFC", "HKMA"],
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
      "Premier US wealth centre with fierce competition among wirehouses, PBs, and ultra-lean multi-family offices.",
    compensation: [
      { role: "RM / Private Banker", baseMin: 180_000, baseMax: 250_000, bonusPct: "40–90%" },
      { role: "Senior RM / Director", baseMin: 220_000, baseMax: 350_000, bonusPct: "50–125%" },
      { role: "Team Lead / Market Head", baseMin: 280_000, baseMax: 450_000, bonusPct: "60–150%" },
    ],
    licensing: {
      regulator: "SEC/FINRA (United States)",
      mustHaveCerts: ["Series 7", "Series 66 (or 63+65)", "Insurance licenses for certain products"],
      notes: "Reg BI, robust AML/KYC; some boutiques use revenue-share/1099 frameworks.",
    },
    clientBase: {
      sourcing: [
        "Entrepreneurs, PE/hedge fund principals, C-suite",
        "Cross-border LatAm/EU/Asia inflows",
        "High sophistication: Alts, credit solutions, structured lending",
      ],
    },
    relocation: {
      oneParagraph:
        "NYC packages often include meaningful variable and deferrals. Consider state/city taxes and cost of living in total comp.",
      officialLinkLabel: "FINRA — qualifications",
      officialLinkUrl: "https://www.finra.org/registration-exams-ce/qualifications",
    },
    cta: { confidentialCallHref: "/contact", uploadPlanHref: "/bp-simulator" },
    legalDisclaimer: DEFAULT_DISCLAIMER,
    hiringPulse: {
      hotRoles: ["UHNW Banker", "Team Lead LatAm", "Credit-led PB"],
      hotSkills: ["Private credit", "Secondaries/Alts", "Complex lending"],
      notes: "Books with fee yield & credit penetration command premiums.",
    },
    atAGlance: [
      { label: "Focus", value: "Onshore UHNW" },
      { label: "Deal Style", value: "Alts + Credit + IB" },
      { label: "Languages", value: "EN", hint: "ES/PT a plus" },
      { label: "Comp Shape", value: "High variable + deferrals" },
    ],
    ecosystem: {
      bookingCentres: ["NYC", "Delaware trusts", "Miami (LatAm)"],
      keyBanks: ["JPM PB", "Goldman PWM", "Citi PB", "Barclays", "UBS"],
      eamsAndFOs: ["Large MFO presence", "Boutique RIAs"],
      regulators: ["SEC", "FINRA", "NYDFS"],
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
      "US offshore gateway for LatAm wealth with growing UHNW presence and international PB franchises.",
    compensation: [
      { role: "RM / Private Banker", baseMin: 140_000, baseMax: 200_000, bonusPct: "30–80%" },
      { role: "Senior RM / Director", baseMin: 170_000, baseMax: 260_000, bonusPct: "40–110%" },
      { role: "Team Lead / Market Head", baseMin: 220_000, baseMax: 350_000, bonusPct: "50–130%" },
    ],
    licensing: {
      regulator: "SEC/FINRA (United States) + FL insurance if applicable",
      mustHaveCerts: ["Series 7", "Series 66 (or 63+65)", "AML for cross-border"],
      notes: "Spanish/Portuguese highly valued; suitability across US/LatAm frameworks.",
    },
    clientBase: {
      sourcing: [
        "LatAm UHNW/HNW, expats, global families",
        "Cross-border booking with CH/BS/NY hubs",
        "Credit, Lombard, and structured solutions in demand",
      ],
    },
    relocation: {
      oneParagraph:
        "Florida’s tax environment is favorable. Competition from wirehouses, internationals, and MFOs is intense; bilingual capability is a differentiator.",
      officialLinkLabel: "SEC — investment adviser info",
      officialLinkUrl: "https://www.sec.gov/",
    },
    cta: { confidentialCallHref: "/contact", uploadPlanHref: "/bp-simulator" },
    legalDisclaimer: DEFAULT_DISCLAIMER,
    hiringPulse: {
      hotRoles: ["LatAm RM", "Offshore Private Banker", "UHNW Team Lead"],
      hotSkills: ["Spanish/Portuguese", "Cross-border AML", "Credit"],
      notes: "Bilingual + portable LatAm books are highly prized.",
    },
    atAGlance: [
      { label: "Focus", value: "US offshore + LatAm" },
      { label: "Languages", value: "EN/ES", hint: "PT a plus" },
      { label: "Comp", value: "Bonus-driven" },
      { label: "Migration", value: "Strong inflows" },
    ],
    ecosystem: {
      bookingCentres: ["Miami", "NYC", "Delaware trusts", "Bahamas"],
      keyBanks: ["JPM PB", "Citi PB", "UBS", "BTG Pactual", "Itaú PB"],
      eamsAndFOs: ["Boutique MFOs", "Cross-border EAMs"],
      regulators: ["SEC", "FINRA", "Florida OIR (insurance)"],
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
      "Onshore EU wealth hub with strong domestic client base and rising family-office ecosystem.",
    compensation: [
      { role: "RM / Private Banker", baseMin: 70_000, baseMax: 110_000, bonusPct: "20–50%" },
      { role: "Senior RM / Director", baseMin: 110_000, baseMax: 150_000, bonusPct: "30–60%" },
      { role: "Team Lead / Market Head", baseMin: 140_000, baseMax: 185_000, bonusPct: "40–80%" },
    ],
    licensing: {
      regulator: "AMF (France)",
      mustHaveCerts: ["AMF certification", "MiFID II", "PRIIPs/KID knowledge"],
      notes: "French language essential; wealth tax and civil law considerations matter to clients.",
    },
    clientBase: {
      sourcing: [
        "Domestic UHNW/HNW, business owners, executives",
        "Cross-border EU coverage via CH/UK/SG platforms",
        "Insurance wrappers and structured products demand",
      ],
    },
    relocation: {
      oneParagraph:
        "Paris roles are more onshore-oriented. Compensation trails CH/UK but stability and domestic client quality are strong.",
      officialLinkLabel: "AMF — market participants",
      officialLinkUrl: "https://www.amf-france.org/",
    },
    cta: { confidentialCallHref: "/contact", uploadPlanHref: "/bp-simulator" },
    legalDisclaimer: DEFAULT_DISCLAIMER,
    hiringPulse: {
      hotRoles: ["Onshore PB", "UHNW Advisor", "FO Coverage RM"],
      hotSkills: ["Insurance wrappers", "Structuring", "Alts access"],
      notes: "Onshore quality + FO connectivity valued.",
    },
    atAGlance: [
      { label: "Focus", value: "Onshore EU" },
      { label: "Languages", value: "FR/EN" },
      { label: "Comp", value: "Moderate var." },
      { label: "FO Growth", value: "Rising" },
    ],
    ecosystem: {
      bookingCentres: ["Paris", "Luxembourg", "CH"],
      keyBanks: ["BNP PB", "SG PB", "Crédit Agricole Indosuez", "UBS", "Rothschild & Co"],
      eamsAndFOs: ["Growing MFOs", "Boutique EAMs"],
      regulators: ["AMF", "ACPR"],
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
      "Northern Italy wealth centre serving entrepreneur and family-business segments with increasing Alts penetration.",
    compensation: [
      { role: "RM / Private Banker", baseMin: 60_000, baseMax: 100_000, bonusPct: "20–50%" },
      { role: "Senior RM / Director", baseMin: 100_000, baseMax: 140_000, bonusPct: "30–60%" },
      { role: "Team Lead / Market Head", baseMin: 130_000, baseMax: 160_000, bonusPct: "40–80%" },
    ],
    licensing: {
      regulator: "Banca d’Italia / CONSOB",
      mustHaveCerts: ["MiFID II", "Local suitability rules", "AML/CTF"],
      notes: "Italian language required; flat-tax regime can attract UHNW relocations.",
    },
    clientBase: {
      sourcing: [
        "Domestic entrepreneurs and family groups",
        "Cross-border CH/LU wrappers and booking",
        "Insurance/structured solutions gaining share",
      ],
    },
    relocation: {
      oneParagraph:
        "Milan offers depth in onshore wealth and proximity to Swiss platforms. Packages generally below CH/UK but improving.",
      officialLinkLabel: "CONSOB — regulations",
      officialLinkUrl: "https://www.consob.it/",
    },
    cta: { confidentialCallHref: "/contact", uploadPlanHref: "/bp-simulator" },
    legalDisclaimer: DEFAULT_DISCLAIMER,
    hiringPulse: {
      hotRoles: ["Onshore PB", "UHNW RM", "Team Lead North"],
      hotSkills: ["Insurance wrappers", "Alts", "Succession planning"],
      notes: "Entrepreneur/Family business relationships prized.",
    },
    atAGlance: [
      { label: "Focus", value: "Onshore IT" },
      { label: "Tax", value: "Flat-tax relocations" },
      { label: "Comp", value: "Below CH/UK" },
      { label: "Cross-border", value: "CH/LU wrappers" },
    ],
    ecosystem: {
      bookingCentres: ["Milan", "Luxembourg", "Zurich"],
      keyBanks: ["Intesa PB", "UniCredit PB", "Banca Generali", "UBS", "Credit Suisse legacy"],
      eamsAndFOs: ["MFO growth", "Private offices"],
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
      "Emerging EU wealth node with growing expat base; roles skew toward affluent/upper-affluent and FO services.",
    compensation: [
      { role: "RM / Private Banker", baseMin: 40_000, baseMax: 70_000, bonusPct: "15–40%" },
      { role: "Senior RM / Director", baseMin: 60_000, baseMax: 90_000, bonusPct: "20–50%" },
      { role: "Team Lead / Market Head", baseMin: 80_000, baseMax: 120_000, bonusPct: "25–60%" },
    ],
    licensing: {
      regulator: "CMVM (Portugal)",
      mustHaveCerts: ["MiFID II", "Local suitability rules", "AML/CTF"],
      notes: "Portuguese required; English helpful for expats. NHR regime changes reduced some tax appeal but inflows persist.",
    },
    clientBase: {
      sourcing: [
        "Expat HNW/retirees and tech migrants",
        "Domestic entrepreneurs and real-estate wealth",
        "Cross-border wrappers via LU/IE/CH platforms",
      ],
    },
    relocation: {
      oneParagraph:
        "Lisbon combines lifestyle advantages with lower compensation. Roles may blend private banking with affluent advisory.",
      officialLinkLabel: "CMVM — supervision",
      officialLinkUrl: "https://www.cmvm.pt/",
    },
    cta: { confidentialCallHref: "/contact", uploadPlanHref: "/bp-simulator" },
    legalDisclaimer: DEFAULT_DISCLAIMER,
    hiringPulse: {
      hotRoles: ["Affluent-to-HNW RM", "FO Services RM"],
      hotSkills: ["Insurance wrappers", "Real-estate wealth", "Cross-border basics"],
      notes: "Smaller PB market; language & lifestyle pitch matter.",
    },
    atAGlance: [
      { label: "Focus", value: "Onshore + Expats" },
      { label: "Comp", value: "Below EU hubs" },
      { label: "Languages", value: "PT/EN" },
      { label: "Cross-border", value: "LU/IE/CH wrappers" },
    ],
    ecosystem: {
      bookingCentres: ["Lisbon", "Luxembourg"],
      keyBanks: ["Caixa PB", "BCP", "Santander", "Novobanco", "International PBs (limited)"],
      eamsAndFOs: ["Boutique FOs", "Wealth managers"],
      regulators: ["CMVM", "Banco de Portugal"],
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