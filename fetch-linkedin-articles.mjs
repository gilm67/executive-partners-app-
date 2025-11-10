// fetch-linkedin-articles.mjs
// node fetch-linkedin-articles.mjs "https://www.linkedin.com/in/YOUR-PROFILE/"

import fs from "node:fs/promises";
import puppeteer from "puppeteer";

const profileUrl = process.argv[2];
if (!profileUrl) {
  console.error("Please provide your LinkedIn profile URL");
  process.exit(1);
}

const articlesUrl =
  profileUrl.replace(/\/+$/, "") + "/recent-activity/articles/";

function sleep(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function scrape() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 40,
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    userDataDir: "./.puppeteer-profile",
    defaultViewport: null,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
  );

  console.log("Opening:", articlesUrl);
  // 👇 use a bigger timeout + lighter waitUntil
  await page.goto(articlesUrl, {
    waitUntil: "domcontentloaded",
    timeout: 120000, // 120s
  });

  console.log("If you see a login or 2FA page, log in now…");
  await sleep(20000);

  // force-load more
  for (let i = 0; i < 10; i++) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await sleep(1200);
  }

  const items = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll("a"));
    const out = [];

    for (const a of anchors) {
      const href = a.getAttribute("href") || "";
      if (!href) continue;
      if (!href.includes("/pulse/") && !href.includes("/posts/")) continue;

      let title = a.textContent.trim();
      if (!title) {
        const span = a.querySelector("span");
        if (span) title = span.textContent.trim();
      }
      if (!title) {
        title = href.split("/").filter(Boolean).pop().replace(/-/g, " ");
      }

      out.push({
        title,
        url: href.startsWith("http")
          ? href
          : `https://www.linkedin.com${href}`,
      });
    }

    const seen = new Set();
    return out.filter((x) => {
      if (seen.has(x.url)) return false;
      seen.add(x.url);
      return true;
    });
  });

  console.log(`✅ Found ${items.length} article links`);

  const results = [];

  for (const item of items) {
    console.log("Visiting article:", item.url);
    const articlePage = await browser.newPage();
    await articlePage.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    );
    try {
      await articlePage.goto(item.url, {
        waitUntil: "domcontentloaded",
        timeout: 120000,
      });
      await sleep(1000);

      const details = await articlePage.evaluate(() => {
        const title =
          document.querySelector("h1")?.textContent?.trim() ||
          document.title.replace(" | LinkedIn", "").trim();

        let dateText = "";
        const spanWithYear = Array.from(document.querySelectorAll("span")).find(
          (el) => /\b20\d{2}\b/.test(el.textContent || "")
        );
        if (spanWithYear) dateText = spanWithYear.textContent.trim();

        let excerpt = "";
        const p =
          document.querySelector("article p") ||
          document.querySelector("div[role='article'] p") ||
          document.querySelector("main p");
        if (p) excerpt = p.textContent.trim();

        return { title, date: dateText, excerpt };
      });

      results.push({
        title: details.title || item.title,
        linkedin: item.url,
        date: details.date || "",
        excerpt: details.excerpt || "",
      });
    } catch (err) {
      console.warn("Could not read article:", item.url, err.message);
      results.push({
        title: item.title,
        linkedin: item.url,
        date: "",
        excerpt: "",
      });
    } finally {
      await articlePage.close();
    }
  }

  await browser.close();

  await fs.writeFile("articles.json", JSON.stringify(results, null, 2), "utf-8");
  console.log("💾 Saved", results.length, "articles to articles.json");
}

scrape().catch((err) => {
  console.error(err);
  process.exit(1);
});