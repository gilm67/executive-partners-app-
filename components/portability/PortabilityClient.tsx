"use client";
 
// ═══════════════════════════════════════════════════════════════
// EP Portability Readiness Score™ — Advanced Diagnostic v2
// Rebuilt with: wallet share, tenure multiplier, jurisdiction-aware
// legal scoring, EAM co-management exposure, real-time flags,
// EP benchmark comparison, and specific recommendations engine.
// ═══════════════════════════════════════════════════════════════
 
import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";
 
/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */
 
type CoreKey = "custodian" | "aum" | "licenses" | "product" | "concentration" | "compliance";
type AdvancedKey = "aumDiversification" | "altsStructured" | "kycReuse" | "pastPortability" | "relationshipDepth" | "teamDependency" | "platformFit";
type TenureKey = "<1" | "1-2" | "2-4" | "4-8" | "8-12" | ">12";
type GardenLeaveKey = "none" | "1" | "2" | "3" | "6" | "6+";
type JurisdictionKey = "switzerland" | "uk" | "uae_difc" | "uae_adgm" | "singapore" | "hong_kong" | "luxembourg" | "monaco" | "us" | "none" | "";
 
type ProfileState = {
  market: string;
  mainHub: string;
  roaBps: number;
  recurringShare: number;
  eddShare: number;
  pepsShare: number;
  walletShareScore: number;
  tenureKey: TenureKey;
};
 
type LegalState = {
  jurisdiction: JurisdictionKey;
  gardenLeave: GardenLeaveKey;
  hasClawback: boolean;
  clawbackPct: number;
  eamExposure: number;
};
 
type CaptureState = {
  showModal: boolean;
  name: string;
  email: string;
  submitting: boolean;
  done: boolean;
};
 
type Flag = { severity: "red" | "amber" | "green"; title: string; detail: string };
type Recommendation = { priority: "critical" | "important" | "advisory"; action: string; detail: string };
 
/* ─────────────────────────────────────────────────────────────
   CONFIGURATION
───────────────────────────────────────────────────────────── */
 
const CORE_DIMENSIONS: Array<{ key: CoreKey; label: string; description: string }> = [
  { key: "custodian", label: "Custodian / Booking Centre Footprint", description: "CH, UK, UAE, SG, HK, US — the more relevant booking centres your clients can follow, the higher your portability." },
  { key: "aum", label: "AUM Mix & Diversification", description: "Balanced advisory / DPM / lending books are easier to transfer than highly concentrated or single-product books." },
  { key: "licenses", label: "Cross-Border Licenses", description: "FINMA outbound, FCA, DIFC/ADGM, MAS, SFC and bank-level permissions enabling compliant servicing." },
  { key: "product", label: "Product Scope Breadth", description: "From core PB to structured products, private markets and alternatives — especially relevant for HNWI/UHNW and US/LatAm clients." },
  { key: "concentration", label: "Client Concentration", description: "Lower concentration = lower attrition risk when moving between hubs (e.g. Geneva → Dubai, London → Zurich, Paris → Lisbon)." },
  { key: "compliance", label: "Compliance & KYC Reuse", description: "CRS, FATCA, MiFID II, LSFin packs that can be reused → shorter onboarding and faster time-to-revenue." },
];
 
const ADVANCED_DIMENSIONS: Array<{ key: AdvancedKey; label: string; description: string }> = [
  { key: "aumDiversification", label: "AUM diversification (Advisory / DPM / Lending)", description: "1 = very concentrated, 5 = well balanced across advisory, DPM and lending." },
  { key: "altsStructured", label: "Alternatives & structured product usage", description: "Higher scores indicate clients are used to multi-product, multi-asset solutions (PE, HF, structured notes)." },
  { key: "kycReuse", label: "KYC / documentation reusability", description: "1 = most files need rebuilding; 5 = majority have up-to-date, reusable documentation." },
  { key: "pastPortability", label: "Past portability track record", description: "1 = no previous move with clients; 5 = multiple successful moves of a meaningful portion of the book." },
  { key: "relationshipDepth", label: "Relationship depth & contact frequency", description: "Higher scores indicate high interaction frequency and access to true decision-makers. Score honestly — banks will test this." },
  { key: "teamDependency", label: "Team dependency", description: "1 = highly dependent on current team; 5 = clients see you as their primary anchor and would follow you individually." },
  { key: "platformFit", label: "Fit with Tier-1 private banking platform", description: "Your assessment of how well your clients would fit a best-in-class Swiss / international platform." },
];
 
type JurData = { label: string; baseScore: number; riskLevel: "low" | "medium" | "high"; gardenLeaveNorm: string; note: string };
 
const JURISDICTION_DATA: Record<Exclude<JurisdictionKey, "">, JurData> = {
  switzerland: { label: "Switzerland (Swiss Code of Obligations)", baseScore: 68, riskLevel: "medium", gardenLeaveNorm: "1–3 months typical", note: "Courts apply a proportionality test. Geographic and temporal limits are scrutinised. Non-solicitation typically enforceable for 1–2 years on named clients. Lower injunction risk than UK but real." },
  uk: { label: "United Kingdom (English law)", baseScore: 42, riskLevel: "high", gardenLeaveNorm: "3–6 months common at MD level", note: "English courts robustly enforce garden leave injunctions in private banking. Major banks actively seek court orders. Budget for specialist employment law advice and assume full garden leave will be enforced before any client contact." },
  uae_difc: { label: "UAE — DIFC", baseScore: 60, riskLevel: "medium", gardenLeaveNorm: "1–3 months typical", note: "DIFC courts apply English common law principles but enforcement in practice is lower than London. Non-solicitation clauses are common but injunctions are less frequently pursued." },
  uae_adgm: { label: "UAE — ADGM", baseScore: 60, riskLevel: "medium", gardenLeaveNorm: "1–3 months typical", note: "Also applies English common law. Similar practical risk profile to DIFC — moderate enforcement, less aggressive litigation culture than UK." },
  singapore: { label: "Singapore (MAS-regulated)", baseScore: 63, riskLevel: "medium", gardenLeaveNorm: "1–3 months", note: "Singapore courts enforce reasonable non-solicitation clauses. MAS notification requirements add process friction. Practical enforcement lower than UK but increasing." },
  hong_kong: { label: "Hong Kong (SFC-regulated)", baseScore: 63, riskLevel: "medium", gardenLeaveNorm: "1–3 months", note: "Common law jurisdiction with similar profile to Singapore. SFC licensing requirements for the new employer add onboarding timeline friction." },
  luxembourg: { label: "Luxembourg", baseScore: 67, riskLevel: "medium", gardenLeaveNorm: "1–3 months", note: "Civil law jurisdiction. Non-solicitation enforceable with reasonable limits. Garden leave less common at senior level than in CH or UK." },
  monaco: { label: "Monaco", baseScore: 76, riskLevel: "low", gardenLeaveNorm: "1–2 months typical", note: "French-law-influenced jurisdiction with limited non-solicitation enforcement practice at senior banker level. Lower injunction risk than CH or UK." },
  us: { label: "United States", baseScore: 50, riskLevel: "high", gardenLeaveNorm: "Varies widely by state", note: "Enforceability varies dramatically by state. New York: broadly enforceable for financial services. California: largely unenforceable. Florida: strongly enforced. Always confirm your governing law clause." },
  none: { label: "No non-solicitation clause", baseScore: 90, riskLevel: "low", gardenLeaveNorm: "N/A", note: "No contractual restriction on client contact post-departure. Residual fiduciary duty obligations may still apply depending on jurisdiction. Lowest legal friction available." },
};
 
