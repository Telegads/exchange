/*
  Warnings:

  - You are about to drop the `ChannelOnwer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChannelOnwer" DROP CONSTRAINT "ChannelOnwer_channelId_fkey";

-- DropForeignKey
ALTER TABLE "ChannelOnwer" DROP CONSTRAINT "ChannelOnwer_ownerId_fkey";

-- DropTable
DROP TABLE "ChannelOnwer";
