"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Leaf, Sprout, Heart } from "lucide-react";
import { Crest } from "./crest";
import { aboutParagraphs, aboutClosing, aboutMottos } from "@/lib/site-data";
import { Reveal } from "./reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const mottoIcons = [Sprout, Leaf, Heart];

export function About() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const closingWords = gsap.utils.toArray<HTMLElement>(".gv-about-closing-word");
      gsap.fromTo(
        closingWords,
        { opacity: 0.08, y: 6 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".gv-about-closing",
            start: "top 85%",
            end: "bottom 65%",
            scrub: 1,
          },
        }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="relative gv-bg-mint py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gv-leaf)]/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <Reveal direction="up">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-[var(--gv-leaf)]" />
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--gv-leaf-dark)]">
              About Us
            </span>
          </div>
          <h2 className="mt-4 font-[family-name:var(--font-jakarta)] text-[clamp(2.2rem,5vw,3.4rem)] font-extrabold leading-[1.05] tracking-tight text-[var(--gv-forest)]">
            About{" "}
            <span className="font-[family-name:var(--font-playfair)] italic font-medium">
              Garden Village
            </span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Left: text */}
          <div>
            <div className="space-y-5">
              {aboutParagraphs.map((p, i) => (
                <Reveal key={i} delay={i * 0.08} duration={0.7}>
                  <p className="font-[family-name:var(--font-playfair)] text-[15px] leading-[1.75] text-[var(--gv-ink-soft)] sm:text-base">
                    {p}
                  </p>
                </Reveal>
              ))}
            </div>

            <p className="gv-about-closing mt-7 font-[family-name:var(--font-jakarta)] text-lg font-bold leading-snug text-[var(--gv-forest)] sm:text-xl">
              {aboutClosing[0].split(" ").map((w, i) => (
                <span key={i} className="gv-about-closing-word inline-block">
                  {w}&nbsp;
                </span>
              ))}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {aboutMottos.map((m, i) => {
                const Icon = mottoIcons[i];
                return (
                  <motion.div
                    key={m}
                    whileHover={{ y: -3 }}
                    className="flex items-center gap-2 rounded-full border border-[var(--gv-leaf)]/30 bg-white/60 px-4 py-2 text-sm font-semibold text-[var(--gv-forest)] backdrop-blur"
                  >
                    <Icon className="h-4 w-4 text-[var(--gv-leaf)]" />
                    {m}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Right: crest */}
          <div className="relative mx-auto w-full max-w-md">
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 top-1/2 h-[115%] w-[115%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-[var(--gv-leaf)]/30"
            />
            <motion.div
              aria-hidden
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--gv-leaf)]/20"
            />

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative grid place-items-center"
            >
              <div className="w-[78%] drop-shadow-[0_30px_40px_rgba(14,42,31,0.18)]">
                <Crest className="h-auto w-full" />
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-0 top-6 rounded-2xl bg-white px-4 py-3 shadow-lg"
            >
              <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--gv-leaf-dark)]">
                Est.
              </div>
              <div className="font-[family-name:var(--font-jakarta)] text-xl font-extrabold text-[var(--gv-forest)]">
                2007
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-4 left-0 flex items-center gap-2 rounded-2xl bg-[var(--gv-forest)] px-4 py-3 shadow-lg"
            >
              <Sprout className="h-5 w-5 text-[var(--gv-lime)]" />
              <span className="text-xs font-semibold text-[var(--gv-lime)]">
                Rooted in
                <br />
                Community
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
