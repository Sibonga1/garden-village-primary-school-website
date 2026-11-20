"use client";

import { motion } from "framer-motion";

/**
 * Garden Village school crest — an SVG shield with the school name,
 * a central flower emblem flanked by palm fronds, and an
 * "EDUCATION IS POWER" ribbon banner.
 */
export function Crest({ className = "", animate = false }: { className?: string; animate?: boolean }) {
  const Wrap = animate ? motion.div : "div";
  const animProps = animate
    ? {
        animate: { rotate: [0, -3, 3, 0] },
        transition: { duration: 12, repeat: Infinity, ease: "easeInOut" as const },
        style: { transformOrigin: "center" as const },
      }
    : {};

  return (
    // @ts-expect-error motion vs string union is fine here
    <Wrap {...animProps} className={className}>
      <svg viewBox="0 0 300 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
        <defs>
          <linearGradient id="gv-shield-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#fbfdf7" />
          </linearGradient>
          <linearGradient id="gv-ribbon" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f3f6ee" />
          </linearGradient>
        </defs>

        {/* Shield outline */}
        <path
          d="M30 40 Q30 20 50 20 L250 20 Q270 20 270 40 L270 200 Q270 280 150 330 Q30 280 30 200 Z"
          fill="url(#gv-shield-fill)"
          stroke="#2e9e3e"
          strokeWidth="9"
        />
        <path
          d="M44 46 Q44 34 56 34 L244 34 Q256 34 256 46 L256 196 Q256 268 150 312 Q44 268 44 196 Z"
          fill="none"
          stroke="#2e9e3e"
          strokeWidth="2"
          opacity="0.5"
        />

        {/* School name */}
        <text
          x="150"
          y="78"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontWeight="800"
          fontSize="22"
          fill="#0e2a1f"
          letterSpacing="1"
        >
          GARDEN
        </text>
        <text
          x="150"
          y="104"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontWeight="800"
          fontSize="22"
          fill="#0e2a1f"
          letterSpacing="1"
        >
          VILLAGE
        </text>
        <text
          x="150"
          y="126"
          textAnchor="middle"
          fontFamily="Inter, sans-serif"
          fontWeight="700"
          fontSize="11"
          fill="#d42b1e"
          letterSpacing="2.5"
        >
          PRIMARY SCHOOL
        </text>

        {/* Decorative line */}
        <line x1="80" y1="138" x2="220" y2="138" stroke="#2e9e3e" strokeWidth="1.5" />

        {/* Palm fronds (left + right) */}
        <g stroke="#1a4d2e" strokeWidth="2.4" strokeLinecap="round" fill="none">
          {/* left frond */}
          <path d="M92 200 Q70 178 60 150" />
          <path d="M92 200 Q66 192 48 174" />
          <path d="M92 200 Q70 206 52 206" />
          <path d="M92 200 Q78 218 66 232" />
          <path d="M92 200 Q92 220 88 240" />
          {/* right frond */}
          <path d="M208 200 Q230 178 240 150" />
          <path d="M208 200 Q234 192 252 174" />
          <path d="M208 200 Q230 206 248 206" />
          <path d="M208 200 Q222 218 234 232" />
          <path d="M208 200 Q208 220 212 240" />
        </g>

        {/* Central flower */}
        <g transform="translate(150 200)">
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={a}
              cx="0"
              cy="-18"
              rx="11"
              ry="22"
              fill="#d42b1e"
              transform={`rotate(${a})`}
              opacity="0.92"
            />
          ))}
          <circle r="12" fill="#f5c518" />
          <circle r="6" fill="#d42b1e" />
        </g>

        {/* Ribbon banner */}
        <path
          d="M40 274 L60 256 L260 256 L240 274 L260 292 L60 292 Z"
          fill="url(#gv-ribbon)"
          stroke="#2e9e3e"
          strokeWidth="1.5"
        />
        <path d="M40 274 L20 286 L34 280 L20 292 L40 280 Z" fill="#dde3dc" stroke="#2e9e3e" strokeWidth="1" />
        <path d="M260 274 L280 286 L266 280 L280 292 L260 280 Z" fill="#dde3dc" stroke="#2e9e3e" strokeWidth="1" />
        <text
          x="150"
          y="281"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontWeight="800"
          fontSize="13"
          fill="#d42b1e"
          letterSpacing="1.5"
        >
          EDUCATION IS POWER
        </text>
      </svg>
    </Wrap>
  );
}
