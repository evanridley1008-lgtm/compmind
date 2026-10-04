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

    const routines = await prisma.routine.findMany({
      where: {
        userId: user.id,
      },
      include: {
        objectives: {
          orderBy: {
            id: "asc",
          },
        },
      },
      orderBy: {
        dayOfWeek: "asc",
      },
    });

    return NextResponse.json(routines);
  } catch (error) {
    console.error("Routine GET error:", error);

    return NextResponse.json(
      { error: "Failed to load routines." },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const { objectiveId, status, progress } = body;

    if (!objectiveId) {
      return NextResponse.json(
        { error: "objectiveId is required." },
        { status: 400 },
      );
    }

    const objective = await prisma.routineObjective.findUnique({
      where: {
        id: objectiveId,
      },
    });

    if (!objective) {
      return NextResponse.json(
        { error: "Routine objective not found." },
        { status: 404 },
      );
    }

    const validStatuses = [
      "NOT_STARTED",
      "IN_PROGRESS",
      "COMPLETED",
    ];

    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid routine objective status." },
        { status: 400 },
      );
    }

    let nextProgress = objective.progress;

    if (typeof progress === "number" && Number.isFinite(progress)) {
      nextProgress = Math.max(0, Math.min(100, progress));
    }

    if (status === "COMPLETED") {
      nextProgress = 100;
    }

    if (status === "NOT_STARTED") {
      nextProgress = 0;
    }

    const updatedObjective = await prisma.routineObjective.update({
      where: {
        id: objectiveId,
      },
      data: {
        ...(status ? { status } : {}),
        progress: nextProgress,
      },
    });

    return NextResponse.json(updatedObjective);
  } catch (error) {
    console.error("Routine PATCH error:", error);

    return NextResponse.json(
      { error: "Failed to update routine objective." },
      { status: 500 },
    );
  }
}