-- CreateEnum
CREATE TYPE "CampaignChannelStatus" AS ENUM ('WAITING', 'ACCEPTED', 'DECLINE', 'DONE');

-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "creationDateTime" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "name" TEXT;

-- CreateTable
CREATE TABLE "ChannelsInCampaign" (
    "campaignId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "status" "CampaignChannelStatus" NOT NULL DEFAULT 'WAITING'
);

-- CreateIndex
CREATE UNIQUE INDEX "ChannelsInCampaign_campaignId_channelId_key" ON "ChannelsInCampaign"("campaignId", "channelId");

-- AddForeignKey
ALTER TABLE "ChannelsInCampaign" ADD CONSTRAINT "ChannelsInCampaign_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelsInCampaign" ADD CONSTRAINT "ChannelsInCampaign_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
