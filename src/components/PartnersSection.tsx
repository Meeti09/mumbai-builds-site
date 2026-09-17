"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GradientPanel, { PanelAura, PanelHeading } from "./GradientPanel";
import { partners } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

function PartnerSlot() {
  return (
    <div className="partner-card group relative">
      <div
        className="neon-glow absolute inset-0 z-0 opacity-25 group-hover:opacity-80 transition-all duration-500 rounded-3xl"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 30%, #7C3AED33 0%, transparent 35%), radial-gradient(circle at 70% 70%, #06B6D422 0%, transparent 45%)",
          filter: "blur(40px)",
        }}
      />
      <div className="relative z-10 bg-gradient-to-br from-white/8 to-white/[0.02] backdrop-blur-2xl border border-cyan-400/20 rounded-3xl p-4 sm:p-10 flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-[1.02] group-hover:shadow-[0_20px_60px_-12px_rgba(6,182,212,0.4)] group-hover:border-cyan-400/40">
        <img
          src="/art/partner-slot.svg"
          alt="Partner slot open for 2027"
          className="h-24 sm:h-28 md:h-32 lg:h-36 object-contain"
        />
      </div>
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-400/30 text-xs text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Open for 2027
      </div>
    </div>
  );
}

export default function PartnersSection() {
  const section = useRef<HTMLElement>(null);
  const firstGroup = useRef<HTMLDivElement>(null);

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
        el.querySelectorAll(".partner-card"),
        { opacity: 0, y: 60, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: firstGroup.current, start: "top 75%" },
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
      id="partners"
      ref={section}
      className="relative py-20 sm:py-24 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <PanelAura />
      <div className="relative max-w-7xl mx-auto">
        <GradientPanel>
          <PanelHeading badge={partners.badge} heading={partners.heading}>
            {partners.blurb}
          </PanelHeading>

          {partners.groups.map((group, gi) => (
            <div
              key={group.title}
              ref={gi === 0 ? firstGroup : undefined}
              className={gi === 0 ? "relative z-10" : "mt-16 sm:mt-20 relative z-10"}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 text-center mb-8">
                {group.title}
              </h3>
              <div className="flex justify-center gap-6 lg:gap-8 flex-wrap">
                {Array.from({ length: group.count }).map((_, i) => (
                  <PartnerSlot key={i} />
                ))}
              </div>
            </div>
          ))}
        </GradientPanel>
      </div>
    </section>
  );
}
