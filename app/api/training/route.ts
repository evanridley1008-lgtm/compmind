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

    const trainingPlan = await prisma.trainingPlan.findFirst({
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
        createdAt: "desc",
      },
    });

    if (!trainingPlan) {
      return NextResponse.json(
        { error: "Training plan not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(trainingPlan);
  } catch (error) {
    console.error("Training GET error:", error);

    return NextResponse.json(
      { error: "Failed to load training data." },
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

    const objective = await prisma.trainingObjective.findUnique({
      where: {
        id: objectiveId,
      },
    });

    if (!objective) {
      return NextResponse.json(
        { error: "Training objective not found." },
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
        { error: "Invalid training objective status." },
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

    const updatedObjective = await prisma.trainingObjective.update({
      where: {
        id: objectiveId,
      },
      data: {
        ...(status ? { status } : {}),
        progress: nextProgress,
      },
    });

    const objectives = await prisma.trainingObjective.findMany({
      where: {
        trainingPlanId: objective.trainingPlanId,
      },
    });

    const completionPercentage =
      objectives.length > 0
        ? objectives.reduce(
            (total, item) => total + item.progress,
            0,
          ) / objectives.length
        : 0;

    await prisma.trainingPlan.update({
      where: {
        id: objective.trainingPlanId,
      },
      data: {
        completionPercentage,
      },
    });

    return NextResponse.json({
      objective: updatedObjective,
      completionPercentage,
    });
  } catch (error) {
    console.error("Training PATCH error:", error);

    return NextResponse.json(
      { error: "Failed to update training objective." },
      { status: 500 },
    );
  }
}