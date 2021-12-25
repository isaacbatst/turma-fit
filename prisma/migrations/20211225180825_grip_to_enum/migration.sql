/*
  Warnings:

  - The `grip` column on the `Exercise` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Grip" AS ENUM ('PRONATE', 'SUPINE');

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "grip",
ADD COLUMN     "grip" "Grip";
