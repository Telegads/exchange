-- CreateTable
CREATE TABLE "ChannelOnwer" (
    "ownerId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,

    CONSTRAINT "ChannelOnwer_pkey" PRIMARY KEY ("ownerId","channelId")
);

-- AddForeignKey
ALTER TABLE "ChannelOnwer" ADD CONSTRAINT "ChannelOnwer_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelOnwer" ADD CONSTRAINT "ChannelOnwer_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
