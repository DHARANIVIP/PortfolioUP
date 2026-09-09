"use client";

import { useState, useEffect, useRef } from "react";

export function useCountUp(target: number, duration = 1200, startOnMount = false) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(startOnMount);
  const frameRef = useRef<number | null>(null);

  const start = () => setStarted(true);

  useEffect(() => {
    if (!started) return;

    const startTime = performance.now();

    function easeOut(t: number) {
      return 1 - Math.pow(1 - t, 3);
    }

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOut(progress);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setCount(target);
      }
    }

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [started, target, duration]);

  return { count, start };
}
