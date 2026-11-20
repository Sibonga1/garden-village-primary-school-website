/**
 * programs.tsx  ──  <Programs id="programs">
 * ------------------------------------------------------------------
 * 6 interactive program cards (Academics, Sports, Arts, Green Gardeners,
 * Code & Robotics, Aftercare). Each card tilts in 3D toward the cursor.
 *
 * Animations:
 *  • TiltCard — mouse-tracked rotateX/rotateY via Motion springs; accent
 *    glow follows hover.
 *  • Motion — RevealGroup stagger on entrance.
 *
 * Connects to: anchor target of About's motto pills.
 * Data: programs array + iconMap (lib/site-data.ts · lucide-react).
 * ------------------------------------------------------------------ */
"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  BookOpen,
  Trophy,
  Palette,
  Sprout,
  Cpu,
  HeartHandshake,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { programs } from "@/lib/site-data";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { DevBadge } from "./dev-badge";
import { devMeta } from "@/lib/dev-registry";

const iconMap: Record<string, LucideIcon> = {
  BookOpen,
  Trophy,
  Palette,
  Sprout,
  Cpu,
  HeartHandshake,
};

function TiltCard({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]) as MotionValue<number>, {
    stiffness: 200,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]) as MotionValue<number>, {
    stiffness: 200,
    damping: 18,
  });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="group relative h-full overflow-hidden rounded-[22px] border border-[var(--gv-leaf)]/15 bg-white p-6 shadow-[0_18px_40px_-25px_rgba(14,42,31,0.4)]"
    >
      {/* glow that follows hover via accent */}
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: accent }}
      />
      {children}
    </motion.div>
  );
}

export function Programs() {
  return (
    <section id="programs" className="relative gv-bg-mint-2 py-20 sm:py-28">
      <DevBadge meta={devMeta("programs")} />
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <Reveal direction="up" className="mb-12 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-[var(--gv-leaf)]" />
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--gv-leaf-dark)]">
              Programs
            </span>
          </div>
          <h2 className="mt-4 font-[family-name:var(--font-jakarta)] text-[clamp(2.2rem,5vw,3.4rem)] font-extrabold leading-[1.05] tracking-tight text-[var(--gv-forest)]">
            Learning that{" "}
            <span className="font-[family-name:var(--font-playfair)] italic font-medium">
              grows
            </span>{" "}
            the whole child
          </h2>
          <p className="mt-4 max-w-xl text-[var(--gv-ink-soft)]">
            From the classroom to the field, the studio to the garden — every
            program at Garden Village is designed to nurture confident,
            curious and capable learners.
          </p>
        </Reveal>

        <RevealGroup
          stagger={0.08}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {programs.map((p) => {
            const Icon = iconMap[p.icon] ?? BookOpen;
            return (
              <RevealItem key={p.title} direction="up" className="h-full">
                <TiltCard accent={p.accent}>
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between">
                      <motion.span
                        whileHover={{ rotate: 8, scale: 1.1 }}
                        className="grid h-14 w-14 place-items-center rounded-2xl"
                        style={{ background: `${p.accent}22`, color: p.accent }}
                      >
                        <Icon className="h-7 w-7" />
                      </motion.span>
                      <ArrowUpRight className="h-5 w-5 text-[var(--gv-ink-soft)]/40 transition-all duration-300 group-hover:rotate-45 group-hover:text-[var(--gv-forest)]" />
                    </div>
                    <h3 className="mt-5 font-[family-name:var(--font-jakarta)] text-xl font-bold text-[var(--gv-forest)]">
                      {p.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--gv-ink-soft)]">
                      {p.description}
                    </p>
                    <div
                      className="mt-5 h-1 w-10 rounded-full transition-all duration-500 group-hover:w-20"
                      style={{ background: p.accent }}
                    />
                  </div>
                </TiltCard>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
