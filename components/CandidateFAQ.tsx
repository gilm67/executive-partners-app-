"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  CheckCircle,
  Clock,
  Shield,
  DollarSign,
  TrendingUp,
  ArrowRight,
  Search,
  X,
} from "lucide-react";

type FaqItem = { q: string; a: string };
type FaqSection = {
  title: string;
  icon: React.ElementType;
  questions: FaqItem[];
};

type FlatFaqItem = {
  section: string;
  icon: React.ElementType;
  q: string;
  a: string;
};

type Group = {
  section: string;
  icon: React.ElementType;
  items: FlatFaqItem[];
};

export default function CandidateFAQ({
  compact = false,
  limit = 6,
  anchorId = "faqs",
}: {
  compact?: boolean;
  limit?: number;
  anchorId?: string;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("All");
  const [query, setQuery] = useState("");

  const pathname = usePathname();

  // Locale-safe base (supports /en, /fr, /de). If no locale, base = ""
  const base = useMemo(() => {
    if (!pathname) return "";
    const seg = pathname.split("/").filter(Boolean)[0];
    const locales = new Set(["en", "fr", "de"]);
    return seg && locales.has(seg) ? `/${seg}` : "";
  }, [pathname]);

  const toggle = (key: string) => setOpen((prev) => (prev === key ? null : key));

  // ✅ Content kept verbatim, improved UX: search + filters + compact mode
  const faqSections: FaqSection[] = useMemo(
    () => [
      {
        title: "General Questions",
        icon: HelpCircle,
        questions: [
          {
            q: "Do I pay any fees for your services?",
            a: "No. Our fees are paid entirely by hiring banks. You never pay anything to work with Executive Partners. This is standard in executive recruitment across the banking sector—employers value top talent and invest accordingly.",
          },
          {
            q: "How confidential is this process?",
            a: "Completely confidential. We never contact your current employer or disclose your interest in moving to anyone without your explicit permission. Most of our conversations happen outside office hours and we use personal email addresses, not work emails. This is standard best practice in executive recruitment and reflects our commitment to protecting your career.",
          },
          {
            q: "I'm not actively looking but want to understand my options. Can I still talk to you?",
            a: "Absolutely. Most of our best placements come from passive candidates—professionals who weren't actively job hunting but were open to the right opportunity. These hires bring stability, proven track records, and strong client relationships, which is exactly what hiring banks value most. We can help you understand your market value and options without any commitment to move. There's no risk in exploring your options.",
          },
          {
            q: "How long does a typical placement take?",
            a: "From first conversation to signed offer: 8-16 weeks on average. The timeline depends on several factors: bank approval process (regulatory approvals, compliance sign-off, senior management sign-off), your notice period at your current employer, regulatory requirements in your jurisdiction, complexity of your client portfolio (due diligence on AUM portability and client concentration), and organizational structure of the hiring bank (larger banks require more approvals; boutiques may move faster). Experienced relationship manager placements often fall toward the longer end of this range due to additional due diligence on your book of business and client relationships.",
          },
          {
            q: "Do you have roles in [specific city]?",
            a: "We work on mandates across multiple global markets spanning Europe (Geneva, Zurich, London, Frankfurt, Paris, Madrid, Milano), the Middle East (Dubai, Abu Dhabi), Asia-Pacific (Singapore, Hong Kong), and the Americas (New York, Miami). If we don't currently have an active role matching your profile in your target location, we'll keep you in our database and reach out when relevant opportunities arise. We also offer proactive market mapping if you're targeting a specific bank or region—we can help you understand the landscape, timing, and realistic entry points.",
          },
        ],
      },
      {
        title: "About Your Book",
        icon: TrendingUp,
        questions: [
          {
            q: "What if my AUM isn't fully portable?",
            a: "We're realistic about portability. Most relationship managers transfer 30-80% of their book when moving to a new bank. This variance depends significantly on: client composition (institutional vs. individual clients, concentration by geography), relationship strength (depth of relationship, likelihood clients will follow), regulatory jurisdiction (some jurisdictions have stronger client-bank relationships), and competitive factors (strength of your personal relationships vs. the bank brand). Banks understand this and price offers accordingly. Our Portability Score tool helps estimate realistic transfer rates based on your specific client profile, so you can build credible business plans with accurate assumptions.",
          },
          {
            q: "How do you verify my AUM claims?",
            a: "We don't verify on behalf of candidates—that's the hiring bank's job during their due diligence process. However, we coach you extensively on what documentation banks will request so there are no surprises. Typical documentation includes: portfolio statements (anonymized client holdings), client lists with anonymized names and AUM, revenue reports (fee income from each client relationship), AUM breakdown by asset class and geography, client concentration analysis, fee/revenue structure analysis, client tenure analysis, regulatory and licensing certifications, and non-compete and non-solicitation agreement analysis from your current employer.",
          },
          {
            q: "What if some of my clients have compliance issues?",
            a: "Be upfront about this early. Banks will discover it anyway during due diligence, and honesty is always the best approach. Compliance issues don't automatically disqualify you—banks understand that RMs inherit client bases and manage risk profiles carefully. However, transparency prevents surprises that could derail offers at the final stage. We help you frame compliance challenges honestly, demonstrate your risk management approach, understand which issues are likely to impact portability or job eligibility, and prepare disclosure documentation. Early disclosure almost always leads to better outcomes.",
          },
        ],
      },
      {
        title: "About Our Process",
        icon: CheckCircle,
        questions: [
          {
            q: "How does the candidate vetting process work?",
            a: "We're selective about which candidates we represent because we want to match you with banks where you'll genuinely succeed. Our vetting includes understanding: your book of business and likely portability, your professional background and expertise, your career motivations and what you're looking for in your next role, regulatory and compliance profile, and your fit with specific banks' cultures and strategies. If we think there's a genuine match with an active mandate, we'll introduce you and manage the process.",
          },
          {
            q: "What's your role in the hiring process?",
            a: "We act as your advocate and advisor throughout the process: market positioning (we help you understand how to position your experience and book in the market), bank introduction (we introduce you to banks with active mandates that match your profile), negotiation (we advise you on compensation, terms, and non-compete implications), due diligence (we coach you on documentation, interviews, and regulatory approval processes), and close (we help manage final negotiations and onboarding logistics). We're not a transaction—we're a partner in your career transition.",
          },
          {
            q: "What if I want to stay confidential while exploring?",
            a: "That's exactly why most candidates reach out to us. We manage confidentiality carefully: no LinkedIn messages or work emails, conversations happen outside office hours, no contact with your employer without explicit written permission, bank introductions are discreet and don't flag your interest internally, and we can position you as a 'passive candidate' the bank approached, rather than someone actively seeking change. This protects your current role while you explore options.",
          },
        ],
      },
      {
        title: "Compensation & Roles",
        icon: DollarSign,
        questions: [
          {
            q: "What kind of compensation should I expect?",
            a: "Compensation for senior relationship managers varies significantly by: bank size and profitability (boutiques vs. universals often have different comp structures), geography (Switzerland, UK, and Middle East typically offer higher comp than continental Europe), your book size and revenue generation, and seniority level (Senior RM, VP, Senior VP roles have different ranges). We'll give you realistic compensation expectations based on your profile and the specific bank. We also negotiate on your behalf to ensure you're positioned competitively.",
          },
          {
            q: "Are there roles for different experience levels?",
            a: "Yes. We work on mandates for: experienced RMs (7+ years) looking to move between banks or accelerate growth, rising talents (3-7 years) targeting VP promotions or specialization in alternatives/emerging markets, and relocating professionals (same level, geographic move to build new markets). Most of our activity is in the experienced RM segment, but we regularly work on roles across the spectrum.",
          },
        ],
      },
      {
        title: "When You're Ready to Move",
        icon: Clock,
        questions: [
          {
            q: "What happens after I sign an offer?",
            a: "Our relationship doesn't end at the offer—we support you through: regulatory approvals (working with compliance at your new bank to complete approvals), notice period management (navigating non-compete agreements and confidentiality), client transition planning (logistics of moving your book and client communications), and onboarding (first 90 days at your new bank, integration with new team). Your success in the first 100 days often determines whether this move was the right decision.",
          },
          {
            q: "What if the placement doesn't work out?",
            a: "This is rare (our retention rate for placed candidates is very high), but it does happen occasionally. We maintain relationships with candidates long-term because the private banking market is relatively small and interconnected. A successful 18-month tenure is far better for everyone than a failed 6-month exit. If a role genuinely isn't working, we help you understand why and support you in finding the right next move—whether that's at another bank or within your current organization.",
          },
        ],
      },
      {
        title: "Next Steps",
        icon: Shield,
        questions: [
          {
            q: "How do I get started?",
            a: "Simply reach out with your LinkedIn profile or a brief CV. We'll schedule a confidential conversation to: understand your background and book of business, discuss your career aspirations and what you're looking for, assess whether we currently have active mandates that match your profile, and if not, we'll add you to our candidate database for future opportunities. There's no commitment—it's just a conversation to see if we can help.",
          },
          {
            q: "How long will it take before you contact me with opportunities?",
            a: "If we see a strong match with an active mandate, we'll reach out within 2-4 weeks. If not, we'll keep your profile active in our database and contact you when opportunities align with your profile and preferences. The private banking recruitment market moves in cycles—demand for relationship managers spikes around year-end and mid-year. If you're not hearing from us, it likely means we don't currently have the right fit, but that changes frequently.",
          },
          {
            q: "Is there a cost to work with you?",
            a: "No. As mentioned, hiring banks pay all fees. Your only investment is your time in conversations with us and with potential banks. We believe both are worth it if we find the right opportunity.",
          },
        ],
      },
    ],
    []
  );

  // Flatten for search + compact mode
  const allItems: FlatFaqItem[] = useMemo(() => {
    return faqSections.flatMap((section) =>
      section.questions.map((item) => ({
        section: section.title,
        icon: section.icon,
        q: item.q,
        a: item.a,
      }))
    );
  }, [faqSections]);

  const sectionTitles = useMemo(
    () => ["All", ...faqSections.map((s) => s.title)],
    [faqSections]
  );

  const filtered: FlatFaqItem[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allItems.filter((item) => {
      const inSection = activeSection === "All" || item.section === activeSection;
      const inQuery =
        !q || item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
      return inSection && inQuery;
    });
  }, [allItems, activeSection, query]);

  const displayed: FlatFaqItem[] = useMemo(() => {
    if (compact) return filtered.slice(0, limit);
    return filtered;
  }, [filtered, compact, limit]);

  const resultsLabel = useMemo(() => {
    if (compact) return null;
    if (!query && activeSection === "All") return `${allItems.length} questions`;
    return `${filtered.length} result${filtered.length === 1 ? "" : "s"}`;
  }, [compact, query, activeSection, allItems.length, filtered.length]);

  // ✅ FIX: always build typed groups; never return non-React values in JSX
  const groups: Group[] = useMemo(() => {
    if (compact) {
      return [
        {
          section: "Top questions",
          icon: HelpCircle,
          items: displayed,
        },
      ];
    }

    return faqSections
      .map((section) => {
        const items = displayed.filter((i) => i.section === section.title);
        return { section: section.title, icon: section.icon, items };
      })
      .filter((g) => g.items.length > 0);
  }, [compact, displayed, faqSections]);

  return (
    <section
      id={anchorId}
      className="py-16 border-t border-white/10 bg-black/25 scroll-mt-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/80">
            <HelpCircle className="h-4 w-4 text-[#F5D778]" />
            FAQ • Candidates • Confidential process
          </div>

          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-white">
            Frequently asked questions
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm md:text-base text-white/70">
            Clear answers on confidentiality, portability, timing, and compensation—so you can
            evaluate options without noise.
          </p>

          {/* Stunning improvement: Search + Filter (auto-hidden in compact) */}
          {!compact && (
            <div className="mt-6 mx-auto max-w-4xl">
              {/* Search */}
              <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur shadow-[0_18px_55px_rgba(0,0,0,.55)]">
                <Search className="h-4 w-4 text-white/60" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search FAQ (e.g., portability, confidentiality, timeline, compensation...)"
                  className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="rounded-full p-1 hover:bg-white/5"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4 text-white/60" />
                  </button>
                )}
              </div>

              {/* Filter pills */}
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                {sectionTitles.map((t) => {
                  const active = activeSection === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setActiveSection(t);
                        setOpen(null);
                      }}
                      className={[
                        "rounded-full px-4 py-2 text-xs font-semibold transition-colors",
                        active
                          ? "bg-[#F5D778] text-black"
                          : "bg-white/5 text-white/75 ring-1 ring-white/10 hover:bg-white/10",
                      ].join(" ")}
                    >
                      {t}
                    </button>
                  );
                })}
                <span className="ml-1 text-xs text-white/50">{resultsLabel}</span>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="grid gap-6">
          {displayed.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center text-white/70">
              No results found. Try a different keyword.
            </div>
          ) : (
            groups.map((group) => {
              const Icon = group.icon || HelpCircle;

              return (
                <div
                  key={group.section}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur shadow-[0_18px_55px_rgba(0,0,0,.55)] overflow-hidden"
                >
                  <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10 bg-gradient-to-r from-white/[0.06] to-transparent">
                    <div className="h-10 w-10 rounded-xl bg-[#C9A14A]/15 ring-1 ring-[#C9A14A]/35 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-[#F5D778]" />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-white">
                      {group.section}
                    </h3>
                  </div>

                  <div className="divide-y divide-white/10">
                    {group.items.map((item, qIdx) => {
                      const key = `${group.section}-${qIdx}-${item.q.slice(0, 12)}`;
                      const isOpen = open === key;

                      return (
                        <div key={key}>
                          <button
                            onClick={() => toggle(key)}
                            className="w-full text-left px-6 py-5 hover:bg-white/[0.04] transition focus:outline-none"
                          >
                            <div className="flex items-start justify-between gap-6">
                              <div className="flex items-start gap-3">
                                <span className="mt-0.5 h-6 w-6 rounded-full bg-white/5 ring-1 ring-white/10 flex items-center justify-center">
                                  <CheckCircle className="h-4 w-4 text-emerald-300" />
                                </span>
                                <h4 className="text-sm md:text-base font-semibold text-white/90">
                                  {item.q}
                                </h4>
                              </div>

                              {isOpen ? (
                                <ChevronUp className="h-5 w-5 text-white/70 shrink-0 mt-0.5" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-white/50 shrink-0 mt-0.5" />
                              )}
                            </div>
                          </button>

                          {isOpen && (
                            <div className="px-6 pb-6">
                              <div className="pl-9 pr-1 border-l border-[#D4AF37]/35">
                                <p className="text-sm md:text-[0.95rem] leading-relaxed text-white/75 whitespace-pre-line">
                                  {item.a}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Compact footer link */}
        {compact && (
          <div className="mt-6 text-center">
            <Link
              href={`${base}/candidates#${anchorId}`}
              className="inline-flex items-center gap-2 text-sm text-[#F5D778] hover:underline"
            >
              View all FAQs <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}

        {/* CTA (keep on full version only) */}
        {!compact && (
          <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.06] to-white/[0.02] p-8 text-center backdrop-blur shadow-[0_22px_70px_rgba(0,0,0,.55)]">
            <h3 className="text-2xl md:text-3xl font-semibold text-white">
              Still have questions?
            </h3>
            <p className="mt-3 text-white/70">
              Book a confidential call, or reach out by email. No pressure—just clarity.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <a
                href="mailto:recruiter@execpartners.ch"
                className="inline-flex items-center justify-center rounded-full bg-white/5 px-7 py-3 text-sm font-semibold text-white ring-1 ring-white/15 hover:bg-white/10"
              >
                Email us <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5D778] px-7 py-3 text-sm font-semibold text-black shadow-lg shadow-black/40 hover:brightness-110"
              >
                Schedule a call <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}