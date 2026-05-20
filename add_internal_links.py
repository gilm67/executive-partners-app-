#!/usr/bin/env python3
"""
EP Internal Linking Script
===========================
Scans all article body text in articles.ts and adds internal links
to market pages, tools, and jobs wherever city/topic names appear.

Rules:
- Max 1 link per keyword per article (prevents over-linking)
- Never links inside existing markdown links
- Only links in body text, not summary/title
- Dry-run mode available: python3 add_internal_links.py --dry-run

Usage:
  cd ~/Desktop/execpartners-fresh
  python3 add_internal_links.py --dry-run   # preview
  python3 add_internal_links.py             # apply
"""

import re
import sys

DRY_RUN = "--dry-run" in sys.argv
ARTICLES_FILE = "app/en/insights/articles.ts"

# ── Link map: keyword → URL ──────────────────────────────────────────────────
# Order matters — longer/more specific phrases first
LINK_MAP = [
    # Markets
    ("private banking in Geneva",       "/en/markets/geneva"),
    ("private bankers in Geneva",       "/en/markets/geneva"),
    ("private banking Geneva",          "/en/markets/geneva"),
    ("Geneva private banking",          "/en/markets/geneva"),
    ("Geneva",                          "/en/markets/geneva"),
    ("private banking in Zurich",       "/en/markets/zurich"),
    ("private bankers in Zurich",       "/en/markets/zurich"),
    ("private banking Zurich",          "/en/markets/zurich"),
    ("Zurich private banking",          "/en/markets/zurich"),
    ("Zurich",                          "/en/markets/zurich"),
    ("private banking in Singapore",    "/en/markets/singapore"),
    ("Singapore private banking",       "/en/markets/singapore"),
    ("Singapore",                       "/en/markets/singapore"),
    ("private banking in Dubai",        "/en/markets/dubai"),
    ("Dubai private banking",           "/en/markets/dubai"),
    ("DIFC",                            "/en/markets/dubai"),
    ("Dubai",                           "/en/markets/dubai"),
    ("private banking in London",       "/en/markets/london"),
    ("London private banking",          "/en/markets/london"),
    ("London",                          "/en/markets/london"),
    ("Hong Kong private banking",       "/en/markets/hong-kong"),
    ("Hong Kong",                       "/en/markets/hong-kong"),
    ("Milan private banking",           "/en/markets/milan"),
    ("wealth management in Milan",      "/en/markets/milan"),
    ("Milan",                           "/en/markets/milan"),

    # Tools
    ("AUM portability",                 "/en/portability"),
    ("portable book",                   "/en/portability"),
    ("portability",                     "/en/portability"),
    ("business plan",                   "/en/bp-simulator"),
    ("business case",                   "/en/bp-simulator"),

    # Jobs
    ("active mandates",                 "/en/jobs"),
    ("open mandates",                   "/en/jobs"),
]

# Markdown link pattern — don't touch text already inside a link
EXISTING_LINK_RE = re.compile(r'\[([^\]]+)\]\([^\)]+\)')


def already_linked(text, keyword):
    """Check if keyword already appears inside a markdown link."""
    for m in EXISTING_LINK_RE.finditer(text):
        if keyword.lower() in m.group(1).lower():
            return True
    return False


def insert_link(text, keyword, url):
    """Replace first occurrence of keyword (not already linked) with markdown link."""
    # Case-insensitive search for first occurrence
    pattern = re.compile(re.escape(keyword), re.IGNORECASE)
    
    def replacer(m):
        return f"[{m.group(0)}]({url})"
    
    new_text, count = pattern.subn(replacer, text, count=1)
    return new_text, count


def process_body(body, slug):
    """Add internal links to a single article body."""
    used_urls = set()  # one link per destination per article
    used_keywords = set()
    total_links = 0
    changes = []

    for keyword, url in LINK_MAP:
        # Skip if we already linked to this URL in this article
        if url in used_urls:
            continue

        # Skip if keyword already in a link
        if already_linked(body, keyword):
            continue

        # Check keyword exists in body (case-insensitive)
        if not re.search(re.escape(keyword), body, re.IGNORECASE):
            continue

        new_body, count = insert_link(body, keyword, url)
        if count:
            body = new_body
            used_urls.add(url)
            used_keywords.add(keyword)
            total_links += 1
            changes.append(f"  → [{keyword}]({url})")

    return body, total_links, changes


def main():
    content = open(ARTICLES_FILE).read()

    # Extract all body: `...` blocks
    body_pattern = re.compile(r'(body:\s*`)(.*?)(`)', re.DOTALL)
    matches = list(body_pattern.finditer(content))

    print(f"EP Internal Linking Script [{'DRY RUN' if DRY_RUN else 'LIVE'}]")
    print(f"Found {len(matches)} article bodies\n")

    total_links_added = 0
    new_content = content

    for m in matches:
        prefix = m.group(1)
        body = m.group(2)
        suffix = m.group(3)

        # Get slug from context (look back ~500 chars for slug:)
        start = max(0, m.start() - 500)
        context = content[start:m.start()]
        slug_match = re.search(r'slug:\s*["\']([^"\']+)["\']', context)
        slug = slug_match.group(1) if slug_match else "unknown"

        new_body, links_added, changes = process_body(body, slug)

        if links_added:
            print(f"📄 {slug} — {links_added} link(s) added:")
            for c in changes:
                print(c)
            print()
            total_links_added += links_added

            if not DRY_RUN:
                new_content = new_content.replace(
                    prefix + body + suffix,
                    prefix + new_body + suffix,
                    1
                )

    print(f"{'─'*50}")
    print(f"Total: {total_links_added} links {'would be ' if DRY_RUN else ''}added across {len(matches)} articles")

    if not DRY_RUN and total_links_added > 0:
        open(ARTICLES_FILE, "w").write(new_content)
        print(f"\n✅ {ARTICLES_FILE} updated")
        print("\nNext steps:")
        print("  git add -A && git commit -m 'seo: add internal links to article body text' && git push")
    elif DRY_RUN:
        print("\nTo apply: python3 add_internal_links.py")


if __name__ == "__main__":
    main()
