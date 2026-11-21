"use client";

/**
 * footer.tsx  ──  <Footer>  (sticky to bottom of viewport)
 * ------------------------------------------------------------------
 * Brand + motto · 3 link columns (School / Admissions / Community) ·
 * scrolling motto marquee · contact line · bottom legal.
 *
 * All links now navigate via the page-store (client-side pages).
 * ------------------------------------------------------------------ */

import { motion } from "framer-motion";
import { Facebook, Instagram, Youtube, Twitter, Sprout, ArrowUpRight } from "lucide-react";
import { Crest } from "./crest";
import { contactInfo } from "@/lib/site-data";
import { usePage, type PageKey } from "@/lib/page-store";

const socials = [
  { Icon: Facebook, label: "Facebook" },
  { Icon: Instagram, label: "Instagram" },
  { Icon: Youtube, label: "YouTube" },
  { Icon: Twitter, label: "X" },
];

const footerColumns: { title: string; links: { label: string; page: PageKey }[] }[] = [
  {
    title: "School",
    links: [
      { label: "About Us", page: "about" },
      { label: "Our Staff", page: "staff" },
      { label: "Programs", page: "programs" },
      { label: "Events", page: "events" },
    ],
  },
  {
    title: "Admissions",
    links: [
      { label: "Enrolment", page: "contact" },
      { label: "Fees & Bursaries", page: "faq" },
      { label: "Open Days", page: "events" },
      { label: "Code of Conduct", page: "conduct" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Fundraising", page: "fundraising" },
      { label: "Careers", page: "careers" },
      { label: "Newsletter", page: "contact" },
      { label: "Contact", page: "contact" },
    ],
  },
];

export function Footer() {
  const navigate = usePage((s) => s.navigate);

  return (
    <footer className="relative overflow-hidden bg-[var(--gv-forest-3)] pt-16 text-[var(--gv-mint)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gv-lime)]/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        {/* top: brand + link columns */}
        <div className="flex flex-col gap-10 border-b border-white/10 pb-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <button type="button" onClick={() => navigate("home")} aria-label="Home">
                <span className="block h-12 w-12 overflow-hidden rounded-full ring-2 ring-[var(--gv-leaf)]/40">
                  <Crest className="h-full w-full" />
                </span>
              </button>
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
              &ldquo;We don&apos;t just teach children — we help shape tomorrow&apos;s
              leaders.&rdquo;
            </p>
            <div className="mt-5 flex gap-2.5">
              {socials.map(({ Icon, label }) => (
                <motion.button
                  key={label}
                  type="button"
                  onClick={() => navigate("contact")}
                  aria-label={label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/8 text-white transition-colors hover:bg-[var(--gv-lime)] hover:text-[var(--gv-forest)]"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--gv-lime)]">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <button
                        type="button"
                        onClick={() => navigate(l.page)}
                        className="group inline-flex items-center gap-1 text-sm text-[var(--gv-mint)]/75 transition-colors hover:text-white"
                      >
                        <span>{l.label}</span>
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </button>
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
            <button type="button" onClick={() => navigate("conduct")} className="hover:text-white">Privacy</button>
            <button type="button" onClick={() => navigate("conduct")} className="hover:text-white">Terms</button>
            <button type="button" onClick={() => navigate("about")} className="hover:text-white">Sitemap</button>
          </span>
        </div>
      </div>
    </footer>
  );
}
