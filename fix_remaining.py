import os, sys, re

BASE = os.path.expanduser("~/Desktop/execpartners-fresh")

def patch(rel, old, new, label, expected=1):
    path = os.path.join(BASE, rel)
    with open(path) as f: s = f.read()
    n = s.count(old)
    if n == 0: print(f"  [MISS]  {label}"); sys.exit(1)
    if n != expected: print(f"  [COUNT] {label} found {n}x expected {expected}x"); sys.exit(1)
    with open(path, "w") as f: f.write(s.replace(old, new))
    print(f"  [ok]   {label}")

def write(rel, content, label):
    path = os.path.join(BASE, rel)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w") as f: f.write(content)
    print(f"  [ok]   {label}")

# ============================================================
# 1. EMAIL FIXES — private-banking-recruiter-switzerland (non-/en/)
# ============================================================
print("\n── Email fixes ──")

SWISS_OLD = "app/private-banking-recruiter-switzerland/page.tsx"

patch(SWISS_OLD,
    "Contact Gil M. Chalem at gil.chalem@execpartners.ch for a confidential discussion.",
    "Contact the Executive Partners team at recruiter@execpartners.ch for a confidential discussion.",
    "email fix 1 (FAQ body)")

patch(SWISS_OLD,
    "Prefer to start with a discreet email? <gil.chalem@execpartners.ch>",
    "Prefer to start with a discreet email? recruiter@execpartners.ch",
    "email fix 2 (page footer)")

# ============================================================
# 2. FOOTER HUB COUNT
# ============================================================
print("\n── Footer hub count ──")

# Check Footer.tsx first
FOOTER = "components/Footer.tsx"
fp = os.path.join(BASE, FOOTER)
with open(fp) as f: fc = f.read()

if "13 global hubs" in fc:
    patch(FOOTER, "13 global hubs", "14 global hubs", "footer 13→14 hubs")
elif "12 global hubs" in fc:
    patch(FOOTER, "12 global hubs", "14 global hubs", "footer 12→14 hubs")
else:
    print("  [skip]  footer hub count — not found (may be page-level)")

# Fix the "12 global hubs" in the non-/en/ switzerland page footer section
with open(os.path.join(BASE, SWISS_OLD)) as f: sc = f.read()
if "12 global hubs" in sc:
    patch(SWISS_OLD, "12 global hubs", "14 global hubs", "swiss page footer 12→14 hubs")
elif "13 global hubs" in sc:
    patch(SWISS_OLD, "13 global hubs", "14 global hubs", "swiss page footer 13→14 hubs")
else:
    print("  [skip]  swiss page hub count — not found")

# ============================================================
# 3. SITEMAP — add 6 new pages
# ============================================================
print("\n── Sitemap ──")

SITEMAP = "app/sitemap.ts"
sp = os.path.join(BASE, SITEMAP)
with open(sp) as f: sc = f.read()

NEW_SITEMAP_ENTRIES = """  { url: \`\${BASE}/en/private-banking-recruitment-company\`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
  { url: \`\${BASE}/en/latam-private-banking-recruiter-geneva\`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
  { url: \`\${BASE}/en/mea-private-banking-recruiter-geneva\`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
  { url: \`\${BASE}/en/nri-private-banking-recruiter-switzerland\`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
  { url: \`\${BASE}/en/israeli-market-private-banking-switzerland\`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },"""

already = "latam-private-banking-recruiter-geneva" in sc
if already:
    print("  [skip]  sitemap — new pages already present")
else:
    # Find the anchor: private-banking-recruitment-agency entry or the return array close
    # Try to insert after the recruitment-agency entry
    ANCHOR_OPTIONS = [
        '"/en/private-banking-recruitment-agency"',
        '"/en/private-banking-headhunter-geneva"',
        '"/en/private-banking-recruiter-switzerland"',
    ]
    inserted = False
    for anchor in ANCHOR_OPTIONS:
        if anchor in sc:
            # Find end of that line
            idx = sc.index(anchor)
            line_end = sc.index('\n', idx)
            new_sc = sc[:line_end+1] + NEW_SITEMAP_ENTRIES + "\n" + sc[line_end+1:]
            with open(sp, "w") as f: f.write(new_sc)
            print(f"  [ok]   sitemap — 5 new pages added after {anchor}")
            inserted = True
            break
    if not inserted:
        print("  [WARN]  sitemap — could not find insertion anchor; please add manually")

