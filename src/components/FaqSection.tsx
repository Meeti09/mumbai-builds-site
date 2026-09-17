"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { faqs } from "@/content/site";

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="relative py-12 sm:py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl sm:text-3xl font-semibold text-white text-center mb-4 sm:mb-6">
          Frequently Asked Questions
        </h3>

        <div className="space-y-3 sm:space-y-4 faq-item">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 * i }}
                className={`relative bg-gradient-to-br from-white/3 to-white/2 backdrop-blur-md rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "faq-active-border shadow-[0_0_40px_rgba(34,211,238,0.18)]"
                    : "border border-white/6"
                }`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 focus:outline-none"
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className="text-sm sm:text-base text-white font-medium pr-4 text-left">
                    {faq.question}
                  </span>
                  <span
                    className={`text-gray-300 transform transition-transform text-xl flex-shrink-0 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    +
                  </span>
                </button>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={
                    isOpen
                      ? { height: "auto", opacity: 1 }
                      : { height: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.35 }}
                  className="px-4 sm:px-5 overflow-hidden"
                >
                  {isOpen && (
                    <p className="py-3 text-sm sm:text-base text-gray-300">
                      {faq.answer}
                    </p>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
