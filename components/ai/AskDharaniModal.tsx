"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Square, Trash2, ArrowUpRight, Sparkles } from "lucide-react";

export interface SourceCitation {
  source: string;
  url: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: SourceCitation[];
}

const SUGGESTED_QUESTIONS = [
  "What has Dharani built?",
  "Tell me about Sentinel AI",
  "What is your tech stack?",
  "Are you open to internships or jobs?",
];

export default function AskDharaniModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [currentSources, setCurrentSources] = useState<SourceCitation[]>([]);

  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Focus restoration
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      triggerButtonRef.current?.focus();
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus trap inside modal
  const handleKeyDownTrap = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !modalRef.current) return;
    const focusable = modalRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"]), a[href]'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  // Auto-scroll messages to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingText, scrollToBottom]);

  // Stop streaming
  const handleStopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (streamingText) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: streamingText,
          sources: currentSources,
        },
      ]);
    }
    setIsStreaming(false);
    setStreamingText("");
    setCurrentSources([]);
  };

  // Clear chat
  const handleClearChat = () => {
    handleStopStreaming();
    setMessages([]);
    setStreamingText("");
    setCurrentSources([]);
  };

  // Send message
  const handleSend = async (userText: string) => {
    const trimmed = userText.trim();
    if (!trimmed || isStreaming) return;
    if (trimmed.length > 500) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsStreaming(true);
    setStreamingText("");
    setCurrentSources([]);

    // Prepare history
    const historyPayload = messages.slice(-6).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      content: m.content,
    }));

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: historyPayload,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with ${response.status}`);
      }

      // Read sources header
      const sourcesHeader = response.headers.get("x-sources");
      let sources: SourceCitation[] = [];
      if (sourcesHeader) {
        try {
          sources = JSON.parse(decodeURIComponent(sourcesHeader));
          setCurrentSources(sources);
        } catch {
          // Ignore header parse error
        }
      }

      if (!response.body) {
        throw new Error("No response body received from server.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        accumulated += chunk;
        setStreamingText(accumulated);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: accumulated || "I don't have that in my notes.",
          sources,
        },
      ]);
      setStreamingText("");
      setCurrentSources([]);
    } catch (err: unknown) {
      if ((err as Error).name === "AbortError") {
        // Stopped by user
      } else {
        const errorMsg = (err as Error).message || "Unable to reach Ask Dharani. Please try again.";
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: `Error: ${errorMsg}`,
            sources: [],
          },
        ]);
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  return (
    <>
      {/* Floating Action Pill */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          ref={triggerButtonRef}
          onClick={() => setIsOpen(true)}
          className="
            group flex items-center gap-2.5 px-4 py-3 rounded-full
            bg-ink text-white border-2 border-lime shadow-neo-lime
            hover:-translate-y-1 hover:bg-black transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-lime focus:ring-offset-2 focus:ring-offset-ink
          "
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label="Open Ask Dharani AI assistant"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-lime" />
          </span>
          <span className="font-sans font-black text-xs md:text-sm tracking-wider uppercase text-white flex items-center gap-1.5">
            ASK DHARANI <Sparkles size={14} className="text-lime inline" />
          </span>
        </motion.button>
      </div>

      {/* Chat Panel Modal */}
      <AnimatePresence>
        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-end md:items-end justify-end p-0 md:p-6 bg-black/60 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none"
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <motion.div
              ref={modalRef}
              onKeyDown={handleKeyDownTrap}
              role="dialog"
              aria-modal="true"
              aria-label="Ask Dharani AI Assistant"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="
                w-full md:w-[440px] h-[92vh] md:h-[620px] max-h-[95vh]
                bg-[#101010] border border-white/15 md:rounded-2xl rounded-t-2xl
                shadow-2xl flex flex-col overflow-hidden text-white
              "
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 bg-[#181818] border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-lime flex items-center justify-center text-black font-black text-xs">
                    DV
                  </div>
                  <div>
                    <h3 className="font-sans font-black text-sm text-white tracking-wide flex items-center gap-2">
                      ASK DHARANI
                      <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-lime/10 text-lime border border-lime/30 uppercase font-medium">
                        RAG
                      </span>
                    </h3>
                    <p className="font-inter text-[10px] text-white/50">
                      Grounded in verified portfolio facts
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {messages.length > 0 && (
                    <button
                      onClick={handleClearChat}
                      className="p-2 text-white/50 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                      title="Clear chat history"
                      aria-label="Clear chat history"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-white/50 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                    title="Close (Esc)"
                    aria-label="Close Ask Dharani dialog"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div
                className="flex-1 p-4 overflow-y-auto space-y-4 font-inter text-sm"
                aria-live="polite"
                role="log"
                aria-atomic="false"
              >
                {/* Empty State / Suggested Questions */}
                {messages.length === 0 && !isStreaming && (
                  <div className="py-6 px-2 text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 text-lime">
                      <MessageSquare size={22} />
                    </div>
                    <h4 className="font-sans font-bold text-base text-white">
                      What would you like to know?
                    </h4>
                    <p className="font-inter text-xs text-white/50 max-w-[280px] mt-1 mb-6 leading-relaxed">
                      Ask about Dharani&apos;s AI projects, deep learning research, full-stack systems, or availability.
                    </p>

                    <div className="w-full space-y-2 text-left">
                      <span className="font-inter text-[10px] tracking-[0.2em] uppercase text-white/40 px-1">
                        SUGGESTED QUESTIONS
                      </span>
                      {SUGGESTED_QUESTIONS.map((q) => (
                        <button
                          key={q}
                          onClick={() => handleSend(q)}
                          className="
                            w-full text-left p-2.5 rounded-xl bg-white/5 border border-white/10
                            hover:border-lime hover:bg-lime/5 text-xs text-white/80 hover:text-white
                            transition-all duration-150 flex items-center justify-between group
                          "
                        >
                          <span>{q}</span>
                          <ArrowUpRight
                            size={14}
                            className="text-white/30 group-hover:text-lime transition-colors flex-shrink-0"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Render Messages */}
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`
                        max-w-[88%] rounded-2xl px-4 py-3 leading-relaxed
                        ${
                          m.role === "user"
                            ? "bg-white text-black font-medium rounded-br-xs"
                            : "bg-[#1C1C1C] border border-white/10 text-white/90 rounded-bl-xs"
                        }
                      `}
                    >
                      <p className="whitespace-pre-wrap">{m.content}</p>
                    </div>

                    {/* Source Chips under assistant answer */}
                    {m.role === "assistant" && m.sources && m.sources.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2 pl-1">
                        <span className="font-inter text-[10px] text-white/40 uppercase tracking-wider mr-1 py-0.5">
                          Sources:
                        </span>
                        {m.sources.map((src, i) => (
                          <a
                            key={i}
                            href={src.url}
                            className="
                              inline-flex items-center gap-1 font-mono text-[10px]
                              bg-lime/10 text-lime border border-lime/20 rounded-md
                              px-2 py-0.5 hover:bg-lime hover:text-black transition-colors
                            "
                          >
                            <span>{src.source}</span>
                            <ArrowUpRight size={10} />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Streaming Assistant Answer */}
                {isStreaming && (
                  <div className="flex flex-col items-start">
                    <div className="max-w-[88%] rounded-2xl rounded-bl-xs px-4 py-3 leading-relaxed bg-[#1C1C1C] border border-white/10 text-white/90">
                      {streamingText ? (
                        <p className="whitespace-pre-wrap">{streamingText}</p>
                      ) : (
                        <div className="flex items-center gap-1.5 py-1" aria-label="Thinking...">
                          <span className="w-2 h-2 rounded-full bg-lime animate-bounce" />
                          <span className="w-2 h-2 rounded-full bg-lime animate-bounce [animation-delay:0.2s]" />
                          <span className="w-2 h-2 rounded-full bg-lime animate-bounce [animation-delay:0.4s]" />
                        </div>
                      )}
                    </div>

                    {currentSources.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2 pl-1">
                        <span className="font-inter text-[10px] text-white/40 uppercase tracking-wider mr-1 py-0.5">
                          Sources:
                        </span>
                        {currentSources.map((src, i) => (
                          <a
                            key={i}
                            href={src.url}
                            className="
                              inline-flex items-center gap-1 font-mono text-[10px]
                              bg-lime/10 text-lime border border-lime/20 rounded-md
                              px-2 py-0.5 hover:bg-lime hover:text-black transition-colors
                            "
                          >
                            <span>{src.source}</span>
                            <ArrowUpRight size={10} />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Footer */}
              <div className="p-3 bg-[#181818] border-t border-white/10">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend(input);
                  }}
                  className="flex items-center gap-2"
                >
                  <div className="relative flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      maxLength={500}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about projects, skills, or roles..."
                      disabled={isStreaming}
                      className="
                        w-full bg-[#101010] text-white border border-white/15 rounded-xl
                        px-3.5 py-2.5 text-xs md:text-sm placeholder:text-white/30
                        focus:outline-none focus:border-lime transition-colors
                        disabled:opacity-50
                      "
                      aria-label="Your question for Ask Dharani"
                    />
                    {input.length > 350 && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] text-white/40">
                        {input.length}/500
                      </span>
                    )}
                  </div>

                  {isStreaming ? (
                    <button
                      type="button"
                      onClick={handleStopStreaming}
                      className="
                        p-2.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/40
                        hover:bg-red-500 hover:text-white transition-colors
                      "
                      title="Stop generating"
                      aria-label="Stop generating response"
                    >
                      <Square size={16} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!input.trim()}
                      className="
                        p-2.5 rounded-xl bg-lime text-black border border-lime
                        hover:bg-white transition-all disabled:opacity-30 disabled:pointer-events-none
                      "
                      title="Send question"
                      aria-label="Send question"
                    >
                      <Send size={16} />
                    </button>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
