/*
  Warnings:

  - You are about to drop the column `trainingPlanningsOrder` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `exercisesSeriesOrder` on the `Training` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Grip" ADD VALUE 'NEUTRAL';

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "trainingPlanningsOrder";

-- AlterTable
ALTER TABLE "Training" DROP COLUMN "exercisesSeriesOrder";
