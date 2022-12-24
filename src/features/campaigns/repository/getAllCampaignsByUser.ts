import prisma from '../../../core/prisma';

export const getAllCampaignsByUser = (userId: string) => {
  return prisma.campaign.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      status: true,
    },
  });
};
