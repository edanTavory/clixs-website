import {
  FloatingHeader,
  Hero,
  Footer,
  AskClixsBar,
  WaitlistPopup,
} from "@/components/landing";

import {
  navLinks,
  heroContent,
} from "@/lib/landing-content";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      {/* Blocking waitlist popup - cannot be dismissed */}
      <WaitlistPopup />

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
