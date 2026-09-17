/**
 * Generates every image asset the site needs as original SVG art.
 * Run with: node scripts/gen-assets.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public", "art");
mkdirSync(out, { recursive: true });

const write = (name, svg) => {
  writeFileSync(join(out, name), svg.trim().replace(/\n\s+/g, " ") + "\n");
  return name;
};

const CYAN = "#22d3ee";
const BLUE = "#3b82f6";
const PURPLE = "#a855f7";

/* ---------------------------------------------------------------- wordmark */

write(
  "logo.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop stop-color="${CYAN}"/><stop offset=".55" stop-color="${BLUE}"/><stop offset="1" stop-color="${PURPLE}"/>
      </linearGradient>
    </defs>
    <rect x="6" y="6" width="52" height="52" rx="16" stroke="url(#g)" stroke-width="2.5" opacity=".55"/>
    <path d="M18 44V24l14 11 14-11v20" stroke="url(#g)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="32" cy="17" r="3" fill="${CYAN}"/>
  </svg>`
);

// The small mark that sits inline inside the hero <h1>.
write(
  "hero-mark.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
    <defs>
      <linearGradient id="hm" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
        <stop stop-color="${CYAN}"/><stop offset=".5" stop-color="${BLUE}"/><stop offset="1" stop-color="${PURPLE}"/>
      </linearGradient>
      <filter id="hg" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="6"/>
      </filter>
    </defs>
    <g filter="url(#hg)" opacity=".5">
      <circle cx="60" cy="60" r="34" fill="url(#hm)"/>
    </g>
    <circle cx="60" cy="60" r="44" stroke="url(#hm)" stroke-width="3" opacity=".5"/>
    <path d="M32 84V38l28 22 28-22v46" stroke="url(#hm)" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`
);

/* "an initiative by [badge]" lockup that sits under the hero headline.
   Sized 640x64 so the hero's max-w-[320px] renders it at ~320x32, matching the
   reference's single-line visual weight. */
