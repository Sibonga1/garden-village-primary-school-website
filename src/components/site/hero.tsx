/**
 * hero.tsx  ──  <Hero id="home">
 * ------------------------------------------------------------------
 * Above-the-fold intro: dark forest-green rounded card.
 *  • Mixed serif/sans lime headline  ("Garden Village Education is Power")
 *  • Classroom photo (right) with "Green Classroom" badge
 *  • Tree-canopy accent using mix-blend:screen so its black bg
 *    disappears into the hero.
 *  • CTAs: Learn More → #about · Enrol Today → #contact
 *
 * Animations:
 *  • GSAP ScrollTrigger — word-by-word headline reveal + tree parallax
 *    (scrubbed). Registered once on the client.
 *  • Motion — scroll-linked transforms (headline y/opacity fade, classroom
 *    parallax, tree y) via useScroll + useTransform on heroRef.
 *  • FloatingParticles — Motion loops of small lime dots.
 *
 * Connects to: about (#about), contact (#contact).
 * Data: inline headlineLines, hero-classroom.png, GvButton (→ gv-button.tsx).
 * ------------------------------------------------------------------
 */
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { GvButton } from "./gv-button";
import { DevBadge } from "./dev-badge";
import { devMeta } from "@/lib/dev-registry";
import { usePage } from "@/lib/page-store";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const headlineLines = [
  { words: [{ t: "Garden", cls: "" }, { t: "Village", cls: "" }] },
  { words: [{ t: "Education", cls: "font-[family-name:var(--font-playfair)] font-medium" }] },
  {
    words: [
      { t: "is", cls: "" },
      { t: "Power", cls: "font-[family-name:var(--font-playfair)] italic font-medium" },
    ],
  },
];

