/*
  Warnings:

  - You are about to drop the column `restMaxTime` on the `ExerciseSerie` table. All the data in the column will be lost.
  - You are about to drop the column `restMinTime` on the `ExerciseSerie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ExerciseSerie" DROP COLUMN "restMaxTime",
DROP COLUMN "restMinTime",
ADD COLUMN     "maxRestTime" INTEGER,
ADD COLUMN     "minRestTime" INTEGER;

-- AlterTable
ALTER TABLE "TrainingPlanningType" ADD COLUMN     "defaultMaxRestTime" INTEGER NOT NULL DEFAULT 45,
ADD COLUMN     "defaultMinRestTime" INTEGER NOT NULL DEFAULT 60;
