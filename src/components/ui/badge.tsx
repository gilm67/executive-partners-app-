import * as React from "react";

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "secondary" | "outline";
};

export function Badge({ className = "", variant = "default", ...props }: Props) {
  const base =
    "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium";
  const palette =
    variant === "secondary"
      ? "bg-white/10 text-white ring-1 ring-white/15"
      : variant === "outline"
      ? "border border-white/20 text-white"
      : "bg-emerald-600 text-white";
  return <span className={`${base} ${palette} ${className}`} {...props} />;
}
export default Badge;
