/**
 * dev-registry.ts
 * ----------------------------------------------------------------------------
 * Single source of truth for the Developer Overlay.
 *
 * Every entry here describes ONE section of the page so that the DevBadge
 * (the little label pinned to each section) and the DevPanel (the
 * architecture map side panel) can explain — at a glance — what a section is,
 * which file implements it, where its data comes from, what animates it,
 * and which other sections/anchors it links to.
 *
 * When you add or rename a section, update THIS file and the overlay updates
 * automatically. No other wiring needed.
 * ----------------------------------------------------------------------------
 */

export type DevSectionMeta = {
  /** The DOM id of the <section>. Must match the id="" in the component. */
  id: string;
  /** Human label shown in the badge + map. */
  name: string;
  /** File path relative to src/, shown so devs can jump to source. */
  file: string;
  /** Component export name. */
  component: string;
  /** Where its content/data comes from (props, site-data, inline...). */
  data: string;
  /** Which animation libraries + techniques drive it. */
  animations: string;
  /** What it links / flows to. Used to draw the "connects to" line. */
  connects: string;
  /** Accent color for the badge + map node (hex). */
  accent: string;
  /** One-line purpose. */
  purpose: string;
};

export const devSections: DevSectionMeta[] = [
  {
    id: "home",
    name: "Hero",
    file: "components/site/hero.tsx",
    component: "<Hero />",
    data: "headlineLines (inline array), hero classroom image, GvButton",
    animations:
      "GSAP ScrollTrigger (word reveal stagger + tree parallax scrub) · Motion (scroll-linked y/opacity, floating particles)",
    connects: "Learn More → #about · Enrol Today → #contact · Scroll cue ↓",
    accent: "#d6f75a",
    purpose: "Above-the-fold intro with mixed serif/sans headline + classroom photo.",
  },
  {
    id: "about",
    name: "About",
    file: "components/site/about.tsx",
    component: "<About />",
    data: "aboutParagraphs, aboutClosing, aboutMottos (lib/site-data.ts) · <Crest /> SVG",
    animations:
      "GSAP ScrollTrigger (word-by-word scrub on closing line) · Motion (Reveal paragraphs, rotating crest halos, floating chips)",
    connects: "Mottos chips → #programs · Est. badge → Stats below",
    accent: "#2e9e3e",
    purpose: "School story + animated crest badge.",
  },
  {
    id: "stats",
    name: "Stats",
    file: "components/site/stats.tsx",
    component: "<Stats />",
    data: "heroStats (lib/site-data.ts) · <CountUp /> from count-up.tsx",
    animations:
      "Motion (RevealGroup stagger) · CountUp animates MotionValue on in-view · hover lift",
    connects: "Sits between About and Programs (no anchors, visual bridge)",
    accent: "#c8e86a",
    purpose: "Animated by-the-numbers counters on dark green band.",
  },
  {
    id: "programs",
    name: "Programs",
    file: "components/site/programs.tsx",
    component: "<Programs />",
    data: "programs array (lib/site-data.ts) · iconMap (lucide-react) · <TiltCard>",
    animations:
      "Motion (RevealGroup stagger) · TiltCard: mouse-tracked rotateX/rotateY springs · hover glow",
    connects: "Anchor target of About mottos · above Fundraising",
    accent: "#f5c518",
    purpose: "6 interactive 3D-tilt program cards.",
  },
  {
    id: "fundraising",
    name: "Fundraising",
    file: "components/site/fundraising.tsx",
    component: "<Fundraising />",
    data: "RAISED/GOAL constants (inline) · assembly bg image · <Crest /> · <GvButton>",
    animations:
      "Motion (useScroll parallax on bg + overlay card y) · Reveal title · animated progress bar width",
    connects: "Learn More → #about · Donate → #contact",
    accent: "#1a4d2e",
    purpose: "Parallax fundraising banner with donation progress.",
  },
  {
    id: "staff",
    name: "Staff",
    file: "components/site/staff.tsx",
    component: "<Staff />",
    data: "staff array (lib/site-data.ts) · staff images in /public/images",
    animations:
      "Motion (RevealGroup stagger) · hover lift card + image zoom · social icon micro-interactions",
    connects: "Mail/LinkedIn → #contact",
    accent: "#0e2a1f",
    purpose: "4 staff profile cards with photos, quotes, socials.",
  },
  {
    id: "events",
    name: "Testimonials",
    file: "components/site/testimonials.tsx",
    component: "<Testimonials />",
    data: "testimonials array (lib/site-data.ts)",
    animations:
      "Motion (AnimatePresence slide + blur) · auto-rotate 6s · progress dot fills via scaleX",
    connects: "Prev/Next + dots navigate slides · id=events (More Links → Events lands here)",
    accent: "#d6f75a",
    purpose: "Auto-rotating testimonial carousel.",
  },
  {
    id: "faq",
    name: "FAQ",
    file: "components/site/faq.tsx",
    component: "<Faq />",
    data: "faqs array (lib/site-data.ts)",
    animations:
      "Motion (Reveal stagger) · AnimatePresence height:auto accordion · plus-icon rotate",
    connects: "Anchor target of More Links → Fees & Bursaries",
    accent: "#2e9e3e",
    purpose: "Expandable FAQ accordion (5 items).",
  },
  {
    id: "contact",
    name: "Newsletter + Contact",
    file: "components/site/newsletter.tsx",
    component: "<Newsletter />",
    data: "contactInfo (lib/site-data.ts) · useToast (hooks/use-toast.ts)",
    animations:
      "Motion (Reveal) · hover lift on contact tiles · animated SVG map pulse · submit → toast",
    connects: "Form submit → toast notification · anchor id=contact (Enrol Now, Donate, Contact)",
    accent: "#f5c518",
    purpose: "Newsletter signup + contact info cards + stylized map.",
  },
];

