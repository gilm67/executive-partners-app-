// fetch-linkedin-articles.mjs
import fs from "node:fs/promises";
import puppeteer from "puppeteer";

const profileUrl = process.argv[2];
if (!profileUrl) {
  console.error("Please provide your LinkedIn profile URL");
  process.exit(1);
}

const articlesUrl = profileUrl.replace(/\/+$/, "") + "/recent-activity/articles/";

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function scrape() {
  const browser = await puppeteer.launch({ headless: false, slowMo: 40 });
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"
  );

  console.log("Opening:", articlesUrl);
  await page.goto(articlesUrl, { waitUntil: "networkidle2" });

  // scroll to load all articles
  for (let i = 0; i < 12; i++) {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await sleep(1500);
  }

  const links = await page.$$eval("a", (anchors) =>
    anchors
      .map((a) => a.href)
      .filter((href) => href.includes("/pulse/"))
      .filter((v, i, arr) => arr.indexOf(v) === i)
  );

  console.log(`Found ${links.length} article links`);
  const results = [];

  for (const link of links) {
    console.log("Visiting:", link);
    const p = await browser.newPage();
    await p.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"
    );
    try {
      await p.goto(link, { waitUntil: "networkidle2", timeout: 60000 });
      await sleep(1500);

      const data = await p.evaluate(() => {
        const title =
          document.querySelector("h1")?.textContent?.trim() || document.title;
        const date =
          document.querySelector("time")?.textContent?.trim() ||
          Array.from(document.querySelectorAll("span"))
            .find((s) => /\b20\d{2}\b/.test(s.textContent || ""))
            ?.textContent?.trim() ||
          "";
        const paragraphs = Array.from(
          document.querySelectorAll("article p, main p")
        )
          .map((el) => el.textContent.trim())
          .filter(Boolean)
          .join("\n\n");
        const excerpt = paragraphs.split("\n\n")[0] || "";
        return { title, date, excerpt, body: paragraphs };
      });

      results.push({
        title: data.title,
        linkedin: link,
        date: data.date,
        excerpt: data.excerpt,
        body: data.body,
      });
    } catch (err) {
      console.warn("❌ Error reading", link, err.message);
    } finally {
      await p.close();
    }
  }

  await browser.close();
  await fs.writeFile("public/data/articles.json", JSON.stringify(results, null, 2));
  console.log(`💾 Saved ${results.length} articles to public/data/articles.json`);
}

scrape().catch(console.error);