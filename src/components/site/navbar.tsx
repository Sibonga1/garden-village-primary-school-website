"use client";

/**
 * navbar.tsx  ──  <Navbar>  (fixed, top, full-width)
 * ------------------------------------------------------------------
 * Floating glassmorphism pill navbar, now PAGE-AWARE.
 *
 *  • Primary links:  Home · About · Staff   (usePage store, navigate())
 *  • "More Links" dropdown:  Sports · Code of Conduct · Contact  |  Careers · Fundraising · Events
 *  • "Enrol Now" pill  → contact page
 *  • Mobile: hamburger → slide-in sheet listing ALL pages
 *  • Active page is highlighted with a lime underline/dot.
 *
 * State: `scrolled` (useScroll > 30px) · `moreOpen` · `mobileOpen`.
 * Data: primaryNavKeys, moreLinksLeftKeys, moreLinksRightKeys, pages (lib/page-store.ts).
 * ------------------------------------------------------------------ */

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronDown, Menu, X, Facebook, Instagram, Youtube, Twitter } from "lucide-react";
import { Crest } from "./crest";
import {
  usePage,
  pages,
  primaryNavKeys,
  moreLinksLeftKeys,
  moreLinksRightKeys,
  type PageKey,
} from "@/lib/page-store";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const current = usePage((s) => s.page);
  const navigate = usePage((s) => s.navigate);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 30));

  // Close dropdown on outside click / Escape
  useEffect(() => {
    if (!moreOpen) return;
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && setMoreOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, [moreOpen]);

  const go = (key: PageKey) => {
    navigate(key);
    setMoreOpen(false);
    setMobileOpen(false);
  };

  const renderNavLink = (key: PageKey) => {
    const active = current === key;
    return (
      <button
        key={key}
        type="button"
        onClick={() => go(key)}
        className="group relative font-[family-name:var(--font-jakarta)] text-[15px] font-medium text-[var(--gv-ink)]"
      >
        {pages[key].label}
        <span
          className={`absolute -bottom-1.5 left-0 h-[2px] w-full origin-left bg-[var(--gv-forest)] transition-transform duration-300 ${
            active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          }`}
        />
        {active && (
          <span className="absolute -top-2 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[var(--gv-lime)]" />
        )}
      </button>
    );
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <motion.nav
        ref={navRef}
        initial={false}
        animate={{
          paddingTop: scrolled ? 8 : 14,
          paddingBottom: scrolled ? 8 : 14,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`relative mx-auto flex max-w-7xl items-center justify-between rounded-[26px] border transition-colors duration-500 ${
          scrolled
            ? "gv-glass shadow-[0_18px_50px_-20px_rgba(14,42,31,0.4)]"
            : "bg-[var(--gv-sage)]/70 backdrop-blur-md border-white/40"
        }`}
        style={{ paddingLeft: "1rem", paddingRight: "1rem" }}
      >
        {/* Logo */}
        <button type="button" onClick={() => go("home")} className="group flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: -8, scale: 1.06 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-[var(--gv-leaf)]/40"
          >
            <Crest className="h-full w-full" />
          </motion.div>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-[family-name:var(--font-jakarta)] text-[18px] font-extrabold tracking-tight text-[var(--gv-forest)]">
              Garden Village
            </span>
            <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.28em] text-[var(--gv-leaf-dark)]">
              School · South Africa
            </span>
          </span>
        </button>

        {/* Center links (desktop) */}
        <div className="hidden items-center gap-9 md:flex">
          {primaryNavKeys.map(renderNavLink)}

          {/* More links trigger */}
          <button
            type="button"
            onClick={() => setMoreOpen((o) => !o)}
            aria-expanded={moreOpen}
            aria-haspopup="true"
            className="group flex items-center gap-1.5 font-[family-name:var(--font-jakarta)] text-[15px] font-medium text-[var(--gv-ink)]"
          >
            More Links
            <motion.span animate={{ rotate: moreOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown className="h-4 w-4" />
            </motion.span>
            <span className="absolute -bottom-1.5 left-0 h-[2px] w-full origin-left scale-x-0 bg-[var(--gv-forest)] transition-transform duration-300 group-hover:scale-x-100" />
          </button>
        </div>

        {/* CTA (desktop) + mobile menu button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => go("contact")}
            className="hidden rounded-full bg-[var(--gv-forest)] px-5 py-2.5 font-[family-name:var(--font-jakarta)] text-sm font-semibold text-[var(--gv-lime)] transition-all duration-300 hover:bg-[var(--gv-mid-green)] hover:shadow-[0_10px_30px_-10px_rgba(14,42,31,0.6)] md:inline-block"
          >
            Enrol Now
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full bg-[var(--gv-forest)]/10 text-[var(--gv-forest)] md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* ===== More Links dropdown panel ===== */}
        <AnimatePresence>
          {moreOpen && (
            <motion.div
              key="more-panel"
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="gv-glass absolute right-2 top-[calc(100%+10px)] w-[min(640px,92vw)] overflow-hidden rounded-[26px] p-7 shadow-[0_40px_80px_-30px_rgba(14,42,31,0.5)]"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--gv-lime)]/30 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-[var(--gv-leaf)]/20 blur-3xl" />

              <div className="relative flex items-center justify-between">
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-semibold text-[var(--gv-forest)]">
                  More Links
                </h3>
                <span className="rounded-full bg-[var(--gv-forest)]/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--gv-mid-green)]">
                  Explore
                </span>
              </div>

              <div className="relative mt-7 grid grid-cols-2 gap-x-8 gap-y-6 sm:gap-y-7">
                {[moreLinksLeftKeys, moreLinksRightKeys].map((col, ci) => (
                  <div key={ci} className="flex flex-col gap-6 sm:gap-7">
                    {col.map((key, i) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.06 * (ci * 3 + i) + 0.1 }}
                      >
                        <button
                          type="button"
                          onClick={() => go(key)}
                          className="gv-underline-link font-[family-name:var(--font-jakarta)] text-lg font-semibold text-[var(--gv-ink)] sm:text-xl"
                        >
                          {pages[key].label}
                        </button>
                      </motion.div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="relative mt-8 flex items-center justify-between border-t border-[var(--gv-forest)]/10 pt-5">
                <div className="flex items-center gap-3">
                  {[
                    { Icon: Facebook, label: "Facebook" },
                    { Icon: Instagram, label: "Instagram" },
                    { Icon: Youtube, label: "YouTube" },
                    { Icon: Twitter, label: "X" },
                  ].map(({ Icon, label }) => (
                    <motion.button
                      key={label}
                      type="button"
                      onClick={() => go("contact")}
                      aria-label={label}
                      whileHover={{ y: -3, scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      className="grid h-11 w-11 place-items-center rounded-full bg-[var(--gv-forest)] text-white transition-colors hover:bg-[var(--gv-mid-green)]"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </motion.button>
                  ))}
                </div>
                <span className="hidden text-right text-xs text-[var(--gv-ink-soft)] sm:block">
                  Garden Village Primary
                  <br />
                  Education is Power
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ===== Mobile sheet ===== */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] md:hidden"
          >
            <div
              className="absolute inset-0 bg-[var(--gv-forest)]/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              className="absolute right-0 top-0 h-full w-[82%] max-w-sm overflow-y-auto bg-[var(--gv-mint)] p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-[var(--gv-leaf)]/40">
                    <Crest className="h-full w-full" />
                  </span>
                  <span className="font-[family-name:var(--font-jakarta)] text-base font-extrabold text-[var(--gv-forest)]">
                    Garden Village
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-[var(--gv-forest)]/10 text-[var(--gv-forest)]"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-1">
                {(Object.keys(pages) as PageKey[]).map((key, i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <button
                      type="button"
                      onClick={() => go(key)}
                      className={`block w-full rounded-2xl px-4 py-3 text-left font-[family-name:var(--font-jakarta)] text-lg font-semibold transition-colors ${
                        current === key
                          ? "bg-[var(--gv-forest)] text-[var(--gv-lime)]"
                          : "text-[var(--gv-ink)] hover:bg-[var(--gv-sage)]"
                      }`}
                    >
                      {pages[key].label}
                    </button>
                  </motion.div>
                ))}
              </nav>

              <button
                type="button"
                onClick={() => go("contact")}
                className="mt-6 block w-full rounded-full bg-[var(--gv-forest)] px-5 py-3 text-center font-[family-name:var(--font-jakarta)] text-sm font-semibold text-[var(--gv-lime)]"
              >
                Enrol Now
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
