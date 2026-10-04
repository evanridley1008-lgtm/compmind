import { NextResponse } from "next/server";
import { getCurrentUser } from "../../../lib/auth/session";
import { prisma } from "../../../lib/database/prisma";

type OnboardingBody = {
  goal?: unknown;
  region?: unknown;
  platform?: unknown;
  completed?: unknown;
};

const VALID_GOALS = [
  "competitive",
  "professional",
  "consistency",
  "improvement",
];

const VALID_REGIONS = [
  "EU",
  "NAE",
  "NAW",
  "BR",
  "OCE",
  "ASIA",
  "ME",
];

const VALID_PLATFORMS = [
  "pc",
  "playstation",
  "xbox",
  "nintendo",
];

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        {
          error: "You must be signed in to complete onboarding.",
        },
        { status: 401 },
      );
    }

    const body = (await request.json()) as OnboardingBody;

    const goal =
      typeof body.goal === "string"
        ? body.goal.trim()
        : "";

    const region =
      typeof body.region === "string"
        ? body.region.trim()
        : "";

    const platform =
      typeof body.platform === "string"
        ? body.platform.trim()
        : "";

    const completed = body.completed === true;

    if (!goal || !VALID_GOALS.includes(goal)) {
      return NextResponse.json(
        {
          error: "Please choose a valid improvement goal.",
          field: "goal",
        },
        { status: 400 },
      );
    }

    if (!region || !VALID_REGIONS.includes(region)) {
      return NextResponse.json(
        {
          error: "Please choose a valid region.",
          field: "region",
        },
        { status: 400 },
      );
    }

    if (!platform || !VALID_PLATFORMS.includes(platform)) {
      return NextResponse.json(
        {
          error: "Please choose a valid platform.",
          field: "platform",
        },
        { status: 400 },
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        onboardingGoal: goal,
        region,
        onboardingPlatform: platform,
        onboardingCompleted: completed,
      },
      select: {
        id: true,
        username: true,
        email: true,
        displayName: true,
        role: true,
        status: true,
        region: true,
        onboardingGoal: true,
        onboardingPlatform: true,
        onboardingCompleted: true,
      },
    });

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Onboarding error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong while saving your onboarding.",
      },
      { status: 500 },
    );
  }
}