"use client";

/**
 * dev-panel.tsx
 * ----------------------------------------------------------------------------
 * The Developer Overlay control center.
 *
 *   • Floating DEV toggle button — bottom-left (never conflicts with the
 *     BackToTop button which lives bottom-right).
 *   • When ON, shows a collapsible ARCHITECTURE MAP side panel listing:
 *       - Every section (id, file, data, anim, connects, purpose)
 *       - Persistent Navbar + Footer
 *       - Shared primitives (Reveal, GvButton, Crest, CountUp...)
 *   • Press  D  anywhere to toggle (handled in dev-context.tsx).
 *
 *  This panel is the single, readable map of "what connects to what" —
 *  open it while troubleshooting to see the whole page graph at once.
 * ----------------------------------------------------------------------------
 */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bug,
  X,
  Terminal,
  Layers,
  ArrowRight,
  FileCode2,
  Database,
  Sparkles,
  Link2,
  Hash,
  Component,
  Keyboard,
  File,
} from "lucide-react";
import { useDevMode } from "./dev-context";
import { devSections, devPersistent, devPrimitives } from "@/lib/dev-registry";

type Tab = "sections" | "shared" | "help";

export function DevPanel() {
  const { enabled, toggle } = useDevMode();
  const [mapOpen, setMapOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("sections");

  return (
    <>
      {/* ===== Floating toggle button (always visible) ===== */}
      <motion.button
        type="button"
        onClick={() => {
          toggle();
          setMapOpen((o) => (!enabled ? true : o));
        }}
        whileHover={{ y: -2, scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        aria-label={enabled ? "Turn developer overlay off" : "Turn developer overlay on"}
        aria-pressed={enabled}
        className="fixed bottom-5 left-5 z-[70] flex items-center gap-2 rounded-full px-4 py-2.5 font-mono text-[11px] font-bold shadow-[0_14px_30px_-8px_rgba(14,42,31,0.6)] sm:bottom-7 sm:left-7"
        style={{
          background: enabled ? "var(--gv-lime)" : "rgba(14,42,31,0.92)",
          color: enabled ? "var(--gv-forest)" : "var(--gv-lime)",
          border: enabled
            ? "1px solid var(--gv-forest)"
            : "1px solid rgba(214,247,90,0.25)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Bug className="h-4 w-4" />
        {enabled ? "DEV ON" : "DEV"}
      </motion.button>

      {/* ===== Architecture map side panel (only when dev on + map open) ===== */}
      <AnimatePresence>
        {enabled && mapOpen && (
          <motion.div
            key="dev-map"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="fixed inset-y-0 left-0 z-[65] flex w-[min(440px,94vw)] flex-col bg-[var(--gv-forest-3)] text-[var(--gv-mint)] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-2">
                <Terminal className="h-5 w-5 text-[var(--gv-lime)]" />
                <span className="font-mono text-sm font-bold text-white">
                  Architecture Map
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMapOpen(false)}
                aria-label="Close map"
                className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Status line */}
            <div className="flex items-center gap-2 bg-[var(--gv-lime)]/10 px-5 py-2 font-mono text-[10px] text-[var(--gv-lime)]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--gv-lime)]" />
              Developer overlay ACTIVE · labels pinned to every section
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-white/10 px-3 py-2">
              {(
                [
                  { k: "sections", l: "Sections", Icon: Layers },
                  { k: "shared", l: "Shared", Icon: Component },
                  { k: "help", l: "Help", Icon: Keyboard },
                ] as { k: Tab; l: string; Icon: typeof Layers }[]
              ).map(({ k, l, Icon }) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setTab(k)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-[11px] font-semibold transition-colors ${
                    tab === k
                      ? "bg-[var(--gv-lime)] text-[var(--gv-forest)]"
                      : "text-[var(--gv-mint)]/60 hover:bg-white/5"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {l}
                </button>
              ))}
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {tab === "sections" && (
                <div className="space-y-3">
                  {/* Page entry node */}
                  <FlowNode
                    title="page.tsx"
                    subtitle="src/app/page.tsx · the only route"
                    accent="var(--gv-lime)"
                    icon={<FileCode2 className="h-4 w-4" />}
                  >
                    Composes all sections in order:
                    <div className="mt-2 flex flex-wrap gap-1">
                      {devSections.map((s) => (
                        <span
                          key={s.id}
                          className="rounded px-1.5 py-0.5 font-mono text-[9px]"
                          style={{ background: `${s.accent}22`, color: s.accent }}
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </FlowNode>

                  <Connector />

                  {/* Persistent: Navbar */}
                  {devPersistent
                    .filter((p) => p.name === "Navbar")
                    .map((p) => (
                      <FlowNode
                        key={p.name}
                        title={p.name}
                        subtitle={`${p.file} · ${p.component}`}
                        accent={p.accent}
                        icon={<Layers className="h-4 w-4" />}
                      >
                        <Meta icon={<Database className="h-3 w-3" />} label="DATA">
                          {p.data}
                        </Meta>
                        <Meta icon={<Sparkles className="h-3 w-3" />} label="ANIM">
                          {p.animations}
                        </Meta>
                        <Meta icon={<Link2 className="h-3 w-3" />} label="LINKS">
                          <span style={{ color: p.accent }}>{p.connects}</span>
                        </Meta>
                      </FlowNode>
                    ))}

                  <Connector label="↓ renders into the page" />

                  {/* Each section in document order */}
                  {devSections.map((s, i) => (
                    <div key={s.id}>
                      <FlowNode
                        title={s.name}
                        subtitle={`${s.file} · ${s.component}`}
                        accent={s.accent}
                        icon={<Hash className="h-3.5 w-3.5" />}
                        anchor={s.id}
                      >
                        <Meta icon={<Database className="h-3 w-3" />} label="DATA">
                          {s.data}
                        </Meta>
                        <Meta icon={<Sparkles className="h-3 w-3" />} label="ANIM">
                          {s.animations}
                        </Meta>
                        <Meta icon={<Link2 className="h-3 w-3" />} label="LINKS">
                          <span style={{ color: s.accent }}>{s.connects}</span>
                        </Meta>
                        <div className="mt-1.5 border-t border-white/10 pt-1.5 text-[10px] italic opacity-70">
                          {s.purpose}
                        </div>
                      </FlowNode>
                      {i < devSections.length - 1 && <Connector />}
                    </div>
                  ))}

                  <Connector label="↓ sticky to bottom" />

                  {/* Footer */}
                  {devPersistent
                    .filter((p) => p.name === "Footer")
                    .map((p) => (
                      <FlowNode
                        key={p.name}
                        title={p.name}
                        subtitle={`${p.file} · ${p.component}`}
                        accent={p.accent}
                        icon={<Layers className="h-4 w-4" />}
                      >
                        <Meta icon={<Database className="h-3 w-3" />} label="DATA">
                          {p.data}
                        </Meta>
                        <Meta icon={<Sparkles className="h-3 w-3" />} label="ANIM">
                          {p.animations}
                        </Meta>
                        <Meta icon={<Link2 className="h-3 w-3" />} label="LINKS">
                          <span style={{ color: p.accent }}>{p.connects}</span>
                        </Meta>
                      </FlowNode>
                    ))}
                </div>
              )}

              {tab === "shared" && (
                <div className="space-y-2">
                  <p className="mb-2 font-mono text-[10px] text-[var(--gv-mint)]/60">
                    Reusable building blocks consumed by multiple sections.
                  </p>
                  {devPrimitives.map((p) => (
                    <div
                      key={p.name}
                      className="rounded-xl border border-white/10 bg-white/5 p-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[12px] font-bold text-white">
                          {p.name}
                        </span>
                        <FileCode2 className="h-3.5 w-3.5 text-[var(--gv-lime)]/70" />
                      </div>
                      <div className="mt-1 font-mono text-[10px] text-[var(--gv-lime)]/80">
                        {p.file}
                      </div>
                      <div className="mt-2 text-[11px] text-[var(--gv-mint)]/80">
                        {p.note}
                      </div>
                      <div className="mt-2 flex items-start gap-1 text-[10px] text-[var(--gv-mint)]/60">
                        <span className="font-bold text-[var(--gv-lime)]/70">USED:</span>
                        <span>{p.used}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {tab === "help" && (
                <div className="space-y-4 font-mono text-[11px] text-[var(--gv-mint)]/85">
                  <div>
                    <div className="mb-1 font-bold text-[var(--gv-lime)]">
                      How to use this overlay
                    </div>
                    <p className="leading-relaxed">
                      Each section on the page now has a small label pinned to
                      its top-left corner. Click a label to expand its full
                      metadata (file, data source, animations, links).
                    </p>
                  </div>
                  <div>
                    <div className="mb-1 font-bold text-[var(--gv-lime)]">
                      Keyboard
                    </div>
                    <Kbd>D</Kbd>
                    <span className="ml-2">Toggle developer overlay on/off</span>
                  </div>
                  <div>
                    <div className="mb-1 font-bold text-[var(--gv-lime)]">
                      Where to look when troubleshooting
                    </div>
                    <ol className="ml-4 list-decimal space-y-1.5">
                      <li>
                        Find the broken section on the page and click its label
                        badge.
                      </li>
                      <li>
                        Note the <b>FILE</b> path → open it in your editor.
                      </li>
                      <li>
                        Check <b>DATA</b> → the data comes from{" "}
                        <code className="text-[var(--gv-lime)]">
                          lib/site-data.ts
                        </code>
                        .
                      </li>
                      <li>
                        Check <b>ANIM</b> → most are GSAP ScrollTrigger or
                        Motion/Framer.
                      </li>
                      <li>
                        Check <b>LINKS</b> → confirms which anchor each CTA
                        targets.
                      </li>
                    </ol>
                  </div>
                  <div>
                    <div className="mb-1 font-bold text-[var(--gv-lime)]">
                      Key files
                    </div>
                    <ul className="space-y-1">
                      <li>
                        <File className="text-[var(--gv-lime)]" />{" "}
                        src/app/page.tsx — page composition
                      </li>
                      <li>
                        <File className="text-[var(--gv-lime)]" />{" "}
                        src/lib/site-data.ts — all content/data
                      </li>
                      <li>
                        <File className="text-[var(--gv-lime)]" />{" "}
                        src/lib/dev-registry.ts — this overlay&apos;s source of
                        truth
                      </li>
                      <li>
                        <File className="text-[var(--gv-lime)]" />{" "}
                        src/components/site/* — all UI components
                      </li>
                      <li>
                        <File className="text-[var(--gv-lime)]" />{" "}
                        src/app/globals.css — theme tokens (gv-*) + keyframes
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Footer bar */}
            <div className="border-t border-white/10 px-4 py-3">
              <button
                type="button"
                onClick={toggle}
                className="w-full rounded-lg bg-white/10 py-2 font-mono text-[11px] font-bold text-white transition-colors hover:bg-[var(--gv-lime)] hover:text-[var(--gv-forest)]"
              >
                Turn overlay OFF
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Re-open map mini button (shown when overlay on but map closed) ===== */}
      <AnimatePresence>
        {enabled && !mapOpen && (
          <motion.button
            type="button"
            onClick={() => setMapOpen(true)}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed bottom-20 left-5 z-[70] flex items-center gap-2 rounded-full border border-[var(--gv-lime)]/40 bg-[var(--gv-forest)]/90 px-4 py-2 font-mono text-[11px] font-bold text-[var(--gv-lime)] backdrop-blur sm:bottom-24 sm:left-7"
          >
            <Layers className="h-4 w-4" />
            Map
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- small helpers ---------- */

function FlowNode({
  title,
  subtitle,
  accent,
  icon,
  anchor,
  children,
}: {
  title: string;
  subtitle: string;
  accent: string;
  icon: React.ReactNode;
  anchor?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={anchor ? `#${anchor}` : undefined}
      className={`block rounded-xl border bg-white/5 p-3 transition-colors hover:bg-white/10 ${
        anchor ? "cursor-pointer" : "cursor-default"
      }`}
      style={{ borderColor: `${accent}55` }}
    >
      <div className="flex items-center gap-2">
        <span
          className="grid h-7 w-7 shrink-0 place-items-center rounded-md"
          style={{ background: `${accent}22`, color: accent }}
        >
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[13px] font-bold text-white">
              {title}
            </span>
            {anchor && (
              <span className="font-mono text-[9px] text-[var(--gv-lime)]/60">
                #{anchor}
              </span>
            )}
          </div>
          <div className="truncate font-mono text-[10px] text-[var(--gv-mint)]/55">
            {subtitle}
          </div>
        </div>
      </div>
      {children && <div className="mt-2 space-y-1.5">{children}</div>}
    </a>
  );
}

function Connector({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-center py-1">
      <div className="flex flex-col items-center">
        <ArrowRight className="h-3 w-3 rotate-90 text-[var(--gv-lime)]/40" />
        {label && (
          <span className="mt-0.5 font-mono text-[9px] text-[var(--gv-mint)]/40">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

function Meta({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-1.5 font-mono text-[10px] leading-relaxed text-[var(--gv-mint)]/80">
      <span className="flex shrink-0 items-center gap-1 opacity-70">
        {icon}
        <span className="font-bold text-[9px] tracking-wider">{label}</span>
      </span>
      <span className="flex-1">{children}</span>
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-grid h-6 min-w-6 place-items-center rounded border border-white/20 bg-white/10 px-1.5 font-mono text-[11px] text-white shadow-[0_2px_0_rgba(0,0,0,0.3)]">
      {children}
    </kbd>
  );
}
