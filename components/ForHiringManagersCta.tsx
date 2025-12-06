import Link from "next/link";

type Props = {
  cityLabel?: string;
};

export default function ForHiringManagersCta({ cityLabel }: Props) {
  const citySuffix = cityLabel ? ` in ${cityLabel}` : "";

  return (
    <section className="mt-10">
      <article className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#1b1b1f] via-[#1b222b] to-[#111317] p-6 shadow-2xl ring-1 ring-white/10 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold md:text-xl">
              For Hiring Managers{citySuffix}
            </h3>
            <p className="text-sm text-neutral-200 md:text-base">
              We provide calibrated market mapping, vetted shortlists with real
              portability and structured business cases that stand up in
              internal approvals.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/en/hiring-managers/brief"
              className="inline-flex items-center rounded-full bg-[#D4AF37] px-5 py-2.5 text-sm font-medium text-black transition hover:bg-[#f5d778]"
            >
              Brief a mandate
            </Link>
            <Link
              href="/en/bp-simulator"
              className="inline-flex items-center rounded-full border border-white/40 px-5 py-2.5 text-sm font-medium text-white transition hover:border-[#D4AF37] hover:text-[#D4AF37]"
            >
              Test a 3-year business plan
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
}