-- AlterTable
ALTER TABLE "TrainingPlanning" ADD COLUMN     "personalId" INTEGER;

-- AddForeignKey
ALTER TABLE "TrainingPlanning" ADD CONSTRAINT "TrainingPlanning_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