write(
  "initiative.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 64" fill="none">
    <defs>
      <linearGradient id="ivp" x1="300" y1="14" x2="640" y2="52" gradientUnits="userSpaceOnUse">
        <stop stop-color="${CYAN}"/><stop offset=".55" stop-color="${BLUE}"/><stop offset="1" stop-color="${PURPLE}"/>
      </linearGradient>
      <linearGradient id="ivm" x1="316" y1="18" x2="352" y2="48" gradientUnits="userSpaceOnUse">
        <stop stop-color="#ffffff"/><stop offset="1" stop-color="#d6f4ff"/>
      </linearGradient>
    </defs>
    <text x="0" y="41" fill="#9aa0a6" font-family="system-ui,sans-serif" font-size="27" font-style="italic">an initiative by</text>
    <rect x="296" y="10" width="344" height="44" rx="22" fill="url(#ivp)"/>
    <path d="M316 44V24l14 11 14-11v20" stroke="url(#ivm)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
    <text x="358" y="41" fill="#ffffff" font-family="system-ui,sans-serif" font-size="24" font-weight="600" letter-spacing=".4">Mumbai Builds</text>
  </svg>`
);

/* --------------------------------------------------------------- landmarks */

// Abstract arch-and-skyline silhouette — original geometry, not a traced monument.
const landmark = (id, accent, towers) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 320" fill="none">
  <defs>
    <linearGradient id="${id}a" x1="220" y1="40" x2="220" y2="300" gradientUnits="userSpaceOnUse">
      <stop stop-color="${accent}" stop-opacity=".95"/><stop offset="1" stop-color="${accent}" stop-opacity=".18"/>
    </linearGradient>
    <linearGradient id="${id}b" x1="0" y1="300" x2="440" y2="300" gradientUnits="userSpaceOnUse">
      <stop stop-color="${accent}" stop-opacity="0"/><stop offset=".5" stop-color="${accent}" stop-opacity=".7"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </linearGradient>
    <filter id="${id}g" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="10"/></filter>
  </defs>
  <g filter="url(#${id}g)" opacity=".35"><ellipse cx="220" cy="230" rx="150" ry="70" fill="${accent}"/></g>
  ${towers}
  <path d="M150 300V150a70 70 0 0 1 140 0v150" stroke="url(#${id}a)" stroke-width="5"/>
  <path d="M182 300V162a38 38 0 0 1 76 0v138" stroke="${accent}" stroke-opacity=".55" stroke-width="3"/>
  <path d="M150 300V150a70 70 0 0 1 140 0v150" fill="${accent}" fill-opacity=".05"/>
  <rect x="138" y="296" width="164" height="8" rx="4" fill="${accent}" fill-opacity=".5"/>
  <rect x="0" y="306" width="440" height="3" fill="url(#${id}b)"/>
</svg>`;

write(
  "landmark-mumbai.svg",
  landmark(
    "lm",
    CYAN,
    `<g stroke="${CYAN}" stroke-opacity=".45" stroke-width="3" fill="none">
      <path d="M62 300V186l30-22v136"/><path d="M92 300V164l26 18v118"/>
      <path d="M322 300V172l28-20v148"/><path d="M350 300V152l30 24v124"/>
    </g>
    <g fill="${CYAN}" fill-opacity=".8">
      <circle cx="77" cy="176" r="2.5"/><circle cx="336" cy="162" r="2.5"/><circle cx="365" cy="142" r="2.5"/>
    </g>`
  )
);

write(
  "landmark-region.svg",
  landmark(
    "lr",
    PURPLE,
    `<g stroke="${PURPLE}" stroke-opacity=".45" stroke-width="3" fill="none">
      <path d="M58 300V204l34-16v112"/><path d="M96 300V196h30v104"/>
      <path d="M316 300V198l32-14v116"/><path d="M352 300V186l28 20v94"/>
    </g>
    <g fill="${PURPLE}" fill-opacity=".8">
      <circle cx="75" cy="196" r="2.5"/><circle cx="330" cy="192" r="2.5"/><circle cx="366" cy="198" r="2.5"/>
    </g>`
  )
);

/* --------------------------------------------------------------- emblems */
/* Squarer, fuller compositions for the insight panels, where the reference
   fills the right-hand column with a ~300x280 emblem. */

const emblem = (id, a, b, label, sub) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 400" fill="none">
  <defs>
    <linearGradient id="${id}s" x1="60" y1="60" x2="380" y2="340" gradientUnits="userSpaceOnUse">
      <stop stop-color="${a}"/><stop offset="1" stop-color="${b}"/>
    </linearGradient>
    <linearGradient id="${id}r" x1="0" y1="316" x2="440" y2="316" gradientUnits="userSpaceOnUse">
      <stop stop-color="${a}" stop-opacity="0"/><stop offset=".5" stop-color="${a}" stop-opacity=".8"/><stop offset="1" stop-color="${a}" stop-opacity="0"/>
    </linearGradient>
    <filter id="${id}g" x="-35%" y="-35%" width="170%" height="170%"><feGaussianBlur stdDeviation="26"/></filter>
  </defs>

  <g filter="url(#${id}g)" opacity=".4">
    <ellipse cx="220" cy="200" rx="130" ry="120" fill="${a}"/>
    <ellipse cx="300" cy="260" rx="90" ry="80" fill="${b}"/>
  </g>

  <circle cx="220" cy="196" r="168" stroke="url(#${id}s)" stroke-width="2" stroke-opacity=".28" fill="none"/>
  <circle cx="220" cy="196" r="140" stroke="url(#${id}s)" stroke-width="2" stroke-opacity=".18" fill="none"/>

  <g stroke="url(#${id}s)" stroke-width="4" fill="none">
    <path d="M96 316V186l30-22v152"/><path d="M126 316V164l26 18v134"/>
    <path d="M288 316V182l28-20v154"/><path d="M316 316V160l30 24v132"/>
  </g>
  <path d="M152 316V150a68 68 0 0 1 136 0v166" stroke="url(#${id}s)" stroke-width="6"/>
  <path d="M152 316V150a68 68 0 0 1 136 0v166" fill="url(#${id}s)" fill-opacity=".07"/>
  <path d="M184 316V166a36 36 0 0 1 72 0v150" stroke="url(#${id}s)" stroke-width="3.5" stroke-opacity=".6"/>
  <g fill="url(#${id}s)">
    <circle cx="220" cy="96" r="7"/><circle cx="111" cy="176" r="4"/><circle cx="331" cy="172" r="4"/>
  </g>
  <rect x="140" y="312" width="160" height="8" rx="4" fill="url(#${id}s)" fill-opacity=".55"/>
  <rect x="0" y="322" width="440" height="3" fill="url(#${id}r)"/>

  <text x="220" y="362" text-anchor="middle" fill="#e5e7eb" font-family="system-ui,sans-serif" font-size="27" font-weight="600" letter-spacing="1">${label}</text>
  <text x="220" y="386" text-anchor="middle" fill="#9aa0a6" font-family="system-ui,sans-serif" font-size="15" letter-spacing="3.2">${sub}</text>
</svg>`;

write("emblem-mumbai.svg", emblem("em", CYAN, BLUE, "MUMBAI BUILDS", "BUILD WHAT MATTERS"));
write("emblem-region.svg", emblem("er", PURPLE, CYAN, "₹50,000", "TOTAL PRIZE POOL"));

/* ------------------------------------------------------------------- train */

write(
  "train.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
    <defs>
      <linearGradient id="tb" x1="30" y1="24" x2="90" y2="104" gradientUnits="userSpaceOnUse">
        <stop stop-color="#e2f6ff"/><stop offset=".45" stop-color="${CYAN}"/><stop offset="1" stop-color="#0e7490"/>
      </linearGradient>
    </defs>
    <rect x="34" y="18" width="52" height="84" rx="22" fill="url(#tb)"/>
    <rect x="34" y="18" width="52" height="84" rx="22" stroke="#e0fbff" stroke-opacity=".7" stroke-width="2"/>
    <path d="M40 40h40v22a20 20 0 0 1-40 0V40Z" fill="#06202b" fill-opacity=".85"/>
    <rect x="44" y="26" width="32" height="9" rx="4.5" fill="#032027" fill-opacity=".6"/>
    <g fill="#fff6c9"><circle cx="47" cy="94" r="5"/><circle cx="73" cy="94" r="5"/></g>
    <rect x="44" y="70" width="32" height="3" rx="1.5" fill="#e0fbff" fill-opacity=".45"/>
    <rect x="44" y="78" width="32" height="3" rx="1.5" fill="#e0fbff" fill-opacity=".3"/>
    <rect x="56" y="8" width="8" height="12" rx="4" fill="${CYAN}"/>
  </svg>`
);

