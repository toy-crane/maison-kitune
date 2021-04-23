/*
  Warnings:

  - You are about to drop the column `startDatetime` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the column `endDatetime` on the `Class` table. All the data in the column will be lost.
  - Added the required column `startDateTime` to the `Class` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDateTime` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Class" DROP COLUMN "startDatetime",
DROP COLUMN "endDatetime",
ADD COLUMN     "startDateTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "endDateTime" TIMESTAMP(3) NOT NULL;
