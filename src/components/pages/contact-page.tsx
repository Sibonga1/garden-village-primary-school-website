"use client";

/**
 * contact-page.tsx  ──  PageKey: "contact"
 * ----------------------------------------------------------------------------
 * Reuses <Newsletter/> (newsletter form + contact tiles + map), then adds a
 * "ways to reach us" band and a CTA to visit (about page).
 * ----------------------------------------------------------------------------
 */

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { Newsletter } from "@/components/site/newsletter";
import { Reveal } from "@/components/site/reveal";
import { PageSection, PageCTA } from "@/components/site/page-kit";
import { contactInfo } from "@/lib/site-data";
import { usePage } from "@/lib/page-store";

export function ContactPage() {
  const navigate = usePage((s) => s.navigate);

  const ways = [
    { icon: Phone, label: "Call us", value: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s/g, "")}` },
    { icon: Mail, label: "Email us", value: contactInfo.email, href: `mailto:${contactInfo.email}` },
    { icon: MapPin, label: "Visit us", value: contactInfo.address },
    { icon: Clock, label: "Office hours", value: contactInfo.hours },
  ];

  return (
    <>
      <Newsletter />

      {/* Ways to reach */}
      <PageSection mint>
        <Reveal direction="up" className="mb-10 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-12 bg-[var(--gv-leaf)]" />
            <span className="text-xs font-bold uppercase tracking-[0.28em] text-[var(--gv-leaf-dark)]">
              Reach Us
            </span>
          </div>
          <h2 className="mt-4 font-[family-name:var(--font-jakarta)] text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-[1.05] text-[var(--gv-forest)]">
            We&apos;d love to{" "}
            <span className="font-[family-name:var(--font-playfair)] italic font-medium">
              hear from you
            </span>
          </h2>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {ways.map((w, i) => (
            <Reveal key={w.label} delay={i * 0.06} direction="up">
              <motion.a
                href={w.href ?? "#"}
                whileHover={{ y: -4 }}
                className="flex items-center gap-4 rounded-[22px] border border-[var(--gv-leaf)]/15 bg-white p-5 shadow-[0_14px_36px_-26px_rgba(14,42,31,0.4)]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[var(--gv-forest)] text-[var(--gv-lime)]">
                  <w.icon className="h-6 w-6" />
                </span>
                <span>
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[var(--gv-leaf-dark)]">
                    {w.label}
                  </span>
                  <span className="block text-sm font-medium text-[var(--gv-forest)]">
                    {w.value}
                  </span>
                </span>
              </motion.a>
            </Reveal>
          ))}
        </div>
      </PageSection>

      <PageCTA
        title={
          <>
            Come and see{" "}
            <span className="font-[family-name:var(--font-playfair)] italic font-medium">
              our village
            </span>
          </>
        }
        description="Book a campus tour and meet the teachers who'll be guiding your child."
        primaryLabel="About the School"
        onPrimary={() => navigate("about")}
        secondaryLabel="See our programs"
        onSecondary={() => navigate("programs")}
      />
    </>
  );
}
