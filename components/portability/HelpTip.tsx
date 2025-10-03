"use client";

export default function HelpTip({ text }: { text: string }) {
  return (
    <span className="ml-1 cursor-help text-xs text-white/50" title={text}>
      ⓘ
    </span>
  );
}