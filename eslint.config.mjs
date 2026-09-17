import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Downloaded reference material used only for visual comparison.
    ".ref/**",
  ]),
  {
    rules: {
      // Every image on the site is a local SVG from public/art, which
      // next/image cannot optimise further.
      "@next/next/no-img-element": "off",
    },
  },
  {
    // Google Sans is not available through next/font/google, and self-hosting
    // it would mean vendoring ~25 unicode subsets per weight (the timeline
    // needs Devanagari). The stylesheet link lives in the App Router root
    // layout, so it does apply site-wide — this rule targets pages/_document.
    files: ["src/app/layout.tsx"],
    rules: { "@next/next/no-page-custom-font": "off" },
  },
]);

export default eslintConfig;
