import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingTier {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  isPopular?: boolean;
}

interface PricingProps {
  tiers: PricingTier[];
}

export function Pricing({ tiers }: PricingProps) {
  return (
    <section id="pricing" className="bg-slate-50 py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          badge="Pricing"
          heading="Simple, transparent pricing"
          subheading="Start free, upgrade when you need more"
        />

        <div className="grid gap-8 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <Card
              key={index}
              className={cn(
                "relative border-slate-200 transition-shadow hover:shadow-card-hover",
                tier.isPopular && "border-blue-600 shadow-lg"
              )}
            >
              {tier.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-blue-600">Most popular</Badge>
                </div>
              )}
              <CardHeader className="pb-0">
                <h3 className="text-lg font-semibold text-foreground">
                  {tier.name}
                </h3>
                <div className="mt-2 flex items-baseline">
                  <span className="text-4xl font-bold text-foreground">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="ml-1 text-muted-foreground">
                      {tier.period}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {tier.description}
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="mb-6 space-y-3">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="w-full"
                  variant={tier.isPopular ? "default" : "outline"}
                >
                  <Link href={tier.ctaHref}>{tier.ctaText}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
