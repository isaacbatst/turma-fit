-- CreateEnum
CREATE TYPE "Day" AS ENUM ('SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "personalId" INTEGER;

-- AlterTable
ALTER TABLE "Training" ADD COLUMN     "day" "Day" NOT NULL DEFAULT E'MONDAY';

-- CreateTable
CREATE TABLE "Personal" (
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profile" TEXT NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "Personal_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Personal_email_key" ON "Personal"("email");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_personalId_fkey" FOREIGN KEY ("personalId") REFERENCES "Personal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
