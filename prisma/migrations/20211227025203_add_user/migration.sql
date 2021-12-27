/*
  Warnings:

  - You are about to drop the column `email` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the column `profile` on the `Personal` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `profile` on the `Student` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Personal_email_key";

-- DropIndex
DROP INDEX "Student_email_key";

-- AlterTable
ALTER TABLE "Personal" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "profile";

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "profile";

-- CreateTable
CREATE TABLE "User" (
    "name" TEXT NOT NULL,
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "profile" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
