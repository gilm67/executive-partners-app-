"use client";

type ScreeningOption = { label: string; pass: boolean | "warn" };
type ScreeningQuestion = { q: string; options: ScreeningOption[] };
type Mandate = {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  location: string;
  flag: string;
  aum: string;
  aum_note: string;
  comp_base: string;
  comp_note: string;
  urgent: boolean;
  ubp_ref?: string;
  profile_lines: string[];
  brief: string;
  process: string;
  screening: ScreeningQuestion[];
};

import { useState, useRef, useEffect } from "react";

// Each screening question has typed options: { label, pass: true|false|"warn" }
const LOGO_SRC = "/ep-logo.png";

const MANDATES = [
  {
    id: "rm-brazil-ch",
    tag: "LATAM · Brazil",
    title: "Senior Relationship Manager",
    subtitle: "Brazilian Market",
    location: "Zurich or Geneva",
    flag: "🇧🇷",
    aum: "CHF 250M+",
    aum_note: "3-year average portable book",
    comp_base: "CHF 180K – 280K",
    comp_note: "base · bonus · NPC buyout available",
    urgent: false,
    profile_lines: [
      "Personal ownership of Brazilian HNW and UHNW family relationships — not team or institutionally supported",
      "Minimum CHF 250M portable book measured over 3-year average",
      "5+ years managing Brazilian clients within a Swiss or international private bank",
    ],
    brief: `A well-capitalised Swiss private bank with an established Latin American desk is looking to add a dedicated senior banker for the Brazilian market. This is not a build-from-scratch mandate — the infrastructure exists. What they need is a relationship manager who personally owns Brazilian HNW and UHNW client relationships and can demonstrate genuine portability.\n\nThe candidate has spent the majority of their private banking career managing Brazilian families and entrepreneurs, understands the specificities of Brazilian offshore wealth, knows the compliance and reporting framework, and holds relationships that are genuinely portable — meaning clients who would follow them, not clients managed within a shared team context.\n\nThe bank fully understands that LATAM portability takes time and is prepared to offer a structured NPC contribution and a realistic transition window. Location is Zurich or Geneva — both genuinely open.`,
    process: "Confidential call with Executive Partners · Single senior introduction · No panels",
    screening: [
      {
        q: "How many years have you personally managed Brazilian clients in a private banking context?",
        options: [
          { label: "Under 2 years", pass: false },
          { label: "2 – 4 years", pass: "warn" },
          { label: "5 – 9 years", pass: true },
          { label: "10 years or more", pass: true },
        ],
      },
      {
        q: "What is your current AUM under direct personal management (not team AUM)?",
        options: [
          { label: "Under CHF 100M", pass: false },
          { label: "CHF 100M – 200M", pass: "warn" },
          { label: "CHF 200M – 350M", pass: true },
          { label: "Over CHF 350M", pass: true },
        ],
      },
      {
        q: "What proportion of your book do you believe is portable based on personal client relationships?",
        options: [
          { label: "I'm not sure", pass: false },
          { label: "Under 25%", pass: false },
          { label: "25% – 50%", pass: "warn" },
          { label: "Over 50%", pass: true },
        ],
      },
      {
        q: "Do you currently have a non-compete or non-solicit agreement?",
        options: [
          { label: "No NCA / NDA", pass: true },
          { label: "Yes — under 6 months", pass: true },
          { label: "Yes — 6 to 12 months", pass: "warn" },
          { label: "Yes — over 12 months", pass: false },
        ],
      },
      {
        q: "Are you currently based in Switzerland or prepared to relocate to Zurich or Geneva?",
        options: [
          { label: "Yes, already based there", pass: true },
          { label: "Open to relocating", pass: true },
          { label: "Not open to relocation", pass: false },
        ],
      },
    ],
  },
  {
    id: "rm-argentina-ch",
    tag: "LATAM · Argentina",
    title: "Senior Relationship Manager",
    subtitle: "Argentine Market",
    location: "Zurich or Geneva",
    flag: "🇦🇷",
    aum: "CHF 250M+",
    aum_note: "3-year average portable book",
    comp_base: "CHF 180K – 280K",
    comp_note: "base · bonus · NPC buyout available",
    urgent: false,
    profile_lines: [
      "Personal ownership of Argentine HNW and UHNW family or entrepreneur relationships",
      "Minimum CHF 250M portable book measured over 3-year average",
      "Deep understanding of Argentine offshore wealth and cross-border compliance",
    ],
    brief: `A separate mandate from the Brazilian search — the hiring bank is the same, but the Argentine market operates on different dynamics and they are looking for a dedicated specialist, not a combined LATAM generalist.\n\nArgentine HNW and UHNW wealth has distinct characteristics: currency controls, capital flight history, the importance of trust built over years often spanning generations, and a client base that is acutely attuned to political risk. The right candidate understands these dynamics from experience, not from a briefing document. They have managed Argentine clients personally for a meaningful period and hold relationships in their own name.\n\nThe bank is realistic about portability timelines in this market and offers a structured transition package. Zurich or Geneva — both open.`,
    process: "Confidential call with Executive Partners · Single senior introduction · No panels",
    screening: [
      {
        q: "How many years have you personally managed Argentine clients in a private banking context?",
        options: [
          { label: "Under 2 years", pass: false },
          { label: "2 – 4 years", pass: "warn" },
          { label: "5 – 9 years", pass: true },
          { label: "10 years or more", pass: true },
        ],
      },
      {
        q: "What is your current AUM under direct personal management (not team AUM)?",
        options: [
          { label: "Under CHF 100M", pass: false },
          { label: "CHF 100M – 200M", pass: "warn" },
          { label: "CHF 200M – 350M", pass: true },
          { label: "Over CHF 350M", pass: true },
        ],
      },
      {
        q: "How familiar are you with Argentine offshore wealth structures and cross-border compliance?",
        options: [
          { label: "No specific knowledge", pass: false },
          { label: "General awareness only", pass: "warn" },
          { label: "Working knowledge from experience", pass: true },
          { label: "Deep expertise — managing it daily", pass: true },
        ],
      },
      {
        q: "Do you currently have a non-compete or non-solicit agreement?",
        options: [
          { label: "No NCA / NDA", pass: true },
          { label: "Yes — under 6 months", pass: true },
          { label: "Yes — 6 to 12 months", pass: "warn" },
          { label: "Yes — over 12 months", pass: false },
        ],
      },
      {
        q: "Are you based in Switzerland or prepared to relocate to Zurich or Geneva?",
        options: [
          { label: "Yes, already based there", pass: true },
          { label: "Open to relocating", pass: true },
          { label: "Not open to relocation", pass: false },
        ],
      },
    ],
  },
  {
    id: "swiss-onshore-geneva",
    tag: "Switzerland · Onshore",
    title: "Senior Relationship Manager",
    subtitle: "Swiss Onshore Market",
    location: "Geneva",
    flag: "🇨🇭",
    aum: "CHF 150M+",
    aum_note: "3-year average portable book",
    comp_base: "CHF 160K – 240K",
    comp_note: "base · performance bonus · retention structure",
    urgent: false,
    profile_lines: [
      "Swiss-resident HNW and UHNW book built through genuine advisory relationships — not institutionally held",
      "Minimum CHF 150M portable book measured over 3-year average",
      "Wealth planning and credit structuring depth valued · French an advantage",
    ],
    brief: `Swiss onshore private banking at an institution with a genuine domestic franchise — strong balance sheet, real credit capability, and the wealth planning infrastructure that Swiss-domiciled HNW and UHNW clients expect.\n\nThe candidate manages Swiss-resident clients across HNW and UHNW, predominantly at UHNW level, with a book built over years of trusted advisory work. The distinction between clients who bank with an institution and clients who follow a banker is important here — this role requires the latter. A three-year average portable book of CHF 150M is the minimum. Wealth planning depth, familiarity with Swiss fiscal structures, and the ability to manage multi-generational family relationships are all valued.\n\nThis is a Geneva-based role. No relocation dynamic.`,
    process: "Confidential call with Executive Partners · One meeting with hiring team",
    screening: [
      {
        q: "What proportion of your current book consists of Swiss-domiciled clients?",
        options: [
          { label: "Under 30%", pass: false },
          { label: "30% – 60%", pass: "warn" },
          { label: "Over 60%", pass: true },
          { label: "Exclusively Swiss onshore", pass: true },
        ],
      },
      {
        q: "What is your AUM under direct personal management (not team AUM)?",
        options: [
          { label: "Under CHF 80M", pass: false },
          { label: "CHF 80M – 150M", pass: "warn" },
          { label: "CHF 150M – 300M", pass: true },
          { label: "Over CHF 300M", pass: true },
        ],
      },
      {
        q: "How would you describe your Swiss wealth planning knowledge?",
        options: [
          { label: "Limited — primarily investment advisory", pass: "warn" },
          { label: "Working knowledge of Swiss fiscal structures", pass: true },
          { label: "Deep — manage succession and estate planning regularly", pass: true },
        ],
      },
      {
        q: "Are you currently based in Geneva or the Geneva region?",
        options: [
          { label: "Yes", pass: true },
          { label: "No but open to relocating to Geneva", pass: true },
          { label: "No and not prepared to relocate", pass: false },
        ],
      },
    ],
  },
  {
    id: "greece-cyprus-geneva",
    tag: "Greece · Cyprus",
    title: "Senior Relationship Manager",
    subtitle: "Greek & Cypriot Market",
    location: "Geneva",
    flag: "🇬🇷🇨🇾",
    aum: "CHF 200M+",
    aum_note: "3-year average portable book",
    comp_base: "CHF 170K – 260K",
    comp_note: "base · competitive bonus · relocation support",
    urgent: false,
    profile_lines: [
      "Known in the Greek and Cypriot HNW and UHNW community — family or entrepreneur-level personal relationships",
      "Greek language fluency mandatory",
      "Minimum CHF 200M portable book measured over 3-year average",
    ],
    brief: `A market where timing matters. Greek and Cypriot HNW and UHNW clients are currently reassessing long-standing bank relationships following institutional changes across the sector. A motivated banker with strong community relationships is unusually well-placed right now.\n\nThe hiring bank has an established Greek and Cypriot client base and wants to deepen it. They are not looking for a business developer without a book — they want a senior banker who is known in the community, speaks Greek fluently, and holds personal HNW and UHNW relationships built over years. A three-year average portable book of CHF 200M is the minimum.`,
    process: "Confidential introduction through Executive Partners · One senior meeting",
    screening: [
      {
        q: "What is your Greek language level?",
        options: [
          { label: "No Greek", pass: false },
          { label: "Basic / conversational", pass: false },
          { label: "Fluent — use it professionally", pass: true },
          { label: "Native speaker", pass: true },
        ],
      },
      {
        q: "How many years have you personally managed Greek or Cypriot HNW and UHNW clients?",
        options: [
          { label: "Under 2 years", pass: false },
          { label: "2 – 4 years", pass: "warn" },
          { label: "5 – 9 years", pass: true },
          { label: "10 years or more", pass: true },
        ],
      },
      {
        q: "What is your AUM from Greek and Cypriot clients specifically?",
        options: [
          { label: "Under CHF 80M", pass: false },
          { label: "CHF 80M – 150M", pass: "warn" },
          { label: "CHF 150M – 250M", pass: true },
          { label: "Over CHF 250M", pass: true },
        ],
      },
      {
        q: "Are you based in Geneva or prepared to relocate there?",
        options: [
          { label: "Yes, already in Geneva", pass: true },
          { label: "Open to relocating to Geneva", pass: true },
          { label: "Not open to relocation", pass: false },
        ],
      },
    ],
  },
  {
    id: "ia-cis-cee-geneva",
    tag: "CIS · CEE · Russian-speaking",
    title: "Investment Advisor",
    subtitle: "CIS & CEE Market — Geneva",
    location: "Geneva",
    flag: "🇷🇺",
    aum: "No minimum",
    aum_note: "Bank provides existing client base",
    comp_base: "CHF 140K – 220K",
    comp_note: "base · advisory performance bonus",
    urgent: true,
    ubp_ref: "Job ID 542 · Union Bancaire Privée",
    profile_lines: [
      "Perfectly fluent in French and English · Very good Russian mandatory",
      "CFA, CIIA or CWMA a strong asset · min. 5 years investment advisory in private banking",
      "Strong knowledge of equities, derivatives, fixed income, structured products · no book required",
    ],
    brief: `The Investment Advisor is responsible for delivering tailored investment advice and portfolio strategies to high-net-worth and ultra-high-net-worth individuals from the CIS and CEE region. Working closely with Relationship Managers, the IA ensures clients receive comprehensive, risk-appropriate investment solutions aligned with their goals and profile.\n\nThis is a pure investment advisory mandate — not an RM role. The bank provides the client base. The candidate brings investment expertise: the ability to construct and optimise portfolios across asset classes, present strategies clearly, conduct regular portfolio reviews, and act as the trusted investment contact for existing clients in partnership with the RM team.\n\nThe role requires a university degree in Finance, Economics or equivalent. CFA, CIIA or CWMA is a strong asset. Minimum five years of experience in a similar investment advisory position within private banking. Very good knowledge of Russian is a strong differentiator for this mandate.`,
    process: "Direct introduction · Fast-track process for the right profile",
    screening: [
      {
        q: "What is your Russian language level?",
        options: [
          { label: "None", pass: false },
          { label: "Basic / beginner", pass: false },
          { label: "Intermediate — can hold a conversation", pass: "warn" },
          { label: "Fluent — use it with clients", pass: true },
          { label: "Native speaker", pass: true },
        ],
      },
      {
        q: "How many years have you worked as an Investment Advisor (not RM) in a private banking context?",
        options: [
          { label: "Under 2 years", pass: false },
          { label: "2 – 4 years", pass: "warn" },
          { label: "5 – 8 years", pass: true },
          { label: "Over 8 years", pass: true },
        ],
      },
      {
        q: "Which investment certifications do you hold?",
        options: [
          { label: "None and not enrolled", pass: "warn" },
          { label: "Enrolled / in progress", pass: "warn" },
          { label: "CWMA", pass: true },
          { label: "CFA or CIIA", pass: true },
        ],
      },
      {
        q: "What is your hands-on experience with derivatives and structured products?",
        options: [
          { label: "No experience", pass: false },
          { label: "Theoretical knowledge only", pass: false },
          { label: "Some exposure — assisted on transactions", pass: "warn" },
          { label: "Regular execution experience", pass: true },
        ],
      },
      {
        q: "Are you currently based in Geneva or prepared to work on-site there?",
        options: [
          { label: "Yes, already in Geneva", pass: true },
          { label: "Open to relocating to Geneva", pass: true },
          { label: "No — remote only", pass: false },
        ],
      },
    ],
  },
  {
    id: "ia-cis-cee-zurich",
    tag: "CIS · CEE · Russian-speaking",
    title: "Investment Advisor",
    subtitle: "CIS & CEE Market — Zurich",
    location: "Zurich",
    flag: "🇷🇺",
    aum: "No minimum",
    aum_note: "Bank provides existing client base",
    comp_base: "CHF 140K – 220K",
    comp_note: "base · advisory performance bonus",
    urgent: true,
    profile_lines: [
      "Fluent Russian mandatory · German or French and English required",
      "CFA, CIIA or CWMA a strong asset · min. 5 years investment advisory in private banking",
      "Structured product execution experience required · no book needed",
    ],
    brief: `A parallel mandate to the Geneva Investment Advisor search — a different institution, a separate CIS/CEE client base, based in Zurich. The investment advisory profile and client segment are comparable: Russian-speaking HNW and UHNW clients from the CIS and CEE region who require sophisticated, risk-appropriate investment advice.\n\nThe bank has an established book of CIS/CEE clients and is looking for an Investment Advisor with genuine product depth — someone who understands portfolio construction, can navigate derivatives and structured products with confidence, and builds trusted investment relationships over time.\n\nFor candidates open to both cities, Geneva and Zurich can be explored in parallel.`,
    process: "Direct introduction · Parallel process with Geneva mandate possible",
    screening: [
      {
        q: "What is your Russian language level?",
        options: [
          { label: "None", pass: false },
          { label: "Basic / beginner", pass: false },
          { label: "Intermediate — can hold a conversation", pass: "warn" },
          { label: "Fluent — use it with clients", pass: true },
          { label: "Native speaker", pass: true },
        ],
      },
      {
        q: "How many years have you worked as an Investment Advisor (not RM) in private banking?",
        options: [
          { label: "Under 2 years", pass: false },
          { label: "2 – 4 years", pass: "warn" },
          { label: "5 – 8 years", pass: true },
          { label: "Over 8 years", pass: true },
        ],
      },
      {
        q: "What certifications do you hold?",
        options: [
          { label: "None and not enrolled", pass: "warn" },
          { label: "Enrolled / in progress", pass: "warn" },
          { label: "CWMA", pass: true },
          { label: "CFA or CIIA", pass: true },
        ],
      },
      {
        q: "Are you based in Zurich or the greater Zurich area, or open to relocating?",
        options: [
          { label: "Yes, already in Zurich area", pass: true },
          { label: "Open to relocating to Zurich", pass: true },
          { label: "No — Geneva only or remote", pass: false },
        ],
      },
    ],
  },
  {
    id: "arm-russian-geneva",
    tag: "CIS · CEE · Assistant RM",
    title: "Assistant Relationship Manager",
    subtitle: "Emerging Markets · Russian-speaking",
    location: "Geneva",
    flag: "🇷🇺",
    aum: "N/A",
    aum_note: "Supporting role — no book required",
    comp_base: "CHF 90K – 130K",
    comp_note: "base · private banking bonus structure",
    urgent: false,
    ubp_ref: "Job ID 605 · Union Bancaire Privée",
    profile_lines: [
      "Russian mandatory · French and English required · Swiss resident (hard requirement, no exceptions)",
      "Minimum 5 years private banking experience as assistant or junior RM — not back office",
      "Direct HNW and UHNW client interaction experience · KYC/AML operational depth",
    ],
    brief: `The mission of this role is to assist the relationship manager(s) in opening new relationships and serving clients, in full compliance with the Bank's internal regulations and guidelines, within the Eastern Europe and CIS region.\n\nMain responsibilities include preparing all necessary documentation for client meetings and business trips, executing and monitoring stock exchange orders, forex transactions, fiduciary relationships, loans, payment orders and credit card applications, providing administrative support to the Team Head, and handling cash management. The role also involves assisting in AML clarifications and preparing client KYC files and related updates with direct client contact, direct interaction with clients by phone, email and occasionally in meetings, and preparing and monitoring account openings, closings and mutations. Maintaining records in compliance with internal and external regulation — portfolio reviews, AML, KYC — and deputising for other assistants when needed are part of the day-to-day scope.\n\nThe required profile includes a degree in a related field (banking apprenticeship, CYP, banking internship or equivalent), a minimum of five years of experience in a similar role within a private bank, and strong banking and KYC knowledge. A Private Banking certificate, CWMA or equivalent certification is a plus. The role demands strong team spirit, excellent interpersonal skills, a service and client-oriented mindset, and the ability to work under pressure. Perfectly fluent French and English are required. Russian is a strong added value for this mandate — in practice, it is close to mandatory given the client base. Swiss residency is a hard requirement with no exceptions.`,
    process: "Confidential call with Executive Partners · One team interview at the bank",
    screening: [
      {
        q: "Are you currently a Swiss resident with a valid work permit or Swiss/EU citizenship?",
        options: [
          { label: "Yes — Swiss citizen or C/B permit holder", pass: true },
          { label: "No — but eligible to apply independently", pass: "warn" },
          { label: "No — would require bank sponsorship", pass: false },
        ],
      },
      {
        q: "What is your Russian language level?",
        options: [
          { label: "None", pass: false },
          { label: "Basic only", pass: false },
          { label: "Professional working level", pass: true },
          { label: "Native or bilingual", pass: true },
        ],
      },
      {
        q: "What is your French language level?",
        options: [
          { label: "None or basic", pass: false },
          { label: "Intermediate — B1/B2", pass: "warn" },
          { label: "Professional working level — C1", pass: true },
          { label: "Native or bilingual", pass: true },
        ],
      },
      {
        q: "How many years have you worked as an assistant RM or in a direct private banking support role with HNW and UHNW client contact?",
        options: [
          { label: "Under 2 years", pass: false },
          { label: "2 – 4 years", pass: "warn" },
          { label: "5 – 8 years", pass: true },
          { label: "Over 8 years", pass: true },
        ],
      },
      {
        q: "Have you executed stock exchange orders, forex transactions or fiduciary placements directly?",
        options: [
          { label: "No — administrative only", pass: false },
          { label: "Occasionally, with supervision", pass: "warn" },
          { label: "Yes — regularly and independently", pass: true },
        ],
      },
    ],
  },
  {
    id: "rm-italy-milan",
    tag: "Italy · Italian Market",
    title: "Senior Relationship Manager",
    subtitle: "Italian Market",
    location: "Milan",
    flag: "🇮🇹",
    aum: "CHF 150M+",
    aum_note: "Relationship quality prioritised over raw volume",
    comp_base: "EUR 150K – 250K",
    comp_note: "base · performance bonus · business plan support",
    urgent: false,
    profile_lines: [
      "Career focused on Italian HNW and UHNW entrepreneur and family clients · Italian mandatory",
      "Cross-border regulatory knowledge (Italy / Switzerland) valued",
      "Managing succession, real estate structuring and multi-generational wealth conversations",
    ],
    brief: `A Milan-based role at a bank with a genuine and growing Italian franchise. This is not a greenfield mandate — the bank has an existing Italian client base and wants to strengthen it at the senior level. The candidate is expected to bring relationships, but the institutional platform provides genuine support.\n\nThe right profile has spent the majority of a private banking career managing Italian HNW and UHNW clients and entrepreneurs, understands the regulatory environment on both sides of the border, and operates at the level of wealth structuring, succession and multi-generational planning.\n\nA three-year average portable book of CHF 150M is a guide — but quality of relationships and depth of client tenure matter more than raw volume. Italian fluency is mandatory. The role is Milan-based; remote coverage is not an option.`,
    process: "Confidential introduction · One meeting with Geneva and Milan leadership",
    screening: [
      {
        q: "What is your Italian language level?",
        options: [
          { label: "None", pass: false },
          { label: "Basic / intermediate", pass: false },
          { label: "Fluent — professional use", pass: true },
          { label: "Native speaker", pass: true },
        ],
      },
      {
        q: "What proportion of your current book consists of Italian HNW and UHNW clients?",
        options: [
          { label: "Under 30%", pass: false },
          { label: "30% – 60%", pass: "warn" },
          { label: "Over 60%", pass: true },
          { label: "Exclusively Italian clients", pass: true },
        ],
      },
      {
        q: "What is your total AUM from Italian clients under direct personal management?",
        options: [
          { label: "Under CHF 50M", pass: false },
          { label: "CHF 50M – 120M", pass: "warn" },
          { label: "CHF 120M – 250M", pass: true },
          { label: "Over CHF 250M", pass: true },
        ],
      },
      {
        q: "Are you based in Milan or prepared to be based there full-time?",
        options: [
          { label: "Yes, already in Milan", pass: true },
          { label: "Open to relocating to Milan", pass: true },
          { label: "No — not open to Milan", pass: false },
        ],
      },
    ],
  },
  {
    id: "rm-hong-kong",
    tag: "Asia Pacific · Hong Kong",
    title: "Senior Relationship Manager",
    subtitle: "Hong Kong",
    location: "Hong Kong",
    flag: "🇭🇰",
    aum: "USD/CHF 250M+",
    aum_note: "3-year average portable book",
    comp_base: "HKD 1.8M – 3M",
    comp_note: "base equivalent · bonus · relocation contribution",
    urgent: false,
    profile_lines: [
      "Personal HNW and UHNW relationships — Greater China, Southeast Asia or international clients booked in HK",
      "Minimum USD/CHF 250M portable book over 3-year average",
      "Mandarin or Cantonese an advantage · relocation package available",
    ],
    brief: `A senior RM mandate at a private bank with a well-established Hong Kong presence and a client base spanning Greater China, Southeast Asia and international markets. The bank is hiring selectively at the senior level.\n\nThe candidate manages HNW and UHNW relationships personally and can demonstrate portability based on the depth and tenure of those relationships, not institutional loyalty. The bank places a premium on relationship quality — a banker with fifteen truly owned relationships is more interesting than one with fifty that belong to the institution.\n\nHong Kong residency or a firm willingness to relocate is required. The bank offers a competitive relocation package for the right candidate.`,
    process: "Confidential call with Executive Partners · Single introduction to hiring team",
    screening: [
      {
        q: "What is your total AUM under direct personal management?",
        options: [
          { label: "Under USD 100M", pass: false },
          { label: "USD 100M – 200M", pass: "warn" },
          { label: "USD 200M – 350M", pass: true },
          { label: "Over USD 350M", pass: true },
        ],
      },
      {
        q: "What is the average tenure of your top 10 client relationships?",
        options: [
          { label: "Under 2 years", pass: false },
          { label: "2 – 4 years", pass: "warn" },
          { label: "5 – 9 years", pass: true },
          { label: "Over 10 years", pass: true },
        ],
      },
      {
        q: "Do you hold or are you eligible for an SFC licence in Hong Kong?",
        options: [
          { label: "Yes — active SFC licence", pass: true },
          { label: "Previously held — can reactivate", pass: true },
          { label: "Not yet but prepared to obtain one", pass: "warn" },
          { label: "No and not interested", pass: false },
        ],
      },
      {
        q: "Are you currently based in Hong Kong or prepared to relocate there?",
        options: [
          { label: "Yes, based in Hong Kong", pass: true },
          { label: "Open to relocating", pass: true },
          { label: "No — not open to Hong Kong", pass: false },
        ],
      },
    ],
  },
  {
    id: "rm-singapore",
    tag: "Asia Pacific · Singapore",
    title: "Senior Relationship Manager",
    subtitle: "Singapore",
    location: "Singapore",
    flag: "🇸🇬",
    aum: "CHF 250M+",
    aum_note: "3-year average portable book",
    comp_base: "SGD 280K – 450K",
    comp_note: "base · performance bonus · senior platform",
    urgent: false,
    profile_lines: [
      "Deep personal HNW and UHNW relationships — Southeast Asian, South Asian or international clients in Singapore",
      "Minimum CHF 250M portable book over 3-year average",
      "Family office, succession and multi-booking-centre experience valued",
    ],
    brief: `Singapore-based private banking at an institution with a strong HNW and UHNW franchise. The bank is building at the senior level with deliberate selectivity — they are not filling a vacancy, they are adding a banker who genuinely strengthens the team.\n\nThe profile is a senior RM with deep, personally owned HNW and UHNW relationships and a portable book of CHF 250M or above on a three-year average. The bank values relationship depth over market breadth — a banker with fifteen deep relationships they truly own is more interesting than one with fifty superficial ones.\n\nMAS licence or eligibility is required. Singapore residency or willingness to relocate is expected.`,
    process: "Confidential call with Executive Partners · One meeting with senior leadership",
    screening: [
      {
        q: "What is your total AUM under direct personal management?",
        options: [
          { label: "Under CHF 100M", pass: false },
          { label: "CHF 100M – 200M", pass: "warn" },
          { label: "CHF 200M – 350M", pass: true },
          { label: "Over CHF 350M", pass: true },
        ],
      },
      {
        q: "How many of your top clients have followed you from a previous institution?",
        options: [
          { label: "None — all clients stayed at my last bank", pass: false },
          { label: "A few — 1 to 3 clients", pass: "warn" },
          { label: "Several — 4 or more clients", pass: true },
          { label: "Most of my book has followed me before", pass: true },
        ],
      },
      {
        q: "Do you hold or are you eligible for a MAS Capital Markets Services licence?",
        options: [
          { label: "Yes — active MAS licence", pass: true },
          { label: "Previously held — can reactivate", pass: true },
          { label: "Not yet but prepared to obtain one", pass: "warn" },
          { label: "No and not interested", pass: false },
        ],
      },
      {
        q: "Are you currently based in Singapore or prepared to relocate there?",
        options: [
          { label: "Yes, based in Singapore", pass: true },
          { label: "Open to relocating", pass: true },
          { label: "No — not open to Singapore", pass: false },
        ],
      },
    ],
  },
];

