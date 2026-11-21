"use client";

/**
 * careers-page.tsx  ──  PageKey: "careers"
 * ----------------------------------------------------------------------------
 * Careers page. PageHero + open positions list + culture band + apply CTA.
 * ----------------------------------------------------------------------------
 */

import { motion } from "framer-motion";
import { MapPin, Briefcase, GraduationCap, ArrowRight, Heart, Sprout, Lightbulb } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { PageShell, PageHero, PageSection, PageCTA, SectionHeading } from "@/components/site/page-kit";
import { jobOpenings } from "@/lib/site-data";
import { usePage } from "@/lib/page-store";

const culture = [
  { icon: Heart, title: "Caring community", text: "Small classes, big support. Teachers here are known, not just employed." },
  { icon: Sprout, title: "Growth & mentoring", text: "Weekly professional development and mentorship from our leadership team." },
  { icon: Lightbulb, title: "Room to innovate", text: "Bring your ideas — we fund pilots in the garden, the lab and the arts." },
];

export function CareersPage() {
  const navigate = usePage((s) => s.navigate);

  return (
    <PageShell>
      <PageHero
        eyebrow="Join Our Team"
        title={
          <>
            Careers at{" "}
            <span className="font-[family-name:var(--font-playfair)] italic font-medium">
              Garden Village
            </span>
          </>
        }
        description="Teach where curiosity grows. We're looking for kind, curious educators who believe education is power."
        accent="#0e2a1f"
        dark
      />

      {/* Open positions */}
      <PageSection>
        <SectionHeading
          eyebrow="Open Positions"
          title={
            <>
              Find your{" "}
              <span className="font-[family-name:var(--font-playfair)] italic font-medium">
                role
              </span>
            </>
          }
        />
        <RevealGroup stagger={0.08} className="space-y-3">
          {jobOpenings.map((job) => (
            <RevealItem key={job.title} direction="up">
              <motion.button
                type="button"
                onClick={() => navigate("contact")}
                whileHover={{ y: -3, x: 3 }}
                className="group flex w-full flex-col gap-3 rounded-[22px] border border-[var(--gv-leaf)]/15 bg-white p-5 text-left shadow-[0_14px_36px_-26px_rgba(14,42,31,0.4)] sm:flex-row sm:items-center"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[var(--gv-forest)] text-[var(--gv-lime)]">
                  <Briefcase className="h-6 w-6" />
                </span>
                <div className="flex-1">
                  <h3 className="font-[family-name:var(--font-jakarta)] text-lg font-bold text-[var(--gv-forest)]">
                    {job.title}
                  </h3>
                  <div className="mt-1 flex flex-wrap gap-4 text-xs font-medium text-[var(--gv-ink-soft)]">
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="h-3.5 w-3.5 text-[var(--gv-leaf-dark)]" />
                      {job.grade}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-[var(--gv-leaf-dark)]" />
                      {job.location}
                    </span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--gv-lime)] px-4 py-2 font-[family-name:var(--font-jakarta)] text-xs font-bold text-[var(--gv-forest)]">
                  Apply
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </motion.button>
            </RevealItem>
          ))}
        </RevealGroup>
      </PageSection>

      {/* Culture */}
      <PageSection mint>
        <SectionHeading
          eyebrow="Why Join Us"
          title={
            <>
              Grow your{" "}
              <span className="font-[family-name:var(--font-playfair)] italic font-medium">
                career
              </span>{" "}
              in our garden
            </>
          }
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {culture.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08} direction="up">
              <motion.div whileHover={{ y: -6 }} className="h-full rounded-[22px] border border-[var(--gv-leaf)]/15 bg-white p-6 shadow-[0_18px_40px_-25px_rgba(14,42,31,0.4)]">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--gv-leaf)]/15 text-[var(--gv-leaf-dark)]">
                  <c.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-jakarta)] text-lg font-bold text-[var(--gv-forest)]">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--gv-ink-soft)]">
                  {c.text}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </PageSection>

      <PageCTA
        title={
          <>
            Don&apos;t see your{" "}
            <span className="font-[family-name:var(--font-playfair)] italic font-medium">
              role
            </span>
            ?
          </>
        }
        description="Send us your CV anyway — we keep great teachers on file for future openings."
        primaryLabel="Send Your CV"
        onPrimary={() => navigate("contact")}
        secondaryLabel="Meet our staff"
        onSecondary={() => navigate("staff")}
      />
    </PageShell>
  );
}
