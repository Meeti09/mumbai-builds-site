"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GradientPanel, { PanelAura } from "./GradientPanel";
import { sponsors } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

const NEON = [
  ["#7C3AED33", "#06B6D422"],
  ["#06B6D433", "#F9731622"],
  ["#F9731633", "#DB277722"],
  ["#DB277733", "#7C3AED22"],
] as const;

export default function SponsorsSection() {
  const section = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);

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
          stagger: 0.2,
          ease: "power3.out",
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
          scrollTrigger: { trigger: grid.current, start: "top 75%" },
        }
      );
      gsap.fromTo(
        el.querySelectorAll(".cta-btn"),
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cta-container", start: "top 80%" },
        }
      );
      const neon = el.querySelectorAll(".neon-glow");
      if (neon.length) {
        gsap.to(neon, {
          scale: 1.08,
          opacity: 0.85,
          duration: 2.5,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: { each: 0.2 },
        });
      }
    }, el);
    return () => ctx.revert();
  }, []);

  const [lead, strong1, mid1, strong2, mid2, strong3, tail] =
    sponsors.blurbParts;

  return (
    <section
      id="sponsors"
      ref={section}
      className="relative py-20 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <PanelAura />
      <div className="relative max-w-7xl mx-auto">
        <GradientPanel>
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 md:mb-20 relative z-10">
            <div className="reveal-heading inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-400/20 mb-4 sm:mb-6">
              <span className="text-xs sm:text-sm text-cyan-300 font-medium tracking-widest uppercase">
                {sponsors.badge}
              </span>
            </div>
            <h2 className="reveal-heading text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 mb-4 sm:mb-6">
              {sponsors.heading}
            </h2>
            <div className="reveal-heading w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent rounded-full mx-auto mb-4 sm:mb-6" />
            <p className="reveal-heading text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
              {lead}
              <span className="text-cyan-400 font-semibold">{strong1}</span>
              {mid1}
              <span className="text-purple-400 font-semibold">{strong2}</span>
              {mid2}
              <span className="text-blue-400 font-semibold">{strong3}</span>
              {tail}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 items-start relative">
            <div className="lg:col-span-2 space-y-6 sm:space-y-8 cta-container">
              <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 shadow-2xl">
                <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-cyan-400/30 to-purple-500/20 rounded-full blur-2xl" />
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                  {sponsors.why.title}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  {sponsors.why.body}
                  <span className="text-cyan-400 font-semibold">
                    {sponsors.why.emphasis}
                  </span>
                  {sponsors.why.tail}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {sponsors.ctas.map((cta) =>
                  cta.primary ? (
                    <a
                      key={cta.label}
                      href={cta.href}
                      className="cta-btn group relative text-center px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-105 overflow-hidden"
                    >
                      <span className="relative z-10">{cta.label}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ) : (
                    <a
                      key={cta.label}
                      href={cta.href}
                      className="cta-btn px-8 py-4 rounded-full border-2 border-cyan-400/40 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-400/60 font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] text-center"
                    >
                      {cta.label}
                    </a>
                  )
                )}
              </div>
            </div>

            <div className="lg:col-span-3 relative" ref={grid}>
              <div className="grid sm:grid-cols-2 gap-6 lg:pl-8">
                {sponsors.cards.map((card, i) => {
                  const [a, b] = NEON[i % NEON.length];
                  return (
                    <div key={card.title} className="sponsor-card group relative">
                      <div
                        className="neon-glow absolute inset-0 z-0 opacity-25 group-hover:opacity-80 transition-all duration-500 rounded-3xl"
                        style={{
                          backgroundImage: `radial-gradient(circle at 30% 30%, ${a} 0%, transparent 35%), radial-gradient(circle at 70% 70%, ${b} 0%, transparent 45%)`,
                          filter: "blur(40px)",
                        }}
                      />
                      <div
                        className="relative z-10 bg-gradient-to-br from-white/8 to-white/[0.02] backdrop-blur-2xl border border-cyan-400/20 rounded-3xl p-6 sm:p-7 flex flex-col shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-[1.02] group-hover:shadow-[0_20px_60px_-12px_rgba(6,182,212,0.4)] group-hover:border-cyan-400/40"
                        style={{ minHeight: 180 }}
                      >
                        <h3 className="font-bold text-white text-lg sm:text-xl mb-2 tracking-wide group-hover:text-cyan-300 transition-colors">
                          {card.title}
                        </h3>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed flex-1">
                          {card.body}
                        </p>
                        <div className="mt-4 h-[3px] rounded-full bg-gradient-to-r from-cyan-400/50 via-purple-500/50 to-blue-500/50 overflow-hidden" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </GradientPanel>
      </div>
    </section>
  );
}
