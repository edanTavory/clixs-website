import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CheckCircle } from "lucide-react";

interface Integration {
  name: string;
  description: string;
  isAvailable: boolean;
}

interface IntegrationsProps {
  heading: string;
  subheading: string;
  current: Integration[];
  comingSoon: Integration[];
}

export function Integrations({
  heading,
  subheading,
  current,
  comingSoon,
}: IntegrationsProps) {
  return (
    <section id="integrations" className="py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader heading={heading} subheading={subheading} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Current integrations */}
          {current.map((integration, index) => (
            <Card
              key={`current-${index}`}
              className="border-blue-200 bg-blue-50/50 transition-shadow hover:shadow-card-hover"
            >
              <CardContent className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-2xl">
                    {integration.name === "Google Ads" && "🎯"}
                  </span>
                  <Badge className="bg-blue-600">Available</Badge>
                </div>
                <h3 className="mb-1 font-semibold text-foreground">
                  {integration.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {integration.description}
                </p>
                <div className="mt-3 flex items-center gap-1 text-sm text-blue-600">
                  <CheckCircle className="h-4 w-4" />
                  <span>Full support</span>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Coming soon integrations */}
          {comingSoon.map((integration, index) => (
            <Card
              key={`soon-${index}`}
              className="border-slate-200 opacity-75 transition-shadow hover:shadow-card-hover"
            >
              <CardContent className="p-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-2xl">
                    {integration.name === "Microsoft Ads" && "🔍"}
                    {integration.name === "Meta Ads" && "📘"}
                    {integration.name === "LinkedIn Ads" && "💼"}
                  </span>
                  <Badge variant="secondary">Coming soon</Badge>
                </div>
                <h3 className="mb-1 font-semibold text-foreground">
                  {integration.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {integration.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