/** Navbar + Footer are persistent (not <section>), described separately in the map. */
export const devPersistent = [
  {
    name: "Navbar",
    file: "components/site/navbar.tsx",
    component: "<Navbar />",
    data: "primaryNav, moreLinksLeft, moreLinksRight (lib/site-data.ts) · <Crest />",
    animations:
      "Motion (useScroll for scrolled state) · AnimatePresence dropdown + mobile sheet · chevron rotate",
    connects:
      "Home → #home · About → #about · Staff → #staff · More Links dropdown (6 links) · Enrol Now → #contact",
    accent: "#2e9e3e",
  },
  {
    name: "Footer",
    file: "components/site/footer.tsx",
    component: "<Footer />",
    data: "footerLinks, contactInfo (lib/site-data.ts) · <Crest />",
    animations: "Motion (marquee motto scroll) · social hover lift",
    connects: "Link columns → #about/#staff/#programs/#events/#contact/#fundraising · sticky to bottom",
    accent: "#0e2a1f",
  },
];

/** Shared primitives reused across sections (shown in the map's "Shared" tab). */
export const devPrimitives = [
  { name: "Reveal / RevealGroup / RevealItem", file: "components/site/reveal.tsx", used: "Hero, About, Stats, Programs, Fundraising, Staff, FAQ, Newsletter", note: "Motion-based scroll-reveal wrappers (direction, stagger, blur)" },
  { name: "GvButton", file: "components/site/gv-button.tsx", used: "Hero, Fundraising", note: "Signature pill button with circular arrow badge" },
  { name: "Crest", file: "components/site/crest.tsx", used: "Navbar, About, Fundraising, Footer", note: "Inline SVG school crest" },
  { name: "CountUp", file: "components/site/count-up.tsx", used: "Stats", note: "MotionValue-driven number counter on in-view" },
  { name: "ScrollProgress", file: "components/site/scroll-progress.tsx", used: "Top of page", note: "Top gradient bar tied to scrollYProgress" },
  { name: "BackToTop", file: "components/site/back-to-top.tsx", used: "Floating, bottom-right", note: "Appears after 600px scroll" },
];

/**
 * Look up a section's metadata by its DOM id.
 * Returns the meta object (throws in dev if missing so you notice).
 */
export function devMeta(id: string): DevSectionMeta {
  const found = devSections.find((s) => s.id === id);
  if (!found) throw new Error(`devMeta: unknown section id "${id}"`);
  return found;
}
