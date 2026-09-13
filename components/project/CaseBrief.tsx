"use client";

import { motion } from "framer-motion";
import { Project } from "@/data/projects";

interface CaseBriefProps {
  project: Project;
}

export default function CaseBrief({ project }: CaseBriefProps) {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Heading */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-inter text-xs tracking-[0.2em] uppercase text-black/40 mb-4">
              01 — THE BRIEF
            </p>
            <h2 className="font-sans font-black text-4xl text-black leading-tight">
              What was built &amp; why.
            </h2>
          </motion.div>
        </div>

        {/* Body */}
        <div className="lg:col-span-2">
          <motion.p
            className="font-serif italic text-xl md:text-2xl text-black/80 leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {project.briefLong}
          </motion.p>

          {/* Stack pill list */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <p className="font-inter text-[10px] tracking-[0.2em] uppercase text-black/40 mb-3">
              STACK
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-black text-white font-inter text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
