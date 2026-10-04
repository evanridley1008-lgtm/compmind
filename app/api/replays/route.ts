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

    const replays = await prisma.replay.findMany({
      where: {
        userId: user.id,
      },
      include: {
        match: true,
        analysis: true,
      },
      orderBy: {
        uploadedAt: "desc",
      },
    });

    return NextResponse.json(replays);
  } catch (error) {
    console.error("Replays GET error:", error);

    return NextResponse.json(
      { error: "Failed to load replays." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      fileName,
      fileSize,
      fileUrl,
      matchId,
    } = body;

    if (!fileName || typeof fileName !== "string") {
      return NextResponse.json(
        { error: "fileName is required." },
        { status: 400 },
      );
    }

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

    if (matchId) {
      const match = await prisma.match.findFirst({
        where: {
          id: matchId,
          userId: user.id,
        },
      });

      if (!match) {
        return NextResponse.json(
          { error: "Match not found." },
          { status: 404 },
        );
      }
    }

    const replay = await prisma.replay.create({
      data: {
        userId: user.id,
        fileName,
        fileSize:
          typeof fileSize === "number" && Number.isFinite(fileSize)
            ? Math.max(0, Math.round(fileSize))
            : null,
        fileUrl:
          typeof fileUrl === "string" && fileUrl.length > 0
            ? fileUrl
            : null,
        matchId: matchId ?? null,
        status: "UPLOADED",
      },
      include: {
        match: true,
        analysis: true,
      },
    });

    return NextResponse.json(replay, { status: 201 });
  } catch (error) {
    console.error("Replays POST error:", error);

    return NextResponse.json(
      { error: "Failed to create replay." },
      { status: 500 },
    );
  }
}
