"use client";

import Link from "next/link";

type Props = {
  title: string;
  market?: string;
  location?: string;
};

export default function ApplyButtons({ title, market, location }: Props) {
  const marketOrLocation = (market || location || "").toString();
  const applyHref = `/apply?role=${encodeURIComponent(title)}&market=${encodeURIComponent(marketOrLocation)}`;

  return (
    <div className="flex gap-3">
      <Link
        href={applyHref}
        className="rounded-lg bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
      >
        Apply confidentially
      </Link>
      <Link
        href="/contact"
        className="rounded-lg border px-4 py-2 hover:bg-white"
      >
        Ask about this role
      </Link>
    </div>
  );
}

