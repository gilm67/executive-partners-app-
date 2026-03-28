// @ts-nocheck
"use client";

import { useState, useRef, useEffect } from "react";

const MANDATES = [
  { id: "rm-brazil-ch", tag: "LATAM · Brazil", title: "Senior Relationship Manager", subtitle: "Brazilian Market", location: "Zurich or Geneva", flag: "🇧🇷", aum: "CHF 250M+", aum_note: "3-year average portable book", comp_base: "CHF 180K – 280K", comp_note: "base · bonus · NPC buyout available", urgent: false,
    profile_lines: ["Personal ownership of Brazilian HNW and UHNW family relationships — not team or institutionally supported", "Minimum CHF 250M portable book measured over 3-year average", "5+ years managing Brazilian clients within a Swiss or international private bank"],
    brief: `A well-capitalised Swiss private bank with an established Latin American desk is looking to add a dedicated senior banker for the Brazilian market. This is not a build-from-scratch mandate — the infrastructure exists. What they need is a relationship manager who personally owns Brazilian HNW and UHNW client relationships and can demonstrate genuine portability.\n\nThe candidate has spent the majority of their private banking career managing Brazilian families and entrepreneurs, understands the specificities of Brazilian offshore wealth, knows the compliance and reporting framework, and holds relationships that are genuinely portable — meaning clients who would follow them, not clients managed within a shared team context.\n\nThe bank fully understands that LATAM portability takes time and is prepared to offer a structured NPC contribution and a realistic transition window. Location is Zurich or Geneva — both genuinely open.`,
    process: "Confidential call with Executive Partners · Single senior introduction · No panels",
    screening: [
      { q: "How many years have you personally managed Brazilian clients in a private banking context?", options: [{ label: "Under 2 years", pass: false }, { label: "2 – 4 years", pass: "warn" }, { label: "5 – 9 years", pass: true }, { label: "10 years or more", pass: true }] },
      { q: "What is your current AUM under direct personal management (not team AUM)?", options: [{ label: "Under CHF 100M", pass: false }, { label: "CHF 100M – 200M", pass: "warn" }, { label: "CHF 200M – 350M", pass: true }, { label: "Over CHF 350M", pass: true }] },
      { q: "What proportion of your book do you believe is portable based on personal client relationships?", options: [{ label: "I'm not sure", pass: false }, { label: "Under 25%", pass: false }, { label: "25% – 50%", pass: "warn" }, { label: "Over 50%", pass: true }] },
      { q: "Do you currently have a non-compete or non-solicit agreement?", options: [{ label: "No NCA / NDA", pass: true }, { label: "Yes — under 6 months", pass: true }, { label: "Yes — 6 to 12 months", pass: "warn" }, { label: "Yes — over 12 months", pass: false }] },
      { q: "Are you currently based in Switzerland or prepared to relocate to Zurich or Geneva?", options: [{ label: "Yes, already based there", pass: true }, { label: "Open to relocating", pass: true }, { label: "Not open to relocation", pass: false }] },
    ],
  },
  { id: "rm-argentina-ch", tag: "LATAM · Argentina", title: "Senior Relationship Manager", subtitle: "Argentine Market", location: "Zurich or Geneva", flag: "🇦🇷", aum: "CHF 250M+", aum_note: "3-year average portable book", comp_base: "CHF 180K – 280K", comp_note: "base · bonus · NPC buyout available", urgent: false,
    profile_lines: ["Personal ownership of Argentine HNW and UHNW family or entrepreneur relationships", "Minimum CHF 250M portable book measured over 3-year average", "Deep understanding of Argentine offshore wealth and cross-border compliance"],
    brief: `A separate mandate from the Brazilian search — the hiring bank is the same, but the Argentine market operates on different dynamics and they are looking for a dedicated specialist, not a combined LATAM generalist.\n\nArgentine HNW and UHNW wealth has distinct characteristics: currency controls, capital flight history, the importance of trust built over years often spanning generations, and a client base that is acutely attuned to political risk. The right candidate understands these dynamics from experience, not from a briefing document.\n\nThe bank is realistic about portability timelines in this market and offers a structured transition package. Zurich or Geneva — both open.`,
    process: "Confidential call with Executive Partners · Single senior introduction · No panels",
    screening: [
      { q: "How many years have you personally managed Argentine clients in a private banking context?", options: [{ label: "Under 2 years", pass: false }, { label: "2 – 4 years", pass: "warn" }, { label: "5 – 9 years", pass: true }, { label: "10 years or more", pass: true }] },
      { q: "What is your current AUM under direct personal management?", options: [{ label: "Under CHF 100M", pass: false }, { label: "CHF 100M – 200M", pass: "warn" }, { label: "CHF 200M – 350M", pass: true }, { label: "Over CHF 350M", pass: true }] },
      { q: "How familiar are you with Argentine offshore wealth structures and cross-border compliance?", options: [{ label: "No specific knowledge", pass: false }, { label: "General awareness only", pass: "warn" }, { label: "Working knowledge from experience", pass: true }, { label: "Deep expertise — managing it daily", pass: true }] },
      { q: "Do you currently have a non-compete or non-solicit agreement?", options: [{ label: "No NCA / NDA", pass: true }, { label: "Yes — under 6 months", pass: true }, { label: "Yes — 6 to 12 months", pass: "warn" }, { label: "Yes — over 12 months", pass: false }] },
      { q: "Are you based in Switzerland or prepared to relocate to Zurich or Geneva?", options: [{ label: "Yes, already based there", pass: true }, { label: "Open to relocating", pass: true }, { label: "Not open to relocation", pass: false }] },
    ],
  },
  { id: "swiss-onshore-geneva", tag: "Switzerland · Onshore", title: "Senior Relationship Manager", subtitle: "Swiss Onshore Market", location: "Geneva", flag: "🇨🇭", aum: "CHF 150M+", aum_note: "3-year average portable book", comp_base: "CHF 160K – 240K", comp_note: "base · performance bonus · retention structure", urgent: false,
    profile_lines: ["Swiss-resident HNW and UHNW book built through genuine advisory relationships — not institutionally held", "Minimum CHF 150M portable book measured over 3-year average", "Wealth planning and credit structuring depth valued · French an advantage"],
    brief: `Swiss onshore private banking at an institution with a genuine domestic franchise — strong balance sheet, real credit capability, and the wealth planning infrastructure that Swiss-domiciled HNW and UHNW clients expect.\n\nThe candidate manages Swiss-resident clients across HNW and UHNW, predominantly at UHNW level, with a book built over years of trusted advisory work. The distinction between clients who bank with an institution and clients who follow a banker is important here — this role requires the latter.\n\nThis is a Geneva-based role. No relocation dynamic.`,
    process: "Confidential call with Executive Partners · One meeting with hiring team",
    screening: [
      { q: "What proportion of your current book consists of Swiss-domiciled clients?", options: [{ label: "Under 30%", pass: false }, { label: "30% – 60%", pass: "warn" }, { label: "Over 60%", pass: true }, { label: "Exclusively Swiss onshore", pass: true }] },
      { q: "What is your AUM under direct personal management (not team AUM)?", options: [{ label: "Under CHF 80M", pass: false }, { label: "CHF 80M – 150M", pass: "warn" }, { label: "CHF 150M – 300M", pass: true }, { label: "Over CHF 300M", pass: true }] },
      { q: "How would you describe your Swiss wealth planning knowledge?", options: [{ label: "Limited — primarily investment advisory", pass: "warn" }, { label: "Working knowledge of Swiss fiscal structures", pass: true }, { label: "Deep — manage succession and estate planning regularly", pass: true }] },
      { q: "Are you currently based in Geneva or the Geneva region?", options: [{ label: "Yes", pass: true }, { label: "No but open to relocating to Geneva", pass: true }, { label: "No and not prepared to relocate", pass: false }] },
    ],
  },
  { id: "greece-cyprus-geneva", tag: "Greece · Cyprus", title: "Senior Relationship Manager", subtitle: "Greek & Cypriot Market", location: "Geneva", flag: "🇬🇷🇨🇾", aum: "CHF 200M+", aum_note: "3-year average portable book", comp_base: "CHF 170K – 260K", comp_note: "base · competitive bonus · relocation support", urgent: false,
    profile_lines: ["Known in the Greek and Cypriot HNW and UHNW community — family or entrepreneur-level personal relationships", "Greek language fluency mandatory", "Minimum CHF 200M portable book measured over 3-year average"],
    brief: `A market where timing matters. Greek and Cypriot HNW and UHNW clients are currently reassessing long-standing bank relationships following institutional changes across the sector. A motivated banker with strong community relationships is unusually well-placed right now.\n\nThe hiring bank has an established Greek and Cypriot client base and wants to deepen it. They are not looking for a business developer without a book — they want a senior banker who is known in the community, speaks Greek fluently, and holds personal HNW and UHNW relationships built over years. A three-year average portable book of CHF 200M is the minimum.`,
    process: "Confidential introduction through Executive Partners · One senior meeting",
    screening: [
      { q: "What is your Greek language level?", options: [{ label: "No Greek", pass: false }, { label: "Basic / conversational", pass: false }, { label: "Fluent — use it professionally", pass: true }, { label: "Native speaker", pass: true }] },
      { q: "How many years have you personally managed Greek or Cypriot HNW and UHNW clients?", options: [{ label: "Under 2 years", pass: false }, { label: "2 – 4 years", pass: "warn" }, { label: "5 – 9 years", pass: true }, { label: "10 years or more", pass: true }] },
      { q: "What is your AUM from Greek and Cypriot clients specifically?", options: [{ label: "Under CHF 80M", pass: false }, { label: "CHF 80M – 150M", pass: "warn" }, { label: "CHF 150M – 250M", pass: true }, { label: "Over CHF 250M", pass: true }] },
      { q: "Are you based in Geneva or prepared to relocate there?", options: [{ label: "Yes, already in Geneva", pass: true }, { label: "Open to relocating to Geneva", pass: true }, { label: "Not open to relocation", pass: false }] },
    ],
  },
  { id: "ia-cis-cee-geneva", tag: "CIS · CEE · Russian-speaking", title: "Investment Advisor", subtitle: "CIS & CEE Market — Geneva", location: "Geneva", flag: "🇷🇺", aum: "No minimum", aum_note: "Bank provides existing client base", comp_base: "CHF 140K – 220K", comp_note: "base · advisory performance bonus", urgent: true,
    profile_lines: ["Perfectly fluent in French and English · Very good Russian mandatory", "CFA, CIIA or CWMA a strong asset · min. 5 years investment advisory in private banking", "Strong knowledge of equities, derivatives, fixed income, structured products · no book required"],
    brief: `The Investment Advisor is responsible for delivering tailored investment advice and portfolio strategies to high-net-worth and ultra-high-net-worth individuals from the CIS and CEE region. Working closely with Relationship Managers, the IA ensures clients receive comprehensive, risk-appropriate investment solutions aligned with their goals and profile.\n\nThis is a pure investment advisory mandate — not an RM role. The bank provides the client base. The candidate brings investment expertise: the ability to construct and optimise portfolios across asset classes, present strategies clearly, conduct regular portfolio reviews, and act as the trusted investment contact for existing clients in partnership with the RM team.\n\nThe role requires a university degree in Finance, Economics or equivalent. CFA, CIIA or CWMA is a strong asset. Minimum five years of experience in a similar investment advisory position within private banking. Very good knowledge of Russian is a strong differentiator for this mandate.`,
    process: "Direct introduction · Fast-track process for the right profile",
    screening: [
      { q: "What is your Russian language level?", options: [{ label: "None", pass: false }, { label: "Basic / beginner", pass: false }, { label: "Intermediate — can hold a conversation", pass: "warn" }, { label: "Fluent — use it with clients", pass: true }, { label: "Native speaker", pass: true }] },
      { q: "How many years have you worked as an Investment Advisor (not RM) in a private banking context?", options: [{ label: "Under 2 years", pass: false }, { label: "2 – 4 years", pass: "warn" }, { label: "5 – 8 years", pass: true }, { label: "Over 8 years", pass: true }] },
      { q: "Which investment certifications do you hold?", options: [{ label: "None and not enrolled", pass: "warn" }, { label: "Enrolled / in progress", pass: "warn" }, { label: "CWMA", pass: true }, { label: "CFA or CIIA", pass: true }] },
      { q: "What is your hands-on experience with derivatives and structured products?", options: [{ label: "No experience", pass: false }, { label: "Theoretical knowledge only", pass: false }, { label: "Some exposure — assisted on transactions", pass: "warn" }, { label: "Regular execution experience", pass: true }] },
      { q: "Are you currently based in Geneva or prepared to work on-site there?", options: [{ label: "Yes, already in Geneva", pass: true }, { label: "Open to relocating to Geneva", pass: true }, { label: "No — remote only", pass: false }] },
    ],
  },
  { id: "ia-cis-cee-zurich", tag: "CIS · CEE · Russian-speaking", title: "Investment Advisor", subtitle: "CIS & CEE Market — Zurich", location: "Zurich", flag: "🇷🇺", aum: "No minimum", aum_note: "Bank provides existing client base", comp_base: "CHF 140K – 220K", comp_note: "base · advisory performance bonus", urgent: true,
    profile_lines: ["Fluent Russian mandatory · German or French and English required", "CFA, CIIA or CWMA a strong asset · min. 5 years investment advisory in private banking", "Structured product execution experience required · no book needed"],
    brief: `A parallel mandate to the Geneva Investment Advisor search — a different institution, a separate CIS/CEE client base, based in Zurich. The investment advisory profile and client segment are comparable: Russian-speaking HNW and UHNW clients from the CIS and CEE region who require sophisticated, risk-appropriate investment advice.\n\nThe bank has an established book of CIS/CEE clients and is looking for an Investment Advisor with genuine product depth — someone who understands portfolio construction, can navigate derivatives and structured products with confidence, and builds trusted investment relationships over time.\n\nFor candidates open to both cities, Geneva and Zurich can be explored in parallel.`,
    process: "Direct introduction · Parallel process with Geneva mandate possible",
    screening: [
      { q: "What is your Russian language level?", options: [{ label: "None", pass: false }, { label: "Basic / beginner", pass: false }, { label: "Intermediate — can hold a conversation", pass: "warn" }, { label: "Fluent — use it with clients", pass: true }, { label: "Native speaker", pass: true }] },
      { q: "How many years have you worked as an Investment Advisor (not RM) in private banking?", options: [{ label: "Under 2 years", pass: false }, { label: "2 – 4 years", pass: "warn" }, { label: "5 – 8 years", pass: true }, { label: "Over 8 years", pass: true }] },
      { q: "What certifications do you hold?", options: [{ label: "None and not enrolled", pass: "warn" }, { label: "Enrolled / in progress", pass: "warn" }, { label: "CWMA", pass: true }, { label: "CFA or CIIA", pass: true }] },
      { q: "Are you based in Zurich or the greater Zurich area, or open to relocating?", options: [{ label: "Yes, already in Zurich area", pass: true }, { label: "Open to relocating to Zurich", pass: true }, { label: "No — Geneva only or remote", pass: false }] },
    ],
  },
  { id: "arm-russian-geneva", tag: "CIS · CEE · Assistant RM", title: "Assistant Relationship Manager", subtitle: "Emerging Markets · Russian-speaking", location: "Geneva", flag: "🇷🇺", aum: "N/A", aum_note: "Supporting role — no book required", comp_base: "CHF 90K – 130K", comp_note: "base · private banking bonus structure", urgent: true,
    profile_lines: ["Russian mandatory · French and English required · Swiss resident (hard requirement, no exceptions)", "Minimum 5 years private banking experience as assistant or junior RM — not back office", "Direct HNW and UHNW client interaction experience · KYC/AML operational depth"],
    brief: `The mission of this role is to assist the relationship manager(s) in opening new relationships and serving clients, in full compliance with the Bank's internal regulations and guidelines, within the Eastern Europe and CIS region.\n\nMain responsibilities include preparing all necessary documentation for client meetings and business trips, executing and monitoring stock exchange orders, forex transactions, fiduciary relationships, loans, payment orders and credit card applications, providing administrative support to the Team Head, and handling cash management. The role also involves assisting in AML clarifications and preparing client KYC files and related updates with direct client contact, direct interaction with clients by phone, email and occasionally in meetings, and preparing and monitoring account openings, closings and mutations.\n\nThe required profile includes a degree in a related field (banking apprenticeship, CYP, banking internship or equivalent), a minimum of five years of experience in a similar role within a private bank, and strong banking and KYC knowledge. A Private Banking certificate, CWMA or equivalent certification is a plus. Perfectly fluent French and English are required. Russian is a strong added value for this mandate — in practice, it is close to mandatory given the client base. Swiss residency is a hard requirement with no exceptions.`,
    process: "Confidential call with Executive Partners · One team interview at the bank",
    screening: [
      { q: "Are you currently a Swiss resident with a valid work permit or Swiss/EU citizenship?", options: [{ label: "Yes — Swiss citizen or C/B permit holder", pass: true }, { label: "No — but eligible to apply independently", pass: "warn" }, { label: "No — would require bank sponsorship", pass: false }] },
      { q: "What is your Russian language level?", options: [{ label: "None", pass: false }, { label: "Basic only", pass: false }, { label: "Professional working level", pass: true }, { label: "Native or bilingual", pass: true }] },
      { q: "What is your French language level?", options: [{ label: "None or basic", pass: false }, { label: "Intermediate — B1/B2", pass: "warn" }, { label: "Professional working level — C1", pass: true }, { label: "Native or bilingual", pass: true }] },
      { q: "How many years have you worked as an assistant RM or in a direct private banking support role with HNW and UHNW client contact?", options: [{ label: "Under 2 years", pass: false }, { label: "2 – 4 years", pass: "warn" }, { label: "5 – 8 years", pass: true }, { label: "Over 8 years", pass: true }] },
      { q: "Have you executed stock exchange orders, forex transactions or fiduciary placements directly?", options: [{ label: "No — administrative only", pass: false }, { label: "Occasionally, with supervision", pass: "warn" }, { label: "Yes — regularly and independently", pass: true }] },
    ],
  },
  { id: "rm-italy-ch", tag: "Italy · Italian Market", title: "Senior Relationship Manager", subtitle: "Italian Market", location: "Zurich, Geneva or Lugano", flag: "🇮🇹", aum: "CHF 200M+", aum_note: "3-year average portable book", comp_base: "CHF 180K – 300K", comp_note: "base · performance bonus · NPC buyout available", urgent: false,
    profile_lines: ["Personal ownership of Italian HNW and UHNW client relationships managed from a Swiss booking centre", "Minimum CHF 200M portable book measured over 3-year average — Italian clients specifically", "Cross-border regulatory expertise (Italy / Switzerland) and Italian language mandatory"],
    brief: `A Swiss-based mandate covering the Italian market — Zurich, Geneva or Lugano, with the location determined by the candidate's preference and the bank's team structure. All three are genuinely open.\n\nThe hiring bank has a well-established Italian client franchise and wants to add a senior relationship manager who personally owns Italian HNW and UHNW relationships. This is not a greenfield mandate — the infrastructure, booking centre and product access are already in place. What they need is a banker with a real, portable Italian book who can deepen and develop existing relationships while selectively bringing their own.\n\nThe ideal candidate has spent the majority of their private banking career managing Italian clients from a Swiss platform, understands the cross-border regulatory framework on both sides, operates at the level of succession planning, real estate structuring and multi-generational family wealth rather than pure investment allocation, and holds relationships in their own name rather than through a team structure. A three-year average portable book of CHF 200M from Italian clients is the minimum threshold.\n\nLugano is particularly relevant for bankers with strong ties to the Northern Italian corridor. Geneva and Zurich suit candidates with a broader Italian UHNW offshore client base.`,
    process: "Confidential call with Executive Partners · Single senior introduction · No panels",
    screening: [
      { q: "What is your Italian language level?", options: [{ label: "None", pass: false }, { label: "Basic / intermediate", pass: false }, { label: "Fluent — professional use", pass: true }, { label: "Native speaker", pass: true }] },
      { q: "How many years have you personally managed Italian clients from a Swiss booking centre?", options: [{ label: "Under 2 years", pass: false }, { label: "2 – 4 years", pass: "warn" }, { label: "5 – 9 years", pass: true }, { label: "10 years or more", pass: true }] },
      { q: "What is your total AUM from Italian clients under direct personal management (not team AUM)?", options: [{ label: "Under CHF 80M", pass: false }, { label: "CHF 80M – 150M", pass: "warn" }, { label: "CHF 150M – 300M", pass: true }, { label: "Over CHF 300M", pass: true }] },
      { q: "How would you describe your knowledge of Italian cross-border compliance and Swiss-Italian regulatory requirements?", options: [{ label: "Limited — primarily investment advisory", pass: "warn" }, { label: "Working knowledge from experience", pass: true }, { label: "Deep expertise — managing it daily", pass: true }] },
      { q: "Are you currently based in Switzerland (Zurich, Geneva or Lugano) or prepared to relocate there?", options: [{ label: "Yes, already based in Switzerland", pass: true }, { label: "Open to relocating to Switzerland", pass: true }, { label: "Not open to Switzerland", pass: false }] },
    ],
  },
  { id: "rm-italy-milan", tag: "Italy · Italian Market", title: "Senior Relationship Manager", subtitle: "Italian Market", location: "Milan", flag: "🇮🇹", aum: "CHF 180M+", aum_note: "3-year average portable book", comp_base: "EUR 150K – 250K", comp_note: "base · performance bonus · business plan support", urgent: false,
    profile_lines: ["Career focused on Italian HNW and UHNW entrepreneur and family clients · Italian mandatory", "Cross-border regulatory knowledge (Italy / Switzerland) valued", "Managing succession, real estate structuring and multi-generational wealth conversations"],
    brief: `A Milan-based role at a bank with a genuine and growing Italian franchise. This is not a greenfield mandate — the bank has an existing Italian client base and wants to strengthen it at the senior level.\n\nThe right profile has spent the majority of a private banking career managing Italian HNW and UHNW clients and entrepreneurs, understands the regulatory environment on both sides of the border, and operates at the level of wealth structuring, succession and multi-generational planning.\n\nA three-year average portable book of CHF 180M is the minimum. The hiring institution is in the process of upgrading its Italian presence from a representative office to a fully licensed advisory operation — a significant platform commitment that opens meaningful long-term opportunities for a senior banker building a serious Italian franchise. Italian fluency is mandatory. The role is Milan-based; remote coverage is not an option.`,
    process: "Confidential introduction · One meeting with Geneva and Milan leadership",
    screening: [
      { q: "What is your Italian language level?", options: [{ label: "None", pass: false }, { label: "Basic / intermediate", pass: false }, { label: "Fluent — professional use", pass: true }, { label: "Native speaker", pass: true }] },
      { q: "What proportion of your current book consists of Italian HNW and UHNW clients?", options: [{ label: "Under 30%", pass: false }, { label: "30% – 60%", pass: "warn" }, { label: "Over 60%", pass: true }, { label: "Exclusively Italian clients", pass: true }] },
      { q: "What is your total AUM from Italian clients under direct personal management?", options: [{ label: "Under CHF 50M", pass: false }, { label: "CHF 50M – 120M", pass: "warn" }, { label: "CHF 120M – 250M", pass: true }, { label: "Over CHF 250M", pass: true }] },
      { q: "Are you based in Milan or prepared to be based there full-time?", options: [{ label: "Yes, already in Milan", pass: true }, { label: "Open to relocating to Milan", pass: true }, { label: "No — not open to Milan", pass: false }] },
    ],
  },
  { id: "rm-hong-kong", tag: "Asia Pacific · Hong Kong", title: "Senior Relationship Manager", subtitle: "Hong Kong", location: "Hong Kong", flag: "🇭🇰", aum: "USD/CHF 250M+", aum_note: "3-year average portable book", comp_base: "HKD 1.8M – 3M", comp_note: "base equivalent · bonus · relocation contribution", urgent: false,
    profile_lines: ["Personal HNW and UHNW relationships — Greater China, Southeast Asia or international clients booked in HK", "Minimum USD/CHF 250M portable book over 3-year average", "Mandarin or Cantonese an advantage · relocation package available"],
    brief: `A senior RM mandate at a private bank with a well-established Hong Kong presence and a client base spanning Greater China, Southeast Asia and international markets. The bank is hiring selectively at the senior level.\n\nThe candidate manages HNW and UHNW relationships personally and can demonstrate portability based on the depth and tenure of those relationships, not institutional loyalty. The bank places a premium on relationship quality — a banker with fifteen truly owned relationships is more interesting than one with fifty that belong to the institution.\n\nHong Kong residency or a firm willingness to relocate is required. The bank offers a competitive relocation package for the right candidate.`,
    process: "Confidential call with Executive Partners · Single introduction to hiring team",
    screening: [
      { q: "What is your total AUM under direct personal management?", options: [{ label: "Under USD 100M", pass: false }, { label: "USD 100M – 200M", pass: "warn" }, { label: "USD 200M – 350M", pass: true }, { label: "Over USD 350M", pass: true }] },
      { q: "What is the average tenure of your top 10 client relationships?", options: [{ label: "Under 2 years", pass: false }, { label: "2 – 4 years", pass: "warn" }, { label: "5 – 9 years", pass: true }, { label: "Over 10 years", pass: true }] },
      { q: "Do you hold or are you eligible for an SFC licence in Hong Kong?", options: [{ label: "Yes — active SFC licence", pass: true }, { label: "Previously held — can reactivate", pass: true }, { label: "Not yet but prepared to obtain one", pass: "warn" }, { label: "No and not interested", pass: false }] },
      { q: "Are you currently based in Hong Kong or prepared to relocate there?", options: [{ label: "Yes, based in Hong Kong", pass: true }, { label: "Open to relocating", pass: true }, { label: "No — not open to Hong Kong", pass: false }] },
    ],
  },
  { id: "rm-singapore", tag: "Asia Pacific · Singapore", title: "Senior Relationship Manager", subtitle: "Singapore", location: "Singapore", flag: "🇸🇬", aum: "CHF 250M+", aum_note: "3-year average portable book", comp_base: "SGD 280K – 450K", comp_note: "base · performance bonus · senior platform", urgent: false,
    profile_lines: ["Deep personal HNW and UHNW relationships — Southeast Asian, South Asian or international clients in Singapore", "Minimum CHF 250M portable book over 3-year average", "Family office, succession and multi-booking-centre experience valued"],
    brief: `Singapore-based private banking at an institution with a strong HNW and UHNW franchise. The bank is building at the senior level with deliberate selectivity — they are not filling a vacancy, they are adding a banker who genuinely strengthens the team.\n\nThe profile is a senior RM with deep, personally owned HNW and UHNW relationships and a portable book of CHF 250M or above on a three-year average. The bank values relationship depth over market breadth — a banker with fifteen deep relationships they truly own is more interesting than one with fifty superficial ones.\n\nMAS licence or eligibility is required. Singapore residency or willingness to relocate is expected.`,
    process: "Confidential call with Executive Partners · One meeting with senior leadership",
    screening: [
      { q: "What is your total AUM under direct personal management?", options: [{ label: "Under CHF 100M", pass: false }, { label: "CHF 100M – 200M", pass: "warn" }, { label: "CHF 200M – 350M", pass: true }, { label: "Over CHF 350M", pass: true }] },
      { q: "How many of your top clients have followed you from a previous institution?", options: [{ label: "None — all clients stayed at my last bank", pass: false }, { label: "A few — 1 to 3 clients", pass: "warn" }, { label: "Several — 4 or more clients", pass: true }, { label: "Most of my book has followed me before", pass: true }] },
      { q: "Do you hold or are you eligible for a MAS Capital Markets Services licence?", options: [{ label: "Yes — active MAS licence", pass: true }, { label: "Previously held — can reactivate", pass: true }, { label: "Not yet but prepared to obtain one", pass: "warn" }, { label: "No and not interested", pass: false }] },
      { q: "Are you currently based in Singapore or prepared to relocate there?", options: [{ label: "Yes, based in Singapore", pass: true }, { label: "Open to relocating", pass: true }, { label: "No — not open to Singapore", pass: false }] },
    ],
  },
  { id: "rm-uk-geneva", tag: "United Kingdom · UK Market", title: "Senior Relationship Manager", subtitle: "UK Market", location: "Geneva", flag: "🇬🇧", aum: "CHF 250M+", aum_note: "3-year average portable book", comp_base: "CHF 180K – 280K", comp_note: "base · bonus · NPC buyout available", urgent: false,
    profile_lines: ["Personal ownership of UK HNW and UHNW client relationships managed from Geneva", "Minimum CHF 250M portable book measured over 3-year average — UK clients specifically", "Understanding of UK resident and non-domiciled client structures · cross-border compliance knowledge"],
    brief: `A Geneva-based mandate covering the UK market. The hiring bank has an established British and UK-resident client base and is looking to strengthen its senior coverage with a relationship manager who personally owns HNW and UHNW relationships with UK families, entrepreneurs, non-domiciled residents and internationally mobile professionals.

The UK private wealth market from a Swiss booking centre has particular characteristics: non-dom structures, remittance basis planning, UK-resident clients with international assets, and families with multi-jurisdictional footprints that require careful cross-border coordination. The right candidate understands these dynamics in practice, not just in principle.

The ideal profile has spent a meaningful part of their private banking career managing UK clients from a Swiss or international platform, holds relationships in their own name, and can demonstrate genuine portability based on personal client trust rather than institutional proximity. A three-year average portable book of CHF 250M from UK clients is the minimum threshold.`,
    process: "Confidential call with Executive Partners · Single senior introduction · No panels",
    screening: [
      { q: "How many years have you personally managed UK clients in a private banking context?", options: [{ label: "Under 2 years", pass: false }, { label: "2 – 4 years", pass: "warn" }, { label: "5 – 9 years", pass: true }, { label: "10 years or more", pass: true }] },
      { q: "What is your current AUM under direct personal management from UK clients (not team AUM)?", options: [{ label: "Under CHF 100M", pass: false }, { label: "CHF 100M – 200M", pass: "warn" }, { label: "CHF 200M – 350M", pass: true }, { label: "Over CHF 350M", pass: true }] },
      { q: "How familiar are you with UK non-dom structures, remittance basis planning and UK cross-border compliance?", options: [{ label: "No specific knowledge", pass: false }, { label: "General awareness only", pass: "warn" }, { label: "Working knowledge from experience", pass: true }, { label: "Deep expertise — managing it daily", pass: true }] },
      { q: "Do you currently have a non-compete or non-solicit agreement?", options: [{ label: "No NCA / NDA", pass: true }, { label: "Yes — under 6 months", pass: true }, { label: "Yes — 6 to 12 months", pass: "warn" }, { label: "Yes — over 12 months", pass: false }] },
      { q: "Are you currently based in Geneva or prepared to relocate there?", options: [{ label: "Yes, already in Geneva", pass: true }, { label: "Open to relocating to Geneva", pass: true }, { label: "Not open to relocation", pass: false }] },
    ],
  },
  { id: "rm-south-africa-geneva", tag: "Africa · South Africa", title: "Senior Relationship Manager", subtitle: "South African Market", location: "Geneva", flag: "🇿🇦", aum: "CHF 250M+", aum_note: "3-year average portable book", comp_base: "CHF 170K – 270K", comp_note: "base · bonus · NPC buyout available", urgent: false,
    profile_lines: ["Personal ownership of South African HNW and UHNW client relationships — not institutionally held", "Minimum CHF 250M portable book measured over 3-year average", "Deep knowledge of South African offshore wealth, exchange control regulations and cross-border compliance"],
    brief: `A Geneva-based mandate for a senior private banker with a genuinely owned South African client base. The hiring bank has an established African desk and is looking to strengthen its South African coverage with a relationship manager who holds personal UHNW and HNW relationships — families, entrepreneurs and business owners who have accumulated wealth offshore and require sophisticated wealth management solutions from a serious Swiss platform.\n\nThe right candidate has spent the majority of their private banking career managing South African clients, understands the nuances of South African exchange control regulations and the SARB framework, knows how to structure compliant cross-border wealth arrangements, and holds relationships that are genuinely portable — built on personal trust rather than institutional loyalty.\n\nSouth Africa is a market where relationship depth matters considerably more than institutional brand. The bank offers a strong platform, competitive NPC contribution and a realistic transition window for the right profile.`,
    process: "Confidential call with Executive Partners · Single senior introduction · No panels",
    screening: [
      { q: "How many years have you personally managed South African clients in a private banking context?", options: [{ label: "Under 2 years", pass: false }, { label: "2 – 4 years", pass: "warn" }, { label: "5 – 9 years", pass: true }, { label: "10 years or more", pass: true }] },
      { q: "What is your current AUM under direct personal management from South African clients (not team AUM)?", options: [{ label: "Under CHF 100M", pass: false }, { label: "CHF 100M – 200M", pass: "warn" }, { label: "CHF 200M – 350M", pass: true }, { label: "Over CHF 350M", pass: true }] },
      { q: "How familiar are you with South African exchange control regulations and SARB compliance requirements?", options: [{ label: "No specific knowledge", pass: false }, { label: "General awareness only", pass: "warn" }, { label: "Working knowledge from experience", pass: true }, { label: "Deep expertise — managing it daily", pass: true }] },
      { q: "Do you currently have a non-compete or non-solicit agreement?", options: [{ label: "No NCA / NDA", pass: true }, { label: "Yes — under 6 months", pass: true }, { label: "Yes — 6 to 12 months", pass: "warn" }, { label: "Yes — over 12 months", pass: false }] },
      { q: "Are you currently based in Geneva or prepared to relocate there?", options: [{ label: "Yes, already in Geneva", pass: true }, { label: "Open to relocating to Geneva", pass: true }, { label: "Not open to relocation", pass: false }] },
    ],
  },
  { id: "rm-south-africa-london", tag: "Africa · South Africa", title: "Senior Relationship Manager", subtitle: "South African Market", location: "London", flag: "🇿🇦", aum: "CHF 250M+", aum_note: "3-year average portable book", comp_base: "GBP 150K – 250K", comp_note: "base · bonus · NPC buyout available", urgent: false,
    profile_lines: ["Personal ownership of South African HNW and UHNW client relationships managed from London", "Minimum CHF 250M portable book measured over 3-year average", "Understanding of South African offshore wealth, exchange control and cross-border compliance from a UK booking centre"],
    brief: `A London-based mandate covering the South African market — a separate search from the Geneva role, different institution, different booking centre, different team structure. Both can be explored in parallel for candidates open to either city.\n\nLondon is a natural hub for South African private wealth — proximity to the diaspora community, strong legal and structuring infrastructure, and a client base that is comfortable with a UK booking centre. The hiring bank has an established South African client base in London and is looking for a senior relationship manager who personally owns HNW and UHNW relationships with South African families, entrepreneurs and business owners.\n\nThe right candidate understands South African offshore wealth dynamics — exchange control, SARB compliance, the motivations behind offshore structuring — and holds relationships that have been built over years of trusted personal advisory work rather than institutional proximity. A three-year average portable book of CHF 250M is the minimum threshold.`,
    process: "Confidential call with Executive Partners · Single senior introduction · No panels",
    screening: [
      { q: "How many years have you personally managed South African clients in a private banking context?", options: [{ label: "Under 2 years", pass: false }, { label: "2 – 4 years", pass: "warn" }, { label: "5 – 9 years", pass: true }, { label: "10 years or more", pass: true }] },
      { q: "What is your current AUM under direct personal management from South African clients (not team AUM)?", options: [{ label: "Under CHF 100M", pass: false }, { label: "CHF 100M – 200M", pass: "warn" }, { label: "CHF 200M – 350M", pass: true }, { label: "Over CHF 350M", pass: true }] },
      { q: "How familiar are you with South African exchange control regulations and SARB compliance requirements?", options: [{ label: "No specific knowledge", pass: false }, { label: "General awareness only", pass: "warn" }, { label: "Working knowledge from experience", pass: true }, { label: "Deep expertise — managing it daily", pass: true }] },
      { q: "Do you currently have a non-compete or non-solicit agreement?", options: [{ label: "No NCA / NDA", pass: true }, { label: "Yes — under 6 months", pass: true }, { label: "Yes — 6 to 12 months", pass: "warn" }, { label: "Yes — over 12 months", pass: false }] },
      { q: "Are you currently based in London or prepared to relocate there?", options: [{ label: "Yes, already in London", pass: true }, { label: "Open to relocating to London", pass: true }, { label: "Not open to relocation", pass: false }] },
    ],
  },

];

