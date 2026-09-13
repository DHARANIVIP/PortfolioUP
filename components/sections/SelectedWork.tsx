"use client";

import { motion } from "framer-motion";
import EyebrowLabel from "@/components/ui/EyebrowLabel";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

export default function SelectedWork() {
  return (
    <section id="work" className="relative bg-ink py-28 px-6 overflow-hidden">
      {/* Giant watermark */}
      <span
        className="absolute -top-8 left-1/2 -translate-x-1/2 font-sans font-black text-[28vw] leading-none text-outline-white watermark pointer-events-none select-none"
        aria-hidden="true"
      >
        WORK
      </span>

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <EyebrowLabel number="03" label="SELECTED WORK" dark />
            <h2 className="font-sans font-black text-6xl md:text-8xl text-white mt-4 leading-none">
              Selected
              <br />
              <span className="text-outline-white">systems.</span>
            </h2>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="font-inter text-xs tracking-[0.2em] uppercase text-lime">
              04 / CASE STUDIES
            </span>
            <p className="font-inter text-sm text-white/50 max-w-[260px] text-right leading-relaxed">
              End-to-end systems engineered with precision — from backend infrastructure to intelligent user interfaces.
            </p>
          </div>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
