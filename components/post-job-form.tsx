"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function PostJobForm() {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      setMessage("Job submitted for verification.");
      event.currentTarget.reset();
    } else {
      setMessage("Unable to submit job. Please verify your input and try again.");
    }

    setLoading(false);
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input id="companyName" name="companyName" placeholder="RemoteFlow" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyWebsite">Company Website</Label>
          <Input id="companyWebsite" name="companyWebsite" placeholder="https://company.com" required type="url" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Job Title</Label>
          <Input id="title" name="title" placeholder="Senior Backend Engineer" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="employmentType">Employment Type</Label>
          <Input id="employmentType" name="employmentType" placeholder="FULL_TIME" required />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="timezone">Timezone</Label>
          <Input id="timezone" name="timezone" placeholder="UTC-5 to UTC+2" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="applyUrl">Apply URL</Label>
          <Input id="applyUrl" name="applyUrl" placeholder="https://company.com/jobs/123" required type="url" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="salaryMin">Salary Min (USD)</Label>
          <Input id="salaryMin" min={0} name="salaryMin" placeholder="100000" type="number" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="salaryMax">Salary Max (USD)</Label>
          <Input id="salaryMax" min={0} name="salaryMax" placeholder="150000" type="number" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (comma-separated)</Label>
        <Input id="tags" name="tags" placeholder="Next.js, TypeScript, PostgreSQL" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Role Description</Label>
        <Textarea id="description" name="description" placeholder="Describe responsibilities, requirements, and hiring process." required />
      </div>

      <Button disabled={loading} type="submit">
        {loading ? "Submitting..." : "Submit Job"}
      </Button>
      {message && <p className="text-sm text-muted-foreground">{message}</p>}
    </form>
  );
}