const HUBS = ["All", "Geneva", "Zurich", "Lugano", "London", "Milan", "Hong Kong", "Singapore"];

function ScreeningModal({ mandate, onClose, onPass }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [fails, setFails] = useState([]);
  const [warns, setWarns] = useState([]);
  const allAnswered = mandate.screening.every((_, i) => answers[i] !== undefined);
  const submit = () => {
    const f = [], w = [];
    mandate.screening.forEach((s, i) => {
      const chosen = answers[i];
      if (!chosen) return;
      if (chosen.pass === false) f.push({ q: s.q, chosen: chosen.label });
      if (chosen.pass === "warn") w.push({ q: s.q, chosen: chosen.label });
    });
    setFails(f); setWarns(w); setSubmitted(true);
    if (f.length === 0) setTimeout(() => { onClose(); onPass(); }, 1100);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="w-full max-w-lg max-h-[88vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0B0E13] p-6 shadow-2xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brandGoldSoft mb-1">Quick Qualification Check</p>
            <h3 className="text-lg font-bold text-white">{mandate.title}</h3>
            <p className="text-sm text-neutral-400">{mandate.location}</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white text-2xl leading-none ml-4">×</button>
        </div>
        <p className="text-sm text-neutral-400 leading-relaxed mb-5 pb-4 border-b border-white/10">A few targeted questions to confirm you meet the core criteria. Takes under 90 seconds.</p>
        {!submitted ? (
          <>
            {mandate.screening.map((s, i) => (
              <div key={i} className={`mb-5 ${i < mandate.screening.length - 1 ? "pb-5 border-b border-white/[0.06]" : ""}`}>
                <p className="text-sm font-medium text-white/90 leading-relaxed mb-3">{s.q}</p>
                <div className="flex flex-col gap-2">
                  {s.options.map((opt, j) => {
                    const sel = answers[i]?.label === opt.label;
                    const cls = sel
                      ? opt.pass === true ? "border-green-500/60 bg-green-500/10 text-green-400"
                        : opt.pass === false ? "border-red-500/60 bg-red-500/10 text-red-400"
                        : "border-amber-500/60 bg-amber-500/10 text-amber-400"
                      : "border-white/10 bg-white/[0.03] text-neutral-400 hover:border-white/20 hover:text-white";
                    return <button key={j} onClick={() => setAnswers(p => ({ ...p, [i]: opt }))} className={`text-left px-4 py-2.5 rounded-xl border text-sm transition-all ${cls}`}>{opt.label}</button>;
                  })}
                </div>
              </div>
            ))}
            <button onClick={submit} disabled={!allAnswered} className={`w-full py-3 rounded-xl text-sm font-semibold tracking-wide transition-all ${allAnswered ? "bg-brandGold text-black hover:bg-brandGoldSoft" : "bg-white/5 text-white/20 cursor-not-allowed"}`}>Submit →</button>
          </>
        ) : fails.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">✓</div>
            <p className="text-green-400 font-semibold text-lg mb-2">Profile looks strong</p>
            {warns.length > 0 && <p className="text-amber-400/70 text-sm mb-2">A few points to discuss — we'll cover them in our call.</p>}
            <p className="text-neutral-400 text-sm">Opening the mandate brief…</p>
          </div>
        ) : (
          <div>
            <div className="rounded-xl border border-red-500/20 bg-red-500/[0.07] p-4 mb-4">
              <p className="text-red-400 text-sm font-semibold mb-3">{fails.length} criteria not met for this mandate</p>
              {fails.map((f, i) => (
                <div key={i} className={`${i < fails.length - 1 ? "mb-3 pb-3 border-b border-red-500/10" : ""}`}>
                  <p className="text-white/60 text-xs leading-relaxed mb-1">{f.q}</p>
                  <p className="text-red-400/70 text-xs">Your answer: {f.chosen}</p>
                </div>
              ))}
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed mb-4">This mandate may not be the right fit right now. A 15-minute call with Gil M. Chalem will give you an honest picture of your options.</p>
            <a href="/en/contact" className="block text-center rounded-xl border border-brandGold/40 bg-brandGold/10 px-4 py-3 text-sm font-semibold text-brandGoldPale hover:bg-brandGold/20 hover:text-white transition mb-3">Speak with Gil M. Chalem →</a>
            <button onClick={onClose} className="w-full text-white/25 text-sm py-2 hover:text-white/50 transition">Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

function MandatePage({ mandate, onBack, onApply }) {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div>
      <button onClick={onBack} className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition mb-8">← All Mandates</button>
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center rounded-full border border-brandGold/30 bg-brandGold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-brandGoldSoft">{mandate.tag}</span>
          {mandate.urgent && <span className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-green-400">Actively Filling</span>}
          {mandate.ubp_ref && <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-neutral-400">{mandate.ubp_ref}</span>}
        </div>
        <div className="text-4xl mb-3">{mandate.flag}</div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">{mandate.title}</h1>
        <p className="text-xl text-neutral-300">{mandate.subtitle} · {mandate.location}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))] p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brandGoldSoft mb-2">Indicative Compensation</p>
          <p className="text-2xl font-bold text-white mb-1">{mandate.comp_base}</p>
          <p className="text-sm text-neutral-400 mb-3">{mandate.comp_note}</p>
          <p className="text-xs text-neutral-500 italic leading-relaxed">Indicative range only. Final package determined by the hiring institution based on experience, seniority and negotiation.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))] p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 mb-2">Portable Book</p>
          <p className="text-2xl font-bold text-white mb-1">{mandate.aum}</p>
          <p className="text-sm text-neutral-400">{mandate.aum_note}</p>
        </div>
      </div>
      <div className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-4">The Opportunity</p>
        {mandate.brief.split("\n\n").map((p, i) => <p key={i} className="text-neutral-300 leading-relaxed mb-4 text-[15px]">{p}</p>)}
      </div>
      <div className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))] p-5 mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-4">Ideal Profile</p>
        <ul className="space-y-3">
          {mandate.profile_lines.map((line, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brandGold shrink-0 opacity-70" />
              <span className="text-sm text-neutral-300 leading-relaxed">{line}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-3">Process</p>
        <div className="flex flex-wrap gap-2">
          {mandate.process.split(" · ").map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-white/20 text-sm">·</span>}
              <span className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-neutral-400">{step}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-brandGold/25 bg-[linear-gradient(135deg,rgba(201,161,74,.08),rgba(27,58,107,.12))] p-7 mb-6 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brandGoldSoft mb-2">Interested in this mandate?</p>
        <p className="text-sm text-neutral-400 leading-relaxed mb-5 max-w-sm mx-auto">A short qualification check — under 90 seconds — then register your interest confidentially. No CV required.</p>
        <button onClick={() => onApply(mandate)} className="inline-flex items-center gap-2 rounded-xl border border-brandGold/70 bg-brandGold px-8 py-3 text-sm font-bold text-black hover:bg-brandGoldSoft transition shadow-[0_4px_20px_rgba(201,161,74,.25)]">Apply for this Role →</button>
        <p className="text-white/15 text-[10px] mt-4 tracking-widest">100% CONFIDENTIAL · GDPR COMPLIANT</p>
      </div>
      <div className="pt-4 border-t border-white/10 flex justify-between items-center flex-wrap gap-4">
        <p className="text-xs text-neutral-500">Executive Partners · Geneva · <span className="text-brandGoldSoft">gil.chalem@execpartners.ch</span></p>
        <button onClick={onBack} className="text-xs text-neutral-400 hover:text-white transition border border-white/10 rounded-lg px-3 py-1.5">← All mandates</button>
      </div>
    </div>
  );
}

function MandateCard({ mandate, onScreen, onView }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,.06),rgba(255,255,255,.03))] p-5 shadow-[0_1px_3px_rgba(0,0,0,.25)] transition hover:shadow-[0_8px_30px_rgba(0,0,0,.45)] hover:border-brandGold/20">
      <div className="pointer-events-none absolute inset-0 opacity-[.15]" style={{ background: "radial-gradient(700px 160px at 0% 0%, rgba(201,161,74,.35), transparent 60%)" }} />
      {mandate.urgent && <div className="absolute top-0 right-0 rounded-tr-2xl rounded-bl-xl border-b border-l border-green-500/20 bg-green-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-green-400">Actively Filling</div>}
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">{mandate.flag}</span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brandGoldSoft">{mandate.tag}</span>
        </div>
        <h3 className="text-xl font-bold text-white mb-1">{mandate.title}</h3>
        <p className="text-sm text-neutral-400 mb-4">{mandate.subtitle} · {mandate.location}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          <span className="inline-flex items-center rounded-full border border-brandGold/30 bg-brandGold/10 px-3 py-1 text-xs font-semibold text-brandGoldPale">{mandate.comp_base} <span className="opacity-50 ml-1 text-[10px]">est.</span></span>
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-400">{mandate.aum}</span>
          {mandate.ubp_ref && <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-neutral-500">{mandate.ubp_ref}</span>}
        </div>
        <div className="flex gap-3">
          <button onClick={() => onView(mandate)} className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-black/20 px-4 py-2 text-xs font-semibold text-neutral-300 hover:border-brandGold/30 hover:text-white transition">View Brief</button>
          <button onClick={() => onScreen(mandate)} className="inline-flex items-center gap-1.5 rounded-xl border border-brandGold/50 bg-brandGold/15 px-4 py-2 text-xs font-semibold text-brandGoldPale hover:bg-brandGold/25 hover:text-white transition">Apply →</button>
        </div>
      </div>
    </div>
  );
}

