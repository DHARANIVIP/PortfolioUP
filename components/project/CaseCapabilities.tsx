"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Project } from "@/data/projects";

interface CaseCapabilitiesProps {
  project: Project;
}

export default function CaseCapabilities({ project }: CaseCapabilitiesProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 px-6 bg-ink">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-sans font-black text-5xl md:text-7xl leading-none text-white">
            Designed
            <br />
            <span className="text-outline-white">to deliver.</span>
          </h2>
        </motion.div>

        <div className="flex flex-col divide-y divide-white/10">
          {project.capabilities.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <button
                className="w-full flex items-center justify-between py-6 text-left group"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="font-sans font-black text-xl md:text-2xl text-white group-hover:text-lime transition-colors tracking-tight">
                  {cap.name.toUpperCase()}
                </span>
                <div className="flex items-center gap-4">
                  <span className="font-inter text-xs tracking-widest uppercase text-white/30 group-hover:text-lime transition-colors hidden sm:block">
                    VIEW DETAIL
                  </span>
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-lime group-hover:border-lime transition-all">
                    <motion.div
                      animate={{ rotate: openIndex === i ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ChevronDown
                        size={14}
                        className="text-white group-hover:text-black transition-colors"
                      />
                    </motion.div>
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 flex items-start justify-between gap-4">
                      <p className="font-inter text-sm text-white/60 leading-relaxed max-w-2xl">
                        {cap.detail}
                      </p>
                      <div className="w-8 h-8 rounded-full bg-lime flex items-center justify-center flex-shrink-0">
                        <ArrowUpRight size={14} className="text-black" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
