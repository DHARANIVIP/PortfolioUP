"use client";

import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import BarChart from "@/components/ui/BarChart";

interface CaseFeaturesProps {
  project: Project;
}

export default function CaseFeatures({ project }: CaseFeaturesProps) {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-sans font-black text-5xl md:text-7xl leading-none text-black">
            Built for
            <br />
            <span className="text-outline">real world pressure.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {project.features.map((feat, i) => (
            <motion.div
              key={i}
              className="bg-cream rounded-2xl p-8 border border-black/8 flex flex-col gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="flex items-end gap-3">
                <BarChart
                  bars={5}
                  accentIndex={i % 5}
                  accentColor="#E5FF1F"
                  baseColor="rgba(0,0,0,0.12)"
                  className="h-10"
                  animate
                />
                <span className="font-mono text-xs text-black/30 mb-1">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-sans font-bold text-lg text-black leading-tight">
                {feat.title}
              </h3>
              <p className="font-inter text-sm text-black/60 leading-relaxed">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
