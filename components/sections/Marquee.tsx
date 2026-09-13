"use client";

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
    <div className="w-full bg-white border-y border-black overflow-hidden py-4">
      <div className="marquee-track flex items-center gap-0 whitespace-nowrap w-max">
        {WORDS.map((word, i) => (
          <span key={i} className="flex items-center">
            <span
              className={`font-sans font-black text-sm md:text-base tracking-[0.15em] px-4 ${
                i % 2 === 0 ? "text-black" : "text-outline"
              }`}
            >
              {word}
            </span>
            <span className="text-lime font-black text-lg">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
