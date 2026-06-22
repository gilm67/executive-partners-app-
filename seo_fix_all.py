#!/usr/bin/env python3
"""
execpartners.ch — Full SEO Fix Script
Covers: title length, description length, em dashes, missing canonicals,
        missing robots meta, sitemap gaps, robots.txt, stale constants.
Run from repo root: python3 seo_fix_all.py
"""

import os
import sys

BASE = os.path.dirname(os.path.abspath(__file__))  # repo root

def patch(rel_path, old, new, allow_count=1):
    """Read file, assert old appears exactly allow_count times, replace, write."""
    path = os.path.join(BASE, rel_path)
    with open(path, "r", encoding="utf-8") as f:
        s = f.read()
    count = s.count(old)
    if count == 0:
        print(f"  ⚠️  SKIP (not found): {rel_path}")
        print(f"       looking for: {repr(old[:80])}")
        return
    if count != allow_count:
        print(f"  ⚠️  SKIP (found {count}x, expected {allow_count}x): {rel_path}")
        print(f"       looking for: {repr(old[:80])}")
        return
    new_s = s.replace(old, new, allow_count)
    with open(path, "w", encoding="utf-8") as f:
        f.write(new_s)
    print(f"  ✓  {rel_path}")


def patch_all(rel_path, old, new):
    """Replace ALL occurrences (for titles repeated across OG/Twitter)."""
    path = os.path.join(BASE, rel_path)
    with open(path, "r", encoding="utf-8") as f:
        s = f.read()
    count = s.count(old)
    if count == 0:
        print(f"  ⚠️  SKIP (not found): {rel_path}")
        return
    new_s = s.replace(old, new)
    with open(path, "w", encoding="utf-8") as f:
        f.write(new_s)
    print(f"  ✓  {rel_path}  ({count}x replaced)")


print("\n═══════════════════════════════════════════════════════")
print("  execpartners.ch — Full SEO Fix")
print("═══════════════════════════════════════════════════════\n")


# ─────────────────────────────────────────────────────────────────
# 1. LATAM PAGE — title + description + JSON-LD em dashes
# ─────────────────────────────────────────────────────────────────
print("1. LATAM page")

patch(
    "app/en/latam-private-banking-recruiter-geneva/page.tsx",
    'name: "Executive Partners \u2014 LATAM Private Banking Recruiter Geneva",',
    'name: "Executive Partners | LATAM Private Banking Recruiter Geneva",',
)
patch(
    "app/en/latam-private-banking-recruiter-geneva/page.tsx",
    'serviceType: "Private Banking Executive Search \u2014 LATAM Market",',
    'serviceType: "Private Banking Executive Search | LATAM Market",',
)
patch(
    "app/en/latam-private-banking-recruiter-geneva/page.tsx",
    'title: "LATAM Private Banking Recruiter Geneva | Latin American Banker Jobs Switzerland",',
    'title: "LATAM Private Banking Recruiter Geneva | Senior RM Search",',
)
patch(
    "app/en/latam-private-banking-recruiter-geneva/page.tsx",
    'description: "Executive Partners is Geneva\'s specialist recruiter for the Latin American private banking market. Senior RMs covering Brazil, Mexico, Colombia, Argentina and LATAM cross-border wealth placed at Swiss private banks. Confidential mandates, portability analysis.",',
    'description: "Specialist private banking recruiter for LATAM. Senior RMs covering Brazil, Mexico, Colombia and Argentina placed at Swiss private banks in Geneva.",',
)


# ─────────────────────────────────────────────────────────────────
# 2. MEA PAGE — title + description + JSON-LD em dashes
# ─────────────────────────────────────────────────────────────────
print("\n2. MEA page")

