import Link from "next/link";
import { ReactNode } from "react";

interface SecondaryButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  target?: "_blank" | "_self";
  rel?: string;
}

export default function SecondaryButton({
  href,
  children,
  className = "",
  target = "_self",
  rel,
}: SecondaryButtonProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={target === "_blank" ? rel || "noopener noreferrer" : rel}
      className={`
        inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium
        border border-brandGold/80 bg-black/20 text-brandGoldPale
        hover:bg-brandGold/12 hover:text-white
        focus-visible:outline-none focus-visible:ring-2 
        focus-visible:ring-brandGold/90 focus-visible:ring-offset-2
        transition
        ${className}
      `}
    >
      {children}
    </Link>
  );
}