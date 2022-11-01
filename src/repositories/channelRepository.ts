import { Channel } from "@prisma/client";
import { prisma } from "../core/prisma";

export type Filter = {
  category?: string | null;
  search?: string | null;
} | null;

export type Sort = {
  type: string;
  direction: string;
};

export type GetChannelArgs = {
  filter?: Filter | null;
  sort?: Sort | null;
  pageSize: number | null;
  pageNumber: number | null;
};

export const channelRepository = {
  getAllChannels() {
    return prisma.channel.findMany();
  },
  getChannelsByFilterWithSort({
    filter,
    sort,
    pageSize,
    pageNumber,
  }: GetChannelArgs) {
    const sorting = {
      orderBy: sort
        ? {
            [sort.type]: sort.direction,
          }
        : undefined,
    };

    const filterCondition = {
      where: {
        categoryId:
          filter?.category && filter.category !== "all"
            ? (filter.category as string)
            : undefined,
      },
    };

    const searchCondition =
      filter && filter.search
        ? {
            where: {
              ...filterCondition.where,
              OR: [
                {
                  name: {
                    contains: filter.search.trim(),
                  },
                },
                {
                  description: {
                    contains: filter.search.trim(),
                  },
                },
              ],
            },
          }
        : {
            ...filterCondition,
          };

    return prisma.channel.findMany({
      take: pageSize,
      skip: pageNumber * pageSize,
      include: {
        formats: true,
        category: true,
      },
      ...searchCondition,
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
  countByFilter(filter: Filter) {
    const filterCondition = {
      where: {
        categoryId:
          filter?.category !== undefined && filter?.category !== "all"
            ? filter.category
            : undefined,
      },
    };

    const search =
      filter?.search !== undefined
        ? {
            where: {
              ...filterCondition.where,
              OR: [
                {
                  name: {
                    contains: filter.search.trim(),
                  },
                },
                {
                  description: {
                    contains: filter.search.trim(),
                  },
                },
              ],
            },
          }
        : {
            ...filterCondition,
          };

    return prisma.channel.aggregate({
      _count: {
        id: true,
      },
      ...search,
    });
  },
  getChannelsToUpdate(limit = 20) {
    return prisma.channel.findMany({
      take: limit,
      orderBy: {
        lastUpdateDateTime: "desc",
      },
    });
  },
};
