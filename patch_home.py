import re

f = '/Users/gilamalalel/Desktop/execpartners-fresh/app/(marketing)/HomeClient.tsx'
content = open(f).read()

# 1. Add Image import if not already there
if 'import Image from "next/image"' not in content:
    content = content.replace(
        'import Link from "next/link"',
        'import Image from "next/image";\nimport Link from "next/link"'
    )

# 2. Add photo field to primary hub city objects
primary_photos = {
    'slug: "geneva"': 'slug: "geneva",    photo: "/markets/geneva.jpg"',
    'slug: "zurich"': 'slug: "zurich",    photo: "/markets/zurich.jpg"',
    'slug: "london"': 'slug: "london",    photo: "/markets/london.jpg"',
    'slug: "dubai"':  'slug: "dubai",     photo: "/markets/dubai.jpg"',
}
for old, new in primary_photos.items():
    content = content.replace(old, new, 1)

# 3. Add photo field to secondary hub city objects
secondary_photos = {
    'slug: "singapore"': 'slug: "singapore", photo: "/markets/singapore.jpg"',
    'slug: "hong-kong"': 'slug: "hong-kong", photo: "/markets/hong-kong.jpg"',
    'slug: "new-york"':  'slug: "new-york",  photo: "/markets/new-york.jpg"',
    'slug: "miami"':     'slug: "miami",     photo: "/markets/miami.jpg"',
    'slug: "paris"':     'slug: "paris",     photo: "/markets/paris.jpg"',
    'slug: "milan"':     'slug: "milan",     photo: "/markets/milan.jpg"',
    'slug: "madrid"':    'slug: "madrid",    photo: "/markets/madrid.jpg"',
    'slug: "lisbon"':    'slug: "lisbon",    photo: "/markets/lisbon.jpg"',
}
for old, new in secondary_photos.items():
    content = content.replace(old, new, 1)

# 4. Replace primary hub card className + add photo background
old_primary_card = 'className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:border-[#D4AF37]/40 hover:bg-white/[0.07]"'
new_primary_card = 'className="group relative overflow-hidden rounded-2xl border border-white/10 transition-all duration-300 hover:border-[#D4AF37]/40"'
content = content.replace(old_primary_card, new_primary_card)

# Add Image + overlay + wrapper after the opening primary card radial gradient div
old_primary_inner = '''                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(300px 200px at 0% 0%, ${c.glow}, transparent)` }}
                />
                <p className="font-mono text-[11px] text-white/20 group-hover:text-[#D4AF37]/40 transition-colors mb-3">{c.idx}</p>'''

new_primary_inner = '''                {c.photo && <Image src={c.photo} alt={c.city} fill sizes="(max-width:640px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/45 to-black/93" />
                <div className="relative z-10 p-6">
                <p className="font-mono text-[11px] text-white/20 group-hover:text-[#D4AF37]/40 transition-colors mb-3">{c.idx}</p>'''

content = content.replace(old_primary_inner, new_primary_inner)

# Close the inner wrapper div before </Link> for primary cards
old_primary_close = '''                  <ArrowRight className="h-3.5 w-3.5 text-[#D4AF37]/60 -translate-x-0.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                </div>
              </Link>
            ))}
          </div>

          {/* Secondary hubs'''

new_primary_close = '''                  <ArrowRight className="h-3.5 w-3.5 text-[#D4AF37]/60 -translate-x-0.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Secondary hubs'''

content = content.replace(old_primary_close, new_primary_close)

# 5. Replace secondary hub card className + add photo background
old_secondary_card = 'className="group relative overflow-hidden rounded-xl border border-white/8 bg-white/[0.03] p-4 transition-all duration-300 hover:border-[#D4AF37]/35 hover:bg-white/[0.06]"'
new_secondary_card = 'className="group relative overflow-hidden rounded-xl border border-white/8 transition-all duration-300 hover:border-[#D4AF37]/35"'
content = content.replace(old_secondary_card, new_secondary_card)

# Add Image + overlay + wrapper after the opening secondary card radial gradient div
old_secondary_inner = '''                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `radial-gradient(200px 150px at 0% 0%, ${c.glow}, transparent)` }}
                />
                <p className="font-mono text-[10px] text-white/15 group-hover:text-[#D4AF37]/35 transition-colors mb-2">{c.idx}</p>'''

new_secondary_inner = '''                {c.photo && <Image src={c.photo} alt={c.city} fill sizes="25vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/45 to-black/93" />
                <div className="relative z-10 p-4">
                <p className="font-mono text-[10px] text-white/15 group-hover:text-[#D4AF37]/35 transition-colors mb-2">{c.idx}</p>'''

content = content.replace(old_secondary_inner, new_secondary_inner)

# Close the inner wrapper div before </Link> for secondary cards
old_secondary_close = '''                  <ArrowRight className="h-3 w-3 -translate-x-0.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ */}'''

new_secondary_close = '''                  <ArrowRight className="h-3 w-3 -translate-x-0.5 group-hover:translate-x-0.5 transition-transform duration-200" />
                </div>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ */}'''

content = content.replace(old_secondary_close, new_secondary_close)

open(f, 'w').write(content)
print('Done — HomeClient.tsx patched with city photos')
