import { prisma } from '../../../core/prisma';

export const archiveChannel = (url: string) => {
  return prisma.channel.update({
    where: {
      url,
    },
    data: {
      isArchived: true,
    },
  });
};
