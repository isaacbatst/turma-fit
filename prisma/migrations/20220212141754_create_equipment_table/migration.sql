/*
  Warnings:

  - You are about to drop the `_ExerciseToMuscleGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ExerciseToMuscleGroup" DROP CONSTRAINT "_ExerciseToMuscleGroup_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciseToMuscleGroup" DROP CONSTRAINT "_ExerciseToMuscleGroup_B_fkey";

-- DropTable
DROP TABLE "_ExerciseToMuscleGroup";

-- CreateTable
CREATE TABLE "Equipment" (
    "name" TEXT NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);
