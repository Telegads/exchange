import { Channel } from "@prisma/client";
import { DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_FOR_UPDATE } from "../constants";
import prisma from "../core/prisma";

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
  pageSize: number | undefined;
  pageNumber: number | undefined;
};

export const channelRepository = {
  getAllChannels() {
    return prisma.channel.findMany();
  },
  getChannelsByFilterWithSort({
    filter,
    sort,
    pageSize = DEFAULT_PAGE_SIZE,
    pageNumber = 0,
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

    const search = filter?.search
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
  getChannelsToUpdate(limit: number) {
    return prisma.channel.findMany({
      take: limit,
      orderBy: {
        lastUpdateDateTime: "desc",
      },
    });
  },
};