const TENURE_OPTIONS: Array<{ key: TenureKey; label: string; multiplier: number; note: string }> = [
  { key: "<1", label: "< 1 year", multiplier: 0.74, note: "Very recent move — hiring committees will question relationship depth and flag as a flight risk." },
  { key: "1-2", label: "1–2 yrs", multiplier: 0.85, note: "Below typical threshold. Banks prefer 3+ years before treating a senior RM as settled." },
  { key: "2-4", label: "2–4 yrs", multiplier: 0.93, note: "Acceptable range. Relationships developing but may lack depth of a 5+ year tenure." },
  { key: "4-8", label: "4–8 yrs", multiplier: 1.0, note: "Optimal range. Deep enough for client loyalty; recent enough for credible book data." },
  { key: "8-12", label: "8–12 yrs", multiplier: 1.06, note: "Strong signal. Deep client loyalty likely. Ensure evidence of personal relationship ownership is clear." },
  { key: ">12", label: "> 12 yrs", multiplier: 1.10, note: "Maximum depth. Some banks probe whether clients follow the individual or the brand." },
];
 
const WALLET_OPTIONS = [
  { score: 1, label: "< 20% of client wealth", multiplier: 0.82, desc: "Low penetration. Clients have primary relationships elsewhere — portability structurally constrained." },
  { score: 2, label: "20–35% of client wealth", multiplier: 0.91, desc: "Below average share. Follow probability depends heavily on relationship quality." },
  { score: 3, label: "35–50% of client wealth", multiplier: 1.0, desc: "Typical primary banker relationship. Solid foundation for portability." },
  { score: 4, label: "50–65% of client wealth", multiplier: 1.07, desc: "High penetration. Clients rely primarily on you — strong follow probability." },
  { score: 5, label: "> 65% of client wealth", multiplier: 1.14, desc: "Primary banker for the vast majority of assets. Strongest portability signal available." },
];
 
const EAM_OPTIONS = [
  { score: 1, label: "Minimal — < 5% of book", note: "Negligible EAM complexity. No material portability impact." },
  { score: 2, label: "Low — 5–10%", note: "Minor exposure. Manageable with standard legal preparation." },
  { score: 3, label: "Moderate — 10–20%", note: "Requires specific legal advice on EAM client ownership before any approach to competing banks." },
  { score: 4, label: "High — 20–35%", note: "Significant complexity. Receiving banks will apply a material haircut to projected AUM. Legal preparation is non-negotiable." },
  { score: 5, label: "Very high — > 35%", note: "Major constraint. Most receiving banks will exclude EAM-managed AUM from business plan projections entirely." },
];
 
const GARDEN_LEAVE_OPTIONS: Array<{ key: GardenLeaveKey; label: string; modifier: number }> = [
  { key: "none", label: "No clause", modifier: 15 },
  { key: "1", label: "1 month", modifier: 8 },
  { key: "2", label: "2 months", modifier: 3 },
  { key: "3", label: "3 months", modifier: 0 },
  { key: "6", label: "6 months", modifier: -12 },
  { key: "6+", label: "6+ months", modifier: -22 },
];
 
const BOOKING_CENTRES = ["Geneva", "Zurich", "London", "Luxembourg", "Monaco", "Dubai (DIFC/ADGM)", "Abu Dhabi", "Singapore", "Hong Kong", "Miami", "New York", "Lisbon", "Madrid"];
const REG_PERMISSIONS = ["FINMA outbound (CH)", "FCA (UK)", "DFSA / FSRA (UAE)", "MAS (Singapore)", "SFC (Hong Kong)", "SEC / US offshore", "MiFID / EU passport"];
 
/* ─────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────── */
 
