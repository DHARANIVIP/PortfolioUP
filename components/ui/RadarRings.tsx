"use client";

interface RadarRingsProps {
  color?: string;
  count?: number;
  size?: number;
  className?: string;
}

export default function RadarRings({
  color = "rgba(0,0,0,0.12)",
  count = 4,
  size = 300,
  className = "",
}: RadarRingsProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`absolute pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Grid lines */}
      <line x1={size / 2} y1={0} x2={size / 2} y2={size} stroke={color} strokeWidth="0.5" />
      <line x1={0} y1={size / 2} x2={size} y2={size / 2} stroke={color} strokeWidth="0.5" />
      <line x1={0} y1={0} x2={size} y2={size} stroke={color} strokeWidth="0.5" />
      <line x1={size} y1={0} x2={0} y2={size} stroke={color} strokeWidth="0.5" />

      {/* Concentric rings */}
      {Array.from({ length: count }).map((_, i) => {
        const r = ((i + 1) / (count + 1)) * (size / 2);
        const animClass = i % 2 === 0 ? "animate-rotateRing" : "animate-rotateRingReverse";
        return (
          <circle
            key={i}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={i === 0 ? "1" : "0.6"}
            strokeDasharray={i % 2 === 0 ? "4 6" : "2 8"}
            className={animClass}
            style={{ transformOrigin: `${size / 2}px ${size / 2}px` }}
          />
        );
      })}

      {/* Center dot */}
      <circle cx={size / 2} cy={size / 2} r={3} fill={color} />

      {/* Small dots on rings */}
      {Array.from({ length: count }).map((_, i) => {
        const r = ((i + 1) / (count + 1)) * (size / 2);
        return (
          <circle
            key={`dot-${i}`}
            cx={size / 2 + r}
            cy={size / 2}
            r={2.5}
            fill={color}
          />
        );
      })}
    </svg>
  );
}
