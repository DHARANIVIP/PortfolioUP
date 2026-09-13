"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Project } from "@/data/projects";

interface CaseNextProjectProps {
  nextProject: Project;
  nextIndex: string;
}

export default function CaseNextProject({ nextProject, nextIndex }: CaseNextProjectProps) {
  return (
    <section className="bg-ink py-24 px-6 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto">
        <p className="font-inter text-xs tracking-[0.2em] uppercase text-white/30 mb-4">
          NEXT CASE / {nextIndex}
        </p>
        <p className="font-inter text-sm text-white/40 mb-8">Continue exploring</p>

        <Link href={`/project/${nextProject.slug}`} className="group flex items-end justify-between gap-6">
          <motion.h2
            className="font-sans font-black text-[10vw] md:text-[8vw] leading-none text-white group-hover:text-lime transition-colors"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {nextProject.title}
          </motion.h2>
          <motion.div
            className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center flex-shrink-0 group-hover:bg-lime transition-colors mb-2"
            whileHover={{ scale: 1.1 }}
          >
            <ArrowRight size={28} className="text-black" />
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
