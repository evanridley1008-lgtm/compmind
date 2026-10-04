import {
  PrismaClient,
  UserRole,
  UserStatus,
  SubscriptionPlan,
  SubscriptionStatus,
  TrainingDifficulty,
  TrainingObjectiveStatus,
  MatchCategory,
  MatchType,
  GameMode,
  AnalysisStatus,
  AnalysisCategory,
  AnalysisSeverity,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding CompMind database...");

  // ==========================================
  // USER
  // ==========================================

  const user = await prisma.user.upsert({
    where: {
      username: "MYKO",
    },
    update: {
      displayName: "MŸKO",
      email: "myko@compmind.local",
      role: UserRole.PLAYER,
      status: UserStatus.ACTIVE,
      region: "EU",
      country: "GB",
    },
    create: {
      username: "MYKO",
      displayName: "MŸKO",
      email: "myko@compmind.local",
      role: UserRole.PLAYER,
      status: UserStatus.ACTIVE,
      region: "EU",
      country: "GB",
    },
  });

  console.log(`User ready: ${user.displayName}`);

  // ==========================================
  // SUBSCRIPTION
  // ==========================================

  await prisma.subscription.upsert({
    where: {
      userId: user.id,
    },
    update: {
      plan: SubscriptionPlan.PRO,
      status: SubscriptionStatus.ACTIVE,
    },
    create: {
      userId: user.id,
      plan: SubscriptionPlan.PRO,
      status: SubscriptionStatus.ACTIVE,
      startedAt: new Date(),
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(
        new Date().setMonth(new Date().getMonth() + 1),
      ),
    },
  });

  console.log("Subscription ready.");

  // ==========================================
  // TRAINING PLAN
  // ==========================================

  let trainingPlan = await prisma.trainingPlan.findFirst({
    where: {
      userId: user.id,
      title: "Competitive Improvement Plan",
    },
  });

  if (!trainingPlan) {
    trainingPlan = await prisma.trainingPlan.create({
      data: {
        userId: user.id,
        title: "Competitive Improvement Plan",
        description:
          "Personalised training generated from gameplay performance.",
        startDate: new Date(),
        objectives: {
          create: [
            {
              title: "Piece Control Activation",
              description:
                "Practise protected piece placement, fast edits and right-hand peeks.",
              category: "Mechanics",
              difficulty: TrainingDifficulty.ELITE,
              estimatedMinutes: 20,
              status: TrainingObjectiveStatus.COMPLETED,
              progress: 100,
            },
            {
              title: "Fight Conversion Drills",
              description:
                "Convert early damage advantages into controlled eliminations.",
              category: "Fighting",
              difficulty: TrainingDifficulty.ADVANCED,
              estimatedMinutes: 25,
              status: TrainingObjectiveStatus.IN_PROGRESS,
              progress: 60,
            },
            {
              title: "Early Rotation Practice",
              description:
                "Read zones earlier and rotate before the storm forces movement.",
              category: "Rotations",
              difficulty: TrainingDifficulty.ADVANCED,
              estimatedMinutes: 20,
              status: TrainingObjectiveStatus.NOT_STARTED,
              progress: 0,
            },
            {
              title: "Mid-Game Positioning",
              description:
                "Practise taking protected positions with fewer exposed angles.",
              category: "Positioning",
              difficulty: TrainingDifficulty.ADVANCED,
              estimatedMinutes: 20,
              status: TrainingObjectiveStatus.NOT_STARTED,
              progress: 0,
            },
            {
              title: "Moving Zone Layer Discipline",
              description:
                "Maintain a strong layer through moving zones and avoid unnecessary movement.",
              category: "Endgame",
              difficulty: TrainingDifficulty.ELITE,
              estimatedMinutes: 25,
              status: TrainingObjectiveStatus.NOT_STARTED,
              progress: 0,
            },
          ],
        },
      },
    });
  }

  const trainingObjectives = await prisma.trainingObjective.findMany({
    where: {
      trainingPlanId: trainingPlan.id,
    },
  });

  const trainingCompletion =
    trainingObjectives.length > 0
      ? trainingObjectives.reduce(
          (total, objective) => total + objective.progress,
          0,
        ) / trainingObjectives.length
      : 0;

  await prisma.trainingPlan.update({
    where: {
      id: trainingPlan.id,
    },
    data: {
      completionPercentage: trainingCompletion,
    },
  });

  console.log(
    `Training plan ready: ${trainingObjectives.length} objectives`,
  );

  // ==========================================
  // WEEKLY ROUTINE
  // ==========================================

  const existingRoutines = await prisma.routine.findMany({
    where: {
      userId: user.id,
    },
  });

  if (existingRoutines.length === 0) {
    await prisma.routine.create({
      data: {
        userId: user.id,
        title: "Monday — Mechanics",
        description: "Build fast, consistent mechanical execution.",
        dayOfWeek: 1,
        objectives: {
          create: [
            {
              title: "Piece Control Warm-up",
              category: "Mechanics",
              duration: 20,
              status: TrainingObjectiveStatus.COMPLETED,
              progress: 100,
            },
            {
              title: "Edit Speed Drills",
              category: "Mechanics",
              duration: 15,
              status: TrainingObjectiveStatus.IN_PROGRESS,
              progress: 50,
            },
            {
              title: "Aim Control",
              category: "Aim",
              duration: 15,
              status: TrainingObjectiveStatus.NOT_STARTED,
              progress: 0,
            },
          ],
        },
      },
    });

    await prisma.routine.create({
      data: {
        userId: user.id,
        title: "Tuesday — Fighting",
        description: "Improve fight conversion and damage efficiency.",
        dayOfWeek: 2,
        objectives: {
          create: [
            {
              title: "Fight Conversion Drills",
              category: "Fighting",
              duration: 25,
              status: TrainingObjectiveStatus.IN_PROGRESS,
              progress: 60,
            },
            {
              title: "Box Fight Conversion",
              category: "Fighting",
              duration: 20,
              status: TrainingObjectiveStatus.NOT_STARTED,
              progress: 0,
            },
          ],
        },
      },
    });

    await prisma.routine.create({
      data: {
        userId: user.id,
        title: "Wednesday — Rotations",
        description: "Improve zone reads and early rotations.",
        dayOfWeek: 3,
        objectives: {
          create: [
            {
              title: "Early Rotation Practice",
              category: "Rotations",
              duration: 20,
              status: TrainingObjectiveStatus.NOT_STARTED,
              progress: 0,
            },
            {
              title: "Mid-Game Rotation Review",
              category: "Rotations",
              duration: 20,
              status: TrainingObjectiveStatus.NOT_STARTED,
              progress: 0,
            },
          ],
        },
      },
    });

    await prisma.routine.create({
      data: {
        userId: user.id,
        title: "Thursday — Positioning",
        description: "Practise safer mid-game positioning.",
        dayOfWeek: 4,
        objectives: {
          create: [
            {
              title: "Mid-Game Positioning",
              category: "Positioning",
              duration: 20,
              status: TrainingObjectiveStatus.NOT_STARTED,
              progress: 0,
            },
            {
              title: "Protected Angle Practice",
              category: "Positioning",
              duration: 15,
              status: TrainingObjectiveStatus.NOT_STARTED,
              progress: 0,
            },
          ],
        },
      },
    });

    await prisma.routine.create({
      data: {
        userId: user.id,
        title: "Friday — Endgame",
        description: "Build stronger moving-zone discipline.",
        dayOfWeek: 5,
        objectives: {
          create: [
            {
              title: "Moving Zone Layer Discipline",
              category: "Endgame",
              duration: 25,
              status: TrainingObjectiveStatus.NOT_STARTED,
              progress: 0,
            },
            {
              title: "Endgame Positioning",
              category: "Endgame",
              duration: 20,
              status: TrainingObjectiveStatus.NOT_STARTED,
              progress: 0,
            },
          ],
        },
      },
    });

    await prisma.routine.create({
      data: {
        userId: user.id,
        title: "Saturday — Competitive Session",
        description:
          "Apply the week's training in competitive matches.",
        dayOfWeek: 6,
        objectives: {
          create: [
            {
              title: "Tournament Warm-up",
              category: "Preparation",
              duration: 20,
              status: TrainingObjectiveStatus.NOT_STARTED,
              progress: 0,
            },
            {
              title: "Competitive Matches",
              category: "Competition",
              duration: 120,
              status: TrainingObjectiveStatus.NOT_STARTED,
              progress: 0,
            },
            {
              title: "Post-Match Review",
              category: "Review",
              duration: 30,
              status: TrainingObjectiveStatus.NOT_STARTED,
              progress: 0,
            },
          ],
        },
      },
    });

    await prisma.routine.create({
      data: {
        userId: user.id,
        title: "Sunday — Review & Recovery",
        description:
          "Review the week and prepare the next training cycle.",
        dayOfWeek: 0,
        objectives: {
          create: [
            {
              title: "Weekly VOD Review",
              category: "Review",
              duration: 30,
              status: TrainingObjectiveStatus.NOT_STARTED,
              progress: 0,
            },
            {
              title: "Performance Review",
              category: "Review",
              duration: 20,
              status: TrainingObjectiveStatus.NOT_STARTED,
              progress: 0,
            },
          ],
        },
      },
    });

    console.log("Weekly routine created.");
  } else {
    console.log(
      `Weekly routine already exists: ${existingRoutines.length} routines`,
    );
  }

  // ==========================================
  // DEMO MATCH
  // ==========================================

  let demoMatch = await prisma.match.findFirst({
    where: {
      userId: user.id,
      eventName: "FNCS Round 1",
      eventRound: "Game 4",
    },
  });

  if (!demoMatch) {
    demoMatch = await prisma.match.create({
      data: {
        userId: user.id,
        category: MatchCategory.TOURNAMENT,
        type: MatchType.FNCS,
        mode: GameMode.SOLO,
        eventName: "FNCS Round 1",
        eventRound: "Game 4",
        playedAt: new Date("2026-09-30T20:48:00"),
        placement: 12,
        eliminations: 5,
        damage: 1042,
        survivalTime: 981,
        killsPerMinute: 0.31,
        points: 18,
        analyzed: true,
      },
    });

    console.log(`Demo match created: ${demoMatch.id}`);
  } else {
    console.log(`Demo match already exists: ${demoMatch.id}`);
  }

  // ==========================================
  // DEMO GAMEPLAY ANALYSIS
  // ==========================================

  let analysis = await prisma.analysis.findUnique({
    where: {
      matchId: demoMatch.id,
    },
  });

  if (!analysis) {
    analysis = await prisma.analysis.create({
      data: {
        userId: user.id,
        matchId: demoMatch.id,
        status: AnalysisStatus.COMPLETED,
        createdAt: new Date("2026-09-30T21:05:00"),
        completedAt: new Date("2026-09-30T21:07:30"),
        overallScore: 78,
        summary:
          "Strong mechanical execution and good fight mechanics, but the analysis identified repeated rotation timing and positioning issues. The largest opportunity is reaching stronger positions earlier and converting damage advantages more consistently.",
        findings: {
          create: [
            {
              category: AnalysisCategory.ROTATIONS,
              severity: AnalysisSeverity.HIGH,
              title: "Late rotation detected",
              description:
                "You remained in the previous area too long and began rotating after the zone had already created significant congestion.",
              timestamp: "12:48",
              confidence: 0.94,
              recommendation:
                "Begin rotating earlier when the next zone direction is clear. Prioritise a safe route before the lobby becomes congested.",
            },
            {
              category: AnalysisCategory.POSITIONING,
              severity: AnalysisSeverity.HIGH,
              title: "Exposed to multiple angles",
              description:
                "Your mid-game position allowed several opponents to maintain potential angles onto you at the same time.",
              timestamp: "08:31",
              confidence: 0.89,
              recommendation:
                "Prioritise protected positions with fewer exposed angles and maintain an immediate escape route.",
            },
            {
              category: AnalysisCategory.FIGHTING,
              severity: AnalysisSeverity.MEDIUM,
              title: "Damage advantage not converted",
              description:
                "You created an early health advantage but extended the fight instead of forcing a controlled conversion.",
              timestamp: "06:42",
              confidence: 0.86,
              recommendation:
                "After creating a significant damage advantage, tighten the fight and force the opponent into a limited set of options.",
            },
            {
              category: AnalysisCategory.ENDGAME,
              severity: AnalysisSeverity.MEDIUM,
              title: "Endgame layer discipline",
              description:
                "Your late-game positioning became unnecessarily exposed while moving with the zone.",
              timestamp: "15:22",
              confidence: 0.82,
              recommendation:
                "Maintain a protected layer and preserve materials for controlled movement through later zones.",
            },
          ],
        },
      },
    });

    console.log(`Demo analysis created: ${analysis.id}`);
  } else {
    console.log(`Demo analysis already exists: ${analysis.id}`);
  }

  console.log("Gameplay analysis ready.");

  // ==========================================
  // FINISHED
  // ==========================================

  console.log("CompMind database seeded successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });