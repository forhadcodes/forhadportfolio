// Captures project screenshots into /public/projects.
//
//   npm install
//   npx playwright install chromium     (first time only)
//   npm run screenshots
//
// Each target produces 3 images, matching the paths in src/data/projects.ts:
//   <slug>-1.png  desktop, top of the page
//   <slug>-2.png  desktop, scrolled down one screen
//   <slug>-3.png  mobile view
//
// Add more pages (e.g. a product details page) by editing `targets` below.
// Set STUDIOSPACE_URL=https://your-live-url when you run it to include StudioSpace.

import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "projects");

const targets = [
  { slug: "bazardor", url: process.env.BAZARDOR_URL ?? "https://bazar-dor-nine-smoky.vercel.app" },
  { slug: "studiospace", url: process.env.STUDIOSPACE_URL ?? "" },
];

const desktop = { width: 1440, height: 900 };
const mobile = { width: 390, height: 844 };

async function settle(page) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(1500); // let animations, tickers and images settle
}

async function capture(browser, { slug, url }) {
  console.log(`\n${slug}: ${url}`);

  const desktopCtx = await browser.newContext({ viewport: desktop, deviceScaleFactor: 1 });
  const page = await desktopCtx.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await settle(page);
  await page.screenshot({ path: path.join(outDir, `${slug}-1.png`) });

  await page.evaluate((y) => window.scrollTo(0, y), desktop.height);
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(outDir, `${slug}-2.png`) });
  await desktopCtx.close();

  const mobileCtx = await browser.newContext({
    viewport: mobile,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await settle(mobilePage);
  await mobilePage.screenshot({ path: path.join(outDir, `${slug}-3.png`) });
  await mobileCtx.close();

  console.log(`  saved ${slug}-1.png, ${slug}-2.png, ${slug}-3.png`);
}

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch();

try {
  for (const target of targets) {
    if (!target.url) {
      console.log(`\n${target.slug}: skipped (no URL set)`);
      continue;
    }
    try {
      await capture(browser, target);
    } catch (err) {
      console.error(`  failed for ${target.slug}:`, err.message);
    }
  }
} finally {
  await browser.close();
}
