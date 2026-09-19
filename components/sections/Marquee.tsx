"use client";

import ScrollVelocity from "@/components/ui/ScrollVelocity";

const WORDS = [
  "DESIGN",
  "BUILD",
  "DEPLOY",
  "DEBUG",
  "SHIP",
  "LEARN",
  "REPEAT",
  "DESIGN",
  "BUILD",
  "DEPLOY",
  "DEBUG",
  "SHIP",
  "LEARN",
  "REPEAT",
];

export default function MarqueeTicker() {
  return (
    <div className="w-full bg-white border-y border-black overflow-hidden py-3.5 md:py-4 select-none relative z-20">
      <ScrollVelocity
        velocity={55}
        damping={45}
        stiffness={350}
        numCopies={6}
        pauseOnHover={true}
        scrollerClassName="flex items-center"
      >
        <div className="flex items-center">
          {WORDS.map((word, i) => (
            <span key={i} className="inline-flex items-center">
              <span
                className={`font-sans font-black text-sm md:text-base tracking-[0.15em] px-4 md:px-5 transition-transform duration-200 hover:scale-110 cursor-default ${
                  i % 2 === 0 ? "text-black" : "text-outline"
                }`}
              >
                {word}
              </span>
              <span className="text-lime font-black text-base md:text-lg select-none px-1">
                •
              </span>
            </span>
          ))}
        </div>
      </ScrollVelocity>
    </div>
  );
}
