"use client";

import { motion } from "framer-motion";

interface BarChartProps {
  bars?: number;
  accentIndex?: number;
  accentColor?: string;
  baseColor?: string;
  className?: string;
  animate?: boolean;
}

export default function BarChart({
  bars = 5,
  accentIndex = 4,
  accentColor = "#E5FF1F",
  baseColor = "#00000033",
  className = "",
  animate = true,
}: BarChartProps) {
  const heights = [40, 65, 50, 80, 100];

  return (
    <div className={`flex items-end gap-[3px] ${className}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => {
        const h = heights[i % heights.length];
        const isAccent = i === accentIndex;
        return (
          <motion.div
            key={i}
            className="w-[5px] rounded-sm"
            style={{
              backgroundColor: isAccent ? accentColor : baseColor,
              height: animate ? 0 : `${h}%`,
            }}
            initial={animate ? { height: 0 } : false}
            whileInView={animate ? { height: `${h}%` } : undefined}
            transition={{
              duration: 0.5,
              delay: i * 0.08,
              ease: "easeOut",
            }}
            viewport={{ once: true }}
          />
        );
      })}
    </div>
  );
}
