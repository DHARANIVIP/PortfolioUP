"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Linkedin, Github, Check, Copy, Phone, AlertCircle, Loader2, RefreshCw } from "lucide-react";
import EyebrowLabel from "@/components/ui/EyebrowLabel";
import { contactFormSchema, ContactFormData } from "@/lib/validations/contact";

const FOOTER_LINKS = [
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
    label: "PHONE",
    sub: "DIRECT INQUIRIES",
    href: "tel:+919043967731",
    icon: Phone,
  },
];

export default function Contact() {
  // Copy Email State
  const [copyStatus, setCopyStatus] = useState<"idle" | "loading" | "copied" | "error">("idle");
  const [copyAnnouncement, setCopyAnnouncement] = useState("");

  // Form State
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const nameInputRef = useRef<HTMLInputElement>(null);

  // Copy Email Handler (Server-side fetch on click + clipboard fallback)
  const handleCopyEmail = async () => {
    if (copyStatus === "loading") return;
    setCopyStatus("loading");

    try {
      const res = await fetch("/api/contact-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to fetch address");
      const data = await res.json();
      const email = data.email;

      // Copy with navigator.clipboard or fallback textarea
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = email;
        textarea.style.position = "fixed";
        textarea.style.left = "-999999px";
        textarea.style.top = "-999999px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopyStatus("copied");
      setCopyAnnouncement("Email address copied to clipboard!");
      setTimeout(() => {
        setCopyStatus("idle");
        setCopyAnnouncement("");
      }, 2000);
    } catch {
      setCopyStatus("error");
      setCopyAnnouncement("Failed to copy email.");
      setTimeout(() => {
        setCopyStatus("idle");
        setCopyAnnouncement("");
      }, 2500);
    }
  };

  // Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Client-side Zod validation
    const result = contactFormSchema.safeParse(formData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        if (field && !errors[field]) {
          errors[field] = issue.message;
        }
      }
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setFormStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setFieldErrors(data.errors);
        }
        throw new Error(data.error || "Failed to send message. Please try again.");
      }

      setFormStatus("success");
      setFormData({ name: "", email: "", message: "", honeypot: "" });
    } catch (err: unknown) {
      setFormStatus("error");
      setErrorMessage((err as Error).message || "Something went wrong. Please retry or copy email directly.");
    }
  };

  return (
    <section id="contact" className="bg-ink py-28 px-6 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Top Header Row */}
        <div className="flex items-start justify-between mb-16 flex-col md:flex-row gap-4">
          <EyebrowLabel number="05" label="CONTACT" dark />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="font-inter text-[10px] tracking-[0.2em] uppercase text-white/50">
              AVAILABLE FOR SELECT PROJECTS &amp; INTERNSHIPS
            </span>
          </div>
        </div>

        {/* Giant Headline */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-sans font-black leading-[0.95] tracking-tighter">
            <span className="block text-white text-[12vw] md:text-[9vw]">LET&apos;S CREATE</span>
            <span className="block text-outline-white text-[12vw] md:text-[9vw]">SOMETHING THAT</span>
            <span className="block text-lime text-[12vw] md:text-[9vw] flex items-center gap-6">
              MATTERS.
              <span className="inline-flex w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-lime items-center justify-center">
                <ArrowUpRight size={28} className="text-lime" />
              </span>
            </span>
          </h2>
        </motion.div>

        {/* 2-Column Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-stretch">
          {/* Left: Copy Email Card */}
          <motion.div
            className="lg:col-span-5 bg-lime rounded-2xl p-8 md:p-10 flex flex-col justify-between shadow-neo text-black"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase bg-black text-lime px-2.5 py-1 rounded inline-block mb-6">
                DIRECT EMAIL
              </span>

              <h3 className="font-sans font-black text-3xl md:text-4xl text-black leading-tight mb-4">
                Let&apos;s build together.
              </h3>

              <p className="font-inter text-sm md:text-base text-black/80 leading-relaxed mb-8">
                Prefer email? Copy my address below. I usually reply within 1 to 2 days.
              </p>

              {/* Copy Email Button */}
              <button
                onClick={handleCopyEmail}
                disabled={copyStatus === "loading"}
                className="
                  w-full py-4 px-6 rounded-xl bg-black text-white font-sans font-black text-sm tracking-wider uppercase
                  flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all duration-200
                  border border-black shadow-neo-black disabled:opacity-50
                "
                aria-label="Copy Dharani's email address"
              >
                {copyStatus === "loading" && <Loader2 size={18} className="animate-spin text-lime" />}
                {copyStatus === "copied" && <Check size={18} className="text-lime" />}
                {copyStatus === "error" && <AlertCircle size={18} className="text-red-400" />}
                {copyStatus === "idle" && <Copy size={18} />}

                <span>
                  {copyStatus === "loading"
                    ? "FETCHING ADDRESS..."
                    : copyStatus === "copied"
                    ? "COPIED TO CLIPBOARD!"
                    : copyStatus === "error"
                    ? "FAILED TO COPY — RETRY"
                    : "COPY EMAIL ADDRESS"}
                </span>
              </button>

              <div aria-live="polite" className="sr-only">
                {copyAnnouncement}
              </div>
            </div>

            {/* Vertical Gap Fill: Availability Status & Social Links */}
            <div className="pt-10 mt-8 border-t border-black/15 flex flex-col gap-6">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-40" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-black" />
                </span>
                <span className="font-inter text-xs font-bold tracking-[0.15em] uppercase text-black/90">
                  OPEN FOR ROLES &amp; FREELANCE SYSTEMS
                </span>
              </div>

              {/* Social profile buttons */}
              <div className="flex flex-wrap gap-2.5">
                <a
                  href="https://www.linkedin.com/in/dharani-v-92194a314/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center gap-2 px-4 py-2.5 rounded-lg bg-black text-white
                    hover:bg-white hover:text-black font-inter text-xs font-bold tracking-wider uppercase
                    transition-colors border border-black/10
                  "
                >
                  <Linkedin size={14} />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={12} />
                </a>

                <a
                  href="https://github.com/DHARANIVIP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center gap-2 px-4 py-2.5 rounded-lg bg-black text-white
                    hover:bg-white hover:text-black font-inter text-xs font-bold tracking-wider uppercase
                    transition-colors border border-black/10
                  "
                >
                  <Github size={14} />
                  <span>GitHub</span>
                  <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right: Send a Message Form */}
          <motion.div
            className="lg:col-span-7 bg-[#161616] border border-white/10 rounded-2xl p-8 md:p-10 flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {formStatus === "success" ? (
              /* Success Confirmation Banner */
              <div className="py-12 flex flex-col items-center text-center justify-center h-full">
                <div className="w-16 h-16 rounded-2xl bg-lime/10 border border-lime/30 text-lime flex items-center justify-center mb-6">
                  <Check size={32} />
                </div>
                <h3 className="font-sans font-black text-2xl md:text-3xl text-white mb-3">
                  Message Delivered!
                </h3>
                <p className="font-inter text-sm text-white/70 max-w-[420px] mb-8 leading-relaxed">
                  Thank you for reaching out. Dharani will review your message and reply within 1 to 2 business days.
                </p>
                <button
                  onClick={() => setFormStatus("idle")}
                  className="
                    px-6 py-3 rounded-xl bg-lime text-black font-sans font-black text-xs tracking-wider uppercase
                    hover:bg-white transition-all flex items-center gap-2
                  "
                >
                  <RefreshCw size={14} />
                  <span>Send Another Message</span>
                </button>
              </div>
            ) : (
              /* Contact Form */
              <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <h3 className="font-sans font-black text-2xl md:text-3xl text-white mb-1">
                    Send a Message
                  </h3>
                  <p className="font-inter text-xs text-white/50">
                    Have a project, role, or idea? Fill out the details below.
                  </p>
                </div>

                {/* General Error Banner */}
                {formStatus === "error" && (
                  <div
                    role="alert"
                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-3"
                  >
                    <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-bold">Transmission Failed</p>
                      <p className="text-red-400/80 mt-0.5">{errorMessage}</p>
                    </div>
                  </div>
                )}

                {/* Hidden Honeypot Field */}
                <input
                  type="text"
                  name="website"
                  value={formData.honeypot}
                  onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {/* Name Field */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-inter text-[11px] font-bold tracking-[0.15em] uppercase text-white/60 mb-2"
                  >
                    YOUR NAME <span className="text-lime">*</span>
                  </label>
                  <input
                    ref={nameInputRef}
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (fieldErrors.name) {
                        setFieldErrors((prev) => {
                          const next = { ...prev };
                          delete next.name;
                          return next;
                        });
                      }
                    }}
                    placeholder="Your name"
                    aria-invalid={!!fieldErrors.name}
                    aria-describedby={fieldErrors.name ? "name-error" : undefined}
                    className={`
                      w-full bg-[#101010] text-white border rounded-xl px-4 py-3 text-sm
                      placeholder:text-white/30 focus:outline-none transition-colors
                      ${fieldErrors.name ? "border-red-400 focus:border-red-400" : "border-white/15 focus:border-lime"}
                    `}
                  />
                  {fieldErrors.name && (
                    <p id="name-error" className="mt-1.5 font-mono text-xs text-red-400 flex items-center gap-1.5">
                      <AlertCircle size={13} />
                      <span>{fieldErrors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-inter text-[11px] font-bold tracking-[0.15em] uppercase text-white/60 mb-2"
                  >
                    EMAIL ADDRESS <span className="text-lime">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (fieldErrors.email) {
                        setFieldErrors((prev) => {
                          const next = { ...prev };
                          delete next.email;
                          return next;
                        });
                      }
                    }}
                    placeholder="you@company.com"
                    aria-invalid={!!fieldErrors.email}
                    aria-describedby={fieldErrors.email ? "email-error" : undefined}
                    className={`
                      w-full bg-[#101010] text-white border rounded-xl px-4 py-3 text-sm
                      placeholder:text-white/30 focus:outline-none transition-colors
                      ${fieldErrors.email ? "border-red-400 focus:border-red-400" : "border-white/15 focus:border-lime"}
                    `}
                  />
                  {fieldErrors.email && (
                    <p id="email-error" className="mt-1.5 font-mono text-xs text-red-400 flex items-center gap-1.5">
                      <AlertCircle size={13} />
                      <span>{fieldErrors.email}</span>
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="contact-message"
                      className="block font-inter text-[11px] font-bold tracking-[0.15em] uppercase text-white/60"
                    >
                      MESSAGE <span className="text-lime">*</span>
                    </label>
                    <span className="font-mono text-[10px] text-white/40">
                      {formData.message.length}/2000
                    </span>
                  </div>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formData.message}
                    maxLength={2000}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (fieldErrors.message) {
                        setFieldErrors((prev) => {
                          const next = { ...prev };
                          delete next.message;
                          return next;
                        });
                      }
                    }}
                    placeholder="Tell me about the role, project, or idea"
                    aria-invalid={!!fieldErrors.message}
                    aria-describedby={fieldErrors.message ? "message-error" : undefined}
                    className={`
                      w-full bg-[#101010] text-white border rounded-xl px-4 py-3 text-sm
                      placeholder:text-white/30 focus:outline-none transition-colors resize-none
                      ${fieldErrors.message ? "border-red-400 focus:border-red-400" : "border-white/15 focus:border-lime"}
                    `}
                  />
                  {fieldErrors.message && (
                    <p id="message-error" className="mt-1.5 font-mono text-xs text-red-400 flex items-center gap-1.5">
                      <AlertCircle size={13} />
                      <span>{fieldErrors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit / Retry Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={formStatus === "sending"}
                    className="
                      w-full py-4 px-6 rounded-xl bg-lime text-black font-sans font-black text-sm tracking-wider uppercase
                      hover:bg-white transition-all flex items-center justify-center gap-2 shadow-neo-lime
                      disabled:opacity-50 disabled:pointer-events-none
                    "
                  >
                    {formStatus === "sending" ? (
                      <>
                        <Loader2 size={18} className="animate-spin text-black" />
                        <span>SENDING TRANSMISSION...</span>
                      </>
                    ) : formStatus === "error" ? (
                      <>
                        <RefreshCw size={18} />
                        <span>RETRY TRANSMISSION</span>
                      </>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <ArrowUpRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>

        {/* Links Grid below */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
          {FOOTER_LINKS.map(({ num, label, sub, href, icon: Icon }, i) => (
            <motion.a
              key={num}
              href={href}
              target={href.startsWith("tel") ? "_self" : "_blank"}
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
                  className="text-white/30 group-hover:text-lime transition-colors"
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
