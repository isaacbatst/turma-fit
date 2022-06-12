/*
  Warnings:

  - The values [ABS] on the enum `MuscleGroup` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "MuscleGroup_new" AS ENUM ('BICEPS', 'TRICEPS', 'CHEST', 'BACK', 'ABDOMINALS', 'SHOULDERS', 'CALVES', 'FOREARMS', 'TRAPEZIUS', 'GLUTES', 'HAMSTRINGS', 'LOWER_BACK', 'QUADRICEPS');
ALTER TABLE "Movement" ALTER COLUMN "focusedMuscleGroup" TYPE "MuscleGroup_new" USING ("focusedMuscleGroup"::text::"MuscleGroup_new");
ALTER TYPE "MuscleGroup" RENAME TO "MuscleGroup_old";
ALTER TYPE "MuscleGroup_new" RENAME TO "MuscleGroup";
DROP TYPE "MuscleGroup_old";
COMMIT;
