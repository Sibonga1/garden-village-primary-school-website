"use client";

/**
 * conduct-page.tsx  ──  PageKey: "conduct"
 * ----------------------------------------------------------------------------
 * Code of Conduct page. PageHero + 6 rules (Be Safe / Be Kind / ...) +
 * expectations band + CTA.
 * ----------------------------------------------------------------------------
 */

import { motion } from "framer-motion";
import { ShieldCheck, HandHeart, BookOpen, Scale, Lightbulb, Sprout, Download } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { PageShell, PageHero, PageSection, PageCTA, SectionHeading } from "@/components/site/page-kit";
import { conductRules } from "@/lib/site-data";
import { usePage } from "@/lib/page-store";

const ruleIcons = [ShieldCheck, HandHeart, BookOpen, Scale, Lightbulb, Sprout];

const expectations = [
  { who: "Learners", items: ["Arrive on time, ready to learn", "Respect people, property and nature", "Be brave enough to ask for help"] },
  { who: "Staff", items: ["Know and nurture every child", "Teach with clarity, care and joy", "Communicate openly with families"] },
  { who: "Families", items: ["Partner with us in learning", "Keep us informed of needs", "Celebrate effort, not only results"] },
];

export function ConductPage() {
  const navigate = usePage((s) => s.navigate);

  return (
    <PageShell>
      <PageHero
        eyebrow="Our Values"
        title={
          <>
            Code of{" "}
            <span className="font-[family-name:var(--font-playfair)] italic font-medium">
              Conduct
            </span>
          </>
        }
        description="The shared values and expectations that keep our community kind, safe and curious."
        accent="#1a4d2e"
      />

      {/* Rules */}
      <PageSection>
        <SectionHeading
          eyebrow="The Six Be's"
          title={
            <>
              How we{" "}
              <span className="font-[family-name:var(--font-playfair)] italic font-medium">
                live
              </span>{" "}
              together
            </>
          }
        />
        <RevealGroup stagger={0.08} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {conductRules.map((r, i) => {
            const Icon = ruleIcons[i] ?? ShieldCheck;
            return (
              <RevealItem key={r.title} direction="up">
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group h-full rounded-[22px] border border-[var(--gv-leaf)]/15 bg-white p-6 shadow-[0_18px_40px_-25px_rgba(14,42,31,0.4)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[var(--gv-mid-green)]/12 text-[var(--gv-mid-green)]">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="font-[family-name:var(--font-jakarta)] text-lg font-bold text-[var(--gv-forest)]">
                      {r.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--gv-ink-soft)]">
                    {r.text}
                  </p>
                </motion.div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </PageSection>

      {/* Expectations */}
      <PageSection mint>
        <SectionHeading
          eyebrow="Shared Commitments"
          title={
            <>
              What we{" "}
              <span className="font-[family-name:var(--font-playfair)] italic font-medium">
                expect
              </span>
            </>
          }
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {expectations.map((e, i) => (
            <Reveal key={e.who} delay={i * 0.08} direction="up">
              <div className="h-full rounded-[22px] border border-[var(--gv-leaf)]/15 bg-white p-6 shadow-sm">
                <h3 className="font-[family-name:var(--font-jakarta)] text-base font-extrabold uppercase tracking-wider text-[var(--gv-leaf-dark)]">
                  {e.who}
                </h3>
                <ul className="mt-3 space-y-2">
                  {e.items.map((it) => (
                    <li key={it} className="flex items-start gap-2 text-sm text-[var(--gv-ink-soft)]">
                      <Sprout className="mt-0.5 h-4 w-4 shrink-0 text-[var(--gv-leaf)]" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal direction="up" delay={0.2} className="mt-8">
          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            onClick={() => navigate("contact")}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--gv-forest)]/30 px-5 py-3 text-sm font-semibold text-[var(--gv-forest)]"
          >
            <Download className="h-4 w-4" />
            Download the full Code of Conduct (PDF)
          </motion.button>
        </Reveal>
      </PageSection>

      <PageCTA
        title={
          <>
            Questions about{" "}
            <span className="font-[family-name:var(--font-playfair)] italic font-medium">
              our values
            </span>
            ?
          </>
        }
        description="We're happy to walk families through our approach before enrolment."
        primaryLabel="Contact Us"
        onPrimary={() => navigate("contact")}
        secondaryLabel="About the school"
        onSecondary={() => navigate("about")}
      />
    </PageShell>
  );
}
