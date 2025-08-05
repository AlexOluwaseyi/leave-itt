/*
  Warnings:

  - You are about to drop the column `memberId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `teamId` on the `Manager` table. All the data in the column will be lost.
  - You are about to drop the `_MemberToTeam` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[managerId]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `managerId` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Made the column `managerId` on table `Team` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_teamId_fkey";

-- DropForeignKey
ALTER TABLE "Manager" DROP CONSTRAINT "Manager_teamId_fkey";

-- DropForeignKey
ALTER TABLE "_MemberToTeam" DROP CONSTRAINT "_MemberToTeam_A_fkey";

-- DropForeignKey
ALTER TABLE "_MemberToTeam" DROP CONSTRAINT "_MemberToTeam_B_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "memberId",
DROP COLUMN "teamId";

-- AlterTable
ALTER TABLE "Manager" DROP COLUMN "teamId";

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "managerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Team" ALTER COLUMN "managerId" SET NOT NULL;

-- DropTable
DROP TABLE "_MemberToTeam";

-- CreateTable
CREATE TABLE "_LeaveBookings" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_LeaveBookings_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_LeaveBookings_B_index" ON "_LeaveBookings"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Team_managerId_key" ON "Team"("managerId");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LeaveBookings" ADD CONSTRAINT "_LeaveBookings_A_fkey" FOREIGN KEY ("A") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LeaveBookings" ADD CONSTRAINT "_LeaveBookings_B_fkey" FOREIGN KEY ("B") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
