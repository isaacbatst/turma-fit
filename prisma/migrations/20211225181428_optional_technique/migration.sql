-- DropForeignKey
ALTER TABLE "ExerciseSerie" DROP CONSTRAINT "ExerciseSerie_exerciseTechniqueId_fkey";

-- AlterTable
ALTER TABLE "ExerciseSerie" ALTER COLUMN "exerciseTechniqueId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ExerciseSerie" ADD CONSTRAINT "ExerciseSerie_exerciseTechniqueId_fkey" FOREIGN KEY ("exerciseTechniqueId") REFERENCES "ExerciseTechnique"("id") ON DELETE SET NULL ON UPDATE CASCADE;
