"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NEON = [
  ["#7C3AED33", "#06B6D422"],
  ["#06B6D433", "#F9731622"],
  ["#F9731633", "#DB277722"],
  ["#DB277733", "#7C3AED22"],
] as const;

const NUMBER_GRADIENT = [
  "from-purple-500 to-pink-500",
  "from-cyan-500 to-blue-500",
  "from-orange-500 to-red-500",
  "from-blue-500 to-purple-500",
] as const;

const glow = (i: number) => {
  const [a, b] = NEON[i % NEON.length];
  return {
    backgroundImage: `radial-gradient(circle at 30% 30%, ${a} 0%, transparent 35%), radial-gradient(circle at 70% 70%, ${b} 0%, transparent 45%)`,
    filter: "blur(40px)",
  };
};

export type InsightPanelProps = {
  id: string;
  badge: string;
  heading: string;
  blurb: string;
  cta: { label: string; href: string };
  art: { src: string; alt: string };
  artWidthClass: string;
  stats: { value: string; label: string }[];
  cards: {
    title: string;
    body: string;
    pill: string;
    tone: "blue" | "cyan";
    art: string;
  }[];
  /** The first instance in the reference carries extra ambient decoration. */
  decorated?: boolean;
  /** Compact density (eligibility card): tighter padding, gaps and artwork. */
  compact?: boolean;
};

// Eligibility-specific artwork component - separates GSAP entrance from floating animation
function EligibilityArtwork({ artColRef }: { artColRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div className="relative w-full h-full">
      {/* GSAP-animated wrapper - handles entrance animation only */}
      <div className="landmark-item relative h-full w-full" ref={artColRef}>
        {/* Floating artwork wrapper - handles continuous float animation */}
        <div className="eligibility-artwork-wrapper animate-float-slow absolute right-0 top-[2%] md:top-[5%] w-[95%] md:w-[85%] max-w-[560px] md:max-w-[640px]">
          {/* Ambient glow behind artwork */}
          <div
            aria-hidden
            className="neon-glow absolute left-1/2 bottom-0 -translate-x-1/2 h-[100%] w-[100%] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(closest-side at 50% 100%, rgba(34,211,238,0.25) 0%, rgba(99,102,241,0.12) 40%, rgba(168,85,247,0.08) 60%, transparent 80%)",
              filter: "blur(36px)",
            }}
          />
          {/* The actual artwork */}
          <div className="relative w-full h-auto">
            <img
              src="/art/assets/eligibility.png"
              alt="Neon graduation cap representing student eligibility"
              className="w-full h-auto object-contain mix-blend-screen select-none"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Standard artwork for other panels
