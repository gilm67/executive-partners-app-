import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Minimal, Radix-free shim for shadcn/ui Select.
 * Usage stays the same:
 *
 * <Select value={value} onValueChange={setValue}>
 *   <SelectTrigger className="...">
 *     <SelectValue placeholder="Choose one" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="a">Alpha</SelectItem>
 *     <SelectItem value="b">Beta</SelectItem>
 *   </SelectContent>
 * </Select>
 */

type Item = { value: string; label: React.ReactNode };
type Ctx = {
  value?: string;
  setValue: (v: string) => void;
  onValueChange?: (v: string) => void;
  items: Item[];
  registerItem: (item: Item) => void;
  placeholder?: string;
  setPlaceholder: (p?: string) => void;
};

const SelectCtx = React.createContext<Ctx | null>(null);

export function Select({
  value,
  defaultValue,
  onValueChange,
  children,
}: {
  value?: string;
  defaultValue?: string;
  onValueChange?: (v: string) => void;
  children: React.ReactNode;
}) {
  const [internal, setInternal] = React.useState<string | undefined>(defaultValue);
  const controlled = value !== undefined;
  const current = controlled ? value : internal;

  const [items, setItems] = React.useState<Item[]>([]);
  const [placeholder, setPlaceholder] = React.useState<string | undefined>(undefined);

  const registerItem = React.useCallback((item: Item) => {
    setItems((prev) => {
      if (prev.find((i) => i.value === item.value)) return prev;
      return [...prev, item];
    });
  }, []);

  const setValue = (v: string) => {
    if (!controlled) setInternal(v);
    onValueChange?.(v);
  };

  return (
    <SelectCtx.Provider
      value={{
        value: current,
        setValue,
        onValueChange,
        items,
        registerItem,
        placeholder,
        setPlaceholder,
      }}
    >
      {children}
    </SelectCtx.Provider>
  );
}

export function SelectTrigger({
  className,
  children, // usually <SelectValue />
  disabled,
}: {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}) {
  const ctx = React.useContext(SelectCtx);
  if (!ctx) return null;

  // Extract placeholder that <SelectValue> may have set
  const ph = ctx.placeholder;

  return (
    <div className={cn("relative inline-block w-full", className)}>
      <select
        disabled={disabled}
        value={ctx.value ?? ""}
        onChange={(e) => ctx.setValue(e.target.value)}
        className={cn(
          "w-full appearance-none rounded-md border border-white/10 bg-white/[0.03] px-3 py-2",
          "text-sm text-white outline-none transition hover:bg-white/[0.06] focus:border-emerald-400",
          disabled && "opacity-60 cursor-not-allowed"
        )}
      >
        {ph !== undefined && (
          <option value="" disabled hidden>
            {ph}
          </option>
        )}
        {ctx.items.map((it) => (
          <option key={it.value} value={it.value}>
            {/* Convert ReactNode to string-ish for <option> label; fallback to simple text */}
            {typeof it.label === "string" ? it.label : String((it.label as any)?.props?.children ?? it.value)}
          </option>
        ))}
      </select>
      {/* simple chevron */}
      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/60">▾</span>

      {/* Keep children in the tree so <SelectValue> can set placeholder */}
      <span className="sr-only">{children}</span>
    </div>
  );
}

export function SelectValue({
  placeholder,
}: {
  placeholder?: string;
}) {
  const ctx = React.useContext(SelectCtx);
  React.useEffect(() => {
    ctx?.setPlaceholder(placeholder);
  }, [ctx, placeholder]);
  return null;
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  // Items are actually rendered by the native <select>, so we don't need a popup.
  // We still render children so <SelectItem> can register options into context.
  return <>{children}</>;
}

export function SelectItem({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  const ctx = React.useContext(SelectCtx);
  React.useEffect(() => {
    if (ctx) ctx.registerItem({ value, label: children });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx, value]);
  return null;
}
