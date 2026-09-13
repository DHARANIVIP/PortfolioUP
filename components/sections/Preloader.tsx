"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LABELS = [
  "SYSTEM INITIALIZATION",
  "LOADING PROFILE",
  "COMPILING PROJECTS",
  "ALMOST READY",
];

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const duration = 2200;
    const steps = 100;
    const stepTime = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 700);
        }, 300);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  const labelIndex = Math.min(Math.floor(count / 26), LABELS.length - 1);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-sky-hero overflow-hidden"
          exit={{ y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Big count */}
          <div className="flex items-end leading-none select-none">
            <motion.span
              className="font-sans font-black text-[22vw] text-lime leading-none"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {count}
            </motion.span>
            <span className="font-sans font-black text-[8vw] text-lime mb-[2vw] ml-1">
              %
            </span>
          </div>

          {/* Lime rule */}
          <div
            className="h-px bg-lime mt-4"
            style={{ width: `${count}%`, maxWidth: "60vw", transition: "width 0.05s linear" }}
          />

          {/* Label */}
          <motion.p
            key={labelIndex}
            className="mt-6 font-inter text-xs tracking-[0.3em] uppercase text-black/70"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {LABELS[labelIndex]}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
