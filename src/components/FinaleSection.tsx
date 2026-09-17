"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { finale } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

export default function FinaleSection() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".reveal-heading"),
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 70%" },
        }
      );
      gsap.fromTo(
        el.querySelectorAll(".sponsor-card"),
        { opacity: 0, y: 60, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 75%" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="finale"
      ref={section}
      className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative">
        <div className="absolute left-[10%] top-[20%] w-[40vw] h-[25vw] bg-gradient-to-br from-cyan-500/10 via-blue-500/8 to-transparent blur-[140px] animate-pulse pointer-events-none" />
        <div
          className="absolute right-[15%] bottom-[15%] w-[35vw] h-[30vw] bg-gradient-to-tl from-purple-500/10 via-pink-500/8 to-transparent blur-[120px] animate-pulse pointer-events-none"
          style={{ animationDelay: "1s" }}
        />

        <div className="p-[2px] rounded-[2.5rem] bg-gradient-to-r from-cyan-400/30 via-blue-500/25 to-purple-600/20 shadow-2xl relative z-10">
          <div className="rounded-[2.5rem] bg-gradient-to-br from-[#0a0d14] via-[#0f1219] to-[#0a0d14] backdrop-blur-xl p-6 sm:p-10 md:p-14 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-t-[2.5rem]" />

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 relative z-10">
              <div className="flex items-center gap-3 sm:gap-4">
                <span className="text-3xl sm:text-4xl md:text-5xl">🏁</span>
                <h2 className="reveal-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400">
                  {finale.heading}
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-400/30 w-fit">
                <span className="text-lg">📍</span>
                <span className="text-xs sm:text-sm font-semibold text-cyan-300">
                  {finale.eyebrow} · {finale.window}
                </span>
              </div>
            </div>

            <div className="mb-8 p-4 sm:p-5 bg-gradient-to-r from-cyan-500/5 to-transparent backdrop-blur-sm border-l-4 border-cyan-500 rounded-xl relative z-10">
              <p className="reveal-heading text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                {finale.intro}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 relative z-10">
              {finale.schedule.map((slot, i) => (
                <div key={slot.title} className="sponsor-card group relative">
                  <div
                    className="neon-glow absolute inset-0 z-0 opacity-25 group-hover:opacity-80 transition-all duration-500 rounded-3xl"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 30% 30%, #06B6D433 0%, transparent 35%), radial-gradient(circle at 70% 70%, #7C3AED22 0%, transparent 45%)",
                      filter: "blur(40px)",
                    }}
                  />
                  <div className="relative z-10 h-full bg-gradient-to-br from-white/8 to-white/[0.02] backdrop-blur-2xl border border-cyan-400/20 rounded-3xl p-6 sm:p-7 flex flex-col shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-[1.02] group-hover:shadow-[0_20px_60px_-12px_rgba(6,182,212,0.4)] group-hover:border-cyan-400/40">
                    <div className="flex items-baseline justify-between gap-3 mb-2">
                      <span className="font-mono text-xs sm:text-sm text-cyan-300 tracking-wider">
                        {slot.time}
                      </span>
                      <span className="font-mono text-xs text-white/15 select-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-bold text-white text-lg sm:text-xl mb-2 tracking-wide group-hover:text-cyan-300 transition-colors">
                      {slot.title}
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed flex-1">
                      {slot.body}
                    </p>
                    <div className="mt-4 h-[3px] rounded-full bg-gradient-to-r from-cyan-400/50 via-purple-500/50 to-blue-500/50 overflow-hidden" />
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute bottom-0 left-1/4 w-[1px] h-24 bg-gradient-to-t from-cyan-400/40 to-transparent pointer-events-none" />
            <div className="absolute top-1/2 right-[15%] w-[1px] h-32 bg-gradient-to-b from-purple-500/40 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
