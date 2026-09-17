import CodeTerminal from "./CodeTerminal";
import { hero } from "@/content/site";

const CTA_CLASS =
  "min-w-[140px] h-10 sm:h-11 md:h-12 px-4 sm:px-6 md:px-8 rounded-full hover:bg-[#1967d2] text-white font-medium text-sm sm:text-base md:text-lg transition-all shadow-[0_0_20px_rgba(26,115,232,0.25)] hover:shadow-[0_0_28px_rgba(26,115,232,0.35)] flex items-center justify-center";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-12 sm:pb-16 md:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8 xl:px-12 min-h-screen flex items-center overflow-hidden"
    >
      <div className="relative z-10 max-w-[1440px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-center">
        <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8 text-center md:text-left px-2 sm:px-4 md:px-0 max-w-2xl mx-auto md:mx-0">
          <h1
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight text-white leading-[1.15] sm:leading-[1.1] md:leading-[1.05]"
            data-speed="1.1"
          >
            {hero.titleTop}
            <img
              src="/art/hero-mark.svg"
              alt=""
              aria-hidden
              className="inline-block w-12 xs:w-14 sm:w-16 md:w-20 lg:w-24 xl:w-28 align-middle ml-2 sm:ml-3 md:ml-4 lg:ml-6 mb-0 md:mb-1"
            />
            <br />
            {hero.titleBottom}
          </h1>

          <div className="mt-2 sm:mt-3 md:mt-4 lg:mt-6 flex justify-center md:justify-start">
            <img
              src="/art/initiative.svg"
              alt="A student innovation platform for Mumbai"
              className="block w-11/12 xs:w-10/12 sm:w-3/4 md:w-2/3 lg:w-3/5 max-w-[380px] sm:max-w-[420px] md:max-w-[280px] lg:max-w-[300px] xl:max-w-[320px] object-contain pointer-events-none"
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

        <div className="flex items-center justify-center md:justify-end mt-6 sm:mt-8 md:mt-0 w-full px-4 sm:px-0">
          <div className="w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[380px] md:max-w-[440px] lg:max-w-[500px] xl:max-w-[560px]">
            <CodeTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}
