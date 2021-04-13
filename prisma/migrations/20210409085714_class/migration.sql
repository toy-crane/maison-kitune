-- CreateEnum
CREATE TYPE "ClassStatus" AS ENUM ('PREPARING', 'RECRUITING', 'RECRUITMENT_CLOSED', 'INPROGRESS', 'CLOSED');

-- CreateTable
CREATE TABLE "Class" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "thumbnail" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    "startDatetime" TIMESTAMP(3) NOT NULL,
    "endDatetime" TIMESTAMP(3) NOT NULL,
    "status" "ClassStatus" NOT NULL,

    PRIMARY KEY ("id")
);
