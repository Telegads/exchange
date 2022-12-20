import { Prisma } from '@prisma/client';

import { prisma } from '../../../core/prisma';
import { Filter } from '../types';

export const countByFilter = ({ category, searchString, subscriptionsCount }: Filter) => {
  const categoryCondition: Prisma.ChannelFindManyArgs['where'] = {
    categoryId: category && category !== 'all' ? category : undefined,
  };

  const searchCondition: Prisma.ChannelFindManyArgs['where'] = {
    OR: searchString
      ? [{ name: { contains: searchString.trim() } }, { description: { contains: searchString.trim() } }]
      : undefined,
  };

  const subscriptionsCondition: Prisma.ChannelFindManyArgs['where'] = {
    subscribers: subscriptionsCount
      ? {
          lte: subscriptionsCount?.max,
          gte: subscriptionsCount?.min,
        }
      : undefined,
  };

  return prisma.channel.aggregate({
    _count: {
      id: true,
    },
    where: {
      ...searchCondition,
      ...subscriptionsCondition,
      ...categoryCondition,
    },
  });
};
