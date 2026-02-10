import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatSalary, getJobById } from "@/lib/jobs";

function riskDetails(score: number) {
  if (score <= 10) return "Low scam risk";
  if (score <= 30) return "Medium scam risk: review details carefully";
  return "High scam risk: proceed with caution";
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{job.title}</h1>
          <p className="mt-2 text-muted-foreground">{job.company.name}</p>
        </div>
        <Badge variant={job.company.verifiedStatus === "VERIFIED" ? "secondary" : "outline"}>
          {job.company.verifiedStatus === "VERIFIED" ? "Verified company" : "Verification pending"}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Role Snapshot</CardTitle>
          <CardDescription>Transparent details to help you evaluate quickly.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>
            <strong>Timezone:</strong> {job.timezone}
          </p>
          <p>
            <strong>Employment type:</strong> {job.employmentType.replace("_", " ")}
          </p>
          <p>
            <strong>Salary:</strong> {formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
          </p>
          <p>
            <strong>Scam risk signal:</strong> {riskDetails(job.scamRiskScore)}
          </p>
          <p>
            <strong>Company website:</strong> <a className="underline" href={job.company.website}>{job.company.website}</a>
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">{job.description}</p>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-3">
        <a href={job.applyUrl} rel="noreferrer" target="_blank">
          <Button>Apply Now</Button>
        </a>
        <form action="/api/reports" method="post">
          <input name="jobId" type="hidden" value={job.id} />
          <input name="reason" type="hidden" value="User flagged from detail page" />
          <Button type="submit" variant="outline">
            Report Listing
          </Button>
        </form>
        <Link href="/jobs">
          <Button variant="ghost">Back to jobs</Button>
        </Link>
      </div>
    </div>
  );
}