patch(
    "app/en/mea-private-banking-recruiter-geneva/page.tsx",
    'name: "Executive Partners \u2014 MEA Private Banking Recruiter Geneva",',
    'name: "Executive Partners | MEA Private Banking Recruiter Geneva",',
)
patch(
    "app/en/mea-private-banking-recruiter-geneva/page.tsx",
    'serviceType: "Private Banking Executive Search \u2014 MEA Market",',
    'serviceType: "Private Banking Executive Search | MEA Market",',
)
patch(
    "app/en/mea-private-banking-recruiter-geneva/page.tsx",
    'title: "MEA Private Banking Recruiter Geneva | Middle East Africa Banker Jobs Switzerland",',
    'title: "MEA Private Banking Recruiter Geneva | Middle East & Africa",',
)
patch(
    "app/en/mea-private-banking-recruiter-geneva/page.tsx",
    'description: "Executive Partners is Geneva\'s specialist recruiter for MEA private banking. Senior RMs covering GCC, Francophone Africa and Sub-Saharan Africa cross-border wealth placed at Swiss private banks. Confidential mandates, portability analysis.",',
    'description: "Specialist private banking recruiter for MEA. Senior RMs covering GCC, Francophone Africa and Sub-Saharan Africa placed at Swiss private banks in Geneva.",',
)


# ─────────────────────────────────────────────────────────────────
# 3. NRI PAGE — title + description + JSON-LD em dashes
# ─────────────────────────────────────────────────────────────────
print("\n3. NRI page")

patch(
    "app/en/nri-private-banking-recruiter-switzerland/page.tsx",
    'name: "Executive Partners \u2014 NRI Private Banking Recruiter Switzerland",',
    'name: "Executive Partners | NRI Private Banking Recruiter Switzerland",',
)
patch(
    "app/en/nri-private-banking-recruiter-switzerland/page.tsx",
    'serviceType: "Private Banking Executive Search \u2014 NRI and South Asian Market",',
    'serviceType: "Private Banking Executive Search | NRI and South Asian Market",',
)
patch(
    "app/en/nri-private-banking-recruiter-switzerland/page.tsx",
    'title: "NRI Private Banking Recruiter Switzerland | Non-Resident Indian Banker Jobs Geneva Zurich",',
    'title: "NRI Private Banking Recruiter Switzerland | Senior RM Search",',
)
patch(
    "app/en/nri-private-banking-recruiter-switzerland/page.tsx",
    'description: "Executive Partners is Switzerland\'s specialist recruiter for NRI and South Asian private banking. Senior RMs covering Non-Resident Indian and South Asian entrepreneur wealth placed at Swiss private banks in Geneva and Zurich. Confidential mandates.",',
    'description: "NRI and South Asian private banking recruiter in Switzerland. Senior RMs covering Non-Resident Indian wealth placed at Swiss private banks in Geneva or Zurich.",',
)


# ─────────────────────────────────────────────────────────────────
# 4. ISRAELI MARKET PAGE — title + description + JSON-LD em dashes
# ─────────────────────────────────────────────────────────────────
print("\n4. Israeli market page")

patch(
    "app/en/israeli-market-private-banking-switzerland/page.tsx",
    'name: "Executive Partners \u2014 Israeli Market Private Banking Switzerland",',
    'name: "Executive Partners | Israeli Market Private Banking Switzerland",',
)
patch(
    "app/en/israeli-market-private-banking-switzerland/page.tsx",
    'serviceType: "Private Banking Executive Search \u2014 Israeli Market",',
    'serviceType: "Private Banking Executive Search | Israeli Market",',
)
patch(
    "app/en/israeli-market-private-banking-switzerland/page.tsx",
    'title: "Israeli Market Private Banking Switzerland | Senior RM and Desk Head Search Geneva Zurich",',
    'title: "Israeli Market Private Banking Switzerland | Senior RM Search",',
)
patch(
    "app/en/israeli-market-private-banking-switzerland/page.tsx",
    'description: "Executive Partners recruits Israeli market private bankers in Switzerland. Senior RMs and Israeli desk heads covering Israeli UHNW and tech-entrepreneur wealth, based in Geneva or Zurich. ISA licence guidance. Confidential mandates.",',
    'description: "Israeli market private banking recruiter, Switzerland. Senior RMs and desk heads with Israeli UHNW books in Geneva and Zurich. ISA licence. Confidential mandates.",',
)


# ─────────────────────────────────────────────────────────────────
# 5. PRIVATE BANKING RECRUITMENT COMPANY PAGE — title + desc + robots
# ─────────────────────────────────────────────────────────────────
print("\n5. Recruitment company page")

