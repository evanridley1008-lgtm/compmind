-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "displayName" TEXT,
    "avatarUrl" TEXT,
    "bio" TEXT,
    "role" TEXT NOT NULL DEFAULT 'PLAYER',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "region" TEXT,
    "country" TEXT
);

-- CreateTable
CREATE TABLE "ConnectedAccount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "connectedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSyncedAt" DATETIME,
    "isConnected" BOOLEAN NOT NULL DEFAULT true,
    CONSTRAINT "ConnectedAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "playedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "mode" TEXT NOT NULL,
    "eventId" TEXT,
    "eventName" TEXT,
    "eventRound" TEXT,
    "placement" INTEGER NOT NULL,
    "eliminations" INTEGER NOT NULL,
    "damage" INTEGER,
    "survivalTime" INTEGER,
    "killsPerMinute" REAL,
    "points" REAL,
    "rankChange" INTEGER,
    "analyzed" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Match_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Replay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "matchId" TEXT,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT,
    "fileSize" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'UPLOADED',
    "uploadedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" DATETIME,
    CONSTRAINT "Replay_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Replay_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Analysis" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "replayId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'QUEUED',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" DATETIME,
    "overallScore" INTEGER,
    "summary" TEXT,
    CONSTRAINT "Analysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Analysis_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Analysis_replayId_fkey" FOREIGN KEY ("replayId") REFERENCES "Replay" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AnalysisFinding" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "analysisId" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "timestamp" TEXT,
    "confidence" REAL,
    "recommendation" TEXT,
    CONSTRAINT "AnalysisFinding_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "Analysis" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TrainingPlan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startDate" DATETIME,
    "endDate" DATETIME,
    "completionPercentage" REAL NOT NULL DEFAULT 0,
    CONSTRAINT "TrainingPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TrainingObjective" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "trainingPlanId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "estimatedMinutes" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NOT_STARTED',
    "target" TEXT,
    "progress" REAL NOT NULL DEFAULT 0,
    CONSTRAINT "TrainingObjective_trainingPlanId_fkey" FOREIGN KEY ("trainingPlanId") REFERENCES "TrainingPlan" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Routine" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "dayOfWeek" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Routine_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RoutineObjective" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "routineId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NOT_STARTED',
    "progress" REAL NOT NULL DEFAULT 0,
    CONSTRAINT "RoutineObjective_routineId_fkey" FOREIGN KEY ("routineId") REFERENCES "Routine" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tournament" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "season" TEXT,
    "chapter" TEXT,
    "region" TEXT,
    "platform" TEXT,
    "status" TEXT NOT NULL DEFAULT 'UPCOMING',
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME,
    "logoUrl" TEXT,
    "playerCapacity" INTEGER,
    "prizePool" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "TournamentRegistration" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tournamentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'REGISTERED',
    "registeredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TournamentRegistration_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TournamentRegistration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TournamentResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tournamentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "placement" INTEGER NOT NULL,
    "points" REAL NOT NULL DEFAULT 0,
    "eliminations" INTEGER NOT NULL DEFAULT 0,
    "matchesPlayed" INTEGER NOT NULL DEFAULT 0,
    "prizeWon" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "TournamentResult_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TournamentResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "LeaderboardEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "region" TEXT,
    "rank" INTEGER NOT NULL,
    "value" REAL NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "LeaderboardEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "startedAt" DATETIME NOT NULL,
    "currentPeriodStart" DATETIME NOT NULL,
    "currentPeriodEnd" DATETIME NOT NULL,
    "cancelAtPeriodEnd" BOOLEAN NOT NULL DEFAULT false,
    "creatorCode" TEXT,
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "icon" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "UserAchievement" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "achievementId" TEXT NOT NULL,
    "unlockedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserAchievement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserAchievement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "Achievement" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_region_idx" ON "User"("region");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");

-- CreateIndex
CREATE INDEX "ConnectedAccount_userId_idx" ON "ConnectedAccount"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ConnectedAccount_platform_accountId_key" ON "ConnectedAccount"("platform", "accountId");

-- CreateIndex
CREATE INDEX "Match_userId_playedAt_idx" ON "Match"("userId", "playedAt");

-- CreateIndex
CREATE INDEX "Match_eventId_idx" ON "Match"("eventId");

-- CreateIndex
CREATE INDEX "Match_category_idx" ON "Match"("category");

-- CreateIndex
CREATE INDEX "Replay_userId_uploadedAt_idx" ON "Replay"("userId", "uploadedAt");

-- CreateIndex
CREATE INDEX "Replay_status_idx" ON "Replay"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Analysis_matchId_key" ON "Analysis"("matchId");

-- CreateIndex
CREATE UNIQUE INDEX "Analysis_replayId_key" ON "Analysis"("replayId");

-- CreateIndex
CREATE INDEX "Analysis_userId_createdAt_idx" ON "Analysis"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "Analysis_status_idx" ON "Analysis"("status");

-- CreateIndex
CREATE INDEX "AnalysisFinding_analysisId_idx" ON "AnalysisFinding"("analysisId");

-- CreateIndex
CREATE INDEX "AnalysisFinding_category_idx" ON "AnalysisFinding"("category");

-- CreateIndex
CREATE INDEX "AnalysisFinding_severity_idx" ON "AnalysisFinding"("severity");

-- CreateIndex
CREATE INDEX "TrainingPlan_userId_createdAt_idx" ON "TrainingPlan"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "TrainingObjective_trainingPlanId_idx" ON "TrainingObjective"("trainingPlanId");

-- CreateIndex
CREATE INDEX "TrainingObjective_status_idx" ON "TrainingObjective"("status");

-- CreateIndex
CREATE INDEX "Routine_userId_idx" ON "Routine"("userId");

-- CreateIndex
CREATE INDEX "RoutineObjective_routineId_idx" ON "RoutineObjective"("routineId");

-- CreateIndex
CREATE INDEX "Tournament_status_idx" ON "Tournament"("status");

-- CreateIndex
CREATE INDEX "Tournament_startTime_idx" ON "Tournament"("startTime");

-- CreateIndex
CREATE INDEX "TournamentRegistration_userId_idx" ON "TournamentRegistration"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "TournamentRegistration_tournamentId_userId_key" ON "TournamentRegistration"("tournamentId", "userId");

-- CreateIndex
CREATE INDEX "TournamentResult_userId_points_idx" ON "TournamentResult"("userId", "points");

-- CreateIndex
CREATE INDEX "TournamentResult_tournamentId_placement_idx" ON "TournamentResult"("tournamentId", "placement");

-- CreateIndex
CREATE UNIQUE INDEX "TournamentResult_tournamentId_userId_key" ON "TournamentResult"("tournamentId", "userId");

-- CreateIndex
CREATE INDEX "LeaderboardEntry_type_region_rank_idx" ON "LeaderboardEntry"("type", "region", "rank");

-- CreateIndex
CREATE UNIQUE INDEX "LeaderboardEntry_userId_type_region_key" ON "LeaderboardEntry"("userId", "type", "region");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");

-- CreateIndex
CREATE INDEX "Subscription_status_idx" ON "Subscription"("status");

-- CreateIndex
CREATE INDEX "Subscription_plan_idx" ON "Subscription"("plan");

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_key_key" ON "Achievement"("key");

-- CreateIndex
CREATE INDEX "UserAchievement_userId_idx" ON "UserAchievement"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserAchievement_userId_achievementId_key" ON "UserAchievement"("userId", "achievementId");
