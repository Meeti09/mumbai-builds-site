"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { timeline } from "@/content/site";

gsap.registerPlugin(ScrollTrigger);

const SLEEPERS = 40;

/**
 * Local-train timeline: two rails with sleepers down the middle, station cards
 * alternating left and right, and a train that rides the track as you scroll.
 */
export default function TimelineSection() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const train = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const sec = section.current;
    const car = train.current;
    if (!sec || !car) return;

    const ctx = gsap.context(() => {
      if (track.current) {
        gsap.fromTo(
          track.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sec,
              start: "top 70%",
              end: "bottom 80%",
              scrub: 1,
            },
          }
        );
      }

      const place = (progress: number) => {
        if (!track.current || !car || !sec) return;
        const host = (track.current.offsetParent as HTMLElement) || sec;
        const hostBox = host.getBoundingClientRect();
        const railBox = track.current.getBoundingClientRect();
        const carBox = car.getBoundingClientRect();

        const top = Math.max(0, railBox.top - hostBox.top);
        const bottom = Math.max(
          0,
          railBox.bottom - hostBox.top - carBox.height
        );
        const p = Math.min(Math.max(progress, 0), 1);
        const x =
          railBox.left - hostBox.left + railBox.width / 2 - carBox.width / 2;

        gsap.to(car, {
          x,
          y: top + p * (bottom - top || 0),
          duration: 0.25,
          ease: "power2.out",
        });
      };

      const trigger = ScrollTrigger.create({
        trigger: sec,
        start: "top 20%",
        end: "bottom 80%",
        scrub: 1,
        onUpdate: (self) => {
          const total = timeline.stops.length;
          setActive(Math.min(Math.floor(self.progress * total), total - 1));
          place(self.progress);
        },
      });

      requestAnimationFrame(() => place(trigger.progress || 0));

      const onResize = () => place(trigger.progress || 0);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }, sec);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="timeline"
      ref={section}
      suppressHydrationWarning
      className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto space-y-8 md:space-y-12">
        <div className="text-center space-y-2 sm:space-y-4 mb-10 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight">
            {timeline.heading}
          </h2>
          <p className="text-gray-400 text-base sm:text-lg font-light px-4">
            {timeline.subheading}
          </p>
        </div>

        <div className="relative">
          {/* the track */}
          <div
            ref={track}
            className="absolute left-1/2 top-0 bottom-0 block origin-top"
          >
            <div className="relative w-8 sm:w-12 md:w-16 h-full">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] sm:w-[3px] md:w-[4px] bg-gradient-to-b from-cyan-400/90 via-blue-500/80 to-transparent rounded-full" />
              <div className="absolute right-0 top-0 bottom-0 w-[2px] sm:w-[3px] md:w-[4px] bg-gradient-to-b from-cyan-400/90 via-blue-500/80 to-transparent rounded-full" />
              {Array.from({ length: SLEEPERS }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-full h-[2px] sm:h-[2.5px] md:h-[3px] bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent rounded-full"
                  style={{
                    top: `${(i * 100) / SLEEPERS}%`,
                    boxShadow: "0 0 6px rgba(6,182,212,0.4)",
                  }}
                />
              ))}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-cyan-400/40 via-blue-400/30 to-transparent" />
            </div>
          </div>

          {/* the train */}
          <div
            ref={train}
            className="absolute left-0 top-0 block z-30 pointer-events-none"
          >
            <img
              src="/art/train.svg"
              alt="Train marking progress along the timeline"
              width={120}
              height={120}
              className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain"
              style={{
                filter:
                  "drop-shadow(0 0 12px rgba(6,182,212,0.8)) drop-shadow(0 0 24px rgba(6,182,212,0.5)) drop-shadow(0 0 36px rgba(59,130,246,0.3)) brightness(1.2) contrast(1.1)",
              }}
            />
          </div>

          {/* stations */}
          <div className="space-y-6 sm:space-y-8 md:space-y-12 relative z-10">
            {timeline.stops.map((stop, i) => {
              const isActive = i <= active;
              const flip = i % 2 === 0;

              return (
                <div key={`${stop.title}-${i}`} className="relative">
                  <div
                    className={`timeline-card flex flex-col md:flex-row items-center gap-4 md:gap-8 transition-all duration-500 ${
                      flip ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`flex-1 w-full ${
                        flip ? "md:text-left" : "md:text-right"
                      }`}
                    >
                      <div className="relative inline-block w-full md:w-auto">
                        <div
                          className={`relative px-4 py-4 sm:px-6 sm:py-5 md:px-10 md:py-7 rounded-xl md:rounded-2xl border-2 shadow-2xl transition-all duration-500 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 ${
                            isActive
                              ? "border-cyan-400/70 shadow-[0_8px_40px_rgba(6,182,212,0.5)]"
                              : "border-slate-600/40"
                          }`}
                          style={{
                            backdropFilter: "blur(12px)",
                            WebkitBackdropFilter: "blur(12px)",
                            backgroundImage:
                              "linear-gradient(135deg, rgba(6,212,212,0.05) 0%, rgba(59,130,246,0.03) 100%)",
                          }}
                        >
                          <div
                            className={`absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl transition-all duration-500 ${
                              isActive
                                ? "bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400"
                                : "bg-slate-600/40"
                            }`}
                            style={
                              isActive
                                ? { boxShadow: "0 0 10px rgba(6,182,212,0.8)" }
                                : undefined
                            }
                          />

                          <div className="text-center mb-3 sm:mb-4 pb-2 sm:pb-3 border-b-2 border-cyan-500/30">
                            <h4
                              className={`text-base sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 transition-colors duration-500 ${
                                isActive ? "text-cyan-300" : "text-slate-300"
                              }`}
                              style={
                                isActive
                                  ? { textShadow: "0 0 20px rgba(6,182,212,0.6)" }
                                  : undefined
                              }
                            >
                              {stop.stationMarathi}
                            </h4>
                            <h5
                              className={`text-[10px] sm:text-xs md:text-sm lg:text-base font-semibold tracking-[0.15em] sm:tracking-[0.25em] transition-colors duration-500 ${
                                isActive ? "text-blue-300" : "text-slate-400"
                              }`}
                            >
                              {stop.station}
                            </h5>
                          </div>

                          <div className="space-y-1 sm:space-y-2">
                            <h3
                              className={`text-sm sm:text-base md:text-lg lg:text-xl font-semibold transition-colors duration-500 ${
                                isActive ? "text-white" : "text-slate-300"
                              }`}
                            >
                              {stop.title}
                            </h3>
                            <div
                              className={`text-[10px] sm:text-xs md:text-sm font-mono transition-colors duration-500 ${
                                isActive ? "text-cyan-300" : "text-slate-400"
                              }`}
                            >
                              {stop.date}
                              {stop.time ? ` · ${stop.time}` : ""}
                            </div>
                            <p
                              className={`text-[10px] sm:text-xs md:text-sm font-medium leading-relaxed transition-colors duration-500 ${
                                isActive ? "text-gray-200" : "text-slate-400"
                              }`}
                            >
                              {stop.description}
                            </p>
                          </div>
                        </div>

                        {/* station legs */}
                        {["left-1/4 -translate-x-1/2", "right-1/4 translate-x-1/2"].map(
                          (pos) => (
                            <div
                              key={pos}
                              className={`absolute top-full ${pos} w-1.5 sm:w-2 h-6 sm:h-12 md:h-16 rounded-b hidden sm:block transition-all duration-500 ${
                                isActive
                                  ? "bg-gradient-to-b from-cyan-600 to-slate-700"
                                  : "bg-gradient-to-b from-slate-600 to-slate-800"
                              }`}
                              style={{
                                boxShadow: isActive
                                  ? "inset 1px 0 0 rgba(255,255,255,0.2), 0 0 8px rgba(6,182,212,0.6), 2px 2px 4px rgba(0,0,0,0.4)"
                                  : "inset 1px 0 0 rgba(255,255,255,0.1), 2px 2px 4px rgba(0,0,0,0.4)",
                              }}
                            />
                          )
                        )}
                      </div>
                    </div>

                    <div className="relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0 z-20">
                      <div
                        className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full border-2 sm:border-3 md:border-4 border-[#0d0e10] transition-all duration-500 ${
                          isActive
                            ? "bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.9),0_0_40px_rgba(6,182,212,0.5)] scale-125"
                            : "bg-slate-600/40"
                        }`}
                      />
                    </div>

                    <div className="flex-1 hidden md:block" />
                  </div>

                  {stop.daysToNext > 0 && (
                    <div
                      className="flex absolute left-1/2 -translate-x-1/2 justify-center items-center z-[15] pointer-events-none"
                      style={{ top: "calc(100% + 1.5rem)" }}
                    >
                      <div className="flex items-center gap-1 sm:gap-2 opacity-50">
                        <div className="w-4 sm:w-6 md:w-8 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
                        <span className="text-xs sm:text-sm md:text-lg lg:text-xl font-bold font-mono text-cyan-400/90 tracking-wider drop-shadow">
                          {stop.daysToNext} {stop.daysToNext === 1 ? "Day" : "Days"}
                        </span>
                        <div className="w-4 sm:w-6 md:w-8 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