patch_all(
    "app/en/private-banking-recruitment-company/page.tsx",
    'title: "Private Banking Recruitment Company | Executive Partners Switzerland"',
    'title: "Private Banking Recruitment Company | Geneva Switzerland"',
)
patch(
    "app/en/private-banking-recruitment-company/page.tsx",
    'description: "Executive Partners is a private banking recruitment company based in Geneva, Switzerland. Senior-only executive search for Relationship Managers, Team Heads and Investment Advisors across 14 global hubs. 200+ placements. 98% retention.",',
    'description: "Geneva private banking recruitment company. Senior-only search for Relationship Managers, Team Heads and Investment Advisors across 14 global hubs. 200+ placements.",',
)
# Add robots meta — insert after alternates line
patch(
    "app/en/private-banking-recruitment-company/page.tsx",
    '  alternates: { canonical: "https://www.execpartners.ch/en/private-banking-recruitment-company" },',
    '  alternates: { canonical: "https://www.execpartners.ch/en/private-banking-recruitment-company" },\n  robots: { index: true, follow: true },',
)


# ─────────────────────────────────────────────────────────────────
# 6. ABOUT PAGE — title (with absolute) + description
# ─────────────────────────────────────────────────────────────────
print("\n6. About page")

patch(
    "app/en/about/page.tsx",
    '  title: "About",',
    '  title: { absolute: "About Executive Partners | Geneva Private Banking Recruiter" },',
)
patch(
    "app/en/about/page.tsx",
    '  description: "Executive Partners is a Geneva-based boutique executive search firm dedicated exclusively to Private Banking and Wealth Management. 200+ placements, 98% retention.",',
    '  description: "Geneva-based boutique executive search for Private Banking and Wealth Management. 200+ placements. 98% retention rate.",',
)


# ─────────────────────────────────────────────────────────────────
# 7. PRIVATE BANKER JOBS INDEX — title
# ─────────────────────────────────────────────────────────────────
print("\n7. Private banker jobs index")

patch(
    "app/en/private-banker-jobs/page.tsx",
    '  title: "Private Banker Jobs by Market",',
    '  title: "Private Banker Jobs | 14 Global Wealth Hubs",',
)


# ─────────────────────────────────────────────────────────────────
# 8. JOBS PAGE — title + description
# ─────────────────────────────────────────────────────────────────
print("\n8. Jobs page")

patch(
    "app/en/jobs/page.tsx",
    '  title: "Private Banking Jobs Switzerland 2026 | Senior RM & Team Head Roles Geneva, Zurich, Dubai, Riyadh",',
    '  title: "Private Banking Jobs Switzerland 2026 | Senior RM Roles",',
)
patch(
    "app/en/jobs/page.tsx",
    '    "Browse confidential private banking jobs in Switzerland, Dubai, Riyadh and Singapore. Senior Relationship Manager, Team Head and Investment Advisor roles. Compensation visible. Apply in 90 seconds.",',
    '    "Confidential private banking jobs in Switzerland, Dubai and Singapore. Senior RM and Team Head roles. Compensation shown. Apply in 90 seconds.",',
)


# ─────────────────────────────────────────────────────────────────
# 9. HEADHUNTER GENEVA — title + description + JSON-LD em dashes
# ─────────────────────────────────────────────────────────────────
print("\n9. Headhunter Geneva page")

patch(
    "app/en/private-banking-headhunter-geneva/page.tsx",
    'name: "Executive Partners \u2014 Private Banking Headhunter Geneva",',
    'name: "Executive Partners | Private Banking Headhunter Geneva",',
)
patch(
    "app/en/private-banking-headhunter-geneva/page.tsx",
    'serviceType: "Private Banking Executive Search \u2014 Direct Headhunt",',
    'serviceType: "Private Banking Executive Search | Direct Headhunt",',
)
patch(
    "app/en/private-banking-headhunter-geneva/page.tsx",
    '  title: "Private Banking Headhunter Geneva | Proactive Direct Search for Senior RMs Not Actively in the Market",',
    '  title: "Private Banking Headhunter Geneva | Senior RM Direct Search",',
)
patch(
    "app/en/private-banking-headhunter-geneva/page.tsx",
    '  description: "Executive Partners is a Geneva-based private banking headhunter that reaches senior bankers who are not actively in the market. Confidential direct approach for Senior RMs, Desk Heads and Team Leaders at Swiss and international banks. 200+ placements, 98% retention.",',
    '  description: "Geneva private banking headhunter. Direct search for Senior RMs and Desk Heads at Swiss and international banks not actively on the market.",',
)


