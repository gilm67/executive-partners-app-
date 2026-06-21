import os, sys

BASE = os.path.expanduser("~/Desktop/execpartners-fresh")

def read(rel):
    with open(os.path.join(BASE, rel)) as f: return f.read()

def write(rel, content):
    with open(os.path.join(BASE, rel), "w") as f: f.write(content)

def patch(rel, old, new, label, expected=1):
    s = read(rel)
    n = s.count(old)
    if n == 0:
        print(f"  [skip]  {label} — not found")
        return False
    if n != expected:
        print(f"  [WARN]  {label} — found {n}x, expected {expected}x")
    write(rel, s.replace(old, new))
    print(f"  [ok]   {label}")
    return True

# ── Show what the 5-line swiss file contains ──────────────
SWISS5 = "app/private-banking-recruiter-switzerland/page.tsx"
print("\n── Non-/en/ Switzerland page content ──")
try:
    for i, line in enumerate(read(SWISS5).splitlines(), 1):
        print(f"  {i}: {line}")
except: print("  (file not found)")

# ── Footer hub count ──────────────────────────────────────
print("\n── Footer hub count ──")
FOOTER = "components/Footer.tsx"
fc = read(FOOTER)
fixed = False
for old, label in [
    ("13 global hubs", "footer 13→14"),
    ("12 global hubs", "footer 12→14"),
    ('"13"', 'footer stat "13"→"14"'),
    ('"12"', 'footer stat "12"→"14"'),
]:
    new = old.replace("13", "14").replace("12", "14")
    if old in fc:
        patch(FOOTER, old, new, label)
        fc = read(FOOTER)
        fixed = True
if not fixed:
    print("  [skip]  footer hub count — not found (may be correct already)")

# ── Sitemap ───────────────────────────────────────────────
print("\n── Sitemap ──")
SITEMAP = "app/sitemap.ts"
sc = read(SITEMAP)

NEW_PAGES = [
    "/en/private-banking-recruitment-company",
    "/en/latam-private-banking-recruiter-geneva",
    "/en/mea-private-banking-recruiter-geneva",
    "/en/nri-private-banking-recruiter-switzerland",
    "/en/israeli-market-private-banking-switzerland",
]

missing = [p for p in NEW_PAGES if p not in sc]
if not missing:
    print("  [skip]  sitemap — all new pages already present")
else:
    print(f"  Adding {len(missing)} missing pages...")
    ENTRY_BLOCK = "\n".join([
        f'  {{ url: `${{BASE}}{p}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 }},'
        for p in missing
    ])
    # Find best insertion anchor
    anchors = [
        '"/en/private-banking-recruitment-agency"',
        '"/en/private-banking-headhunter-geneva"',
        '"/en/private-banking-recruiter-switzerland"',
        '"/en/about"',
    ]
    inserted = False
    for anch in anchors:
        if anch in sc:
            idx = sc.index(anch)
            line_end = sc.index('\n', idx)
            sc = sc[:line_end+1] + ENTRY_BLOCK + "\n" + sc[line_end+1:]
            write(SITEMAP, sc)
            print(f"  [ok]   sitemap — {len(missing)} pages added")
            inserted = True
            break
    if not inserted:
        # Append before the closing bracket of the return array
        if "];" in sc:
            sc = sc.replace("];", ENTRY_BLOCK + "\n];", 1)
            write(SITEMAP, sc)
            print(f"  [ok]   sitemap — {len(missing)} pages appended")
        else:
            print("  [WARN]  sitemap — could not find insertion point")

# ── Market page — specialist desk links ──────────────────
print("\n── Market page specialist links ──")
MARKET = "app/en/markets/[slug]/page.tsx"
mc = read(MARKET)

if "latam-private-banking-recruiter-geneva" in mc:
    print("  [skip]  market page — specialist block already present")
else:
    BLOCK = '''\n          {/* Specialist desk links for Geneva and Zurich */}
          {(slug === "geneva" || slug === "zurich") && (
            <div className="mt-12 pt-10 border-t border-white/10">
              <p className="text-xs uppercase tracking-widest text-white/30 mb-4">Specialist Desk Recruiters</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {[
                  { href: "/en/latam-private-banking-recruiter-geneva", label: "LATAM private banking recruiter" },
                  { href: "/en/mea-private-banking-recruiter-geneva", label: "MEA private banking recruiter" },
                  { href: "/en/nri-private-banking-recruiter-switzerland", label: "NRI private banking recruiter" },
                  { href: "/en/israeli-market-private-banking-switzerland", label: "Israeli market private banking" },
                  { href: "/en/private-banking-headhunter-geneva", label: "Private banking headhunter Geneva" },
                  { href: "/en/private-banking-recruiter-switzerland", label: "Private banking recruiter Switzerland" },
                ].map(({ href, label }) => (
                  <Link key={href} href={href} className="text-white/50 hover:text-white transition border border-white/10 rounded px-3 py-2">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          )}'''

    # Try inserting before </main> (last occurrence)
    if "</main>" in mc:
        idx = mc.rindex("</main>")
        mc = mc[:idx] + BLOCK + "\n          " + mc[idx:]
        write(MARKET, mc)
        print("  [ok]   market page — specialist desks block added")
    else:
        print("  [WARN]  market page — could not find </main>")

# ── Candidates page — specialist market section ──────────
print("\n── Candidates page specialist links ──")
CANDS_PATHS = [
    "app/en/candidates/page.tsx",
    "app/candidates/page.tsx",
]
cands_path = None
for p in CANDS_PATHS:
    if os.path.exists(os.path.join(BASE, p)):
        cands_path = p
        break

if not cands_path:
    print("  [skip]  candidates page — not found at expected paths")
else:
    cc = read(cands_path)
    if "latam-private-banking" in cc:
        print(f"  [skip]  {cands_path} — already has specialist links")
    else:
        CBLOCK = '''\n      {/* Specialist market desks */}
      <section className="border-t border-white/10 pt-10 mt-10">
        <p className="text-xs uppercase tracking-widest text-white/30 mb-5">Specialist Market Desks</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {[
            { href: "/en/latam-private-banking-recruiter-geneva", label: "LATAM private banking — Geneva" },
            { href: "/en/mea-private-banking-recruiter-geneva", label: "MEA private banking — Geneva" },
            { href: "/en/nri-private-banking-recruiter-switzerland", label: "NRI private banking — Switzerland" },
            { href: "/en/israeli-market-private-banking-switzerland", label: "Israeli market — Switzerland" },
          ].map(({ href, label }) => (
            <Link key={href} href={href} className="text-white/50 hover:text-white transition border border-white/10 rounded px-3 py-2">
              {label}
            </Link>
          ))}
        </div>
      </section>'''
        inserted = False
        for anch in ["</main>", "    </main>"]:
            if anch in cc:
                idx = cc.rindex(anch)
                cc = cc[:idx] + CBLOCK + "\n      " + cc[idx:]
                write(cands_path, cc)
                print(f"  [ok]   {cands_path} — specialist market section added")
                inserted = True
                break
        if not inserted:
            print(f"  [WARN]  {cands_path} — could not find insertion point")

print("\n✅ Done.")
