/**
 * testimonials.tsx  ──  <Testimonials id="events">
 * ------------------------------------------------------------------
 * Auto-rotating testimonial carousel (6s). Quote + star rating + author.
 * NOTE: id="events" so the navbar's More Links → Events lands here.
 *
 * Animations:
 *  • Motion AnimatePresence — slide + blur between slides (mode="wait").
 *  • Auto-advance every 6s; the active progress dot fills via scaleX over
 *    the interval.
 *  • Prev/Next + clickable dots.
 *
 * Data: testimonials array (lib/site-data.ts).
 * ------------------------------------------------------------------ */
"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/site-data";
import { Reveal } from "./reveal";
import { DevBadge } from "./dev-badge";
import { devMeta } from "@/lib/dev-registry";

const AUTO_MS = 6000;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback((next: number, direction = 1) => {
    setDir(direction);
    setIndex((next + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % testimonials.length);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[index];

  return (
    <section
      id="events"
      className="relative overflow-hidden bg-[var(--gv-forest)] py-20 sm:py-28"
    >
      <DevBadge meta={devMeta("events")} />
      {/* glow */}
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-[var(--gv-leaf)]/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[var(--gv-lime)]/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-10">
        <Reveal direction="up" className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--gv-lime)]/80">
            Voices of our Community
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-jakarta)] text-3xl font-extrabold text-[var(--gv-lime)] sm:text-4xl">
            Stories from parents &amp; alumni
          </h2>
        </Reveal>

        <div className="relative mx-auto max-w-3xl">
          <Quote className="mx-auto mb-6 h-12 w-12 text-[var(--gv-lime)]/50" />

          <div className="relative min-h-[220px] sm:min-h-[200px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir * 60, filter: "blur(6px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -dir * 60, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <p className="font-[family-name:var(--font-playfair)] text-xl leading-relaxed text-[var(--gv-mint)] sm:text-2xl">
                  “{t.text}”
                </p>
                <div className="mt-7 flex items-center justify-center gap-3">
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-[var(--gv-lime)] text-[var(--gv-lime)]" />
                    ))}
                  </div>
                </div>
                <div className="mt-3 font-[family-name:var(--font-jakarta)] text-base font-bold text-[var(--gv-lime)]">
                  {t.name}
                </div>
                <div className="text-sm text-[var(--gv-mint)]/70">{t.relation}</div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(index - 1, -1)}
              aria-label="Previous testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition-all hover:border-[var(--gv-lime)] hover:bg-[var(--gv-lime)] hover:text-[var(--gv-forest)]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i, i > index ? 1 : -1)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="group relative h-2 overflow-hidden rounded-full bg-white/20 transition-all"
                  style={{ width: i === index ? 28 : 8 }}
                >
                  {i === index && (
                    <motion.span
                      key={index}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTO_MS / 1000, ease: "linear" }}
                      className="absolute inset-0 origin-left bg-[var(--gv-lime)]"
                    />
                  )}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(index + 1, 1)}
              aria-label="Next testimonial"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white transition-all hover:border-[var(--gv-lime)] hover:bg-[var(--gv-lime)] hover:text-[var(--gv-forest)]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
