import os, re

BASE = os.path.expanduser("~/Desktop/execpartners-fresh")
SITEMAP = os.path.join(BASE, "app/sitemap.ts")

with open(SITEMAP) as f:
    content = f.read()

# Remove the bad object-format entries I added
bad_pattern = re.compile(
    r'\s*\{ url: `\$\{BASE\}/en/private-banking-recruitment-company`.*?\},\n'
    r'\s*\{ url: `\$\{BASE\}/en/latam-private-banking-recruiter-geneva`.*?\},\n'
    r'\s*\{ url: `\$\{BASE\}/en/mea-private-banking-recruiter-geneva`.*?\},\n'
    r'\s*\{ url: `\$\{BASE\}/en/nri-private-banking-recruiter-switzerland`.*?\},\n'
    r'\s*\{ url: `\$\{BASE\}/en/israeli-market-private-banking-switzerland`.*?\},\n',
    re.DOTALL
)
content = bad_pattern.sub('\n', content)

# Now add as plain strings, after the last existing string entry
NEW_STRINGS = '''  "/en/private-banking-recruitment-company",
  "/en/latam-private-banking-recruiter-geneva",
  "/en/mea-private-banking-recruiter-geneva",
  "/en/nri-private-banking-recruiter-switzerland",
  "/en/israeli-market-private-banking-switzerland",'''

TARGET = '"/en/private-banking-headhunter-geneva",'
if TARGET in content and "/en/latam-private-banking" not in content:
    content = content.replace(TARGET, TARGET + '\n' + NEW_STRINGS)
    print("[ok]  Added 5 pages as plain strings")
elif "/en/latam-private-banking" in content:
    print("[skip] already present")
else:
    print(f"[WARN] anchor not found: {TARGET}")

with open(SITEMAP, 'w') as f:
    f.write(content)

print("Done.")
