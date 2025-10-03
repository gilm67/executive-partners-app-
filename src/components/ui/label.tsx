import * as React from "react";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  /** show a small red asterisk */
  requiredMark?: boolean;
};

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className = "", requiredMark = false, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={
          "text-sm font-medium text-white/90 " +
          "peer-disabled:cursor-not-allowed peer-disabled:opacity-70 " +
          className
        }
        {...props}
      >
        {children}
        {requiredMark ? <span className="ml-1 text-red-400">*</span> : null}
      </label>
    );
  }
);

Label.displayName = "Label";
export default Label;
