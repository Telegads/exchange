/*
  Warnings:

  - Added the required column `lastUpdateDateTime` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "lastUpdateDateTime" TIMESTAMP(3) NOT NULL;
