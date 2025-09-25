'use client';
import {useEffect, useMemo, useRef, useState} from 'react';

type Props = {
  value?: number;                 // source of truth from store
  onChange: (n: number) => void;  // push parsed number to store
  placeholder?: string;
  suffix?: string;                // e.g. "M", "%", "CHF"
  min?: number;
  max?: number;
  step?: number;
  allowZero?: boolean;            // if false, render "" when value===0
  className?: string;
  inputClassName?: string;
  'aria-label'?: string;
};

export default function NumberInput({
  value = 0,
  onChange,
  placeholder,
  suffix,
  min,
  max,
  step = 1,
  allowZero = false,
  className = 'flex items-center gap-2',
  inputClassName = 'w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/60',
  ...aria
}: Props) {
  // render "" instead of 0 (unless allowZero)
  const initial = useMemo(() => {
    if (!allowZero && value === 0) return '';
    // keep plain number string (no locale commas in the input)
    return Number.isFinite(value) ? String(value) : '';
  }, [value, allowZero]);

  const [text, setText] = useState<string>(initial);
  const ref = useRef<HTMLInputElement>(null);

  // keep in sync if the parent value changes from the outside
  useEffect(() => setText(initial), [initial]);

  // parse & clamp on blur
  const commit = () => {
    const raw = text.trim();
    if (raw === '' || raw === '-' || raw === '.' || raw === '-.')
      return onChange(allowZero ? 0 : 0); // change this line if you want NaN/null
    let n = Number(raw.replace(/,/g, ''));
    if (!Number.isFinite(n)) n = allowZero ? 0 : 0;
    if (typeof min === 'number') n = Math.max(min, n);
    if (typeof max === 'number') n = Math.min(max, n);
    onChange(n);
    // normalize echo back
    setText(String(n));
  };

  // prevent scroll-wheel value jumps
  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    (e.currentTarget as HTMLInputElement).blur();
  };

  return (
    <div className={className}>
      <input
        ref={ref}
        value={text}
        onChange={(e) => {
          // allow digits, minus, dot, and empty while typing
          const v = e.target.value;
          if (/^-?\d*([.]\d*)?$/.test(v) || v === '') setText(v);
        }}
        onBlur={commit}
        onFocus={(e) => e.currentTarget.select()}
        onWheel={handleWheel}
        inputMode="decimal"
        autoComplete="off"
        spellCheck={false}
        enterKeyHint="next"
        placeholder={placeholder ?? (allowZero ? '0' : '')}
        className={inputClassName}
        aria-invalid={false}
        {...aria}
      />
      {suffix ? <span className="text-sm text-white/60">{suffix}</span> : null}
    </div>
  );
}