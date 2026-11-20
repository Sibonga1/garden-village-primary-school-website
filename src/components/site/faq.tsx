"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faqs } from "@/lib/site-data";
import { Reveal } from "./reveal";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative gv-bg-mint py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-10">
        <Reveal direction="up" className="mb-12 text-center">
          <div className="mx-auto flex w-fit items-center gap-3">
            <span className="h-px w-12 bg-[var(--gv-leaf)]" />
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--gv-leaf-dark)]">
              FAQ
            </span>
            <span className="h-px w-12 bg-[var(--gv-leaf)]" />
          </div>
          <h2 className="mt-4 font-[family-name:var(--font-jakarta)] text-[clamp(2.2rem,5vw,3.4rem)] font-extrabold leading-[1.05] tracking-tight text-[var(--gv-forest)]">
            Questions, answered
          </h2>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 0.05} direction="up">
                <div
                  className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
                    isOpen
                      ? "border-[var(--gv-leaf)]/40 bg-white"
                      : "border-[var(--gv-leaf)]/15 bg-white/60 hover:bg-white"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  >
                    <span className="font-[family-name:var(--font-jakarta)] text-base font-bold text-[var(--gv-forest)] sm:text-lg">
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 135 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${
                        isOpen
                          ? "bg-[var(--gv-forest)] text-[var(--gv-lime)]"
                          : "bg-[var(--gv-mint)] text-[var(--gv-forest)]"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-5 pb-5 font-[family-name:var(--font-playfair)] text-[15px] leading-relaxed text-[var(--gv-ink-soft)] sm:px-6">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
