type Props = {
  label?: string; // e.g. "LinkedIn"
  className?: string;
};

export default function ExternalBadge({
  label = "External",
  className = "",
}: Props) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/10 px-3 py-1 text-xs text-white/70",
        className,
      ].join(" ")}
    >
      {label}
    </span>
  );
}