import { NextResponse } from "next/server";
import { prisma } from "../../../lib/database/prisma";

const DEMO_USERNAME = "MYKO";

export async function GET() {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: DEMO_USERNAME,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Demo user not found." },
        { status: 404 },
      );
    }

    const analyses = await prisma.analysis.findMany({
      where: {
        userId: user.id,
      },
      include: {
        findings: {
          orderBy: {
            id: "asc",
          },
        },
        match: true,
        replay: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(analyses);
  } catch (error) {
    console.error("Analysis GET error:", error);

    return NextResponse.json(
      { error: "Failed to load analysis data." },
      { status: 500 },
    );
  }
}