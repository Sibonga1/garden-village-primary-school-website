"use client";

/**
 * programs-page.tsx  ──  PageKey: "programs"
 * ----------------------------------------------------------------------------
 * Reuses <Programs/> (6 tilt cards), adds an "Our Approach" explainer and a
 * sample daily timetable, finishing with a CTA.
 * ----------------------------------------------------------------------------
 */

import { motion } from "framer-motion";
import { BookOpen, Palette, Sprout, Clock, ArrowRight } from "lucide-react";
import { Programs } from "@/components/site/programs";
import { Reveal } from "@/components/site/reveal";
import { PageSection, PageCTA, SectionHeading } from "@/components/site/page-kit";
import { usePage } from "@/lib/page-store";

const approach = [
  { icon: BookOpen, title: "CAPS-aligned", text: "Literacy, numeracy, sciences and languages following the national curriculum, enriched by our own garden-first philosophy." },
  { icon: Palette, title: "Holistic", text: "We measure success in confidence and character, not only in marks — arts, sport and wellbeing count as much as academics." },
  { icon: Sprout, title: "Hands-on", text: "Learning happens in the garden, the lab and the community, not only at a desk. Children do, make and grow." },
];

const timetable = [
  { time: "07:30", activity: "Gates open · morning reading" },
  { time: "08:00", activity: "Assembly & circle time" },
  { time: "08:45", activity: "Literacy block" },
  { time: "10:15", activity: "Snack & outdoor play" },
  { time: "10:45", activity: "Numeracy block" },
  { time: "12:30", activity: "Lunch & garden time" },
  { time: "13:30", activity: "Inquiry / specialist (art, code, sport)" },
  { time: "15:00", activity: "Dismissal · aftercare begins" },
];

export function ProgramsPage() {
  const navigate = usePage((s) => s.navigate);

  return (
    <>
      <Programs />

      {/* Approach */}
      <PageSection mint>
        <SectionHeading
          eyebrow="How We Teach"
          title={
            <>
              Our{" "}
              <span className="font-[family-name:var(--font-playfair)] italic font-medium">
                approach
              </span>
            </>
          }
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {approach.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.08} direction="up">
              <motion.div whileHover={{ y: -6 }} className="h-full rounded-[22px] border border-[var(--gv-leaf)]/15 bg-white p-6 shadow-[0_18px_40px_-25px_rgba(14,42,31,0.4)]">
                <a.icon className="h-7 w-7 text-[var(--gv-leaf-dark)]" />
                <h3 className="mt-3 font-[family-name:var(--font-jakarta)] text-lg font-bold text-[var(--gv-forest)]">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--gv-ink-soft)]">
                  {a.text}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </PageSection>

      {/* Timetable */}
      <PageSection>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal direction="up">
            <SectionHeading
              eyebrow="A Day in the Garden"
              title={
                <>
                  Sample{" "}
                  <span className="font-[family-name:var(--font-playfair)] italic font-medium">
                    timetable
                  </span>
                </>
              }
              className="mb-0"
            />
            <p className="mt-4 max-w-md text-[var(--gv-ink-soft)]">
              Days at Garden Village balance focused learning with movement,
              creativity and time in nature. Here&apos;s a typical Grade 4 day.
            </p>
          </Reveal>
          <Reveal direction="left" delay={0.1}>
            <div className="overflow-hidden rounded-[22px] border border-[var(--gv-leaf)]/15 bg-white shadow-sm">
              {timetable.map((row, i) => (
                <div
                  key={row.time}
                  className={`flex items-center gap-4 px-5 py-4 ${i !== timetable.length - 1 ? "border-b border-[var(--gv-mint)]" : ""}`}
                >
                  <span className="flex w-20 shrink-0 items-center gap-1.5 font-mono text-sm font-bold text-[var(--gv-leaf-dark)]">
                    <Clock className="h-3.5 w-3.5" />
                    {row.time}
                  </span>
                  <span className="text-sm text-[var(--gv-ink-soft)]">{row.activity}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </PageSection>

      <PageCTA
        title={
          <>
            Ready to{" "}
            <span className="font-[family-name:var(--font-playfair)] italic font-medium">
              enrol
            </span>
            ?
          </>
        }
        description="Start the conversation — our admissions team replies within 48 hours."
        primaryLabel="Contact Admissions"
        onPrimary={() => navigate("contact")}
        secondaryLabel="See upcoming events"
        onSecondary={() => navigate("events")}
      />
    </>
  );
}
