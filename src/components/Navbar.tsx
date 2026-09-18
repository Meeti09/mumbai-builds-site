"use client";

import { useEffect, useState } from "react";

const NAV_OFFSET = 64;

const CENTER_LINKS = [
  { label: "Overview", href: "#overview" },
  { label: "Timeline", href: "#timeline" },
  { label: "Tracks", href: "#tracks" },
  { label: "Finale", href: "#finale" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Organizers", href: "#organizers" },
  { label: "FAQ", href: "#faq" },
  { label: "Community", href: "#community" },
] as const;

export default function Navbar() {
  // Mirrors the static `aria-current="page"` on Overview: the section in view.
  const [active, setActive] = useState<string>("#overview");

  useEffect(() => {
    const ids = CENTER_LINKS.map((link) => link.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const jump = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    const top =
      target.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <header className="gn-03-bar">
      <a className="gn-03-brand" href="#home" onClick={(e) => jump(e, "#home")}>
        <img
          src="/art/assets/mumbai_builds_nav_logo.png"
          alt="Mumbai Builds logo"
          className="gn-03-brand-logo"
          draggable={false}
        />
        Mumbai Builds
      </a>

      <nav aria-label="Primary">
        <ul>
          {CENTER_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => jump(e, link.href)}
                {...(active === link.href
                  ? { "aria-current": "page" as const }
                  : {})}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <a
        className="gn-03-cta"
        href="#register"
        onClick={(e) => jump(e, "#register")}
      >
        Register Now
      </a>
    </header>
  );
}