# ============================================================
# 4. GENEVA MARKET PAGE — add specialist desks section
# ============================================================
print("\n── Geneva market page ──")

# The market pages use a dynamic [slug] route, so we need to look at
# the actual Geneva content. Let's patch the [slug]/page.tsx to add
# a conditional specialist desks block for Geneva and Zurich.

MARKET_PAGE = "app/en/markets/[slug]/page.tsx"
mp = os.path.join(BASE, MARKET_PAGE)
with open(mp) as f: mc = f.read()

SPECIALIST_BLOCK = """
          {/* Specialist market desk links — Geneva and Zurich only */}
          {(slug === "geneva" || slug === "zurich") && (
            <div className="mt-12 border-t border-white/10 pt-10">
              <p className="text-xs uppercase tracking-widest text-white/30 mb-4">Specialist Desk Recruiters</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { href: "/en/latam-private-banking-recruiter-geneva", label: "LATAM private banking recruiter" },
                  { href: "/en/mea-private-banking-recruiter-geneva", label: "MEA private banking recruiter" },
                  { href: "/en/nri-private-banking-recruiter-switzerland", label: "NRI private banking recruiter" },
                  { href: "/en/israeli-market-private-banking-switzerland", label: "Israeli market private banking" },
                  { href: "/en/private-banking-headhunter-geneva", label: "Private banking headhunter Geneva" },
                  { href: "/en/private-banking-recruiter-switzerland", label: "Private banking recruiter Switzerland" },
                ].map(({ href, label }) => (
                  <Link key={href} href={href} className="text-sm text-white/50 hover:text-white transition border border-white/10 rounded px-3 py-2">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          )}"""

SPECIALIST_ALREADY = "Specialist Desk Recruiters" in mc or "latam-private-banking-recruiter-geneva" in mc

if SPECIALIST_ALREADY:
    print("  [skip]  market page — specialist block already present")
else:
    # Find a good insertion point — before the closing </main> or before a Related/footer section
    # Look for the end of the main content area
    ANCHORS = [
        "</main>",
        "        </div>\n      </main>",
    ]
    inserted = False
    for anch in ANCHORS:
        if anch in mc:
            # Insert before last occurrence
            idx = mc.rindex(anch)
            new_mc = mc[:idx] + SPECIALIST_BLOCK + "\n" + mc[idx:]
            with open(mp, "w") as f: f.write(new_mc)
            print(f"  [ok]   market page — specialist desks block added")
            inserted = True
            break
    if not inserted:
        print("  [WARN]  market page — could not find insertion point")

# ============================================================
# 5. CANDIDATES PAGE — add specialist market section
# ============================================================
print("\n── Candidates page ──")

CANDS = "app/en/candidates/page.tsx"
cp = os.path.join(BASE, CANDS)
if not os.path.exists(cp):
    print("  [skip]  candidates page — file not found at expected path")
else:
    with open(cp) as f: cc = f.read()
    if "latam-private-banking" in cc:
        print("  [skip]  candidates page — specialist links already present")
    else:
        CANDS_BLOCK = """
      {/* Specialist market recruiters */}
      <section className="border-t border-white/10 pt-10 mt-10">
        <p className="text-xs uppercase tracking-widest text-white/30 mb-4">Specialist Market Desks</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { href: "/en/latam-private-banking-recruiter-geneva", label: "LATAM private banking — Geneva" },
            { href: "/en/mea-private-banking-recruiter-geneva", label: "MEA private banking — Geneva" },
            { href: "/en/nri-private-banking-recruiter-switzerland", label: "NRI private banking — Switzerland" },
            { href: "/en/israeli-market-private-banking-switzerland", label: "Israeli market — Switzerland" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="text-sm text-white/50 hover:text-white transition border border-white/10 rounded px-3 py-2">
              {label}
            </Link>
          ))}
        </div>
      </section>"""
        CANDS_ANCHORS = ["</main>", "      </div>\n    </main>"]
        inserted = False
        for anch in CANDS_ANCHORS:
            if anch in cc:
                idx = cc.rindex(anch)
                new_cc = cc[:idx] + CANDS_BLOCK + "\n" + cc[idx:]
                with open(cp, "w") as f: f.write(new_cc)
                print("  [ok]   candidates page — specialist market section added")
                inserted = True
                break
        if not inserted:
            print("  [WARN]  candidates page — could not find insertion point")

print("\n✅ All fixes complete.")
