-- CreateEnum
CREATE TYPE "ProfileType" AS ENUM ('STUDENT', 'PERSONAL');

-- CreateEnum
CREATE TYPE "MuscleGroup" AS ENUM ('BICEPS', 'TRICEPS', 'CHEST', 'BACK', 'ABDOMINALS', 'SHOULDERS', 'CALVES', 'FOREARMS', 'TRAPEZIUS', 'GLUTES', 'HAMSTRINGS', 'LOWER_BACK', 'QUADRICEPS');

-- CreateEnum
CREATE TYPE "Grip" AS ENUM ('PRONATE', 'SUPINE', 'NEUTRAL');

-- CreateEnum
CREATE TYPE "Day" AS ENUM ('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');

-- CreateTable
CREATE TABLE "User" (
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerifiedAt" TIMESTAMP(3),
    "image" TEXT,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

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
CREATE TABLE "Movement" (
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "focusedMuscleGroup" "MuscleGroup" NOT NULL,

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
    "techniqueId" TEXT,
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
CREATE TABLE "WorkoutPlan" (
    "id" TEXT NOT NULL,
    "workoutPlanTypeId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "WorkoutPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workout" (
    "id" TEXT NOT NULL,
    "aerobicMinutes" INTEGER NOT NULL,
    "workoutPlanId" TEXT,
    "day" "Day" NOT NULL,

    CONSTRAINT "Workout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkoutPlanType" (
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "defaultMinRestTime" INTEGER NOT NULL,
    "defaultMaxRestTime" INTEGER NOT NULL,

    CONSTRAINT "WorkoutPlanType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExerciseToSet" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SetToWorkout" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToSet_AB_unique" ON "_ExerciseToSet"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToSet_B_index" ON "_ExerciseToSet"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SetToWorkout_AB_unique" ON "_SetToWorkout"("A", "B");

-- CreateIndex
CREATE INDEX "_SetToWorkout_B_index" ON "_SetToWorkout"("B");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_studentProfileId_fkey" FOREIGN KEY ("studentProfileId") REFERENCES "StudentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Measurement" ADD CONSTRAINT "Measurement_studentProfileId_fkey" FOREIGN KEY ("studentProfileId") REFERENCES "StudentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_movementId_fkey" FOREIGN KEY ("movementId") REFERENCES "Movement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "Equipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Set" ADD CONSTRAINT "Set_techniqueId_fkey" FOREIGN KEY ("techniqueId") REFERENCES "ExerciseTechnique"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlan" ADD CONSTRAINT "WorkoutPlan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutPlan" ADD CONSTRAINT "WorkoutPlan_workoutPlanTypeId_fkey" FOREIGN KEY ("workoutPlanTypeId") REFERENCES "WorkoutPlanType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_workoutPlanId_fkey" FOREIGN KEY ("workoutPlanId") REFERENCES "WorkoutPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToSet" ADD CONSTRAINT "_ExerciseToSet_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToSet" ADD CONSTRAINT "_ExerciseToSet_B_fkey" FOREIGN KEY ("B") REFERENCES "Set"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SetToWorkout" ADD CONSTRAINT "_SetToWorkout_A_fkey" FOREIGN KEY ("A") REFERENCES "Set"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SetToWorkout" ADD CONSTRAINT "_SetToWorkout_B_fkey" FOREIGN KEY ("B") REFERENCES "Workout"("id") ON DELETE CASCADE ON UPDATE CASCADE;
