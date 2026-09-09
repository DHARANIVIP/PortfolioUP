"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useScrambleText } from "@/hooks/useScrambleText";
import SocialIcons from "@/components/ui/SocialIcons";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "HOME", href: "#hero" },
  { label: "ABOUT ME", href: "#about" },
  { label: "PROJECTS", href: "#work" },
  { label: "STACK", href: "#stack" },
  { label: "CONTACT", href: "#contact" },
];

const ROTATING_WORDS = ["AI AGENTS", "FULL-STACK APPS", "RAG SYSTEMS", "DEEPFAKE DETECTION"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const currentWord = useScrambleText(ROTATING_WORDS, 2500);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${scrolled ? "bg-white/90 backdrop-blur-md border-b border-black/10 shadow-sm" : "bg-transparent"}
        `}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left: Logo */}
          <Link
            href="/"
            className="font-sans font-black text-xl tracking-tight text-black"
          >
            DV
          </Link>

          {/* Center: Nav links — desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="font-inter text-xs font-medium tracking-[0.15em] uppercase text-black hover:text-black/50 transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right: Rotating word — desktop */}
          <div className="hidden lg:flex flex-col items-end">
            <div className="flex items-center gap-2">
              <span className="font-inter text-[10px] tracking-[0.2em] uppercase text-black/50">
                CURRENTLY CRAFTING ——
              </span>
              <span className="font-mono text-xs font-medium text-lime bg-black px-2 py-0.5 rounded">
                {currentWord}
              </span>
            </div>
            <p className="font-inter text-[10px] text-black/40 mt-0.5 max-w-[280px] text-right">
              Transforming complex problems into elegant, scalable digital solutions.
            </p>
          </div>

          {/* Mobile: hamburger */}
          <button
            className="lg:hidden text-black p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col pt-20 px-8 pb-10 lg:hidden">
          <nav className="flex flex-col gap-6 flex-1">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="font-sans font-black text-4xl text-black hover:text-lime transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="mt-auto">
            <p className="font-inter text-xs text-black/40 mb-4 tracking-widest uppercase">
              CURRENTLY CRAFTING — {currentWord}
            </p>
            <SocialIcons />
          </div>
        </div>
      )}
    </>
  );
}
