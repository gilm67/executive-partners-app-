import Link from "next/link";
import { ReactNode } from "react";

interface PrimaryButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  target?: "_blank" | "_self";
  rel?: string;
}

export default function PrimaryButton({
  href,
  children,
  className = "",
  target = "_self",
  rel,
}: PrimaryButtonProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={target === "_blank" ? rel || "noopener noreferrer" : rel}
      className={`
        inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium
        bg-brandGold text-black shadow-lg shadow-brandGold/35
        hover:bg-brandGoldDark 
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-brandGold/90 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent
        transition
        ${className}
      `}
    >
      {children}
    </Link>
  );
}