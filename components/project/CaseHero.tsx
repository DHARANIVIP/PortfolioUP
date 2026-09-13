"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";

interface CaseHeroProps {
  project: Project;
  caseNum: string;
  totalCases: string;
}

export default function CaseHero({ project, caseNum, totalCases }: CaseHeroProps) {
  return (
    <>
      {/* Top sticky bar */}
      <div className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b border-black/10">
        <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/#work"
            className="flex items-center gap-2 font-inter text-xs tracking-widest uppercase text-black/60 hover:text-black transition-colors"
          >
            <ArrowLeft size={14} />
            WORK
          </Link>
          <span className="font-inter text-xs tracking-widest uppercase text-black/50">
            DHARANI V / CASE {caseNum}
          </span>
          <Link
            href="/#contact"
            className="flex items-center gap-2 font-inter text-xs tracking-widest uppercase text-black/60 hover:text-black transition-colors"
          >
            CONTACT
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* Secondary info bar */}
      <div className="bg-white border-b border-black/10">
        <div className="max-w-[1400px] mx-auto px-6 h-11 flex items-center justify-between">
          <span className="font-mono text-xs text-black/40">
            {caseNum} / {totalCases}
          </span>
          <span className="font-inter text-xs tracking-[0.2em] uppercase text-black/60">
            {project.category}
          </span>
          <div className="flex items-center gap-2">
            {project.liveUrl ? (
              <>
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="font-inter text-[10px] tracking-widest uppercase text-blue-500">
                  LIVE / {caseNum}
                </span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 rounded-full bg-black/30" />
                <span className="font-inter text-[10px] tracking-widest uppercase text-black/40">
                  CODE ONLY
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Hero block */}
      <div
        className="relative py-24 px-6 overflow-hidden"
        style={{ backgroundColor: project.cardColorHex }}
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Glitch title */}
          <div className="relative mb-10">
            <motion.h1
              className="font-sans font-black text-[10vw] md:text-[8vw] leading-none text-black tracking-tighter"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {project.title}
            </motion.h1>
            {/* RGB glitch layer 1 */}
            <motion.div
              className="absolute inset-0 font-sans font-black text-[10vw] md:text-[8vw] leading-none tracking-tighter text-red-500/30 pointer-events-none"
              initial={{ x: -8, opacity: 1 }}
              animate={{ x: 0, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              aria-hidden="true"
            >
              {project.title}
            </motion.div>
            {/* RGB glitch layer 2 */}
            <motion.div
              className="absolute inset-0 font-sans font-black text-[10vw] md:text-[8vw] leading-none tracking-tighter text-blue-500/30 pointer-events-none"
              initial={{ x: 8, opacity: 1 }}
              animate={{ x: 0, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              aria-hidden="true"
            >
              {project.title}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Description */}
            <motion.p
              className="font-serif italic text-xl md:text-2xl text-black/80 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {project.briefLong}
            </motion.p>

            {/* Metadata */}
            <motion.div
              className="flex flex-col gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {/* Stats mockup */}
              <div className="bg-white/80 rounded-2xl p-6 border border-black/10 shadow-neo-black">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-mono text-xs text-black/40 mb-1">PERFORMANCE</p>
                    <p className="font-sans font-black text-3xl text-black">94.8</p>
                  </div>
                  <div>
                    <p className="font-mono text-xs text-black/40 mb-1">UPTIME</p>
                    <p className="font-sans font-black text-3xl text-black">24/7</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2 flex-wrap">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full bg-black/5 border border-black/10 font-inter text-[10px] text-black/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-inter text-[10px] tracking-[0.15em] uppercase text-black/40">ROLE</p>
                  <p className="font-sans font-bold text-sm text-black mt-1">{project.role}</p>
                </div>
                <div>
                  <p className="font-inter text-[10px] tracking-[0.15em] uppercase text-black/40">FOCUS</p>
                  <p className="font-sans font-bold text-sm text-black mt-1">{project.focus}</p>
                </div>
              </div>

              {/* Live link */}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-black text-white px-5 py-3 rounded-full font-inter text-xs tracking-widest uppercase hover:bg-lime hover:text-black transition-colors w-fit"
                >
                  View Live Project <ArrowUpRight size={14} />
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
