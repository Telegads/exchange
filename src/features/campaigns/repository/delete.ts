import prisma from '../../../core/prisma';

export const deleteCampaignById = (id: string) => {
  return prisma.$transaction([
    prisma.channelsInCampaign.deleteMany({
      where: {
        campaignId: id,
      },
    }),
    prisma.campaign.delete({
      where: {
        id,
      },
    }),
  ]);
};
