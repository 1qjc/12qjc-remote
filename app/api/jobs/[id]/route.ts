import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { mockJobs } from "@/lib/mock-data";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  try {
    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        company: true,
      },
    });

    if (!job) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch {
    const mockJob = mockJobs.find((item) => item.id === id);

    if (!mockJob) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(mockJob);
  }
}