# ─────────────────────────────────────────────────────────────────
# 10. MARKETS PAGE — title (3 occurrences) + description
# ─────────────────────────────────────────────────────────────────
print("\n10. Markets page")

patch_all(
    "app/en/markets/page.tsx",
    "Private Banking Markets \u2014 Geneva, Zurich, Dubai & Global Hubs",
    "Private Banking Markets | Geneva, Zurich, Dubai & Beyond",
)
patch(
    "app/en/markets/page.tsx",
    '  description: "Private banking recruitment across 13 global wealth hubs. Compensation benchmarks, licensing requirements, client segments and live mandates in Geneva, Zurich, Dubai, Singapore, London, Riyadh and more.",',
    '  description: "Private banking recruitment across 14 global wealth hubs. Compensation benchmarks, licensing and mandates in Geneva, Zurich, Dubai, Singapore, London and Riyadh.",',
)


# ─────────────────────────────────────────────────────────────────
# 11. RECRUITER GENEVA — title + description
# ─────────────────────────────────────────────────────────────────
print("\n11. Recruiter Geneva page")

patch(
    "app/en/private-banking-recruiter-geneva/page.tsx",
    'absolute: "Private Banking Recruitment Company | Geneva & Switzerland \u2013 Executive Partners",',
    'absolute: "Private Banking Recruiter Geneva | Senior RM Placement",',
)
patch(
    "app/en/private-banking-recruiter-geneva/page.tsx",
    '    "Executive Partners is a private banking recruitment company based in Geneva, covering Switzerland and 14 global hubs. Senior-only search for Relationship Managers, Team Heads and Investment Advisors. Senior Relationship Managers, Team Heads and UHNW bankers placed across Geneva, Zurich and global wealth hubs. Confidential. Senior-level only.",',
    '    "Geneva private banking recruiter. Senior-only search for Relationship Managers, Team Heads and UHNW bankers across Switzerland and 14 global wealth hubs.",',
)


# ─────────────────────────────────────────────────────────────────
# 12. EXECUTIVE SEARCH GENEVA — title + description + OG/TW + prose
# ─────────────────────────────────────────────────────────────────
print("\n12. Executive search Geneva page")

# Main title (has en dash –)
patch(
    "app/en/executive-search-geneva/page.tsx",
    'absolute: "Executive Search Geneva | Private Banking Specialist \u2013 Executive Partners"',
    'absolute: "Executive Search Geneva | Private Banking Specialist"',
)
# OG and Twitter titles (have em dash —) — both identical, patch_all
patch_all(
    "app/en/executive-search-geneva/page.tsx",
    '"Executive Search Geneva | Private Banking Recruiter \u2014 Executive Partners"',
    '"Executive Search Geneva | Private Banking Recruiter"',
)
# Description
patch(
    "app/en/executive-search-geneva/page.tsx",
    '    "Geneva-based executive search specialist exclusively in private banking. Senior RMs, Investment Advisors and Desk Heads placed across Swiss and international platforms. Every search conducted personally by Gil M. Chalem.",',
    '    "Geneva executive search specialist for private banking. Senior RMs, Investment Advisors and Desk Heads placed across Swiss and international platforms.",',
)
# Prose em dash
patch(
    "app/en/executive-search-geneva/page.tsx",
    '              legal constraints \u2014 before they reach your desk.',
    '              legal constraints, before they reach your desk.',
)


# ─────────────────────────────────────────────────────────────────
# 13. RECRUITER TEL AVIV — title + description + prose em dashes
# ─────────────────────────────────────────────────────────────────
print("\n13. Recruiter Tel Aviv page")

