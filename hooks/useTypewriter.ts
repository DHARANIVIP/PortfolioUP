"use client";

import { useState, useEffect } from "react";

export type TypewriterLine = {
  text: string;
  delay?: number; // ms delay before this line starts typing
};

export function useTypewriter(lines: TypewriterLine[], charDelay = 35) {
  // visibleLines[i] = how many chars of line i are shown
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [started, setStarted] = useState(false);

  const start = () => setStarted(true);

  useEffect(() => {
    if (!started) return;

    let cancelled = false;
    const result: string[] = [];

    async function typeAll() {
      for (let i = 0; i < lines.length; i++) {
        const { text, delay = 300 } = lines[i];

        // Wait the pre-line delay
        await new Promise((r) => setTimeout(r, delay));
        if (cancelled) return;

        // Push empty string for this line
        result.push("");
        setVisibleLines([...result]);

        // Type character by character
        for (let c = 0; c < text.length; c++) {
          await new Promise((r) => setTimeout(r, charDelay));
          if (cancelled) return;
          result[i] = text.slice(0, c + 1);
          setVisibleLines([...result]);
        }
      }
    }

    typeAll();

    return () => {
      cancelled = true;
    };
  }, [started, lines, charDelay]);

  return { visibleLines, start };
}
