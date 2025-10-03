import * as React from "react";

type Variant = "default" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ className = "", variant = "default", size = "md", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-lg font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 disabled:opacity-50 disabled:pointer-events-none";
    const paddings = size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2 text-sm";
    const palette =
      variant === "secondary"
        ? "bg-white/10 text-white hover:bg-white/15"
        : variant === "outline"
        ? "border border-white/20 text-white hover:bg-white/5"
        : variant === "ghost"
        ? "text-white hover:bg-white/10"
        : "bg-emerald-600 text-white hover:bg-emerald-700";
    return (
      <button
        ref={ref}
        className={`${base} ${paddings} ${palette} ${className}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
export default Button;
