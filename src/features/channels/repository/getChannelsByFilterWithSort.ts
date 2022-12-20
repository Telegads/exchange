import { Prisma } from '@prisma/client';

import { prisma } from '../../../core/prisma';
import { DEFAULT_PAGE_SIZE } from '../../../constants';
import { CHANNEL_FIELDS } from '../constants';
import { GetChannelArgs } from '../types';

export const getChannelsByFilterWithSort = ({
  searchString,
  category,
  sort,
  subscriptionsCount,
  viewsCount,
  pageSize = DEFAULT_PAGE_SIZE,
  pageNumber = 0,
}: GetChannelArgs) => {
  const sorting = {
    orderBy: sort && sort.type ? { [sort.type]: sort.direction } : undefined,
  };

  const categoryCondition: Prisma.ChannelFindManyArgs['where'] = {
    categoryId: category && category !== 'all' ? category : undefined,
  };

  const subscriptionsCondition: Prisma.ChannelFindManyArgs['where'] = {
    subscribers: subscriptionsCount
      ? {
          lte: subscriptionsCount?.max,
          gte: subscriptionsCount?.min,
        }
      : undefined,
  };

  const viewsCondition: Prisma.ChannelFindManyArgs['where'] = {
    views: viewsCount
      ? {
          lte: viewsCount?.max,
          gte: viewsCount?.min,
        }
      : undefined,
  };

  const searchCondition: Prisma.ChannelFindManyArgs['where'] = {
    OR: searchString
      ? [{ name: { contains: searchString.trim() } }, { description: { contains: searchString.trim() } }]
      : undefined,
  };

  return prisma.channel.findMany({
    take: pageSize,
    skip: pageNumber * pageSize,
    where: {
      ...searchCondition,
      ...subscriptionsCondition,
      ...categoryCondition,
      ...viewsCondition,
    },
    ...sorting,
    select: CHANNEL_FIELDS,
  });
};
