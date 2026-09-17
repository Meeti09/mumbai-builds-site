"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Variant = "mentor" | "jury";

const THEME = {
  mentor: {
    cardClass: "mentor-card",
    heading: "from-cyan-400 via-purple-500 to-blue-500",
    aura: ["bg-purple-500/10 top-20 left-10", "bg-cyan-500/10 bottom-20 right-10"],
    glow: "from-cyan-500/0 via-purple-500/50 to-blue-500/0",
    frameTop:
      "border-t-2 border-l-2 border-cyan-500/0 group-hover:border-cyan-500/50",
    frameBottom:
      "border-b-2 border-r-2 border-purple-500/0 group-hover:border-purple-500/50",
    photoBg: "from-purple-500/20 to-cyan-500/20",
    nameHover: "group-hover:from-cyan-400 group-hover:to-purple-500",
    grid: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  },
  jury: {
    cardClass: "jury-card",
    heading: "from-orange-400 via-pink-500 to-purple-500",
    aura: ["bg-orange-500/10 top-20 right-10", "bg-pink-500/10 bottom-20 left-10"],
    glow: "from-orange-500/0 via-pink-500/50 to-purple-500/0",
    frameTop:
      "border-t-2 border-l-2 border-orange-500/0 group-hover:border-orange-500/50",
    frameBottom:
      "border-b-2 border-r-2 border-pink-500/0 group-hover:border-pink-500/50",
    photoBg: "from-orange-500/20 to-pink-500/20",
    nameHover: "group-hover:from-orange-400 group-hover:to-pink-500",
    grid: "grid-cols-2 md:grid-cols-4",
  },
} as const;

export type PeopleGridProps = {
  id: string;
  variant: Variant;
  heading: string;
  blurb: string;
  role: string;
  people: { name: string; detail: string }[];
};

export default function PeopleGrid({
  id,
  variant,
  heading,
  blurb,
  role,
  people,
}: PeopleGridProps) {
  const section = useRef<HTMLElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const t = THEME[variant];

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
        el.querySelectorAll(`.${t.cardClass}`),
        { opacity: 0, y: 60, rotateX: 15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: inner.current, start: "top 75%" },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [t.cardClass]);

  return (
    <section
      id={id}
      ref={section}
      className="relative min-h-screen py-20 px-4 md:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute w-96 h-96 rounded-full blur-3xl ${t.aura[0]}`} />
        <div className={`absolute w-96 h-96 rounded-full blur-3xl ${t.aura[1]}`} />
      </div>

      <div ref={inner} className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className={`reveal-heading text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r ${t.heading} bg-clip-text text-transparent mb-4`}
          >
            {heading}
          </h2>
          <p className="reveal-heading text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            {blurb}
          </p>
        </div>

        <div className={`grid ${t.grid} gap-6 md:gap-8`}>
          {people.map((person, i) => (
            <div
              key={person.name}
              className={`${t.cardClass} group relative`}
            >
              <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-1 overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-300">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${t.glow} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`}
                />
                <div className="relative bg-black/40 rounded-xl p-4 overflow-hidden">
                  <div
                    className={`relative aspect-square mb-4 rounded-xl overflow-hidden bg-gradient-to-br ${t.photoBg}`}
                  >
                    <img
                      src={`/art/avatar-${String((i % 12) + 1).padStart(2, "0")}.svg`}
                      alt=""
                      aria-hidden
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="text-center">
                    <h3
                      className={`text-white font-bold text-lg md:text-xl mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r ${t.nameHover} group-hover:bg-clip-text transition-all duration-300`}
                    >
                      {person.name}
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base">{role}</p>
                    <p className="text-gray-500 text-xs md:text-sm mt-1">
                      {person.detail}
                    </p>
                  </div>
                  <div
                    className={`absolute top-0 left-0 w-8 h-8 ${t.frameTop} transition-all duration-300`}
                  />
                  <div
                    className={`absolute bottom-0 right-0 w-8 h-8 ${t.frameBottom} transition-all duration-300`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
