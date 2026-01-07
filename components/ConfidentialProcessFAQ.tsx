"use client";

import * as React from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type Item = { q: string; a: React.ReactNode };

export default function ConfidentialProcessFAQ({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [open, setOpen] = React.useState<string | null>(null);

  const steps = [
    {
      title: "Week 1–2 · Initial Assessment",
      lines: [
        "You: Submit a short pre-qualification questionnaire (≈10 minutes).",
        "Us: Respond within 48 hours with feedback.",
        "Mutual fit: Schedule a 30-minute confidential phone call.",
      ],
    },
    {
      title: "Week 2–3 · Detailed Discussion",
      lines: [
        "Phone conversation: Your business case, our opportunity overview.",
        "Client identity revealed (if mutual interest is confirmed).",
        "You decide: Proceed to formal application or decline (no obligation).",
      ],
    },
    {
      title: "Week 3–4 · Formal Application",
      lines: [
        "You: Submit CV, portability analysis, references (not contacted).",
        "Us: Present your profile to the client (anonymised initially).",
        "Client interest: We coordinate a first meeting.",
      ],
    },
    {
      title: "Week 4–8 · Client Interview Process",
      lines: [
        "Meeting 1: Team Head / Desk lead (confidential).",
        "Meeting 2: Regional Head, business case deep-dive.",
        "Meeting 3: Final discussion, compensation negotiation.",
      ],
    },
    {
      title: "Week 8–12 · Offer & Transition",
      lines: [
        "Offer structuring: We support negotiation.",
        "Transition planning: Notice period, client communication.",
      ],
    },
  ];

  const faqs: Item[] = [
    {
      q: "When will I learn the bank’s identity?",
      a: (
        <>
          After our initial 30-minute phone conversation, if mutual interest is
          confirmed. This typically happens within one week of your initial
          enquiry.
        </>
      ),
    },
    {
      q: "Will you contact my current employer?",
      a: (
        <>
          Never. We do not verify employment, contact references, or make any
          enquiries without your explicit written authorisation.
        </>
      ),
    },
    {
      q: "What if I apply and it’s my current bank?",
      a: (
        <>
          We screen for conflicts immediately. If there’s any overlap, we inform
          you before proceeding and stop the process.
        </>
      ),
    },
    {
      q: "How is my data protected?",
      a: (
        <>
          We follow GDPR-aligned processes and confidentiality-first handling. We
          only share your details with client consent, and you can request
          deletion at any time.
        </>
      ),
    },
    {
      q: "Do I pay any fees?",
      a: <>No. All fees are paid by the hiring institution.</>,
    },
    {
      q: "What if I’m not selected?",
      a: (
        <>
          If you’re a strong profile, we keep you in our confidential talent
          pool and proactively contact you when relevant mandates open.
        </>
      ),
    },
  ];

  const Panel = ({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
  }) => {
    const isOpen = open === id;
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03]">
        <button
          type="button"
          onClick={() => setOpen(isOpen ? null : id)}
          className={cn(
            "flex w-full items-center justify-between gap-4 px-5 py-4 text-left",
            "outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/35"
          )}
          aria-expanded={isOpen}
        >
          <div>
            <div className="text-sm font-semibold tracking-tight text-white">
              {title}
            </div>
            {!compact ? (
              <div className="mt-1 text-xs text-white/55">
                Click to {isOpen ? "hide" : "view"}
              </div>
            ) : null}
          </div>
          <div
            className={cn(
              "h-8 w-8 shrink-0 rounded-full border border-white/10 bg-black/20",
              "flex items-center justify-center text-white/70"
            )}
          >
            {isOpen ? "–" : "+"}
          </div>
        </button>

        {isOpen ? (
          <div className="px-5 pb-5 pt-0 text-sm text-white/75">{children}</div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="mt-6 space-y-3">
      <Panel id="process" title="Our Confidential Selection Process">
        <div className="space-y-4">
          {steps.map((s) => (
            <div key={s.title} className="rounded-xl border border-white/10 bg-black/15 p-4">
              <div className="text-sm font-semibold text-white">{s.title}</div>
              <ul className="mt-2 space-y-1 text-sm text-white/75">
                {s.lines.map((l) => (
                  <li key={l} className="flex gap-2">
                    <span className="mt-[2px] text-[#d4af37]/80">•</span>
                    <span>{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/10 p-4 text-sm text-white/80">
            <div className="text-[12px] uppercase tracking-wider text-[#d4af37]">
              Key points
            </div>
            <div className="mt-2 space-y-1">
              <div>✓ Timeline flexible depending on notice period</div>
              <div>✓ All conversations held in strict confidence</div>
              <div>✓ We never contact current employers without authorisation</div>
            </div>
          </div>
        </div>
      </Panel>

      <Panel id="faq" title="Frequently Asked Questions">
        <div className="space-y-3">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-xl border border-white/10 bg-black/15 p-4">
              <div className="text-sm font-semibold text-white">{f.q}</div>
              <div className="mt-2 text-sm text-white/75">{f.a}</div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}