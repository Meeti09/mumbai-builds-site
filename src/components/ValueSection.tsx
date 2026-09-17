"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GradientPanel, { PanelAura, PanelHeading } from "./GradientPanel";
import { value } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

const NEON = [
  ["#7C3AED33", "#06B6D422"],
  ["#06B6D433", "#F9731622"],
  ["#F9731633", "#DB277722"],
  ["#DB277733", "#7C3AED22"],
  ["#06B6D433", "#7C3AED22"],
] as const;

export default function ValueSection() {
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

  return (
    <section
      id="value"
      ref={section}
      className="relative py-20 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <PanelAura />
      <div className="relative max-w-7xl mx-auto">
        <GradientPanel>
          <PanelHeading badge={value.badge} heading={value.heading}>
            {value.blurb}
          </PanelHeading>

          <div
            ref={grid}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
          >
            {value.items.map((item, i) => {
              const [a, b] = NEON[i % NEON.length];
              return (
                <div key={item.title} className="sponsor-card group relative">
                  <div
                    className="neon-glow absolute inset-0 z-0 opacity-25 group-hover:opacity-80 transition-all duration-500 rounded-3xl"
                    style={{
                      backgroundImage: `radial-gradient(circle at 30% 30%, ${a} 0%, transparent 35%), radial-gradient(circle at 70% 70%, ${b} 0%, transparent 45%)`,
                      filter: "blur(40px)",
                    }}
                  />
                  <div
                    className="relative z-10 h-full bg-gradient-to-br from-white/8 to-white/[0.02] backdrop-blur-2xl border border-cyan-400/20 rounded-3xl p-6 sm:p-7 flex flex-col shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-[1.02] group-hover:shadow-[0_20px_60px_-12px_rgba(6,182,212,0.4)] group-hover:border-cyan-400/40"
                    style={{ minHeight: 180 }}
                  >
                    <h3 className="font-bold text-white text-lg sm:text-xl mb-2 tracking-wide group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed flex-1">
                      {item.body}
                    </p>
                    <div className="mt-4 h-[3px] rounded-full bg-gradient-to-r from-cyan-400/50 via-purple-500/50 to-blue-500/50 overflow-hidden" />
                  </div>
                </div>
              );
            })}
          </div>
        </GradientPanel>
      </div>
    </section>
  );
}
