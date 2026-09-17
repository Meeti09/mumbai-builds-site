"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journey } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

export default function JourneySection() {
  const section = useRef<HTMLElement>(null);

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

  const group = (
    <div className="marquee-group flex gap-3 sm:gap-4 md:gap-6 px-4 sm:px-6 md:px-8">
      {journey.tiles.map((tile) => (
        <figure
          key={tile.src}
          className="w-[240px] sm:w-[280px] md:w-[320px] lg:w-[420px] flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden bg-[#0b0c0d] shadow-md"
        >
          <img src={tile.src} alt={tile.alt} loading="lazy" />
        </figure>
      ))}
    </div>
  );

  return (
    <section
      id="journey"
      ref={section}
      className="relative py-12 sm:py-16 md:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 md:space-y-12">
        <h2 className="animate-reveal text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight">
          {journey.heading}
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-center text-white px-4">
          {journey.blurb}
        </p>

        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/5 bg-[#0f1113] py-4 sm:py-6 md:py-8">
          <div className="marquee">
            <div className="marquee-track">
              {group}
              {group}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
