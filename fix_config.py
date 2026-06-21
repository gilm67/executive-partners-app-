import os, re

BASE = os.path.expanduser("~/Desktop/execpartners-fresh")
CONFIG = os.path.join(BASE, "next.config.js")

with open(CONFIG) as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")
print("Lines 15-25:")
for i, l in enumerate(lines[14:25], 15):
    print(f"  {i}: {l.rstrip()}")

# Remove the bad line
bad_pattern = re.compile(r'\s*\{\s*type:\s*["\']host["\']\s*,\s*value:\s*["\']execpartners\.ch["\']\s*\},?\s*\n?')
original = ''.join(lines)
fixed = bad_pattern.sub('\n', original)

if fixed == original:
    print("\n[WARN] Pattern not matched — trying line-by-line removal")
    new_lines = []
    removed = 0
    for l in lines:
        if 'type:' in l and 'host' in l and 'execpartners' in l:
            print(f"  Removing: {l.rstrip()}")
            removed += 1
        else:
            new_lines.append(l)
    fixed = ''.join(new_lines)
    print(f"  Removed {removed} line(s)")
else:
    print("\n[ok]  Bad redirect removed via regex")

with open(CONFIG, 'w') as f:
    f.write(fixed)

print("\nLines 15-25 after fix:")
lines2 = fixed.splitlines()
for i, l in enumerate(lines2[14:25], 15):
    print(f"  {i}: {l}")

print("\n✅ next.config.js fixed.")
