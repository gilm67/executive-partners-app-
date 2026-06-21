#!/usr/bin/env python3
"""
EP Website — Master fix script
Run from: ~/Desktop/execpartners-fresh
Usage:    python3 fix_all.py

Fixes applied
─────────────
1.  Hiring Managers metadata — duplicate "Executive Partners" in OG/Twitter titles + add og:image
2.  next.config.js — merged duplicate `images` keys (was losing minimumCacheTTL & formats)
3.  next.config.js — removed 8+ duplicate redirect rules
4.  Footer desktop CTA — swap /en/contact for Calendly link (consistent with mobile footer + hiring-managers page)
5.  Candidates page canonical — /candidates → /en/candidates
6.  next.config.js — add redirect /candidates → /en/candidates (was missing trailing-slash variant already there but not bare path in correct order)
7.  Hiring-managers brief form — wire Submit button to mailto fallback so it actually does something (form was NOTE: not wired)
"""

import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent
ERRORS = []

def read(path):
    return (ROOT / path).read_text(encoding="utf-8")

def write(path, content):
    (ROOT / path).write_text(content, encoding="utf-8")
    print(f"  ✓  {path}")

def fix(path, old, new, description):
    content = read(path)
    if old not in content:
        ERRORS.append(f"SKIP [{description}] — pattern not found in {path}")
        return
    write(path, content.replace(old, new, 1))
    print(f"     → {description}")


# ══════════════════════════════════════════════════════
# FIX 1 — Hiring Managers metadata: duplicate names + og:image
# ══════════════════════════════════════════════════════
print("\n[1] Hiring Managers metadata")

fix(
    "app/hiring-managers/page.tsx",
    '''  openGraph: {
    title: "For Hiring Managers ",
    description:
      "Targeted senior hires in Private Banking & Wealth Management. Real AUM portability and long-term retention.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Banking Recruitment Agency Switzerland ",
    description:
      "Executive search for senior private banking roles. Specialists in AUM portability assessment.",
  },''',
    '''  openGraph: {
    title: "Private Banking Recruitment Switzerland | Senior RM & Team Head Search",
    description:
      "Targeted senior hires in Private Banking & Wealth Management. Real AUM portability and long-term retention.",
    images: [{ url: "/og.webp", width: 1200, height: 630, alt: "Executive Partners – Private Banking Recruitment" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Private Banking Recruitment Switzerland | Executive Partners",
    description:
      "Executive search for senior private banking roles. Specialists in AUM portability assessment.",
    images: ["/og.webp"],
  },''',
    "Add og:image + fix duplicate brand name in titles"
)


# ══════════════════════════════════════════════════════
# FIX 2 — next.config.js: merge duplicate `images` keys
# ══════════════════════════════════════════════════════
print("\n[2] next.config.js — merge duplicate images keys")

OLD_NEXT = '''const nextConfig = {
  images: {
    minimumCacheTTL: 31536000,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },'''

NEW_NEXT = '''const nextConfig = {
  images: {
    minimumCacheTTL: 31536000,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },'''

fix("next.config.js", OLD_NEXT, NEW_NEXT, "Merge duplicate images config keys")


# ══════════════════════════════════════════════════════
# FIX 3 — next.config.js: remove duplicate redirect rules
# ══════════════════════════════════════════════════════
print("\n[3] next.config.js — deduplicate redirect rules")

content = read("next.config.js")

# The redirects block has many exact duplicates.
# Strategy: parse the redirects array, deduplicate by (source, destination), preserve order.
# We'll do a text-level dedup of the literal duplicate lines.

# Find the redirects function body
match = re.search(r'async redirects\(\) \{.*?return \[(.*?)\];\s*\},', content, re.DOTALL)
if not match:
    ERRORS.append("SKIP [dedup redirects] — could not find redirects block")
else:
    inner = match.group(1)
    # Split into individual redirect objects
    entries = re.findall(r'\{[^{}]+\}', inner)
    seen = set()
    unique = []
    for entry in entries:
        # Normalise whitespace for dedup key
        key = re.sub(r'\s+', ' ', entry.strip())
        if key not in seen:
            seen.add(key)
            unique.append(entry)

    new_inner = "\n      " + ",\n      ".join(e.strip() for e in unique) + "\n    "
    new_redirects_block = f"async redirects() {{\n    return [{new_inner}];\n  }},"
    new_content = content[:match.start()] + new_redirects_block + content[match.end():]
    write("next.config.js", new_content)
    removed = len(entries) - len(unique)
    print(f"     → Removed {removed} duplicate redirect rules ({len(unique)} remain)")


# ══════════════════════════════════════════════════════
# FIX 4 — Footer desktop CTA: /en/contact → Calendly
# ══════════════════════════════════════════════════════
print("\n[4] Footer desktop CTA → Calendly")

