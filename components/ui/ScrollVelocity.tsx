"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

interface VelocityMapping {
  input: [number, number];
  output: [number, number];
}

interface VelocityTextProps {
  children: React.ReactNode;
  baseVelocity: number;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
  pauseOnHover?: boolean;
}

export interface ScrollVelocityProps {
  scrollContainerRef?: React.RefObject<HTMLElement>;
  texts?: React.ReactNode[];
  children?: React.ReactNode;
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
  pauseOnHover?: boolean;
}

function useElementWidth<T extends HTMLElement>(ref: React.RefObject<T | null>): number {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }

    updateWidth();

    // Re-measure when custom fonts (e.g. Google Fonts) finish loading
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(updateWidth);
    }

    const currentRef = ref.current;
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && currentRef) {
      resizeObserver = new ResizeObserver(() => updateWidth());
      resizeObserver.observe(currentRef);
    }

    window.addEventListener("resize", updateWidth);
    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, [ref]);

  return width;
}

function VelocityText({
  children,
  baseVelocity,
  scrollContainerRef,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = "",
  scrollerClassName = "",
  parallaxStyle,
  scrollerStyle,
  pauseOnHover = true,
}: VelocityTextProps) {
  const baseX = useMotionValue(0);
  const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
  const { scrollY } = useScroll(scrollOptions);
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: damping ?? 50,
    stiffness: stiffness ?? 400,
  });
  const velocityFactor = useTransform(
    smoothVelocity,
    velocityMapping?.input || [0, 1000],
    velocityMapping?.output || [0, 5],
    { clamp: false }
  );

  const copyRef = useRef<HTMLSpanElement>(null);
  const copyWidth = useElementWidth(copyRef);
  const [isHovered, setIsHovered] = useState(false);

  function wrap(min: number, max: number, v: number): number {
    const range = max - min;
    if (range === 0) return 0;
    const mod = (((v - min) % range) + range) % range;
    return mod + min;
  }

  const x = useTransform(baseX, (v) => {
    if (copyWidth === 0) return "0px";
    return `${wrap(-copyWidth, 0, v)}px`;
  });

  const directionFactor = useRef<number>(baseVelocity < 0 ? 1 : -1);

  useAnimationFrame((_, delta) => {
    if (pauseOnHover && isHovered) return;

    // Base movement in delta-time
    let moveBy = directionFactor.current * Math.abs(baseVelocity) * (delta / 1000);

    // React Bits dynamic direction & velocity multiplier based on scroll
    const currentVelocity = velocityFactor.get();
    if (currentVelocity < -0.1) {
      directionFactor.current = 1; // Reverse on scroll up
    } else if (currentVelocity > 0.1) {
      directionFactor.current = -1; // Natural left-flow on scroll down
    }

    // Multiply movement proportionally with scroll speed
    moveBy += directionFactor.current * Math.abs(baseVelocity) * (delta / 1000) * Math.abs(currentVelocity);

    baseX.set(baseX.get() + moveBy);
  });

  const spans = [];
  for (let i = 0; i < (numCopies ?? 6); i++) {
    spans.push(
      <span
        className={`flex-shrink-0 inline-flex items-center ${className}`}
        key={i}
        ref={i === 0 ? copyRef : null}
      >
        {children}
      </span>
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${parallaxClassName}`}
      style={parallaxStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className={`flex whitespace-nowrap will-change-transform select-none ${scrollerClassName}`}
        style={{ x, ...scrollerStyle }}
      >
        {spans}
      </motion.div>
    </div>
  );
}

export function ScrollVelocity({
  scrollContainerRef,
  texts,
  children,
  velocity = 60,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = "",
  scrollerClassName = "",
  parallaxStyle,
  scrollerStyle,
  pauseOnHover = true,
}: ScrollVelocityProps) {
  const contentList = texts && texts.length > 0 ? texts : [children];

  return (
    <div className="w-full">
      {contentList.map((item, index) => (
        <VelocityText
          key={index}
          className={className}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
          pauseOnHover={pauseOnHover}
        >
          {item}
        </VelocityText>
      ))}
    </div>
  );
}

export default ScrollVelocity;
