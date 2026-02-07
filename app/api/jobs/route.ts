import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { mockJobs } from "@/lib/mock-data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";
  const timezone = searchParams.get("timezone")?.trim() ?? "";
  const employmentType = searchParams.get("type")?.trim().toUpperCase() ?? "";

  try {
    const jobs = await prisma.job.findMany({
      where: {
        status: "PUBLISHED",
        ...(timezone ? { timezone: { contains: timezone, mode: "insensitive" } } : {}),
        ...(employmentType ? { employmentType: employmentType as "FULL_TIME" | "PART_TIME" | "CONTRACT" | "FREELANCE" } : {}),
        ...(query
          ? {
              OR: [
                { title: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
              ],
            }
          : {}),
      },
      include: { company: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(jobs);
  } catch {
    const filteredMockJobs = mockJobs.filter((job) => {
      const queryMatch =
        !query ||
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.description.toLowerCase().includes(query.toLowerCase()) ||
        job.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));
      const timezoneMatch = !timezone || job.timezone.toLowerCase().includes(timezone.toLowerCase());
      const typeMatch = !employmentType || job.employmentType === employmentType;

      return queryMatch && timezoneMatch && typeMatch;
    });

    return NextResponse.json(filteredMockJobs);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const title = String(body.title ?? "").trim();
    const description = String(body.description ?? "").trim();
    const companyName = String(body.companyName ?? "").trim();
    const companyWebsite = String(body.companyWebsite ?? "").trim();
    const timezone = String(body.timezone ?? "").trim();
    const employmentType = String(body.employmentType ?? "FULL_TIME").trim().toUpperCase();
    const applyUrl = String(body.applyUrl ?? "").trim();

    if (!title || !description || !companyName || !companyWebsite || !timezone || !applyUrl) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const allowedEmploymentType = ["FULL_TIME", "PART_TIME", "CONTRACT", "FREELANCE"] as const;
    type EmploymentType = (typeof allowedEmploymentType)[number];
    const normalizedEmploymentType: EmploymentType = allowedEmploymentType.includes(employmentType as EmploymentType)
      ? (employmentType as EmploymentType)
      : "FULL_TIME";

    const salaryMin = body.salaryMin ? Number(body.salaryMin) : null;
    const salaryMax = body.salaryMax ? Number(body.salaryMax) : null;
    const tags = String(body.tags ?? "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const company = await prisma.company.upsert({
      where: {
        website: companyWebsite,
      },
      update: {
        name: companyName,
      },
      create: {
        name: companyName,
        website: companyWebsite,
        verifiedStatus: "PENDING",
      },
    });

    const job = await prisma.job.create({
      data: {
        companyId: company.id,
        title,
        description,
        timezone,
        employmentType: normalizedEmploymentType,
        applyUrl,
        salaryMin,
        salaryMax,
        tags,
        salaryCurrency: "USD",
        status: "PUBLISHED",
        verificationStatus: "PENDING",
        scamRiskScore: 15,
      },
      include: {
        company: true,
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to create job" }, { status: 500 });
  }
}
