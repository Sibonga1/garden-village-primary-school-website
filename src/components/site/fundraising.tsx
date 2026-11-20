"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HandHeart, Target } from "lucide-react";
import { Crest } from "./crest";
import { GvButton } from "./gv-button";
import { Reveal } from "./reveal";

const RAISED = 184000;
const GOAL = 250000;

export function Fundraising() {
  const root = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const overlayY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const percent = Math.round((RAISED / GOAL) * 100);

  return (
    <section id="fundraising" ref={root} className="relative overflow-hidden">
      {/* Parallax photo background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 -top-[12%] h-[124%]">
        <img
          src="/images/fundraising-assembly.png"
          alt="Garden Village school assembly with learners in green and white uniforms"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[var(--gv-forest)]/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--gv-forest)]/50 via-transparent to-[var(--gv-forest)]/60" />
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-10 sm:py-28">
        {/* Title pill */}
        <Reveal direction="down">
          <div className="mx-auto flex w-fit items-center gap-3 rounded-full bg-white/80 px-6 py-3 backdrop-blur-md">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--gv-forest)] text-[var(--gv-lime)]">
              <HandHeart className="h-4 w-4" />
            </span>
            <span className="font-[family-name:var(--font-jakarta)] text-2xl font-extrabold text-[var(--gv-forest)] sm:text-4xl">
              Fundraising
            </span>
          </div>
        </Reveal>

        {/* Center overlay card */}
        <motion.div
          style={{ y: overlayY }}
          className="mx-auto mt-12 grid max-w-3xl gap-8 rounded-[28px] bg-[var(--gv-mid-green)]/85 p-7 backdrop-blur-md sm:p-10 gv-grain"
        >
          <div className="grid items-center gap-8 sm:grid-cols-[0.9fr_1.1fr]">
            {/* Crest */}
            <div className="relative mx-auto w-44 sm:w-52">
              <motion.div
                animate={{ rotate: [0, 2, -2, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)]"
              >
                <Crest className="h-auto w-full" />
              </motion.div>
            </div>

            {/* Progress + copy */}
            <div>
              <Reveal>
                <h3 className="font-[family-name:var(--font-jakarta)] text-xl font-extrabold text-[var(--gv-lime)] sm:text-2xl">
                  Help us build the new Library &amp; Eco-Lab
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--gv-mint)]/85">
                  Every rand plants a seed. We&apos;re raising funds for a
                  solar-powered library and science garden so every learner
                  can read, explore and grow.
                </p>
              </Reveal>

              {/* Progress */}
              <Reveal delay={0.1} className="mt-5">
                <div className="flex items-center justify-between text-xs font-semibold text-[var(--gv-mint)]">
                  <span className="flex items-center gap-1.5">
                    <Target className="h-3.5 w-3.5 text-[var(--gv-lime)]" /> R
                    {RAISED.toLocaleString("en-ZA")} raised
                  </span>
                  <span>{percent}% of R{GOAL.toLocaleString("en-ZA")}</span>
                </div>
                <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/15">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-[var(--gv-lime)] to-[var(--gv-leaf)]"
                  />
                </div>
                <div className="mt-1.5 text-[11px] text-[var(--gv-mint)]/70">
                  214 donors · 28 days left
                </div>
              </Reveal>
            </div>
          </div>

          {/* Buttons */}
          <Reveal delay={0.15}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <GvButton href="#about" variant="light">
                Learn More
              </GvButton>
              <GvButton href="#contact" variant="lime" withArrow={false}>
                Donate
              </GvButton>
            </div>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}
