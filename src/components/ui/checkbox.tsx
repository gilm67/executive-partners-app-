import * as React from "react";

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="checkbox"
        className={
          "h-4 w-4 rounded border border-white/20 bg-white/5 " +
          "text-emerald-600 focus:outline-none focus-visible:ring-2 " +
          "focus-visible:ring-white/30 " +
          className
        }
        {...props}
      />
    );
  }
);
Checkbox.displayName = "Checkbox";

export default Checkbox;
