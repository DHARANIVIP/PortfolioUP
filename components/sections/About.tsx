"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import EyebrowLabel from "@/components/ui/EyebrowLabel";
import Terminal from "@/components/ui/Terminal";
import PixelSwap from "@/components/ui/PixelSwap";

const HOW_I_BUILD = [
  {
    num: "01",
    title: "Problem-first",
    desc: "Solve the real problem, not the symptom.",
  },
  {
    num: "02",
    title: "Full-stack depth",
    desc: "From database to deployed UI.",
  },
  {
    num: "03",
    title: "AI-native thinking",
    desc: "RAG, LLMs, and agents — not just APIs.",
  },
];

// Decorative binary digits
const BINARY_POSITIONS = [
  { top: "8%", left: "3%", size: "text-5xl", opacity: 0.04 },
  { top: "20%", left: "15%", size: "text-2xl", opacity: 0.06 },
  { top: "55%", left: "6%", size: "text-6xl", opacity: 0.03 },
  { top: "75%", left: "20%", size: "text-3xl", opacity: 0.05 },
  { top: "10%", right: "5%", size: "text-4xl", opacity: 0.04 },
  { top: "40%", right: "10%", size: "text-5xl", opacity: 0.03 },
  { top: "70%", right: "4%", size: "text-2xl", opacity: 0.06 },
  { top: "30%", left: "45%", size: "text-7xl", opacity: 0.025 },
];

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (inView) {
      setIsRevealed(true);
    }
  }, [inView]);

  return (
    <section
      id="about"
      className="relative bg-sky-light py-28 px-6 overflow-hidden"
    >
      {/* Binary decorations */}
      {BINARY_POSITIONS.map((pos, i) => (
        <span
          key={i}
          className={`absolute font-mono font-black ${pos.size} text-black pointer-events-none select-none animate-pulseGlow`}
          style={{
            top: pos.top,
            left: (pos as { left?: string }).left,
            right: (pos as { right?: string }).right,
            opacity: pos.opacity,
            animationDelay: `${i * 0.4}s`,
          }}
          aria-hidden="true"
        >
          {i % 3 === 0 ? "01" : i % 3 === 1 ? "10" : "11"}
        </span>
      ))}

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left column */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          {/* PixelSwap Interactive Heading - Transparent & Lag-Free */}
          <PixelSwap
            firstContent={
              <div className="w-full h-full flex flex-col justify-between bg-[#DBEFFB] select-none cursor-pointer relative py-2 pr-4 overflow-hidden">
                {/* Decorative watermarks from user design */}
                <span className="absolute top-0 left-0 font-mono font-black text-6xl text-black/[0.07] select-none pointer-events-none" aria-hidden="true">
                  01
                </span>
                <span className="absolute top-8 left-[38%] font-mono font-black text-2xl text-black/[0.08] select-none pointer-events-none" aria-hidden="true">
                  10
                </span>
                <span className="absolute top-14 right-4 font-mono font-black text-7xl text-black/[0.07] select-none pointer-events-none" aria-hidden="true">
                  10
                </span>

                <div className="relative z-10">
                  <EyebrowLabel number="01" label="CORE PHILOSOPHY" />
                  <h2 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-[1.02] mt-6 text-black/60 tracking-tight">
                    Engineering
                    <br />
                    scalable{" "}
                    <span className="text-outline relative inline-block">
                      software
                    </span>
                    .
                    <br />
                    I craft
                    <br />
                    <span className="relative inline-block mt-1">
                      <span className="relative z-10 text-black/80">real intelligence.</span>
                      <span className="absolute inset-0 bg-white/70 -z-0" />
                    </span>
                  </h2>
                </div>

                <div className="mt-8 flex items-center gap-2 font-mono text-xs text-black/50 tracking-wider uppercase relative z-10">
                  <span className="w-2 h-2 rounded-full bg-black/40" />
                  <span>[SCROLL / CLICK TO DECRYPT ABOUT ME]</span>
                </div>
              </div>
            }
            secondContent={
              <div className="w-full h-full flex flex-col justify-between bg-[#DBEFFB] select-none cursor-pointer relative py-2 pr-4 overflow-hidden">
                {/* Decorative watermarks matching exact user screenshot */}
                <span className="absolute top-0 left-0 font-mono font-black text-6xl text-black/[0.08] select-none pointer-events-none" aria-hidden="true">
                  01
                </span>
                <span className="absolute top-8 left-[38%] font-mono font-black text-2xl text-black/[0.09] select-none pointer-events-none" aria-hidden="true">
                  10
                </span>
                <span className="absolute top-14 right-4 font-mono font-black text-7xl text-black/[0.08] select-none pointer-events-none" aria-hidden="true">
                  10
                </span>

                <div className="relative z-10">
                  <EyebrowLabel number="01" label="ABOUT ME" />
                  <h2 className="font-sans font-black text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-[1.02] mt-6 text-black tracking-tight">
                    I don&apos;t just
                    <br />
                    write{" "}
                    <span className="text-outline relative inline-block">
                      code
                    </span>
                    .
                    <br />
                    I build
                    <br />
                    <span className="relative inline-block mt-1">
                      <span className="relative z-10 text-black">systems that think.</span>
                      <span className="absolute inset-0 bg-lime -z-0" />
                    </span>
                  </h2>
                </div>

                <div className="mt-8 flex items-center gap-2 font-mono text-xs text-black/60 tracking-wider uppercase relative z-10">
                  <span className="w-2 h-2 rounded-full bg-lime animate-ping" />
                  <span>AI SYSTEMS ARCHITECT // FULL-STACK DEPTH</span>
                </div>
              </div>
            }
            pixelSize={56}
            gap={0}
            pixelRadius={0}
            pixelScale={0.35}
            pixelSpin={0}
            fade={true}
            duration={850}
            pixelDuration={300}
            pattern="diagonal"
            trigger="click"
            active={isRevealed}
            onActiveChange={setIsRevealed}
            aspectRatio="16 / 11"
            className="w-full bg-transparent overflow-hidden cursor-pointer select-none"
          />

          {/* HOW I BUILD */}
          <div className="mt-12">
            <p className="font-inter text-xs tracking-[0.2em] uppercase text-black/50 mb-6">
              HOW I BUILD
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {HOW_I_BUILD.map(({ num, title, desc }) => (
                <div key={num} className="flex flex-col gap-2">
                  <span className="font-inter text-xs font-bold text-black/40">
                    {num}
                  </span>
                  <span className="font-sans font-bold text-sm text-black">
                    {title}
                  </span>
                  <span className="font-inter text-xs text-black/60 italic">
                    &quot;{desc}&quot;
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right column — Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <Terminal />
        </motion.div>
      </div>
    </section>
  );
}
