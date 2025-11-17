"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";

/* ------------------------------
   Types & configuration
------------------------------ */

type CoreDimensionKey =
  | "custodian"
  | "aum"
  | "licenses"
  | "product"
  | "concentration"
  | "compliance";

const CORE_DIMENSIONS: Array<{
  key: CoreDimensionKey;
  label: string;
  description: string;
}> = [
  {
    key: "custodian",
    label: "Custodian / Booking Centre Footprint",
    description:
      "CH, UK, UAE, SG, HK, US — the more relevant booking centres your clients can follow, the higher your portability.",
  },
  {
    key: "aum",
    label: "AUM Mix & Diversification",
    description:
      "Balanced advisory / DPM / lending books are easier to transfer than highly concentrated or single-product books.",
  },
  {
    key: "licenses",
    label: "Cross-Border Licenses",
    description:
      "FINMA outbound, FCA, DIFC/ADGM, MAS, SFC and bank-level permissions enabling compliant servicing.",
  },
  {
    key: "product",
    label: "Product Scope Breadth",
    description:
      "From core PB to structured products, private markets and alternatives — especially relevant for HNWI/UHNW and US/LatAm clients.",
  },
  {
    key: "concentration",
    label: "Client Concentration",
    description:
      "Lower concentration = lower attrition risk when moving between hubs (e.g. Geneva → Dubai, London → Zurich, Paris → Lisbon/Madrid).",
  },
  {
    key: "compliance",
    label: "Compliance & KYC Reuse",
    description:
      "CRS, FATCA, MiFID II, LSFin packs that can be reused → shorter onboarding and faster time-to-revenue.",
  },
];

const BOOKING_CENTRES = [
  "Geneva",
  "Zurich",
  "London",
  "Luxembourg",
  "Monaco",
  "Dubai (DIFC/ADGM)",
  "Abu Dhabi",
  "Singapore",
  "Hong Kong",
  "Miami",
  "New York",
  "Lisbon",
  "Madrid",
];

const REG_PERMISSIONS = [
  "FINMA outbound (CH)",
  "FCA (UK)",
  "DFSA / FSRA (UAE)",
  "MAS (Singapore)",
  "SFC (Hong Kong)",
  "SEC / US offshore",
  "MiFID / EU passport",
];

type AdvancedKey =
  | "aumDiversification"
  | "altsStructured"
  | "legalComplexity"
  | "kycReuse"
  | "pastPortability"
  | "relationshipDepth"
  | "teamDependency"
  | "platformFit";

type ProfileState = {
  market: string;
  mainHub: string;
  roaBps: number;
  recurringShare: number;
  eddShare: number;
  pepsShare: number;
};

/* ------------------------------
   Component
------------------------------ */

