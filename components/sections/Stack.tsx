"use client";

import { motion } from "framer-motion";
import { Monitor, Server, Brain, Database, Cloud } from "lucide-react";
import EyebrowLabel from "@/components/ui/EyebrowLabel";
import { stackCategories } from "@/data/projects";

const ICON_MAP: Record<string, React.ElementType> = {
  monitor: Monitor,
  server: Server,
  brain: Brain,
  database: Database,
  cloud: Cloud,
};

export default function Stack() {
  return (
    <section id="stack" className="relative bg-sky-light py-28 px-6 overflow-hidden">
      {/* Watermark */}
      <span
        className="absolute top-0 right-0 font-sans font-black text-[22vw] leading-none text-outline watermark pointer-events-none select-none"
        aria-hidden="true"
      >
        STACK
      </span>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <EyebrowLabel number="04" label="CAPABILITIES" />
            <h2 className="font-sans font-black text-6xl md:text-8xl text-black mt-4 leading-none">
              The{" "}
              <span className="text-outline">Stack.</span>
            </h2>
          </div>
          <p className="font-serif italic text-black/60 text-lg max-w-[340px] lg:text-right leading-relaxed">
            One connected toolkit for shaping the interface, engineering the system and shipping it reliably.
          </p>
        </div>

        {/* Cards row */}
        <div className="flex flex-col lg:flex-row gap-0">
          {stackCategories.map((cat, i) => {
            const Icon = ICON_MAP[cat.icon] || Monitor;
            const isLast = i === stackCategories.length - 1;
            return (
              <div key={cat.index} className="flex items-stretch flex-1">
                <motion.div
                  className="flex-1 bg-white rounded-2xl p-6 border border-black/10 flex flex-col gap-4"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 border border-black/20 rounded-lg flex items-center justify-center">
                      <Icon size={18} strokeWidth={1.5} />
                    </div>
                    <span className="font-mono text-xs text-black/30 font-bold">{cat.index}</span>
                  </div>

                  {/* Category */}
                  <div>
                    <p className="font-inter text-[10px] tracking-[0.2em] uppercase text-black/40 mb-1">
                      {cat.eyebrow}
                    </p>
                    <h3 className="font-sans font-bold text-base text-black leading-tight">
                      {cat.title}
                    </h3>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {cat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full bg-black/5 border border-black/10 font-inter text-[10px] text-black/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Connector between cards */}
                {!isLast && (
                  <div className="hidden lg:flex items-center justify-center w-8 flex-shrink-0">
                    <div className="flex flex-col items-center gap-1">
                      <div className="h-12 border-l border-dashed border-black/20" />
                      <motion.div
                        className="w-5 h-5 rounded-full border border-black/30 flex items-center justify-center bg-white"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-lime" />
                      </motion.div>
                      <div className="h-12 border-l border-dashed border-black/20" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer line */}
        <div className="flex items-center justify-between mt-12 pt-6 border-t border-black/10">
          <p className="font-inter text-xs text-black/50">
            <span className="font-mono">{"{...}"}</span> Building scalable systems. Solving real-world problems.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-lime" />
            <span className="font-inter text-[10px] tracking-[0.2em] uppercase text-black/50">
              BUILT TO CREATE IMPACT
            </span>
          </div>
        </div>

        {/* Transition to contact */}
        <div className="flex items-center justify-between mt-16">
          <div>
            <span className="font-inter text-xs text-black/30 tracking-widest">05 / NEXT</span>
            <p className="font-sans font-black text-2xl text-black mt-1">
              Have a system to build?
            </p>
          </div>
          <a
            href="#contact"
            className="w-14 h-14 rounded-full bg-black flex items-center justify-center hover:bg-lime transition-colors group"
            aria-label="Go to contact"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 4v12M4 10l6 6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" className="group-hover:stroke-black transition-colors" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
