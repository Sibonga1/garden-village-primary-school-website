/**
 * page-store.ts
 * ----------------------------------------------------------------------------
 * Lightweight client-side "router" for the single-route SPA.
 *
 *  The sandbox only exposes `/`, so multi-page navigation is done in-app:
 *  each PageKey is a view; the store holds the active page and a navigate()
 *  function. The active page is mirrored to `window.location.hash` so URLs
 *  are shareable and the browser back/forward buttons work (hashchange).
 *
 *  PageKey → view component mapping lives in page-router.tsx.
 * ----------------------------------------------------------------------------
 */

import { create } from "zustand";

export type PageKey =
  | "home"
  | "about"
  | "programs"
  | "staff"
  | "fundraising"
  | "events"
  | "faq"
  | "contact"
  | "sports"
  | "conduct"
  | "careers";

export type PageMeta = {
  key: PageKey;
  label: string; // nav label
  title: string; // page <title> / hero title
  eyebrow: string; // small label above hero title
  description: string; // hero subtitle
  accent: string; // hex accent
  file: string; // which view file renders it
  nav: boolean; // show in primary nav?
};

export const pages: Record<PageKey, PageMeta> = {
  home: {
    key: "home",
    label: "Home",
    title: "Garden Village",
    eyebrow: "Education is Power",
    description: "Where curiosity grows and community thrives.",
    accent: "#d6f75a",
    file: "components/pages/home-page.tsx",
    nav: true,
  },
  about: {
    key: "about",
    label: "About",
    title: "About Garden Village",
    eyebrow: "Our Story",
    description:
      "A place where young minds grow, dreams are nurtured, and every child is given the opportunity to shine.",
    accent: "#2e9e3e",
    file: "components/pages/about-page.tsx",
    nav: true,
  },
  programs: {
    key: "programs",
    label: "Programs",
    title: "Programs",
    eyebrow: "Learning",
    description:
      "From the classroom to the field, the studio to the garden — every program nurtures the whole child.",
    accent: "#f5c518",
    file: "components/pages/programs-page.tsx",
    nav: false,
  },
  staff: {
    key: "staff",
    label: "Staff",
    title: "Our People",
    eyebrow: "Meet the Team",
    description:
      "Dedicated teachers and mentors who help shape tomorrow's leaders.",
    accent: "#0e2a1f",
    file: "components/pages/staff-page.tsx",
    nav: true,
  },
  fundraising: {
    key: "fundraising",
    label: "Fundraising",
    title: "Fundraising",
    eyebrow: "Give",
    description:
      "Every rand plants a seed. Help us grow futures at Garden Village.",
    accent: "#1a4d2e",
    file: "components/pages/fundraising-page.tsx",
    nav: false,
  },
  events: {
    key: "events",
    label: "Events",
    title: "Events & Stories",
    eyebrow: "Community",
    description:
      "School stories, upcoming events and voices from our community.",
    accent: "#d6f75a",
    file: "components/pages/events-page.tsx",
    nav: false,
  },
  faq: {
    key: "faq",
    label: "FAQ",
    title: "Frequently Asked",
    eyebrow: "Questions",
    description: "Everything you need to know about joining our family.",
    accent: "#2e9e3e",
    file: "components/pages/faq-page.tsx",
    nav: false,
  },
  contact: {
    key: "contact",
    label: "Contact",
    title: "Get in Touch",
    eyebrow: "Contact",
    description:
      "Visit, call or email — we'd love to welcome you to Garden Village.",
    accent: "#f5c518",
    file: "components/pages/contact-page.tsx",
    nav: true,
  },
  sports: {
    key: "sports",
    label: "Sports",
    title: "Sports & Wellness",
    eyebrow: "Play",
    description:
      "Soccer, netball, athletics and swimming — building teamwork, resilience and healthy habits.",
    accent: "#f5c518",
    file: "components/pages/sports-page.tsx",
    nav: false,
  },
  conduct: {
    key: "conduct",
    label: "Code of Conduct",
    title: "Code of Conduct",
    eyebrow: "Our Values",
    description:
      "The shared values and expectations that keep our community kind, safe and curious.",
    accent: "#1a4d2e",
    file: "components/pages/conduct-page.tsx",
    nav: false,
  },
  careers: {
    key: "careers",
    label: "Careers",
    title: "Careers",
    eyebrow: "Join Us",
    description:
      "Teach where curiosity grows. Open roles at Garden Village Primary School.",
    accent: "#0e2a1f",
    file: "components/pages/careers-page.tsx",
    nav: false,
  },
};

/** Pages that appear in the primary navbar (Home, About, Staff). */
export const primaryNavKeys: PageKey[] = ["home", "about", "staff"];

/** Pages that appear in the "More Links" dropdown. */
export const moreLinksLeftKeys: PageKey[] = ["sports", "conduct", "contact"];
export const moreLinksRightKeys: PageKey[] = ["careers", "fundraising", "events"];

type PageState = {
  page: PageKey;
  navigate: (key: PageKey) => void;
  setPage: (key: PageKey) => void;
};

function readHash(): PageKey {
  if (typeof window === "undefined") return "home";
  const h = window.location.hash.replace(/^#\/?/, "").trim();
  if (h && (h in pages)) return h as PageKey;
  return "home";
}

export const usePage = create<PageState>((set) => ({
  page: readHash(),
  /** Navigate to a page and sync the URL hash. */
  navigate: (key) => {
    if (typeof window !== "undefined") {
      if (window.location.hash.replace(/^#\/?/, "") !== key) {
        window.location.hash = `/${key}`;
      }
    }
    set({ page: key });
  },
  /** Internal: update page without touching the hash (used by hashchange listener). */
  setPage: (key) => set({ page: key }),
}));
