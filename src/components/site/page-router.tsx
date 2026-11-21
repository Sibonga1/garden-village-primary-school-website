"use client";

/**
 * page-router.tsx
 * ----------------------------------------------------------------------------
 * Client-side page switcher.
 *
 *  • Reads the active PageKey from the usePage store.
 *  • Renders the matching page view inside an AnimatePresence transition.
 *  • Syncs the store with window.location.hash so the browser back/forward
 *    buttons work and URLs are shareable (e.g. /#/about).
 *  • Scrolls to top on every page change.
 *
 *  Page → view mapping is here (single place to add a new page).
 * ----------------------------------------------------------------------------
 */

import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { usePage, type PageKey } from "@/lib/page-store";
import { PageTransition } from "./page-kit";

import { HomePage } from "@/components/pages/home-page";
import { AboutPage } from "@/components/pages/about-page";
import { ProgramsPage } from "@/components/pages/programs-page";
import { StaffPage } from "@/components/pages/staff-page";
import { FundraisingPage } from "@/components/pages/fundraising-page";
import { EventsPage } from "@/components/pages/events-page";
import { FaqPage } from "@/components/pages/faq-page";
import { ContactPage } from "@/components/pages/contact-page";
import { SportsPage } from "@/components/pages/sports-page";
import { ConductPage } from "@/components/pages/conduct-page";
import { CareersPage } from "@/components/pages/careers-page";

const views: Record<PageKey, () => React.ReactElement> = {
  home: HomePage,
  about: AboutPage,
  programs: ProgramsPage,
  staff: StaffPage,
  fundraising: FundraisingPage,
  events: EventsPage,
  faq: FaqPage,
  contact: ContactPage,
  sports: SportsPage,
  conduct: ConductPage,
  careers: CareersPage,
};

export function PageRouter() {
  const page = usePage((s) => s.page);
  const setPage = usePage((s) => s.setPage);

  // Sync store ← hash (back/forward, manual URL edit, initial load).
  useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace(/^#\/?/, "").trim();
      setPage(h && h in views ? (h as PageKey) : "home");
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [setPage]);

  // Scroll to top whenever the page changes.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [page]);

  const View = views[page] ?? HomePage;

  return (
    <AnimatePresence mode="wait">
      <PageTransition pageKey={page}>
        <View />
      </PageTransition>
    </AnimatePresence>
  );
}
