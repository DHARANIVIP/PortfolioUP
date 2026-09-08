"use client";

import { ArrowUpRight } from "lucide-react";

interface CircleArrowProps {
  size?: number;
  dark?: boolean;
  className?: string;
  rotate?: boolean;
}

export default function CircleArrow({
  size = 40,
  dark = true,
  className = "",
  rotate = false,
}: CircleArrowProps) {
  return (
    <div
      className={`
        rounded-full flex items-center justify-center flex-shrink-0
        transition-all duration-300
        ${dark
          ? "bg-black text-white hover:bg-lime hover:text-black"
          : "bg-white text-black hover:bg-lime"
        }
        ${rotate ? "group-hover:rotate-45" : ""}
        ${className}
      `}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <ArrowUpRight size={size * 0.4} strokeWidth={2.5} />
    </div>
  );
}
