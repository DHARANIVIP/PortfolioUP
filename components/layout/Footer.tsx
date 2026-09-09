"use client";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-ink border-t border-white/10 py-6 px-6">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-inter text-xs text-white/30 text-center sm:text-left">
          © 2026 Dharani V. Built with Next.js &amp; a lot of curiosity.
        </p>
        <button
          onClick={scrollToTop}
          className="font-inter text-xs text-white/30 hover:text-lime transition-colors tracking-widest uppercase flex items-center gap-2"
          aria-label="Back to top"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
