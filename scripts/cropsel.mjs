/** Screenshots one element by selector after a full scroll settle.
 *  Usage: node scripts/cropsel.mjs <url> <label> <selector> [width] */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
const [, , url, label, sel, wArg] = process.argv;
const width = Number(wArg || 390);
mkdirSync(".ref/shots", { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
await p.goto(url, { waitUntil: "networkidle", timeout: 90000 }).catch(() => {});
await p.waitForTimeout(2500);
const h = await p.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < h; y += 700) { await p.evaluate((t) => window.scrollTo(0, t), y); await p.waitForTimeout(180); }
await p.waitForTimeout(1500);
const el = await p.$(sel);
if (!el) { console.log("not found", sel); } else {
  await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(800);
  await el.screenshot({ path: `.ref/shots/${label}-${sel.replace(/\W/g, "")}-${width}.png` });
  console.log("ok", label, sel, width);
}
await b.close();
