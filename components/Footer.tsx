// components/Footer.tsx
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

const NAV = [
  {
    label: "Candidates",
    links: [
      { href: "/en/jobs", text: "Browse Jobs" },
      { href: "/en/candidates", text: "Career Guidance" },
      { href: "/en/portability", text: "Portability Score" },
      { href: "/en/bp-simulator", text: "BP Simulator" },
    ],
  },
  {
    label: "Employers",
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

const HUBS = [
  { city: "Geneva", flag: "🇨🇭" },
  { city: "Zurich", flag: "🇨🇭" },
  { city: "London", flag: "🇬🇧" },
  { city: "Dubai", flag: "🇦🇪" },
  { city: "Singapore", flag: "🇸🇬" },
  { city: "Hong Kong", flag: "🇭🇰" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#05070E] text-white overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{background:"radial-gradient(ellipse 80% 40% at 50% 0%, rgba(201,161,74,.12) 0%, transparent 65%), radial-gradient(ellipse 60% 50% at 90% 100%, rgba(158,203,255,.06) 0%, transparent 60%)"}} />
      <div className="h-px w-full" style={{background:"linear-gradient(90deg, transparent 0%, rgba(201,161,74,.6) 30%, rgba(240,208,96,.9) 50%, rgba(201,161,74,.6) 70%, transparent 100%)"}} />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* MOBILE */}
        <div className="md:hidden">
          <div className="pt-10 pb-8 text-center border-b border-white/[0.06]">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4" style={{background:"linear-gradient(135deg, rgba(201,161,74,.2) 0%, rgba(201,161,74,.08) 100%)",border:"1px solid rgba(201,161,74,.3)"}}>
              <span className="text-xl font-bold tracking-tight" style={{color:"#C9A14A"}}>EP</span>
            </div>
            <div className="text-white/90 text-base font-semibold tracking-tight">Executive Partners</div>
            <div className="flex items-center justify-center gap-1.5 mt-1.5">
              <MapPin className="h-3 w-3" style={{color:"#C9A14A"}} />
              <span className="text-xs text-white/40 tracking-wide">Geneva · Est. 2018</span>
            </div>
            <p className="mt-3 text-xs text-white/40 max-w-[240px] mx-auto leading-relaxed">Senior private banking search across 12 global hubs.</p>
          </div>

          <div className="py-6 border-b border-white/[0.06]">
            <Link href="/en/contact" className="flex items-center justify-between w-full rounded-2xl px-5 py-4 transition-all active:scale-[0.99]" style={{background:"linear-gradient(135deg, rgba(201,161,74,.18) 0%, rgba(201,161,74,.08) 100%)",border:"1px solid rgba(201,161,74,.25)"}}>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.12em]" style={{color:"#C9A14A"}}>Ready to move?</div>
                <div className="text-sm font-semibold text-white mt-0.5">Schedule a confidential call</div>
              </div>
              <div className="flex items-center justify-center w-9 h-9 rounded-full flex-shrink-0" style={{background:"rgba(201,161,74,.15)",border:"1px solid rgba(201,161,74,.3)"}}>
                <ArrowRight className="h-4 w-4" style={{color:"#C9A14A"}} />
              </div>
            </Link>
          </div>

          <div className="py-6 border-b border-white/[0.06]">
            <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/30 mb-3">Our Hubs</div>
            <div className="flex flex-wrap gap-2">
              {HUBS.map((h) => (
                <span key={h.city} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs text-white/55" style={{background:"rgba(255,255,255,.05)",border:"1px solid rgba(255,255,255,.08)"}}>
                  <span>{h.flag}</span>{h.city}
                </span>
              ))}
            </div>
          </div>

          <div className="py-6 grid grid-cols-2 gap-x-6 gap-y-6 border-b border-white/[0.06]">
            {NAV.map((col) => (
              <div key={col.label}>
                <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.12em]" style={{color:"#C9A14A"}}>{col.label}</div>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-white/50 hover:text-white visited:text-white/50 transition-colors">{link.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="py-5 flex flex-col gap-2">
            <div className="text-[11px] text-white/25">© {new Date().getFullYear()} Executive Partners. All rights reserved.</div>
            <div className="flex items-center gap-3 text-[11px]">
              <Link href="/en/privacy" className="text-white/30 hover:text-white/60 visited:text-white/30 transition-colors">GDPR Compliant</Link>
              <span className="w-px h-3 bg-white/15" />
              <span className="text-white/25">Confidentiality Guaranteed</span>
            </div>
          </div>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:block py-16">
          <div className="flex items-start justify-between mb-12 pb-12 border-b border-white/[0.06]">
            <div className="max-w-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl" style={{background:"rgba(201,161,74,.15)",border:"1px solid rgba(201,161,74,.3)"}}>
                  <span className="text-sm font-bold" style={{color:"#C9A14A"}}>EP</span>
                </div>
                <div className="text-base font-semibold text-white">Executive Partners</div>
              </div>
              <p className="text-sm text-white/50 leading-relaxed">Geneva-based executive search for Private Banking & Wealth Management. 200+ placements across 12 global hubs.</p>
            </div>
            <Link href="/en/contact" className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:brightness-110" style={{background:"linear-gradient(135deg, rgba(201,161,74,.2), rgba(201,161,74,.1))",border:"1px solid rgba(201,161,74,.35)",color:"#C9A14A"}}>
              Speak with us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-10">
            {NAV.map((col) => (
              <div key={col.label}>
                <h4 className="text-xs font-semibold uppercase tracking-[0.12em] mb-4" style={{color:"#C9A14A"}}>{col.label}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-white/50 hover:text-white visited:text-white/50 transition-colors">{link.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.12em] mb-4" style={{color:"#C9A14A"}}>Our Hubs</h4>
              <ul className="space-y-3">
                {HUBS.map((h) => (
                  <li key={h.city} className="text-sm text-white/40 flex items-center gap-2"><span>{h.flag}</span>{h.city}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/[0.06] flex items-center justify-between text-xs text-white/30">
            <div>© {new Date().getFullYear()} Executive Partners. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <Link href="/en/privacy" className="hover:text-white/60 visited:text-white/30 transition-colors">GDPR Compliant</Link>
              <span className="w-px h-3 bg-white/15" />
              <span>Confidentiality Guaranteed</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
