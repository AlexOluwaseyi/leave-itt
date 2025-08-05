/*
  Warnings:

  - You are about to drop the `_LeaveBookings` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[teamId,date]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_LeaveBookings" DROP CONSTRAINT "_LeaveBookings_A_fkey";

-- DropForeignKey
ALTER TABLE "_LeaveBookings" DROP CONSTRAINT "_LeaveBookings_B_fkey";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "memberId" TEXT NOT NULL,
ADD COLUMN     "teamId" TEXT NOT NULL,
ALTER COLUMN "title" DROP NOT NULL;

-- DropTable
DROP TABLE "_LeaveBookings";

-- CreateIndex
CREATE UNIQUE INDEX "Booking_teamId_date_key" ON "Booking"("teamId", "date");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
