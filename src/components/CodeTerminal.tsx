"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { heroCode } from "@/content/site";

const TYPE_MS = 30;

const C = {
  keyword: "#8B7EC8",
  ident: "#4FC1FF",
  string: "#CE9178",
  fn: "#DCDCAA",
  prop: "#9CDCFE",
  number: "#B5CEA8",
  comment: "#6A9955",
  plain: "#FFFFFF",
};

/** Token-colours a single line of the demo snippet. */
function Line({ text }: { text: string }) {
  if (!text) return <div className="flex">&nbsp;</div>;

  const parts: { t: string; c: string }[] = [];
  const re =
    /("[^"]*")|(\b(?:import|from|const|await|new|return|export|let)\b)|(\b\d+\b)|([A-Za-z_$][\w$]*)(?=\()|([A-Za-z_$][\w$]*)|([^\w$"]+)/g;

  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m[1]) parts.push({ t: m[1], c: C.string });
    else if (m[2]) parts.push({ t: m[2], c: C.keyword });
    else if (m[3]) parts.push({ t: m[3], c: C.number });
    else if (m[4]) parts.push({ t: m[4], c: C.fn });
    else if (m[5])
      parts.push({
        t: m[5],
        c: /^[A-Z]/.test(m[5]) ? C.ident : C.prop,
      });
    else parts.push({ t: m[6] ?? "", c: C.plain });
  }

  return (
    <div className="flex">
      <span className="whitespace-pre">
        {parts.map((p, i) => (
          <span key={i} style={{ color: p.c }}>
            {p.t}
          </span>
        ))}
      </span>
    </div>
  );
}

export default function CodeTerminal() {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = setTimeout(() => setTyped(heroCode), 0);
      return () => clearTimeout(id);
    }

    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(heroCode.slice(0, i));
      if (i >= heroCode.length) clearInterval(id);
    }, TYPE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-[#2B2B2B] border border-gray-700/50 shadow-2xl w-full"
      >
        <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-3 border-b border-gray-700/50 bg-[#2B2B2B]">
          <div className="flex gap-1 sm:gap-1.5 lg:gap-2">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full bg-[#27C93F]" />
          </div>
          <span className="text-[9px] sm:text-[10px] lg:text-xs text-gray-400 ml-1 sm:ml-2 font-mono truncate">
            mumbai-builds.ts
          </span>
        </div>

        <div className="p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 font-mono text-[8px] xs:text-[9px] sm:text-[10px] md:text-[11px] lg:text-[12px] xl:text-[13px] leading-[1.5] sm:leading-[1.6] overflow-x-auto bg-[#2B2B2B] max-h-[250px] xs:max-h-[300px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-[450px] xl:max-h-[500px]">
          <pre className="text-white min-w-max">
            <code>
              {typed.split("\n").map((line, i) => (
                <Line key={i} text={line} />
              ))}
            </code>
          </pre>
          <span className="inline-block w-[6px] h-[10px] sm:w-[8px] sm:h-[14px] lg:w-[10px] lg:h-[18px] bg-cyan-400 ml-0.5" />
        </div>
      </motion.div>
    </div>
  );
}
