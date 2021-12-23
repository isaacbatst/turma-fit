/*
  Warnings:

  - You are about to drop the column `biceps_left` on the `Measurement` table. All the data in the column will be lost.
  - You are about to drop the column `biceps_right` on the `Measurement` table. All the data in the column will be lost.
  - Added the required column `arm_left` to the `Measurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `arm_right` to the `Measurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calf_left` to the `Measurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `calf_right` to the `Measurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chest` to the `Measurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forearm_left` to the `Measurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `forearm_right` to the `Measurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hips` to the `Measurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shoulders` to the `Measurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thigh_left` to the `Measurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thigh_right` to the `Measurement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `waist` to the `Measurement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Measurement" DROP COLUMN "biceps_left",
DROP COLUMN "biceps_right",
ADD COLUMN     "arm_left" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "arm_right" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "calf_left" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "calf_right" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "chest" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "forearm_left" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "forearm_right" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "hips" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "shoulders" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "thigh_left" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "thigh_right" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "waist" DOUBLE PRECISION NOT NULL;
