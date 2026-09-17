/**
 * Screenshots each top-level <section> of a page by index so the reference and
 * the rebuild can be compared block by block.
 * Usage: node scripts/sections.mjs <url> <label> [width]
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const url = process.argv[2];
const label = process.argv[3] || "shot";
const width = Number(process.argv[4] || 1440);

const dir = ".ref/shots";
mkdirSync(dir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width, height: 900 },
  deviceScaleFactor: 1,
});

await page.goto(url, { waitUntil: "networkidle", timeout: 90000 }).catch(() => {});
await page.waitForTimeout(2500);

const height = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < height; y += 700) {
  await page.evaluate((to) => window.scrollTo(0, to), y);
  await page.waitForTimeout(200);
}
await page.waitForTimeout(1500);

const blocks = await page.$$("main > section, main > footer, body > div > section");
console.log(`${label}: ${blocks.length} blocks @ ${width}px`);

for (let i = 0; i < blocks.length; i++) {
  const meta = await blocks[i].evaluate((el) => ({
    id: el.id,
    h: Math.round(el.getBoundingClientRect().height),
    text: (el.querySelector("h1,h2,h3")?.textContent || "").trim().slice(0, 42),
  }));
  console.log(
    `  ${String(i).padStart(2, "0")} h=${String(meta.h).padStart(5)} #${meta.id || "-"} :: ${meta.text}`
  );
  await blocks[i]
    .screenshot({
      path: `${dir}/${label}-${width}-${String(i).padStart(2, "0")}.png`,
    })
    .catch((e) => console.log("    skip:", e.message.slice(0, 60)));
}

await browser.close();