patch_all(
    "app/en/private-banking-recruiter-tel-aviv/page.tsx",
    'title: "Private Banking Recruiter Tel Aviv | Israel Wealth Management Search"',
    'title: "Private Banking Recruiter Tel Aviv | Israeli Market Search"',
)
patch(
    "app/en/private-banking-recruiter-tel-aviv/page.tsx",
    '    "Executive Partners is the specialist private banking recruiter for the Israeli market. Senior RM, Team Head and Desk Head mandates covering UHNW/HNW Israeli clients from Geneva, Zurich and Tel Aviv.",',
    '    "Specialist private banking recruiter for the Israeli market. Senior RM and Desk Head mandates covering Israeli UHNW clients from Geneva, Zurich and Tel Aviv.",',
)
# Prose em dashes in ul list
patch(
    "app/en/private-banking-recruiter-tel-aviv/page.tsx",
    '        <li>Senior Relationship Manager \u2014 Israeli Market (Geneva or Zurich based)</li>',
    '        <li>Senior Relationship Manager | Israeli Market (Geneva or Zurich based)</li>',
)
patch(
    "app/en/private-banking-recruiter-tel-aviv/page.tsx",
    '        <li>Israeli Desk Head \u2014 Cross-Border Coverage</li>',
    '        <li>Israeli Desk Head | Cross-Border Coverage</li>',
)


# ─────────────────────────────────────────────────────────────────
# 14. PRIVATE BANKER JOBS TEL AVIV — title + description + OG em dash
# ─────────────────────────────────────────────────────────────────
print("\n14. Private banker jobs Tel Aviv page")

patch(
    "app/en/private-banker-jobs-tel-aviv/page.tsx",
    '  title: "Private Banker Jobs Tel Aviv | Israeli Market Roles | Executive Partners",',
    '  title: "Private Banker Jobs Tel Aviv | Israeli Market Roles",',
)
patch(
    "app/en/private-banker-jobs-tel-aviv/page.tsx",
    '    "Senior private banker and Relationship Manager jobs in Tel Aviv and the Israeli market. Cross-border and onshore roles with Swiss private banks, EAMs and family offices.",',
    '    "Senior private banker and RM roles in Tel Aviv and the Israeli market. Cross-border and onshore positions with Swiss private banks, EAMs and family offices.",',
)
# OG description em dash
patch(
    "app/en/private-banker-jobs-tel-aviv/page.tsx",
    '      "Senior RM and private banker jobs for the Israeli market \u2014 Geneva, Zurich and Tel Aviv based. Hebrew-language and cross-border coverage mandates.",',
    '      "Senior RM and private banker jobs for the Israeli market. Geneva, Zurich and Tel Aviv based. Hebrew-language and cross-border coverage mandates.",',
)


# ─────────────────────────────────────────────────────────────────
# 15. RECRUITMENT AGENCY — title + description
# ─────────────────────────────────────────────────────────────────
print("\n15. Recruitment agency page")

patch(
    "app/en/private-banking-recruitment-agency/page.tsx",
    'absolute: "Retained Private Banking Recruitment Agency Switzerland | Executive Partners"',
    'absolute: "Retained Private Banking Recruitment Agency Switzerland"',
)
patch_all(
    "app/en/private-banking-recruitment-agency/page.tsx",
    'title: "Retained Private Banking Recruitment Agency Switzerland | Executive Partners"',
    'title: "Retained Private Banking Recruitment Agency Switzerland"',
)
patch(
    "app/en/private-banking-recruitment-agency/page.tsx",
    '    "Executive Partners is a Geneva-based retained private banking recruitment agency working exclusively with banks and EAMs on confidential senior mandates. No contingency. No panels. One calibrated shortlist per search.",',
    '    "Retained private banking recruitment agency, Geneva. Exclusive mandates with banks and EAMs. No contingency. No panels. One calibrated shortlist per search.",',
)


# ─────────────────────────────────────────────────────────────────
# 16. EAM RECRUITER — title + description + JSON-LD + prose em dashes
# ─────────────────────────────────────────────────────────────────
print("\n16. EAM recruiter page")

