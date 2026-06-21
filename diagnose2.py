import os

BASE = os.path.expanduser("~/Desktop/execpartners-fresh")

print("=== ALL files containing gil.chalem (any extension) ===")
for root, dirs, files in os.walk(BASE):
    dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', '.next']]
    for fname in files:
        path = os.path.join(root, fname)
        try:
            with open(path, encoding='utf-8', errors='ignore') as f:
                content = f.read()
        except: continue
        if 'gil.chalem' in content:
            rel = os.path.relpath(path, BASE)
            print(f"\nFILE: {rel}")
            for i, line in enumerate(content.splitlines(), 1):
                if 'gil.chalem' in line:
                    print(f"  Line {i}: {line.strip()}")

print("\n=== Content of app/private-banking-recruiter-switzerland/page.tsx ===")
p = os.path.join(BASE, "app/private-banking-recruiter-switzerland/page.tsx")
if os.path.exists(p):
    with open(p) as f: lines = f.readlines()
    print(f"  File has {len(lines)} lines")
    for i, line in enumerate(lines, 1):
        if any(x in line for x in ['email', 'mailto', 'contact', 'chalem', 'recruiter@', 'Prefer']):
            print(f"  Line {i}: {line.rstrip()}")
else:
    print("  FILE NOT FOUND — checking for similar paths:")
    for root, dirs, files in os.walk(os.path.join(BASE, "app")):
        dirs[:] = [d for d in dirs if d not in ['node_modules', '.next']]
        for f in files:
            if 'switzerland' in f.lower() or 'switzerland' in root.lower():
                print(f"  {os.path.relpath(os.path.join(root, f), BASE)}")
