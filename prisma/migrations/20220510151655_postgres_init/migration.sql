-- CreateEnum
CREATE TYPE "ProfileType" AS ENUM ('STUDENT', 'PERSONAL');

-- CreateEnum
CREATE TYPE "AdviceRequestStatus" AS ENUM ('ACCEPTED', 'REJECTED', 'PENDING');

-- CreateEnum
CREATE TYPE "Grip" AS ENUM ('PRONATE', 'SUPINE', 'NEUTRAL');

-- CreateEnum
CREATE TYPE "TrainingPlanningType" AS ENUM ('ADVICE', 'USER');

-- CreateEnum
CREATE TYPE "Day" AS ENUM ('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');

-- CreateTable
CREATE TABLE "User" (
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerifiedAt" TIMESTAMP(3),
    "image" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "type" "ProfileType" NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentProfile" (
    "id" TEXT NOT NULL,

    CONSTRAINT "StudentProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonalProfile" (
    "id" TEXT NOT NULL,

    CONSTRAINT "PersonalProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Advice" (
    "active" BOOLEAN NOT NULL,
    "studentId" TEXT NOT NULL,
    "personalId" TEXT NOT NULL,

    CONSTRAINT "Advice_pkey" PRIMARY KEY ("studentId","personalId")
);

-- CreateTable
CREATE TABLE "AdviceChange" (
    "id" TEXT NOT NULL,
    "activeChangedTo" BOOLEAN NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adviceStudentId" TEXT NOT NULL,
    "advicePersonalId" TEXT NOT NULL,

    CONSTRAINT "AdviceChange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdviceRequest" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "AdviceRequestStatus" NOT NULL,
    "toId" TEXT NOT NULL,
    "fromId" TEXT NOT NULL,

    CONSTRAINT "AdviceRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Picture" (
    "url" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "studentProfileId" TEXT NOT NULL,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Measurement" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" TEXT NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "shoulders" DOUBLE PRECISION NOT NULL,
    "chest" DOUBLE PRECISION NOT NULL,
    "waist" DOUBLE PRECISION NOT NULL,
    "hips" DOUBLE PRECISION NOT NULL,
    "arm_left" DOUBLE PRECISION NOT NULL,
    "arm_right" DOUBLE PRECISION NOT NULL,
    "forearm_left" DOUBLE PRECISION NOT NULL,
    "forearm_right" DOUBLE PRECISION NOT NULL,
    "thigh_left" DOUBLE PRECISION NOT NULL,
    "thigh_right" DOUBLE PRECISION NOT NULL,
    "calf_left" DOUBLE PRECISION NOT NULL,
    "calf_right" DOUBLE PRECISION NOT NULL,
    "studentProfileId" TEXT NOT NULL,

    CONSTRAINT "Measurement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MuscleGroup" (
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL,

    CONSTRAINT "MuscleGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movement" (
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "muscleGroupId" TEXT NOT NULL,

    CONSTRAINT "Movement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "grip" "Grip",
    "movementId" TEXT NOT NULL,
    "equipmentId" TEXT,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Set" (
    "id" TEXT NOT NULL,
    "times" INTEGER NOT NULL,
    "repetitions" TEXT NOT NULL,
    "exerciseTechniqueId" TEXT,
    "minRestTime" INTEGER,
    "maxRestTime" INTEGER,

    CONSTRAINT "Set_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseTechnique" (
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,

    CONSTRAINT "ExerciseTechnique_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingPlanning" (
    "id" TEXT NOT NULL,
    "type" "TrainingPlanningType" NOT NULL,
    "trainingPlanningTypeId" TEXT NOT NULL,
    "userId" TEXT,
    "adviceStudentId" TEXT NOT NULL,
    "advicePersonalId" TEXT NOT NULL,

    CONSTRAINT "TrainingPlanning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Training" (
    "id" TEXT NOT NULL,
    "letter" TEXT NOT NULL,
    "aerobicMinutes" INTEGER NOT NULL,
    "trainingPlanningId" TEXT,
    "day" "Day" NOT NULL,

    CONSTRAINT "Training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingPlanningFocus" (
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "defaultMinRestTime" INTEGER NOT NULL,
    "defaultMaxRestTime" INTEGER NOT NULL,

    CONSTRAINT "TrainingPlanningFocus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExerciseToSet" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SetToTraining" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "MuscleGroup_name_key" ON "MuscleGroup"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToSet_AB_unique" ON "_ExerciseToSet"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToSet_B_index" ON "_ExerciseToSet"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SetToTraining_AB_unique" ON "_SetToTraining"("A", "B");

-- CreateIndex
CREATE INDEX "_SetToTraining_B_index" ON "_SetToTraining"("B");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advice" ADD CONSTRAINT "Advice_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Advice" ADD CONSTRAINT "Advice_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "PersonalProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdviceChange" ADD CONSTRAINT "AdviceChange_adviceStudentId_advicePersonalId_fkey" FOREIGN KEY ("adviceStudentId", "advicePersonalId") REFERENCES "Advice"("studentId", "personalId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdviceRequest" ADD CONSTRAINT "AdviceRequest_toId_fkey" FOREIGN KEY ("toId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdviceRequest" ADD CONSTRAINT "AdviceRequest_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_studentProfileId_fkey" FOREIGN KEY ("studentProfileId") REFERENCES "StudentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Measurement" ADD CONSTRAINT "Measurement_studentProfileId_fkey" FOREIGN KEY ("studentProfileId") REFERENCES "StudentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movement" ADD CONSTRAINT "Movement_muscleGroupId_fkey" FOREIGN KEY ("muscleGroupId") REFERENCES "MuscleGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_movementId_fkey" FOREIGN KEY ("movementId") REFERENCES "Movement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_exerciseTechniqueId_fkey" FOREIGN KEY ("exerciseTechniqueId") REFERENCES "ExerciseTechnique"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingPlanning" ADD CONSTRAINT "TrainingPlanning_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingPlanning" ADD CONSTRAINT "TrainingPlanning_adviceStudentId_advicePersonalId_fkey" FOREIGN KEY ("adviceStudentId", "advicePersonalId") REFERENCES "Advice"("studentId", "personalId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingPlanning" ADD CONSTRAINT "TrainingPlanning_trainingPlanningTypeId_fkey" FOREIGN KEY ("trainingPlanningTypeId") REFERENCES "TrainingPlanningFocus"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Training" ADD CONSTRAINT "Training_trainingPlanningId_fkey" FOREIGN KEY ("trainingPlanningId") REFERENCES "TrainingPlanning"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToSet" ADD CONSTRAINT "_ExerciseToSet_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToSet" ADD CONSTRAINT "_ExerciseToSet_B_fkey" FOREIGN KEY ("B") REFERENCES "Set"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SetToTraining" ADD CONSTRAINT "_SetToTraining_A_fkey" FOREIGN KEY ("A") REFERENCES "Set"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SetToTraining" ADD CONSTRAINT "_SetToTraining_B_fkey" FOREIGN KEY ("B") REFERENCES "Training"("id") ON DELETE CASCADE ON UPDATE CASCADE;