patch(
    "app/en/eam-recruiter-switzerland/page.tsx",
    '  title: "EAM Recruiter Switzerland | External Asset Manager Headhunter",',
    '  title: "EAM Recruiter Switzerland | External Asset Manager Search",',
)
patch(
    "app/en/eam-recruiter-switzerland/page.tsx",
    '    "Executive Partners specialises in recruiting for External Asset Managers and independent wealth managers in Switzerland. Senior bankers transitioning to EAM, and EAM platforms building front-office teams in Geneva and Zurich.",',
    '    "Specialist EAM recruiter in Switzerland. Senior bankers moving to EAM and platforms building front-office teams in Geneva and Zurich.",',
)
patch(
    "app/en/eam-recruiter-switzerland/page.tsx",
    '  name: "EAM Recruitment Switzerland \u2014 External Asset Manager Headhunter",',
    '  name: "EAM Recruitment Switzerland | External Asset Manager Headhunter",',
)
patch(
    "app/en/eam-recruiter-switzerland/page.tsx",
    '  serviceType: "Executive Search \u2014 External Asset Manager",',
    '  serviceType: "Executive Search | External Asset Manager",',
)
# Prose em dashes
patch(
    "app/en/eam-recruiter-switzerland/page.tsx",
    '            readiness across five dimensions \u2014 AUM portability, regulatory licensing, custodian\n            access, product scope and operational infrastructure \u2014 and provide a structured',
    '            readiness across five dimensions: AUM portability, regulatory licensing, custodian\n            access, product scope and operational infrastructure, and provide a structured',
)
patch(
    "app/en/eam-recruiter-switzerland/page.tsx",
    '            genuinely EAM-ready \u2014 with a portable book, a track record of independent client',
    '            genuinely EAM-ready, with a portable book, a track record of independent client',
)


# ─────────────────────────────────────────────────────────────────
# 17. RECRUITER SWITZERLAND — title
# ─────────────────────────────────────────────────────────────────
print("\n17. Recruiter Switzerland page")

patch(
    "app/en/private-banking-recruiter-switzerland/page.tsx",
    '  title: "Private Banking Recruiter Switzerland | Senior RMs, Geneva & Zurich",',
    '  title: "Private Banking Recruiter Switzerland | Geneva & Zurich",',
)


# ─────────────────────────────────────────────────────────────────
# 18. BP SIMULATOR — title + description
# ─────────────────────────────────────────────────────────────────
print("\n18. BP simulator page")

patch(
    "app/en/bp-simulator/page.tsx",
    '  title: { absolute: "Private Banking Business Plan Simulator | Build Your 3-Year Case \u2013 Executive Partners" },',
    '  title: { absolute: "Private Banking Business Plan Simulator | Executive Partners" },',
)
patch(
    "app/en/bp-simulator/page.tsx",
    '  description: "Free private banking business plan simulator. Model your 3-year AUM ramp, NNM, ROA and P&L the way a hiring committee evaluates it \u2014 built on 200+ EP placements.",',
    '  description: "Free private banking business plan simulator. Model your 3-year AUM, NNM, ROA and P&L the way a hiring committee evaluates it. Built on 200+ EP placements.",',
)
# Content em dash
patch(
    "app/en/bp-simulator/page.tsx",
    '          actually reviews them. Uses a cumulative AUM revenue model \u2014 not NNM \u00d7 ROA \u2014 with',
    '          actually reviews them. Uses a cumulative AUM revenue model (not NNM x ROA) with',
)


# ─────────────────────────────────────────────────────────────────
# 19. CANDIDATES PAGE — title + description
# ─────────────────────────────────────────────────────────────────
print("\n19. Candidates page")

patch(
    "app/en/candidates/page.tsx",
    '  title: "Private Banking Jobs Switzerland | Career Guidance for Private Bankers",',
    '  title: "Private Banking Jobs Switzerland | Senior RM Career Guidance",',
)
patch(
    "app/en/candidates/page.tsx",
    '    "Explore private banking jobs in Geneva, Zurich, Dubai and Singapore. Confidential career guidance, portability review and placement support for senior relationship managers.",',
    '    "Private banking jobs in Geneva, Zurich, Dubai and Singapore. Confidential career guidance and portability review for senior relationship managers.",',
)


