import { Channel, Prisma } from '@prisma/client';

import { DEFAULT_PAGE_SIZE } from '../constants';
import prisma from '../core/prisma';

export type Sort = {
  type: string | undefined;
  direction: string | undefined;
};

type Pagination = {
  pageSize: number | undefined;
  pageNumber: number | undefined;
};

type Filter = {
  searchString?: string | null;
  category?: string | null;
  sort?: Sort | null;
  subscriptionsCount?:
    | {
        min?: number | undefined;
        max?: number | undefined;
      }
    | undefined;
  viewsCount?:
    | {
        min?: number | undefined;
        max?: number | undefined;
      }
    | undefined;
};

export type GetChannelArgs = Pagination & Filter;

export const channelRepository = {
  getAllChannels() {
    return prisma.channel.findMany();
  },
  getChannelsByFilterWithSort({
    searchString,
    category,
    sort,
    subscriptionsCount,
    viewsCount,
    pageSize = DEFAULT_PAGE_SIZE,
    pageNumber = 0,
  }: GetChannelArgs) {
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
      include: {
        formats: true,
        category: true,
      },
      where: {
        ...searchCondition,
        ...subscriptionsCondition,
        ...categoryCondition,
        ...viewsCondition,
      },
      ...sorting,
    });
  },
  updateChannel(channel: Partial<Channel>) {
    return prisma.channel.update({
      where: {
        url: channel.url,
      },
      data: channel,
    });
  },
  countAll() {
    return prisma.channel.aggregate({
      _count: {
        id: true,
      },
    });
  },
  countByFilter({ category, searchString, subscriptionsCount }: Filter) {
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
  },
  getChannelsToUpdate(limit: number) {
    return prisma.channel.findMany({
      take: limit,
      where: {
        isArchived: false,
        lastUpdateFromTelegram: null,
      },
    });
  },
  archiveChannel(url: string) {
    return prisma.channel.update({
      where: {
        url,
      },
      data: {
        isArchived: true,
      },
    });
  },
};
