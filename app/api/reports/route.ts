import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    let jobId = "";
    let reason = "";
    let details = "";

    if (contentType.includes("application/json")) {
      const body = await request.json();
      jobId = String(body.jobId ?? "").trim();
      reason = String(body.reason ?? "").trim();
      details = String(body.details ?? "").trim();
    } else {
      const formData = await request.formData();
      jobId = String(formData.get("jobId") ?? "").trim();
      reason = String(formData.get("reason") ?? "").trim();
      details = String(formData.get("details") ?? "").trim();
    }

    if (!jobId || !reason) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await prisma.jobReport.create({
      data: {
        jobId,
        reason,
        details: details || null,
      },
    });

    return NextResponse.redirect(new URL(`/jobs/${jobId}`, request.url), { status: 303 });
  } catch {
    return NextResponse.json({ error: "Could not submit report" }, { status: 500 });
  }
}
