"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "light" | "lime" | "outline" | "ghost";

const variantStyles: Record<Variant, string> = {
  light:
    "bg-[var(--gv-sage-2)] text-[var(--gv-ink)] hover:bg-[var(--gv-sage-3)]",
  lime: "bg-[var(--gv-lime)] text-[var(--gv-forest)] hover:bg-[var(--gv-lime-soft)]",
  outline:
    "bg-transparent text-[var(--gv-forest)] border border-[var(--gv-forest)]/30 hover:border-[var(--gv-forest)]",
  ghost:
    "bg-white/10 text-white border border-white/20 hover:bg-white/20 backdrop-blur",
};

export function GvButton({
  children,
  href,
  variant = "light",
  withArrow = true,
  className = "",
  onClick,
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  withArrow?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const inner = (
    <motion.span
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 18 }}
      className={`group inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 text-sm font-semibold tracking-wide transition-colors duration-300 ${variantStyles[variant]} ${className}`}
    >
      <span>{children}</span>
      {withArrow && (
        <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-[var(--gv-forest)] text-white">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-4 group-hover:-translate-y-4" />
          <ArrowUpRight className="absolute h-4 w-4 -translate-x-4 translate-y-4 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      )}
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className="inline-block">
      {inner}
    </button>
  );
}
