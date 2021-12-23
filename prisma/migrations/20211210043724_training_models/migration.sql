-- CreateTable
CREATE TABLE "MuscleGroup" (
    "name" TEXT NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "MuscleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "name" TEXT NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseSerie" (
    "id" SERIAL NOT NULL,
    "repetitions" TEXT NOT NULL,
    "times" INTEGER NOT NULL,
    "exerciseTechniqueId" INTEGER NOT NULL,
    "restMinTime" INTEGER NOT NULL,
    "restMaxTime" INTEGER NOT NULL,

    CONSTRAINT "ExerciseSerie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseTechnique" (
    "name" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "explanation" TEXT NOT NULL,

    CONSTRAINT "ExerciseTechnique_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingPlanning" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "TrainingPlanning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Training" (
    "id" SERIAL NOT NULL,
    "letter" TEXT NOT NULL,
    "aerobicMinutes" INTEGER NOT NULL,
    "trainingPlanningId" INTEGER,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingPlanningType" (
    "name" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "explanation" TEXT NOT NULL,

    CONSTRAINT "TrainingPlanningType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExerciseToMuscleGroup" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ExerciseToExerciseSerie" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ExerciseSerieToTraining" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "MuscleGroup_name_key" ON "MuscleGroup"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToMuscleGroup_AB_unique" ON "_ExerciseToMuscleGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToMuscleGroup_B_index" ON "_ExerciseToMuscleGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToExerciseSerie_AB_unique" ON "_ExerciseToExerciseSerie"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToExerciseSerie_B_index" ON "_ExerciseToExerciseSerie"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseSerieToTraining_AB_unique" ON "_ExerciseSerieToTraining"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseSerieToTraining_B_index" ON "_ExerciseSerieToTraining"("B");

-- AddForeignKey
ALTER TABLE "ExerciseSerie" ADD CONSTRAINT "ExerciseSerie_exerciseTechniqueId_fkey" FOREIGN KEY ("exerciseTechniqueId") REFERENCES "ExerciseTechnique"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_trainingPlanningId_fkey" FOREIGN KEY ("trainingPlanningId") REFERENCES "TrainingPlanning"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToMuscleGroup" ADD FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToMuscleGroup" ADD FOREIGN KEY ("B") REFERENCES "MuscleGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToExerciseSerie" ADD FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToExerciseSerie" ADD FOREIGN KEY ("B") REFERENCES "ExerciseSerie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseSerieToTraining" ADD FOREIGN KEY ("A") REFERENCES "ExerciseSerie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseSerieToTraining" ADD FOREIGN KEY ("B") REFERENCES "Training"("id") ON DELETE CASCADE ON UPDATE CASCADE;
