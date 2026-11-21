"use client";

/**
 * home-page.tsx  ──  PageKey: "home"
 * ----------------------------------------------------------------------------
 * The landing page. Curated highlights, not the full long-scroll.
 *  • Hero (reused from site/hero.tsx — keeps the GSAP headline + tree)
 *  • Stats band
 *  • Programs preview (3 of 6 cards → links to full Programs page)
 *  • Fundraising teaser → Fundraising page
 *  • Testimonials carousel
 *  • CTA band → Contact page
 * ----------------------------------------------------------------------------
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sprout } from "lucide-react";
import { Hero } from "@/components/site/hero";
import { Stats } from "@/components/site/stats";
import { Testimonials } from "@/components/site/testimonials";
import { GvButton } from "@/components/site/gv-button";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { PageSection, PageCTA, SectionHeading } from "@/components/site/page-kit";
import { programs, heroStats } from "@/lib/site-data";
import { CountUp } from "@/components/site/count-up";
import { usePage } from "@/lib/page-store";

const programIcons = ["BookOpen", "Trophy", "Sprout"] as const;

export function HomePage() {
  const navigate = usePage((s) => s.navigate);
  const preview = programs.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Programs preview */}
      <PageSection>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="What We Offer"
            title={
              <>
                Learning that{" "}
                <span className="font-[family-name:var(--font-playfair)] italic font-medium">
                  grows
                </span>{" "}
                the whole child
              </>
            }
          />
          <Reveal direction="up">
            <button
              type="button"
              onClick={() => navigate("programs")}
              className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--gv-forest)]"
            >
              All programs
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </Reveal>
        </div>

        <RevealGroup stagger={0.1} className="mt-8 grid gap-5 sm:grid-cols-3">
          {preview.map((p) => (
            <RevealItem key={p.title} direction="up">
              <motion.button
                type="button"
                onClick={() => navigate("programs")}
                whileHover={{ y: -6 }}
                className="group relative w-full overflow-hidden rounded-[22px] border border-[var(--gv-leaf)]/15 bg-white p-6 text-left shadow-[0_18px_40px_-25px_rgba(14,42,31,0.4)]"
              >
                <span
                  className="mb-4 grid h-12 w-12 place-items-center rounded-2xl"
                  style={{ background: `${p.accent}22`, color: p.accent }}
                >
                  <Sprout className="h-6 w-6" />
                </span>
                <h3 className="font-[family-name:var(--font-jakarta)] text-lg font-bold text-[var(--gv-forest)]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--gv-ink-soft)] line-clamp-3">
                  {p.description}
                </p>
                <span
                  className="mt-4 block h-1 w-10 rounded-full transition-all duration-500 group-hover:w-20"
                  style={{ background: p.accent }}
                />
              </motion.button>
            </RevealItem>
          ))}
        </RevealGroup>
      </PageSection>

      {/* Mini stats strip */}
      <PageSection dark className="!py-14">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {heroStats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-[family-name:var(--font-jakarta)] text-4xl font-extrabold text-[var(--gv-lime)] sm:text-5xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--gv-mint)]/70">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      {/* Fundraising teaser */}
      <PageSection mint>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal direction="up">
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--gv-leaf-dark)]">
              Fundraising
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-jakarta)] text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.05] text-[var(--gv-forest)]">
              Help us build the new{" "}
              <span className="font-[family-name:var(--font-playfair)] italic font-medium">
                Library &amp; Eco-Lab
              </span>
            </h2>
            <p className="mt-4 max-w-md text-[var(--gv-ink-soft)]">
              A solar-powered library and science garden so every learner can
              read, explore and grow. We&apos;re 74% of the way there.
            </p>
            <div className="mt-6">
              <GvButton onClick={() => navigate("fundraising")} variant="lime">
                See the campaign
              </GvButton>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <div className="rounded-[22px] border border-[var(--gv-leaf)]/15 bg-white p-6 shadow-lg">
              <div className="flex items-center justify-between text-sm font-semibold text-[var(--gv-forest)]">
                <span>R184,000 raised</span>
                <span className="text-[var(--gv-leaf-dark)]">74%</span>
              </div>
              <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-[var(--gv-mint)]">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "74%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-gradient-to-r from-[var(--gv-lime)] to-[var(--gv-leaf)]"
                />
              </div>
              <div className="mt-2 text-xs text-[var(--gv-ink-soft)]">
                Goal: R250,000 · 214 donors · 28 days left
              </div>
            </div>
          </Reveal>
        </div>
      </PageSection>

      <Testimonials />

      <PageCTA
        title={
          <>
            Come and see Garden Village{" "}
            <span className="font-[family-name:var(--font-playfair)] italic font-medium">
              for yourself
            </span>
          </>
        }
        description="Book a campus visit, enrol your child, or simply say hello. We'd love to meet you."
        primaryLabel="Contact Us"
        onPrimary={() => navigate("contact")}
        secondaryLabel="Meet our staff"
        onSecondary={() => navigate("staff")}
      />
    </>
  );
}
