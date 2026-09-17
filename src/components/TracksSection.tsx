"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { format, tracks } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

export default function TracksSection() {
  const section = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState(0);
  const track = tracks.items[selected];

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".animate-reveal"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="tracks"
      ref={section}
      className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12 md:space-y-16">
        <div className="text-center space-y-4 sm:space-y-6 md:space-y-8">
          <h2 className="animate-reveal text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight">
            {tracks.heading}
          </h2>

          <div className="animate-reveal flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mt-8 sm:mt-10 md:mt-12 px-2 sm:px-4">
            {tracks.items.map((item, i) => {
              const on = i === selected;
              return (
                <button
                  key={item.tab}
                  type="button"
                  onClick={() => setSelected(i)}
                  className={`px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 border ${
                    on
                      ? "text-white"
                      : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                  }`}
                  style={
                    on
                      ? {
                          backgroundColor: `rgba(${item.accent}, 0.12)`,
                          borderColor: `rgba(${item.accent}, 0.28)`,
                          boxShadow: `0 8px 30px rgba(${item.accent}, 0.12)`,
                        }
                      : undefined
                  }
                >
                  {item.tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* featured track */}
        <div className="bg-[#16171a] rounded-2xl sm:rounded-3xl md:rounded-[3rem] p-4 sm:p-6 md:p-12 lg:p-16 xl:p-20 border border-white/5 relative overflow-hidden shadow-2xl min-h-[400px] sm:min-h-[480px] md:min-h-[550px] flex items-center">
          <div className="absolute top-4 sm:top-6 md:top-8 left-6 sm:left-8 md:left-12 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white/[0.03] select-none pointer-events-none">
            {track.index}
          </div>

          <div className="w-full h-full relative z-10">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center w-full">
              <div className="space-y-3 sm:space-y-4 md:space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-2 sm:mb-4">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-white flex items-center gap-2 sm:gap-3">
                    {track.title}
                  </h3>
                  <span className="text-[9px] sm:text-[10px] bg-green-500/10 text-green-400 px-2 sm:px-3 py-1 rounded-full border border-green-500/20 font-bold uppercase tracking-wider w-fit whitespace-nowrap">
                    {track.badge}
                  </span>
                </div>
                <p className="text-gray-400 text-sm sm:text-base md:text-lg font-light leading-relaxed">
                  {track.body}
                </p>
              </div>

              <div className="relative w-full h-full flex justify-end pr-4 sm:pr-6 md:pr-8 lg:pr-10">
                <div className="w-full max-w-[520px] relative overflow-visible">
                  <div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{
                      boxShadow: `0 0 100px 30px rgba(${track.accent},0.18)`,
                      border: `1px solid rgba(${track.accent},0.12)`,
                    }}
                  />
                  <div className="overflow-hidden rounded-xl relative z-20">
                    <img
                      key={track.art}
                      src={track.art}
                      alt={track.tab}
                      className="w-full h-full object-cover object-right transform scale-105 md:scale-110 lg:scale-125"
                      style={{ willChange: "transform" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-[-20%] h-[400px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
        </div>

        {/* format panel */}
        <div className="mt-16 sm:mt-20 md:mt-24 relative">
          <div className="absolute left-[10%] top-[20%] w-[40vw] h-[25vw] bg-gradient-to-br from-yellow-500/10 via-orange-500/8 to-transparent blur-[140px] animate-pulse pointer-events-none" />
          <div
            className="absolute right-[15%] bottom-[15%] w-[35vw] h-[30vw] bg-gradient-to-tl from-blue-500/10 via-green-500/8 to-transparent blur-[120px] animate-pulse pointer-events-none"
            style={{ animationDelay: "1s" }}
          />

          <div className="p-[2px] rounded-[2.5rem] bg-gradient-to-r from-yellow-500/30 via-blue-500/25 to-green-500/20 shadow-2xl relative z-10">
            <div className="rounded-[2.5rem] bg-gradient-to-br from-[#0a0d14] via-[#0f1219] to-[#0a0d14] backdrop-blur-xl p-6 sm:p-10 md:p-14 lg:p-16 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-blue-500 via-green-500 to-orange-500 rounded-t-[2.5rem]" />

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 relative z-10">
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-3xl sm:text-4xl md:text-5xl">🗓️</span>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-green-400">
                    {format.heading}
                  </h2>
                </div>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-green-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-400/30 w-fit">
                  <span className="text-lg">⚡</span>
                  <span className="text-xs sm:text-sm font-semibold text-blue-300">
                    {format.eyebrow}
                  </span>
                </div>
              </div>

              <div className="mb-8 p-4 sm:p-5 bg-gradient-to-r from-blue-500/5 to-transparent backdrop-blur-sm border-l-4 border-blue-500 rounded-xl relative z-10">
                <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                  {format.intro}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-8 relative z-10">
                {format.rounds.map((round) => (
                  <div key={round.tag} className="group relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${
                        round.accent === "green"
                          ? "from-green-500/20 to-blue-500/10"
                          : "from-blue-500/20 to-purple-500/10"
                      } rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                    <div
                      className={`relative bg-gradient-to-br from-white/8 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 transition-all duration-300 ${
                        round.accent === "green"
                          ? "hover:border-green-400/30"
                          : "hover:border-blue-400/30"
                      }`}
                    >
                      <h3
                        className={`text-sm font-semibold mb-3 flex items-center gap-2 ${
                          round.accent === "green"
                            ? "text-green-400"
                            : "text-blue-400"
                        }`}
                      >
                        <span className="text-lg font-mono">{round.icon}</span>
                        {round.tag} — {round.title}
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {round.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative mb-8 group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/30 via-orange-500/20 to-yellow-500/30 rounded-3xl blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-700 animate-pulse" />
                <div className="relative bg-gradient-to-br from-yellow-500/10 via-orange-500/5 to-yellow-500/10 backdrop-blur-xl border-2 border-yellow-500/30 rounded-3xl p-6 sm:p-8 text-center overflow-hidden">
                  <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-yellow-400/40 rounded-tl-3xl" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-yellow-400/40 rounded-br-3xl" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <span className="text-3xl sm:text-4xl">🏆</span>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-yellow-300">
                        {format.highlight.title}
                      </h3>
                      <span className="text-3xl sm:text-4xl">🏆</span>
                    </div>
                    <p className="text-gray-200 text-sm sm:text-base mb-2">
                      {format.highlight.body}
                    </p>
                    <p className="text-gray-400 text-xs sm:text-sm italic">
                      {format.highlight.footnote}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6 relative z-10">
                <a
                  href={format.cta.href}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 rounded-full font-semibold text-white shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 w-full sm:w-auto justify-center"
                >
                  <span className="text-lg">📄</span>
                  <span>{format.cta.label}</span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-green-400 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10" />
                </a>
              </div>

              <div className="p-4 sm:p-5 bg-blue-500/5 border-l-4 border-blue-500 rounded-xl relative z-10">
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  <span className="text-base sm:text-lg mr-2">💡</span>
                  <span className="font-semibold text-blue-400">Tracks: </span>
                  {format.note.replace(/^Tracks:\s*/, "")}
                </p>
              </div>

              <div className="absolute bottom-0 left-1/4 w-[1px] h-24 bg-gradient-to-t from-yellow-500/40 to-transparent pointer-events-none" />
              <div className="absolute top-1/2 right-[15%] w-[1px] h-32 bg-gradient-to-b from-blue-500/40 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
