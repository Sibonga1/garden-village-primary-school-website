/**
 * staff.tsx  ──  <Staff id="staff">
 * ------------------------------------------------------------------
 * 4 staff profile cards: photo (zoom on hover), subject tags, name/role
 * overlay, italic quote, and Mail + LinkedIn action buttons.
 *
 * Animations:
 *  • Motion — RevealGroup stagger; hover lifts card + zooms image;
 *    social icon micro-interactions.
 *
 * Connects to: Mail/LinkedIn → #contact.
 * Data: staff array (lib/site-data.ts) · staff images in /public/images.
 * ------------------------------------------------------------------ */
"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Quote } from "lucide-react";
import { staff } from "@/lib/site-data";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { DevBadge } from "./dev-badge";
import { devMeta } from "@/lib/dev-registry";

export function Staff() {
  return (
    <section id="staff" className="relative gv-bg-mint py-20 sm:py-28">
      <DevBadge meta={devMeta("staff")} />
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <Reveal direction="up" className="mb-12 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-[var(--gv-leaf)]" />
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--gv-leaf-dark)]">
              Our People
            </span>
          </div>
          <h2 className="mt-4 font-[family-name:var(--font-jakarta)] text-[clamp(2.2rem,5vw,3.4rem)] font-extrabold leading-[1.05] tracking-tight text-[var(--gv-forest)]">
            Meet the{" "}
            <span className="font-[family-name:var(--font-playfair)] italic font-medium">
              gardeners
            </span>{" "}
            of young minds
          </h2>
        </Reveal>

        <RevealGroup
          stagger={0.1}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {staff.map((member) => (
            <RevealItem key={member.name} direction="up" className="h-full">
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-[var(--gv-leaf)]/15 bg-white shadow-[0_18px_40px_-25px_rgba(14,42,31,0.4)]"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-[var(--gv-sage)]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--gv-forest)]/80 via-transparent to-transparent" />

                  {/* Subjects tags */}
                  <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                    {member.subjects.map((s) => (
                      <span
                        key={s}
                        className="rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--gv-forest)] backdrop-blur"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Quote icon */}
                  <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-[var(--gv-lime)] text-[var(--gv-forest)] opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <Quote className="h-4 w-4" />
                  </span>

                  {/* Name overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <h3 className="font-[family-name:var(--font-jakarta)] text-lg font-extrabold leading-tight text-white">
                      {member.name}
                    </h3>
                    <p className="text-xs font-medium text-[var(--gv-lime)]">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col justify-between p-4">
                  <p className="font-[family-name:var(--font-playfair)] text-sm italic leading-snug text-[var(--gv-ink-soft)]">
                    “{member.quote}”
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <motion.a
                      href="#contact"
                      aria-label={`Email ${member.name}`}
                      whileHover={{ y: -2, scale: 1.06 }}
                      whileTap={{ scale: 0.92 }}
                      className="grid h-9 w-9 place-items-center rounded-full bg-[var(--gv-mint)] text-[var(--gv-forest)] transition-colors hover:bg-[var(--gv-forest)] hover:text-[var(--gv-lime)]"
                    >
                      <Mail className="h-4 w-4" />
                    </motion.a>
                    <motion.a
                      href="#contact"
                      aria-label={`${member.name} on LinkedIn`}
                      whileHover={{ y: -2, scale: 1.06 }}
                      whileTap={{ scale: 0.92 }}
                      className="grid h-9 w-9 place-items-center rounded-full bg-[var(--gv-mint)] text-[var(--gv-forest)] transition-colors hover:bg-[var(--gv-forest)] hover:text-[var(--gv-lime)]"
                    >
                      <Linkedin className="h-4 w-4" />
                    </motion.a>
                    <span className="ml-auto text-[11px] font-semibold uppercase tracking-wider text-[var(--gv-leaf-dark)]">
                      Garden Village
                    </span>
                  </div>
                </div>
              </motion.article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
