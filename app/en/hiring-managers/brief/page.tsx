import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Share a Hiring Brief – Executive Partners",
  description:
    "Share a confidential hiring brief for senior private banking roles. We revert with clarifying questions or a proposed call slot.",
};

export default function HiringManagersBriefPage() {
  return (
    <main className="min-h-[70vh] bg-[#0B0E13] px-4 py-12 text-white md:px-6 md:py-16 lg:px-10">
      <section className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-white/10 bg-black/50 px-6 py-8 shadow-[0_22px_60px_rgba(0,0,0,0.75)] backdrop-blur md:px-10 md:py-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-300/80">
            For Hiring Managers
          </p>
          <h1 className="mt-3 text-2xl font-semibold md:text-3xl">
            Share a confidential hiring brief
          </h1>
          <p className="mt-3 text-sm text-slate-200/85 md:text-base">
            Outline the mandate in 3–5 minutes. We will revert the same business
            day with clarifying questions or a proposed call slot. Please avoid
            naming specific clients or disclosing sensitive account numbers.
          </p>

          {/* NOTE: wire this form to an API route or email handler later */}
          <form className="mt-6 space-y-7">
            {/* SECTION: MANDATE OVERVIEW */}
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300/80">
                Mandate overview
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="bookingCentre"
                    className="text-xs font-medium text-slate-200 md:text-sm"
                  >
                    Booking centre / legal entity
                  </label>
                  <input
                    id="bookingCentre"
                    name="bookingCentre"
                    placeholder="e.g. Geneva, Zurich, DIFC, Singapore, London"
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="marketFocus"
                    className="text-xs font-medium text-slate-200 md:text-sm"
                  >
                    Market focus
                  </label>
                  <input
                    id="marketFocus"
                    name="marketFocus"
                    placeholder="e.g. CH onshore, LatAm offshore, GCC, UK-res non-dom"
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="mandateSummary"
                  className="text-xs font-medium text-slate-200 md:text-sm"
                >
                  Short mandate summary
                </label>
                <textarea
                  id="mandateSummary"
                  name="mandateSummary"
                  rows={3}
                  placeholder="1–2 sentences on why you are hiring and what success looks like."
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>
            </div>

            {/* SECTION: ROLE & TEAM */}
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300/80">
                Role &amp; team
              </p>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="roleTitle"
                    className="text-xs font-medium text-slate-200 md:text-sm"
                  >
                    Role title / seniority
                  </label>
                  <input
                    id="roleTitle"
                    name="roleTitle"
                    placeholder="e.g. Director / MD RM, Team Head, Market Leader"
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="reportingLine"
                    className="text-xs font-medium text-slate-200 md:text-sm"
                  >
                    Reporting line
                  </label>
                  <input
                    id="reportingLine"
                    name="reportingLine"
                    placeholder="e.g. Desk Head, Market Head, Global Head"
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="teamContext"
                  className="text-xs font-medium text-slate-200 md:text-sm"
                >
                  Team context
                </label>
                <textarea
                  id="teamContext"
                  name="teamContext"
                  rows={3}
                  placeholder="Size and shape of the existing team, product set, booking centres, coverage model."
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>
            </div>

            {/* SECTION: CANDIDATE & BOOK PROFILE */}
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300/80">
                Candidate &amp; book profile
              </p>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1.5 md:col-span-1">
                  <label
                    htmlFor="minPortableAum"
                    className="text-xs font-medium text-slate-200 md:text-sm"
                  >
                    Target portable AUM (range)
                  </label>
                  <input
                    id="minPortableAum"
                    name="minPortableAum"
                    placeholder="e.g. 80–150m, 200m+"
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-1">
                  <label
                    htmlFor="targetSegments"
                    className="text-xs font-medium text-slate-200 md:text-sm"
                  >
                    Client segments
                  </label>
                  <input
                    id="targetSegments"
                    name="targetSegments"
                    placeholder="e.g. UHNW, upper HNW, entrepreneurs, family offices"
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  />
                </div>
                <div className="space-y-1.5 md:col-span-1">
                  <label
                    htmlFor="languages"
                    className="text-xs font-medium text-slate-200 md:text-sm"
                  >
                    Languages
                  </label>
                  <input
                    id="languages"
                    name="languages"
                    placeholder="e.g. EN/FR, EN/DE, EN/ES/PT, AR, ZH"
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="bookCharacteristics"
                  className="text-xs font-medium text-slate-200 md:text-sm"
                >
                  Ideal book characteristics
                </label>
                <textarea
                  id="bookCharacteristics"
                  name="bookCharacteristics"
                  rows={3}
                  placeholder="Mix of DPM/advisory, lending, Alts, structured products; onshore vs offshore split; key jurisdictions."
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>
            </div>

            {/* SECTION: ECONOMICS & BUSINESS CASE */}
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300/80">
                Economics &amp; business case
              </p>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1.5">
                  <label
                    htmlFor="targetRoa"
                    className="text-xs font-medium text-slate-200 md:text-sm"
                  >
                    Target ROA (approx.)
                  </label>
                  <input
                    id="targetRoa"
                    name="targetRoa"
                    placeholder="e.g. 60–80 bps, 80–100 bps"
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="targetNnm"
                    className="text-xs font-medium text-slate-200 md:text-sm"
                  >
                    NNM expectations (3-year view)
                  </label>
                  <input
                    id="targetNnm"
                    name="targetNnm"
                    placeholder="e.g. 30 / 40 / 50m per year"
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="compBudget"
                    className="text-xs font-medium text-slate-200 md:text-sm"
                  >
                    Compensation budget (base &amp; bonus)
                  </label>
                  <input
                    id="compBudget"
                    name="compBudget"
                    placeholder="e.g. base band + bonus target"
                    className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-300/80">
                If helpful, we can pre-build a{" "}
                <Link
                  href="/en/bp-simulator"
                  className="underline underline-offset-2"
                >
                  3-year business plan
                </Link>{" "}
                with you for this role before you open the mandate formally.
              </p>
            </div>

            {/* SECTION: COMPLIANCE & PROCESS */}
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300/80">
                Compliance &amp; process
              </p>

              <div className="space-y-1.5">
                <label
                  htmlFor="licensing"
                  className="text-xs font-medium text-slate-200 md:text-sm"
                >
                  Licensing / regulatory requirements
                </label>
                <textarea
                  id="licensing"
                  name="licensing"
                  rows={2}
                  placeholder="Local licences, cross-border frameworks, off-limits jurisdictions, risk appetite notes."
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="process"
                  className="text-xs font-medium text-slate-200 md:text-sm"
                >
                  Process &amp; timelines
                </label>
                <textarea
                  id="process"
                  name="process"
                  rows={2}
                  placeholder="Target start date, interview steps, key decision-makers, confidentiality considerations."
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                />
              </div>
            </div>

            {/* SUBMIT */}
            <div className="pt-2">
              <button
                type="submit"
                className="btn-primary btn-xl w-full md:w-auto"
              >
                Submit brief
              </button>
            </div>
          </form>

          <p className="mt-5 text-[11px] text-slate-300/70">
            Please avoid including client names, account numbers or other
            directly identifying data. We can go into detail under NDA and via
            secure channels once we&apos;re connected.
          </p>
        </div>
      </section>
    </main>
  );
}