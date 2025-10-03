import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Minimal Radix-free Slider shim for shadcn usage.
 * API (subset):
 *  - value?: number[]           // controlled, use single value [n]
 *  - defaultValue?: number[]    // uncontrolled
 *  - onValueChange?: (v:number[]) => void
 *  - min?: number; max?: number; step?: number;
 *  - disabled?: boolean; className?: string;
 *
 * Example:
 *   <Slider value={[v]} onValueChange={(x)=>setV(x[0])} min={0} max={100} step={1} />
 */

type Props = {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (v: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
};

export function Slider({
  value,
  defaultValue,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  className,
}: Props) {
  const isControlled = Array.isArray(value);
  const [internal, setInternal] = React.useState<number>(
    defaultValue?.[0] ?? Math.min(Math.max(min, 0), max)
  );
  const current = isControlled ? (value as number[])[0] : internal;

  const setVal = (n: number) => {
    if (!isControlled) setInternal(n);
    onValueChange?.([n]);
  };

  return (
    <div className={cn("relative w-full", className)}>
      <input
        type="range"
        value={current}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={(e) => setVal(Number(e.target.value))}
        className={cn(
          "w-full appearance-none bg-transparent",
          "disabled:opacity-60 disabled:cursor-not-allowed",
          // Track
          "[&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full",
          "[&::-webkit-slider-runnable-track]:bg-white/15",
          "[&::-moz-range-track]:h-1 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-white/15",
          // Thumb
          "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4",
          "[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white",
          "[&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-white/20",
          "[&::-webkit-slider-thumb]:-mt-1.5", // center thumb on track
          "[&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-white/20",
        )}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={current}
      />
    </div>
  );
}

// Named exports kept for compatibility with some shadcn imports.
// They are no-ops here because we render a native <input type="range">.
export const SliderTrack = ({ className }: { className?: string }) => <div className={className} />;
export const SliderRange = ({ className }: { className?: string }) => <div className={className} />;
export const SliderThumb = ({ className }: { className?: string }) => <div className={className} />;
