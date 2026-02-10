import Link from "next/link";
import { ShieldCheck, Timer, Globe2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const pillars = [
  {
    title: "Easier",
    description: "Clean filters by role, timezone, salary, and employment type.",
    icon: Globe2,
  },
  {
    title: "Faster",
    description: "Quick-search flow and direct apply links to reduce friction.",
    icon: Timer,
  },
  {
    title: "Safer",
    description: "Verification status and scam-risk signals on every listing.",
    icon: ShieldCheck,
  },
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="rounded-2xl border bg-card p-8 md:p-12">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Remote-only job platform</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
          Find remote jobs easier, faster, and safer.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Trusted listings, transparent salary ranges, and clear timezone expectations. Built to help people secure better remote work online.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/jobs">
            <Button size="lg">Browse Jobs</Button>
          </Link>
          <Link href="/post-job">
            <Button size="lg" variant="outline">
              Post a Job
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          return (
            <Card key={pillar.title}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Icon className="h-5 w-5 text-primary" />
                  {pillar.title}
                </CardTitle>
                <CardDescription>{pillar.description}</CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </section>

      <section>
        <Card className="border-primary/30">
          <CardHeader>
            <CardTitle>Trust and social impact commitments</CardTitle>
            <CardDescription>
              Every employer listing should include salary transparency, clear role expectations, and inclusive hiring standards.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>- Transparent pay ranges and contract terms.</p>
            <p>- Report-and-review flow for suspicious listings.</p>
            <p>- Verification signals surfaced directly in search and detail pages.</p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
