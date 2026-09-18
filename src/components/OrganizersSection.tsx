"use client";

import { useEffect, useRef, useState } from "react";
import { organizers } from "@/content/site";

/**
 * Photo-first organiser cards. The name plate fades out on hover and a detail
 * panel slides up from the bottom with the contact chips.
 */
export default function OrganizersSection() {
  const [visible, setVisible] = useState(false);
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "-10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="organizers"
      ref={section}
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-black"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-extralight text-white tracking-[0.2em] uppercase mb-4">
            {organizers.heading}
          </h2>
        </div>

        <div className="space-y-20">
          {organizers.groups.map((group) => (
            <div key={group.title}>
              <h3 className="text-2xl md:text-3xl font-light text-white tracking-[0.1em] uppercase mb-8 border-b border-white/10 pb-4">
                {group.title}
              </h3>
              <div
                className={`grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 transition-opacity duration-1000 ${
                  visible ? "opacity-100" : "opacity-0"
                }`}
              >
                {group.people.map((person) => (
                  <div
                    key={person.name}
                    className="organizer-card group relative aspect-[4/5] overflow-hidden bg-zinc-900 cursor-pointer rounded-xl"
                  >
                    <img
                      src={person.art}
                      alt=""
                      aria-hidden
                      className="relative z-10 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 border border-white/5 opacity-40 rounded-xl z-20 pointer-events-none" />

                    <div className="absolute left-0 right-0 bottom-0 p-3 z-30 bg-gradient-to-t from-black/95 to-transparent transition-opacity duration-300 opacity-100 group-hover:opacity-0">
                      <div className="text-white font-semibold">
                        {person.name}
                      </div>
                      <div className="text-gray-400 text-xs mt-0.5">
                        {person.role}
                      </div>
                    </div>

                    <div className="absolute left-0 right-0 bottom-0 p-4 z-40 transform transition-transform duration-400 bg-black/95 translate-y-full group-hover:translate-y-0">
                      <div className="text-indigo-400 font-semibold">
                        {person.role}
                      </div>
                      {person.affiliation && (
                        <div className="text-gray-400 text-xs mt-0.5">
                          {person.affiliation}
                        </div>
                      )}
                      {person.bio && (
                        <div className="text-gray-300 text-sm mt-1">
                          {person.bio}
                        </div>
                      )}
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        {person.email && (
                          <a
                            href={`mailto:${person.email}`}
                            className="text-xs bg-red-600 px-3 py-1 rounded-full text-white hover:bg-red-500 transition-colors"
                          >
                            Email
                          </a>
                        )}
                        {person.phone && (
                          <a
                            href={`tel:${person.phone.replace(/\s/g, "")}`}
                            className="text-xs bg-blue-600 px-3 py-1 rounded-full text-white hover:bg-blue-500 transition-colors"
                          >
                            {person.phone}
                          </a>
                        )}
                        {person.linkedin && (
                          <a
                            href={person.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${person.name} on LinkedIn`}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white transition hover:bg-gray-200"
                          >
                            <img
                              src="/LinkedIn_icon.svg"
                              alt="LinkedIn"
                              className="h-4 w-4 object-contain"
                            />
                          </a>
                        )}
                        {person.x && (
                          <a
                            href={person.x}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${person.name} on X`}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white transition hover:bg-gray-200"
                          >
                            <img
                              src="/X_logo_2023.svg"
                              alt="X"
                              className="h-4 w-4 object-contain"
                            />
                          </a>
                        )}
                        {person.instagram && (
                          <a
                            href={person.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${person.name} on Instagram`}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-white transition hover:bg-gray-200"
                          >
                            <img
                              src="/Instagram_logo_2016.svg"
                              alt="Instagram"
                              className="h-4 w-4 object-contain"
                            />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
