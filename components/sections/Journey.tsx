"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import EyebrowLabel from "@/components/ui/EyebrowLabel";
import { journeyChapters } from "@/data/projects";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Journey() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true });
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Let GSAP pick up Lenis scroll events
    const lenis = (window as unknown as Record<string, unknown>).lenis as { on: (e: string, cb: () => void) => void } | undefined;
    if (lenis) {
      lenis.on("scroll", () => ScrollTrigger.update());
    }

    const ctx = gsap.context(() => {
      const totalScroll = track.scrollWidth - window.innerWidth + 80;

      gsap.to(track, {
        x: () => -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            setProgress(self.progress);
            setActiveIndex(Math.round(self.progress * (journeyChapters.length - 1)));
          },
        },
      });
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  const activeLabel = `${String(activeIndex + 1).padStart(2, "0")} / ${String(journeyChapters.length).padStart(2, "0")}`;

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative bg-sky-light overflow-hidden"
    >
      {/* Header — sticky inside pinned section */}
      <div
        ref={headerRef}
        className="relative z-10 max-w-[1400px] mx-auto px-6 pt-20 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div>
          <EyebrowLabel number="02" label="THE JOURNEY" />
          <h2 className="font-sans font-black text-6xl md:text-8xl text-black mt-4 leading-none">
            The Journey
            <span className="text-lime">.</span>
          </h2>
          <p className="font-inter text-xs tracking-[0.25em] uppercase text-black/40 mt-3">
            SCROLL TO EXPLORE
          </p>
        </div>

        {/* Progress indicator */}
        <div className="flex flex-col items-end gap-2">
          <motion.span
            className="font-mono text-sm font-bold text-black"
            animate={{ opacity: 1 }}
          >
            {activeLabel}
          </motion.span>
          {/* Progress bar */}
          <div className="w-32 h-px bg-black/20 relative">
            <motion.div
              className="absolute top-0 left-0 h-full bg-black"
              style={{ scaleX: progress, transformOrigin: "left" }}
            />
          </div>
        </div>
      </div>

      {/* Cards track */}
      <div
        ref={trackRef}
        className={`flex gap-6 px-6 pb-20 ${isMobile ? "flex-col" : ""}`}
        style={{ width: isMobile ? "100%" : "max-content" }}
      >
        {journeyChapters.map((chapter, i) => {
          const isActive = i === activeIndex;
          return (
            <motion.div
              key={i}
              className={`journey-card relative flex-shrink-0 rounded-2xl border border-black/10 bg-white p-8 overflow-hidden
                ${isMobile ? "w-full" : "w-[380px] md:w-[420px]"}
                ${isActive && !isMobile ? "active" : !isMobile ? "inactive" : ""}
              `}
              initial={{ opacity: 0, y: 30 }}
              animate={isMobile ? (inView ? { opacity: 1, y: 0 } : {}) : { opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Giant faint year watermark */}
              <span
                className="absolute -right-4 top-1/2 -translate-y-1/2 font-sans font-black text-[140px] leading-none text-black watermark pointer-events-none select-none"
                aria-hidden="true"
              >
                {chapter.year}
              </span>

              {/* Content */}
              <div className="relative z-10">
                <span className="font-inter text-xs tracking-[0.2em] uppercase text-black/40">
                  {chapter.chapter}
                </span>
                <h3 className="font-sans font-black text-5xl md:text-6xl text-black mt-3 leading-none">
                  {chapter.year}
                </h3>
                <div className="flex items-center gap-3 mt-4 mb-6">
                  <span className="font-sans font-black text-xl text-black">
                    {chapter.title}
                  </span>
                  <div className="flex-1 h-0.5 bg-lime" />
                </div>
                <p className="font-inter text-sm text-black/70 leading-relaxed max-w-[320px]">
                  {chapter.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
