#!/usr/bin/env python3
"""
Run from repo root: python3 og_generate_and_patch.py
Requires: pip install Pillow
Does two things:
  1. Generates 4 OG images into public/og-articles/
  2. Patches the 4 page.tsx files to reference those images
"""

import os, sys

BASE = os.path.dirname(os.path.abspath(__file__))
OUT  = os.path.join(BASE, "public", "og-articles")
SITE = "https://www.execpartners.ch"

# ─── 1. Generate OG images ────────────────────────────────────────────────────
try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("PIL not found. Run: pip install Pillow")
    sys.exit(1)

W, H = 1200, 630

NAVY      = (11, 15, 26)
GOLD      = (201, 161, 74)
WHITE     = (255, 255, 255)
WHITE_DIM = (200, 210, 230)

# System font paths — works on macOS
FONT_PATHS_BOLD  = [
    "/System/Library/Fonts/Helvetica.ttc",
    "/System/Library/Fonts/Arial Bold.ttf",
    "/Library/Fonts/Arial Bold.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
]
FONT_PATHS_SERIF = [
    "/System/Library/Fonts/Times New Roman Bold.ttf",
    "/Library/Fonts/Times New Roman Bold.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf",
]
FONT_PATHS_REG   = [
    "/System/Library/Fonts/Helvetica.ttc",
    "/Library/Fonts/Arial.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
]

def load_font(paths, size):
    for p in paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                continue
    return ImageFont.load_default()


