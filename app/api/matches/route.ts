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

    const matches = await prisma.match.findMany({
      where: {
        userId: user.id,
      },
      include: {
        analysis: true,
      },
      orderBy: {
        playedAt: "desc",
      },
    });

    return NextResponse.json(matches);
  } catch (error) {
    console.error("Matches GET error:", error);

    return NextResponse.json(
      { error: "Failed to load matches." },
      { status: 500 },
    );
  }
}