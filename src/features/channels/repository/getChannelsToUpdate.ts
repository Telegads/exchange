import { prisma } from '../../../core/prisma';

export const getChannelsToUpdate = (limit: number) => {
  return prisma.channel.findMany({
    take: limit,
    where: {
      isArchived: false,
      lastUpdateFromTelegram: null,
    },
  });
};
