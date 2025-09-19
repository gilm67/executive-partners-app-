import Link from 'next/link';

export const metadata = {
  title: 'Markets – Executive Partners',
  description: 'Private Banking & Wealth Management markets we serve.',
};

export default function MarketsPage() {
  const markets = [
    { name: 'Switzerland', href: '/en/private-banking-jobs-switzerland', blurb: 'Geneva & Zurich booking centres; CH onshore and cross-border.' },
    { name: 'Geneva', href: '/en/markets/geneva', blurb: 'UHNW/HNW, independent asset managers, family offices.' },
    { name: 'Zurich', href: '/en/markets/zurich', blurb: 'Onshore CH & international desks; RMs with portability.' },
    { name: 'Dubai', href: '/en/markets/dubai', blurb: 'MEA coverage from DIFC; booking and advisory.' },
    { name: 'Singapore', href: '/en/markets/singapore', blurb: 'SEA wealth hubs; growth & platform moves.' },
    { name: 'London', href: '/en/markets/london', blurb: 'UK & international desks; UHNW coverage.' },
    { name: 'New York', href: '/en/markets/new-york', blurb: 'US offshore & onshore private banking.' },
  ];

  return (
    <main className="min-h-[70vh]">
      <section
        className="relative overflow-hidden text-white"
        style={{
          background:
            'radial-gradient(1200px 400px at 10% -10%, rgba(29,78,216,.25), transparent 60%), radial-gradient(800px 300px at 110% 10%, rgba(16,185,129,.25), transparent 60%), #0B0E13',
        }}
      >
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight">Markets we serve</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Geneva-based executive search across global private banking hubs. We prioritise portability and cultural fit.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 text-white">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {markets.map((m) => (
            <Link
              key={m.name}
              href={m.href}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm backdrop-blur hover:bg-white/10 transition"
            >
              <div className="text-sm uppercase tracking-wide text-white/60">— {m.name}</div>
              <div className="mt-2 text-lg font-semibold">{m.name}</div>
              <p className="mt-2 text-sm text-white/80">{m.blurb}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