export default function PortabilityClient() {
 
  /* ── State ─────────────────────────────────────────────── */
 
  const [profile, setProfile] = useState<ProfileState>({
    market: "CH Onshore", mainHub: "Geneva", roaBps: 80,
    recurringShare: 60, eddShare: 20, pepsShare: 5,
    walletShareScore: 3, tenureKey: "4-8",
  });
 
  const [coreScores, setCoreScores] = useState<Record<CoreKey, number>>({
    custodian: 3, aum: 3, licenses: 2, product: 3, concentration: 3, compliance: 2,
  });
 
  const [legalState, setLegalState] = useState<LegalState>({
    jurisdiction: "", gardenLeave: "3",
    hasClawback: false, clawbackPct: 0, eamExposure: 1,
  });
 
  const [advancedScores, setAdvancedScores] = useState<Record<AdvancedKey, number>>({
    aumDiversification: 3, altsStructured: 3, kycReuse: 3,
    pastPortability: 2, relationshipDepth: 3, teamDependency: 3, platformFit: 3,
  });
 
  const [bookingCentres, setBookingCentres] = useState<Record<string, boolean>>(
    () => Object.fromEntries(BOOKING_CENTRES.map(bc => [bc, false]))
  );
  const [permissions, setPermissions] = useState<Record<string, boolean>>(
    () => Object.fromEntries(REG_PERMISSIONS.map(p => [p, false]))
  );
 
  const [capture, setCapture] = useState<CaptureState>({
    showModal: false, name: "", email: "", submitting: false, done: false,
  });
  const [exporting, setExporting] = useState(false);
  const captureRef = useRef<HTMLDivElement | null>(null);
 
  /* ── Scoring Engine ─────────────────────────────────────── */
 
  const computed = useMemo(() => {
 
    // Core (6 dimensions)
    const coreVals = Object.values(coreScores);
    const corePct = Math.round((coreVals.reduce((a, v) => a + v, 0) / (coreVals.length * 5)) * 100);
    const coreLevel = corePct >= 80 ? "Excellent" : corePct >= 60 ? "Good" : corePct >= 40 ? "Moderate" : "Limited";
 
    // Legal / Structural
    const jurData = legalState.jurisdiction
      ? JURISDICTION_DATA[legalState.jurisdiction as Exclude<JurisdictionKey, "">] ?? null
      : null;
    const jurisdictionBase = jurData ? jurData.baseScore : 55;
    const gardenLeaveModifier = GARDEN_LEAVE_OPTIONS.find(g => g.key === legalState.gardenLeave)?.modifier ?? 0;
    const clawbackModifier = !legalState.hasClawback ? 5
      : legalState.clawbackPct > 80 ? -18
      : legalState.clawbackPct > 50 ? -8
      : legalState.clawbackPct > 20 ? -3 : 2;
    const eamModifier = legalState.eamExposure === 1 ? 5 : legalState.eamExposure === 2 ? 0
      : legalState.eamExposure === 3 ? -8 : legalState.eamExposure === 4 ? -18 : -30;
    const legalPct = Math.min(100, Math.max(0, jurisdictionBase + gardenLeaveModifier + clawbackModifier + eamModifier));
    const legalLevel = legalPct >= 75 ? "Low legal friction"
      : legalPct >= 55 ? "Manageable legal risk"
      : legalPct >= 35 ? "Significant risk — preparation required"
      : "High friction — specialist advice essential";
 
    // Advanced (7 dimensions) + geographic multipliers
    const advVals = Object.values(advancedScores);
    const advBase = (advVals.reduce((a, v) => a + v, 0) / (advVals.length * 5)) * 100;
    const selectedBC = Object.values(bookingCentres).filter(Boolean).length;
    const bcFactor = selectedBC === 0 ? 0.85 : selectedBC === 1 ? 0.90 : selectedBC <= 3 ? 1.0 : selectedBC <= 6 ? 1.05 : 1.10;
    const selectedPerms = Object.values(permissions).filter(Boolean).length;
    const permFactor = selectedPerms === 0 ? 0.90 : selectedPerms <= 2 ? 1.0 : selectedPerms <= 4 ? 1.05 : 1.10;
    const advancedPct = Math.round(Math.min(100, advBase * bcFactor * permFactor));
    const advancedLevel = advancedPct >= 80 ? "Strong" : advancedPct >= 60 ? "Solid" : advancedPct >= 40 ? "Developing" : "High-friction";
 
    // Wallet share & tenure multipliers
    const walletMultiplier = WALLET_OPTIONS.find(w => w.score === profile.walletShareScore)?.multiplier ?? 1.0;
    const tenureMultiplier = TENURE_OPTIONS.find(t => t.key === profile.tenureKey)?.multiplier ?? 1.0;
 
    // Overall (Core 25% + Legal 20% + Advanced 55%) × wallet × tenure
    const weighted = corePct * 0.25 + legalPct * 0.20 + advancedPct * 0.55;
    const overallPct = Math.round(Math.min(100, Math.max(0, weighted * walletMultiplier * tenureMultiplier)));
 
    const overallLevel = overallPct >= 85 ? "Tier-1 portability profile"
      : overallPct >= 72 ? "Strong portability profile"
      : overallPct >= 58 ? "Workable portability with conditions"
      : overallPct >= 42 ? "Challenging — targeted preparation required"
      : "High-friction — significant remediation needed";
 
    // Transfer range
    let expectedTransferRange = "10–25% of bankable AUM";
    let onboardingSpeed = "12+ months";
    if (overallPct >= 85) { expectedTransferRange = "55–75% of bankable AUM"; onboardingSpeed = "4–6 months"; }
    else if (overallPct >= 72) { expectedTransferRange = "40–60% of bankable AUM"; onboardingSpeed = "6–9 months"; }
    else if (overallPct >= 58) { expectedTransferRange = "25–40% of bankable AUM"; onboardingSpeed = "9–12 months"; }
 
    // EP Benchmark
    const epBenchmarkLabel = overallPct >= 80 ? "Top quartile of EP-placed candidates"
      : overallPct >= 65 ? "Above median for EP placements"
      : overallPct >= 50 ? "Below median — strengthening required"
      : "Below EP placement threshold — preparation essential";
 
    // ── Flags ──────────────────────────────────────────────
    const flags: Flag[] = [];
 
    if (["<1", "1-2"].includes(profile.tenureKey)) {
      flags.push({ severity: "red", title: "Timing risk — short tenure",
        detail: `Less than 2 years at current institution is a significant concern for hiring committees. Most Tier-1 banks require a minimum of 2–3 years settled tenure before treating a move as commercially credible. Consider whether additional time would materially change the outcome.` });
    }
 
    if (legalState.eamExposure >= 3) {
      flags.push({ severity: legalState.eamExposure >= 4 ? "red" : "amber",
        title: "EAM co-management complexity",
        detail: EAM_OPTIONS[legalState.eamExposure - 1].note + " Receiving banks will typically exclude or severely discount EAM-managed AUM in their business plan projections." });
    }
 
    if (legalState.jurisdiction === "uk") {
      flags.push({ severity: "red", title: "High legal friction — English law jurisdiction",
        detail: "English courts actively enforce garden leave injunctions in private banking. Major banks seek court orders routinely. Engage a specialist employment lawyer before taking any steps. Assume full garden leave will be enforced and plan client communication accordingly." });
    } else if (legalState.jurisdiction === "us") {
      flags.push({ severity: "amber", title: "US — jurisdiction-dependent enforcement",
        detail: "Enforceability varies dramatically by state. Confirm your governing law clause before drawing any conclusions. New York and Florida are highly enforcement-active; California is not." });
    } else if (!legalState.jurisdiction) {
      flags.push({ severity: "amber", title: "Jurisdiction not specified — legal risk unquantified",
        detail: "Your score includes an assumed moderate legal risk. Specifying your jurisdiction will give a materially more accurate assessment — and may significantly change your overall score in either direction." });
    }
 
    if (["6", "6+"].includes(legalState.gardenLeave)) {
      flags.push({ severity: "amber", title: "Extended garden leave — 6+ months",
        detail: "Six or more months of garden leave significantly delays revenue generation at the receiving bank and increases client attrition risk. Factor this into your timing, signing bonus negotiation, and transition planning." });
    }
 
    if (legalState.hasClawback && legalState.clawbackPct > 50) {
      flags.push({ severity: legalState.clawbackPct > 80 ? "red" : "amber",
        title: `Retention clawback — ${legalState.clawbackPct}% outstanding`,
        detail: "Significant clawback exposure. Most receiving banks will gross this up in the sign-on structure, but confirm before you resign. Timing your departure around vesting milestones can materially reduce the exposure." });
    }
 
    if (profile.walletShareScore <= 2) {
      flags.push({ severity: "amber", title: "Low wallet share — structural portability constraint",
        detail: "You manage less than 35% of your clients' total wealth. Clients have primary relationships elsewhere. Portability is structurally constrained regardless of relationship quality. The most valuable pre-move activity is deepening wallet penetration with your top 20 clients." });
    }
 
    if (advancedScores.relationshipDepth >= 5 && advancedScores.pastPortability <= 2) {
      flags.push({ severity: "amber", title: "Self-assessment inconsistency — relationship depth vs. track record",
        detail: "Maximum relationship depth with limited past portability evidence creates an inconsistency hiring committees will probe directly. Consider whether 5/5 is supportable with specific client data. Banks will ask for examples." });
    }
 
    if (overallPct >= 75 && flags.filter(f => f.severity === "red").length === 0) {
      flags.push({ severity: "green", title: "Profile is commercially credible at Tier-1 level",
        detail: "No critical disqualifiers detected. With appropriate legal preparation and structured timing, this profile is presentable to leading Swiss and international private banking platforms." });
    }
 
    // ── Recommendations ────────────────────────────────────
    const recommendations: Recommendation[] = [];
 
    if (!legalState.jurisdiction) {
      recommendations.push({ priority: "critical", action: "Identify and review your legal position before any other step",
        detail: "Find your governing law clause. Get a legal opinion from a specialist employment lawyer. The jurisdiction determines your entire legal strategy and should be the first thing you establish — not the last." });
    }
 
    if (legalState.eamExposure >= 3) {
      recommendations.push({ priority: "critical", action: "Resolve EAM co-management before approaching any competing bank",
        detail: "Get legal clarity on client ownership in your EAM arrangements before the first conversation with a potential employer. Receiving banks will ask directly — an unclear answer will kill an otherwise strong process." });
    }
 
    if (["<1", "1-2"].includes(profile.tenureKey)) {
      recommendations.push({ priority: "critical", action: "Reconsider timing — tenure is a commercial risk",
        detail: "An additional 12–18 months would materially improve both the score and the receiving bank's confidence in AUM transfer projections. The cost of waiting is lower than the cost of a failed process." });
    }
 
    if (profile.walletShareScore <= 2) {
      recommendations.push({ priority: "important", action: "Deepen wallet share before initiating a move",
        detail: "Identify your top 15 clients by total estimated wealth and build a specific plan to consolidate a greater share of assets in the next 12 months. This is the single highest-ROI pre-move activity available to you." });
    }
 
    if (advancedScores.kycReuse <= 2) {
      recommendations.push({ priority: "important", action: "Begin building reusable KYC documentation now",
        detail: "Documentation gaps extend onboarding by 3–6 months and directly cause client attrition. Start assembling reusable KYC packs for your top 30 clients — you can do this without triggering any legal obligations." });
    }
 
    if (legalState.hasClawback && legalState.clawbackPct > 40) {
      recommendations.push({ priority: "important", action: "Confirm clawback terms and gross-up position before resigning",
        detail: "Establish the exact amount, triggering events, and whether the receiving bank will gross it up. Most do, but confirm before you resign, not after. Timing your departure around vesting milestones can reduce this significantly." });
    }
 
    if (corePct < 50) {
      recommendations.push({ priority: "important", action: "Address core dimension gaps before approaching Tier-1 platforms",
        detail: "Core portability scores below 50% indicate structural gaps that hiring committees will identify immediately. Prioritise booking centre coverage, licensing, and documentation quality before initiating approach conversations." });
    }
 
    if (advancedScores.pastPortability <= 2 && overallPct >= 60) {
      recommendations.push({ priority: "advisory", action: "Prepare a specific portability narrative for the interview",
        detail: "Limited past portability track record is the most frequently raised concern for otherwise strong profiles. Prepare 3–5 specific examples of client loyalty — situations where clients followed your advice over an institutional recommendation." });
    }
 
    if (["6", "6+"].includes(legalState.gardenLeave)) {
      recommendations.push({ priority: "advisory", action: "Negotiate garden leave at your next contract review",
        detail: "If you are not yet planning to move immediately, consider whether your next renewal is an opportunity to negotiate this to 3 months or less. The negotiating window is before the resignation letter, not after." });
    }
 
    if (overallPct >= 70 && flags.filter(f => f.severity === "red").length === 0) {
      recommendations.push({ priority: "advisory", action: "You are ready to begin a structured, confidential approach process",
        detail: "The profile is commercially credible. The next step is identifying 3–5 target platforms that match your client geography and product mix, and approaching them in a sequenced, discreet process — one that protects your reputation throughout." });
    }
 
    return {
      corePct, coreLevel,
      legalPct, legalLevel, jurData,
      advancedPct, advancedLevel,
      walletMultiplier, tenureMultiplier,
      overallPct, overallLevel,
      expectedTransferRange, onboardingSpeed,
      epBenchmarkLabel,
      flags, recommendations,
    };
  }, [coreScores, legalState, advancedScores, bookingCentres, permissions, profile]);
 
  /* ── Handlers ─────────────────────────────────────────── */
 
  const updateProfile = (patch: Partial<ProfileState>) => setProfile(p => ({ ...p, ...patch }));
  const updateLegal = (patch: Partial<LegalState>) => setLegalState(p => ({ ...p, ...patch }));
 
  const _executeDownload = async () => {
    if (exporting) return;
    setExporting(true);
    try {
      const payload = {
        profile, coreScores, legalState, advancedScores, bookingCentres, permissions,
        computed: {
          corePct: computed.corePct, legalPct: computed.legalPct,
          advancedPct: computed.advancedPct, overallPct: computed.overallPct,
          overallLevel: computed.overallLevel,
          expectedTransferRange: computed.expectedTransferRange,
          onboardingSpeed: computed.onboardingSpeed,
        },
      };
      const res = await fetch("/api/portability/export", {
        method: "POST", headers: { "Content-Type": "application/json" },
        credentials: "include", body: JSON.stringify(payload),
      });
      if (res.status === 401 || res.status === 403) {
        window.location.href = "/private/auth/request?next=/portability"; return;
      }
      if (!res.ok) { alert("Export failed. Please try again."); return; }
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "portability-diagnostic-executive-partners.pdf";
      document.body.appendChild(a); a.click(); a.remove();
      window.URL.revokeObjectURL(url);
    } finally { setExporting(false); }
  };
 
  const handleDownload = () => {
    if (capture.done) { _executeDownload(); return; }
    setCapture(p => ({ ...p, showModal: true }));
  };
 
  const handleCaptureSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!capture.email.includes("@")) return;
    setCapture(p => ({ ...p, submitting: true }));
    try {
      await fetch("/api/capture-lead", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: capture.name, email: capture.email, tool: "portability",
          summary: `Score: ${computed.overallPct}% (${computed.overallLevel}) | Core: ${computed.corePct}% | Legal: ${computed.legalPct}% | Advanced: ${computed.advancedPct}% | Transfer: ${computed.expectedTransferRange} | Market: ${profile.market} | Hub: ${profile.mainHub} | Tenure: ${profile.tenureKey} | Wallet: ${profile.walletShareScore}/5 | EAM: ${legalState.eamExposure}/5 | Jurisdiction: ${legalState.jurisdiction || "unspecified"}`,
        }),
      });
    } catch { /* silent fail */ }
    setCapture(p => ({ ...p, submitting: false, done: true, showModal: false }));
    _executeDownload();
  };
 
  /* ── Style helpers ────────────────────────────────────── */
 
  const sev = {
    red: "border-red-500/40 bg-red-500/10 text-red-300",
    amber: "border-amber-500/35 bg-amber-500/10 text-amber-200",
    green: "border-emerald-500/35 bg-emerald-500/10 text-emerald-200",
  };
  const pri = {
    critical: "border-red-500/30 bg-red-500/10 text-red-300",
    important: "border-amber-500/30 bg-amber-500/10 text-amber-200",
    advisory: "border-brandGold/30 bg-brandGold/8 text-brandGoldPale",
  };
  const legalColor = computed.legalPct >= 65 ? "text-emerald-400" : computed.legalPct >= 45 ? "text-amber-400" : "text-red-400";
  const legalBorder = computed.legalPct >= 65 ? "border-emerald-500/25" : computed.legalPct >= 45 ? "border-amber-500/25" : "border-red-500/30";
 
  /* ── JSX ──────────────────────────────────────────────── */
 
  return (
    <>
      {/* Capture Modal */}
      <AnimatePresence>
        {capture.showModal && (
          <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: "rgba(5,8,20,0.90)", backdropFilter: "blur(10px)" }}
            onClick={e => { if (e.target === e.currentTarget) setCapture(p => ({ ...p, showModal: false })); }}
          >
            <motion.div key="card" initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.24 }}
              className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0c1018] p-6 shadow-[0_40px_100px_rgba(0,0,0,0.9)]"
            >
              <div className="mb-5 rounded-xl border border-brandGold/35 bg-black/60 px-4 py-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-0.5">EP Portability Score™</p>
                    <p className="text-3xl font-bold text-brandGold">{computed.overallPct}%</p>
                    <p className="text-xs text-gray-300 mt-0.5">{computed.overallLevel}</p>
                  </div>
                  <div className="text-right text-xs text-gray-400 space-y-1.5 mt-1">
                    <p>Transfer: <span className="text-white font-semibold">{computed.expectedTransferRange}</span></p>
                    <p>Onboarding: <span className="text-white font-semibold">{computed.onboardingSpeed}</span></p>
                    <p>Legal risk: <span className={computed.legalPct >= 65 ? "text-emerald-400 font-semibold" : computed.legalPct >= 45 ? "text-amber-400 font-semibold" : "text-red-400 font-semibold"}>{computed.legalPct}%</span></p>
                  </div>
                </div>
              </div>
 
              <h2 className="text-base font-semibold text-white">Send your full diagnostic to your inbox</h2>
              <p className="mt-1 text-sm text-gray-400">PDF downloads immediately. We may follow up confidentially — no pipeline pressure.</p>
 
              <form onSubmit={handleCaptureSubmit} className="mt-5 space-y-3">
                <input type="text" value={capture.name} onChange={e => setCapture(p => ({ ...p, name: e.target.value }))}
                  placeholder="Name (optional)"
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-brandGold/60 transition"
                />
                <input type="email" required value={capture.email} onChange={e => setCapture(p => ({ ...p, email: e.target.value }))}
                  placeholder="your.name@bank.com"
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-brandGold/60 transition"
                />
                <div className="flex gap-2 pt-1">
                  <button type="submit" disabled={capture.submitting || !capture.email}
                    className="flex-1 rounded-xl bg-brandGold px-4 py-2.5 text-sm font-semibold text-black hover:bg-brandGoldDark disabled:opacity-50 transition"
                  >{capture.submitting ? "One moment…" : "Download PDF →"}</button>
                  <button type="button" onClick={() => setCapture(p => ({ ...p, showModal: false }))}
                    className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-gray-400 hover:text-white transition"
                  >Cancel</button>
                </div>
                <p className="text-[11px] text-gray-500 text-center pt-1">Handled confidentially by Executive Partners. No third-party sharing.</p>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
 
      <div className="mx-auto max-w-6xl space-y-10 px-2 py-4 sm:px-4 sm:py-8 md:py-10">
 
        {/* ── Header ── */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <p className="inline-flex items-center gap-2 rounded-full bg-brandGold/10 px-4 py-1 text-xs font-semibold text-brandGoldPale ring-1 ring-brandGold/40">
                Executive Partners · Geneva · Private Banking & WM
              </p>
              <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
                🔒 Secure & confidential
              </span>
            </div>
            <h1 className="mt-3 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Portability Readiness Score™
            </h1>
            <p className="mt-1 text-sm font-semibold text-brandGoldSoft">Advanced Diagnostic — v2.0 · 2025 Rebuild</p>
            <p className="mt-2 max-w-2xl text-sm text-gray-200/85 md:text-base">
              Six sections. Four new dimensions: wallet share depth, institutional tenure, jurisdiction-specific legal risk, and EAM co-management exposure. Real-time flags and specific recommendations built on 200+ EP placements.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
            <button type="button" onClick={handleDownload} disabled={exporting}
              className="rounded-full bg-brandGold px-5 py-2.5 text-sm font-semibold text-black shadow-lg shadow-brandGold/30 hover:bg-brandGoldDark disabled:opacity-60 transition"
            >{exporting ? "Preparing PDF…" : "Download full PDF diagnostic"}</button>
            <PrimaryButton href="/en/contact" className="whitespace-nowrap">
              Discuss results confidentially
            </PrimaryButton>
          </div>
        </div>
 
        <div ref={captureRef} className="space-y-10">
 
          {/* ══════════════════════════════════════════════════
              SECTION 1 — Profile, Revenue & Tenure
          ═══════════════════════════════════════════════════ */}
          <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
            className="rounded-2xl border border-white/10 bg-black/40 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.7)]"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brandGold/20 text-xs font-bold text-brandGold ring-1 ring-brandGold/40">1</div>
              <h2 className="text-lg font-semibold text-white">Profile, Revenue & Tenure</h2>
            </div>
 
            {/* Tenure — full width, prominent */}
            <div className="mb-6 rounded-xl border border-brandGold/25 bg-black/40 p-4">
              <label className="block text-xs font-semibold text-brandGoldSoft mb-1 uppercase tracking-wider">
                Time at current institution ★ New dimension
              </label>
              <p className="text-[11px] text-gray-400 mb-3">One of the strongest predictors hiring committees use. Affects your overall score via a direct multiplier.</p>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {TENURE_OPTIONS.map(t => (
                  <button key={t.key} type="button" onClick={() => updateProfile({ tenureKey: t.key })}
                    className={`rounded-xl border px-2 py-2.5 text-xs font-medium transition text-center leading-tight ${
                      profile.tenureKey === t.key
                        ? "border-brandGold bg-brandGold/20 text-brandGoldPale"
                        : "border-white/15 bg-black/30 text-gray-300 hover:border-brandGold/40"
                    }`}
                  >{t.label}</button>
                ))}
              </div>
              {profile.tenureKey && (
                <p className="mt-2 text-[11px] text-gray-400">{TENURE_OPTIONS.find(t => t.key === profile.tenureKey)?.note}</p>
              )}
            </div>
 
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {/* Market */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Primary market</label>
                <select value={profile.market} onChange={e => updateProfile({ market: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none">
                  {["CH Onshore", "International (CH Booking)", "MEA / GCC", "LatAm", "Europe (EU/UK)", "Asia (SG/HK)", "US / North America", "Italy", "France", "Iberia (Spain / Portugal)", "CIS / CEE", "Greece / Cyprus"].map(o => (
                    <option key={o} className="bg-[#0B0E13]">{o}</option>
                  ))}
                </select>
              </div>
 
              {/* Hub */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">Main booking hub today</label>
                <select value={profile.mainHub} onChange={e => updateProfile({ mainHub: e.target.value })}
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none">
                  {["Geneva", "Zurich", "London", "Dubai", "Abu Dhabi", "Singapore", "Hong Kong", "New York", "Miami", "Paris", "Milan", "Madrid", "Lisbon", "Luxembourg", "Monaco", "Lausanne", "Basel"].map(o => (
                    <option key={o} className="bg-[#0B0E13]">{o}</option>
                  ))}
                </select>
              </div>
 
              {/* ROA */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">ROA (bps, last 12 months)</label>
                <input type="number" value={profile.roaBps}
                  onChange={e => updateProfile({ roaBps: Number(e.target.value) || 0 })}
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none"
                />
                <p className="mt-1 text-[11px] text-gray-400">Typical CH onshore: ~65–90 bps</p>
              </div>
 
              {/* Wallet Share — NEW */}
              <div className="lg:col-span-2">
                <label className="block text-xs font-semibold text-brandGoldSoft mb-1 uppercase tracking-wider">
                  Wallet share depth ★ New dimension
                </label>
                <select value={profile.walletShareScore}
                  onChange={e => updateProfile({ walletShareScore: Number(e.target.value) })}
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none"
                >
                  {WALLET_OPTIONS.map(w => (
                    <option key={w.score} value={w.score} className="bg-[#0B0E13]">{w.label}</option>
                  ))}
                </select>
                <p className="mt-1 text-[11px] text-gray-400">
                  {WALLET_OPTIONS.find(w => w.score === profile.walletShareScore)?.desc}
                </p>
              </div>
 
              {/* Revenue sliders */}
              <div className="space-y-4 lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-5">
                {[
                  { key: "recurringShare" as const, label: "Recurring revenue share (%)", max: 100, val: profile.recurringShare, hint: `${profile.recurringShare}% recurring (DPM/advisory, trail)` },
                  { key: "eddShare" as const, label: "EDD / complex tax clients (% of book)", max: 100, val: profile.eddShare, hint: `${profile.eddShare}% require enhanced due diligence` },
                  { key: "pepsShare" as const, label: "PEPs / high-profile clients (%)", max: 50, val: profile.pepsShare, hint: `${profile.pepsShare}% PEP / sensitive clients` },
                ].map(({ key, label, max, val, hint }) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-gray-300 mb-1">{label}</label>
                    <input type="range" min={0} max={max} value={val}
                      onChange={e => updateProfile({ [key]: Number(e.target.value) })}
                      className="w-full accent-brandGold"
                    />
                    <p className="mt-1 text-[11px] text-gray-400">{hint}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
 
          {/* ══════════════════════════════════════════════════
              SECTION 2 — Core Portability Dimensions
          ═══════════════════════════════════════════════════ */}
          <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.05 }}
            className="grid gap-6 rounded-2xl border border-brandGold/40 bg-black/50 p-5 shadow-[0_18px_60px_rgba(0,0,0,0.85)] lg:grid-cols-3"
          >
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brandGold/20 text-xs font-bold text-brandGold ring-1 ring-brandGold/40">2</div>
                <h2 className="text-lg font-semibold text-brandGoldSoft">Core Portability Dimensions</h2>
              </div>
              <p className="text-sm text-gray-300">Six dimensions mirroring what front-office hiring committees assess when evaluating whether your book can follow you.</p>
              <p className="mt-2 text-xs text-gray-400">Score 1 (weak) to 5 (very strong). Be conservative — banks will calibrate this in the interview.</p>
              <div className="mt-4 rounded-xl border border-brandGold/30 bg-black/60 p-3">
                <div className="font-semibold text-brandGold">Core: {computed.corePct}%</div>
                <div className="mt-1 text-[11px] text-gray-300">{computed.coreLevel} mobility foundation</div>
              </div>
            </div>
 
            <div className="space-y-5 lg:col-span-2">
              {CORE_DIMENSIONS.map(dim => (
                <div key={dim.key} className="space-y-1">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-white">{dim.label}</p>
                    <p className="text-sm text-gray-300 shrink-0">{coreScores[dim.key]}/5</p>
                  </div>
                  <input type="range" min={1} max={5} value={coreScores[dim.key]}
                    onChange={e => setCoreScores(p => ({ ...p, [dim.key]: Number(e.target.value) }))}
                    className="w-full accent-brandGold"
                  />
                  <p className="text-[11px] text-gray-400">{dim.description}</p>
                </div>
              ))}
            </div>
          </motion.section>
 
          {/* ══════════════════════════════════════════════════
              SECTION 3 — Legal & Structural Risk (NEW)
          ═══════════════════════════════════════════════════ */}
          <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.08 }}
            className={`rounded-2xl border bg-black/50 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.8)] ${legalBorder}`}
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-5">
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-xs font-bold text-red-300 ring-1 ring-red-500/30 mt-0.5">3</div>
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    Legal & Structural Risk
                    <span className="ml-2 text-sm font-normal text-brandGold">★ New section</span>
                  </h2>
                  <p className="mt-1 text-sm text-gray-300">The most underestimated portability dimension. Jurisdiction, garden leave, clawback, and EAM co-management — each can be a standalone disqualifier independent of commercial strength.</p>
                </div>
              </div>
              <div className={`hidden md:block rounded-xl border bg-black/70 px-4 py-3 text-sm text-gray-200 shrink-0 ${legalBorder}`}>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-xs uppercase tracking-wide text-gray-400">Legal score</span>
                  <span className={`text-xl font-bold ${legalColor}`}>{computed.legalPct}%</span>
                </div>
                <p className="mt-1 text-[11px] text-gray-300 max-w-[180px]">{computed.legalLevel}</p>
              </div>
            </div>
 
            <div className="grid gap-6 md:grid-cols-2">
 
              {/* Left: Jurisdiction + Garden leave */}
              <div className="space-y-4">
 
                <div>
                  <label className="block text-xs font-semibold text-brandGoldSoft mb-1 uppercase tracking-wider">
                    Governing law / jurisdiction ★
                  </label>
                  <p className="text-[11px] text-gray-400 mb-2">Your employment contract's governing law clause. The single most important legal input in this assessment.</p>
                  <select value={legalState.jurisdiction}
                    onChange={e => updateLegal({ jurisdiction: e.target.value as JurisdictionKey })}
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none"
                  >
                    <option value="" className="bg-[#0B0E13]">— Select your jurisdiction —</option>
                    {(Object.entries(JURISDICTION_DATA) as [Exclude<JurisdictionKey, "">, JurData][]).map(([key, data]) => (
                      <option key={key} value={key} className="bg-[#0B0E13]">{data.label}</option>
                    ))}
                  </select>
                </div>
 
                {computed.jurData && (
                  <div className={`rounded-xl border p-3 text-xs ${
                    computed.jurData.riskLevel === "high" ? "border-red-500/35 bg-red-500/10"
                    : computed.jurData.riskLevel === "medium" ? "border-amber-500/30 bg-amber-500/8"
                    : "border-emerald-500/30 bg-emerald-500/8"
                  }`}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`font-semibold ${computed.jurData.riskLevel === "high" ? "text-red-300" : computed.jurData.riskLevel === "medium" ? "text-amber-300" : "text-emerald-300"}`}>
                        {computed.jurData.riskLevel === "high" ? "⚠ High enforcement risk" : computed.jurData.riskLevel === "medium" ? "◆ Moderate enforcement risk" : "✓ Low enforcement risk"}
                      </span>
                      <span className="text-gray-500">· Garden leave norm: {computed.jurData.gardenLeaveNorm}</span>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{computed.jurData.note}</p>
                  </div>
                )}
 
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">Garden leave clause duration</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {GARDEN_LEAVE_OPTIONS.map(g => (
                      <button key={g.key} type="button" onClick={() => updateLegal({ gardenLeave: g.key })}
                        className={`rounded-xl border px-2 py-2 text-xs font-medium transition text-center ${
                          legalState.gardenLeave === g.key
                            ? "border-brandGold bg-brandGold/20 text-brandGoldPale"
                            : "border-white/15 bg-black/30 text-gray-300 hover:border-brandGold/40"
                        }`}
                      >{g.label}</button>
                    ))}
                  </div>
                </div>
 
                {/* Clawback */}
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">Retention bonus / clawback</label>
                  <div className="flex gap-2 mb-3">
                    <button type="button" onClick={() => updateLegal({ hasClawback: false, clawbackPct: 0 })}
                      className={`rounded-xl border px-3 py-2 text-xs font-medium transition ${!legalState.hasClawback ? "border-brandGold bg-brandGold/20 text-brandGoldPale" : "border-white/15 bg-black/30 text-gray-300 hover:border-brandGold/40"}`}
                    >No clawback</button>
                    <button type="button" onClick={() => updateLegal({ hasClawback: true })}
                      className={`rounded-xl border px-3 py-2 text-xs font-medium transition ${legalState.hasClawback ? "border-amber-400/60 bg-amber-500/15 text-amber-200" : "border-white/15 bg-black/30 text-gray-300 hover:border-amber-400/40"}`}
                    >Clawback applies</button>
                  </div>
                  {legalState.hasClawback && (
                    <div>
                      <label className="block text-[11px] text-gray-400 mb-1">% of bonus still subject to clawback</label>
                      <input type="range" min={0} max={100} value={legalState.clawbackPct}
                        onChange={e => updateLegal({ clawbackPct: Number(e.target.value) })}
                        className="w-full accent-amber-400"
                      />
                      <p className="mt-1 text-[11px] text-amber-300/80">
                        {legalState.clawbackPct}% outstanding
                        {legalState.clawbackPct > 50 ? " — material exposure. Confirm whether the receiving bank will gross this up in sign-on (most do)." : ""}
                      </p>
                    </div>
                  )}
                </div>
              </div>
 
              {/* Right: EAM Exposure */}
              <div>
                <label className="block text-xs font-semibold text-brandGoldSoft mb-1 uppercase tracking-wider">
                  EAM co-management exposure ★ New
                </label>
                <p className="text-[11px] text-gray-400 mb-3">% of your book co-managed with an External Asset Manager. Receiving banks typically treat this AUM as partially or fully non-portable — they cannot control client onboarding decisions made by the EAM.</p>
                <div className="space-y-2">
                  {EAM_OPTIONS.map(opt => (
                    <button key={opt.score} type="button" onClick={() => updateLegal({ eamExposure: opt.score })}
                      className={`w-full rounded-xl border px-4 py-3 text-left text-xs transition ${
                        legalState.eamExposure === opt.score
                          ? opt.score >= 3
                            ? "border-red-500/50 bg-red-500/15 text-red-200"
                            : "border-brandGold/60 bg-brandGold/15 text-brandGoldPale"
                          : "border-white/10 bg-black/30 text-gray-300 hover:border-white/25"
                      }`}
                    >
                      <span className="font-semibold">{opt.label}</span>
                      {legalState.eamExposure === opt.score && (
                        <span className="block mt-1 text-[11px] opacity-80 leading-relaxed">{opt.note}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
 
            {/* Mobile legal score */}
            <div className={`mt-4 rounded-xl border bg-black/40 px-4 py-3 text-sm md:hidden ${legalBorder}`}>
              <div className="flex items-baseline justify-between">
                <span className="text-xs uppercase tracking-wide text-gray-400">Legal score</span>
                <span className={`text-xl font-bold ${legalColor}`}>{computed.legalPct}%</span>
              </div>
              <p className="mt-1 text-[11px] text-gray-300">{computed.legalLevel}</p>
            </div>
          </motion.section>
 
          {/* ══════════════════════════════════════════════════
              SECTION 4 — Advanced Portability Factors
          ═══════════════════════════════════════════════════ */}
          <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.11 }}
            className="space-y-6 rounded-2xl border border-white/12 bg-black/40 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.8)]"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brandGold/20 text-xs font-bold text-brandGold ring-1 ring-brandGold/40">4</div>
                <div>
                  <h2 className="text-lg font-semibold text-white">Advanced Portability Factors</h2>
                  <p className="mt-0.5 text-sm text-gray-300">Granular dimensions used by banks' hiring committees. These are the factors most subject to self-assessment bias — score what you can evidence, not what feels true.</p>
                </div>
              </div>
              <div className="rounded-xl border border-brandGold/35 bg-black/70 px-4 py-3 shrink-0">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-xs uppercase tracking-wide text-gray-400">Advanced</span>
                  <span className="text-lg font-semibold text-brandGold">{computed.advancedPct}%</span>
                </div>
                <p className="mt-1 text-[11px] text-gray-300">{computed.advancedLevel}</p>
              </div>
            </div>
 
            <div className="grid gap-5 md:grid-cols-2">
              {ADVANCED_DIMENSIONS.map(dim => {
                const isRelDepth = dim.key === "relationshipDepth";
                const showWarn = isRelDepth && advancedScores.relationshipDepth >= 5 && advancedScores.pastPortability <= 2;
                return (
                  <div key={dim.key} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white">{dim.label}</span>
                      <span className="text-gray-300 shrink-0 ml-4">{advancedScores[dim.key]}/5</span>
                    </div>
                    <input type="range" min={1} max={5} value={advancedScores[dim.key]}
                      onChange={e => setAdvancedScores(p => ({ ...p, [dim.key]: Number(e.target.value) }))}
                      className="w-full accent-brandGold"
                    />
                    <p className="text-[11px] text-gray-400">{dim.description}</p>
                    {showWarn && (
                      <p className="text-[11px] text-amber-400/90 mt-1">⚠ Maximum relationship depth with limited past portability evidence — banks will probe this with specific examples. Ensure your score is evidenceable.</p>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.section>
 
          {/* ══════════════════════════════════════════════════
              SECTION 5 — Geographic Coverage
          ═══════════════════════════════════════════════════ */}
          <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.14 }}
            className="rounded-2xl border border-white/10 bg-black/40 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.7)]"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brandGold/20 text-xs font-bold text-brandGold ring-1 ring-brandGold/40">5</div>
              <h2 className="text-lg font-semibold text-white">Geographic Coverage & Regulatory Permissions</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">Booking centres your clients can follow</h3>
                <p className="text-xs text-gray-400 mb-3">Select locations where a meaningful portion of your book could be onboarded. More coverage = higher geographic multiplier.</p>
                <div className="flex flex-wrap gap-2">
                  {BOOKING_CENTRES.map(bc => (
                    <button key={bc} type="button"
                      onClick={() => setBookingCentres(p => ({ ...p, [bc]: !p[bc] }))}
                      className={`rounded-full border px-3 py-1 text-xs transition ${bookingCentres[bc] ? "border-brandGold bg-brandGold/20 text-brandGoldPale" : "border-white/15 bg-black/40 text-gray-200 hover:border-brandGold/60"}`}
                    >{bc}</button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">Regulatory permissions you hold today</h3>
                <p className="text-xs text-gray-400 mb-3">Select the regimes you are effectively licensed to service. Each additional permission adds a multiplier to your advanced score.</p>
                <div className="flex flex-wrap gap-2">
                  {REG_PERMISSIONS.map(p => (
                    <button key={p} type="button"
                      onClick={() => setPermissions(prev => ({ ...prev, [p]: !prev[p] }))}
                      className={`rounded-full border px-3 py-1 text-xs transition ${permissions[p] ? "border-brandGold bg-brandGold/20 text-brandGoldPale" : "border-white/15 bg-black/40 text-gray-200 hover:border-brandGold/60"}`}
                    >{p}</button>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
 
          {/* ══════════════════════════════════════════════════
              SECTION 6 — EP Diagnostic
          ═══════════════════════════════════════════════════ */}
          <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.17 }}
            className="space-y-6 rounded-2xl border border-brandGold/40 bg-black/60 p-5 shadow-[0_28px_80px_rgba(0,0,0,0.95)]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brandGold/20 text-xs font-bold text-brandGold ring-1 ring-brandGold/40">6</div>
              <h2 className="text-lg font-semibold text-white">EP Diagnostic — Score, Flags & Recommendations</h2>
            </div>
 
            {/* Score grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Overall Score", value: `${computed.overallPct}%`, sub: computed.overallLevel, highlight: true, color: "" },
                { label: "Core Foundation", value: `${computed.corePct}%`, sub: `${computed.coreLevel} mobility foundation`, highlight: false, color: "" },
                { label: "Legal & Structure", value: `${computed.legalPct}%`, sub: computed.legalLevel, highlight: false,
                  color: computed.legalPct >= 65 ? "text-emerald-400" : computed.legalPct >= 45 ? "text-amber-400" : "text-red-400" },
                { label: "Advanced Factors", value: `${computed.advancedPct}%`, sub: `${computed.advancedLevel} portability`, highlight: false, color: "" },
              ].map(card => (
                <div key={card.label} className={`rounded-2xl border p-4 ${card.highlight ? "border-brandGold/50 bg-brandGold/5" : "border-white/10 bg-black/40"}`}>
                  <p className="text-[11px] uppercase tracking-wide text-gray-400">{card.label}</p>
                  <p className={`text-2xl font-bold mt-1 ${card.highlight ? "text-brandGold" : card.color || "text-white"}`}>{card.value}</p>
                  <p className="text-[11px] text-gray-300 mt-1 leading-tight">{card.sub}</p>
                </div>
              ))}
            </div>
 
            {/* EP Benchmark bar */}
            <div className="rounded-xl border border-white/10 bg-black/50 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">EP Benchmark</p>
                <p className="text-xs font-medium text-brandGold">{computed.epBenchmarkLabel}</p>
              </div>
              <div className="relative h-2.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-brandGold/70 to-brandGold"
                  initial={{ width: 0 }} animate={{ width: `${computed.overallPct}%` }} transition={{ duration: 1, delay: 0.3 }}
                />
                <div className="absolute top-0 bottom-0 w-px bg-white/40" style={{ left: "65%" }} />
                <div className="absolute top-0 bottom-0 w-px bg-brandGold/60" style={{ left: "80%" }} />
              </div>
              <div className="flex justify-between mt-1.5 text-[10px] text-gray-500">
                <span>0%</span>
                <span className="absolute" style={{ left: "calc(65% - 20px)", position: "relative" }}>Median 65%</span>
                <span>Top quartile 80%</span>
              </div>
            </div>
 
            {/* Transfer & onboarding */}
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: "Expected transfer range", value: computed.expectedTransferRange, note: "Based on EP placement data. Not a guarantee — every receiving bank applies its own filters." },
                { label: "Indicative onboarding", value: computed.onboardingSpeed, note: "Due diligence, approvals, documentation refresh, initial client transfers." },
                { label: "Score adjustments applied", value: `Wallet ${computed.walletMultiplier >= 1 ? "+" : ""}${((computed.walletMultiplier - 1) * 100).toFixed(0)}% · Tenure ${computed.tenureMultiplier >= 1 ? "+" : ""}${((computed.tenureMultiplier - 1) * 100).toFixed(0)}%`, note: "These multipliers reflect dimensions absent from older portability tools." },
              ].map(item => (
                <div key={item.label} className="rounded-xl border border-white/15 bg-black/50 p-3 text-xs">
                  <p className="text-gray-400">{item.label}</p>
                  <p className="font-semibold text-brandGold text-sm mt-0.5">{item.value}</p>
                  <p className="text-gray-500 mt-1 leading-relaxed">{item.note}</p>
                </div>
              ))}
            </div>
 
            {/* Risk Flags */}
            {computed.flags.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  Risk Flags
                  <span className="text-[11px] font-normal text-gray-400">({computed.flags.filter(f => f.severity === "red").length} critical · {computed.flags.filter(f => f.severity === "amber").length} warnings · {computed.flags.filter(f => f.severity === "green").length} positive)</span>
                </h3>
                <div className="space-y-2">
                  {computed.flags.map((flag, i) => (
                    <div key={i} className={`rounded-xl border px-4 py-3 text-xs ${sev[flag.severity]}`}>
                      <div className="flex items-start gap-2.5">
                        <span className="shrink-0 text-sm mt-0.5">{flag.severity === "red" ? "🔴" : flag.severity === "amber" ? "🟡" : "🟢"}</span>
                        <div>
                          <p className="font-semibold mb-0.5">{flag.title}</p>
                          <p className="opacity-80 leading-relaxed">{flag.detail}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
 
            {/* Recommendations */}
            {computed.recommendations.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Specific Recommendations</h3>
                <div className="space-y-2">
                  {computed.recommendations.map((rec, i) => (
                    <div key={i} className={`rounded-xl border px-4 py-3 text-xs ${pri[rec.priority]}`}>
                      <div className="flex items-start gap-3">
                        <span className={`mt-0.5 shrink-0 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${pri[rec.priority]}`}>
                          {rec.priority}
                        </span>
                        <div>
                          <p className="font-semibold mb-0.5">{rec.action}</p>
                          <p className="opacity-75 leading-relaxed">{rec.detail}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.section>
 
          {/* ── Next Steps ── */}
          <section className="rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-gray-200">
            <h2 className="text-lg font-semibold text-white">Next steps with Executive Partners</h2>
            <p className="mt-2">If your portability profile is commercially credible, we can help you approach the right platforms and booking centres in a structured, discreet process — one that protects your reputation throughout.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <PrimaryButton href="/en/contact">Share my profile & book a call</PrimaryButton>
              <SecondaryButton href="/en/jobs">View live mandates</SecondaryButton>
              <SecondaryButton href="/en/markets">Explore booking centres</SecondaryButton>
            </div>
            <p className="mt-3 text-[11px] text-gray-400">
              This tool is indicative and for preparation purposes only. Final onboarding decisions rest solely with the receiving institution and its compliance, tax, legal and risk frameworks. This is not legal advice — consult a qualified employment lawyer for your specific situation.
            </p>
          </section>
 
        </div>
      </div>
    </>
  );
}