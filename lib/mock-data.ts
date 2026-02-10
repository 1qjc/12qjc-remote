export type MockJob = {
  id: string;
  title: string;
  description: string;
  timezone: string;
  employmentType: "FULL_TIME" | "PART_TIME" | "CONTRACT" | "FREELANCE";
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string;
  tags: string[];
  applyUrl: string;
  createdAt: string;
  verificationStatus: "VERIFIED" | "PENDING" | "UNVERIFIED";
  scamRiskScore: number;
  company: {
    name: string;
    website: string;
    verifiedStatus: "VERIFIED" | "PENDING" | "UNVERIFIED";
  };
};

export const mockJobs: MockJob[] = [
  {
    id: "job_1",
    title: "Senior Frontend Engineer",
    description:
      "Build and scale remote-first product experiences using React and TypeScript.",
    timezone: "UTC-5 to UTC+2",
    employmentType: "FULL_TIME",
    salaryMin: 120000,
    salaryMax: 160000,
    salaryCurrency: "USD",
    tags: ["React", "TypeScript", "Next.js"],
    applyUrl: "https://example.com/jobs/frontend",
    createdAt: new Date().toISOString(),
    verificationStatus: "VERIFIED",
    scamRiskScore: 5,
    company: {
      name: "RemoteFlow",
      website: "https://remoteflow.example",
      verifiedStatus: "VERIFIED",
    },
  },
  {
    id: "job_2",
    title: "Product Designer (Remote)",
    description:
      "Design end-to-end product experiences for a global distributed team.",
    timezone: "UTC+0 to UTC+8",
    employmentType: "FULL_TIME",
    salaryMin: 90000,
    salaryMax: 130000,
    salaryCurrency: "USD",
    tags: ["Figma", "Design Systems", "UX Research"],
    applyUrl: "https://example.com/jobs/designer",
    createdAt: new Date().toISOString(),
    verificationStatus: "PENDING",
    scamRiskScore: 18,
    company: {
      name: "Async Labs",
      website: "https://asynclabs.example",
      verifiedStatus: "PENDING",
    },
  },
];
