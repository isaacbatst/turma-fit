/*
  Warnings:

  - You are about to drop the column `type` on the `TrainingPlanning` table. All the data in the column will be lost.
  - Added the required column `trainingPlanningTypeId` to the `TrainingPlanning` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TrainingPlanning" DROP COLUMN "type",
ADD COLUMN     "trainingPlanningTypeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "TrainingPlanning" ADD CONSTRAINT "TrainingPlanning_trainingPlanningTypeId_fkey" FOREIGN KEY ("trainingPlanningTypeId") REFERENCES "TrainingPlanningType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
