"use client";

import React from "react";

declare global {
  interface Window {
    plausible?: (eventName: string, options?: any) => void;
    gtag?: (...args: any[]) => void;
  }
}

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  eventName?: string; // optional override
};

export default function OutboundLink({
  href,
  onClick,
  eventName,
  children,
  ...rest
}: Props) {
  return (
    <a
      {...rest}
      href={href}
      onClick={(e) => {
        try {
          const name = eventName || "Outbound Click";

          // Plausible
          if (typeof window !== "undefined" && typeof window.plausible === "function") {
            window.plausible(name, { props: { url: href } });
          }

          // GA4 (gtag)
          if (typeof window !== "undefined" && typeof window.gtag === "function") {
            window.gtag("event", "click", {
              event_category: "outbound",
              event_label: href,
              link_url: href,
            });
          }
        } catch {
          // ignore tracking errors
        }

        onClick?.(e);
      }}
      rel={rest.rel ?? "noreferrer noopener"}
      target={rest.target ?? "_blank"}
    >
      {children}
    </a>
  );
}