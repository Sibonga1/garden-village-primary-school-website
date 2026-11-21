"use client";

/**
 * page-kit.tsx
 * ----------------------------------------------------------------------------
 * Reusable building blocks for interior PAGES (not sections).
 *
 *  • PageShell    — the <main> wrapper for a page (padding, max-width, entrance).
 *  • PageHero     — slim interior hero (eyebrow + big title + description).
 *  • PageSection  — a vertical band with consistent rhythm + optional id.
 *  • PageCTA      — a call-to-action band (forest bg, button).
 *
 *  Every page view should start with <PageHero/> then stack <PageSection/>s.
 *  Use <Reveal/> / <RevealGroup/> (from site/reveal.tsx) for scroll reveals.
 * ----------------------------------------------------------------------------
 */

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Reveal } from "@/components/site/reveal";
import { GvButton } from "@/components/site/gv-button";

/** Top padding to clear the fixed navbar. */
const NAV_OFFSET = "pt-28 sm:pt-32";

export function PageShell({ children }: { children: ReactNode }) {
  return <div className={NAV_OFFSET}>{children}</div>;
}

export function PageHero({
  eyebrow,
  title,
  description,
  accent = "var(--gv-leaf)",
  dark = false,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  accent?: string;
  dark?: boolean;
  children?: ReactNode;
}) {
  return (
    <section
      className={`relative overflow-hidden ${
        dark ? "bg-[var(--gv-forest)] gv-grain" : "gv-bg-mint"
      }`}
    >
      {/* glow */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl"
        style={{ background: `${accent}22` }}
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full blur-3xl"
        style={{ background: `${accent}14` }}
      />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-10 sm:py-20">
        <Reveal direction="up">
          <div className="flex items-center gap-3">
            <span className="h-px w-12" style={{ background: dark ? "var(--gv-lime)" : accent }} />
            <span
              className="text-xs font-bold uppercase tracking-[0.28em]"
              style={{ color: dark ? "var(--gv-lime)" : "var(--gv-leaf-dark)" }}
            >
              {eyebrow}
            </span>
          </div>
          <h1
            className={`mt-4 font-[family-name:var(--font-jakarta)] text-[clamp(2.4rem,6vw,4.4rem)] font-extrabold leading-[1.02] tracking-tight ${
              dark ? "text-[var(--gv-lime)]" : "text-[var(--gv-forest)]"
            }`}
          >
            {title}
          </h1>
          {description && (
            <p
              className={`mt-5 max-w-2xl text-base leading-relaxed sm:text-lg ${
                dark ? "text-[var(--gv-mint)]/80" : "text-[var(--gv-ink-soft)]"
              }`}
            >
              {description}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </Reveal>
      </div>
    </section>
  );
}

export function PageSection({
  children,
  className = "",
  id,
  mint = false,
  dark = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  mint?: boolean;
  dark?: boolean;
}) {
  const bg = dark
    ? "bg-[var(--gv-forest)]"
    : mint
    ? "gv-bg-mint"
    : "bg-[var(--gv-cream)]";
  return (
    <section id={id} className={`relative ${bg} ${className}`}>
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-10 sm:py-20">
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent = "var(--gv-leaf)",
  dark = false,
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  accent?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal direction="up" className={`mb-10 max-w-2xl ${className}`}>
      {eyebrow && (
        <div className="flex items-center gap-3">
          <span className="h-px w-12" style={{ background: accent }} />
          <span
            className="text-xs font-bold uppercase tracking-[0.28em]"
            style={{ color: dark ? accent : "var(--gv-leaf-dark)" }}
          >
            {eyebrow}
          </span>
        </div>
      )}
      <h2
        className={`mt-4 font-[family-name:var(--font-jakarta)] text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.05] tracking-tight ${
          dark ? "text-[var(--gv-lime)]" : "text-[var(--gv-forest)]"
        }`}
      >
        {title}
      </h2>
    </Reveal>
  );
}

export function PageCTA({
  title,
  description,
  primaryLabel,
  primaryHref,
  onPrimary,
  secondaryLabel,
  secondaryHref,
  onSecondary,
}: {
  title: ReactNode;
  description: string;
  primaryLabel: string;
  primaryHref?: string;
  onPrimary?: () => void;
  secondaryLabel?: string;
  secondaryHref?: string;
  onSecondary?: () => void;
}) {
  return (
    <PageSection dark>
      <Reveal direction="up" className="text-center">
        <h2 className="mx-auto max-w-2xl font-[family-name:var(--font-jakarta)] text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.1] text-[var(--gv-lime)]">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[var(--gv-mint)]/80">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <GvButton href={primaryHref} onClick={onPrimary} variant="lime">
            {primaryLabel}
          </GvButton>
          {secondaryLabel && (
            <GvButton
              href={secondaryHref}
              onClick={onSecondary}
              variant="ghost"
              withArrow={false}
            >
              {secondaryLabel}
            </GvButton>
          )}
        </div>
      </Reveal>
    </PageSection>
  );
}

/** Animated entrance wrapper used by the router. */
export function PageTransition({
  pageKey,
  children,
}: {
  pageKey: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      key={pageKey}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
