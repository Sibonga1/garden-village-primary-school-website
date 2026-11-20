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

export default function Home() {
  return (
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
    </div>
  );
}