export function Hero() {
  const navigate = usePage((s) => s.navigate);
  const heroRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<HTMLImageElement>(null);
  const classroomRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const treeY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const classroomY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline word reveal
      const words = gsap.utils.toArray<HTMLElement>(".gv-hero-word");
      gsap.fromTo(
        words,
        { yPercent: 120, opacity: 0, rotate: 4 },
        {
          yPercent: 0,
          opacity: 1,
          rotate: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.12,
          delay: 0.25,
        }
      );

      // Classroom image reveal
      gsap.fromTo(
        classroomRef.current,
        { clipPath: "inset(100% 0% 0% 0%)", scale: 1.2 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.4,
          ease: "expo.out",
          delay: 0.5,
        }
      );

      // CTA + supporting items
      gsap.fromTo(
        ".gv-hero-fade",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.1, delay: 0.9 }
      );

      // Tree subtle sway + parallax via ScrollTrigger
      gsap.to(treeRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative px-3 pt-24 sm:px-5 sm:pt-28"
    >
      <div className="relative overflow-hidden rounded-[28px] bg-[var(--gv-forest)] gv-grain sm:rounded-[36px]">
        <DevBadge meta={devMeta("home")} />
        {/* Inner glow blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px] sm:rounded-[36px]">
          <div className="gv-anim-blob absolute -right-20 top-10 h-72 w-72 rounded-full bg-[var(--gv-leaf)]/20 blur-3xl" />
          <div className="gv-anim-blob absolute -left-10 bottom-0 h-72 w-72 rounded-full bg-[var(--gv-lime)]/10 blur-3xl" />
        </div>

        {/* Floating particles */}
        <FloatingParticles />

        <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-5 pb-12 pt-14 sm:px-10 sm:pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pt-20">
          {/* ===== Left: headline ===== */}
          <motion.div style={{ y: headlineY, opacity: fade }} className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-[var(--gv-lime)] backdrop-blur"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Education is Power · South Africa
            </motion.div>

            <h1 className="font-[family-name:var(--font-jakarta)] text-[clamp(3.2rem,8vw,6.5rem)] font-extrabold leading-[0.95] tracking-tight text-[var(--gv-lime)]">
              {headlineLines.map((line, li) => (
                <span key={li} className="block overflow-hidden py-1">
                  <span className="flex flex-wrap gap-x-[0.25em]">
                    {line.words.map((w, wi) => (
                      <span key={wi} className="inline-block overflow-hidden">
                        <span className={`gv-hero-word inline-block ${w.cls}`}>
                          {w.t}
                        </span>
                      </span>
                    ))}
                  </span>
                </span>
              ))}
            </h1>

            <div className="gv-hero-fade mt-8 max-w-md text-base leading-relaxed text-[var(--gv-mint)]/80">
              Where curiosity grows and{" "}
              <em className="font-[family-name:var(--font-playfair)] text-[var(--gv-lime)]">
                community
              </em>{" "}
              thrives. Nurturing confident, responsible and curious young
              learners since 2007.
            </div>

            <div className="gv-hero-fade mt-9 flex flex-wrap items-center gap-4">
              <GvButton onClick={() => navigate("about")} variant="lime">
                Learn More
              </GvButton>
              <button
                type="button"
                onClick={() => navigate("contact")}
                className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--gv-mint)]"
              >
                <span className="relative">
                  Enrol Today
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[var(--gv-lime)] transition-transform duration-300 group-hover:scale-x-100" />
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-full border border-white/20 transition-colors group-hover:border-[var(--gv-lime)]">
                  <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </span>
              </button>
            </div>

            {/* Mini stat row */}
            <div className="gv-hero-fade mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-white/10 pt-6">
              {[
                { v: "420+", l: "Learners" },
                { v: "28", l: "Teachers" },
                { v: "17", l: "Years" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-[family-name:var(--font-jakarta)] text-2xl font-extrabold text-[var(--gv-lime)]">
                    {s.v}
                  </div>
                  <div className="text-xs uppercase tracking-[0.18em] text-[var(--gv-mint)]/60">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ===== Right: classroom image ===== */}
          <motion.div
            ref={classroomRef}
            style={{ y: classroomY }}
            className="relative z-10 mx-auto w-full max-w-md lg:mt-0 lg:max-w-none"
          >
            <div className="relative overflow-hidden rounded-[22px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
              {/* Image */}
              <img
                src="/images/hero-classroom.png"
                alt="Children learning in a bright Garden Village classroom filled with plants"
                className="aspect-square w-full object-cover sm:aspect-[4/3] lg:aspect-[5/6]"
              />
              {/* tint */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--gv-forest)]/60 via-transparent to-transparent" />

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3, duration: 0.6 }}
                className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl bg-[var(--gv-forest)]/85 px-4 py-3 backdrop-blur-md"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--gv-lime)] text-[var(--gv-forest)]">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div className="leading-tight">
                  <div className="text-sm font-bold text-[var(--gv-lime)]">
                    Green Classroom
                  </div>
                  <div className="text-[11px] text-[var(--gv-mint)]/70">
                    Learning rooted in nature
                  </div>
                </div>
              </motion.div>

              {/* Decorative ring */}
              <motion.div
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                className="absolute -right-6 -top-6 h-24 w-24 rounded-full border-2 border-dashed border-[var(--gv-lime)]/50"
              />
            </div>
          </motion.div>
        </div>

        {/* ===== Canopy accent (screen blend so black bg vanishes into hero) ===== */}
        <motion.img
          ref={treeRef}
          src="/images/hero-canopy.png"
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-[-4%] top-[-6%] z-0 h-[52%] w-auto max-w-none select-none"
          style={{
            y: treeY,
            mixBlendMode: "screen",
            maskImage:
              "radial-gradient(72% 72% at 70% 35%, black 45%, transparent 85%)",
            WebkitMaskImage:
              "radial-gradient(72% 72% at 70% 35%, black 45%, transparent 85%)",
          }}
        />

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: fade }}
          className="relative z-10 mx-auto flex max-w-7xl items-center gap-3 px-5 pb-8 pt-2 sm:px-10"
        >
          <span className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[var(--gv-mint)]/60">
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            >
              <ArrowDown className="h-4 w-4" />
            </motion.span>
            Scroll to explore
          </span>
        </motion.div>
      </div>
    </section>
  );
}

function FloatingParticles() {
  const particles = Array.from({ length: 14 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((_, i) => {
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const size = 4 + ((i * 7) % 8);
        const delay = (i % 7) * 0.6;
        const dur = 6 + (i % 5);
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-[var(--gv-lime)]"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              opacity: 0.25,
            }}
            animate={{ y: [-10, -40, -10], opacity: [0.1, 0.5, 0.1] }}
            transition={{
              duration: dur,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
