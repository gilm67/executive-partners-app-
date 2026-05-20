#!/usr/bin/env python3
"""
EP SEO Enhancer — Article Schema Injector
==========================================
Adds to every insights article page:
  1. Article JSON-LD schema (author, date, image, publisher)
  2. og:article:published_time + og:article:author in metadata
  3. meta name="author"

Usage:
  cd ~/Desktop/execpartners-fresh

  # Preview only (no changes):
  python3 add_article_seo.py --dry-run

  # Apply changes:
  python3 add_article_seo.py

  # Then:
  npm run build
  git add -A && git commit -m "seo: add Article JSON-LD schema to all insight pages" && git push
"""

import os
import re
import sys
import json
from pathlib import Path

# ── Config ───────────────────────────────────────────────────────────────────
INSIGHTS_DIR = Path("app/en/insights")
AUTHOR_NAME  = "Gil M. Chalem"
AUTHOR_URL   = "https://www.execpartners.ch/en/about"
SITE_NAME    = "Executive Partners"
SITE_URL     = "https://www.execpartners.ch"
LOGO_URL     = "https://www.execpartners.ch/transparent-ep-logo.png"
OG_IMAGE     = "https://www.execpartners.ch/og.webp"

MONTH_MAP = {
    "january":"01","february":"02","march":"03","april":"04",
    "may":"05","june":"06","july":"07","august":"08",
    "september":"09","october":"10","november":"11","december":"12"
}

DRY_RUN = "--dry-run" in sys.argv
# ─────────────────────────────────────────────────────────────────────────────


def find_article_pages(base: Path):
    skip = {"insights","archive","pillar","subtheme","private-banking-career-intelligence"}
    pages = []
    for p in base.rglob("page.tsx"):
        if p.parent.name not in skip:
            pages.append(p)
    return sorted(pages)


def extract_date(content: str):
    # ISO date
    m = re.search(r"\b(\d{4}-\d{2}-\d{2})\b", content)
    if m:
        return m.group(1)
    # "18 May 2026" style
    m = re.search(
        r"\b(\d{1,2})\s+(January|February|March|April|May|June|July|"
        r"August|September|October|November|December)\s+(\d{4})\b",
        content, re.IGNORECASE
    )
    if m:
        d = m.group(1).zfill(2)
        mo = MONTH_MAP[m.group(2).lower()]
        y = m.group(3)
        return f"{y}-{mo}-{d}"
    return None


def extract_title(content: str):
    # Try title in metadata
    m = re.search(r"title\s*:\s*['\"]([^'\"]+)['\"]", content)
    if m:
        t = m.group(1)
        return re.sub(r"\s*\|\s*Executive Partners.*$", "", t).strip()
    # Try <h1> tag in JSX
    m = re.search(r"<h1[^>]*>\s*([^<]{5,})\s*</h1>", content)
    if m:
        return m.group(1).strip()
    return None


def extract_slug(content: str):
    m = re.search(
        r"canonical['\"]?\s*:\s*['\"]https://www\.execpartners\.ch(/en/insights/[^'\"]+)['\"]",
        content
    )
    return m.group(1) if m else None


def extract_description(content: str):
    m = re.search(r"description\s*:\s*['\"]([^'\"]{20,})['\"]", content)
    return m.group(1) if m else ""


def build_schema(slug, title, description, date_iso):
    url = f"{SITE_URL}{slug}" if slug else SITE_URL
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title or "",
        "description": description or "",
        "url": url,
        "image": OG_IMAGE,
        "datePublished": date_iso or "",
        "dateModified": date_iso or "",
        "author": {
            "@type": "Person",
            "name": AUTHOR_NAME,
            "url": AUTHOR_URL
        },
        "publisher": {
            "@type": "Organization",
            "name": SITE_NAME,
            "url": SITE_URL,
            "logo": {"@type": "ImageObject", "url": LOGO_URL}
        }
    }


