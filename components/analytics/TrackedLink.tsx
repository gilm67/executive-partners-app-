"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track } from "@vercel/analytics/react";

type TrackedLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  eventName: string;
  eventProps?: Record<string, string | number | boolean>;
};

export default function TrackedLink({
  href,
  children,
  className,
  target,
  rel,
  eventName,
  eventProps,
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={() => {
        try {
          track(eventName, eventProps);
        } catch {
          // fail silently in case analytics is disabled
        }
      }}
    >
      {children}
    </Link>
  );
}