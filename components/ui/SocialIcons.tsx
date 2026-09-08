"use client";

import { Linkedin, Github, Mail } from "lucide-react";

const socials = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/dharani-v-92194a314/",
    label: "LinkedIn",
  },
  {
    icon: Github,
    href: "https://github.com/DHARANIVIP",
    label: "GitHub",
  },
  {
    icon: Mail,
    href: "mailto:vvdharani57@gmail.com",
    label: "Email",
  },
];

interface SocialIconsProps {
  vertical?: boolean;
  className?: string;
}

export default function SocialIcons({ vertical = false, className = "" }: SocialIconsProps) {
  return (
    <div
      className={`flex ${vertical ? "flex-col" : "flex-row"} gap-2 ${className}`}
    >
      {socials.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto") ? "_self" : "_blank"}
          rel="noopener noreferrer"
          aria-label={label}
          className="
            w-9 h-9 rounded-lg bg-lime flex items-center justify-center
            text-black hover:bg-black hover:text-lime
            transition-all duration-200 border border-black/10
          "
        >
          <Icon size={16} strokeWidth={2} />
        </a>
      ))}
    </div>
  );
}
