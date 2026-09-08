"use client";

interface EyebrowLabelProps {
  number: string;
  label: string;
  dark?: boolean;
}

export default function EyebrowLabel({ number, label, dark = false }: EyebrowLabelProps) {
  return (
    <div className={`flex items-center gap-3 ${dark ? "text-white" : "text-black"}`}>
      <span
        className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold font-inter
          ${dark ? "bg-white text-black" : "bg-black text-white"}`}
      >
        {number}
      </span>
      <div className={`h-px w-8 ${dark ? "bg-white/40" : "bg-black/40"}`} />
      <span className="text-xs font-inter font-medium tracking-[0.2em] uppercase">
        {label}
      </span>
    </div>
  );
}
