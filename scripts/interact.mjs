/** Exercises the page's interactions and reports console errors. */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
mkdirSync(".ref/shots", { recursive: true });

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
p.on("console", (m) => m.type() === "error" && errs.push(m.text().slice(0, 160)));
p.on("pageerror", (e) => errs.push("PAGEERROR " + e.message.slice(0, 160)));

await p.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await p.waitForTimeout(1500);

// walk so every ScrollTrigger fires
const h = await p.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < h; y += 600) { await p.evaluate((t) => window.scrollTo(0, t), y); await p.waitForTimeout(120); }
await p.waitForTimeout(800);

// FAQ accordion
await p.locator("#faq button").nth(2).click();
await p.waitForTimeout(600);
const faqOpen = await p.locator("#faq p").count();
await p.locator("#faq").screenshot({ path: ".ref/shots/mb-faq-open.png" });

// track tabs
await p.locator("#tracks button").nth(2).click();
await p.waitForTimeout(700);
const tabTitle = await p.locator("#tracks h3").first().textContent();

// hover a stat card + sponsor card
await p.locator("#prizes .stat-card").first().hover();
await p.waitForTimeout(400);
await p.locator("#sponsors .sponsor-card").first().hover();
await p.waitForTimeout(400);
await p.locator("#sponsors").screenshot({ path: ".ref/shots/mb-sponsors-hover.png" });

// organizer hover reveal
await p.locator("#organizers .organizer-card").first().hover();
await p.waitForTimeout(700);
await p.locator("#organizers").screenshot({ path: ".ref/shots/mb-organizers-hover.png" });

// nav anchor scroll
await p.evaluate(() => window.scrollTo(0, 0));
await p.waitForTimeout(500);
await p.locator("nav a", { hasText: "Timeline" }).first().click();
await p.waitForTimeout(1800);
const atTimeline = await p.evaluate(() => {
  const r = document.querySelector("#timeline").getBoundingClientRect();
  return Math.round(r.top);
});

// mobile menu
const m = await b.newPage({ viewport: { width: 390, height: 844 } });
await m.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await m.waitForTimeout(1200);
await m.locator("nav button").click();
await m.waitForTimeout(500);
const menuLinks = await m.locator("nav a").count();
await m.locator("nav").screenshot({ path: ".ref/shots/mb-menu-390.png" });

console.log("faq answers open:", faqOpen);
console.log("tab 3 title:", (tabTitle || "").trim().slice(0, 60));
console.log("#timeline top after nav click:", atTimeline, "(64 expected)");
console.log("mobile menu links:", menuLinks);
console.log("console errors:", errs.length ? errs : "none");
await b.close();
