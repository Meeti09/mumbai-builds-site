/**
 * Screenshots a fixed y-range of a page after an optional scroll settle.
 * Usage: node scripts/crop.mjs <url> <label> <y> <height> [width] [--nowalk]
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const [, , url, label, yArg, hArg, wArg] = process.argv;
const y = Number(yArg || 0);
const h = Number(hArg || 900);
const width = Number(wArg || 1440);
const noWalk = process.argv.includes("--nowalk");

mkdirSync(".ref/shots", { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width, height: 900 },
  deviceScaleFactor: 1,
});
await page.goto(url, { waitUntil: "networkidle", timeout: 90000 }).catch(() => {});
await page.waitForTimeout(3000);

if (!noWalk) {
  const total = await page.evaluate(() => document.body.scrollHeight);
  for (let s = 0; s < total; s += 700) {
    await page.evaluate((to) => window.scrollTo(0, to), s);
    await page.waitForTimeout(180);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1200);
}

await page.screenshot({
  path: `.ref/shots/${label}-crop-${y}.png`,
  clip: { x: 0, y, width, height: h },
  fullPage: true,
});
console.log(`${label} crop y=${y} h=${h} w=${width}`);
await browser.close();
