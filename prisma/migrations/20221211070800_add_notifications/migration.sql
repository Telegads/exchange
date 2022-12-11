/*
  Warnings:

  - A unique constraint covering the columns `[tgId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('SENT', 'ERROR');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tgId" TEXT;

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "user_tg_id" TEXT NOT NULL,
    "status" "NotificationStatus" NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_tgId_key" ON "User"("tgId");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_tg_id_fkey" FOREIGN KEY ("user_tg_id") REFERENCES "User"("tgId") ON DELETE RESTRICT ON UPDATE CASCADE;
