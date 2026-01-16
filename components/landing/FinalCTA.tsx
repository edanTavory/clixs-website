import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface FinalCTAProps {
  heading: string;
  subheading?: string;
  primaryCTA: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
}

export function FinalCTA({
  heading,
  subheading,
  primaryCTA,
  secondaryCTA,
}: FinalCTAProps) {
  return (
    <section className="py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-16 text-center shadow-lg sm:px-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {heading}
          </h2>
          {subheading && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
              {subheading}
            </p>
          )}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" variant="secondary">
              <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
            </Button>
            {secondaryCTA && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
              >
                <Link href={secondaryCTA.href} className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  {secondaryCTA.text}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
