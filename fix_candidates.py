import os

BASE = os.path.expanduser("~/Desktop/execpartners-fresh")

# Find candidates page and show its last 40 lines
paths = [
    "app/en/candidates/page.tsx",
    "app/candidates/page.tsx",
]

for rel in paths:
    full = os.path.join(BASE, rel)
    if not os.path.exists(full):
        print(f"NOT FOUND: {rel}")
        continue
    with open(full) as f:
        lines = f.readlines()
    total = len(lines)
    print(f"\nFILE: {rel} ({total} lines)")
    print("── Last 40 lines ──")
    for i, line in enumerate(lines[max(0,total-40):], start=max(1,total-39)):
        print(f"  {i}: {line.rstrip()}")

