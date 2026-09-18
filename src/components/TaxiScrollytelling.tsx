"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TaxiStage {
  index: string;
  title: string;
  subtitle: string;
  background: string;
  backgroundLabel: string;
  /** Oversized left-anchored cinematic backdrop (Sea Link only). */
  wideBg?: boolean;
}

const STAGES: TaxiStage[] = [
  {
    index: "01",
    title: "₹50,000 UP FOR GRABS",
    subtitle:
      "Build. Compete. Win. A ₹50,000 prize pool, with ₹30K for the winner, ₹15K for the runner-up, and ₹5K for third place — plus trophies for the top 3 teams.",
    background: "/art/assets/gateway.png",
    backgroundLabel: "Gateway of India",
  },
  {
    index: "02",
    title: "MEET THE PEOPLE WHO BUILD THE INDUSTRY",
    subtitle:
      "Mentors. Judges. Builders. Get direct guidance, code-audits, and feedback from experienced industry professionals while building your project.",
    background: "/art/assets/sealink.png",
    backgroundLabel: "Bandra–Worli Sea Link",
    // Oversized cinematic backdrop: anchored off the left edge and spanning
    // ~150–170vw so the deck enters from outside frame-left and reads as one
    // continuous illustration (pylons stay right, behind the card).
    wideBg: true,
  },
  {
    index: "03",
    title: "BUILD WITH REAL TECH",
    subtitle:
      "APIs. AI. Cloud. Sponsor Tech. Get hands-on experience with sponsor technologies, APIs and cloud infrastructure while building your solution.",
    background: "/art/assets/skyline.png",
    backgroundLabel: "Mumbai Skyline",
  },
  {
    index: "04",
    title: "GET SEEN BEYOND YOUR COLLEGE",
    subtitle:
      "Build your network. Build your name. Connect with builders across Mumbai, Thane, Pune and the wider MMR/Pune community, demonstrate your work, and gain recognition for what you build.",
    background: "/art/assets/bus_train.png",
    backgroundLabel: "Mumbai Local",
  },
];

const TAXI_SRC = "/art/assets/Mumbai_taxi.png";

/**
 * Timeline math (all durations in scrubbed timeline units):
 *   ENTER (1) + 4 × STAGE (1) + EXIT (1) = 6 total.
 *   Staggered choreography — text and backgrounds move on decoupled tracks:
 *
 *   Text: every card fades in and out over the SAME duration
 *   (TEXT_TRANSITION) with ease:"none" — linear, matching the timeline's
 *   own scrub default, so opacity always changes in lockstep with scroll
 *   distance instead of "snapping" partway through. Each card's fade-out
 *   is timed to finish at the exact instant the next card's fade-in
 *   begins (or, for the last card, the instant the taxi/background exit
 *   begins) — a zero-gap handoff, so there's never a blank frame and
 *   never an eased jump. Identical treatment for all 4 cards.
 *
 *   Bg IN at [at, at+0.4], bg OUT only after the next bg is established.
 *   Final stage's background holds full opacity, fading only with the
 *   taxi exit.
 */
const ENTER_DURATION = 1;
const STAGE_DURATION = 1;
const EXIT_DURATION = 1;
const TOTAL_DURATION =
  ENTER_DURATION + STAGE_DURATION * STAGES.length + EXIT_DURATION;
const TEXT_TRANSITION = 0.35; // fade duration — identical for every card, in and out
const TEXT_IN_DELAY = 0.1; // text starts slightly after its background
const ROAD_SHIFT_PX = 4000;

/**
 * Pinned Kaali-Peeli scrollytelling moment.
 * Strict layering: backgrounds (z-0) → road strip (z-10) → taxi (z-20) →
 * text card (z-30, pinned high so it never overlaps the taxi).
 * Exhaust smoke is pure CSS and runs independent of scroll.
 */
