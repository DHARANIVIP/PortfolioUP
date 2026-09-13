"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Linkedin, Github, Mail, Phone } from "lucide-react";
import EyebrowLabel from "@/components/ui/EyebrowLabel";

const LINKS = [
  {
    num: "01",
    label: "LINKEDIN",
    sub: "PROFESSIONAL NETWORK",
    href: "https://www.linkedin.com/in/dharani-v-92194a314/",
    icon: Linkedin,
  },
  {
    num: "02",
    label: "GITHUB",
    sub: "CODE & EXPERIMENTS",
    href: "https://github.com/DHARANIVIP",
    icon: Github,
  },
  {
    num: "03",
    label: "EMAIL",
    sub: "DIRECT CONVERSATION",
    href: "mailto:vvdharani57@gmail.com",
    icon: Mail,
  },
  {
    num: "04",
    label: "PHONE",
    sub: "CALL DIRECTLY",
    href: "tel:+919043967731",
    icon: Phone,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-ink py-28 px-6 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Top row */}
        <div className="flex items-start justify-between mb-16 flex-col md:flex-row gap-4">
          <EyebrowLabel number="05" label="CONTACT" dark />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="font-inter text-[10px] tracking-[0.2em] uppercase text-white/50">
              AVAILABLE FOR SELECT PROJECTS
            </span>
          </div>
        </div>

        {/* Giant heading */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-sans font-black leading-[0.95] tracking-tighter">
            <span className="block text-white text-[12vw] md:text-[10vw]">LET&apos;S CREATE</span>
            <span className="block text-outline-white text-[12vw] md:text-[10vw]">SOMETHING THAT</span>
            <span className="block text-lime text-[12vw] md:text-[10vw] flex items-center gap-6">
              MATTERS.
              <span className="inline-flex w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-lime items-center justify-center">
                <ArrowUpRight size={28} className="text-lime" />
              </span>
            </span>
          </h2>
        </motion.div>

        {/* CTA box */}
        <motion.div
          className="relative mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div
            className="bg-lime rounded-2xl p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:-translate-y-1 transition-transform duration-300 shadow-neo"
          >
            <div>
              <p className="font-inter text-[10px] tracking-[0.2em] uppercase text-black/50 mb-2">
                START A CONVERSATION
              </p>
              <a
                href="mailto:vvdharani57@gmail.com"
                className="font-sans font-black text-2xl md:text-4xl text-black hover:underline"
              >
                vvdharani57@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-inter text-sm text-black/60 max-w-[220px] leading-relaxed">
                Tell me about the product, system, or idea you want to bring to life.
              </p>
              <a
                href="mailto:vvdharani57@gmail.com"
                className="w-14 h-14 rounded-full bg-black flex items-center justify-center hover:bg-white transition-colors flex-shrink-0 group"
                aria-label="Send email"
              >
                <ArrowUpRight size={20} className="text-white group-hover:text-black transition-colors" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Links grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
          {LINKS.map(({ num, label, sub, href, icon: Icon }, i) => (
            <motion.a
              key={num}
              href={href}
              target={href.startsWith("mailto") || href.startsWith("tel") ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className="flex flex-col gap-4 p-6 bg-ink hover:bg-white/5 transition-colors group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-white/30">{num}</span>
                <ArrowUpRight
                  size={16}
                  className="text-white/30 group-hover:text-lime transition-colors group-hover:rotate-0 rotate-0"
                />
              </div>
              <Icon size={20} className="text-white/50 group-hover:text-white transition-colors" />
              <div>
                <p className="font-sans font-bold text-white">{label}</p>
                <p className="font-inter text-[10px] tracking-[0.15em] uppercase text-white/40 mt-0.5">
                  {sub}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
