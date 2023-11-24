/*
  Warnings:

  - Added the required column `appointment_date` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `day_of_week` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_present` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nextAppointment_date` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "WeekDays" AS ENUM ('Sunday', 'Monday', 'Tuesday', 'Weednesday', 'Thursday', 'Friday', 'Saturday');

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "appointment_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "day_of_week" "WeekDays" NOT NULL,
ADD COLUMN     "duration" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "is_present" BOOLEAN NOT NULL,
ADD COLUMN     "nextAppointment_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "time" INTEGER NOT NULL;
