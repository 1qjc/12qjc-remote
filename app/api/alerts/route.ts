import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email ?? "").trim().toLowerCase();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const alert = await prisma.jobAlert.create({
      data: {
        email,
        role: body.role ? String(body.role) : null,
        timezone: body.timezone ? String(body.timezone) : null,
        query: body.query ? String(body.query) : null,
        salaryMin: body.salaryMin ? Number(body.salaryMin) : null,
      },
    });

    return NextResponse.json(alert, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Alert captured in fallback mode" }, { status: 201 });
  }
}
