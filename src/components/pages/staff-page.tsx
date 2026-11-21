"use client";

/**
 * staff-page.tsx  ──  PageKey: "staff"
 * ----------------------------------------------------------------------------
 * Reuses <Staff/> (4 profile cards), adds a "Join our team" band and a
 * teaching philosophy section, finishing with a CTA to Careers / Contact.
 * ----------------------------------------------------------------------------
 */

import { motion } from "framer-motion";
import { Heart, Lightbulb, Users, ArrowRight } from "lucide-react";
import { Staff } from "@/components/site/staff";
import { Reveal } from "@/components/site/reveal";
import { PageSection, PageCTA, SectionHeading } from "@/components/site/page-kit";
import { usePage } from "@/lib/page-store";

const philosophy = [
  { icon: Heart, title: "Know every child", text: "Small classes mean teachers truly see each learner — their strengths, struggles and sparks." },
  { icon: Lightbulb, title: "Teach with wonder", text: "Our teachers model curiosity and celebrate brave questions, mistakes and discoveries." },
  { icon: Users, title: "Partner with families", text: "We walk alongside parents — weekly notes, open doors and honest, caring conversations." },
];

export function StaffPage() {
  const navigate = usePage((s) => s.navigate);

  return (
    <>
      <Staff />

      {/* Philosophy */}
      <PageSection mint>
        <SectionHeading
          eyebrow="How We Teach"
          title={
            <>
              The Garden Village{" "}
              <span className="font-[family-name:var(--font-playfair)] italic font-medium">
                way
              </span>
            </>
          }
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {philosophy.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} direction="up">
              <motion.div whileHover={{ y: -6 }} className="h-full rounded-[22px] border border-[var(--gv-leaf)]/15 bg-white p-6 shadow-[0_18px_40px_-25px_rgba(14,42,31,0.4)]">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--gv-leaf)]/15 text-[var(--gv-leaf-dark)]">
                  <p.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-jakarta)] text-lg font-bold text-[var(--gv-forest)]">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--gv-ink-soft)]">
                  {p.text}
                </p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </PageSection>

      {/* Join our team band */}
      <PageSection dark>
        <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal direction="up">
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--gv-lime)]/80">
              Careers
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-jakarta)] text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.05] text-[var(--gv-lime)]">
              Teach where{" "}
              <span className="font-[family-name:var(--font-playfair)] italic font-medium">
                curiosity
              </span>{" "}
              grows
            </h2>
            <p className="mt-4 max-w-lg text-[var(--gv-mint)]/80">
              We&apos;re always looking for kind, curious teachers who believe
              education is power. See our open roles and grow your career in
              our garden.
            </p>
            <motion.button
              type="button"
              onClick={() => navigate("careers")}
              whileHover={{ x: 4 }}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--gv-lime)] px-6 py-3 font-[family-name:var(--font-jakarta)] text-sm font-bold text-[var(--gv-forest)]"
            >
              View open positions
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </Reveal>
          <Reveal direction="left" delay={0.1} className="grid grid-cols-3 gap-3">
            {[
              { v: "28", l: "Teachers" },
              { v: "1:15", l: "Ratio" },
              { v: "94%", l: "Retain" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
                <div className="font-[family-name:var(--font-jakarta)] text-2xl font-extrabold text-[var(--gv-lime)]">
                  {s.v}
                </div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--gv-mint)]/70">
                  {s.l}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </PageSection>

      <PageCTA
        title={
          <>
            Say{" "}
            <span className="font-[family-name:var(--font-playfair)] italic font-medium">
              hello
            </span>{" "}
            to our team
          </>
        }
        description="Email any of our teachers directly — we love hearing from families."
        primaryLabel="Contact Us"
        onPrimary={() => navigate("contact")}
        secondaryLabel="About the school"
        onSecondary={() => navigate("about")}
      />
    </>
  );
}
