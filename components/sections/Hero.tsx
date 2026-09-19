"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import SocialIcons from "@/components/ui/SocialIcons";
import Image from "next/image";

function StatBlock({
  label,
  value,
  suffix,
  sublabel,
}: {
  label: string;
  value: number;
  suffix: string;
  sublabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const { count, start } = useCountUp(value, 1200);

  useEffect(() => {
    if (inView) start();
  }, [inView, start]);

  return (
    <div ref={ref} className="flex flex-col">
      <span className="font-inter text-[10px] tracking-[0.2em] uppercase text-black/60 mb-1">
        —— {label}
      </span>
      <span className="font-sans font-black text-5xl text-lime leading-none">
        {count}
        {suffix}
      </span>
      <span className="font-inter text-[11px] tracking-[0.15em] uppercase text-black/70 mt-1">
        {sublabel}
      </span>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden pt-16"
      style={{
        background: "linear-gradient(160deg, #A9D6F6 0%, #DBEFFB 60%, #EFF0E8 100%)",
      }}
    >
      {/* Fixed social icons — right edge */}
      <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40">
        <SocialIcons vertical />
      </div>

      {/* Giant name — background layer */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span
          className="font-sans font-black text-[22vw] leading-none tracking-tighter text-lime"
          style={{ letterSpacing: "-0.04em" }}
          aria-hidden="true"
        >
          DHARANI
        </span>
      </motion.div>

      {/* Content layer */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 h-[calc(100vh-4rem)] flex flex-col justify-between pb-12">
        {/* Top row — empty for name bg */}
        <div />

        {/* Middle row — stats left */}
        <motion.div
          className="flex flex-col gap-8"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <StatBlock label="VOLUME" value={4} suffix="+" sublabel="COMPLETED PROJECTS" />
          <StatBlock label="DURATION" value={1} suffix="+" sublabel="YEARS OF EXPERIENCE" />
        </motion.div>

        {/* Bottom — tagline */}
        <motion.div
          className="flex flex-col items-center text-center relative z-20 pb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <p
            className="font-sans font-black text-3xl md:text-5xl text-black leading-tight"
            style={{ textShadow: "0 2px 28px rgba(255,255,255,0.95), 0 0 10px rgba(255,255,255,0.8)" }}
          >
            Full Stack,
            <br />
            <span className="text-outline">Engineered</span> with{" "}
            <span className="bg-lime px-2 shadow-sm">Intelligence.</span>
          </p>
        </motion.div>
      </div>

      {/* Hero photo — centered arch frame */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[5] pointer-events-none select-none"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        <div
          className="relative w-[300px] sm:w-[360px] md:w-[420px] h-[450px] md:h-[580px] rounded-t-[150px] md:rounded-t-[210px] overflow-hidden border-2 border-black/10 shadow-2xl bg-white/20"
          style={{
            maskImage: "linear-gradient(to bottom, black 0%, black 65%, transparent 98%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 65%, transparent 98%)",
          }}
        >
          <Image
            src="/hero-photo.jpg"
            alt="Dharani V - Full Stack & AI Engineer"
            fill
            sizes="(max-width: 768px) 360px, 420px"
            priority
            className="object-cover object-[center_16%]"
          />
          {/* Subtle bottom tint overlay blending into hero background */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#EFF0E8] via-[#EFF0E8]/50 to-transparent pointer-events-none" />
        </div>
      </motion.div>
    </section>
  );
}
