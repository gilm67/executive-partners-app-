import os, sys, json, re

BASE = os.path.expanduser("~/Desktop/execpartners-fresh")

def read(rel):
    with open(os.path.join(BASE, rel)) as f: return f.read()
def write(rel, s):
    with open(os.path.join(BASE, rel), "w") as f: f.write(s)

# ── 1. Fix next.config.js broken redirect ─────────────────
print("── next.config.js ──")
CONFIG = "next.config.js"
c = read(CONFIG)

# The bad route is {"type":"host","value":"execpartners.ch"}
# This is a Vercel-style host condition inside a redirect that Next.js doesn't support
# Find and remove any redirect objects containing "type":"host"
if '"type"' in c and '"host"' in c:
    # Remove any object in the redirects array that contains type:host
    # These look like: { type: "host", value: "execpartners.ch" }
    # or { "type": "host", "value": "execpartners.ch" }
    
    # Strategy: find the redirects array and filter out bad entries
    # First, let's see what the bad redirect looks like in context
    lines = c.splitlines()
    bad_lines = [(i+1, l) for i, l in enumerate(lines) if '"host"' in l or "'host'" in l]
    print(f"  Lines containing 'host': {len(bad_lines)}")
    for ln, l in bad_lines:
        print(f"    Line {ln}: {l.strip()}")
else:
    print("  No 'host' type redirect found — checking for other issues...")
    # Show lines around 'permanent' being missing
    lines = c.splitlines()
    for i, l in enumerate(lines):
        if 'type' in l and ('host' in l or 'value' in l):
            print(f"  Line {i+1}: {l.strip()}")

# ── 2. Fix candidates page ─────────────────────────────────
print("\n── Candidates page ──")
CANDS = "app/candidates/page.tsx"
cc = read(CANDS)

if "latam-private-banking" in cc:
    print("  [skip]  already has specialist links")
else:
    BLOCK = '''
      {/* Specialist market desks */}
      <section className="px-4 py-10 border-t border-white/10 max-w-5xl mx-auto w-full">
        <p className="text-xs uppercase tracking-widest text-white/30 mb-5">Specialist Market Desks</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          {[
            { href: "/en/latam-private-banking-recruiter-geneva", label: "LATAM private banking — Geneva" },
            { href: "/en/mea-private-banking-recruiter-geneva", label: "MEA private banking — Geneva" },
            { href: "/en/nri-private-banking-recruiter-switzerland", label: "NRI private banking — Switzerland" },
            { href: "/en/israeli-market-private-banking-switzerland", label: "Israeli market — Switzerland" },
          ].map(({ href, label }) => (
            <a key={href} href={href} className="text-white/50 hover:text-white transition border border-white/10 rounded px-3 py-2">
              {label}
            </a>
          ))}
        </div>
      </section>'''

    # Insert before </main> (line 349 based on diagnostic)
    TARGET = "      </main>"
    if TARGET in cc:
        cc = cc.replace(TARGET, BLOCK + "\n" + TARGET, 1)
        write(CANDS, cc)
        print("  [ok]   candidates page — specialist market section added")
    elif "</main>" in cc:
        idx = cc.rindex("</main>")
        cc = cc[:idx] + BLOCK + "\n      " + cc[idx:]
        write(CANDS, cc)
        print("  [ok]   candidates page — specialist market section added")
    else:
        print("  [WARN]  could not find </main>")

print("\n✅ Done.")
