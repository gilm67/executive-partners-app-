// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";
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
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{background:"radial-gradient(ellipse 70% 35% at 50% 0%, rgba(201,161,74,.10) 0%, transparent 60%)"}} />
      {/* Gold shimmer line */}
      <div className="h-px w-full" style={{background:"linear-gradient(90deg, transparent 0%, rgba(201,161,74,.5) 25%, rgba(240,208,96,.85) 50%, rgba(201,161,74,.5) 75%, transparent 100%)"}} />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        {/* ── MOBILE ── */}
        <div className="md:hidden">

          {/* Logo + tagline */}
          <div className="pt-10 pb-8 flex flex-col items-center text-center border-b border-white/[0.06]">
            <Image
              src="/transparent-ep-logo.png"
              alt="Executive Partners"
              width={160}
              height={52}
              sizes="160px"
              className="h-auto w-[140px] opacity-90 mb-4"
            />
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3 w-3 flex-shrink-0" style={{color:"#C9A14A"}} />
              <span className="text-xs tracking-wide" style={{color:"rgba(201,161,74,.7)"}}>Geneva · Zurich · London · Dubai · Singapore</span>
            </div>
          </div>

          {/* CTA block — dark with gold border */}
          <div className="py-6 border-b border-white/[0.06]">
            <Link href="https://calendly.com/execpartners/15-minute-career-consultation"
              target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center text-center w-full rounded-2xl px-6 py-6 gap-4 transition-all active:scale-[0.99]"
              style={{background:"rgba(201,161,74,.06)",border:"1px solid rgba(201,161,74,.3)"}}>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.15em] mb-2 text-center" style={{color:"rgba(201,161,74,.8)"}}>Confidential · Senior-level · No obligation</div>
                <div className="text-lg font-semibold text-white leading-snug">Ready to calibrate<br/>your next move?</div>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold w-full justify-center" style={{background:"linear-gradient(135deg, #C9A14A 0%, #E8C46A 100%)",color:"#090C14",fontWeight:"600"}}>
                Schedule a confidential call <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          </div>

          {/* Hub pills */}
          <div className="py-5 border-b border-white/[0.06]">
            <div className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-3 text-center" style={{color:"rgba(201,161,74,.6)"}}>Our Hubs</div>
            <div className="flex flex-wrap gap-2">
              {HUBS.map((h) => (
                <span key={h.city}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-white/70"
                  style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)"}}>
                  <span>{h.flag}</span>{h.city}
                </span>
              ))}
            </div>
          </div>

          {/* Nav 2-col */}
          <div className="py-6 grid grid-cols-2 gap-x-8 gap-y-7 border-b border-white/[0.06]">
            {NAV.map((col) => (
              <div key={col.label}>
                <div className="mb-3.5 text-[10px] font-semibold uppercase tracking-[0.14em]" style={{color:"rgba(201,161,74,.8)"}}>{col.label}</div>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm font-medium text-white/65 hover:text-white/95 visited:text-white/65 transition-colors">{link.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="py-5 flex flex-col gap-2">
            <div className="text-[11px] text-white/30">© {new Date().getFullYear()} Executive Partners. All rights reserved.</div>
            <div className="flex items-center gap-3 text-[11px]">
              <Link href="/en/privacy" className="text-white/35 hover:text-white/65 visited:text-white/35 transition-colors">GDPR Compliant</Link>
              <span className="w-px h-3 bg-white/15" />
              <span className="text-white/30">Confidentiality Guaranteed</span>
            </div>
          </div>
        </div>

        {/* ── DESKTOP ── */}
        <div className="hidden md:block py-16">
          <div className="flex items-start justify-between mb-12 pb-12 border-b border-white/[0.06]">
            <div className="max-w-sm">
              <Image src="/transparent-ep-logo.png" alt="Executive Partners" width={180} height={60} sizes="180px" className="h-auto w-[160px] opacity-90 mb-4" />
              <p className="text-sm text-white/80 leading-relaxed">Geneva-based executive search for Private Banking & Wealth Management. 200+ placements across 12 global hubs.</p>
            </div>
            <Link href="/en/contact"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:brightness-110"
              style={{background:"linear-gradient(135deg, #C9A14A 0%, #E8C46A 100%)",color:"#0B0E13"}}>
              Speak with us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-10">
            {NAV.map((col) => (
              <div key={col.label}>
                <h4 className="text-[10px] font-semibold uppercase tracking-[0.14em] mb-4" style={{color:"#C9A14A"}}>{col.label}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-white/75 hover:text-white visited:text-white/75 transition-colors">{link.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h4 className="text-[10px] font-semibold uppercase tracking-[0.14em] mb-4" style={{color:"#C9A14A"}}>Our Hubs</h4>
              <ul className="space-y-3">
                {HUBS.map((h) => (
                  <li key={h.city} className="text-sm text-white/70 flex items-center gap-2"><span>{h.flag}</span>{h.city}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/[0.06] flex items-center justify-between text-xs text-white/50">
            <div>© {new Date().getFullYear()} Executive Partners. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <Link href="/en/privacy" className="hover:text-white visited:text-white/50 transition-colors">GDPR Compliant</Link>
              <span className="w-px h-3 bg-white/15" />
              <span>Confidentiality Guaranteed</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
