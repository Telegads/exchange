import { Prisma } from '@prisma/client';

import { prisma } from '../../../core/prisma';

export type AddChannelArg = {
  channel: Prisma.ChannelCreateInput;
  categoryId: string;
  ownerId: string;
};

export const addChannel = ({ channel, ownerId, categoryId }: AddChannelArg) => {
  return prisma.channel.create({
    data: {
      ...channel,
      category: {
        connect: {
          id: categoryId,
        },
      },
      ChannelOwner: {
        create: {
          ownerId,
        },
      },
    },
  });
};
