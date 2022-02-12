/*
  Warnings:

  - You are about to drop the `ExerciseSerie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExerciseSerieToTraining` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExerciseToExerciseSerie` table. If the table is not empty, all the data it contains will be lost.

*/
-- RenameTables
ALTER TABLE "ExerciseSerie" RENAME TO "Set";
ALTER TABLE "_ExerciseSerieToTraining" RENAME TO "_SetToTraining";
ALTER TABLE "_ExerciseToExerciseSerie" RENAME TO "_ExerciseToSet";

-- RenamePrimaryKeys
ALTER TABLE "Set" RENAME CONSTRAINT "ExerciseSerie_pkey" TO "Set_pkey";

-- RenameForeignKeys
ALTER TABLE "Set" RENAME CONSTRAINT "ExerciseSerie_exerciseTechniqueId_fkey" TO "Set_exerciseTechniqueId_fkey";

ALTER TABLE "_SetToTraining" RENAME CONSTRAINT "_ExerciseSerieToTraining_A_fkey" TO "_SetToTraining_A_fkey";
ALTER TABLE "_SetToTraining" RENAME CONSTRAINT "_ExerciseSerieToTraining_B_fkey" TO "_SetToTraining_B_fkey";

ALTER TABLE "_ExerciseToSet" RENAME CONSTRAINT "_ExerciseToExerciseSerie_A_fkey" TO "_ExerciseToSet_A_fkey";
ALTER TABLE "_ExerciseToSet" RENAME CONSTRAINT "_ExerciseToExerciseSerie_B_fkey" TO "_ExerciseToSet_B_fkey";

-- RenameIndexes
ALTER INDEX "_ExerciseToExerciseSerie_AB_unique" RENAME TO "_ExerciseToSet_AB_unique";
ALTER INDEX "_ExerciseToExerciseSerie_B_index" RENAME TO "_ExerciseToSet_B_index";

ALTER INDEX "_ExerciseSerieToTraining_AB_unique" RENAME TO "_SetToTraining_AB_unique";
ALTER INDEX "_ExerciseSerieToTraining_B_index" RENAME TO "_SetToTraining_B_index";