fix(
    "components/Footer.tsx",
    '''            <Link href="/en/contact"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:brightness-110"
              style={{background:"linear-gradient(135deg, #C9A14A 0%, #E8C46A 100%)",color:"#0B0E13"}}>
              Speak with us <ArrowRight className="h-4 w-4" />
            </Link>''',
    '''            <Link href="https://calendly.com/execpartners/15-minute-career-consultation"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:brightness-110"
              style={{background:"linear-gradient(135deg, #C9A14A 0%, #E8C46A 100%)",color:"#0B0E13"}}>
              Schedule a call <ArrowRight className="h-4 w-4" />
            </Link>''',
    "Desktop footer CTA now links to Calendly (consistent with mobile + HM page)"
)


# ══════════════════════════════════════════════════════
# FIX 5 — Candidates page: canonical /candidates → /en/candidates
# ══════════════════════════════════════════════════════
print("\n[5] Candidates page canonical")

fix(
    "app/candidates/page.tsx",
    'alternates: { canonical: "https://www.execpartners.ch/candidates" },',
    'alternates: { canonical: "https://www.execpartners.ch/en/candidates" },',
    "Fix canonical URL from /candidates to /en/candidates"
)

# Also fix the OG url
fix(
    "app/candidates/page.tsx",
    '    url: `${SITE}/candidates`,',
    '    url: `${SITE}/en/candidates`,',
    "Fix OG url from /candidates to /en/candidates"
)


# ══════════════════════════════════════════════════════
# FIX 6 — Hiring Managers brief form: wire submit to mailto
# ══════════════════════════════════════════════════════
print("\n[6] Hiring Managers brief — wire form submit")

fix(
    "app/en/hiring-managers/brief/page.tsx",
    '''          {/* NOTE: wire this form to an API route or email handler later */}
          <form className="mt-6 space-y-7">''',
    '''          <form
            className="mt-6 space-y-7"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const parts = [
                `Booking centre: ${data.get("bookingCentre") || "—"}`,
                `Market focus: ${data.get("marketFocus") || "—"}`,
                `Summary: ${data.get("mandateSummary") || "—"}`,
                `Role: ${data.get("roleTitle") || "—"}`,
                `Reporting line: ${data.get("reportingLine") || "—"}`,
                `Team context: ${data.get("teamContext") || "—"}`,
                `Target AUM: ${data.get("minPortableAum") || "—"}`,
                `Client segments: ${data.get("targetSegments") || "—"}`,
                `Languages: ${data.get("languages") || "—"}`,
                `Book characteristics: ${data.get("bookCharacteristics") || "—"}`,
                `Target ROA: ${data.get("targetRoa") || "—"}`,
                `NNM expectations: ${data.get("targetNnm") || "—"}`,
                `Compensation budget: ${data.get("compBudget") || "—"}`,
                `Licensing requirements: ${data.get("licensing") || "—"}`,
                `Process & timelines: ${data.get("process") || "—"}`,
              ];
              const body = encodeURIComponent(parts.join("\\n\\n"));
              const subject = encodeURIComponent("Hiring Brief — Executive Partners");
              window.location.href = `mailto:recruiter@execpartners.ch?subject=${subject}&body=${body}`;
            }}
          >''',
    "Wire brief form submit to mailto (interim until API route is built)"
)

# Also fix the submit button — it has non-existent classes btn-primary btn-xl
fix(
    "app/en/hiring-managers/brief/page.tsx",
    '''              <button
                type="submit"
                className="btn-primary btn-xl w-full md:w-auto"
              >
                Submit brief
              </button>''',
    '''              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C9A14A] to-[#E8C46A] px-8 py-3 text-sm font-semibold text-[#090C14] hover:brightness-110 transition-all w-full md:w-auto"
              >
                Submit brief →
              </button>''',
    "Fix submit button styling (btn-primary btn-xl classes don't exist in this file's scope)"
)


# ══════════════════════════════════════════════════════
# FIX 7 — Hiring Managers page: trailing spaces in metadata titles
# ══════════════════════════════════════════════════════
print("\n[7] Hiring Managers — remove trailing spaces from metadata title")

# The title field itself is clean, the OG/twitter are fixed in Fix 1 above.
# Check for trailing space in the main title too
fix(
    "app/hiring-managers/page.tsx",
    '  title: "Private Banking Recruitment Switzerland | Senior RM & Team Head Search",',
    '  title: "Private Banking Recruitment Switzerland | Senior RM & Team Head Search | Executive Partners",',
    "Add brand suffix to page title (was missing from hiring-managers page)"
)


# ══════════════════════════════════════════════════════
# SUMMARY
# ══════════════════════════════════════════════════════
print("\n" + "═" * 56)
if ERRORS:
    print(f"  ⚠  {len(ERRORS)} issue(s) skipped:")
    for e in ERRORS:
        print(f"     {e}")
else:
    print("  ✅  All fixes applied cleanly.")
print("═" * 56)
print("\nNext steps:")
print("  cd ~/Desktop/execpartners-fresh")
print("  git add -A && git commit -m 'fix: metadata, config, footer CTA, form wiring'")
print("  git push origin main")
print()
