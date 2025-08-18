// app/components/SubtleBg.tsx
export default function SubtleBg() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
    >
      {/* Soft vertical gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950" />

      {/* Gentle radial spotlight toward the top */}
      <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_20%,rgba(140,140,140,0.08),rgba(0,0,0,0))]" />

      {/* Whisper-thin grid (adds sophistication without distraction) */}
      <div className="absolute inset-0 opacity-[0.03] [background:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:48px_48px]" />

      {/* Subtle vignette to keep eyes in the center */}
      <div className="absolute inset-0 [box-shadow:inset_0_-140px_200px_-80px_rgba(0,0,0,0.65)]" />
    </div>
  );
}

