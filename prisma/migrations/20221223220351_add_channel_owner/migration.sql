-- CreateTable
CREATE TABLE "ChannelOwner" (
    "ownerId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,

    CONSTRAINT "ChannelOwner_pkey" PRIMARY KEY ("ownerId","channelId")
);

-- AddForeignKey
ALTER TABLE "ChannelOwner" ADD CONSTRAINT "ChannelOwner_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelOwner" ADD CONSTRAINT "ChannelOwner_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
