#!/usr/bin/env python3
"""
Insert NRI PWP article into articles.ts
Run from repo root: python3 insert_nri_article.py
"""
import os

BASE = os.path.dirname(os.path.abspath(__file__))
path = os.path.join(BASE, "app/en/insights/articles.ts")

with open(path, "r", encoding="utf-8") as f:
    s = f.read()

ANCHOR = "export const INSIGHTS: readonly InsightArticle[] = ["
assert s.count(ANCHOR) == 1, "Anchor not found or not unique"

BODY = """
Switzerland's private banks are not short of ambition when it comes to the NRI market. Non-Resident Indian clients appear on almost every strategic plan in Geneva and Zurich. The segment is listed in pitch decks, referenced in RFPs, and cited during banker interviews as a growth priority. What those plans rarely contain is an honest description of what a genuine NRI Relationship Manager looks like, and why the profile most banks are currently hiring is not the one that builds the franchise they are describing.

This is not a niche observation. Over the last two years, Executive Partners has been approached by multiple Swiss and international private banks looking to hire for NRI client coverage. In almost every case, the briefing described an outcome, not a profile. The bank wanted to grow NRI AUM. What it had not worked out was which specific NRI community it was targeting, from which geography, and with which banking needs. Without that specificity, the hiring process defaults to a shortcut that does not work: finding a senior banker of South Asian origin and assuming the client franchise will follow.

It will not. And understanding why requires a short but important distinction.

NRI is a specific legal category under Indian law. A Non-Resident Indian is an Indian citizen or Person of Indian Origin resident outside India, holding assets that are governed by the Foreign Exchange Management Act and subject to specific rules around repatriation, NRE and NRO account structures, and DTAA treatment across jurisdictions. This is not interchangeable with "South Asian" as a descriptor. A banker of Sri Lankan, Pakistani or Bangladeshi origin may have similar cultural fluency in some contexts, but they do not hold an NRI client franchise in any meaningful sense. The clients, the regulatory frameworks, and the relationship structures are different.

More importantly, NRI is not a monolith. The Indian diaspora in Switzerland and in the booking centres that feed Swiss private banks, primarily the United Kingdom, Dubai, Singapore and increasingly Canada and the United States, is segmented along community, industry, generational and geographic lines that determine almost everything about how wealth is held, how relationships are built, and how a banker actually transfers a book.

The United Kingdom-India corridor is the single most important feeder market for NRI private banking in Geneva. The UK is home to one of the largest and wealthiest Indian diaspora communities in the world. First-generation entrepreneurs from Gujarat and Punjab built significant business wealth in British manufacturing, retail and services across the 1970s and 1980s. Their children and grandchildren represent second and third-generation family wealth that has since diversified into finance, technology, real estate and professional services. The banking relationships for this wealth were established decades ago, primarily through HSBC Private Bank, Standard Chartered Private Bank, Barclays Wealth and Coutts, and they are fiercely sticky. Moving an NRI client from one of those institutions to a Swiss platform requires the banker to have a personal relationship that predates the professional one, not the other way around.

This is the first point that banks consistently underestimate when designing an NRI hiring brief. They assume that a senior banker with strong credentials and good presentation will be able to open NRI relationships. In mature markets with established client-banker dynamics, that is not how it works. The NRI client base the UK corridor produces is relationship-first and institution-second. The banker who built that relationship at HSBC Private Bank over fifteen years does not carry it on a CV. They carry it in a phone and in a family trust that has been doing business with them for a generation.

The South Indian tech wealth segment is structurally different, and more portable. Technology-generated liquidity from founders and senior executives with roots in Tamil Nadu, Karnataka and Andhra Pradesh has accelerated significantly over the last decade, driven by UK and US technology exits, secondary transactions and RSU accumulation. This population is younger, more financially sophisticated, more likely to have worked with multiple banks simultaneously, and more open to moving a relationship based on product quality, platform capability and professional credibility. The challenge here is not relationship access. It is that this client base expects a banker who can speak the language of equity compensation, offshore structures and cross-border estate planning, not just portfolio performance.

The Gujarati business family segment sits somewhere between these two. Family businesses with manufacturing or trading origins typically hold multi-banked relationships across Geneva, Dubai and Singapore simultaneously. Portability is higher than the UK corridor but lower than the tech segment. The client evaluates the banker across a longer window, and the introduction usually comes through a trusted professional network rather than a cold approach.

Most banks hiring for NRI coverage in Switzerland have not made these distinctions. The brief says NRI. The actual conversation is about South Asian outreach generally. The result is a placement that looks correct on paper and underperforms against AUM targets within eighteen months, because the banker hired does not have the specific community relationships, the regulatory fluency, or the platform context to build the franchise that was promised.

AUM portability for NRI books in Switzerland requires its own honest assessment before any move is made. FEMA governs repatriation rules for NRI assets, and a banker advising NRI clients across the NRE and NRO account structures needs to be able to work within those frameworks, or work alongside a specialist who can. The multi-banked nature of most NRI relationships means that moving to a new platform does not necessarily mean moving the full AUM relationship. The client may consolidate discretionary management on the new platform while keeping custody relationships elsewhere. Booking patterns are also influenced by the client's domicile, tax treaty position and estate planning structure in ways that require more detailed portability analysis than a standard AUM transfer.

The pipeline of genuinely qualified NRI bankers at the senior level is smaller than the demand for them would suggest. The strongest profiles in Europe are concentrated in London, specifically at the major private banks and at several boutique wealth managers with established South Asian client bases. A smaller number of profiles sit in Dubai, primarily covering Indian business families in the UAE, and in Singapore, where Bank of Singapore and DBS Private Bank have historically run strong NRI desks covering the Southeast Asian corridor. Zurich holds a handful of profiles, largely from the Julius Baer and Credit Suisse legacy networks, with varying depth of NRI-specific franchise.

What a real NRI RM franchise looks like, at the senior level, is a banker with between CHF 150M and CHF 600M in client relationships that are predominantly NRI-originated, a proven track record of client portability across at least one prior institution move, language capability aligned with their specific client community rather than South Asian generalism, fluency in FEMA and DTAA structures, and a network that extends into professional services, specifically chartered accountants and family offices in London or Dubai who act as trusted introducers.

That profile exists. It is not common. And it is not going to respond to a job posting. It requires a direct, calibrated approach by someone who understands the market and can articulate why a specific platform represents a meaningful upgrade in terms of booking flexibility, product depth or relationship economics.

If your bank is building an NRI strategy and you are still in the process of defining the hiring profile rather than executing on it, the first productive step is an honest segmentation of which NRI community and which geographic corridor you are actually targeting. The second is a portability assessment of what the realistic AUM transfer looks like for that segment, before you build a business case around it.

Executive Partners' NRI practice covers NRI private banking recruitment in Geneva and Zurich, and advises on NRI book portability assessments for bankers considering a platform move. If you are an NRI Relationship Manager with an established client franchise and you are evaluating your options, use the EP Portability Score to benchmark your transfer potential before any conversation with a new institution.
"""

