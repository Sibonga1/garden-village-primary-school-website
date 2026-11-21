import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { BackToTop } from "@/components/site/back-to-top";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { DevModeProvider } from "@/components/site/dev-context";
import { DevPanel } from "@/components/site/dev-panel";
import { PageRouter } from "@/components/site/page-router";

/**
 * Root page (the ONLY user-visible route — /).
 *
 *  The site is a client-side multi-page SPA:
 *   • usePage store (lib/page-store.ts) holds the active PageKey.
 *   • <PageRouter/> swaps the active page view with an animated transition.
 *   • URLs mirror the active page to `#/page` so back/forward + refresh work.
 *
 *  Pages available: home · about · programs · staff · fundraising ·
 *                   events · faq · contact · sports · conduct · careers
 *
 *  See src/components/pages/* for each page view and src/lib/page-store.ts
 *  for the page metadata + navigation API.
 */
export default function Home() {
  return (
    <DevModeProvider>
      <div className="relative flex min-h-screen flex-col bg-[var(--gv-cream)]">
        <ScrollProgress />
        <Navbar />
        <main className="flex-1">
          <PageRouter />
        </main>
        <Footer />
        <BackToTop />
        <DevPanel />
      </div>
    </DevModeProvider>
  );
}
