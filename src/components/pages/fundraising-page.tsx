"use client";

/**
 * fundraising-page.tsx  ──  PageKey: "fundraising"
 * ----------------------------------------------------------------------------
 * Reuses <Fundraising/> (parallax banner + progress), then adds donor tiers,
 * a "where the money goes" breakdown, and a CTA.
 * ----------------------------------------------------------------------------
 */

import { motion } from "framer-motion";
import { HandHeart, BookOpen, FlaskConical, Sun, ArrowRight } from "lucide-react";
import { Fundraising } from "@/components/site/fundraising";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { PageSection, PageCTA, SectionHeading } from "@/components/site/page-kit";
import { donorTiers } from "@/lib/site-data";
import { usePage } from "@/lib/page-store";

const spendBreakdown = [
  { icon: BookOpen, label: "Library books & shelving", pct: 40 },
  { icon: FlaskConical, label: "Science garden & lab kits", pct: 30 },
  { icon: Sun, label: "Solar power & lighting", pct: 20 },
  { icon: HandHeart, label: "Bursaries for learners", pct: 10 },
];

export function FundraisingPage() {
  const navigate = usePage((s) => s.navigate);

  return (
    <>
      <Fundraising />

      {/* Donor tiers */}
      <PageSection>
        <SectionHeading
          eyebrow="Give"
          title={
            <>
              Choose your{" "}
              <span className="font-[family-name:var(--font-playfair)] italic font-medium">
                seed
              </span>
            </>
          }
        />
        <RevealGroup stagger={0.1} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {donorTiers.map((tier) => (
            <RevealItem key={tier.name} direction="up">
              <motion.div
                whileHover={{ y: -8 }}
                className="group relative h-full overflow-hidden rounded-[22px] border bg-white p-6 shadow-[0_18px_40px_-25px_rgba(14,42,31,0.4)]"
                style={{ borderColor: `${tier.accent}40` }}
              >
                <div
                  className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-50"
                  style={{ background: tier.accent }}
                />
                <div className="relative">
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: tier.accent }}>
                    {tier.name}
                  </div>
                  <div className="mt-2 font-[family-name:var(--font-jakarta)] text-4xl font-extrabold text-[var(--gv-forest)]">
                    {tier.amount}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--gv-ink-soft)]">
                    {tier.perk}
                  </p>
                  <motion.button
                    type="button"
                    onClick={() => navigate("contact")}
                    whileHover={{ x: 3 }}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--gv-forest)]"
                  >
                    Donate
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>
      </PageSection>

      {/* Where money goes */}
      <PageSection mint>
        <SectionHeading
          eyebrow="Transparency"
          title={
            <>
              Where your{" "}
              <span className="font-[family-name:var(--font-playfair)] italic font-medium">
                money
              </span>{" "}
              grows
            </>
          }
        />
        <div className="space-y-4">
          {spendBreakdown.map((row, i) => (
            <Reveal key={row.label} delay={i * 0.06} direction="up">
              <div className="flex items-center gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--gv-leaf)]/15 text-[var(--gv-leaf-dark)]">
                  <row.icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-[var(--gv-forest)]">{row.label}</span>
                    <span className="font-mono font-bold text-[var(--gv-leaf-dark)]">{row.pct}%</span>
                  </div>
                  <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-white">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${row.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                      className="h-full rounded-full bg-gradient-to-r from-[var(--gv-lime)] to-[var(--gv-leaf)]"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </PageSection>

      <PageCTA
        title={
          <>
            Every rand{" "}
            <span className="font-[family-name:var(--font-playfair)] italic font-medium">
              plants a seed
            </span>
          </>
        }
        description="Donate, volunteer, or share our campaign — your support grows futures."
        primaryLabel="Donate Now"
        onPrimary={() => navigate("contact")}
        secondaryLabel="Read our story"
        onSecondary={() => navigate("about")}
      />
    </>
  );
}
