/**
 * footer.tsx  ──  <Footer>  (sticky to bottom of viewport)
 * ------------------------------------------------------------------
 * Brand + motto · 3 link columns (School / Admissions / Community) ·
 * scrolling motto marquee · contact line · bottom legal.
 *
 * NOTE: Sticks to bottom because page.tsx uses a flex-col wrapper with
 * flex-1 main; footer sits after main and is pushed down naturally.
 *
 * Animations: Motion marquee (gv-anim-marquee) + social hover lift.
 * Data: footerLinks, contactInfo (lib/site-data.ts) · Crest.
 * ------------------------------------------------------------------ */
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Facebook, Instagram, Youtube, Twitter, Sprout, ArrowUpRight } from "lucide-react";
import { Crest } from "./crest";
import { footerLinks, contactInfo } from "@/lib/site-data";

const socials = [
  { Icon: Facebook, label: "Facebook" },
  { Icon: Instagram, label: "Instagram" },
  { Icon: Youtube, label: "YouTube" },
  { Icon: Twitter, label: "X" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[var(--gv-forest-3)] pt-16 text-[var(--gv-mint)]">
      {/* top accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gv-lime)]/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        {/* top: brand + marquee motto */}
        <div className="flex flex-col gap-10 border-b border-white/10 pb-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <span className="h-12 w-12 overflow-hidden rounded-full ring-2 ring-[var(--gv-leaf)]/40">
                <Crest className="h-full w-full" />
              </span>
              <div>
                <div className="font-[family-name:var(--font-jakarta)] text-lg font-extrabold text-white">
                  Garden Village
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--gv-leaf)]">
                  Primary School · South Africa
                </div>
              </div>
            </div>
            <p className="mt-5 font-[family-name:var(--font-playfair)] text-sm italic leading-relaxed text-[var(--gv-mint)]/70">
              “We don&apos;t just teach children — we help shape tomorrow&apos;s
              leaders.”
            </p>
            <div className="mt-5 flex gap-2.5">
              {socials.map(({ Icon, label }) => (
                <motion.a
                  key={label}
                  href="#contact"
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/8 text-white transition-colors hover:bg-[var(--gv-lime)] hover:text-[var(--gv-forest)]"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--gv-lime)]">
                  {title}
                </h4>
                <ul className="mt-4 space-y-3">
                  {links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="group inline-flex items-center gap-1 text-sm text-[var(--gv-mint)]/75 transition-colors hover:text-white"
                      >
                        <span>{l.label}</span>
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* marquee motto */}
        <div className="relative my-8 overflow-hidden border-y border-white/10 py-4">
          <div className="gv-anim-marquee flex w-max gap-8 whitespace-nowrap">
            {Array.from({ length: 2 }).map((_, dup) => (
              <div key={dup} className="flex items-center gap-8">
                {["Education is Power", "Knowledge is Growth", "The Future Starts Here", "Curiosity Grows Here"].map(
                  (m, i) => (
                    <span key={`${dup}-${i}`} className="flex items-center gap-8">
                      <span className="font-[family-name:var(--font-playfair)] text-2xl italic text-[var(--gv-mint)]/40 sm:text-3xl">
                        {m}
                      </span>
                      <Sprout className="h-5 w-5 text-[var(--gv-lime)]/60" />
                    </span>
                  )
                )}
              </div>
            ))}
          </div>
        </div>

        {/* contact line */}
        <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-[var(--gv-mint)]/60 sm:flex-row sm:items-center sm:justify-between">
          <span>{contactInfo.address}</span>
          <span className="flex items-center gap-4">
            <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="hover:text-white">
              {contactInfo.phone}
            </a>
            <a href={`mailto:${contactInfo.email}`} className="hover:text-white">
              {contactInfo.email}
            </a>
          </span>
        </div>

        {/* bottom */}
        <div className="flex flex-col gap-3 pb-8 text-xs text-[var(--gv-mint)]/50 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} Garden Village Primary School. All
            rights reserved.
          </span>
          <span className="flex items-center gap-4">
            <a href="#about" className="hover:text-white">Privacy</a>
            <a href="#about" className="hover:text-white">Terms</a>
            <a href="#about" className="hover:text-white">Sitemap</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
