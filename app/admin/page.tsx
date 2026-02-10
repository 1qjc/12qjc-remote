import { getJobs } from "@/lib/jobs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminPage() {
  const jobs = await getJobs();
  const pending = jobs.filter((job) => job.verificationStatus !== "VERIFIED");
  const highRisk = jobs.filter((job) => job.scamRiskScore > 30);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Trust & Admin</h1>
        <p className="mt-2 text-muted-foreground">Moderation center for verification and user safety.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardDescription>Total listings</CardDescription>
            <CardTitle>{jobs.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>Pending verification</CardDescription>
            <CardTitle>{pending.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardDescription>High risk flagged</CardDescription>
            <CardTitle>{highRisk.length}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listings requiring review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pending.map((job) => (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-md border p-3" key={job.id}>
              <div>
                <p className="font-medium">{job.title}</p>
                <p className="text-sm text-muted-foreground">{job.company.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{job.verificationStatus}</Badge>
                <Badge variant={job.scamRiskScore > 30 ? "destructive" : "secondary"}>
                  Risk {job.scamRiskScore}
                </Badge>
              </div>
            </div>
          ))}
          {pending.length === 0 && <p className="text-sm text-muted-foreground">No pending items.</p>}
        </CardContent>
      </Card>
    </div>
  );
}
