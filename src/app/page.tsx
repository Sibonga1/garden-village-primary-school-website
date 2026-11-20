import { Navbar } from "@/components/site/navbar";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Stats } from "@/components/site/stats";
import { Programs } from "@/components/site/programs";
import { Fundraising } from "@/components/site/fundraising";
import { Staff } from "@/components/site/staff";
import { Testimonials } from "@/components/site/testimonials";
import { Faq } from "@/components/site/faq";
import { Newsletter } from "@/components/site/newsletter";
import { Footer } from "@/components/site/footer";
import { BackToTop } from "@/components/site/back-to-top";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { DevModeProvider } from "@/components/site/dev-context";
import { DevPanel } from "@/components/site/dev-panel";

/**
 * Page composition (the ONLY user-visible route — /).
 *
 *  DevModeProvider  ──►  wraps everything so the Developer Overlay
 *                       (labels + architecture map) can be toggled anywhere.
 *
 *  Order of sections (top → bottom), each is id-anchored:
 *    Navbar (fixed)          → components/site/navbar.tsx
 *    #home    Hero           → hero.tsx
 *    #about   About          → about.tsx
 *    Stats    (no anchor)    → stats.tsx
 *    #programs Programs      → programs.tsx
 *    #fundraising Fundraising→ fundraising.tsx
 *    #staff   Staff          → staff.tsx
 *    #events  Testimonials   → testimonials.tsx
 *    #faq     FAQ            → faq.tsx
 *    #contact Newsletter     → newsletter.tsx
 *    Footer (sticky bottom)  → footer.tsx
 *
 *  Floating overlays: ScrollProgress (top), BackToTop (br), DevPanel (bl).
 */
export default function Home() {
  return (
    <DevModeProvider>
      <div className="relative flex min-h-screen flex-col bg-[var(--gv-cream)]">
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">
          <Hero />
          <About />
          <Stats />
          <Programs />
          <Fundraising />
          <Staff />
          <Testimonials />
          <Faq />
          <Newsletter />
        </main>
        <Footer />
        <BackToTop />
        <DevPanel />
      </div>
    </DevModeProvider>
  );
}
