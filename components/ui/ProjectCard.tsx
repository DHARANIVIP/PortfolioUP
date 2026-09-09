"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";
import RadarRings from "./RadarRings";
import BarChart from "./BarChart";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const isLight = project.cardColorHex === "#E5FF1F" || project.cardColorHex === "#DBEFFB";
  const textColor = isLight ? "text-black" : "text-black";

  return (
    <motion.div
      className="group project-card rounded-2xl overflow-hidden border border-black/10 cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ scale: 1.02 }}
    >
      <Link href={`/project/${project.slug}`} className="block">
        {/* Graphic top half */}
        <div
          className="relative overflow-hidden"
          style={{ backgroundColor: project.cardColorHex, minHeight: 260 }}
        >
          {/* Radar rings */}
          <RadarRings
            color={isLight ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0.12)"}
            count={4}
            size={320}
            className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />

          {/* Giant faint index watermark */}
          <span
            className={`absolute -right-4 -bottom-6 font-sans font-black text-[140px] leading-none ${textColor} watermark`}
            aria-hidden="true"
          >
            {project.index}
          </span>

          {/* Floating widget — top right */}
          <div className="absolute top-4 right-4 bg-white/90 rounded-xl p-3 flex items-center gap-3 border border-black/10 shadow-sm">
            <BarChart
              bars={5}
              accentIndex={4}
              accentColor="#E5FF1F"
              baseColor="rgba(0,0,0,0.15)"
              className="h-8"
              animate
            />
            <div className="flex flex-col">
              <span className="font-mono text-[9px] text-black/50 tracking-widest">SYS</span>
              <span className="font-mono text-[11px] font-bold text-black">/ {project.index}</span>
            </div>
            <motion.div
              className="w-7 h-7 rounded-full bg-black flex items-center justify-center ml-1"
              whileHover={{ rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight size={12} color="white" />
            </motion.div>
          </div>

          {/* Category label — bottom left */}
          <div className="absolute bottom-4 left-4">
            <span className={`font-inter text-[10px] tracking-[0.2em] uppercase ${textColor} opacity-60`}>
              CASE STUDY · {project.category}
            </span>
          </div>
        </div>

        {/* Footer — cream */}
        <div className="bg-cream p-6">
          <div className="flex items-start justify-between mb-3">
            <span className="font-mono text-xs text-black/40">{project.index}</span>
            <span className="font-inter text-[10px] tracking-[0.15em] uppercase text-black/50">
              {project.category}
            </span>
          </div>

          <h3 className="font-sans font-black text-3xl md:text-4xl text-black leading-tight mb-3">
            {project.title}
          </h3>

          <p className="font-inter text-sm text-black/60 leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full bg-black/8 border border-black/10 font-inter text-[10px] text-black/60"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center justify-between">
            <span className="font-inter text-xs text-black/50 tracking-wide">
              Explore case study
            </span>
            <motion.div
              className="w-9 h-9 rounded-full bg-black flex items-center justify-center"
              whileHover={{ scale: 1.15, rotate: 10 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowUpRight size={16} color="white" />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
