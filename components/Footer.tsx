// components/Footer.tsx
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

const NAV = [
  {
    label: "For Candidates",
    links: [
      { href: "/en/jobs", text: "Browse Jobs" },
      { href: "/en/candidates", text: "Career Guidance" },
      { href: "/en/portability", text: "Portability Score" },
      { href: "/en/bp-simulator", text: "BP Simulator" },
    ],
  },
  {
    label: "For Employers",
    links: [
      { href: "/en/hiring-managers/brief", text: "Brief a Role" },
      { href: "/en/hiring-managers", text: "Our Process" },
      { href: "/en/contact", text: "Get a Quote" },
    ],
  },
  {
    label: "Company",
    links: [
      { href: "/en/about", text: "About" },
      { href: "/en/markets", text: "Markets" },
      { href: "/en/insights", text: "Insights" },
      { href: "/en/contact", text: "Contact" },
    ],
  },
];

const HUBS = ["Geneva", "Zurich", "London", "Dubai", "Singapore", "Hong Kong"];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8 bg-[#070A10] text-white overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(600px 300px at 10% 0%, rgba(201,161,74,.10) 0%, transparent 60%), radial-gradient(500px 250px at 90% 100%, rgba(158,203,255,.07) 0%, transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pt-12 pb-8">

        {/* ── MOBILE: Brand strip ── */}
        <div className="flex items-start justify-between mb-10 md:hidden">
          <div>
            <div className="text-base font-semibold tracking-tight text-white">
              Executive Partners
            </div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <MapPin className="h-3 w-3 text-[#C9A14A]" />
              <span className="text-xs text-white/50 tracking-wide">Geneva · Est. 2018</span>
            </div>
          </div>
          <Link
            href="/en/contact"
            className="flex items-center gap-1.5 rounded-full border border-[#C9A14A]/40 bg-[#C9A14A]/8 px-4 py-2 text-xs font-semibold text-[#C9A14A] hover:bg-[#C9A14A]/15 transition-all"
          >
            Speak with us <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {/* ── MOBILE: 2-col nav grid ── */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:hidden">
          {NAV.map((col) => (
            <div key={col.label}>
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#C9A14A]">
                {col.label}
              </div>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white visited:text-white/60 transition-colors"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Hubs column */}
          <div>
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#C9A14A]">
              Our Hubs
            </div>
            <ul className="space-y-2.5">
              {HUBS.map((hub) => (
                <li key={hub} className="text-sm text-white/60">
                  {hub}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── DESKTOP: original 4-col layout ── */}
        <div className="hidden md:grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="text-lg font-semibold tracking-tight">
              Executive Partners
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Geneva-based executive search for{" "}
              <span className="text-white/85">Private Banking</span> &{" "}
              <span className="text-white/85">Wealth Management</span>.
            </p>
            <Link
              href="/en/contact"
              className="mt-6 inline-flex items-center rounded-full bg-white/5 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 transition"
            >
              Speak with us <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {NAV.map((col) => (
            <div key={col.label}>
              <h4 className="text-sm font-semibold tracking-wide text-white">
                {col.label}
              </h4>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:text-white visited:text-white/70 transition"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-xs text-white/40">
          <div>© {new Date().getFullYear()} Executive Partners. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link
              href="/en/privacy"
              className="hover:text-white/70 visited:text-white/40 transition"
            >
              GDPR Compliant
            </Link>
            <span className="w-px h-3 bg-white/20" />
            <span>Confidentiality Guaranteed</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
