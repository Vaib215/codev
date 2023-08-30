/*
  Warnings:

  - A unique constraint covering the columns `[gistId]` on the table `Codev` will be added. If there are existing duplicate values, this will fail.
  - Made the column `gistId` on table `Codev` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Codev" ALTER COLUMN "gistId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Codev_gistId_key" ON "Codev"("gistId");
