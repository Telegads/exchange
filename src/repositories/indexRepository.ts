import prisma from '../core/prisma';

export const indexRepository = {
  countAllUsers() {
    return prisma.user.aggregate({
      _count: {
        id: true,
      },
    });
  },

  countAllCampaigns() {
    return prisma.campaign.aggregate({
      _count: {
        id: true,
      },
    });
  },
};
