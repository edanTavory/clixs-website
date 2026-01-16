import { SectionHeader } from "@/components/shared/SectionHeader";
import { CheckCircle, Play } from "lucide-react";

interface DemoProps {
  heading: string;
  subheading?: string;
  bullets: string[];
}

export function Demo({ heading, subheading, bullets }: DemoProps) {
  return (
    <section id="demo" className="bg-slate-50 py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader heading={heading} subheading={subheading} />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Video placeholder */}
          <div className="relative aspect-video overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-lg">
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform hover:scale-105">
                <Play className="h-6 w-6 text-foreground" />
              </button>
            </div>
            <div className="absolute bottom-4 left-4 text-sm text-white/60">
              2 min demo
            </div>
          </div>

          {/* Bullets */}
          <div className="space-y-4">
            {bullets.map((bullet, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                <span className="text-muted-foreground">{bullet}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
