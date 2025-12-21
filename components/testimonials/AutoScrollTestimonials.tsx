"use client";

import { useEffect, useRef } from "react";

type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Executive Partners understood our hiring constraints instantly. The shortlist quality was exceptional.",
    author: "Managing Director",
    role: "Tier-1 Swiss Private Bank",
  },
  {
    quote:
      "One of the very few recruiters who truly understands UHNW portability and business plans.",
    author: "Senior Private Banker",
    role: "Geneva",
  },
  {
    quote:
      "Their market intelligence and discretion set them apart from traditional search firms.",
    author: "Head of Private Banking",
    role: "International Bank – EMEA",
  },
  {
    quote:
      "The Business Plan Simulator was a game changer in internal approvals.",
    author: "Team Head",
    role: "Zurich",
  },
];

export default function AutoScrollTestimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // Duplicate content for infinite scroll illusion
    scroller.innerHTML += scroller.innerHTML;
  }, []);

  return (
    <section className="relative overflow-hidden py-20">
      {/* Gradient fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black/90 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/90 to-transparent z-10" />

      <div
        ref={scrollerRef}
        className="flex gap-6 animate-scroll-x hover:[animation-play-state:paused]"
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="min-w-[360px] max-w-[360px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-lg"
          >
            <p className="text-sm text-white/80 leading-relaxed">
              “{t.quote}”
            </p>

            <div className="mt-4">
              <p className="text-sm font-semibold text-white">
                {t.author}
              </p>
              <p className="text-xs text-white/60">
                {t.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}