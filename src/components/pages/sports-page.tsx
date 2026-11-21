"use client";

/**
 * sports-page.tsx  ──  PageKey: "sports"
 * ----------------------------------------------------------------------------
 * Sports & Wellness page. PageHero + sports grid + fixtures table + CTA.
 * ----------------------------------------------------------------------------
 */

import { motion } from "framer-motion";
import {
  Volleyball, Target, Zap, Waves, Trophy, Crown,
  type LucideIcon,
} from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { PageShell, PageHero, PageSection, PageCTA, SectionHeading } from "@/components/site/page-kit";
import { sports } from "@/lib/site-data";
import { usePage } from "@/lib/page-store";

const sportIcons: Record<string, LucideIcon> = {
  Volleyball, Target, Zap, Waves, Trophy, Crown,
};

const fixtures = [
  { date: "18 Apr", home: "Garden Village", away: "Riverside Primary", sport: "Soccer (U11)" },
  { date: "25 Apr", home: "Sunfield Prep", away: "Garden Village", sport: "Netball (U13)" },
  { date: "02 May", home: "Garden Village", away: "Hillview School", sport: "Athletics" },
  { date: "16 May", home: "Garden Village", away: "Oakridge Primary", sport: "Cricket (U13)" },
];

export function SportsPage() {
  const navigate = usePage((s) => s.navigate);

  return (
    <PageShell>
      <PageHero
        eyebrow="Play & Wellness"
        title={
          <>
            Sports &amp;{" "}
            <span className="font-[family-name:var(--font-playfair)] italic font-medium">
              Wellness
            </span>
          </>
        }
        description="Soccer, netball, athletics and swimming build teamwork, resilience and healthy habits for life."
        accent="#f5c518"
      >
        <div className="flex flex-wrap gap-6">
          {[
            { v: "12+", l: "Teams" },
            { v: "4", l: "Sports" },
            { v: "98%", l: "Participation" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-[family-name:var(--font-jakarta)] text-3xl font-extrabold text-[var(--gv-forest)]">
                {s.v}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--gv-leaf-dark)]">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Sports on offer */}
      <PageSection>
        <SectionHeading
          eyebrow="On Offer"
          title={
            <>
              Sports we{" "}
              <span className="font-[family-name:var(--font-playfair)] italic font-medium">
                play
              </span>
            </>
          }
        />
        <RevealGroup stagger={0.08} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sports.map((sp) => {
            const Icon = sportIcons[sp.icon] ?? Trophy;
            return (
              <RevealItem key={sp.name} direction="up">
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group h-full rounded-[22px] border border-[var(--gv-leaf)]/15 bg-white p-6 shadow-[0_18px_40px_-25px_rgba(14,42,31,0.4)]"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--gv-gold)]/20 text-[var(--gv-forest)]">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="rounded-full bg-[var(--gv-mint)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--gv-leaf-dark)]">
                      {sp.season}
                    </span>
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-jakarta)] text-xl font-bold text-[var(--gv-forest)]">
                    {sp.name}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--gv-ink-soft)]">
                    Teams: <span className="font-semibold text-[var(--gv-forest)]">{sp.teams}</span>
                  </p>
                </motion.div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </PageSection>

      {/* Fixtures */}
      <PageSection mint>
        <SectionHeading
          eyebrow="Coming Up"
          title={
            <>
              Upcoming{" "}
              <span className="font-[family-name:var(--font-playfair)] italic font-medium">
                fixtures
              </span>
            </>
          }
        />
        <Reveal direction="up">
          <div className="overflow-hidden rounded-[22px] border border-[var(--gv-leaf)]/15 bg-white shadow-sm">
            {fixtures.map((f, i) => (
              <div
                key={i}
                className={`grid grid-cols-2 items-center gap-3 px-5 py-4 sm:grid-cols-4 ${i !== fixtures.length - 1 ? "border-b border-[var(--gv-mint)]" : ""}`}
              >
                <span className="font-mono text-sm font-bold text-[var(--gv-leaf-dark)]">{f.date}</span>
                <span className="text-sm text-[var(--gv-ink-soft)]">
                  <span className="font-semibold text-[var(--gv-forest)]">{f.home}</span> vs {f.away}
                </span>
                <span className="hidden text-sm text-[var(--gv-ink-soft)] sm:block">{f.sport}</span>
                <span className="hidden justify-end sm:flex">
                  <span className="rounded-full bg-[var(--gv-forest)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--gv-lime)]">
                    Home
                  </span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </PageSection>

      <PageCTA
        title={
          <>
            Want your child to{" "}
            <span className="font-[family-name:var(--font-playfair)] italic font-medium">
              join in
            </span>
            ?
          </>
        }
        description="Enrolment is open. Our coaches welcome every learner, whatever their level."
        primaryLabel="Enrol Now"
        onPrimary={() => navigate("contact")}
        secondaryLabel="See all programs"
        onSecondary={() => navigate("programs")}
      />
    </PageShell>
  );
}
