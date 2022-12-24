import prisma from '../../../core/prisma';

export const countAllCampaigns = () => {
  return prisma.campaign.aggregate({
    _count: {
      id: true,
    },
  });
};
