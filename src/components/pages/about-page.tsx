"use client";

/**
 * about-page.tsx  ──  PageKey: "about"
 * ----------------------------------------------------------------------------
 * School story page. Reuses <About/> (heading + crest + story) and <Stats/>,
 * then adds a Values band and a History timeline, finishing with a CTA.
 * ----------------------------------------------------------------------------
 */

import { motion } from "framer-motion";
import { Sparkles, Heart, Sprout, Users, ArrowRight, type LucideIcon } from "lucide-react";
import { About } from "@/components/site/about";
import { Stats } from "@/components/site/stats";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { PageSection, PageCTA, SectionHeading } from "@/components/site/page-kit";
import { values, timeline } from "@/lib/site-data";
import { usePage } from "@/lib/page-store";

const valueIcons: Record<string, LucideIcon> = { Sparkles, Heart, Sprout, Users };

export function AboutPage() {
  const navigate = usePage((s) => s.navigate);

  return (
    <>
      <About />
      <Stats />

      {/* Values */}
      <PageSection>
        <SectionHeading
          eyebrow="What We Stand For"
          title={
            <>
              Our{" "}
              <span className="font-[family-name:var(--font-playfair)] italic font-medium">
                values
              </span>
            </>
          }
        />
        <RevealGroup stagger={0.1} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => {
            const Icon = valueIcons[v.icon] ?? Sparkles;
            return (
              <RevealItem key={v.title} direction="up">
                <motion.div
                  whileHover={{ y: -6 }}
                  className="h-full rounded-[22px] border border-[var(--gv-leaf)]/15 bg-white p-6 shadow-[0_18px_40px_-25px_rgba(14,42,31,0.4)]"
                >
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--gv-leaf)]/15 text-[var(--gv-leaf-dark)]">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-[family-name:var(--font-jakarta)] text-lg font-bold text-[var(--gv-forest)]">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--gv-ink-soft)]">
                    {v.description}
                  </p>
                </motion.div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </PageSection>

      {/* Timeline */}
      <PageSection mint>
        <SectionHeading
          eyebrow="Our Journey"
          title={
            <>
              How we{" "}
              <span className="font-[family-name:var(--font-playfair)] italic font-medium">
                grew
              </span>
            </>
          }
        />
        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-4 top-0 h-full w-px bg-[var(--gv-leaf)]/30 sm:left-1/2" />
          <div className="space-y-8">
            {timeline.map((item, i) => (
              <Reveal key={item.year} direction={i % 2 === 0 ? "right" : "left"} delay={i * 0.05}>
                <div className={`relative flex items-start gap-6 sm:w-1/2 ${i % 2 === 0 ? "sm:ml-0 sm:pr-12" : "sm:ml-auto sm:pl-12"}`}>
                  {/* dot */}
                  <span className="absolute -left-[1px] top-1 z-10 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full bg-[var(--gv-lime)] text-[10px] font-bold text-[var(--gv-forest)] sm:left-auto sm:right-0 sm:translate-x-1/2">
                    {i % 2 !== 0 && <span className="hidden sm:block" />}
                  </span>
                  <div className="ml-10 rounded-[18px] border border-[var(--gv-leaf)]/15 bg-white p-5 shadow-sm sm:ml-0">
                    <div className="font-[family-name:var(--font-jakarta)] text-2xl font-extrabold text-[var(--gv-leaf-dark)]">
                      {item.year}
                    </div>
                    <h3 className="mt-1 font-[family-name:var(--font-jakarta)] text-base font-bold text-[var(--gv-forest)]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-[var(--gv-ink-soft)]">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </PageSection>

      <PageCTA
        title={
          <>
            Want to{" "}
            <span className="font-[family-name:var(--font-playfair)] italic font-medium">
              visit
            </span>{" "}
            our village?
          </>
        }
        description="Come for a campus tour and see curiosity growing first-hand."
        primaryLabel="Contact Us"
        onPrimary={() => navigate("contact")}
        secondaryLabel="Meet our staff"
        onSecondary={() => navigate("staff")}
      />
    </>
  );
}