# ─────────────────────────────────────────────────────────────────
# 20. MARKETS [SLUG] — title templates (em dashes)
# ─────────────────────────────────────────────────────────────────
print("\n20. Markets [slug] template")

patch(
    "app/en/markets/[slug]/page.tsx",
    '    title: `${m.city} \u2014 Private Banking Recruiter & Jobs`,',
    '    title: `${m.city} | Private Banking Recruiter & Jobs`,',
)
patch(
    "app/en/markets/[slug]/page.tsx",
    '      title: `${m.city} \u2014 Private Banking Recruiter & Jobs | Executive Partners`,',
    '      title: `${m.city} | Private Banking Recruiter & Jobs`,',
)


# ─────────────────────────────────────────────────────────────────
# 21. PORTABILITY PAGE — title + OG/TW titles + h1 + prose
# ─────────────────────────────────────────────────────────────────
print("\n21. Portability page")

patch(
    "app/en/portability/page.tsx",
    '  title: { absolute: "AUM Portability Calculator for Private Bankers | Portability Score\u2122 \u2014 Executive Partners" },',
    '  title: { absolute: "AUM Portability Calculator | Private Banking Portability Score\u2122" },',
)
patch(
    "app/en/portability/page.tsx",
    '    title: "Free AUM Portability Calculator \u2014 Portability Score\u2122 ",',
    '    title: "Free AUM Portability Calculator | Portability Score\u2122",',
)
patch(
    "app/en/portability/page.tsx",
    '    title: "Portability Score\u2122 \u2014 Assess Your AUM Transferability ",',
    '    title: "Portability Score\u2122 | Assess Your AUM Transferability",',
)
# H1
patch(
    "app/en/portability/page.tsx",
    '          Free AUM Portability Calculator \u2014 Portability Score\u2122',
    '          Free AUM Portability Calculator | Portability Score\u2122',
)
# Prose em dashes
patch(
    "app/en/portability/page.tsx",
    '          Portability \u2014 a private banker\'s ability to transfer client assets when\n          changing employer \u2014 is the single most important variable in any senior\n          career move in wealth management.',
    '          Portability, defined as a private banker\'s ability to transfer client assets when\n          changing employer, is the single most important variable in any senior\n          career move in wealth management.',
)


# ─────────────────────────────────────────────────────────────────
# 22. MARKETS TEL AVIV — robots + description + content em dashes
# ─────────────────────────────────────────────────────────────────
print("\n22. Markets Tel Aviv page")

# Add robots meta before closing brace of metadata
patch(
    "app/en/markets/tel-aviv/page.tsx",
    "    type: 'website',\n  },\n}",
    "    type: 'website',\n  },\n  robots: { index: true, follow: true },\n}",
)
# Description trim
patch(
    "app/en/markets/tel-aviv/page.tsx",
    "    'Israel specialist private banking headhunter. Executive Partners places Senior RMs, Team Heads and Israeli-market bankers. ISA licence context, compensation benchmarks and live mandates.',",
    "    'Israel specialist private banking headhunter. Senior RMs and Team Heads placed in Geneva and Zurich. ISA licence context, benchmarks and live mandates.',",
)
# H1 em dash
patch(
    "app/en/markets/tel-aviv/page.tsx",
    "        <h1>Private Banking Jobs &amp; Recruiter Tel Aviv \u2014 Senior RMs &amp; Team Heads</h1>",
    "        <h1>Private Banking Jobs &amp; Recruiter Tel Aviv | Senior RMs &amp; Team Heads</h1>",
)
# Prose em dashes
patch(
    "app/en/markets/tel-aviv/page.tsx",
    "          among the highest per capita in the world \u2014 41 USD billionaires as of 2025 \u2014 driven by",
    "          among the highest per capita in the world (41 USD billionaires as of 2025), driven by",
)
patch(
    "app/en/markets/tel-aviv/page.tsx",
    "              <li>Israeli Desk Head \u2014 Cross-Border Coverage</li>",
    "              <li>Israeli Desk Head | Cross-Border Coverage</li>",
)


