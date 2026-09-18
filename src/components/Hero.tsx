import CodeTerminal from "./CodeTerminal";
import { hero } from "@/content/site";

const CTA_CLASS =
  "min-w-[140px] h-10 sm:h-11 md:h-12 px-4 sm:px-6 md:px-8 rounded-full hover:bg-[#1967d2] text-white font-medium text-sm sm:text-base md:text-lg transition-all shadow-[0_0_20px_rgba(26,115,232,0.25)] hover:shadow-[0_0_28px_rgba(26,115,232,0.35)] flex items-center justify-center";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-10 sm:pt-12 md:pt-14 lg:pt-16 pb-12 sm:pb-16 md:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8 xl:px-12 min-h-screen flex items-center overflow-hidden"
    >
      <div className="relative z-10 max-w-[1440px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center">
        <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 text-center md:text-left px-2 sm:px-4 md:px-0 max-w-2xl mx-auto md:mx-0">
          <h1 className="sr-only">
            {hero.titleTop} — {hero.titleBottom}
          </h1>
          <div
            className="relative flex justify-center md:justify-start"
            data-speed="1.1"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:left-0 md:translate-x-0 h-[80%] w-[90%] rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,0.22),rgba(168,85,247,0.12),transparent)] blur-3xl"
            />
            <img
              src="/art/assets/mumbai_builds_logo.png"
              alt="Mumbai Builds — Build What Matters"
              draggable={false}
              className="relative w-full max-w-[200px] xs:max-w-[220px] sm:max-w-[250px] md:max-w-[270px] lg:max-w-[300px] object-contain mix-blend-screen animate-float-slow select-none"
            />
          </div>
          <p
            className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-[#9aa0a6] max-w-2xl mx-auto md:mx-0 font-light leading-relaxed px-2 sm:px-0"
            data-speed="1.05"
          >
            {hero.blurb}
          </p>

          <div className="pt-2 sm:pt-3 md:pt-4 flex flex-row flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 w-full max-w-lg mx-auto md:mx-0">
            <a
              href={hero.primaryCta.href}
              className={CTA_CLASS}
              style={{ backgroundColor: "#1a73e8" }}
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              className={CTA_CLASS}
              style={{ backgroundColor: "#1a73e8" }}
            >
              {hero.secondaryCta.label}
            </a>
          </div>

          <p className="text-xs sm:text-sm md:text-base text-white/90 px-2 sm:px-0">
            <b>Note:</b> {hero.note.replace(/^Note:\s*/, "")}
          </p>
        </div>

        <div className="flex items-center justify-center md:justify-end mt-6 sm:mt-8 md:mt-0 md:-translate-y-8 lg:-translate-y-12 w-full px-4 sm:px-0">
          <div className="w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[380px] md:max-w-[440px] lg:max-w-[500px] xl:max-w-[560px]">
            <CodeTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}