function StandardArtwork({ art, artWidthClass, artColRef, glowFn }: { art: { src: string; alt: string }; artWidthClass: string; artColRef: React.RefObject<HTMLDivElement | null>; glowFn: typeof glow }) {
  return (
    <div className="relative w-full max-w-xl">
      <div className="absolute left-1/4 top-1/3 w-48 h-48 bg-cyan-400/20 rounded-full blur-[100px]" />
      <div className="absolute right-1/4 bottom-1/3 w-40 h-40 bg-purple-500/15 rounded-full blur-[90px]" />
      <div className="landmark-item absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] flex items-center justify-center" ref={artColRef}>
        <div className="relative flex flex-col items-center justify-center w-full">
          <div className="absolute -inset-6 rounded-full opacity-30 pointer-events-none" style={glowFn(0)} />
          <div className={`w-full ${artWidthClass} mx-auto`}>
            <img
              src={art.src}
              alt={art.alt}
              className="w-full h-auto object-contain rounded-lg shadow-2xl transform transition-transform duration-300 hover:scale-105 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InsightPanel({
  id,
  badge,
  heading,
  blurb,
  cta,
  art,
  artWidthClass,
  stats,
  cards,
  decorated = false,
  compact = false,
}: InsightPanelProps) {
  const root = useRef<HTMLElement>(null);
  const artCol = useRef<HTMLDivElement>(null);
  const statsRow = useRef<HTMLDivElement>(null);
  const isEligibility = id === "eligibility";

  useEffect(() => {
    const el = root.current;
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

      if (artCol.current) {
        gsap.fromTo(
          artCol.current.querySelectorAll(".landmark-item"),
          { opacity: 0, y: 60, rotateX: 15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: { trigger: artCol.current, start: "top 75%" },
          }
        );
      }

      if (statsRow.current) {
        gsap.fromTo(
          statsRow.current.querySelectorAll(".stat-card"),
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "back.out(1.3)",
            scrollTrigger: { trigger: statsRow.current, start: "top 80%" },
          }
        );
      }

      gsap.fromTo(
        el.querySelectorAll(".animate-reveal"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el.querySelector(".bottom-cards"),
            start: "top 80%",
          },
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
          stagger: { each: 0.3 },
        });
      }
    }, el);

    return () => ctx.revert();
  }, []);

  const shell = decorated
    ? compact
      ? "max-w-7xl mx-auto bg-[#16171a] rounded-[2rem] p-5 sm:p-6 md:p-10 border border-white/5 relative overflow-hidden shadow-2xl"
      : "max-w-7xl mx-auto bg-[#16171a] rounded-[3rem] p-8 md:p-16 border border-white/5 relative overflow-hidden shadow-2xl"
    : "max-w-7xl mx-auto bg-[#16171a] rounded-2xl sm:rounded-3xl lg:rounded-[3rem] p-4 sm:p-6 md:p-8 lg:p-16 border border-white/5 relative overflow-hidden shadow-2xl";

  const body = (
    <div className="relative z-10">
      {/* Hero/content area - two columns on desktop, stacked on mobile */}
      <div
        className={`grid lg:grid-cols-2 items-start ${
          compact ? "gap-6 md:gap-8" : "gap-8 md:gap-12"
        }`}
      >
        {/* Left column - text content */}
        <div className={compact ? "space-y-4 md:space-y-5" : "space-y-6 md:space-y-8"}>
          <div
            className={`reveal-heading inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-400/20 ${
              compact ? "mb-2" : "mb-4"
            }`}
          >
            <span className="text-xs sm:text-sm text-cyan-300 font-medium tracking-widest uppercase">
              {badge}
            </span>
          </div>
          <h2 className="reveal-heading text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400">
            {heading}
          </h2>
          <p className="reveal-heading text-gray-300 text-base md:text-lg leading-relaxed max-w-lg">
            {blurb}
          </p>
          <a
            href={cta.href}
            className={`reveal-heading group relative inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-105 overflow-hidden ${
              compact ? "px-6 py-3" : "px-8 py-4"
            }`}
          >
            <span className="relative z-10">{cta.label}</span>
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>

        {/* Right column - artwork (only for decorated panels) */}
        <div ref={artCol} className={`relative ${
          compact ? "h-[220px] sm:h-[260px] md:h-[300px] lg:h-[360px]" : "h-[320px] sm:h-[380px] md:h-[450px] lg:h-[500px]"
        }`}>
          {isEligibility ? <EligibilityArtwork artColRef={artCol} /> : <StandardArtwork art={art} artWidthClass={artWidthClass} artColRef={artCol} glowFn={glow} />}
        </div>
      </div>

      {/* Stats row - completely separate block underneath hero area */}
      <div
        ref={statsRow}
        className={`grid grid-cols-2 md:grid-cols-4 mt-8 md:mt-12 lg:mt-16 ${
          compact ? "gap-3 md:gap-4" : "gap-4 md:gap-6"
        }`}
      >
        {stats.map((stat, i) => (
          <div key={stat.label} className="stat-card group relative">
            <div
              className="neon-glow absolute inset-0 z-0 opacity-20 group-hover:opacity-70 transition-all duration-500 rounded-2xl"
              style={glow(i)}
            />
            <div
              className={`relative z-10 bg-gradient-to-br from-white/6 to-white/[0.02] backdrop-blur-xl border border-cyan-400/15 rounded-2xl text-center shadow-xl transition-all duration-500 group-hover:-translate-y-1 group-hover:scale-105 group-hover:border-cyan-400/30 ${
                compact ? "p-3 sm:p-4" : "p-4 sm:p-6"
              }`}
            >
              <div
                className={`font-bold bg-gradient-to-r ${
                  NUMBER_GRADIENT[i % NUMBER_GRADIENT.length]
                } bg-clip-text text-transparent mb-2 ${
                  compact
                    ? "text-2xl sm:text-3xl md:text-4xl"
                    : "text-3xl sm:text-4xl md:text-5xl"
                }`}
              >
                {stat.value}
              </div>
              <div className="text-gray-300 text-xs sm:text-sm font-medium tracking-wide">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom cards */}
      <div className={`bottom-cards grid md:grid-cols-2 mt-8 md:mt-12 lg:mt-16 ${compact ? "gap-4" : "gap-6"}`}>
        {cards.map((card) => (
          <div
            key={card.title}
            className={`animate-reveal bg-gradient-to-br from-[#1a1c20] to-[#16171a] flex flex-col md:flex-row items-center md:items-start border border-white/5 shadow-2xl hover:border-cyan-400/20 transition-all duration-300 group ${
              compact
                ? "rounded-[1.75rem] p-5 sm:p-6 gap-4 md:gap-6"
                : "rounded-[2.5rem] p-6 sm:p-8 gap-6 md:gap-8"
            }`}
          >
            <div
              className={`flex-shrink-0 rounded-3xl overflow-hidden border border-white/10 relative group-hover:border-cyan-400/30 transition-all ${
                compact
                  ? "w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36"
                  : "w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${
                  card.tone === "blue" ? "from-blue-500/10" : "from-cyan-500/10"
                } to-transparent z-0`}
              />
              <img
                src={card.art}
                alt=""
                aria-hidden
                className="relative z-10 object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className={`flex-1 ${compact ? "space-y-2" : "space-y-3"}`}>
              <h3
                className={`font-bold text-white group-hover:text-cyan-300 transition-colors ${
                  compact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
                }`}
              >
                {card.title}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                {card.body}
              </p>
              <div
                className={`inline-block px-4 py-1.5 rounded-full ${
                  card.tone === "blue"
                    ? "bg-blue-500/10 border-blue-400/30"
                    : "bg-cyan-500/10 border-cyan-400/30"
                } border`}
              >
                <span
                  className={`text-sm font-semibold ${
                    card.tone === "blue" ? "text-blue-400" : "text-cyan-400"
                  }`}
                >
                  {card.pill}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section
      id={id}
      ref={root}
      className={
        decorated
          ? compact
            ? "relative py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8"
            : "relative py-8 sm:py-12 md:py-20 px-4 sm:px-6 lg:px-8"
          : "relative py-8 sm:py-12 px-4 sm:px-6 lg:px-8"
      }
    >
      {decorated ? (
        <div className="max-w-7xl mx-auto">
          <div className={shell}>
            <div className="relative z-10">
              <div className="absolute top-0 left-1/4 w-[1px] h-24 bg-gradient-to-b from-cyan-400/50 to-transparent" />
              <div className="absolute bottom-0 right-1/3 w-[1px] h-32 bg-gradient-to-t from-purple-500/40 to-transparent" />
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute left-[10%] top-[15%] w-[40vw] h-[25vw] bg-gradient-to-br from-purple-600/12 via-blue-500/8 to-transparent blur-[140px] animate-pulse" />
                <div
                  className="absolute right-[20%] bottom-[10%] w-[35vw] h-[30vw] bg-gradient-to-tl from-cyan-400/10 via-pink-500/6 to-transparent blur-[120px] animate-pulse"
                  style={{ animationDelay: "1.2s" }}
                />
              </div>
              {body}
            </div>
          </div>
        </div>
      ) : (
        <div className={shell}>{body}</div>
      )}
    </section>
  );
}