def make_og(filename, tag, line1, line2, subtitle, accent, geo_fn):
    img = Image.new("RGB", (W, H), NAVY)
    draw = ImageDraw.Draw(img)

    # Gradient background
    for x in range(W):
        t = x / W
        r = int(NAVY[0] * (1 - t * 0.35) + accent[0] * t * 0.35)
        g = int(NAVY[1] * (1 - t * 0.35) + accent[1] * t * 0.35)
        b = int(NAVY[2] * (1 - t * 0.35) + accent[2] * t * 0.35)
        draw.line([(x, 0), (x, H)], fill=(r, g, b))

    geo_fn(draw, accent)

    # Gold left bar
    draw.rectangle([(0, 0), (5, H)], fill=GOLD)

    # Fonts
    fnt_label  = load_font(FONT_PATHS_BOLD,  13)
    fnt_sub_sm = load_font(FONT_PATHS_REG,   13)
    fnt_tag    = load_font(FONT_PATHS_BOLD,  12)
    fnt_title  = load_font(FONT_PATHS_SERIF, 56)
    fnt_title2 = load_font(FONT_PATHS_SERIF, 52)
    fnt_sub    = load_font(FONT_PATHS_REG,   19)
    fnt_bot    = load_font(FONT_PATHS_BOLD,  13)
    fnt_bot_r  = load_font(FONT_PATHS_REG,   13)

    # Top wordmark
    draw.text((52, 44), "EXECUTIVE PARTNERS", font=fnt_label, fill=GOLD)
    draw.text((52, 62), "Geneva \u00b7 Z\u00fcrich \u00b7 London \u00b7 Dubai \u00b7 Singapore",
              font=fnt_sub_sm, fill=(*WHITE_DIM, 140))
    draw.line([(52, 82), (W - 52, 82)], fill=(*GOLD, 40), width=1)

    # Tag pill
    try:
        tag_w = fnt_tag.getlength(tag) + 24
    except AttributeError:
        tag_w = fnt_tag.getsize(tag)[0] + 24
    draw.rounded_rectangle([(52, 104), (52 + tag_w, 128)], radius=3, fill=(*accent, 30))
    draw.rounded_rectangle([(52, 104), (52 + tag_w, 128)], radius=3,
                           outline=(*accent, 100), width=1)
    draw.text((64, 109), tag, font=fnt_tag, fill=GOLD)

    # Title
    draw.text((52, 152), line1, font=fnt_title,  fill=WHITE)
    draw.text((52, 216), line2, font=fnt_title2, fill=(*WHITE, 240))

    # Subtitle
    draw.text((52, 306), subtitle, font=fnt_sub, fill=(*WHITE_DIM, 170))

    # Bottom bar
    draw.line([(52, H - 80), (W - 52, H - 80)], fill=(*GOLD, 50), width=1)
    draw.text((52, H - 60), "execpartners.ch", font=fnt_bot, fill=GOLD)
    right = "Private Banking Executive Search"
    try:
        rw = fnt_bot_r.getlength(right)
    except AttributeError:
        rw = fnt_bot_r.getsize(right)[0]
    draw.text((W - 52 - rw, H - 60), right, font=fnt_bot_r, fill=(*WHITE_DIM, 120))

    # Diamond mark
    cx, cy, s = W - 60, H - 60, 10
    draw.polygon([(cx, cy - s), (cx + s // 3, cy), (cx, cy + s), (cx - s // 3, cy)],
                 fill=(*GOLD, 160))

    out_path = os.path.join(OUT, filename)
    img.save(out_path, "JPEG", quality=93, optimize=True)
    print(f"  \u2713 Generated {filename}")


# ── Geometric decorations per market ──────────────────────────────────────────

def geo_latam(draw, a):
    for i in range(8):
        r = 220 + i * 30
        x0, y0 = W - 20, -80
        draw.arc([(x0 - r, y0 - r), (x0 + r, y0 + r)], start=100, end=200,
                 fill=(*a, max(0, 60 - i * 8)), width=2)
    for i in range(5):
        x1 = W - 200 + i * 50
        draw.line([(x1, H), (W, H - 150 - i * 30)], fill=(*a, 20), width=1)

def geo_mea(draw, a):
    step = 70
    for row in range(-1, H // step + 2):
        for col in range(W // 2 // step - 1, W // step + 2):
            cx = col * step + (row % 2) * step // 2
            cy = row * step
            s = 18
            draw.polygon([(cx, cy - s), (cx + s, cy), (cx, cy + s), (cx - s, cy)],
                         outline=(*a, 22))
    draw.rectangle([(W - 130, 60), (W - 122, H - 60)], fill=(*a, 15))
    draw.rectangle([(W - 170, 140), (W - 162, H - 60)], fill=(*a, 10))
    draw.rectangle([(W - 90, 200), (W - 83, H - 60)], fill=(*a, 8))

def geo_nri(draw, a):
    cx, cy = W + 80, -60
    for i in range(10):
        r = 150 + i * 55
        draw.arc([(cx - r, cy - r), (cx + r, cy + r)], start=130, end=220,
                 fill=(*a, max(8, 50 - i * 5)), width=2)
    for i in range(6):
        y = 200 + i * 60
        draw.line([(W // 2, y), (W - 20, y)], fill=(*a, 12), width=1)

def geo_israel(draw, a):
    for i in range(12):
        y = H // 2 + i * 14 - 30
        draw.line([(W // 2, y), (W - 20, y)], fill=(*a, max(5, 35 - i * 3)), width=1)
    for col in range(6):
        x = W - 300 + col * 52
        h_top = 80 + col * 25
        draw.rectangle([(x, h_top), (x + 22, H - 20)], fill=(*a, 8))
        draw.rectangle([(x, h_top), (x + 22, h_top + 4)], fill=(*a, 30))
    for dx, dy in [(0,0),(14,0),(-14,0),(0,14),(0,-14),(10,10),(-10,10),(10,-10),(-10,-10)]:
        draw.ellipse([(W-65+dx, 100+dy), (W-62+dx, 103+dy)], fill=(*a, 50))


print("\n1. Generating OG images...")

make_og("og-latam-private-banking-recruiter-geneva.jpg",
        "LATIN AMERICA \u00b7 PRIVATE BANKING",
        "LATAM Private", "Banking Recruiter",
        "Senior RM Search \u00b7 Geneva \u00b7 Swiss Private Banks",
        (210, 140, 50), geo_latam)

make_og("og-mea-private-banking-recruiter-geneva.jpg",
        "MIDDLE EAST & AFRICA \u00b7 PRIVATE BANKING",
        "MEA Private", "Banking Recruiter",
        "Senior RM Search \u00b7 GCC \u00b7 Francophone Africa \u00b7 Geneva",
        (180, 148, 60), geo_mea)

make_og("og-nri-private-banking-recruiter-switzerland.jpg",
        "NON-RESIDENT INDIAN \u00b7 PRIVATE BANKING",
        "NRI Private", "Banking Recruiter",
        "Senior RM Search \u00b7 Switzerland \u00b7 Geneva \u00b7 Zurich",
        (100, 160, 210), geo_nri)

make_og("og-israeli-market-private-banking-switzerland.jpg",
        "ISRAELI MARKET \u00b7 PRIVATE BANKING",
        "Israeli Market", "Private Banking",
        "Senior RM Search \u00b7 Switzerland \u00b7 ISA Licence \u00b7 Geneva",
        (100, 180, 200), geo_israel)


# ─── 2. Patch page metadata ────────────────────────────────────────────────────
print("\n2. Patching page metadata...")

def patch(rel, old, new):
    path = os.path.join(BASE, rel)
    if not os.path.exists(path):
        print(f"  SKIP (file not found): {rel}")
        return
    s = open(path, encoding="utf-8").read()
    if old not in s:
        if new.split("og-articles")[1].split(".jpg")[0] + ".jpg" in s:
            print(f"  \u2713 Already patched: {rel}")
        else:
            print(f"  SKIP (string not found): {rel}")
        return
    open(path, "w", encoding="utf-8").write(s.replace(old, new, 1))
    print(f"  \u2713 {rel}")


IMG_BASE = f"`${{SITE}}/og-articles/"

patch(
    "app/en/latam-private-banking-recruiter-geneva/page.tsx",
    '    url: PAGE_URL,\n    type: "website",\n    siteName: "Executive Partners",\n  },',
    '    url: PAGE_URL,\n    type: "website",\n    siteName: "Executive Partners",\n    images: [{ url: `${SITE}/og-articles/og-latam-private-banking-recruiter-geneva.jpg`, width: 1200, height: 630 }],\n  },',
)
patch(
    "app/en/mea-private-banking-recruiter-geneva/page.tsx",
    '    url: PAGE_URL,\n    type: "website",\n    siteName: "Executive Partners",\n  },',
    '    url: PAGE_URL,\n    type: "website",\n    siteName: "Executive Partners",\n    images: [{ url: `${SITE}/og-articles/og-mea-private-banking-recruiter-geneva.jpg`, width: 1200, height: 630 }],\n  },',
)
patch(
    "app/en/nri-private-banking-recruiter-switzerland/page.tsx",
    '    url: PAGE_URL,\n    type: "website",\n    siteName: "Executive Partners",\n  },',
    '    url: PAGE_URL,\n    type: "website",\n    siteName: "Executive Partners",\n    images: [{ url: `${SITE}/og-articles/og-nri-private-banking-recruiter-switzerland.jpg`, width: 1200, height: 630 }],\n  },',
)
patch(
    "app/en/israeli-market-private-banking-switzerland/page.tsx",
    '    url: PAGE_URL,\n    type: "website",\n    siteName: "Executive Partners",\n  },',
    '    url: PAGE_URL,\n    type: "website",\n    siteName: "Executive Partners",\n    images: [{ url: `${SITE}/og-articles/og-israeli-market-private-banking-switzerland.jpg`, width: 1200, height: 630 }],\n  },',
)


print("\n\nDone. Now run:")
print("  npx next build")
print('  git add -A && git commit -m "seo: OG images for LATAM, MEA, NRI, Israeli market pages" && git push\n')
