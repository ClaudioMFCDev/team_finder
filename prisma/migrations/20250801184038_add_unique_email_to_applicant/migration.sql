/*
  Warnings:

  - A unique constraint covering the columns `[email,teamRequestId]` on the table `Applicant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Applicant_email_teamRequestId_key" ON "Applicant"("email", "teamRequestId");
