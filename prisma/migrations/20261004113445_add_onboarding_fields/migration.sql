-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "displayName" TEXT,
    "avatarUrl" TEXT,
    "bio" TEXT,
    "role" TEXT NOT NULL DEFAULT 'PLAYER',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "region" TEXT,
    "country" TEXT,
    "onboardingCompleted" BOOLEAN NOT NULL DEFAULT false,
    "onboardingGoal" TEXT,
    "onboardingPlatform" TEXT
);
INSERT INTO "new_User" ("avatarUrl", "bio", "country", "createdAt", "displayName", "email", "id", "passwordHash", "region", "role", "status", "updatedAt", "username") SELECT "avatarUrl", "bio", "country", "createdAt", "displayName", "email", "id", "passwordHash", "region", "role", "status", "updatedAt", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "User_region_idx" ON "User"("region");
CREATE INDEX "User_role_idx" ON "User"("role");
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");
CREATE INDEX "User_onboardingCompleted_idx" ON "User"("onboardingCompleted");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
