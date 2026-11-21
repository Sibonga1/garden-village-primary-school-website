"use client";

/**
 * events-page.tsx  ──  PageKey: "events"
 * ----------------------------------------------------------------------------
 * Reuses <Testimonials/> carousel, then adds an Upcoming Events list and a
 * CTA to book a visit.
 * ----------------------------------------------------------------------------
 */

import { motion } from "framer-motion";
import { MapPin, Clock, Calendar, ArrowRight } from "lucide-react";
import { Testimonials } from "@/components/site/testimonials";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { PageSection, PageCTA, SectionHeading } from "@/components/site/page-kit";
import { events } from "@/lib/site-data";
import { usePage } from "@/lib/page-store";

export function EventsPage() {
  const navigate = usePage((s) => s.navigate);

  return (
    <>
      <Testimonials />

      {/* Upcoming events */}
      <PageSection>
        <SectionHeading
          eyebrow="Mark Your Calendar"
          title={
            <>
              Upcoming{" "}
              <span className="font-[family-name:var(--font-playfair)] italic font-medium">
                events
              </span>
            </>
          }
        />
        <RevealGroup stagger={0.08} className="space-y-3">
          {events.map((ev) => (
            <RevealItem key={ev.title} direction="up">
              <motion.div
                whileHover={{ y: -4, x: 4 }}
                className="group flex flex-col gap-4 rounded-[22px] border border-[var(--gv-leaf)]/15 bg-white p-5 shadow-[0_14px_36px_-26px_rgba(14,42,31,0.4)] sm:flex-row sm:items-center"
              >
                {/* date block */}
                <div className="flex shrink-0 items-center gap-3 sm:w-44">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-[var(--gv-forest)] text-center text-[var(--gv-lime)]">
                    <div className="font-[family-name:var(--font-jakarta)] text-2xl font-extrabold leading-none">
                      {ev.date}
                    </div>
                    <div className="text-[10px] font-bold tracking-wider opacity-80">
                      {ev.month}
                    </div>
                  </div>
                  <Calendar className="hidden h-5 w-5 text-[var(--gv-leaf)] sm:block" />
                </div>
                {/* details */}
                <div className="flex-1">
                  <h3 className="font-[family-name:var(--font-jakarta)] text-lg font-bold text-[var(--gv-forest)]">
                    {ev.title}
                  </h3>
                  <div className="mt-1 flex flex-wrap gap-4 text-xs font-medium text-[var(--gv-ink-soft)]">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-[var(--gv-leaf-dark)]" />
                      {ev.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-[var(--gv-leaf-dark)]" />
                      {ev.place}
                    </span>
                  </div>
                </div>
                <motion.button
                  type="button"
                  onClick={() => navigate("contact")}
                  whileHover={{ x: 3 }}
                  className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[var(--gv-forest)]"
                >
                  RSVP
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </motion.div>
            </RevealItem>
          ))}
        </RevealGroup>
      </PageSection>

      <PageCTA
        title={
          <>
            Come and{" "}
            <span className="font-[family-name:var(--font-playfair)] italic font-medium">
              celebrate
            </span>{" "}
            with us
          </>
        }
        description="Families are always welcome at our events. Get in touch to RSVP."
        primaryLabel="Contact Us"
        onPrimary={() => navigate("contact")}
        secondaryLabel="See our programs"
        onSecondary={() => navigate("programs")}
      />
    </>
  );
}