WORD_COUNT = len(BODY.split())

NEW_ENTRY = '''  {
    slug: "nri-private-banking-switzerland-desk-hiring",
    title: "The NRI Desk Problem in Swiss Private Banking",
    seoTitle: "NRI Private Banking Switzerland | How to Actually Build the Desk",
    seoDescription: "Every Swiss bank wants an NRI desk. Most are hiring the wrong profile. A recruiter's view of what genuine NRI private banking coverage requires.",
    linkedinUrl: "",
    date: "2026-06-22",
    summary: "Swiss private banks are adding NRI to their strategic plans but hiring the wrong profile. A recruiter's view of what genuine Non-Resident Indian private banking coverage actually requires, why South Asian is not the same as NRI, and where the real pipeline sits.",
    pillar: "P2",
    markets: ["CH", "UK", "UAE", "SG"],
    keywords: ["NRI private banking", "non-resident Indian wealth management", "NRI private banker Switzerland", "NRI private banking Geneva", "NRI private banking recruiter"],
    ogImage: "/og-articles/og-nri-private-banking-recruiter-switzerland.jpg",
    featured: false,
    body: `''' + BODY + '''`,
  },
'''

s = s.replace(ANCHOR, ANCHOR + "\n" + NEW_ENTRY, 1)

with open(path, "w", encoding="utf-8") as f:
    f.write(s)

print(f"Inserted: nri-private-banking-switzerland-desk-hiring")
print(f"Body word count: ~{WORD_COUNT} words")
