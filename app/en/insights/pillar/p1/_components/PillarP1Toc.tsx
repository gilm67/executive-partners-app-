import Link from "next/link";

const ITEMS = [
  { id: "chapters", label: "Browse by Sub-Theme" },
  { id: "positioning", label: "Positioning" },
  { id: "scale-vs-boutique", label: "Scale vs Boutique" },
  { id: "roa-platform", label: "ROA & Platform" },
  { id: "m-a-restructuring", label: "M&A & Restructuring" },
  { id: "all-articles", label: "All articles" },
] as const;

export default function PillarP1Toc() {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 rounded-2xl border border-white/10 bg-white/5 p-5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
          Table of contents
        </div>

        <nav className="mt-4 flex flex-col gap-2">
          {ITEMS.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className="rounded-lg px-2 py-1.5 text-sm text-white/70 hover:bg-white/10 hover:text-white"
            >
              {it.label}
            </a>
          ))}
        </nav>

        <div className="mt-5 border-t border-white/10 pt-4">
          <Link
            href="/en/insights"
            className="text-sm font-semibold text-white/70 hover:text-white underline underline-offset-4"
          >
            Back to Insights →
          </Link>
        </div>
      </div>
    </aside>
  );
}