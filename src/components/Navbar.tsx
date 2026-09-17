"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks, site } from "@/content/site";

const NAV_OFFSET = 64;

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(y / max, 1) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="absolute left-0 bottom-0 w-full h-1 z-20">
      <div
        ref={bar}
        className="h-full origin-left rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-indigo-400 shadow-[0_0_8px_2px_rgba(30,144,255,0.5)] transition-transform duration-200"
        style={{ transform: `scaleX(${progress})`, width: "100%" }}
      />
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const jump = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const top =
      target.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0b0c10]/40 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.25)] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
        <div className="flex items-center mr-4 lg:mr-8">
          <a
            href="#home"
            onClick={(e) => jump(e, "#home")}
            className="flex items-center gap-2 group"
          >
            <span className="text-xl font-medium tracking-tight text-white/90 group-hover:text-white transition-colors">
              <img
                src="/art/logo.svg"
                alt=""
                aria-hidden
                className="w-10 h-10 sm:w-14 sm:h-14 inline-block mb-1 animate-float-slow"
              />{" "}
              {site.name}
            </span>
          </a>
        </div>

        <div className="hidden xl:flex flex-1 justify-center">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => jump(e, link.href)}
                className="text-sm font-medium text-[#c4c7c5] hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="hidden xl:flex items-center gap-4">
          <a
            href={site.registerHref}
            onClick={(e) => jump(e, "#home")}
            className="hover:bg-[#1967d2] text-white px-6 py-2 rounded-full font-medium text-sm transition-all shadow-lg hover:shadow-blue-500/20 flex items-center justify-center"
            style={{ backgroundColor: "#1a73e8" }}
          >
            Register Now
          </a>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="xl:hidden absolute right-4 top-3 text-gray-300 p-2 z-50"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {open && (
        <div className="xl:hidden bg-[#0b0c10] border-b border-white/10">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => jump(e, link.href)}
                className="block text-base font-medium text-[#c4c7c5] hover:text-white py-2 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 border-t border-white/10">
              <a
                href={site.registerHref}
                onClick={(e) => jump(e, "#home")}
                className="block w-full text-center hover:bg-[#1967d2] text-white rounded-full py-2.5 font-medium"
                style={{ backgroundColor: "#1a73e8" }}
              >
                Register Now
              </a>
            </div>
          </div>
        </div>
      )}

      <ScrollProgress />
    </nav>
  );
}
