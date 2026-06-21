import os, glob

BASE = os.path.expanduser("~/Desktop/execpartners-fresh")

# Find all files containing gil.chalem
print("=== Files containing gil.chalem@execpartners.ch ===")
for root, dirs, files in os.walk(BASE):
    dirs[:] = [d for d in dirs if d not in ['.git', 'node_modules', '.next']]
    for fname in files:
        if not fname.endswith(('.tsx', '.ts', '.js', '.jsx', '.json', '.mdx', '.md')):
            continue
        path = os.path.join(root, fname)
        try:
            with open(path) as f: content = f.read()
        except: continue
        if 'gil.chalem@execpartners.ch' in content:
            rel = os.path.relpath(path, BASE)
            print(f"\nFILE: {rel}")
            for i, line in enumerate(content.splitlines(), 1):
                if 'gil.chalem' in line:
                    print(f"  Line {i}: {line.strip()}")
