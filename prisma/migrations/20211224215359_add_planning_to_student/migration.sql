-- AlterTable
ALTER TABLE "TrainingPlanning" ADD COLUMN     "studentId" INTEGER;

-- AddForeignKey
ALTER TABLE "TrainingPlanning" ADD CONSTRAINT "TrainingPlanning_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
