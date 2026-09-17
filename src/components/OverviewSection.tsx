import { overview } from "@/content/site";

/**
 * The "X in collaboration with Y" banner card: copy on the left, two glowing
 * landmark illustrations flanking a soft aurora on the right.
 */
export default function OverviewSection() {
  const [primary, secondary] = overview.landmarks;

  return (
    <section
      id="overview"
      className="relative py-12 sm:py-16 md:py-20 px-4 overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        <div
          className="relative bg-gradient-to-br from-[#0a0b0d] via-[#0f1113] to-[#0a0b0d] rounded-2xl sm:rounded-3xl border border-white/10 p-6 sm:p-8 md:p-12 lg:p-16 overflow-hidden backdrop-blur-xl"
          style={{
            boxShadow:
              "0 0 60px -15px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center relative z-10">
            <div className="space-y-0">
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight text-left">
                {overview.headingTop}
              </h2>
              <br />
              <p className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-blue-400 font-semibold leading-tight text-left">
                {overview.headingMiddle}
              </p>
              <br />
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight text-left">
                {overview.headingBottom}
              </h2>
              <p className="text-gray-400 text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed max-w-xl text-left mt-4 sm:mt-5 md:mt-6">
                {overview.blurb}
              </p>
            </div>

            <div className="relative h-[280px] sm:h-[320px] md:h-[360px] lg:h-[400px] flex items-center justify-center">
              <div className="relative w-full h-full flex items-center justify-center">
                <div
                  className="relative w-full h-full flex items-center justify-center"
                  style={{ transform: "scale(1.12)", transformOrigin: "center" }}
                >
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ zIndex: 1, transform: "translateY(-22px)" }}
                  >
                    <div
                      className="w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px] lg:w-[320px] lg:h-[320px] rounded-full animate-float-slow"
                      style={{
                        background:
                          "radial-gradient(circle at 42% 38%, rgba(34,211,238,0.30) 0%, rgba(59,130,246,0.16) 38%, rgba(168,85,247,0.10) 62%, transparent 74%)",
                        filter: "blur(14px)",
                      }}
                    />
                  </div>

                  <div
                    className="absolute flex flex-col items-center"
                    style={{
                      left: "50%",
                      transform: "translateX(-90%)",
                      bottom: "18%",
                      zIndex: 7,
                    }}
                  >
                    <img
                      src={primary.src}
                      alt={primary.alt}
                      className="w-[170px] sm:w-[180px] md:w-[200px] lg:w-[220px] object-contain"
                    />
                    <span className="mt-2 text-cyan-400 text-lg sm:text-xl md:text-2xl font-semibold">
                      {primary.label}
                    </span>
                  </div>

                  <div
                    className="absolute flex flex-col items-center"
                    style={{
                      left: "50%",
                      transform: "translateX(0%)",
                      bottom: "18%",
                      zIndex: 7,
                    }}
                  >
                    <img
                      src={secondary.src}
                      alt={secondary.alt}
                      className="w-[140px] sm:w-[160px] md:w-[180px] lg:w-[200px] object-contain"
                    />
                    <span className="mt-2 text-cyan-400 text-lg sm:text-xl md:text-2xl font-semibold">
                      {secondary.label}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