/* ----------------------------------------------------------- track artwork */

const trackArt = (id, a, b, glyph) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 440" fill="none" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="${id}bg" x1="0" y1="0" x2="640" y2="440" gradientUnits="userSpaceOnUse">
      <stop stop-color="#050a12"/><stop offset=".45" stop-color="#0a1626"/><stop offset="1" stop-color="#06101c"/>
    </linearGradient>
    <linearGradient id="${id}s" x1="0" y1="0" x2="640" y2="440" gradientUnits="userSpaceOnUse">
      <stop stop-color="${a}"/><stop offset="1" stop-color="${b}"/>
    </linearGradient>
    <radialGradient id="${id}v" cx="50%" cy="46%" r="72%">
      <stop stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/>
    </radialGradient>
    <filter id="${id}f" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="58"/></filter>
    <pattern id="${id}p" width="32" height="32" patternUnits="userSpaceOnUse">
      <path d="M32 0H0v32" stroke="${a}" stroke-opacity=".16" stroke-width="1" fill="none"/>
    </pattern>
    <pattern id="${id}d" width="16" height="16" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="${b}" fill-opacity=".28"/>
    </pattern>
  </defs>
  <rect width="640" height="440" fill="url(#${id}bg)"/>
  <g filter="url(#${id}f)" opacity=".85">
    <circle cx="150" cy="120" r="170" fill="${a}"/>
    <circle cx="500" cy="330" r="185" fill="${b}"/>
    <circle cx="330" cy="220" r="120" fill="${a}" fill-opacity=".7"/>
  </g>
  <rect width="640" height="440" fill="url(#${id}p)"/>
  <rect width="640" height="440" fill="url(#${id}d)"/>
  <g opacity=".9">${glyph}</g>
  <rect width="640" height="440" fill="url(#${id}v)"/>
  <g stroke="${a}" stroke-opacity=".3" stroke-width="1" fill="none">
    <path d="M0 110h640M0 330h640M170 0v440M470 0v440"/>
  </g>
