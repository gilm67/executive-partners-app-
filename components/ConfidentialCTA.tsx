// components/ConfidentialCTA.tsx
import Link from "next/link";

export default function ConfidentialCTA() {
  return (
    <section className="mt-16 border-t border-white/10">
      <div className="container-max py-10">
        <div className="grid items-center gap-6 md:grid-cols-2">
          <div>
            <h3 className="font-[var(--font-playfair)] text-3xl">
              Move discreetly. Hire decisively.
            </h3>
            <p className="mt-3 text-white/75">
              Confidential conversations for senior private bankers and hiring leaders.
              No data stored without consent.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-ghost">Talk confidentially</Link>
              <Link href="/portability" className="btn-primary">Portability Score™</Link>
              <Link href="/bp-simulator" className="btn-ghost">Business Plan Simulator</Link>
            </div>
          </div>

          <div className="card">
            <div className="text-sm text-white/70">Highlights</div>
            <ul className="mt-2 space-y-2 text-white/85">
              <li>• 200+ senior placements across Swiss & global hubs</li>
              <li>• 92% 12-month retention on mandates</li>
              <li>• Advanced tools: Portability Score™ & Business Plan Simulator</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}