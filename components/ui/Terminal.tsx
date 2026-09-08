"use client";

import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import { useTypewriter, TypewriterLine } from "@/hooks/useTypewriter";

const TERMINAL_LINES: TypewriterLine[] = [
  { text: "● Initializing location... [Tamil Nadu, India]", delay: 200 },
  { text: "", delay: 400 },
  { text: "> I'm a third-year CS student building full-stack,", delay: 300 },
  { text: "  deep learning, and generative AI systems —", delay: 100 },
  { text: "  from backend APIs to intelligent, user-facing products.", delay: 100 },
  { text: "", delay: 300 },
  { text: "> I turn AI research into things people can actually use.", delay: 200 },
];

export default function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { visibleLines, start } = useTypewriter(TERMINAL_LINES, 30);

  useEffect(() => {
    if (inView) start();
  }, [inView, start]);

  return (
    <div ref={ref} className="relative">
      {/* Hard lime shadow */}
      <div className="shadow-neo-lime rounded-xl">
        <div className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-white/10">
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#2A2A2A] border-b border-white/10">
            <div className="flex items-center gap-2">
              {/* Traffic light dots */}
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <span className="font-mono text-[11px] text-white/40 ml-3">
                guest@dharani:~/about
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
              <span className="font-inter text-[10px] tracking-widest uppercase text-[#27C93F]">
                LIVE
              </span>
            </div>
          </div>

          {/* Terminal body */}
          <div className="p-5 font-mono text-sm text-white/80 min-h-[240px] leading-relaxed">
            {visibleLines.map((line, i) => (
              <div key={i} className="min-h-[1.5em]">
                {line === "" ? (
                  <>&nbsp;</>
                ) : (
                  <span
                    className={
                      line.startsWith("●")
                        ? "text-lime"
                        : line.startsWith(">")
                        ? "text-white"
                        : "text-white/60"
                    }
                  >
                    {line}
                  </span>
                )}
              </div>
            ))}
            {/* Blinking cursor — only while typing */}
            {visibleLines.length < TERMINAL_LINES.length && (
              <span className="cursor-blink" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
