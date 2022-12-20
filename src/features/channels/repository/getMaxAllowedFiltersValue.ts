import { prisma } from '../../../core/prisma';

export const getMaxAllowedFiltersValue = () => {
  return prisma.channel.aggregate({
    _max: {
      subscribers: true,
      views: true,
    },
  });
};
