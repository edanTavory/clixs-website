import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  heading: string;
  subheading?: string;
  alignment?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  badge,
  heading,
  subheading,
  alignment = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12",
        alignment === "center" && "text-center",
        className
      )}
    >
      {badge && (
        <Badge variant="secondary" className="mb-4">
          {badge}
        </Badge>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {heading}
      </h2>
      {subheading && (
        <p
          className={cn(
            "mt-4 text-lg text-muted-foreground",
            alignment === "center" && "mx-auto max-w-2xl"
          )}
        >
          {subheading}
        </p>
      )}
    </div>
  );
}
