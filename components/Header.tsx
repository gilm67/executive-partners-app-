"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [showToolsDropdown, setShowToolsDropdown] = useState(false);

  // ✅ locale-aware base (keeps /en when you're in EN)
  const base = useMemo(() => {
    if (!pathname) return "";
    return pathname.startsWith("/en") ? "/en" : "";
  }, [pathname]);

  // ✅ Main nav items (without the tools in main nav)
  const navItems = useMemo(
    () => [
      { name: "Jobs", href: `${base}/jobs` },
      { name: "Candidates", href: `${base}/candidates` },
      { name: "Hiring Managers", href: `${base}/hiring-managers` },
      { name: "Markets", href: `${base}/markets` },
      { name: "Insights", href: `${base}/insights` },
      { name: "About", href: `${base}/about` },
      { name: "Contact", href: `${base}/contact` },
    ],
    [base]
  );

  // ✅ Tools submenu items
  const toolsItems = useMemo(
    () => [
      {
        name: "Portability Score™",
        href: `${base}/portability`,
        desc: "Calculate your AUM transfer potential",
      },
      {
        name: "Business Plan Simulator",
        href: `${base}/bp-simulator`,
        desc: "Model revenue & break-even timeline",
      },
    ],
    [base]
  );

  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-transparent">
      <Link href={base || "/"} className="text-lg font-bold tracking-tight">
        Executive Partners
      </Link>

      <nav className="hidden md:flex items-center gap-6 text-sm">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="hover:text-blue-300 transition"
          >
            {item.name}
          </Link>
        ))}

        {/* FREE TOOLS DROPDOWN */}
        <div
          className="relative"
          onMouseEnter={() => setShowToolsDropdown(true)}
          onMouseLeave={() => setShowToolsDropdown(false)}
        >
          <button className="flex items-center gap-1 hover:text-blue-300 transition">
            Free Tools
            <ChevronDown className="h-3.5 w-3.5" />
          </button>

          {showToolsDropdown && (
            <div className="absolute top-full right-0 mt-2 w-72 rounded-xl border border-white/20 bg-[#0B0F1A]/95 backdrop-blur-xl shadow-2xl">
              <div className="p-2">
                {toolsItems.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="block rounded-lg p-3 hover:bg-white/10 transition"
                  >
                    <div className="font-semibold text-white">{tool.name}</div>
                    <div className="mt-0.5 text-xs text-white/60">
                      {tool.desc}
                    </div>
                  </Link>
                ))}
              </div>
              <div className="border-t border-white/10 px-4 py-2 text-center">
                <span className="text-xs text-white/50">
                  100% free • No registration required
                </span>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}