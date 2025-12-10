#!/usr/bin/env node
// scripts/generate-linkedin-mdx.mjs

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const url = process.argv[2];

  if (!url) {
    console.error("Usage: node scripts/generate-linkedin-mdx.mjs <linkedin-article-url>");
    process.exit(1);
  }

  console.log(`📥 Fetching: ${url}`);

  const res = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
    },
  });

  if (!res.ok) {
    console.error(`❌ HTTP ${res.status} when fetching LinkedIn`);
    process.exit(1);
  }

  const html = await res.text();

  // --- Title ---
  let title = "Untitled";
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) {
    title = titleMatch[1]
      .replace(/\s*\|\s*LinkedIn.*$/i, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  // --- Description (meta name="description") ---
  let description = "";
  const descMatch = html.match(
    /<meta[^>]+name="description"[^>]+content="([^"]+)"[^>]*>/i
  );
  if (descMatch) {
    description = descMatch[1].replace(/\s+/g, " ").trim();
  }

  // --- Published time (meta property="article:published_time") ---
  let date = new Date().toISOString().slice(0, 10); // fallback = today
  const dateMatch = html.match(
    /<meta[^>]+property="article:published_time"[^>]+content="([^"]+)"[^>]*>/i
  );
  if (dateMatch) {
    // e.g. 2023-10-23T10:00:00.000Z → 2023-10-23
    date = dateMatch[1].slice(0, 10);
  }

  // --- Slug / filename ---
  function slugify(str) {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  const slug = slugify(title);
  const filename = `${slug}-${date}.mdx`;
  const outDir = path.join(__dirname, "..", "content", "insights");
  const outPath = path.join(outDir, filename);

  fs.mkdirSync(outDir, { recursive: true });

  const frontMatter = `---
title: "${title}"
description: "${description.slice(0, 260)}"
date: "${date}"
author: "Executive Partners"
tags: ["Private Banking", "Hiring Pulse"]
ogTitle: "${title}"
ogDescription: "${description.slice(0, 260)}"
linkedin: "${url}"
---

## Overview

This article was originally published on LinkedIn: [Read on LinkedIn](${url}).

You can extend this MDX file with additional on-platform commentary, examples and
market colour for Geneva, Zurich, London, New York, Miami, Dubai, Singapore or Hong Kong.
`;

  fs.writeFileSync(outPath, frontMatter, "utf8");

  console.log(`  ✅ Created ${path.relative(process.cwd(), outPath)}`);
  console.log("\nDone.");
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});