export default function MandatesClient() {
  const [screening, setScreening] = useState(null);
  const [filter, setFilter] = useState("All");
  const [selectedId, setSelectedId] = useState(null);
  const topRef = useRef(null);

  // Sync with URL on mount and browser navigation
  useEffect(() => {
    const sync = () => {
      const params = new URLSearchParams(window.location.search);
      setSelectedId(params.get("id"));
    };
    sync();
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  const selected = selectedId ? MANDATES.find(m => m.id === selectedId) || null : null;

  const visible = filter === "All" ? MANDATES : MANDATES.filter(m => m.location.toLowerCase().includes(filter.toLowerCase().split(" ")[0]));

  const openFull = (mandate) => {
    const url = "/en/jobs?id=" + mandate.id;
    window.history.pushState({}, "", url);
    setSelectedId(mandate.id);
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };
  const goBack = () => {
    window.history.pushState({}, "", "/en/jobs");
    setSelectedId(null);
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  return (
    <main className="relative min-h-screen bg-[#0B0E13] text-white" ref={topRef}>
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(1400px 500px at 10% -10%, rgba(201,161,74,.18) 0%, rgba(201,161,74,0) 55%), radial-gradient(1100px 420px at 110% 0%, rgba(245,231,192,.15) 0%, rgba(245,231,192,0) 60%)" }} />

      {screening && <ScreeningModal mandate={screening} onClose={() => setScreening(null)} onPass={() => { openFull(screening); setScreening(null); }} />}

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-14">
        {!selected ? (
          <>
            <div className="text-center mb-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brandGoldSoft/90 mb-3">Private Banking · Discreet Mandates</p>
              <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl mb-4">Private Banking Jobs in Switzerland</h1>
              <p className="mx-auto max-w-2xl text-neutral-300 leading-relaxed">
                Live mandates across <strong>Geneva</strong> and <strong>Zurich</strong>, with international coverage in <strong>Dubai</strong>, <strong>Singapore</strong>, <strong>London</strong> &amp; <strong>New York</strong>. We publish a subset of searches; confidential roles are shared directly with qualified bankers.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
                <a href="/en/apply" className="rounded-full border border-brandGold/40 bg-black/30 px-3 py-1 text-xs font-semibold text-brandGoldPale hover:bg-brandGold/12 hover:text-white transition">Submit CV</a>
                <a href="/en/candidates" className="rounded-full border border-brandGold/40 bg-black/30 px-3 py-1 text-xs font-semibold text-brandGoldPale hover:bg-brandGold/12 hover:text-white transition">Candidate Hub</a>
                <a href="/en/contact" className="rounded-full border border-brandGold/40 bg-black/30 px-3 py-1 text-xs font-semibold text-brandGoldPale hover:bg-brandGold/12 hover:text-white transition">Contact a Recruiter</a>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-6">
              {HUBS.map(h => (
                <button key={h} onClick={() => setFilter(h)} className={`rounded-full px-4 py-1.5 text-xs font-semibold border transition ${filter === h ? "border-brandGold/60 bg-brandGold/15 text-brandGoldPale" : "border-white/10 bg-white/[0.03] text-neutral-400 hover:border-white/20 hover:text-white"}`}>{h}</button>
              ))}
              <span className="ml-auto text-xs text-neutral-500">{visible.length} mandate{visible.length !== 1 ? "s" : ""}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              {visible.map((m, i) => <MandateCard key={m.id} mandate={m} onScreen={setScreening} onView={openFull} />)}
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-center">
              <p className="text-neutral-300 mb-4">Don't see your exact market? We run confidential mandates continuously.</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a href="/en/contact" className="inline-flex items-center gap-2 rounded-xl border border-brandGold/70 bg-brandGold/15 px-5 py-2.5 text-sm font-semibold text-brandGoldPale hover:bg-brandGold/25 hover:text-white transition">Contact us</a>
                <a href="/en/candidates" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-neutral-300 hover:bg-white/10 hover:text-white transition">Register confidentially</a>
              </div>
            </div>
          </>
        ) : (
          <MandatePage mandate={selected} onBack={goBack} onApply={setScreening} />
        )}
      </div>
    </main>
  );
}
