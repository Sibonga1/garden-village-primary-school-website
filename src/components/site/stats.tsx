/**
 * stats.tsx  ──  <Stats id="stats">
 * ------------------------------------------------------------------
 * Dark-green band with 4 animated counters (Learners / Teachers / Years /
 * Pass Rate). No inbound anchors — sits as a visual bridge between About
 * and Programs.
 *
 * Animations:
 *  • CountUp (count-up.tsx) — animates a MotionValue 0→target when the
 *    number scrolls into view.
 *  • Motion — RevealGroup stagger + hover lift per stat.
 *
 * Data: heroStats (lib/site-data.ts).
 * ------------------------------------------------------------------ */
"use client";

import { motion } from "framer-motion";
import { CountUp } from "./count-up";
import { heroStats } from "@/lib/site-data";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { DevBadge } from "./dev-badge";
import { devMeta } from "@/lib/dev-registry";

export function Stats() {
  return (
    <section id="stats" className="relative overflow-hidden bg-[var(--gv-forest)] py-16 sm:py-20">
      <DevBadge meta={devMeta("stats")} />
      {/* glow */}
      <div className="pointer-events-none absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[var(--gv-leaf)]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[var(--gv-lime)]/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-10">
        <Reveal direction="up" className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--gv-lime)]/80">
            By the Numbers
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-jakarta)] text-3xl font-extrabold text-[var(--gv-lime)] sm:text-4xl">
            Growing together, year after year
          </h2>
        </Reveal>

        <RevealGroup
          stagger={0.12}
          className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4"
        >
          {heroStats.map((s) => (
            <RevealItem key={s.label} direction="scale" className="text-center">
              <motion.div
                whileHover={{ y: -6 }}
                className="group relative mx-auto max-w-[200px]"
              >
                <div className="font-[family-name:var(--font-jakarta)] text-5xl font-extrabold tracking-tight text-[var(--gv-lime)] sm:text-6xl">
                  <CountUp value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--gv-mint)]/70">
                  {s.label}
                </div>
                <div className="mx-auto mt-3 h-px w-12 bg-[var(--gv-leaf)]/50 transition-all duration-500 group-hover:w-20" />
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