def inject_jsonld(content: str, schema_dict: dict):
    """Insert JSON-LD <script> tag as first child of <main> or <article>."""
    schema_json = json.dumps(schema_dict, ensure_ascii=False, indent=2)
    snippet = (
        "\n      {/* EP SEO: Article schema */}\n"
        "      <script\n"
        "        type=\"application/ld+json\"\n"
        f"        dangerouslySetInnerHTML={{{{ __html: JSON.stringify({json.dumps(schema_dict, ensure_ascii=False)}) }}}}\n"
        "      />"
    )

    for pattern in [r"(<main\b[^>]*>)", r"(<article\b[^>]*>)"]:
        m = re.search(pattern, content)
        if m:
            pos = m.end()
            return content[:pos] + snippet + content[pos:], True

    return content, False


def inject_og_article_tags(content: str, date_iso: str):
    """Add article:published_time and article:author into the metadata other[] array."""
    if "article:published_time" in content:
        return content, False

    additions = (
        f'\n        {{ property: "article:published_time", content: "{date_iso}" }},\n'
        f'        {{ property: "article:author", content: "{AUTHOR_NAME}" }},\n'
        f'        {{ name: "author", content: "{AUTHOR_NAME}" }},'
    )

    # Find openGraph other: [ or standalone other: [
    m = re.search(r"(other\s*:\s*\[)", content)
    if m:
        pos = m.end()
        return content[:pos] + additions + content[pos:], True

    return content, False


def patch_file(path: Path, dry_run: bool = False):
    content = path.read_text(encoding="utf-8")

    if "application/ld+json" in content:
        print(f"  ⏭  Already patched — skipping: {path.parent.name}/page.tsx")
        return False

    slug        = extract_slug(content)
    title       = extract_title(content)
    description = extract_description(content)
    date_iso    = extract_date(content)

    if not title:
        print(f"  ⚠️  No title found — skipping: {path.parent.name}/page.tsx")
        return False

    label = path.parent.name
    print(f"\n  📄 {label}/page.tsx")
    print(f"     title : {title}")
    print(f"     date  : {date_iso or '(not found)'}")
    print(f"     slug  : {slug or '(not found)'}")

    if dry_run:
        print(f"     → DRY RUN — no changes written")
        return True

    schema = build_schema(slug, title, description, date_iso)
    content, jsonld_ok = inject_jsonld(content, schema)
    content, og_ok     = inject_og_article_tags(content, date_iso or "")

    if not jsonld_ok:
        print(f"  ⚠️  Could not find <main> or <article> tag — JSON-LD not injected")

    path.write_text(content, encoding="utf-8")
    print(f"     ✅ JSON-LD injected: {jsonld_ok}  |  OG article tags: {og_ok}")
    return True


def main():
    if not INSIGHTS_DIR.exists():
        print(f"❌  Directory not found: {INSIGHTS_DIR}")
        print(f"    Run this script from your repo root:")
        print(f"    cd ~/Desktop/execpartners-fresh && python3 add_article_seo.py")
        return

    pages = find_article_pages(INSIGHTS_DIR)
    mode  = "DRY RUN" if DRY_RUN else "LIVE"
    print(f"EP Article SEO Injector [{mode}]")
    print(f"Found {len(pages)} article pages\n")

    patched = skipped = 0
    for p in pages:
        r = patch_file(p, dry_run=DRY_RUN)
        if r: patched += 1
        else: skipped += 1

    print(f"\n{'─'*50}")
    print(f"{'Preview' if DRY_RUN else 'Done'} — {patched} {'would be ' if DRY_RUN else ''}patched, {skipped} skipped")

    if not DRY_RUN:
        print("\nNext steps:")
        print("  npm run build")
        print("  git add -A && git commit -m 'seo: add Article JSON-LD schema to all insight pages' && git push")
    else:
        print("\nTo apply: python3 add_article_seo.py")


if __name__ == "__main__":
    main()
