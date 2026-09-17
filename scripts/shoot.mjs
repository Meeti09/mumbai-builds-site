/**
 * Screenshots a URL at three viewports for side-by-side comparison.
 * Usage: node scripts/shoot.mjs <url> <label> [--sections]
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const url = process.argv[2];
const label = process.argv[3] || "shot";
const wantSections = process.argv.includes("--sections");

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "desktop", width: 1440, height: 900 },
];

const dir = ".ref/shots";
mkdirSync(dir, { recursive: true });

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });

  await page.goto(url, { waitUntil: "networkidle", timeout: 90000 }).catch(() => {});
  await page.waitForTimeout(2500);

  // Walk the page so every scroll-triggered reveal has fired.
  const height = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < height; y += vp.height * 0.8) {
    await page.evaluate((to) => window.scrollTo(0, to), y);
    await page.waitForTimeout(220);
  }
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(900);

  await page.screenshot({
    path: `${dir}/${label}-${vp.name}-full.png`,
    fullPage: true,
  });

  if (wantSections && vp.name === "desktop") {
    const ids = await page.evaluate(() =>
      [...document.querySelectorAll("section[id], footer, nav")].map(
        (el) => el.id || el.tagName.toLowerCase()
      )
    );
    for (const id of ids) {
      const sel = id.match(/^(footer|nav)$/) ? id : `#${id}`;
      const el = await page.$(sel);
      if (!el) continue;
      await el
        .screenshot({ path: `${dir}/${label}-sec-${id}.png` })
        .catch(() => {});
    }
    console.log(`  sections: ${ids.join(", ")}`);
  }

  const box = await page.evaluate(() => ({
    h: document.body.scrollHeight,
    w: document.body.scrollWidth,
  }));
  console.log(`${label} ${vp.name}: ${box.w}x${box.h}`);
  await page.close();
}

await browser.close();
