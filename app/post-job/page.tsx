import { PostJobForm } from "@/components/post-job-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PostJobPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Post a Remote Job</h1>
        <p className="mt-2 text-muted-foreground">
          All submissions go through verification to keep job seekers safe.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Employer submission</CardTitle>
          <CardDescription>
            Provide complete, transparent details. Listings without clear role scope and salary may be rejected.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PostJobForm />
        </CardContent>
      </Card>
    </div>
  );
}
