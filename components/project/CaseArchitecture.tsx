"use client";

import { motion } from "framer-motion";
import { Project } from "@/data/projects";

const NODE_COLORS: Record<string, string> = {
  client: "#DBEFFB",
  api:    "#E5FF1F",
  engine: "#E79AA6",
  data:   "#C5BAEE",
  output: "#27C93F22",
};

const NODE_BORDER: Record<string, string> = {
  client: "#3355FF",
  api:    "#000",
  engine: "#000",
  data:   "#000",
  output: "#27C93F",
};

interface CaseArchitectureProps {
  project: Project;
}

export default function CaseArchitecture({ project }: CaseArchitectureProps) {
  const W = 640;
  const H = 320;

  return (
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-[1400px] mx-auto">
        {/* Heading */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-sans font-black text-5xl md:text-7xl leading-none text-black">
            Real architecture,
            <br />
            <span className="text-outline">not a wireframe.</span>
          </h2>
        </motion.div>

        {/* Diagram */}
        <motion.div
          className="relative bg-white rounded-3xl border border-black/10 overflow-hidden p-8 shadow-neo"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full"
            style={{ maxHeight: 340 }}
            aria-label="System architecture diagram"
          >
            {/* Edges — dashed lines */}
            {project.archEdges.map((edge, i) => {
              const from = project.archNodes[edge.from];
              const to   = project.archNodes[edge.to];
              if (!from || !to) return null;
              const fx = from.x + 70;
              const fy = from.y + 20;
              const tx = to.x + 70;
              const ty = to.y + 20;
              return (
                <motion.line
                  key={i}
                  x1={fx} y1={fy} x2={tx} y2={ty}
                  stroke="#00000030"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
                />
              );
            })}

            {/* Nodes */}
            {project.archNodes.map((node, i) => {
              const bg     = NODE_COLORS[node.type] ?? "#f0f0f0";
              const border = NODE_BORDER[node.type] ?? "#000";
              const lines  = node.label.split("\n");
              return (
                <motion.g
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <rect
                    x={node.x}
                    y={node.y}
                    width={140}
                    height={44}
                    rx={8}
                    fill={bg}
                    stroke={border}
                    strokeWidth="1"
                  />
                  {lines.map((line, li) => (
                    <text
                      key={li}
                      x={node.x + 70}
                      y={node.y + (lines.length === 1 ? 27 : 19 + li * 14)}
                      textAnchor="middle"
                      fontSize="9"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="600"
                      fill="#000000cc"
                    >
                      {line}
                    </text>
                  ))}
                </motion.g>
              );
            })}
          </svg>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-black/10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#3355FF]" />
              <span className="font-inter text-[10px] tracking-[0.15em] uppercase text-black/50">REQUEST</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-lime" />
              <span className="font-inter text-[10px] tracking-[0.15em] uppercase text-black/50">EVENT</span>
            </div>
            <div className="ml-auto font-inter text-[10px] tracking-[0.1em] uppercase text-black/30">
              REAL-TIME SYSTEM MAP
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