export default function PortabilityClient() {
  /* ----- Section 1: Basic profile ----- */

  const [profile, setProfile] = useState<ProfileState>({
    market: "CH Onshore",
    mainHub: "Geneva",
    roaBps: 80,
    recurringShare: 60,
    eddShare: 20,
    pepsShare: 5,
  });

  /* ----- Section 2: Core dimensions ----- */

  const [coreScores, setCoreScores] = useState<Record<CoreDimensionKey, number>>(
    {
      custodian: 3,
      aum: 3,
      licenses: 2,
      product: 3,
      concentration: 3,
      compliance: 2,
    }
  );

  /* ----- Section 3: Advanced factors ----- */

  const [advancedScores, setAdvancedScores] = useState<
    Record<AdvancedKey, number>
  >({
    aumDiversification: 3,
    altsStructured: 3,
    legalComplexity: 3,
    kycReuse: 3,
    pastPortability: 2,
    relationshipDepth: 3,
    teamDependency: 3,
    platformFit: 3,
  });

  const [bookingCentres, setBookingCentres] = useState<
    Record<string, boolean>
  >(() => {
    const initial: Record<string, boolean> = {};
    for (const bc of BOOKING_CENTRES) initial[bc] = false;
    return initial;
  });

  const [permissions, setPermissions] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const p of REG_PERMISSIONS) initial[p] = false;
    return initial;
  });

  /* ----- PDF capture ----- */

  const captureRef = useRef<HTMLDivElement | null>(null);

  /* ------------------------------
     Score computations
  ------------------------------ */

  const {
    corePct,
    coreLevel,
    advancedPct,
    advancedLevel,
    overallPct,
    overallLevel,
    expectedTransferRange,
    onboardingSpeed,
    commentary,
  } = useMemo(() => {
    // Core score (existing 6 sliders)
    const coreVals = Object.values(coreScores);
    const coreSum = coreVals.reduce((acc, v) => acc + v, 0);
    const coreMax = coreVals.length * 5;
    const corePct =
      coreMax > 0 ? Math.round((coreSum / coreMax) * 100) : 0;

    const coreLevel =
      corePct >= 80
        ? "Excellent mobility foundation"
        : corePct >= 60
        ? "Good mobility foundation"
        : corePct >= 40
        ? "Moderate mobility foundation"
        : "Limited mobility foundation";

    // Advanced sliders
    const advVals = Object.values(advancedScores);
    const advSum = advVals.reduce((acc, v) => acc + v, 0);
    const advMax = advVals.length * 5;
    const advBasePct =
      advMax > 0 ? (advSum / advMax) * 100 : 0;

    // Booking centre coverage multiplier
    const selectedBC = Object.values(bookingCentres).filter(Boolean).length;
    const bcFactor =
      selectedBC === 0
        ? 0.85
        : selectedBC === 1
        ? 0.9
        : selectedBC <= 3
        ? 1
        : selectedBC <= 6
        ? 1.05
        : 1.1;

    // Regulatory permissions multiplier
    const selectedPerms = Object.values(permissions).filter(Boolean).length;
    const permFactor =
      selectedPerms === 0
        ? 0.9
        : selectedPerms <= 2
        ? 1
        : selectedPerms <= 4
        ? 1.05
        : 1.1;

    let advancedPct = Math.round(
      Math.min(100, advBasePct * bcFactor * permFactor)
    );

    const advancedLevel =
      advancedPct >= 80
        ? "Strong advanced portability"
        : advancedPct >= 60
        ? "Solid advanced portability"
        : advancedPct >= 40
        ? "Developing portability"
        : "High-friction portability";

    // Combine core + advanced (40% / 60%)
    const overallPct = Math.round(corePct * 0.4 + advancedPct * 0.6);

    const overallLevel =
      overallPct >= 85
        ? "Tier-1 portability profile"
        : overallPct >= 70
        ? "Strong portability profile"
        : overallPct >= 55
        ? "Workable portability with conditions"
        : "Challenging portability profile";

    // Expected transfer range (illustrative, not a promise)
    let expectedTransferRange = "10–25% of book";
    let onboardingSpeed = "9–12+ months";

    if (overallPct >= 85) {
      expectedTransferRange = "50–70% of book (best-case)";
      onboardingSpeed = "4–6 months";
    } else if (overallPct >= 70) {
      expectedTransferRange = "40–60% of book";
      onboardingSpeed = "6–9 months";
    } else if (overallPct >= 55) {
      expectedTransferRange = "25–40% of book";
      onboardingSpeed = "9–12 months";
    }

    const commentary = [
      overallPct >= 70
        ? "Profile consistent with what leading Swiss and international platforms seek for senior hires."
        : "There may be value in strengthening certain dimensions before approaching Tier-1 platforms.",
      advancedScores.legalComplexity >= 4
        ? "Legal/tax complexity will likely require additional compliance review and can slow onboarding."
        : "Legal/tax complexity appears manageable for most booking centres."
    ];

    return {
      corePct,
      coreLevel,
      advancedPct,
      advancedLevel,
      overallPct,
      overallLevel,
      expectedTransferRange,
      onboardingSpeed,
      commentary,
    };
  }, [coreScores, advancedScores, bookingCentres, permissions]);

  /* ------------------------------
     PDF download handler
  ------------------------------ */

  const handleDownload = async () => {
    if (!captureRef.current) return;
    const element = captureRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: "#0B0E13",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("portability-diagnostic-executive-partners.pdf");
  };

  /* ------------------------------
     Render helpers
  ------------------------------ */

  const updateProfile = (patch: Partial<ProfileState>) =>
    setProfile((prev) => ({ ...prev, ...patch }));

  const toggleBC = (bc: string) =>
    setBookingCentres((prev) => ({ ...prev, [bc]: !prev[bc] }));

  const togglePerm = (p: string) =>
    setPermissions((prev) => ({ ...prev, [p]: !prev[p] }));

  /* ------------------------------
     JSX
  ------------------------------ */

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-2 py-4 sm:px-4 sm:py-8 md:py-10">
      {/* Header & actions */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-brandGold/10 px-4 py-1 text-xs font-semibold text-brandGoldPale ring-1 ring-brandGold/40">
            Executive Partners · Geneva · Global Private Banking &amp; WM
          </p>
          <h1 className="mt-3 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            Portability Readiness Score™ — Advanced Diagnostic
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-200/90 md:text-base">
            A structured, bank-style view of how easily your book can follow you
            across Switzerland, the UK, UAE, Singapore, Hong Kong, the US and
            key EU hubs.
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <button
            onClick={handleDownload}
            className="rounded-full bg-brandGold px-4 py-2 text-sm font-semibold text-black shadow-lg shadow-brandGold/30 hover:bg-brandGoldDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brandGold/90 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
          >
            Download full PDF diagnostic
          </button>
          <PrimaryButton href="/en/contact" className="whitespace-nowrap">
            Discuss results confidentially
          </PrimaryButton>
        </div>
      </div>

      {/* All content below captured into PDF */}
      <div ref={captureRef} className="space-y-10">
        {/* Section 1 – Profile */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid gap-6 rounded-2xl border border-white/10 bg-black/40 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.7)] md:grid-cols-3"
        >
          <div className="md:col-span-1">
            <h2 className="text-lg font-semibold text-white">
              1. Profile & Revenue
            </h2>
            <p className="mt-2 text-sm text-gray-300">
              Basic information similar to what a hiring bank will ask at
              screening: core booking hub, market, ROA and revenue quality.
            </p>
            <p className="mt-3 text-[11px] text-gray-400">
              Indicative only. Receiving banks will run their own KYC, tax,
              compliance and risk analysis.
            </p>
          </div>

          <div className="space-y-4 md:col-span-2">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-gray-300">
                  Primary market
                </label>
                <select
                  value={profile.market}
                  onChange={(e) =>
                    updateProfile({ market: e.target.value })
                  }
                  className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none"
                >
                  <option className="bg-[#0B0E13]">CH Onshore</option>
                  <option className="bg-[#0B0E13]">International (CH Booking)</option>
                  <option className="bg-[#0B0E13]">MEA / GCC</option>
                  <option className="bg-[#0B0E13]">LatAm</option>
                  <option className="bg-[#0B0E13]">Europe (EU/UK)</option>
                  <option className="bg-[#0B0E13]">Asia (SG/HK)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300">
                  Main booking hub today
                </label>
                <select
                  value={profile.mainHub}
                  onChange={(e) =>
                    updateProfile({ mainHub: e.target.value })
                  }
                  className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none"
                >
                  <option className="bg-[#0B0E13]">Geneva</option>
                  <option className="bg-[#0B0E13]">Zurich</option>
                  <option className="bg-[#0B0E13]">Dubai</option>
                  <option className="bg-[#0B0E13]">Singapore</option>
                  <option className="bg-[#0B0E13]">Hong Kong</option>
                  <option className="bg-[#0B0E13]">London</option>
                  <option className="bg-[#0B0E13]">New York</option>
                  <option className="bg-[#0B0E13]">Miami</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="block text-xs font-medium text-gray-300">
                  ROA (bps, last 12 months)
                </label>
                <input
                  type="number"
                  value={profile.roaBps}
                  onChange={(e) =>
                    updateProfile({ roaBps: Number(e.target.value) || 0 })
                  }
                  className="mt-1 w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none"
                />
                <p className="mt-1 text-[11px] text-gray-400">
                  Typical CH onshore: ~65–90 bps; international books often higher.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300">
                  Recurring revenue share (%)
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={profile.recurringShare}
                  onChange={(e) =>
                    updateProfile({ recurringShare: Number(e.target.value) })
                  }
                  className="mt-1 w-full accent-brandGold"
                />
                <p className="mt-1 text-[11px] text-gray-400">
                  {profile.recurringShare}% of your revenue is recurring
                  (DPM/advisory fees, trail, etc.).
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-300">
                  Clients under EDD / complex tax (% of book)
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={profile.eddShare}
                  onChange={(e) =>
                    updateProfile({ eddShare: Number(e.target.value) })
                  }
                  className="mt-1 w-full accent-brandGold"
                />
                <p className="mt-1 text-[11px] text-gray-400">
                  {profile.eddShare}% of clients require enhanced due diligence.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="block text-xs font-medium text-gray-300">
                  PEPs / high-profile clients (%)
                </label>
                <input
                  type="range"
                  min={0}
                  max={50}
                  value={profile.pepsShare}
                  onChange={(e) =>
                    updateProfile({ pepsShare: Number(e.target.value) })
                  }
                  className="mt-1 w-full accent-brandGold"
                />
                <p className="mt-1 text-[11px] text-gray-400">
                  {profile.pepsShare}% estimated share of PEP / sensitive clients.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 2 – Core portability dimensions (original model) */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="grid gap-6 rounded-2xl border border-brandGold/40 bg-black/50 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.85)] lg:grid-cols-3"
        >
          <div className="lg:col-span-1">
            <h2 className="text-lg font-semibold text-brandGoldSoft">
              2. Core Portability Dimensions
            </h2>
            <p className="mt-2 text-sm text-gray-300">
              These six dimensions mirror what front-office leaders review when
              assessing whether your book can follow you to a new platform.
            </p>
            <p className="mt-3 text-xs text-gray-400">
              Score each from 1 (weak) to 5 (very strong) based on your current
              situation.
            </p>
            <div className="mt-4 rounded-xl border border-brandGold/30 bg-black/60 p-3 text-xs text-gray-200">
              <div className="font-semibold text-brandGold">
                Core score: {corePct}%
              </div>
              <div className="mt-1 text-[11px] text-gray-300">
                {coreLevel}
              </div>
            </div>
          </div>

          <div className="space-y-4 lg:col-span-2">
            {CORE_DIMENSIONS.map((dim) => (
              <div key={dim.key} className="space-y-1">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-white">
                    {dim.label}
                  </p>
                  <p className="text-sm text-gray-300">
                    {coreScores[dim.key]}/5
                  </p>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={coreScores[dim.key]}
                  onChange={(e) =>
                    setCoreScores((prev) => ({
                      ...prev,
                      [dim.key]: Number(e.target.value),
                    }))
                  }
                  className="w-full accent-brandGold"
                />
                <p className="text-[11px] text-gray-400">{dim.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Section 3 – Advanced banking factors */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="space-y-6 rounded-2xl border border-white/12 bg-black/40 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.8)]"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                3. Advanced Portability Factors
              </h2>
              <p className="mt-1 text-sm text-gray-300">
                A more granular view used by banks&apos; hiring committees: AUM
                mix, legal/tax complexity, KYC reusability, past mobility,
                relationship depth, team dependency and platform fit.
              </p>
            </div>
            <div className="rounded-xl border border-brandGold/35 bg-black/70 px-4 py-3 text-sm text-gray-200">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-xs uppercase tracking-wide text-gray-400">
                  Advanced portability
                </span>
                <span className="text-lg font-semibold text-brandGold">
                  {advancedPct}%
                </span>
              </div>
              <p className="mt-1 text-[11px] text-gray-300">{advancedLevel}</p>
            </div>
          </div>

          {/* Sliders grid */}
          <div className="grid gap-5 md:grid-cols-2">
            {/* Left column */}
            <div className="space-y-4">
              {/* AUM diversification */}
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>AUM diversification (Advisory / DPM / Lending)</span>
                  <span className="text-gray-300">
                    {advancedScores.aumDiversification}/5
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={advancedScores.aumDiversification}
                  onChange={(e) =>
                    setAdvancedScores((prev) => ({
                      ...prev,
                      aumDiversification: Number(e.target.value),
                    }))
                  }
                  className="mt-1 w-full accent-brandGold"
                />
                <p className="mt-1 text-[11px] text-gray-400">
                  1 = very concentrated, 5 = well balanced across advisory, DPM,
                  lending.
                </p>
              </div>

              {/* Alternatives / structured */}
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Alternatives / structured usage</span>
                  <span className="text-gray-300">
                    {advancedScores.altsStructured}/5
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={advancedScores.altsStructured}
                  onChange={(e) =>
                    setAdvancedScores((prev) => ({
                      ...prev,
                      altsStructured: Number(e.target.value),
                    }))
                  }
                  className="mt-1 w-full accent-brandGold"
                />
                <p className="mt-1 text-[11px] text-gray-400">
                  Higher scores indicate clients are used to multi-product,
                  multi-asset solutions (PE, HF, structured products).
                </p>
              </div>

              {/* Legal complexity */}
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Legal / tax complexity</span>
                  <span className="text-gray-300">
                    {advancedScores.legalComplexity}/5
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={advancedScores.legalComplexity}
                  onChange={(e) =>
                    setAdvancedScores((prev) => ({
                      ...prev,
                      legalComplexity: Number(e.target.value),
                    }))
                  }
                  className="mt-1 w-full accent-brandGold"
                />
                <p className="mt-1 text-[11px] text-gray-400">
                  1 = simple (few structures, low EDD), 5 = many complex
                  structures / tax-sensitive jurisdictions.
                </p>
              </div>

              {/* KYC reuse */}
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>KYC / documentation reusability</span>
                  <span className="text-gray-300">
                    {advancedScores.kycReuse}/5
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={advancedScores.kycReuse}
                  onChange={(e) =>
                    setAdvancedScores((prev) => ({
                      ...prev,
                      kycReuse: Number(e.target.value),
                    }))
                  }
                  className="mt-1 w-full accent-brandGold"
                />
                <p className="mt-1 text-[11px] text-gray-400">
                  1 = most files need rebuilding; 5 = majority have up-to-date,
                  reusable documentation.
                </p>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              {/* Past portability */}
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Past portability track-record</span>
                  <span className="text-gray-300">
                    {advancedScores.pastPortability}/5
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={advancedScores.pastPortability}
                  onChange={(e) =>
                    setAdvancedScores((prev) => ({
                      ...prev,
                      pastPortability: Number(e.target.value),
                    }))
                  }
                  className="mt-1 w-full accent-brandGold"
                />
                <p className="mt-1 text-[11px] text-gray-400">
                  1 = no previous move with clients; 5 = multiple successful
                  moves of a meaningful portion of the book.
                </p>
              </div>

              {/* Relationship depth */}
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Relationship depth & contact frequency</span>
                  <span className="text-gray-300">
                    {advancedScores.relationshipDepth}/5
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={advancedScores.relationshipDepth}
                  onChange={(e) =>
                    setAdvancedScores((prev) => ({
                      ...prev,
                      relationshipDepth: Number(e.target.value),
                    }))
                  }
                  className="mt-1 w-full accent-brandGold"
                />
                <p className="mt-1 text-[11px] text-gray-400">
                  Higher scores indicate high interaction frequency and access
                  to true decision-makers.
                </p>
              </div>

              {/* Team dependency */}
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Team dependency</span>
                  <span className="text-gray-300">
                    {advancedScores.teamDependency}/5
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={advancedScores.teamDependency}
                  onChange={(e) =>
                    setAdvancedScores((prev) => ({
                      ...prev,
                      teamDependency: Number(e.target.value),
                    }))
                  }
                  className="mt-1 w-full accent-brandGold"
                />
                <p className="mt-1 text-[11px] text-gray-400">
                  1 = highly dependent on current team; 5 = clients see you as
                  their primary anchor and would follow you individually.
                </p>
              </div>

              {/* Platform fit */}
              <div>
                <div className="flex items-center justify-between text-sm">
                  <span>Fit with Tier-1 private banking platform</span>
                  <span className="text-gray-300">
                    {advancedScores.platformFit}/5
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={advancedScores.platformFit}
                  onChange={(e) =>
                    setAdvancedScores((prev) => ({
                      ...prev,
                      platformFit: Number(e.target.value),
                    }))
                  }
                  className="mt-1 w-full accent-brandGold"
                />
                <p className="mt-1 text-[11px] text-gray-400">
                  Your perception of how well your clients would fit a
                  best-in-class Swiss / international platform.
                </p>
              </div>
            </div>
          </div>

          {/* Booking centres & permissions */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-white">
                Booking centres your clients can follow
              </h3>
              <p className="mt-1 text-xs text-gray-400">
                Tick the locations where a meaningful portion of your book could
                be onboarded.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {BOOKING_CENTRES.map((bc) => (
                  <button
                    key={bc}
                    type="button"
                    onClick={() => toggleBC(bc)}
                    className={
                      "rounded-full border px-3 py-1 text-xs transition " +
                      (bookingCentres[bc]
                        ? "border-brandGold bg-brandGold/20 text-brandGoldPale"
                        : "border-white/15 bg-black/40 text-gray-200 hover:border-brandGold/60")
                    }
                  >
                    {bc}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                Cross-border & regulatory permissions
              </h3>
              <p className="mt-1 text-xs text-gray-400">
                Select the regimes you are effectively allowed to cover today.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {REG_PERMISSIONS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => togglePerm(p)}
                    className={
                      "rounded-full border px-3 py-1 text-xs transition " +
                      (permissions[p]
                        ? "border-brandGold bg-brandGold/20 text-brandGoldPale"
                        : "border-white/15 bg-black/40 text-gray-200 hover:border-brandGold/60")
                    }
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Section 4 – Summary & bank-style view */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.11 }}
          className="grid gap-6 rounded-2xl border border-white/10 bg-black/50 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.8)] md:grid-cols-3"
        >
          {/* Overall score card */}
          <div className="space-y-4 rounded-2xl border border-brandGold/40 bg-black/70 p-4">
            <p className="text-xs uppercase tracking-wide text-gray-300">
              4. Overall Portability View
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-300">Combined score</p>
                <p className="text-3xl font-bold text-brandGold">
                  {overallPct}%
                </p>
                <p className="mt-1 text-xs text-gray-300">{overallLevel}</p>
              </div>
              <div className="h-16 w-16 rounded-full bg-brandGold/15 ring-4 ring-brandGold/40" />
            </div>
            <div className="space-y-1 text-xs text-gray-300">
              <p>Core foundation: {corePct}%</p>
              <p>Advanced factors: {advancedPct}%</p>
            </div>
          </div>

          {/* Expected transfer & onboarding */}
          <div className="space-y-4 rounded-2xl border border-white/15 bg-black/60 p-4">
            <h3 className="text-sm font-semibold text-white">
              Expected transfer & onboarding (indicative)
            </h3>
            <div className="rounded-xl border border-white/15 bg-black/70 p-3 text-xs text-gray-200">
              <div className="flex items-center justify-between gap-4">
                <span className="text-gray-300">Expected transfer range</span>
                <span className="font-semibold text-brandGold">
                  {expectedTransferRange}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-gray-400">
                Based on market practice for senior RMs moving between Tier-1
                platforms. Not a guarantee; every bank applies its own filters.
              </p>
            </div>
            <div className="rounded-xl border border-white/15 bg-black/70 p-3 text-xs text-gray-200">
              <div className="flex items-center justify-between gap-4">
                <span className="text-gray-300">Indicative onboarding time</span>
                <span className="font-semibold text-brandGold">
                  {onboardingSpeed}
                </span>
              </div>
              <p className="mt-1 text-[11px] text-gray-400">
                Includes due diligence, approvals, documentation refresh and
                initial client transfers.
              </p>
            </div>
          </div>

          {/* Commentary & suggested usage */}
          <div className="space-y-3 rounded-2xl border border-white/15 bg-black/60 p-4">
            <h3 className="text-sm font-semibold text-white">
              How a hiring bank might read this
            </h3>
            <ul className="space-y-2 text-xs text-gray-300">
              {commentary.map((c, idx) => (
                <li key={idx}>• {c}</li>
              ))}
            </ul>
            <p className="mt-2 text-[11px] text-gray-400">
              Use this as a preparation tool ahead of conversations with
              Executive Partners and potential hiring platforms. It helps frame
              realistic expectations and identify areas to strengthen before a
              move.
            </p>
          </div>
        </motion.section>

        {/* Section 5 – Next steps */}
        <section className="rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-gray-200">
          <h2 className="text-lg font-semibold text-white">
            5. Next steps with Executive Partners
          </h2>
          <p className="mt-2">
            If your portability profile looks compelling, we can help you
            approach the right platforms and booking centres in a structured,
            discreet way.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <PrimaryButton href="/en/contact">
              Share my profile & book a call
            </PrimaryButton>
            <SecondaryButton href="/en/jobs">
              View live Private Banking mandates
            </SecondaryButton>
            <SecondaryButton href="/en/markets">
              Explore booking centres & markets
            </SecondaryButton>
          </div>
          <p className="mt-3 text-[11px] text-gray-400">
            This tool is indicative and for preparation purposes only. Final
            onboarding decisions rest solely with the receiving institution and
            its compliance, tax, legal and risk frameworks.
          </p>
        </section>
      </div>
    </div>
  );
}