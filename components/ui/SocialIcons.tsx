"use client";

import { Linkedin, Github, Mail } from "lucide-react";

interface SocialIconsProps {
  vertical?: boolean;
  className?: string;
}

export default function SocialIcons({ vertical = false, className = "" }: SocialIconsProps) {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactElement = document.getElementById("contact");
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.hash = "contact";
    }
  };

  return (
    <div
      className={`flex ${vertical ? "flex-col" : "flex-row"} gap-2 ${className}`}
    >
      <a
        href="https://www.linkedin.com/in/dharani-v-92194a314/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn profile"
        className="
          w-9 h-9 rounded-lg bg-lime flex items-center justify-center
          text-black hover:bg-black hover:text-lime
          transition-all duration-200 border border-black/10
        "
      >
        <Linkedin size={16} strokeWidth={2} />
      </a>

      <a
        href="https://github.com/DHARANIVIP"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
        className="
          w-9 h-9 rounded-lg bg-lime flex items-center justify-center
          text-black hover:bg-black hover:text-lime
          transition-all duration-200 border border-black/10
        "
      >
        <Github size={16} strokeWidth={2} />
      </a>

      <a
        href="#contact"
        onClick={scrollToContact}
        aria-label="Scroll to contact section"
        className="
          w-9 h-9 rounded-lg bg-lime flex items-center justify-center
          text-black hover:bg-black hover:text-lime
          transition-all duration-200 border border-black/10 cursor-pointer
        "
      >
        <Mail size={16} strokeWidth={2} />
      </a>
    </div>
  );
}
