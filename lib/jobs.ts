import { prisma } from "@/lib/db";
import { mockJobs } from "@/lib/mock-data";

export type JobListItem = {
  id: string;
  title: string;
  description: string;
  timezone: string;
  employmentType: string;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string;
  tags: string[];
  applyUrl: string;
  createdAt: Date | string;
  verificationStatus: string;
  scamRiskScore: number;
  company: {
    name: string;
    website: string;
    verifiedStatus: string;
  };
};

export async function getJobs(): Promise<JobListItem[]> {
  try {
    const jobs = await prisma.job.findMany({
      where: { status: "PUBLISHED" },
      include: {
        company: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return jobs;
  } catch {
    return mockJobs;
  }
}

export async function getJobById(id: string): Promise<JobListItem | null> {
  try {
    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        company: true,
      },
    });

    return job;
  } catch {
    return mockJobs.find((job) => job.id === id) ?? null;
  }
}

export function formatSalary(min: number | null, max: number | null, currency: string) {
  if (!min && !max) {
    return "Salary not disclosed";
  }

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  });

  if (min && max) {
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  }

  if (min) {
    return `${formatter.format(min)}+`;
  }

  return `Up to ${formatter.format(max ?? 0)}`;
}
