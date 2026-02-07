import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { JobAlertForm } from "@/components/job-alert-form";
import { getJobs, formatSalary } from "@/lib/jobs";

function riskLabel(score: number) {
  if (score <= 10) return { text: "Low risk", variant: "secondary" as const };
  if (score <= 30) return { text: "Medium risk", variant: "outline" as const };
  return { text: "High risk", variant: "destructive" as const };
}

type JobsPageProps = {
  searchParams: Promise<{
    q?: string;
    timezone?: string;
    type?: string;
  }>;
};

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const params = await searchParams;
  const jobs = await getJobs();
  const query = params.q?.trim().toLowerCase() ?? "";
  const timezone = params.timezone?.trim().toLowerCase() ?? "";
  const type = params.type?.trim().toUpperCase() ?? "";

  const filteredJobs = jobs.filter((job) => {
    const matchesQuery =
      !query ||
      job.title.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query) ||
      job.tags.some((tag) => tag.toLowerCase().includes(query));
    const matchesTimezone = !timezone || job.timezone.toLowerCase().includes(timezone);
    const matchesType = !type || job.employmentType === type;

    return matchesQuery && matchesTimezone && matchesType;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Remote Jobs</h1>
        <p className="mt-2 text-muted-foreground">Verified-first listings with salary and timezone transparency.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Get personalized job alerts</CardTitle>
          <CardDescription>Save your preferences and receive fresh remote listings directly in your inbox.</CardDescription>
        </CardHeader>
        <CardContent>
          <JobAlertForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search and filter jobs</CardTitle>
          <CardDescription>Fast filtering by role keywords, timezone, and employment type.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action="/jobs" className="grid gap-3 md:grid-cols-[2fr_1fr_1fr_auto]">
            <Input defaultValue={params.q ?? ""} name="q" placeholder="Search title, skill, keyword" />
            <Input defaultValue={params.timezone ?? ""} name="timezone" placeholder="Timezone (e.g. UTC+1)" />
            <Input defaultValue={params.type ?? ""} name="type" placeholder="Type (FULL_TIME)" />
            <Button type="submit">Apply Filters</Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredJobs.map((job) => {
          const risk = riskLabel(job.scamRiskScore);
          return (
            <Card key={job.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {job.company.name} • {job.timezone}
                    </CardDescription>
                  </div>
                  <Badge variant={job.company.verifiedStatus === "VERIFIED" ? "secondary" : "outline"}>
                    {job.company.verifiedStatus === "VERIFIED" ? "Verified company" : "Verification pending"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{job.description}</p>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <Badge variant="outline">{job.employmentType.replace("_", " ")}</Badge>
                  <Badge variant="outline">{formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}</Badge>
                  <Badge variant={risk.variant}>{risk.text}</Badge>
                  {job.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="gap-3">
                <Link href={`/jobs/${job.id}`}>
                  <Button variant="outline">View Details</Button>
                </Link>
                <a href={job.applyUrl} rel="noreferrer" target="_blank">
                  <Button>Apply Now</Button>
                </a>
              </CardFooter>
            </Card>
          );
        })}
        {filteredJobs.length === 0 && (
          <Card>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">No jobs match your current filters.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
