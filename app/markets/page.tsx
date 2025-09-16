import Link from "next/link";
import { MARKETS } from "@/data/markets";

export default function MarketsIndex() {
  const items = Object.values(MARKETS);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-100">Markets</h1>
      <p className="mt-2 text-sm text-neutral-400">
        Select a city to view hiring pulse, compensation, regulations, and local ecosystem.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {items.map((m) => (
          <Link
            key={m.slug}
            href={`/markets/${m.slug}`}
            className="rounded-2xl border border-neutral-800 bg-neutral-950/60 p-4 hover:border-neutral-700"
          >
            <div className="text-sm uppercase tracking-widest text-emerald-400/80">{m.country}</div>
            <div className="mt-1 text-lg font-semibold text-neutral-100 capitalize">{m.slug}</div>
            <div className="mt-2 text-xs text-neutral-400 line-clamp-2">{m.intro}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
