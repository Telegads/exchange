import { prisma } from '../../../core/prisma';

export const countAllChannels = () => {
  return prisma.channel.aggregate({
    _count: {
      id: true,
    },
  });
};