const gold = "#C9A14A";
const bg = "#07111f";
const font = "'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";

// ── Screening Modal ────────────────────────────────────────────────────────────
function ScreeningModal({ mandate, onClose, onPass }: { mandate: Mandate; onClose: () => void; onPass: () => void }) {
  const [answers, setAnswers] = useState<Record<number, ScreeningOption>>({});
  const [submitted, setSubmitted] = useState(false);
  const [fails, setFails]   = useState<{ q: string; chosen: string }[]>([]);
  const [warns, setWarns]   = useState<{ q: string; chosen: string }[]>([]);

  const allAnswered = mandate.screening.every((_, i) => answers[i] !== undefined);

  const submit = () => {
    const f = []; const w = [];
    mandate.screening.forEach((s, i) => {
      const chosen = answers[i];
      if (chosen === undefined) return;
      if (chosen.pass === false) f.push({ q: s.q, chosen: chosen.label });
      if (chosen.pass === "warn") w.push({ q: s.q, chosen: chosen.label });
    });
    setFails(f); setWarns(w); setSubmitted(true);
    if (f.length === 0) setTimeout(() => { onClose(); onPass(); }, 1100);
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, background: "rgba(0,0,0,0.78)", backdropFilter: "blur(6px)" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 540, maxHeight: "88vh", overflowY: "auto", background: "#0c1c31", border: "1px solid rgba(201,161,74,0.22)", borderRadius: 16, padding: "26px 24px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          <div>
            <div style={{ color: gold, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", marginBottom: 5 }}>Quick Qualification Check</div>
            <div style={{ color: "#fff", fontSize: 15, fontWeight: 600, lineHeight: 1.3 }}>{mandate.title}<br /><span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, fontWeight: 400 }}>{mandate.location}</span></div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: 22, cursor: "pointer", padding: 0, lineHeight: 1, marginLeft: 12 }}>×</button>
        </div>

        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, lineHeight: 1.65, marginBottom: 22, paddingBottom: 18, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          A few targeted questions to confirm you meet the core criteria before we speak. Takes under 90 seconds.
        </p>

        {!submitted ? (
          <>
            {mandate.screening.map((s, i) => (
              <div key={i} style={{ marginBottom: 22, paddingBottom: 22, borderBottom: i < mandate.screening.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, lineHeight: 1.65, margin: "0 0 12px", fontWeight: 500 }}>{s.q}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {s.options.map((opt, j) => {
                    const sel = answers[i]?.label === opt.label;
                    const borderC = sel
                      ? opt.pass === true ? "rgba(74,222,128,0.55)" : opt.pass === false ? "rgba(248,113,113,0.55)" : "rgba(245,158,11,0.55)"
                      : "rgba(255,255,255,0.1)";
                    const bgC = sel
                      ? opt.pass === true ? "rgba(74,222,128,0.09)" : opt.pass === false ? "rgba(248,113,113,0.09)" : "rgba(245,158,11,0.09)"
                      : "rgba(255,255,255,0.02)";
                    const textC = sel
                      ? opt.pass === true ? "#4ade80" : opt.pass === false ? "#f87171" : "#f59e0b"
                      : "rgba(255,255,255,0.5)";
                    return (
                      <button key={j} onClick={() => setAnswers(p => ({ ...p, [i]: opt }))} style={{
                        padding: "10px 16px", borderRadius: 8, border: `1px solid ${borderC}`,
                        background: bgC, color: textC, fontSize: 13, cursor: "pointer",
                        fontFamily: font, textAlign: "left", transition: "all 0.15s",
                        display: "flex", alignItems: "center", gap: 10,
                      }}>
                        <div style={{ width: 14, height: 14, borderRadius: "50%", border: `1.5px solid ${sel ? textC : "rgba(255,255,255,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          {sel && <div style={{ width: 7, height: 7, borderRadius: "50%", background: textC }} />}
                        </div>
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            <button onClick={submit} disabled={!allAnswered} style={{
              width: "100%", padding: "13px",
              background: allAnswered ? `linear-gradient(135deg,${gold} 0%,#9a7030 100%)` : "rgba(255,255,255,0.05)",
              color: allAnswered ? bg : "rgba(255,255,255,0.2)",
              border: "none", borderRadius: 8, fontSize: 11, fontWeight: 700,
              letterSpacing: 2.5, textTransform: "uppercase",
              cursor: allAnswered ? "pointer" : "not-allowed", fontFamily: font,
            }}>Submit →</button>
          </>
        ) : fails.length === 0 ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <div style={{ fontSize: 36, marginBottom: 14 }}>✓</div>
            <div style={{ color: "#4ade80", fontSize: 15, fontWeight: 600, marginBottom: 8 }}>Profile looks strong</div>
            {warns.length > 0 && <div style={{ color: "rgba(245,158,11,0.7)", fontSize: 12, marginBottom: 8 }}>A few points to discuss — we'll cover them in our call.</div>}
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>Opening the mandate brief…</div>
          </div>
        ) : (
          <div>
            <div style={{ padding: "16px 18px", background: "rgba(248,113,113,0.07)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 10, marginBottom: 20 }}>
              <div style={{ color: "#f87171", fontSize: 12, fontWeight: 700, marginBottom: 12 }}>{fails.length} criteria not met for this mandate</div>
              {fails.map((f, i) => (
                <div key={i} style={{ marginBottom: i < fails.length - 1 ? 12 : 0, paddingBottom: i < fails.length - 1 ? 12 : 0, borderBottom: i < fails.length - 1 ? "1px solid rgba(248,113,113,0.12)" : "none" }}>
                  <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, lineHeight: 1.55, margin: "0 0 3px" }}>{f.q}</p>
                  <p style={{ color: "rgba(248,113,113,0.65)", fontSize: 11, margin: 0 }}>Your answer: {f.chosen}</p>
                </div>
              ))}
            </div>
            <p style={{ color: "rgba(255,255,255,0.38)", fontSize: 12, lineHeight: 1.7, marginBottom: 18 }}>
              This specific mandate may not be the right fit right now. We run confidential roles not listed here — a 15-minute call with Gil M. Chalem will give you an honest picture of your options across all active searches.
            </p>
            <a href="https://www.execpartners.ch/en/contact" target="_blank" rel="noopener noreferrer" style={{ display: "block", textAlign: "center", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.6)", padding: "12px", borderRadius: 8, fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", textDecoration: "none", marginBottom: 10 }}>
              Speak with Gil M. Chalem →
            </a>
            <button onClick={onClose} style={{ width: "100%", background: "none", border: "none", color: "rgba(255,255,255,0.2)", fontSize: 11, padding: "8px", cursor: "pointer", fontFamily: font }}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Interest Form ─────────────────────────────────────────────────────────────
function InterestForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  if (sent) return (
    <div style={{ padding: "20px 24px", background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 10, textAlign: "center" }}>
      <div style={{ fontSize: 22, marginBottom: 10 }}>✓</div>
      <div style={{ color: "#4ade80", fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Interest registered</div>
      <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, lineHeight: 1.65 }}>Gil M. Chalem will be in touch within one business day. Completely confidential.</div>
    </div>
  );
  return (
    <div style={{ padding: "22px 24px", background: "rgba(201,161,74,0.04)", border: "1px solid rgba(201,161,74,0.18)", borderRadius: 10 }}>
      <div style={{ color: gold, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>Register your interest</div>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, lineHeight: 1.65, margin: "0 0 16px" }}>No CV required at this stage. A confidential conversation only.</p>
      <div style={{ display: "flex", gap: 10 }}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && email.includes("@") && setSent(true)} placeholder="Your professional email" style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,161,74,0.2)", borderRadius: 6, padding: "12px 16px", color: "#fff", fontSize: 13, fontFamily: font, outline: "none" }} onFocus={e => e.target.style.borderColor = "rgba(201,161,74,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(201,161,74,0.2)"} />
        <button onClick={() => email.includes("@") && setSent(true)} style={{ background: email.includes("@") ? `linear-gradient(135deg,${gold} 0%,#9a7030 100%)` : "rgba(255,255,255,0.05)", color: email.includes("@") ? bg : "rgba(255,255,255,0.2)", border: "none", padding: "12px 22px", borderRadius: 6, fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", cursor: email.includes("@") ? "pointer" : "not-allowed", fontFamily: font, whiteSpace: "nowrap" }}>Send →</button>
      </div>
      <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 10, marginTop: 10, letterSpacing: 1.5 }}>100% CONFIDENTIAL · GDPR COMPLIANT · EXECUTIVE PARTNERS GENEVA</p>
    </div>
  );
}

// ── Mandate Detail ─────────────────────────────────────────────────────────────
function MandatePage({ mandate, onBack, onApply }: { mandate: Mandate; onBack: () => void; onApply: (m: Mandate) => void }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={{ animation: "fadeIn 0.35s both" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: 12, cursor: "pointer", fontFamily: font, letterSpacing: 1, padding: "0 0 28px", display: "flex", alignItems: "center", gap: 8 }} onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}>← All Mandates</button>
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
          <div style={{ padding: "4px 12px", borderRadius: 20, background: "rgba(201,161,74,0.1)", border: "1px solid rgba(201,161,74,0.25)", color: gold, fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>{mandate.tag}</div>
          {mandate.urgent && <div style={{ padding: "4px 12px", borderRadius: 20, background: "rgba(74,222,128,0.08)", border: "1px solid rgba(74,222,128,0.2)", color: "#4ade80", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>Actively Filling</div>}
          {mandate.ubp_ref && <div style={{ padding: "4px 12px", borderRadius: 20, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.35)", fontSize: 10 }}>{mandate.ubp_ref}</div>}
        </div>
        <div style={{ fontSize: 28, marginBottom: 8 }}>{mandate.flag}</div>
        <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 400, lineHeight: 1.2, margin: "0 0 8px", letterSpacing: -0.5 }}>{mandate.title}</h1>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 15 }}>{mandate.subtitle} · {mandate.location}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
        <div style={{ padding: "16px 18px", background: "rgba(201,161,74,0.06)", border: "1px solid rgba(201,161,74,0.18)", borderRadius: 10 }}>
          <div style={{ color: "rgba(201,161,74,0.55)", fontSize: 9, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 6 }}>Indicative Compensation</div>
          <div style={{ color: "#fff", fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{mandate.comp_base}</div>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, marginBottom: 8 }}>{mandate.comp_note}</div>
          <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 10, lineHeight: 1.55, fontStyle: "italic" }}>Indicative range only. Final package is determined by the hiring institution based on experience, seniority and negotiation.</div>
        </div>
        <div style={{ padding: "16px 18px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10 }}>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 9, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 6 }}>Portable Book</div>
          <div style={{ color: "#fff", fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{mandate.aum}</div>
          <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>{mandate.aum_note}</div>
        </div>
      </div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>The Opportunity</div>
        {mandate.brief.split("\n\n").map((p, i) => <p key={i} style={{ color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 1.85, margin: "0 0 16px" }}>{p}</p>)}
      </div>
      <div style={{ padding: "20px 22px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, marginBottom: 28 }}>
        <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", marginBottom: 14 }}>Ideal Profile</div>
        {mandate.profile_lines.map((line, i) => (
          <div key={i} style={{ display: "flex", gap: 12, marginBottom: i < mandate.profile_lines.length - 1 ? 10 : 0, alignItems: "flex-start" }}>
            <div style={{ width: 4, height: 4, borderRadius: "50%", background: gold, opacity: 0.6, marginTop: 7, flexShrink: 0 }} />
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.65 }}>{line}</span>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 28 }}>
        <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>Process</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {mandate.process.split(" · ").map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {i > 0 && <div style={{ width: 20, height: 1, background: "rgba(255,255,255,0.1)" }} />}
              <div style={{ padding: "6px 14px", borderRadius: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)", fontSize: 12 }}>{step}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Apply CTA */}
      <div style={{ padding: "28px 24px", background: "linear-gradient(135deg, rgba(201,161,74,0.08) 0%, rgba(27,58,107,0.15) 100%)", border: "1px solid rgba(201,161,74,0.25)", borderRadius: 12, marginBottom: 28, textAlign: "center" }}>
        <div style={{ color: gold, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>Interested in this mandate?</div>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, lineHeight: 1.7, margin: "0 0 20px", maxWidth: 380, marginLeft: "auto", marginRight: "auto" }}>
          A short qualification check — under 90 seconds — then register your interest confidentially. No CV required at this stage.
        </p>
        <button onClick={() => onApply(mandate)} style={{
          background: `linear-gradient(135deg,#C9A14A 0%,#9a7030 100%)`,
          color: "#07111f", border: "none", padding: "14px 48px",
          borderRadius: 6, fontSize: 12, fontWeight: 700, letterSpacing: 2.5,
          textTransform: "uppercase", cursor: "pointer", fontFamily: font,
          boxShadow: "0 4px 20px rgba(201,161,74,0.22)", transition: "transform 0.2s"
        }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-1px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "none"}
        >Apply for this Role →</button>
        <p style={{ color: "rgba(255,255,255,0.15)", fontSize: 10, marginTop: 14, letterSpacing: 1.5 }}>100% CONFIDENTIAL · GDPR COMPLIANT · EXECUTIVE PARTNERS GENEVA</p>
      </div>

      <div style={{ padding: "16px 0", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div style={{ color: "rgba(255,255,255,0.2)", fontSize: 11 }}>Executive Partners · Geneva · <span style={{ color: "rgba(201,161,74,0.4)" }}>gil.chalem@execpartners.ch</span></div>
        <button onClick={onBack} style={{ background: "none", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.3)", fontSize: 11, padding: "7px 16px", borderRadius: 6, cursor: "pointer", fontFamily: font }}>← All mandates</button>
      </div>
    </div>
  );
}

// ── Card ───────────────────────────────────────────────────────────────────────
function MandateCard({ mandate, idx, onScreen, onView }: { mandate: Mandate; idx: number; onScreen: (m: Mandate) => void; onView: (m: Mandate) => void }) {
  return (
    <div style={{ padding: "20px 22px", borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", transition: "all 0.2s", animation: `fadeUp 0.35s ${idx * 0.045}s both`, position: "relative", overflow: "hidden" }}
      onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,161,74,0.05)"; e.currentTarget.style.borderColor = "rgba(201,161,74,0.22)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.25)"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
    >
      {mandate.urgent && <div style={{ position: "absolute", top: 0, right: 0, padding: "4px 12px", background: "rgba(74,222,128,0.09)", borderBottom: "1px solid rgba(74,222,128,0.2)", borderLeft: "1px solid rgba(74,222,128,0.2)", borderRadius: "0 12px 0 8px", color: "#4ade80", fontSize: 9, letterSpacing: 2, fontWeight: 700, textTransform: "uppercase" }}>Actively Filling</div>}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 18 }}>{mandate.flag}</span>
            <span style={{ color: "rgba(201,161,74,0.6)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>{mandate.tag}</span>
          </div>
          <div style={{ color: "#fff", fontSize: 15, fontWeight: 600, marginBottom: 4, lineHeight: 1.3 }}>{mandate.title}</div>
          <div style={{ color: "rgba(255,255,255,0.38)", fontSize: 13, marginBottom: 14 }}>{mandate.subtitle} · {mandate.location}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            <div style={{ padding: "4px 12px", borderRadius: 5, background: "rgba(201,161,74,0.07)", border: "1px solid rgba(201,161,74,0.15)", color: "rgba(201,161,74,0.8)", fontSize: 11 }} title="Indicative range only — final package subject to negotiation">{mandate.comp_base} <span style={{ fontSize: 9, opacity: 0.6 }}>est.</span></div>
            <div style={{ padding: "4px 12px", borderRadius: 5, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.3)", fontSize: 11 }}>{mandate.aum}</div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={() => onView(mandate)} style={{ background: "none", border: "1px solid rgba(255,255,255,0.18)", color: "rgba(255,255,255,0.6)", padding: "9px 20px", borderRadius: 8, fontSize: 11, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer", fontFamily: font, transition: "all 0.15s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,161,74,0.45)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
            >View Brief</button>
            <button onClick={() => onScreen(mandate)} style={{ background: `linear-gradient(135deg,${gold} 0%,#9a7030 100%)`, color: bg, border: "none", padding: "9px 20px", borderRadius: 8, fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer", fontFamily: font }}>
              Apply →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────────────────────
export default function EPMandates() {
  const [selected, setSelected] = useState<Mandate | null>(null);
  const [screening, setScreening] = useState<Mandate | null>(null);
  const [filter, setFilter] = useState("All");
  const topRef = useRef(null);

  const hubs = ["All", "Geneva", "Zurich", "Milan", "Hong Kong", "Singapore"];
  const hubMap = { Geneva: m => m.location.toLowerCase().includes("geneva"), Zurich: m => m.location.toLowerCase().includes("zurich"), Milan: m => m.location.toLowerCase().includes("milan"), "Hong Kong": m => m.location.toLowerCase().includes("hong kong"), Singapore: m => m.location.toLowerCase().includes("singapore") };
  const visible = filter === "All" ? MANDATES : MANDATES.filter(hubMap[filter] || (() => true));

  const openFull = (mandate) => { setSelected(mandate); setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50); };
  const goBack = () => { setSelected(null); setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50); };

  return (
    <div style={{ minHeight: "100vh", background: bg, fontFamily: font, paddingBottom: 80 }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:none; } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        * { box-sizing:border-box; } button:focus { outline:none; }
        ::-webkit-scrollbar { width:3px; } ::-webkit-scrollbar-thumb { background:rgba(201,161,74,0.2); }
        input::placeholder { color:rgba(255,255,255,0.2); }
      `}</style>
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, background: "radial-gradient(ellipse 80% 45% at 50% 0%, rgba(27,58,107,0.4) 0%, transparent 65%)" }} />

      {screening && <ScreeningModal mandate={screening} onClose={() => setScreening(null)} onPass={() => { openFull(screening); setScreening(null); }} />}

      <div ref={topRef} style={{ position: "sticky", top: 0, zIndex: 20, borderBottom: "1px solid rgba(201,161,74,0.1)", padding: "13px 24px", display: "flex", alignItems: "center", gap: 12, background: "rgba(7,17,31,0.93)", backdropFilter: "blur(14px)" }}>
        <img src={LOGO_SRC} alt="Executive Partners" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
        <div>
          <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>Active Mandates</div>
          <div style={{ color: "rgba(201,161,74,0.45)", fontSize: 10, letterSpacing: 1.5 }}>EXECUTIVE PARTNERS · {MANDATES.length} LIVE ROLES · CONFIDENTIAL</div>
        </div>
        <a href="https://www.execpartners.ch/en/contact" target="_blank" rel="noopener noreferrer" style={{ marginLeft: "auto", background: `linear-gradient(135deg,${gold} 0%,#9a7030 100%)`, color: bg, padding: "8px 18px", borderRadius: 6, fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", textDecoration: "none" }}>Contact</a>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 20px 0", position: "relative", zIndex: 1 }}>
        {!selected ? (
          <>
            <div style={{ marginBottom: 32, animation: "fadeUp 0.4s both" }}>
              <div style={{ color: "rgba(201,161,74,0.55)", fontSize: 10, letterSpacing: 4, textTransform: "uppercase", marginBottom: 14 }}>Geneva · Zurich · Milan · Dubai · Singapore · Hong Kong</div>
              <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 400, lineHeight: 1.25, margin: "0 0 14px", letterSpacing: -0.5 }}>Private Banking Mandates</h1>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, lineHeight: 1.75, margin: 0, maxWidth: 480 }}>Ten active searches. Each brief written with the specificity a serious candidate deserves. Click Apply to check your fit in under 90 seconds.</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28, animation: "fadeUp 0.4s 0.05s both" }}>
              {hubs.map(h => (
                <button key={h} onClick={() => setFilter(h)} style={{ padding: "6px 14px", borderRadius: 20, border: "1px solid", borderColor: filter === h ? "rgba(201,161,74,0.6)" : "rgba(255,255,255,0.08)", background: filter === h ? "rgba(201,161,74,0.1)" : "rgba(255,255,255,0.02)", color: filter === h ? gold : "rgba(255,255,255,0.35)", fontSize: 11, cursor: "pointer", fontFamily: font, transition: "all 0.15s" }}>{h}</button>
              ))}
              <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, marginLeft: "auto", alignSelf: "center" }}>{visible.length} mandate{visible.length !== 1 ? "s" : ""}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {visible.map((m, i) => <MandateCard key={m.id} mandate={m} idx={i} onScreen={setScreening} onView={openFull} />)}
            </div>
            <div style={{ marginTop: 40, padding: "28px", background: "rgba(201,161,74,0.04)", border: "1px solid rgba(201,161,74,0.15)", borderRadius: 12, textAlign: "center", animation: "fadeUp 0.4s 0.3s both" }}>
              <div style={{ color: gold, fontSize: 10, letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>Not seeing your market?</div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, lineHeight: 1.75, margin: "0 0 18px", maxWidth: 380, marginLeft: "auto", marginRight: "auto" }}>We run confidential mandates not listed here. Senior bankers with the right profile are introduced directly.</p>
              <a href="https://www.execpartners.ch/en/contact" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: `linear-gradient(135deg,${gold} 0%,#9a7030 100%)`, color: bg, padding: "12px 32px", borderRadius: 3, fontSize: 11, fontWeight: 700, letterSpacing: 2.5, textTransform: "uppercase", textDecoration: "none" }}>Speak with Gil M. Chalem →</a>
            </div>
          </>
        ) : (
          <MandatePage mandate={selected} onBack={goBack} onApply={setScreening} />
        )}
      </div>
    </div>
  );
}