export default function TaxiScrollytelling() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el) return;

    // Reduced-motion: composed static frame, no pinning.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el.querySelector(".taxi-vehicle"), { x: "0%" });
      gsap.set(el.querySelector(".taxi-road"), { opacity: 1 });
      gsap.set(el.querySelectorAll(".taxi-stage-bg")[0], {
        opacity: 0.85,
        scale: 1,
      });
      gsap.set(el.querySelectorAll(".taxi-stage-text")[0], {
        opacity: 1,
        y: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      const taxi = el.querySelector(".taxi-vehicle");
      const road = el.querySelector(".taxi-road");
      const bgs = gsap.utils.toArray<HTMLElement>(".taxi-stage-bg");
      const texts = gsap.utils.toArray<HTMLElement>(".taxi-stage-text");
      const dots = gsap.utils.toArray<HTMLElement>(".taxi-dot");
      const progress = el.querySelector(".taxi-progress");

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=4000",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ——— Entrance (time 0): taxi drives in, road fades in ———
      tl.fromTo(
        taxi,
        { x: "-100vw" },
        { x: "0%", duration: ENTER_DURATION, ease: "power2.out" },
        0
      );
      tl.fromTo(
        road,
        { opacity: 0 },
        { opacity: 1, duration: ENTER_DURATION, ease: "power1.out" },
        0
      );

      // ——— Continuous road scroll across the whole pin ———
      tl.fromTo(
        road,
        { backgroundPositionX: "0px" },
        {
          backgroundPositionX: `-${ROAD_SHIFT_PX}px`,
          duration: TOTAL_DURATION,
          ease: "none",
        },
        0
      );
      if (progress) {
        tl.fromTo(
          progress,
          { scaleX: 0 },
          { scaleX: 1, duration: TOTAL_DURATION, ease: "none" },
          0
        );
      }

      // ——— The journey: staggered choreography ———
      // Text never overlaps (outgoing gone before next IN, with a
      // zero-gap handoff — see header comment); backgrounds heavily
      // overlap (outgoing stays until incoming is established).
      bgs.forEach((bg, i) => {
        const at = ENTER_DURATION + i * STAGE_DURATION;
        const isLast = i === bgs.length - 1;

        // --- INCOMING ANIMATIONS ---
        // Background fades in over 0.4s
        tl.fromTo(
          bg,
          { opacity: 0, scale: 1.05 },
          { opacity: 0.85, scale: 1, duration: 0.4, ease: "power1.out" },
          at
        );

        // Text fades in — same duration/ease as every other card.
        // ease:"none" matches the timeline's scrub default so opacity
        // rises linearly with scroll distance instead of snapping.
        tl.fromTo(
          texts[i],
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: TEXT_TRANSITION, ease: "none" },
          at + TEXT_IN_DELAY
        );

        // Dots: light current stage, dim previous
        if (dots[i]) {
          tl.fromTo(
            dots[i],
            { opacity: 0.35, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.25 },
            at
          );
          if (i > 0 && dots[i - 1]) {
            tl.to(dots[i - 1], { opacity: 0.35, scale: 0.9, duration: 0.25 }, at);
          }
        }

        // Text fades out — SAME duration/ease as the fade-in above, for
        // every card including the last. It always finishes exactly when
        // the next card's fade-in begins (or, for the last card, exactly
        // when the taxi/background exit begins): a zero-gap handoff, so
        // there's no blank frame between cards and no eased "snap".
        const nextTextStart = isLast
          ? TOTAL_DURATION - EXIT_DURATION
          : at + STAGE_DURATION + TEXT_IN_DELAY;

        tl.to(
          texts[i],
          { y: -40, opacity: 0, duration: TEXT_TRANSITION, ease: "none" },
          nextTextStart - TEXT_TRANSITION
        );

        if (!isLast) {
          const nextAt = at + STAGE_DURATION;

          // --- OUTGOING BACKGROUND ---
          // Background waits, then fades out AFTER the next background has already started fading in (nextAt + 0.1)
          tl.to(
            bg,
            { opacity: 0, scale: 1.02, duration: 0.4, ease: "power1.in" },
            nextAt + 0.1
          );
        } else {
          // --- FINAL STAGE BACKGROUND EXIT (text already handled above) ---
          const exitAt = TOTAL_DURATION - EXIT_DURATION;
          tl.to(
            bg,
            { opacity: 0, scale: 1.02, duration: EXIT_DURATION, ease: "power1.in" },
            exitAt
          );
        }
      });

      // ——— Exit: taxi drives off right; final card fades WITH it ———
      // "<" locks the final fade to the exit start: full opacity until then.
      // (The last text card's fade-out is already handled inside the loop
      // above, in lockstep with the other three — it is not re-tweened
      // here, which previously caused two competing tweens on the same
      // element and made stage 4 behave differently from stages 1–3.)
      const exitAt = TOTAL_DURATION - EXIT_DURATION;
      tl.to(
        taxi,
        { x: "100vw", duration: EXIT_DURATION, ease: "power2.in" },
        exitAt
      );
      tl.to(
        bgs[bgs.length - 1],
        { opacity: 0, duration: EXIT_DURATION, ease: "sine.inOut" },
        "<"
      );
      tl.to(
        bgs[bgs.length - 1],
        { scale: 1.02, duration: EXIT_DURATION, ease: "power1.in" },
        "<"
      );

      // Keep pin measurements correct once heavy PNGs decode.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      return () => window.removeEventListener("load", refresh);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why-ride"
      ref={section}
      className="relative h-screen w-full overflow-hidden bg-[#0a0d14]"
    >
      {/* Base neon ambience */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-32 left-1/2 h-[60vmin] w-[90vmin] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[120px]" />
        <div className="absolute bottom-0 left-[8%] h-[45vmin] w-[55vmin] rounded-full bg-cyan-500/10 blur-[110px]" />
        <div className="absolute right-[5%] top-1/3 h-[40vmin] w-[50vmin] rounded-full bg-purple-600/15 blur-[110px]" />
      </div>

      {/* z-0 · Landmark backgrounds, screen-blended.
          Positioning lives on the outer wrapper; GSAP animates only the
          inner img, so Tailwind translates never fight the timeline. */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {STAGES.map((stage, i) => (
          <div
            key={stage.background}
            className={
              stage.wideBg
                ? "absolute top-[69%] -left-[6vw] w-[100vw] max-w-none -translate-y-1/2 sm:w-[115vw] lg:w-[115vw]"
                : "absolute inset-0"
            }
          >
            <img
              src={stage.background}
              alt=""
              draggable={false}
              loading={i === 0 ? "eager" : "lazy"}
              className={
                stage.wideBg
                  ? "taxi-stage-bg h-auto w-full select-none object-contain opacity-0 mix-blend-screen will-change-transform"
                  : "taxi-stage-bg absolute inset-0 h-full w-full select-none object-contain opacity-0 mix-blend-screen will-change-transform"
              }
            />
          </div>
        ))}
        {/* Legibility gradient over glowing art */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d14]/85 via-[#0a0d14]/10 to-[#0a0d14]/90" />
      </div>

      {/* z-10 · Neon road strip — div with tiled bg, NO <img>.
          NOTE: spec asked for /art/road_2.png but that file is not in
          public/art — keeping the verified /art/assets/road.png so the
          strip actually renders. Swap the URL once road_2.png is added. */}
      <div
        aria-hidden="true"
        className="taxi-road absolute bottom-0 z-10 h-[150px] w-full bg-[url('/art/assets/road.png')] bg-[length:auto_100%] bg-bottom bg-repeat-x opacity-0 mix-blend-screen will-change-transform md:h-[200px]"
      />

      {/* z-20 · Taxi sitting just above the screen bottom, over the road band */}
      <div className="pointer-events-none absolute bottom-[8px] left-1/2 z-20 w-[70vw] max-w-[520px] -translate-x-1/2 sm:w-[44vw] md:bottom-[12px] lg:w-[30vw]">
        <div className="taxi-vehicle will-change-transform">
          <div className="relative">
            <img
              src={TAXI_SRC}
              alt="Mumbai Kaali-Peeli taxi"
              draggable={false}
              className="h-auto w-full select-none object-contain drop-shadow-[0_0_45px_rgba(34,211,238,0.35)]"
            />
            {/* Exhaust smoke — pure CSS, independent of GSAP/scroll.
                Anchored to the rear-low edge (taxi faces right); nudge
                `left`/`bottom` if the art orientation ever changes. */}
            <div
              className="pointer-events-none absolute bottom-[18%] left-[3%] h-8 w-16"
              aria-hidden="true"
            >
              <span
                className="absolute left-0 top-2 h-2.5 w-2.5 animate-ping rounded-full bg-cyan-300/80 blur-[3px] motion-reduce:animate-none"
                style={{ animationDuration: "1.4s" }}
              />
              <span
                className="absolute -left-3 top-1 h-4 w-4 animate-pulse rounded-full bg-purple-500/50 blur-md motion-reduce:animate-none"
                style={{ animationDelay: "0.3s" }}
              />
              <span
                className="absolute -left-6 top-2 h-6 w-6 animate-ping rounded-full bg-cyan-400/25 blur-lg motion-reduce:animate-none"
                style={{ animationDelay: "0.6s", animationDuration: "2s" }}
              />
              <span
                className="absolute -left-1 -top-1 h-2 w-2 animate-pulse rounded-full bg-white/60 blur-[2px] motion-reduce:animate-none"
                style={{ animationDelay: "0.9s" }}
              />
            </div>
            {/* Neon underglow */}
            <div
              className="pointer-events-none absolute -bottom-4 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-[100%] bg-cyan-500/30 blur-2xl"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {/* z-30 · Header: eyebrow + progress + stage dots */}
      <div className="absolute inset-x-0 top-0 z-30 px-4 pt-5 sm:px-6">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-2.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-cyan-300/90 md:text-xs">
            Why ride with us · Scroll to drive
          </p>
          <div className="flex items-center gap-2">
            {STAGES.map((stage) => (
              <span
                key={stage.index}
                className="taxi-dot flex h-7 min-w-7 items-center justify-center rounded-full border border-white/15 bg-white/5 px-2 text-[11px] font-bold tracking-widest text-white opacity-40 will-change-transform"
              >
                {stage.index}
              </span>
            ))}
          </div>
          <div className="h-px w-full max-w-md overflow-hidden rounded-full bg-white/10">
            <div className="taxi-progress h-full w-full origin-left scale-x-0 bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400" />
          </div>
        </div>
      </div>

      {/* z-30 · Text card, pinned high at top-[15%] — never touches the taxi */}
      <div className="absolute inset-x-0 top-[15%] z-30 flex justify-center px-4 sm:px-6">
        <div className="relative min-h-[280px] w-full max-w-3xl sm:min-h-[250px] md:min-h-[240px]">
          {STAGES.map((stage) => (
            <article
              key={stage.index}
              className="taxi-stage-text absolute inset-x-0 top-0 opacity-0 will-change-transform"
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:p-6 md:p-8">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-200/80">
                  {stage.index} / 04 · {stage.backgroundLabel}
                </p>
                <h3 className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-xl font-extrabold leading-tight text-transparent sm:text-3xl md:text-4xl">
                  {stage.title}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-200/90 sm:text-base md:text-lg">
                  {stage.subtitle}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Bottom vignette so the road melts into the page */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-24 bg-gradient-to-t from-[#0a0d14] to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
