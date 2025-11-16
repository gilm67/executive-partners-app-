import Link from "next/link";

// Reuse existing SEO metadata from the base page
export { metadata } from "../../contact/page";

export default function ContactPageEn() {
  return (
    <main className="min-h-[70vh] px-4 md:px-6 lg:px-10 py-12 md:py-16">
      <section className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-white/10 bg-black/40 px-6 py-8 md:px-10 md:py-10 shadow-[0_22px_60px_rgba(0,0,0,0.80)] backdrop-blur">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-emerald-300/80">
            Contact
          </p>

          <h1 className="mt-3 text-3xl md:text-4xl font-semibold leading-tight">
            Discreet contact for candidates &amp; hiring managers
          </h1>

          <p className="mt-3 text-sm md:text-base text-slate-200/80">
            Whether you are a{" "}
            <span className="font-semibold">private banker</span> exploring a
            move or a <span className="font-semibold">hiring manager</span>{" "}
            shaping your team, your message will be treated with strict
            confidentiality.
          </p>

          <p className="mt-1 text-[11px] text-slate-300/80">
            Typically, we revert within the same business day.
          </p>

          <form
            method="POST"
            action="/api/contact"
            className="mt-8 space-y-6"
          >
            {/* 1. BASIC INFO + SEGMENTATION */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Name<span className="text-emerald-300">*</span>
                </label>
                <input
                  name="name"
                  required
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/80"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Email<span className="text-emerald-300">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/80"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  I am a…<span className="text-emerald-300">*</span>
                </label>
                <select
                  name="contactType"
                  required
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/80"
                >
                  <option value="">Please select</option>
                  <option value="candidate">Candidate</option>
                  <option value="hiring-manager">Hiring Manager</option>
                  <option value="other">Other</option>
                </select>
                <p className="text-[11px] text-slate-300/75">
                  This helps us route your message to the right person.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full rounded-xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/80"
                />
                <p className="text-[11px] text-slate-300/75">
                  We can call you discreetly – no messages left without your
                  consent.
                </p>
              </div>
            </div>

            {/* 2. HIRING MANAGER FIELDS */}
            <div className="rounded-2xl border border-white/10 bg-white/5/10 px-4 py-4 md:px-5 md:py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300/80">
                For hiring managers
              </p>
              <p className="mt-1 text-[11px] text-slate-300/80">
                Optional, but helps us prepare more targeted profiles before we
                speak.
              </p>

              <div className="mt-3 grid gap-4 md:grid-cols-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium">Company</label>
                  <input
                    name="hm_company"
                    className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-400/80"
                    placeholder="e.g. Swiss private bank"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium">Role</label>
                  <input
                    name="hm_role"
                    className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-400/80"
                    placeholder="e.g. Desk Head MEA"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium">Location</label>
                  <input
                    name="hm_location"
                    className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-400/80"
                    placeholder="e.g. Geneva, Zurich, Dubai"
                  />
                </div>
              </div>
            </div>

            {/* 3. CANDIDATE FIELDS */}
            <div className="rounded-2xl border border-white/10 bg-white/5/10 px-4 py-4 md:px-5 md:py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300/80">
                For candidates (private bankers &amp; senior wealth managers)
              </p>
              <p className="mt-1 text-[11px] text-slate-300/80">
                These fields are optional – high-level details only, no client
                names.
              </p>

              <div className="mt-3 grid gap-4 md:grid-cols-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium">Current bank</label>
                  <input
                    name="cand_bank"
                    className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-400/80"
                    placeholder="e.g. UBS, Pictet, EFG…"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium">Market</label>
                  <input
                    name="cand_market"
                    className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-400/80"
                    placeholder="e.g. CH Onshore, MEA, NRI, LATAM"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium">AUM band</label>
                  <select
                    name="cand_aum_band"
                    className="w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-400/80"
                  >
                    <option value="">Select…</option>
                    <option value="<200m">&lt; CHF 200m</option>
                    <option value="200-500m">CHF 200–500m</option>
                    <option value="500-800m">CHF 500–800m</option>
                    <option value="800m-1.2bn">CHF 800m–1.2bn</option>
                    <option value=">1.2bn">&gt; CHF 1.2bn</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 4. MESSAGE */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Message<span className="text-emerald-300">*</span>
              </label>
              <textarea
                name="message"
                required
                rows={5}
                className="w-full rounded-2xl border border-white/15 bg-black/40 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400/80"
                placeholder="Tell us briefly what you’re looking for (confidential move, new hire, market intelligence, etc.)."
              />
            </div>

            {/* 5. SUBMIT + SMALL GUARANTEE */}
            <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium
                           bg-emerald-500 text-white shadow-lg shadow-emerald-500/30
                           hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2
                           focus-visible:ring-emerald-400/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
                           transition"
              >
                Send message
              </button>

              <p className="text-[11px] text-slate-300/80 max-w-md md:text-right">
                No CV or mandate document required at this stage. We’ll follow
                up by email or phone to clarify your needs before sharing any
                information externally.
              </p>
            </div>
          </form>
        </div>

        <p className="mt-4 text-[11px] text-slate-400/80 text-center">
          Prefer LinkedIn? You can also contact{" "}
          <Link
            href="https://www.linkedin.com/in/gilmchalem/"
            className="underline underline-offset-2"
          >
            Gil M. Chalem
          </Link>{" "}
          directly.
        </p>
      </section>
    </main>
  );
}