</svg>`;

write(
  "track-urban.svg",
  trackArt(
    "tu",
    "#38bdf8",
    "#6366f1",
    `<g stroke="url(#tus)" stroke-width="3.5" fill="none" stroke-linecap="round">
      <path d="M90 350h120l60-90h100l60 120h120"/>
      <path d="M150 350V250h70v100"/><path d="M330 260V150h90v110"/><path d="M470 380V270h80v110"/>
    </g>
    <g fill="url(#tus)"><circle cx="270" cy="260" r="9"/><circle cx="370" cy="260" r="9"/><circle cx="430" cy="380" r="9"/></g>
    <g stroke="url(#tus)" stroke-width="2" stroke-opacity=".5" fill="none">
      <circle cx="270" cy="260" r="26"/><circle cx="430" cy="380" r="26"/>
    </g>
    <g stroke="#e8f6ff" stroke-opacity=".7" stroke-width="2.5" fill="none" stroke-linecap="round">
      <path d="M96 128h44M96 148h64M96 168h30"/>
      <rect x="480" y="90" width="76" height="52" rx="10"/><path d="M480 108h76M498 126h28"/>
    </g>`
  )
);

write(
  "track-good.svg",
  trackArt(
    "tg",
    "#34d399",
    "#22d3ee",
    `<g stroke="url(#tgs)" stroke-width="3.5" fill="none" stroke-linecap="round">
      <circle cx="320" cy="215" r="70"/>
      <path d="M320 145v-45M320 330v45M250 215h-45M390 215h45M270 165l-32-32M370 165l32-32M270 265l-32 32M370 265l32 32"/>
    </g>
    <g fill="url(#tgs)">
      <circle cx="320" cy="96" r="10"/><circle cx="320" cy="334" r="10"/><circle cx="201" cy="215" r="10"/><circle cx="439" cy="215" r="10"/>
      <circle cx="234" cy="129" r="7"/><circle cx="406" cy="129" r="7"/><circle cx="234" cy="301" r="7"/><circle cx="406" cy="301" r="7"/>
    </g>
    <path d="M296 215l18 18 30-36" stroke="url(#tgs)" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
  )
);

write(
  "track-sponsor.svg",
  trackArt(
    "ts",
    "#fbbf24",
    "#f472b6",
    `<g stroke="url(#tss)" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <path d="M200 320V190l120-70 120 70v130z"/>
      <path d="M260 320v-70h120v70"/>
    </g>
    <g fill="url(#tss)" fill-opacity=".18"><path d="M200 320V190l120-70 120 70v130z"/></g>
    <g fill="url(#tss)"><circle cx="320" cy="170" r="12"/></g>
    <g stroke="url(#tss)" stroke-width="2" stroke-opacity=".55" fill="none">
      <path d="M120 360h400"/><path d="M150 100l30 30M490 100l-30 30"/>
    </g>`
  )
);

/* ------------------------------------------------------------- run-of-day  */
/* ------------------------------------------------------------------ avatar */

const initialsArt = (label, a, b) => {
  const seed = [...label].reduce((s, c) => s + c.charCodeAt(0), 0);
  const rot = seed % 90;
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none">
  <defs>
    <linearGradient id="av" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
      <stop stop-color="${a}"/><stop offset="1" stop-color="${b}"/>
    </linearGradient>
    <filter id="avf" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="40"/></filter>
  </defs>
  <rect width="400" height="400" fill="#0c1016"/>
  <g filter="url(#avf)" opacity=".55" transform="rotate(${rot} 200 200)">
    <ellipse cx="140" cy="150" rx="120" ry="90" fill="${a}"/>
    <ellipse cx="270" cy="280" rx="130" ry="100" fill="${b}"/>
  </g>
  <g stroke="url(#av)" stroke-opacity=".45" stroke-width="2" fill="none">
    <circle cx="200" cy="200" r="150"/><circle cx="200" cy="200" r="112"/>
  </g>
  <circle cx="200" cy="162" r="44" stroke="url(#av)" stroke-width="6" fill="none"/>
  <path d="M116 300a84 84 0 0 1 168 0" stroke="url(#av)" stroke-width="6" fill="none" stroke-linecap="round"/>
  <rect x="1" y="1" width="398" height="398" rx="20" stroke="${a}" stroke-opacity=".2" fill="none"/>
</svg>`;
};

const AVATAR_PALETTE = [
  ["#22d3ee", "#a855f7"],
  ["#38bdf8", "#6366f1"],
  ["#34d399", "#22d3ee"],
  ["#fbbf24", "#f472b6"],
  ["#f472b6", "#a855f7"],
  ["#60a5fa", "#34d399"],
];

for (let i = 0; i < 12; i++) {
  const [a, b] = AVATAR_PALETTE[i % AVATAR_PALETTE.length];
  write(`avatar-${String(i + 1).padStart(2, "0")}.svg`, initialsArt(`avatar-${i}`, a, b));
}

/* ----------------------------------------------------------- gallery tiles */

const gallery = (i, a, b) => {
  const bars = Array.from({ length: 9 }, (_, k) => {
    const h = 40 + ((i * 37 + k * 53) % 190);
    return `<rect x="${58 + k * 62}" y="${380 - h}" width="34" height="${h}" rx="8" fill="url(#gg${i})" fill-opacity="${0.25 + ((k + i) % 4) * 0.18}"/>`;
  }).join("");
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 660 440" fill="none">
  <defs>
    <linearGradient id="gg${i}" x1="0" y1="0" x2="660" y2="440" gradientUnits="userSpaceOnUse">
      <stop stop-color="${a}"/><stop offset="1" stop-color="${b}"/>
    </linearGradient>
    <filter id="gf${i}" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="52"/></filter>
  </defs>
  <rect width="660" height="440" fill="#0b0d11"/>
  <g filter="url(#gf${i})" opacity=".5">
    <circle cx="${140 + (i % 3) * 180}" cy="150" r="140" fill="${a}"/>
    <circle cx="${470 - (i % 4) * 90}" cy="320" r="150" fill="${b}"/>
  </g>
  ${bars}
  <rect x="58" y="378" width="${62 * 8 + 34}" height="3" rx="1.5" fill="url(#gg${i})" fill-opacity=".7"/>
  <g stroke="url(#gg${i})" stroke-opacity=".3" stroke-width="2" fill="none">
    <circle cx="576" cy="94" r="34"/><path d="M552 94h48M576 70v48"/>
  </g>
</svg>`;
};

