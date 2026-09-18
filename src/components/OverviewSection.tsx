import { overview } from "@/content/site";

/**
 * Cinematic overview banner: an oversized neon Mumbai illustration sits
 * behind the typography (right-sharp, fading to darkness toward the text),
 * with the headline + description floating over it as the foreground.
 */
export default function OverviewSection() {
  const collab = overview.headingMiddle.replace(/^in\s+/i, "");
  const [bottomHead, bottomTail] = overview.headingBottom.split(/\s*&\s*/);

  return (
    <section
      id="overview"
      className="relative py-12 sm:py-16 md:py-20 px-4 overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        <div
          className="relative rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br from-[#0a0b0d] via-[#0d1017] to-[#0a0b0d] overflow-hidden backdrop-blur-xl min-h-[540px] sm:min-h-[600px] lg:min-h-[620px] flex items-center"
          style={{
            boxShadow:
              "0 0 80px -20px rgba(34, 211, 238, 0.25), 0 0 120px -40px rgba(168, 85, 247, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
          }}
        >
          {/* neon top edge */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-8 sm:inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-purple-500 shadow-[0_0_12px_2px_rgba(34,211,238,0.5)] z-20"
          />

          {/* ---- z-0 · ambient glow ---- */}
          <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
            <div
              className="absolute right-[-10%] top-1/2 h-[90%] w-[80%] -translate-y-1/2 rounded-full animate-float-slow"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(34,211,238,0.20) 0%, rgba(99,102,241,0.12) 45%, rgba(168,85,247,0.10) 65%, transparent 78%)",
                filter: "blur(40px)",
              }}
            />
            <div
              className="absolute left-[-15%] bottom-[-25%] h-[70%] w-[60%] rounded-full"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(168,85,247,0.12) 0%, transparent 72%)",
                filter: "blur(50px)",
              }}
            />
          </div>

          {/* ---- z-0 · oversized city artwork behind text ---- */}
          <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
            <img
              src="/art/assets/build_what_matters.png"
              alt=""
              draggable={false}
              loading="lazy"
              className="absolute select-none mix-blend-screen animate-float-slow
                left-[-55%] bottom-[-4%] w-[210%] max-w-none opacity-50
                [mask-image:linear-gradient(to_top,black_60%,transparent_96%)]
                sm:left-[-35%] sm:w-[170%]
                lg:left-auto lg:right-[-14%] lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:w-[132%] lg:opacity-95
                lg:[mask-image:linear-gradient(to_right,transparent_0%,black_36%)]
                xl:right-[-10%] xl:w-[125%]"
            />
            {/* melt top + bottom edges into darkness */}
            <div className="absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-[#0b0d12] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-[#0a0b0d] to-transparent" />
            {/* readability scrim over the text zone */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b0d] via-[#0a0b0d]/85 via-[58%] to-transparent lg:via-[#0a0b0d]/45" />
          </div>

          {/* ---- z-10 · foreground typography ---- */}
          <div className="relative z-10 w-full p-6 sm:p-10 md:p-14 lg:p-16">
            <div className="max-w-2xl">
              <p className="flex items-center gap-3 text-[11px] sm:text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300/90">
                {overview.eyebrow}
                <span
                  aria-hidden
                  className="inline-block h-px w-10 sm:w-14 bg-gradient-to-r from-cyan-400 to-transparent"
                />
              </p>

              <h2 className="mt-5 sm:mt-6 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold leading-[1.04] tracking-tight">
                <span className="block text-white">
                  {overview.headingTop} in
                </span>
                <span className="block text-white">{collab} </span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  {bottomHead}
                </span>
                {bottomTail && (
                  <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                    &amp; {bottomTail}
                  </span>
                )}
              </h2>

              <p className="mt-5 sm:mt-6 text-gray-300/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl [text-shadow:0_1px_12px_rgba(0,0,0,0.9)]">
                {overview.blurb}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
