"use client";

import { useState, useEffect, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

export function useScrambleText(words: string[], interval = 2500) {
  const [displayText, setDisplayText] = useState(words[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const iterationRef = useRef(0);

  useEffect(() => {
    const cycleInterval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % words.length;
      const target = words[nextIndex];
      iterationRef.current = 0;

      if (frameRef.current) clearInterval(frameRef.current);

      frameRef.current = setInterval(() => {
        const iteration = iterationRef.current;
        const scrambled = target
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < Math.floor(iteration / 2)) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");

        setDisplayText(scrambled);
        iterationRef.current += 1;

        if (iteration >= target.length * 2) {
          clearInterval(frameRef.current!);
          setDisplayText(target);
          setCurrentIndex(nextIndex);
        }
      }, 40);
    }, interval);

    return () => {
      clearInterval(cycleInterval);
      if (frameRef.current) clearInterval(frameRef.current);
    };
  }, [words, interval, currentIndex]);

  return displayText;
}