const GALLERY_PALETTE = [
  ["#22d3ee", "#3b82f6"],
  ["#a855f7", "#22d3ee"],
  ["#34d399", "#3b82f6"],
  ["#fbbf24", "#f472b6"],
  ["#60a5fa", "#a855f7"],
  ["#f472b6", "#22d3ee"],
];

for (let i = 0; i < 12; i++) {
  const [a, b] = GALLERY_PALETTE[i % GALLERY_PALETTE.length];
  write(`gallery-${String(i + 1).padStart(2, "0")}.svg`, gallery(i, a, b));
}

/* ------------------------------------------------------------ partner slot */

write(
  "partner-slot.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 140" fill="none">
    <defs>
      <linearGradient id="ps" x1="0" y1="0" x2="320" y2="140" gradientUnits="userSpaceOnUse">
        <stop stop-color="${CYAN}" stop-opacity=".8"/><stop offset="1" stop-color="${PURPLE}" stop-opacity=".8"/>
      </linearGradient>
    </defs>
    <rect x="4" y="4" width="312" height="132" rx="18" stroke="url(#ps)" stroke-width="2" stroke-dasharray="10 8" fill="none" opacity=".6"/>
    <circle cx="70" cy="70" r="26" stroke="url(#ps)" stroke-width="3" fill="none"/>
    <path d="M70 56v28M56 70h28" stroke="url(#ps)" stroke-width="3" stroke-linecap="round"/>
    <text x="114" y="64" fill="#e5e7eb" font-family="system-ui,sans-serif" font-size="19" font-weight="600">Partner slot</text>
    <text x="114" y="90" fill="#9aa0a6" font-family="system-ui,sans-serif" font-size="15">open for 2027</text>
  </svg>`
);

/* --------------------------------------------------------------- community */

write(
  "community.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 700" fill="none">
    <defs>
      <linearGradient id="cb" x1="0" y1="0" x2="1400" y2="700" gradientUnits="userSpaceOnUse">
        <stop stop-color="#070a0f"/><stop offset=".5" stop-color="#0d1420"/><stop offset="1" stop-color="#080b11"/>
      </linearGradient>
      <linearGradient id="cs" x1="0" y1="0" x2="1400" y2="700" gradientUnits="userSpaceOnUse">
        <stop stop-color="${CYAN}"/><stop offset=".5" stop-color="${BLUE}"/><stop offset="1" stop-color="${PURPLE}"/>
      </linearGradient>
      <filter id="cf" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="120"/></filter>
    </defs>
    <rect width="1400" height="700" fill="url(#cb)"/>
    <g filter="url(#cf)" opacity=".5">
      <circle cx="320" cy="200" r="240" fill="${BLUE}"/>
      <circle cx="1080" cy="480" r="260" fill="${PURPLE}"/>
      <circle cx="700" cy="620" r="200" fill="${CYAN}"/>
    </g>
    <g stroke="url(#cs)" stroke-opacity=".28" stroke-width="1.5" fill="none">
      <path d="M180 520l180-140 200 90 190-170 210 120 200-90"/>
      <path d="M180 380l180 120 200-70 190 130 210-150 200 70"/>
    </g>
    <g fill="url(#cs)" fill-opacity=".85">
      <circle cx="360" cy="380" r="7"/><circle cx="560" cy="470" r="7"/><circle cx="750" cy="300" r="7"/>
      <circle cx="960" cy="420" r="7"/><circle cx="1160" cy="330" r="7"/><circle cx="180" cy="450" r="7"/>
    </g>
  </svg>`
);

console.log(`Generated assets in ${out}`);
