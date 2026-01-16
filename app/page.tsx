import {
  FloatingHeader,
  Hero,
  Footer,
  AskClixsBar,
} from "@/components/landing";

import {
  navLinks,
  heroContent,
} from "@/lib/landing-content";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <FloatingHeader links={navLinks} />

      {/* Content with padding for floating header */}
      <div className="pt-6">
        <Hero heading={heroContent.heading} />
      </div>

      <Footer />

      {/* Bottom prompt bar - appears after 15% scroll */}
      <AskClixsBar />
    </main>
  );
}
