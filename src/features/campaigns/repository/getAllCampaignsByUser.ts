import prisma from '../../../core/prisma';

export const getAllCampaignsByUser = (userId: string) => {
  return prisma.campaign
    .findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        status: true,
        creationDateTime: true,
        ChannelsInCampaign: {
          select: {
            status: true,
            channel: {
              select: {
                id: true,
                name: true,
                subscribers: true,
                category: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    .then((campaigns) =>
      campaigns.map((campaign) => ({
        ...campaign,
        creationDateTime: campaign.creationDateTime?.toISOString(),
      })),
    );
};
