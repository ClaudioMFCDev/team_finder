/*
  Warnings:

  - Added the required column `email` to the `Applicant` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Applicant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "teamRequestId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Applicant_teamRequestId_fkey" FOREIGN KEY ("teamRequestId") REFERENCES "TeamRequest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Applicant" ("createdAt", "id", "message", "name", "teamRequestId") SELECT "createdAt", "id", "message", "name", "teamRequestId" FROM "Applicant";
DROP TABLE "Applicant";
ALTER TABLE "new_Applicant" RENAME TO "Applicant";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