# ─────────────────────────────────────────────────────────────────
# 23. SITEMAP.TS — add missing pages + remove stale INSIGHTS_POSTS
# ─────────────────────────────────────────────────────────────────
print("\n23. sitemap.ts")

# Add 7 missing en/ pages after the last lisbon entry
patch(
    "app/sitemap.ts",
    '    "/en/private-banker-jobs-lisbon",\n  ];',
    '''    "/en/private-banker-jobs-lisbon",

    "/en/executive-search-geneva",
    "/en/private-banking-recruiter-switzerland",
    "/en/private-banking-recruitment-agency",
    "/en/private-banking-recruitment-zurich",
    "/en/private-banking-recruiter-tel-aviv",
    "/en/private-banker-jobs-tel-aviv",
    "/en/markets/tel-aviv",
  ];''',
)

# Remove stale INSIGHTS_POSTS constant (never used in output)
patch(
    "app/sitemap.ts",
    '''/** Curated Insights */
const INSIGHTS_POSTS: Array<{ slug: string; dateISO?: string; priority?: number }> = [
  { slug: "swiss-private-banking-weekly-update-sep-2025", dateISO: "2025-09-08", priority: 0.75 },
  { slug: "agility-small-bankers-win", dateISO: "2025-09-09", priority: 0.8 },
];

/** Normalize URL''',
    '/** Normalize URL',
)


# ─────────────────────────────────────────────────────────────────
# 24. ROBOTS.TXT — add /private to Disallow
# ─────────────────────────────────────────────────────────────────
print("\n24. public/robots.txt")

patch(
    "public/robots.txt",
    "Disallow: /test\n",
    "Disallow: /test\nDisallow: /private\n",
)


# ─────────────────────────────────────────────────────────────────
# 25. CLEANUP — remove .bak/.save files from repo root
# ─────────────────────────────────────────────────────────────────
print("\n25. Cleanup .bak / .save files")

bak_globs = [
    "app/globals.css.bak.1758224763",
    "app/globals.css.bak.1758550310",
    "app/globals.css.bak.1758900203",
    "app/globals.css.bak.1758900752",
    "app/globals.css.save",
    "app/page.tsx.bak.1758264981",
    "app/page.tsx.save",
    "components/LandingClient.tsx.bak.1758555661",
    "components/LandingClient.tsx.bak.1758555669",
    "components/LandingClient.tsx.bak.1758806130",
    "components/HydratedSplash.tsx.bak.1758806177",
    "components/Splash.tsx.bak.1758900196",
]
for rel in bak_globs:
    full = os.path.join(BASE, rel)
    if os.path.exists(full):
        os.remove(full)
        print(f"  ✓  Deleted {rel}")
    else:
        print(f"  -  Not found (already clean): {rel}")



# ─────────────────────────────────────────────────────────────────
# 26. SUBSCRIBE PAGE — em dashes in description + OG title + prose
# ─────────────────────────────────────────────────────────────────
print("\n26. Subscribe page")

patch(
    "app/en/subscribe/page.tsx",
    '    "Weekly private banking intelligence \u2014 AUM portability, talent flows, compensation benchmarks and market dynamics across Geneva, Zurich, Dubai, Singapore and London. Free. No spam.",',
    '    "Weekly private banking intelligence: AUM portability, talent flows, compensation benchmarks and market dynamics across Geneva, Zurich, Dubai, Singapore and London. Free. No spam.",',
)
patch(
    "app/en/subscribe/page.tsx",
    '    title: "Private Wealth Pulse \u2014 Weekly Private Banking Intelligence",',
    '    title: "Private Wealth Pulse | Weekly Private Banking Intelligence",',
)
patch(
    "app/en/subscribe/page.tsx",
    '          One article per week on what is actually moving in private banking \u2014 AUM portability,',
    '          One article per week on what is actually moving in private banking: AUM portability,',
)

print("\n\n═══════════════════════════════════════════════════════")
print("  All patches applied.")
print("  Next steps:")
print("  1. npx next build")
print("  2. git add -A && git commit -m 'seo: full audit fix — titles, descriptions, em dashes, sitemap, robots' && git push")
print("═══════════════════════════════════════════════════════\n")
