// lib/markets.ts
export type Market = {
  slug: string;
  name: string;
  country: string;
  headline: string;
  hiringPulse: string[];
  regulatory: string[];
  comp: {
    currency: 'CHF' | 'USD' | 'GBP' | 'SGD' | 'HKD';
    bands: { level: string; base: string; bonus: string; note?: string }[];
    netNote?: string;
  };
  ecosystem: { title: string; items: string[]; trends: string[] };
  keywords: string[];
};

export const markets: Market[] = [
  {
    slug: 'geneva',
    name: 'Geneva',
    country: 'Switzerland',
    headline:
      'Geneva remains a strategic UHNW hub with cross-border coverage across LatAm, MEA, and Western Europe.',
    hiringPulse: [
      'Demand for senior RMs with portable AUM (LatAm, MEA, FR/IT/ES/PT).',
      'Hot skills: LSFin/MiFID II, digital onboarding, family office advisory.',
      'Team lifts in UHNW and private markets advisory.'
    ],
    regulatory: [
      'FINMA/LSFin (LFID) investor-protection requirements.',
      'Outbound cross-border restrictions by target country.',
      'MiFID II familiarity for EU coverage.'
    ],
    comp: {
      currency: 'CHF',
      bands: [
        { level: 'Associate / VP', base: '120k–180k', bonus: '20–40%' },
        { level: 'Director', base: '200k–280k', bonus: '30–100%' },
        { level: 'Managing Director / Team Head', base: '300k–500k', bonus: 'Performance-driven' }
      ],
      netNote: 'Upper ranges typically tied to portable AUM > CHF 200m and strong ROA.'
    },
    ecosystem: {
      title: 'Banking Ecosystem (Geneva)',
      items: [
        'Global: UBS, JPM, Citi',
        'Swiss champions: Pictet, Lombard Odier, Julius Baer, Mirabaud, UBP, Syz',
        'Boutiques & FOs: Bordier, family offices'
      ],
      trends: ['Consolidation', 'Sustainability focus', 'AI-enabled servicing']
    },
    keywords: [
      'Geneva private banking recruitment',
      'wealth management jobs Geneva',
      'Relationship Manager salaries Geneva',
      'FINMA LSFin requirements'
    ]
  },
  {
    slug: 'zurich',
    name: 'Zürich',
    country: 'Switzerland',
    headline:
      'Switzerland’s largest hub and HQ center with deep DACH/CEE coverage and alternative investments access.',
    hiringPulse: [
      'Senior RMs & Investment Advisors with portable AUM.',
      'DACH, CEE and Israel desks in focus.',
      'Hot skills: LSFin, complex structuring, alternatives.'
    ],
    regulatory: [
      'FINMA/LSFin compliance for onshore & cross-border.',
      'MiFID II familiarity for EU clients.',
      'German fluency for onshore Swiss.'
    ],
    comp: {
      currency: 'CHF',
      bands: [
        { level: 'Associate / VP', base: '130k–190k', bonus: '20–50%' },
        { level: 'Director', base: '210k–300k', bonus: '40–120%' },
        { level: 'Managing Director / Team Head', base: '350k–550k', bonus: 'Performance-driven' }
      ],
      netNote: 'Top RMs with > CHF 250m portable AUM may exceed CHF 1m all-in.'
    },
    ecosystem: {
      title: 'Banking Ecosystem (Zürich)',
      items: [
        'Tier 1: UBS, Julius Baer',
        'Swiss: Vontobel, LGT, EFG, ZKB, CBH, Rahn+Bodmer',
        'Asset managers & FOs: Partners Group, numerous MFOs'
      ],
      trends: ['Digital wealth innovation', 'Private markets platforms']
    },
    keywords: [
      'Zürich private banking recruitment',
      'wealth management jobs Zürich',
      'Relationship Manager salaries Zürich',
      'DACH private banking hiring'
    ]
  },
  {
    slug: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    headline:
      'Fast-growing MEA hub with tax-free compensation and strong GCC/India/Africa client inflows.',
    hiringPulse: [
      'Senior RMs covering GCC, South Asia, and Africa.',
      'Hot skills: DFSA/ESCA, Sharia solutions, private markets.',
      'Arabic and Hindi/Urdu bilingual profiles valued.'
    ],
    regulatory: [
      'DFSA (DIFC) or ESCA approvals as applicable.',
      'Fit & proper requirements for senior roles.',
      'AML/KYC aligned to international standards.'
    ],
    comp: {
      currency: 'USD',
      bands: [
        { level: 'Associate / VP', base: '110k–160k', bonus: '20–40%' },
        { level: 'Director', base: '170k–250k', bonus: '40–80%' },
        { level: 'MD / Desk Head', base: '280k–450k', bonus: 'High discretionary' }
      ],
      netNote: 'Tax-free; effective net often 30–40% higher than CH/UK.'
    },
    ecosystem: {
      title: 'Banking Ecosystem (Dubai)',
      items: [
        'Global: UBS, Julius Baer, Pictet, HSBC, Barclays',
        'Regional: Emirates NBD, FAB, Mashreq, NBK',
        'DIFC boutiques & family offices'
      ],
      trends: ['FO growth', 'Real estate & private markets']
    },
    keywords: [
      'Dubai private banking recruitment',
      'DFSA relationship manager jobs',
      'wealth management salaries Dubai',
      'tax-free banking jobs Dubai'
    ]
  },
  {
    slug: 'singapore',
    name: 'Singapore',
    country: 'Singapore',
    headline:
      'Asia’s top wealth hub with MAS rigor, strong North/Southeast Asia flows, and rapid FO growth.',
    hiringPulse: [
      'North Asia, SEA, and NRI desks in demand.',
      'Hot skills: MAS-licensed reps, Mandarin/Bahasa/Hindi.',
      'Alternatives & next-gen advisory.'
    ],
    regulatory: [
      'MAS RNF registration for client-facing RMs.',
      'Fit & proper + mandatory CPD.',
      'Cross-border restrictions for CN/offshore.'
    ],
    comp: {
      currency: 'SGD',
      bands: [
        { level: 'Associate / VP', base: '180k–250k', bonus: '20–40%' },
        { level: 'Director', base: '260k–350k', bonus: '40–100%' },
        { level: 'MD / Desk Head', base: '400k–600k', bonus: 'Performance-driven' }
      ],
      netNote: 'Lower taxes vs UK/CH; top RMs > SGD 1m all-in.'
    },
    ecosystem: {
      title: 'Banking Ecosystem (Singapore)',
      items: [
        'Global: UBS, JPM, Citi, HSBC, Julius Baer, Pictet, LO',
        'Regional: DBS, OCBC, UOB, BoS, Maybank',
        '1,500+ family offices (and rising)'
      ],
      trends: ['VCC regime', 'Private markets & digital assets']
    },
    keywords: [
      'Singapore private banking jobs',
      'MAS licensed relationship managers',
      'wealth management salaries Singapore',
      'family office hiring Singapore'
    ]
  },
  {
    slug: 'hong-kong',
    name: 'Hong Kong',
    country: 'Hong Kong SAR',
    headline:
      'North Asia powerhouse with SFC licensing, strong Mainland China linkages, and accelerating family office growth.',
    hiringPulse: [
      'Mandarin/Cantonese-speaking RMs with portable North Asia AUM (Mainland China, Taiwan).',
      'Hot skills: structured products, Lombard lending, family office advisory.',
      'Coverage of entrepreneurs and next-gen tech wealth across GBA and offshore HK booking.'
    ],
    regulatory: [
      'SFC licensing: typically Type 1 (dealing) and Type 4 (advising); Type 9 for certain mandates.',
      'Banks supervised by HKMA; strict AML/KYC and complex product suitability.',
      'Mandatory CPT (continuing professional training) for licensed reps.'
    ],
    comp: {
      currency: 'HKD',
      bands: [
        { level: 'Associate / VP', base: '900k–1.30m', bonus: '20–40%' },
        { level: 'Director',        base: '1.40m–2.00m', bonus: '40–100%' },
        { level: 'MD / Desk Head',  base: '2.20m–3.60m', bonus: 'Performance-driven' }
      ],
      netNote:
        'Packages vary with Mainland coverage, book portability, and derivatives expertise.'
    },
    ecosystem: {
      title: 'Banking Ecosystem (Hong Kong)',
      items: [
        'Global: HSBC, Citi, JPM, UBS (incl. CS integration), MS, GS PB',
        'Swiss & boutiques: Julius Baer, Pictet, Lombard Odier, EFG, LGT',
        'Mainland & regional: ICBC, CCB, BoC, Bank of Singapore; growing family offices'
      ],
      trends: ['North Asia flows', 'Family office expansion', 'Onshore–offshore integration']
    },
    keywords: [
      'Hong Kong private banking recruitment',
      'SFC licensed relationship manager jobs',
      'wealth management salaries Hong Kong',
      'Mandarin-speaking RM Hong Kong'
    ]
  },
  {
    slug: 'london',
    name: 'London',
    country: 'UK',
    headline:
      'Europe’s broadest ecosystem: PB + alternatives + family offices; FCA rigor and global connectivity.',
    hiringPulse: [
      'UK onshore UHNW, MEA, Africa, NRI desks.',
      'Hot skills: FCA-registered, PB + alternatives dual expertise.',
      'Succession & family governance advisory.'
    ],
    regulatory: [
      'FCA registration (SMCR/CF functions as applicable).',
      'AML/KYC + MiFID II.',
      'Outbound restrictions into EU; PEP EDD.'
    ],
    comp: {
      currency: 'GBP',
      bands: [
        { level: 'Associate / VP', base: '90k–140k', bonus: '20–40%' },
        { level: 'Director', base: '150k–220k', bonus: '40–80%' },
        { level: 'MD / Team Head', base: '250k–400k', bonus: 'Performance-driven' }
      ],
      netNote: 'Top RMs with > £150m AUM can exceed £750k all-in.'
    },
    ecosystem: {
      title: 'Banking Ecosystem (London)',
      items: [
        'Global: UBS, Citi, JPM, Barclays, HSBC, DB, GS PB',
        'Swiss & boutiques: Julius Baer, Pictet, LO, EFG, LGT, Mirabaud, Rothschild',
        'HFs & FOs: Mayfair/Knightsbridge clusters'
      ],
      trends: ['PB + alternatives convergence', 'Post-Brexit cross-border focus']
    },
    keywords: [
      'London private banking recruitment',
      'FCA relationship manager jobs',
      'wealth management salaries London',
      'UHNW hiring London'
    ]
  },
  {
    slug: 'new-york',
    name: 'New York',
    country: 'USA',
    headline:
      'Global capital hub; SEC/FINRA environment; PB integrated with alternatives and family offices.',
    hiringPulse: [
      'US onshore UHNW + LatAm offshore desks.',
      'Hot skills: FINRA 7/63/65/66, alternatives distribution.',
      'Spanish/Portuguese for LatAm coverage.'
    ],
    regulatory: [
      'FINRA registrations (7/63/65/66).',
      'SEC rules + annual CE.',
      'Enhanced AML/KYC for LatAm exposure.'
    ],
    comp: {
      currency: 'USD',
      bands: [
        { level: 'Associate / VP', base: '140k–200k', bonus: '20–40%' },
        { level: 'Director', base: '200k–300k', bonus: '40–100%' },
        { level: 'MD / Team Head', base: '350k–600k', bonus: 'High performance' }
      ],
      netNote: 'Top performers > USD 1.2m all-in with revenue-based incentives.'
    },
    ecosystem: {
      title: 'Banking Ecosystem (New York)',
      items: [
        'Bulge bracket: JPM, Citi, MS, GS, BofA',
        'Swiss/intl: UBS, (CS via UBS), Julius Baer (rep), LO',
        'Dense FO/PE/HF in Manhattan'
      ],
      trends: ['PB + AM + alternatives integration', 'NY–Miami LatAm corridor']
    }, // ← fixed: close the object with }, not ],
    keywords: [
      'New York private banking recruitment',
      'FINRA private banker jobs',
      'wealth management salaries NYC',
      'UHNW hiring New York'
    ]
  },
  {
    slug: 'miami',
    name: 'Miami',
    country: 'USA',
    headline:
      'Gateway for LatAm wealth into the US; bilingual market with strong FO formation and tax advantages.',
    hiringPulse: [
      'LatAm offshore desks (Brazil, Mexico, Colombia, Argentina).',
      'Spanish/Portuguese essential; portable AUM prized.',
      'Crypto/tech/real-estate wealth inflows.'
    ],
    regulatory: [
      'FINRA registrations (7/63/65/66).',
      'US tax + cross-border structuring know-how.',
      'FATCA/CRS and enhanced AML/KYC.'
    ],
    comp: {
      currency: 'USD',
      bands: [
        { level: 'Associate / VP', base: '120k–180k', bonus: '20–40%' },
        { level: 'Director', base: '180k–260k', bonus: '40–80%' },
        { level: 'MD / Desk Head', base: '300k–500k', bonus: 'Performance-driven' }
      ],
      netNote: 'No state income tax; effective net ~15–20% > NYC.'
    },
    ecosystem: {
      title: 'Banking Ecosystem (Miami)',
      items: [
        'Global/Swiss: UBS, (CS via UBS), JPM, Citi, Julius Baer, BTG',
        'LatAm: Itaú, Bradesco, Safra, XP',
        'FOs & boutiques: Brickell/Coral Gables clusters'
      ],
      trends: ['LatAm wealth flight', 'FO boom in South Florida']
    },
    keywords: [
      'Miami private banking recruitment',
      'LatAm banker jobs Miami',
      'wealth management salaries Miami',
      'Relationship Manager Miami LatAm'
    ]
  }
];

export const marketSlugs = markets.map(m => m.slug);
export const getMarket = (slug: string) => markets.find(m => m.slug === slug);