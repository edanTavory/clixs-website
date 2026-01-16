import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { LucideIcon } from "lucide-react";

interface ProblemCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface SolutionCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface ProblemSolutionProps {
  problems: ProblemCard[];
  solutions: SolutionCard[];
}

export function ProblemSolution({ problems, solutions }: ProblemSolutionProps) {
  return (
    <section className="py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Problems */}
        <div className="mb-16">
          <SectionHeader
            heading="Building campaigns shouldn't be this hard"
            subheading="Common frustrations with existing tools"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <Card
                  key={index}
                  className="border-slate-200 transition-shadow hover:shadow-card-hover"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
                      <Icon className="h-5 w-5 text-red-600" />
                    </div>
                    <h3 className="mb-2 font-semibold text-foreground">
                      {problem.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {problem.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Solutions */}
        <div>
          <SectionHeader
            heading="A better way to build campaigns"
            subheading="Clixs gives you the control you need"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <Card
                  key={index}
                  className="border-slate-200 transition-shadow hover:shadow-card-hover"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <h3 className="mb-2 font-semibold text-foreground">
                      {solution.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {solution.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
