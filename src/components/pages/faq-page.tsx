"use client";

/**
 * faq-page.tsx  ──  PageKey: "faq"
 * ----------------------------------------------------------------------------
 * Reuses <Faq/> accordion, then a quick-links grid to other pages, and a CTA.
 * ----------------------------------------------------------------------------
 */

import { motion } from "framer-motion";
import { Users, BookOpen, HandHeart, Trophy, Mail, Calendar, ArrowRight } from "lucide-react";
import { Faq } from "@/components/site/faq";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/reveal";
import { PageSection, PageCTA, SectionHeading } from "@/components/site/page-kit";
import { usePage, type PageKey } from "@/lib/page-store";

const quickLinks: { page: PageKey; label: string; desc: string; icon: typeof Users }[] = [
  { page: "staff", label: "Our Staff", desc: "Meet the team", icon: Users },
  { page: "programs", label: "Programs", desc: "What we teach", icon: BookOpen },
  { page: "fundraising", label: "Fundraising", desc: "How to give", icon: HandHeart },
  { page: "sports", label: "Sports", desc: "Teams & fixtures", icon: Trophy },
  { page: "events", label: "Events", desc: "What's on", icon: Calendar },
  { page: "contact", label: "Contact", desc: "Reach us", icon: Mail },
];

export function FaqPage() {
  const navigate = usePage((s) => s.navigate);

  return (
    <>
      <Faq />

      {/* Quick links */}
      <PageSection mint>
        <SectionHeading
          eyebrow="Explore"
          title={
            <>
              Jump to a{" "}
              <span className="font-[family-name:var(--font-playfair)] italic font-medium">
                page
              </span>
            </>
          }
        />
        <RevealGroup stagger={0.08} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((q) => (
            <RevealItem key={q.page} direction="up">
              <motion.button
                type="button"
                onClick={() => navigate(q.page)}
                whileHover={{ y: -5 }}
                className="group flex w-full items-center gap-4 rounded-[22px] border border-[var(--gv-leaf)]/15 bg-white p-5 text-left shadow-[0_14px_36px_-26px_rgba(14,42,31,0.4)]"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[var(--gv-leaf)]/15 text-[var(--gv-leaf-dark)]">
                  <q.icon className="h-6 w-6" />
                </span>
                <span className="flex-1">
                  <span className="block font-[family-name:var(--font-jakarta)] text-base font-bold text-[var(--gv-forest)]">
                    {q.label}
                  </span>
                  <span className="block text-xs text-[var(--gv-ink-soft)]">{q.desc}</span>
                </span>
                <ArrowRight className="h-4 w-4 text-[var(--gv-ink-soft)]/40 transition-transform group-hover:translate-x-1 group-hover:text-[var(--gv-forest)]" />
              </motion.button>
            </RevealItem>
          ))}
        </RevealGroup>
      </PageSection>

      <PageCTA
        title={
          <>
            Still have{" "}
            <span className="font-[family-name:var(--font-playfair)] italic font-medium">
              questions
            </span>
            ?
          </>
        }
        description="We're happy to help. Reach out and a real person will reply within a day."
        primaryLabel="Contact Us"
        onPrimary={() => navigate("contact")}
        secondaryLabel="About the school"
        onSecondary={() => navigate("about")}
      />
    </>
  );
}
