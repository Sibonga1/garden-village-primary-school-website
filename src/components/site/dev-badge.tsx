"use client";

/**
 * dev-badge.tsx
 * ----------------------------------------------------------------------------
 * <DevBadge meta={...} /> — a small floating label pinned to the top-left of
 * a section while Developer Mode is ON.
 *
 * Shows, at a glance:
 *   • Section NAME + #id
 *   • Source FILE (click to nothing — it's just a reference)
 *   • DATA source
 *   • ANIMATION libraries used
 *   • CONNECTS-TO (which other anchors/sections this links to)
 *
 * Place <DevBadge> as a direct child of a `position: relative` section.
 * It only renders when useDevMode().enabled === true.
 * ----------------------------------------------------------------------------
 */

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FileCode2,
  Database,
  Sparkles,
  Link2,
  ChevronDown,
  Hash,
} from "lucide-react";
import { useDevMode } from "./dev-context";
import type { DevSectionMeta } from "@/lib/dev-registry";

export function DevBadge({ meta }: { meta: DevSectionMeta }) {
  const { enabled } = useDevMode();
  const [open, setOpen] = useState(false);

  return (
    <AnimatePresence>
      {enabled && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -6 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto absolute left-3 top-3 z-40 max-w-[min(92vw,420px)]"
        >
          {/* Header row (always visible) */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-2 rounded-xl border px-3 py-2 text-left font-mono text-[11px] shadow-lg backdrop-blur-md transition-colors"
            style={{
              background: "rgba(14,42,31,0.92)",
              borderColor: meta.accent,
              color: "#e8f0e4",
            }}
          >
            <span
              className="grid h-6 w-6 shrink-0 place-items-center rounded-md font-bold"
              style={{ background: meta.accent, color: "#0e2a1f" }}
            >
              {meta.name[0]}
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-bold text-white">{meta.name}</span>
              <span className="flex items-center gap-1 text-[10px] opacity-70">
                <Hash className="h-2.5 w-2.5" />
                {meta.id}
              </span>
            </span>
            <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </motion.span>
          </button>

          {/* Detail panel (expand on click) */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div
                  className="mt-1.5 space-y-2 rounded-xl border p-3 font-mono text-[10.5px] leading-relaxed shadow-lg backdrop-blur-md"
                  style={{
                    background: "rgba(14,42,31,0.88)",
                    borderColor: "rgba(255,255,255,0.12)",
                    color: "#cdd8c8",
                  }}
                >
                  <Row icon={<FileCode2 className="h-3 w-3" />} label="FILE">
                    <span className="text-white">{meta.file}</span>
                    <span className="ml-1 opacity-60">{meta.component}</span>
                  </Row>
                  <Row icon={<Database className="h-3 w-3" />} label="DATA">
                    {meta.data}
                  </Row>
                  <Row icon={<Sparkles className="h-3 w-3" />} label="ANIM">
                    {meta.animations}
                  </Row>
                  <Row icon={<Link2 className="h-3 w-3" />} label="LINKS">
                    <span style={{ color: meta.accent }}>{meta.connects}</span>
                  </Row>
                  <div className="border-t border-white/10 pt-2 text-[10px] italic opacity-70">
                    {meta.purpose}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-2">
      <span className="flex shrink-0 items-center gap-1 opacity-70">
        {icon}
        <span className="font-bold tracking-wider text-[9px]">{label}</span>
      </span>
      <span className="flex-1">{children}</span>
    </div>
  );
}
